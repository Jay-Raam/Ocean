"""Email + webhook notifications for new bookings.

Best-effort by design: a notification failure is logged and never fails the
booking request. SMTP settings come from .env (SMTP_HOST, SMTP_USER,
SMTP_PASSWORD, MAIL_FROM, MAIL_TO, MAIL_GUEST_CONFIRM) — see .env.example.
"""

import asyncio
import html
import logging
import smtplib
from email.message import EmailMessage
from email.utils import formataddr

import httpx
from pydantic import BaseModel

from .config import get_settings
from .models import Booking, ContactMessage

logger = logging.getLogger(__name__)


def format_rp(value: int) -> str:
    return f"Rp {value:,}"


def _guest_full_name(booking: Booking) -> str:
    return f"{booking.guests.first_name or ''} {booking.guests.last_name}".strip()


# ---------------------------------------------------------------- content


def booking_summary_text(booking: Booking) -> str:
    """Plain-text version of the booking request."""
    guests = booking.adults + booking.children + booking.baby
    lines = [
        f"New booking request #{booking.id[:8]}",
        "",
        f"Villa  : {booking.villa.name}",
        f"Rate   : {booking.villa.rate_title}",
        f"Dates  : {booking.checkin} -> {booking.checkout} ({booking.nights} night(s))",
        f"Rooms  : {booking.rooms}",
        f"Guests : {guests} (adults {booking.adults}, children {booking.children}, baby {booking.baby})",
        "",
        "Add-ons:",
    ]
    if booking.add_ons:
        lines.extend(
            f"  - {a.title} x{a.quantity} ({format_rp(a.price)} {a.unit})" for a in booking.add_ons
        )
    else:
        lines.append("  (none)")
    lines.extend(
        [
            "",
            f"Subtotal : {format_rp(booking.subtotal)}",
            f"PPN 10%  : {format_rp(booking.ppn)}",
            f"TOTAL    : {format_rp(booking.total)}",
        ]
    )
    if booking.promo_code:
        lines.append(f"Promo code: {booking.promo_code}")
    lines.extend(
        [
            "",
            "Guest:",
            f"  Name       : {_guest_full_name(booking)}",
            f"  Email      : {booking.guests.email}",
            f"  Phone      : {booking.guests.phone or '-'}",
            f"  Nationality: {booking.guests.nationality or '-'}",
            f"  Requests   : {booking.guests.special_requests or '-'}",
        ]
    )
    return "\n".join(lines)


def booking_summary_html(booking: Booking) -> str:
    """HTML version with a clean table layout for email clients."""
    guests = booking.adults + booking.children + booking.baby

    def row(label: str, value: str) -> str:
        esc = html.escape
        return (
            "<tr>"
            f"<td style='padding:6px 14px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top'>{esc(label)}</td>"
            f"<td style='padding:6px 0;color:#111827;font-weight:600;vertical-align:top'>{esc(value)}</td>"
            "</tr>"
        )

    add_on_rows = ""
    if booking.add_ons:
        for a in booking.add_ons:
            add_on_rows += (
                "<tr>"
                f"<td style='padding:4px 14px 4px 0;color:#111827'>{html.escape(a.title)} x{a.quantity}</td>"
                f"<td style='padding:4px 0;color:#374151;text-align:right'>{format_rp(a.price)} {html.escape(a.unit)}</td>"
                "</tr>"
            )
    else:
        add_on_rows = (
            "<tr><td colspan='2' style='padding:4px 0;color:#9ca3af'>None</td></tr>"
        )

    return f"""\
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#1d5a45;border-radius:10px 10px 0 0;padding:18px 24px">
    <span style="color:#fff;font-size:17px;font-weight:bold">Ocean Resort — Booking request #{html.escape(booking.id[:8])}</span>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:20px 24px;color:#111827">
    <p style="margin:0 0 16px;color:#374151">A new booking request has been received:</p>
    <table style="border-collapse:collapse;font-size:13px;width:100%">
      {row("Villa", f"{booking.villa.name}")}
      {row("Rate", booking.villa.rate_title)}
      {row("Dates", f"{booking.checkin} -> {booking.checkout} ({booking.nights} night(s))")}
      {row("Rooms", str(booking.rooms))}
      {row("Guests", f"{guests} (adults {booking.adults}, children {booking.children}, baby {booking.baby})")}
    </table>
    <p style="margin:18px 0 6px;font-size:13px;font-weight:bold;color:#374151">Add-ons</p>
    <table style="border-collapse:collapse;font-size:13px;width:100%">{add_on_rows}</table>
    <table style="border-collapse:collapse;font-size:13px;width:100%;margin-top:14px">
      {row("Subtotal", format_rp(booking.subtotal))}
      {row("PPN 10%", format_rp(booking.ppn))}
      <tr>
        <td style="padding:8px 14px 8px 0;font-weight:bold;color:#111827;border-top:2px solid #1d5a45">TOTAL</td>
        <td style="padding:8px 0;font-weight:bold;color:#1d5a45;text-align:right;border-top:2px solid #1d5a45">{format_rp(booking.total)}</td>
      </tr>
    </table>
    {f"<p style='margin:14px 0 0;font-size:13px;color:#b45309'>Promo code: <strong>{html.escape(booking.promo_code)}</strong></p>" if booking.promo_code else ""}
    <p style="margin:18px 0 6px;font-size:13px;font-weight:bold;color:#374151">Guest</p>
    <table style="border-collapse:collapse;font-size:13px;width:100%">
      {row("Name", _guest_full_name(booking))}
      {row("Email", booking.guests.email)}
      {row("Phone", booking.guests.phone or "-")}
      {row("Nationality", booking.guests.nationality or "-")}
      {row("Special requests", booking.guests.special_requests or "-")}
    </table>
  </div>
</div>"""


# ---------------------------------------------------------------- sending


def _build_email(booking: Booking) -> EmailMessage:
    settings = get_settings()
    recipients = [
        r.strip() for r in (settings.mail_to or settings.mail_from or "").split(",") if r.strip()
    ]
    guest = booking.guests.email
    if settings.mail_guest_confirm and guest and guest not in recipients:
        recipients.append(guest)

    msg = EmailMessage()
    msg["Subject"] = f"New booking request #{booking.id[:8]} — {booking.villa.name}"
    if settings.mail_from:
        msg["From"] = formataddr(("Ocean Resort", settings.mail_from))
    msg["To"] = ", ".join(recipients)
    msg.set_content(booking_summary_text(booking))
    msg.add_alternative(booking_summary_html(booking), subtype="html")
    return msg


def send_email_sync(booking: Booking) -> None:
    """Blocking SMTP send (run via asyncio.to_thread). No-op when SMTP unset."""
    settings = get_settings()
    if not settings.smtp_host or not settings.mail_from:
        return
    msg = _build_email(booking)
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
        if settings.smtp_user:
            smtp.starttls()
            smtp.login(settings.smtp_user, settings.smtp_password or "")
        smtp.send_message(msg)
    logger.info("Booking email delivered for %s", booking.id)


async def send_webhook(payload: BaseModel) -> None:
    """POST the payload (booking or contact message) to WEBHOOK_URL."""
    settings = get_settings()
    if not settings.webhook_url:
        return
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(settings.webhook_url, json=payload.model_dump(mode="json"))
        resp.raise_for_status()
    logger.info("Webhook delivered for %s", payload.id)


async def notify_booking_created(booking: Booking) -> None:
    """Fire all configured notifications; failures are logged, never fatal."""
    settings = get_settings()
    tasks: list[asyncio.Task] = []
    if settings.webhook_url:
        tasks.append(asyncio.create_task(send_webhook(booking)))
    if settings.smtp_host and settings.mail_from:
        tasks.append(asyncio.to_thread(send_email_sync, booking))
    if not tasks:
        return
    results = await asyncio.gather(*tasks, return_exceptions=True)
    for result in results:
        if isinstance(result, Exception):
            logger.warning("Notification failed: %s", result)


# ---------------------------------------------------------------- contact messages


def message_summary_text(message: ContactMessage) -> str:
    """Plain-text version of a contact form submission."""
    return "\n".join(
        [
            f"New contact message #{message.id[:8]}",
            "",
            f"From    : {message.name} <{message.email}>",
            f"Subject : {message.subject}",
            "",
            message.message,
        ]
    )


def message_summary_html(message: ContactMessage) -> str:
    """HTML version for email clients."""
    esc = html.escape
    return f"""\
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#1d5a45;border-radius:10px 10px 0 0;padding:18px 24px">
    <span style="color:#fff;font-size:17px;font-weight:bold">Ocean Resort — Contact message #{esc(message.id[:8])}</span>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:20px 24px;color:#111827">
    <table style="border-collapse:collapse;font-size:13px;width:100%">
      <tr><td style="padding:6px 14px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">From</td><td style="padding:6px 0;color:#111827;font-weight:600">{esc(message.name)} &lt;{esc(message.email)}&gt;</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">Subject</td><td style="padding:6px 0;color:#111827;font-weight:600">{esc(message.subject)}</td></tr>
    </table>
    <p style="margin:18px 0 6px;font-size:13px;font-weight:bold;color:#374151">Message</p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#374151;white-space:pre-wrap">{esc(message.message)}</p>
  </div>
</div>"""


def _build_message_email(message: ContactMessage) -> EmailMessage:
    settings = get_settings()
    recipients = [
        r.strip() for r in (settings.mail_to or settings.mail_from or "").split(",") if r.strip()
    ]
    msg = EmailMessage()
    msg["Subject"] = f"New contact message — {message.subject}"
    if settings.mail_from:
        msg["From"] = formataddr(("Ocean Resort", settings.mail_from))
    msg["To"] = ", ".join(recipients)
    msg["Reply-To"] = f"{message.name} <{message.email}>"
    msg.set_content(message_summary_text(message))
    msg.add_alternative(message_summary_html(message), subtype="html")
    return msg


def send_message_email_sync(message: ContactMessage) -> None:
    """Blocking SMTP send (run via asyncio.to_thread). No-op when SMTP unset."""
    settings = get_settings()
    if not settings.smtp_host or not settings.mail_from:
        return
    msg = _build_message_email(message)
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
        if settings.smtp_user:
            smtp.starttls()
            smtp.login(settings.smtp_user, settings.smtp_password or "")
        smtp.send_message(msg)
    logger.info("Contact message email delivered for %s", message.id)


async def notify_message_created(message: ContactMessage) -> None:
    """Deliver a contact message to the configured channels; never fatal."""
    settings = get_settings()
    tasks: list[asyncio.Task] = []
    if settings.webhook_url:
        tasks.append(asyncio.create_task(send_webhook(message)))
    if settings.smtp_host and settings.mail_from:
        tasks.append(asyncio.to_thread(send_message_email_sync, message))
    if not tasks:
        return
    results = await asyncio.gather(*tasks, return_exceptions=True)
    for result in results:
        if isinstance(result, Exception):
            logger.warning("Message notification failed: %s", result)

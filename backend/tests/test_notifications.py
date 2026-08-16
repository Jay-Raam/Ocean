"""Email notifier tests — content, recipients, and the SMTP send path."""

from email.message import EmailMessage

from app.config import get_settings
from app.models import Booking, BookingCreate, compute_totals
from app.notifications import _build_email, booking_summary_html, booking_summary_text, send_email_sync


def _make_booking(payload: dict) -> Booking:
    pc = BookingCreate(**payload)
    totals = compute_totals(pc.checkin, pc.checkout, pc.villa, pc.add_ons, pc.guests_total())
    return Booking(
        **payload,
        id="a1b2c3d4e5f6",
        status="received",
        created_at=Booking.now_utc(),
        nights=(pc.checkout - pc.checkin).days,
        subtotal=totals.subtotal,
        ppn=totals.ppn,
        total=totals.total,
        card_last4=pc.payment.card_last4 if pc.payment else None,
    )


def test_summary_text_contains_booking_details(booking_payload):
    text = booking_summary_text(_make_booking(booking_payload))
    assert "New booking request #a1b2c3d4" in text
    assert "Luxury Pool Villa" in text
    assert "60 minutes spa" in text
    assert "PPN 10%" in text
    assert "hello@oceanresortbali.com" in text


def test_summary_html_contains_booking_details(booking_payload):
    html = booking_summary_html(_make_booking(booking_payload))
    assert "Luxury Pool Villa" in html
    assert "60 minutes spa" in html
    assert "PPN 10%" in html
    assert "TOTAL" in html
    assert "hello@oceanresortbali.com" in html


def test_build_email_recipients(booking_payload, monkeypatch):
    settings = get_settings()
    monkeypatch.setattr(settings, "smtp_host", "smtp.example.com")
    monkeypatch.setattr(settings, "mail_from", "reservations@oceanresortbali.com")
    monkeypatch.setattr(settings, "mail_to", "team@oceanresortbali.com, manager@oceanresortbali.com")
    monkeypatch.setattr(settings, "mail_guest_confirm", True)

    msg = _build_email(_make_booking(booking_payload))
    assert isinstance(msg, EmailMessage)
    to = msg["To"]
    assert "team@oceanresortbali.com" in to
    assert "manager@oceanresortbali.com" in to
    # guest confirmation copy
    assert "hello@oceanresortbali.com" in to
    assert msg["From"] == "Ocean Resort <reservations@oceanresortbali.com>"
    assert "New booking request #a1b2c3d4" in msg["Subject"]
    # both plain and HTML parts are present
    subtypes = [part.get_content_subtype() for part in msg.walk() if part.get_content_type().startswith("text/")]
    assert "plain" in subtypes
    assert "html" in subtypes


def test_build_email_recipients_defaults_to_mail_from(booking_payload, monkeypatch):
    settings = get_settings()
    monkeypatch.setattr(settings, "smtp_host", "smtp.example.com")
    monkeypatch.setattr(settings, "mail_from", "reservations@oceanresortbali.com")
    monkeypatch.setattr(settings, "mail_to", None)
    monkeypatch.setattr(settings, "mail_guest_confirm", False)

    msg = _build_email(_make_booking(booking_payload))
    assert msg["To"] == "reservations@oceanresortbali.com"


class _FakeSMTP:
    def __init__(self, *args, **kwargs):
        self.sent: list[EmailMessage] = []
        self.tls = 0
        self.logged_in = 0

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def starttls(self):
        self.tls += 1

    def login(self, user, password):
        self.logged_in += 1
        assert user == "smtp-user"
        assert password == "smtp-pass"

    def send_message(self, msg):
        self.sent.append(msg)


def test_send_email_sync_sends_via_smtp(booking_payload, monkeypatch):
    import app.notifications as notifications

    settings = get_settings()
    monkeypatch.setattr(settings, "smtp_host", "smtp.example.com")
    monkeypatch.setattr(settings, "smtp_user", "smtp-user")
    monkeypatch.setattr(settings, "smtp_password", "smtp-pass")
    monkeypatch.setattr(settings, "mail_from", "reservations@oceanresortbali.com")

    fake = _FakeSMTP()
    monkeypatch.setattr(notifications.smtplib, "SMTP", lambda *a, **k: fake)

    send_email_sync(_make_booking(booking_payload))
    assert fake.tls == 1
    assert fake.logged_in == 1
    assert len(fake.sent) == 1
    assert fake.sent[0]["Subject"].startswith("New booking request")


def test_send_email_sync_noop_without_smtp(booking_payload, monkeypatch):
    import app.notifications as notifications

    settings = get_settings()
    monkeypatch.setattr(settings, "smtp_host", None)
    monkeypatch.setattr(settings, "mail_from", None)

    called = False

    def _fail(*a, **k):
        nonlocal called
        called = True
        raise AssertionError("SMTP should not be constructed")

    monkeypatch.setattr(notifications.smtplib, "SMTP", _fail)
    send_email_sync(_make_booking(booking_payload))
    assert not called

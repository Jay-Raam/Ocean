"""Booking + contact-message service layer — validation, persistence, notifications."""

from uuid import uuid4

from .models import Booking, BookingCreate, ContactMessage, ContactMessageCreate, PromoLine, compute_totals
from .notifications import notify_booking_created, notify_message_created
from .promos import get_promo
from .repositories import get_booking_repository, get_message_repository


class PromoCodeError(ValueError):
    """Raised when a promo code is unknown or disabled."""


def _promo_discount(nights_total: int, percent: int | None) -> int:
    return round(nights_total * percent / 100) if percent else 0


def _to_booking(payload: BookingCreate, promo: dict | None = None) -> Booking:
    discount_percent = promo["discount_percent"] if promo else None
    totals = compute_totals(
        payload.checkin,
        payload.checkout,
        payload.villa,
        payload.add_ons,
        payload.guests_total(),
        discount_percent=discount_percent,
    )
    nights = (payload.checkout - payload.checkin).days
    nights_total = payload.villa.nightly_price * nights * payload.villa.rooms
    card_last4 = payload.payment.card_last4 if payload.payment else None
    return Booking(
        id=uuid4().hex,
        checkin=payload.checkin,
        checkout=payload.checkout,
        adults=payload.adults,
        children=payload.children,
        baby=payload.baby,
        rooms=payload.rooms,
        promo_code=promo["code"] if promo else (payload.promo_code or None),
        villa=payload.villa,
        add_ons=payload.add_ons,
        guests=payload.guests,
        payment=None,
        status="received",
        created_at=Booking.now_utc(),
        nights=nights,
        subtotal=totals.subtotal,
        ppn=totals.ppn,
        total=totals.total,
        discount_amount=_promo_discount(nights_total, discount_percent),
        promo=(
            PromoLine(
                code=promo["code"],
                label=promo["label"],
                discount_percent=promo["discount_percent"],
            )
            if promo
            else None
        ),
        card_last4=card_last4,
    )


async def create_booking(payload: BookingCreate) -> Booking:
    promo = None
    if payload.promo_code:
        promo = await get_promo(payload.promo_code)
        if promo is None or not promo.get("active", True):
            raise PromoCodeError(f"promo code '{payload.promo_code}' is not valid")
    booking = _to_booking(payload, promo)
    repo = await get_booking_repository()
    await repo.create(booking.model_dump(mode="json"))
    await notify_booking_created(booking)
    return booking


async def get_booking(booking_id: str) -> Booking | None:
    repo = await get_booking_repository()
    doc = await repo.get(booking_id)
    return Booking.model_validate(doc) if doc else None


async def list_bookings() -> list[Booking]:
    repo = await get_booking_repository()
    docs = await repo.list()
    return [Booking.model_validate(d) for d in docs]


async def create_contact_message(payload: ContactMessageCreate) -> ContactMessage:
    """Persist a website contact/enquiry form submission and fire notifications."""
    message = ContactMessage(
        id=uuid4().hex,
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        created_at=ContactMessage.now_utc(),
    )
    repo = await get_message_repository()
    await repo.create(message.model_dump(mode="json"))
    await notify_message_created(message)
    return message



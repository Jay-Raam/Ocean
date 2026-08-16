"""Pydantic v2 domain models for the booking engine."""

import re
from datetime import date, datetime, timezone
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class AddOn(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    title: str
    price: int = Field(ge=0)
    unit: Literal["once", "per person"]
    quantity: int = Field(default=1, ge=1)


class VillaLine(BaseModel):
    """The selected villa + rate line on the booking."""

    model_config = ConfigDict(extra="ignore")

    slug: str
    name: str
    rate_id: str
    rate_title: str
    nightly_price: int = Field(ge=0)
    nights: int = Field(ge=1)
    rooms: int = Field(ge=1)


class GuestDetails(BaseModel):
    model_config = ConfigDict(extra="ignore")

    booking_for_self: bool = True
    first_name: str | None = None
    last_name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    phone: str | None = None
    nationality: str | None = None
    special_requests: str | None = None

    @field_validator("email")
    @classmethod
    def _email(cls, v: str) -> str:
        if "@" not in v or "." not in v.rsplit("@", 1)[-1]:
            raise ValueError("invalid email address")
        return v.strip().lower()


class PaymentDetails(BaseModel):
    """Only non-sensitive payment fields are accepted/stored — see note in README."""

    model_config = ConfigDict(extra="ignore")

    cardholder_name: str | None = None
    card_number: str | None = None
    expiry: str | None = None

    @property
    def card_last4(self) -> str | None:
        if not self.card_number:
            return None
        digits = re.sub(r"\D", "", self.card_number)
        return digits[-4:] if digits else None


class PromoLine(BaseModel):
    """A validated promo applied to a booking."""

    model_config = ConfigDict(extra="ignore")

    code: str
    label: str
    discount_percent: int = Field(ge=1, le=100)


class Totals(BaseModel):
    model_config = ConfigDict(extra="ignore")

    subtotal: int = Field(ge=0)
    ppn: int = Field(ge=0)
    total: int = Field(ge=0)


class BookingCreate(BaseModel):
    """What the client submits. Totals are recomputed server-side on save."""

    model_config = ConfigDict(extra="ignore")

    checkin: date
    checkout: date
    adults: int = Field(ge=1, le=20)
    children: int = Field(default=0, ge=0, le=20)
    baby: int = Field(default=0, ge=0, le=20)
    rooms: int = Field(default=1, ge=1, le=10)
    promo_code: str | None = None

    villa: VillaLine
    add_ons: list[AddOn] = Field(default_factory=list)
    guests: GuestDetails
    payment: PaymentDetails | None = None
    totals: Totals | None = None  # informational; recomputed on save

    @model_validator(mode="after")
    def _validate_dates(self) -> "BookingCreate":
        if self.checkout <= self.checkin:
            raise ValueError("checkout must be after checkin")
        return self

    @model_validator(mode="after")
    def _normalize_promo_code(self) -> "BookingCreate":
        """Trim the promo code; blank becomes None.

        Validity is checked in the service layer (app.services.create_booking)
        against the promo repository so Mongo-managed codes work too.
        """
        if not self.promo_code:
            return self
        code = self.promo_code.strip()
        self.promo_code = code or None
        return self

    def guests_total(self) -> int:
        return self.adults + self.children + self.baby


class Booking(BookingCreate):
    """A stored booking."""

    model_config = ConfigDict(extra="ignore")

    id: str
    status: Literal["received", "confirmed", "cancelled"] = "received"
    created_at: datetime
    # Computed server-side
    nights: int = Field(ge=1)
    subtotal: int = Field(ge=0)
    ppn: int = Field(ge=0)
    total: int = Field(ge=0)
    discount_amount: int = Field(default=0, ge=0)
    promo: PromoLine | None = None
    card_last4: str | None = None

    @classmethod
    def now_utc(cls) -> datetime:
        return datetime.now(timezone.utc)


def compute_totals(
    checkin: date,
    checkout: date,
    villa: VillaLine,
    add_ons: list[AddOn],
    guests: int,
    discount_percent: int | None = None,
) -> Totals:
    """Server-authoritative price calculation (never trusts the client's totals).

    - nightly rate × nights × rooms (a valid promo discounts this portion)
    - "once" add-ons priced once per booking
    - "per person" add-ons priced per guest (adults + children)
    - PPN 10% applied on top
    """
    nights = (checkout - checkin).days
    nights_total = villa.nightly_price * nights * villa.rooms
    if discount_percent:
        nights_total -= round(nights_total * discount_percent / 100)
    add_on_total = sum(
        a.price * (guests if a.unit == "per person" else 1) * a.quantity for a in add_ons
    )
    subtotal = nights_total + add_on_total
    ppn = round(subtotal * 0.10)
    return Totals(subtotal=subtotal, ppn=ppn, total=subtotal + ppn)

"""GraphQL API (Strawberry) — mirrors the REST surface."""

from typing import Any

import strawberry

from .cache import cache_get_json, cache_set_json
from .catalog import PACKAGES, VILLAS
from .models import AddOn, BookingCreate, GuestDetails, PaymentDetails, VillaLine
from .promos import list_promos
from .services import create_booking, get_booking, list_bookings

# ---------------------------------------------------------------- types


@strawberry.type
class AddOnType:
    id: str
    title: str
    price: int
    unit: str
    quantity: int


@strawberry.type
class VillaLineType:
    slug: str
    name: str
    rate_id: str
    rate_title: str
    nightly_price: int
    nights: int
    rooms: int


@strawberry.type
class GuestType:
    booking_for_self: bool
    first_name: str | None
    last_name: str
    email: str
    phone: str | None
    nationality: str | None
    special_requests: str | None


@strawberry.type
class BookingType:
    id: str
    status: str
    created_at: str
    checkin: str
    checkout: str
    adults: int
    children: int
    baby: int
    rooms: int
    promo_code: str | None
    villa: VillaLineType
    add_ons: list[AddOnType]
    guests: GuestType
    nights: int
    subtotal: int
    ppn: int
    total: int
    card_last4: str | None


@strawberry.type
class RateType:
    id: str
    title: str
    description: str
    badge: str
    until: str
    was: int | None = None
    price: int


@strawberry.type
class PackageType:
    slug: str
    title: str
    eyebrow: str
    text: str
    booking_code: str
    includes: list[str]
    promo_label: str | None = None
    discount_percent: int | None = None


@strawberry.type
class PromoType:
    code: str
    label: str
    discount_percent: int
    active: bool


@strawberry.type
class VillaType:
    slug: str
    name: str
    max_persons: int
    available: int
    from_price: int
    rates: list[RateType]


# ---------------------------------------------------------------- inputs


@strawberry.input
class AddOnInput:
    id: str
    title: str
    price: int
    unit: str
    quantity: int = 1


@strawberry.input
class VillaLineInput:
    slug: str
    name: str
    rate_id: str
    rate_title: str
    nightly_price: int
    nights: int
    rooms: int


@strawberry.input
class GuestInput:
    booking_for_self: bool = True
    first_name: str | None = None
    last_name: str
    email: str
    phone: str | None = None
    nationality: str | None = None
    special_requests: str | None = None


@strawberry.input
class PaymentInput:
    cardholder_name: str | None = None
    card_number: str | None = None
    expiry: str | None = None


@strawberry.input
class BookingInput:
    checkin: str
    checkout: str
    adults: int = 2
    children: int = 0
    baby: int = 0
    rooms: int = 1
    promo_code: str | None = None
    villa: VillaLineInput
    add_ons: list[AddOnInput] = strawberry.field(default_factory=list)
    guests: GuestInput
    payment: PaymentInput | None = None


# ---------------------------------------------------------------- helpers


def _booking_type(booking: Any) -> BookingType:
    return BookingType(
        id=booking.id,
        status=booking.status,
        created_at=booking.created_at.isoformat(),
        checkin=booking.checkin.isoformat(),
        checkout=booking.checkout.isoformat(),
        adults=booking.adults,
        children=booking.children,
        baby=booking.baby,
        rooms=booking.rooms,
        promo_code=booking.promo_code,
        villa=VillaLineType(**booking.villa.model_dump()),
        add_ons=[AddOnType(**a.model_dump()) for a in booking.add_ons],
        guests=GuestType(**booking.guests.model_dump()),
        nights=booking.nights,
        subtotal=booking.subtotal,
        ppn=booking.ppn,
        total=booking.total,
        card_last4=booking.card_last4,
    )


def _package_type(p: dict[str, Any]) -> PackageType:
    return PackageType(
        slug=p["slug"],
        title=p["title"],
        eyebrow=p["eyebrow"],
        text=p["text"],
        booking_code=p.get("booking_code", ""),
        includes=p.get("includes", []),
        promo_label=p.get("promo_label"),
        discount_percent=p.get("discount_percent"),
    )


def _villa_type(v: dict[str, Any]) -> VillaType:
    return VillaType(
        slug=v["slug"],
        name=v["name"],
        max_persons=v["max_persons"],
        available=v["available"],
        from_price=v["from"],
        rates=[RateType(**r) for r in v["rates"]],
    )


# ---------------------------------------------------------------- schema


@strawberry.type
class Query:
    @strawberry.field
    async def bookings(self) -> list[BookingType]:
        return [_booking_type(b) for b in await list_bookings()]

    @strawberry.field
    async def booking(self, id: str) -> BookingType | None:
        booking = await get_booking(id)
        return _booking_type(booking) if booking else None

    @strawberry.field
    async def villas(self) -> list[VillaType]:
        return [_villa_type(v) for v in VILLAS]

    @strawberry.field
    async def packages(self) -> list[PackageType]:
        return [_package_type(p) for p in PACKAGES]

    @strawberry.field
    async def promos(self) -> list[PromoType]:
        return [PromoType(**p) for p in await list_promos(active_only=True)]

    @strawberry.field
    async def rates(self, checkin: str, checkout: str) -> list[VillaType]:
        if checkout <= checkin:
            raise ValueError("checkout must be after checkin")
        cache_key = f"gql:rates:{checkin}:{checkout}"
        cached = await cache_get_json(cache_key)
        if cached is not None:
            return [_villa_type(v) for v in cached]
        await cache_set_json(cache_key, VILLAS)
        return [_villa_type(v) for v in VILLAS]


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_booking(self, input: BookingInput) -> BookingType:
        payload = BookingCreate(
            checkin=input.checkin,
            checkout=input.checkout,
            adults=input.adults,
            children=input.children,
            baby=input.baby,
            rooms=input.rooms,
            promo_code=input.promo_code,
            villa=VillaLine(**input.villa.__dict__),
            add_ons=[AddOn(**a.__dict__) for a in input.add_ons],
            guests=GuestDetails(**input.guests.__dict__),
            payment=PaymentDetails(**input.payment.__dict__) if input.payment else None,
        )
        booking = await create_booking(payload)
        return _booking_type(booking)


schema = strawberry.Schema(query=Query, mutation=Mutation)

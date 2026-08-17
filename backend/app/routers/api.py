"""REST API — /api/v1/bookings, /api/v1/villas, /api/v1/rates, /api/v1/messages."""

from datetime import date

from fastapi import APIRouter, HTTPException

from ..cache import cache_get_json, cache_set_json
from ..catalog import VILLAS
from ..models import Booking, BookingCreate, ContactMessage, ContactMessageCreate
from ..services import (
    PromoCodeError,
    create_booking,
    create_contact_message,
    get_booking,
    list_bookings,
)

router = APIRouter()


@router.post("/bookings", response_model=Booking, status_code=201)
async def api_create_booking(payload: BookingCreate) -> Booking:
    """Create a booking request. Totals (and promo discount) are computed server-side."""
    try:
        return await create_booking(payload)
    except PromoCodeError as exc:
        raise HTTPException(status_code=422, detail=str(exc))


@router.get("/bookings/{booking_id}", response_model=Booking)
async def api_get_booking(booking_id: str) -> Booking:
    booking = await get_booking(booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.get("/bookings", response_model=list[Booking])
async def api_list_bookings() -> list[Booking]:
    return await list_bookings()


@router.get("/villas")
async def api_villas():
    """Villa catalog (cached)."""
    cache_key = "catalog:villas"
    cached = await cache_get_json(cache_key)
    if cached is not None:
        return cached
    await cache_set_json(cache_key, VILLAS)
    return VILLAS


@router.post("/messages", response_model=ContactMessage, status_code=201)
async def api_create_message(payload: ContactMessageCreate) -> ContactMessage:
    """Store a website contact/enquiry form submission (and notify the team)."""
    return await create_contact_message(payload)


@router.get("/rates")
async def api_rates(checkin: date, checkout: date):
    """Rates for every villa across the requested dates (cached per date range)."""
    if checkout <= checkin:
        raise HTTPException(status_code=422, detail="checkout must be after checkin")
    cache_key = f"rates:{checkin.isoformat()}:{checkout.isoformat()}"
    cached = await cache_get_json(cache_key)
    if cached is not None:
        return cached
    payload = [
        {
            "slug": v["slug"],
            "name": v["name"],
            "max_persons": v["max_persons"],
            "available": v["available"],
            "rates": v["rates"],
        }
        for v in VILLAS
    ]
    await cache_set_json(cache_key, payload)
    return payload

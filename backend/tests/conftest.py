"""Pytest fixtures.

Points MONGO/REDIS at unreachable local ports so the app uses the in-memory
fallbacks — tests need no external services.
"""

import os

os.environ.setdefault("MONGO_URI", "mongodb://127.0.0.1:59999")
os.environ.setdefault("REDIS_URL", "redis://127.0.0.1:59998/0")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:5173")

import httpx
import pytest

import app.promos as promos_module
import app.repositories as repositories
from app.main import app


@pytest.fixture(autouse=True)
async def _fresh_store():
    """Reset the booking + promo + message stores before every test (module-level singletons)."""
    repositories._repo = None
    repositories._msg_repo = None
    promos_module._repo = None
    yield
    repositories._repo = None
    repositories._msg_repo = None
    promos_module._repo = None


@pytest.fixture
async def client():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.fixture
def booking_payload() -> dict:
    return {
        "checkin": "2026-09-29",
        "checkout": "2026-09-30",
        "adults": 2,
        "children": 0,
        "baby": 0,
        "rooms": 1,
        "promo_code": None,
        "villa": {
            "slug": "luxury-pool-villa",
            "name": "Luxury Pool Villa",
            "rate_id": "serenity",
            "rate_title": "Serenity Season at Ocean",
            "nightly_price": 7841268,
            "nights": 1,
            "rooms": 1,
        },
        "add_ons": [
            {"id": "spa-60", "title": "60 minutes spa", "price": 1069686, "unit": "per person", "quantity": 1}
        ],
        "guests": {
            "booking_for_self": True,
            "first_name": "Jay",
            "last_name": "Raam",
            "email": "hello@oceanresortbali.com",
            "phone": "+62 812 3456 7890",
            "nationality": "Indian",
            "special_requests": "",
        },
        "payment": {
            "cardholder_name": "Jay Raam",
            "card_number": "4242 4242 4242 4242",
            "expiry": "12/28",
        },
    }

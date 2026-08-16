"""Villa + rate + package catalog — mirrors the frontend data
(single source: frontend/src/components/booking/data.ts and frontend/src/lib/content.ts)."""

from typing import Any


def _make_rates(from_price: int) -> list[dict[str, Any]]:
    return [
        {
            "id": "serenity",
            "title": "Serenity Season at Ocean",
            "description": "Indulge in a rejuvenating weekend designed for pure relaxation and effortless comfort.",
            "badge": "Free cancellation",
            "until": "until 23/09/2026 00:00",
            "was": round(from_price * 1.346),
            "price": from_price,
        },
        {
            "id": "best-available",
            "title": "Best Available Rates + 20 Mins Welcome Massage",
            "description": "Rate includes : complimentary 20-minute welcome massage per person, on arrival.",
            "badge": "Free cancellation",
            "until": "until 23/09/2026 00:00",
            "price": round(from_price * 2.024),
        },
    ]


# Promo codes — the static seed. When MongoDB is reachable, promos are stored
# and managed in the `promos` collection (see app/promos.py); this list is the
# fallback used in-memory and the documented initial set.
PROMOS: list[dict[str, Any]] = [
    {
        "code": "OceanDolphins",
        "label": "Ocean & dolphins package — save 15%",
        "discount_percent": 15,
        "active": True,
    },
    {
        "code": "OceanRomance",
        "label": "Ocean Romance package — save 15%",
        "discount_percent": 15,
        "active": True,
    },
    {
        "code": "OceanSpaBliss",
        "label": "Ocean Spa Bliss package — save 15%",
        "discount_percent": 15,
        "active": True,
    },
]


# Map each package to its promo so the GraphQL packages query can expose
# the promo code, label and discount alongside the package itself.
_PROMO_BY_CODE = {p["code"]: p for p in PROMOS}


def _promo_fields(code: str) -> dict[str, Any]:
    promo = _PROMO_BY_CODE.get(code)
    if promo is None:
        return {"promo_label": None, "discount_percent": None}
    return {"promo_label": promo["label"], "discount_percent": promo["discount_percent"]}


PACKAGES: list[dict[str, Any]] = [
    {
        "slug": "ocean-dolphins",
        "title": "Ocean & dolphins",
        "eyebrow": "Package — 2 nights or more - save over 15%",
        "text": "Experience the dolphins of Lovina with our most popular package",
        "booking_code": "OceanDolphins",
        **_promo_fields("OceanDolphins"),
        "includes": [
            "2 nights or more in the villa of your choice",
            "Return transfer to any point in Bali",
            "1x 60 min. massage treatment pr. person",
            "1x 3 course dinner pr. person",
            "A dawn dolphin safari in Lovina Bay",
        ],
    },
    {
        "slug": "ocean-romance",
        "title": "Ocean Romance",
        "eyebrow": "Package — 2 nights or more - save over 15%",
        "text": "For honeymoons or romantic getaways",
        "booking_code": "OceanRomance",
        **_promo_fields("OceanRomance"),
        "includes": [
            "2 nights or more in the villa of your choice",
            "Return transfer to any point in Bali",
            "1x 120 min. couple massage",
            "1x 3 course dinner for two",
            "Daily sunset cocktails",
        ],
    },
    {
        "slug": "ocean-spa-bliss",
        "title": "Ocean Spa Bliss",
        "eyebrow": "Package — Save over 15%",
        "text": "Experience the best of the Ocean spa",
        "booking_code": "OceanSpaBliss",
        **_promo_fields("OceanSpaBliss"),
        "includes": [
            "2 nights or more in the villa of your choice",
            "Return transfer to any point in Bali",
            "1x 120 min. signature treatment",
            "1x 60 min. massage treatment",
            "1x 3 course dinner pr. person",
        ],
    },
]


VILLAS: list[dict[str, Any]] = [
    {
        "slug": "garden-villa",
        "name": "Garden Villa",
        "max_persons": 2,
        "available": 2,
        "from": 3920634,
        "rates": _make_rates(3920634),
    },
    {
        "slug": "pool-villa",
        "name": "Pool Villa",
        "max_persons": 3,
        "available": 3,
        "from": 6273015,
        "rates": _make_rates(6273015),
    },
    {
        "slug": "luxury-pool-villa",
        "name": "Luxury Pool Villa",
        "max_persons": 3,
        "available": 2,
        "from": 7841268,
        "rates": _make_rates(7841268),
    },
    {
        "slug": "two-bedroom-pool-villa",
        "name": "Two Bedroom Pool Villa",
        "max_persons": 4,
        "available": 2,
        "from": 10500000,
        "rates": _make_rates(10500000),
    },
]

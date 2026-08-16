"""REST API tests (in-memory storage, no external services)."""


async def test_create_booking_recomputes_totals(client, booking_payload):
    resp = await client.post("/api/v1/bookings", json=booking_payload)
    assert resp.status_code == 201
    data = resp.json()

    assert data["villa"]["name"] == "Luxury Pool Villa"
    assert data["status"] == "received"
    assert data["nights"] == 1
    assert data["card_last4"] == "4242"
    # server recomputes: nightly × nights × rooms + per-person add-on × guests(2)
    subtotal = 7841268 + 2 * 1069686
    assert data["subtotal"] == subtotal
    assert data["ppn"] == round(subtotal * 0.10)
    assert data["total"] == subtotal + round(subtotal * 0.10)


async def test_get_booking(client, booking_payload):
    created = (await client.post("/api/v1/bookings", json=booking_payload)).json()
    resp = await client.get(f"/api/v1/bookings/{created['id']}")
    assert resp.status_code == 200
    assert resp.json()["id"] == created["id"]


async def test_get_missing_booking_returns_404(client):
    resp = await client.get("/api/v1/bookings/does-not-exist")
    assert resp.status_code == 404


async def test_list_bookings(client, booking_payload):
    await client.post("/api/v1/bookings", json=booking_payload)
    await client.post("/api/v1/bookings", json=booking_payload)
    resp = await client.get("/api/v1/bookings")
    assert resp.status_code == 200
    assert len(resp.json()) == 2


async def test_rejects_checkout_before_checkin(client, booking_payload):
    payload = dict(booking_payload)
    payload["checkout"] = "2026-09-28"
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 422


async def test_rejects_invalid_promo_code(client, booking_payload):
    payload = dict(booking_payload, promo_code="NOT-A-CODE")
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 422


async def test_accepts_valid_promo_code_case_insensitive(client, booking_payload):
    payload = dict(booking_payload, promo_code="oceandolphins")
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 201
    # stored with the canonical catalog spelling
    assert resp.json()["promo_code"] == "OceanDolphins"


async def test_promo_discount_applied_to_totals(client, booking_payload):
    payload = dict(booking_payload, promo_code="OceanDolphins", add_ons=[])
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 201
    data = resp.json()

    nights_total = 7841268  # nightly × 1 night × 1 room
    discount = round(nights_total * 0.15)
    subtotal = nights_total - discount
    assert data["discount_amount"] == discount
    assert data["subtotal"] == subtotal
    assert data["ppn"] == round(subtotal * 0.10)
    assert data["total"] == subtotal + round(subtotal * 0.10)
    assert data["promo"]["code"] == "OceanDolphins"
    assert data["promo"]["discount_percent"] == 15
    assert "Ocean & dolphins" in data["promo"]["label"]


async def test_promo_check_endpoint(client):
    resp = await client.get("/api/v1/promo/check", params={"code": "oceandolphins"})
    assert resp.status_code == 200
    body = resp.json()
    assert body["valid"] is True
    assert body["promo"]["code"] == "OceanDolphins"
    assert body["promo"]["discount_percent"] == 15

    bad = await client.get("/api/v1/promo/check", params={"code": "NOPE"})
    assert bad.status_code == 200
    assert bad.json()["valid"] is False

    empty = await client.get("/api/v1/promo/check", params={"code": "  "})
    assert empty.json()["valid"] is False


async def test_promo_create_list_disable(client, booking_payload):
    created = await client.post(
        "/api/v1/promos",
        json={"code": "Summer20", "label": "Summer special", "discount_percent": 20},
    )
    assert created.status_code == 201
    assert created.json()["code"] == "Summer20"
    assert created.json()["active"] is True

    # duplicate -> conflict
    dup = await client.post(
        "/api/v1/promos",
        json={"code": "Summer20", "label": "dup", "discount_percent": 10},
    )
    assert dup.status_code == 409

    # appears in the active list and validates
    codes = [p["code"] for p in (await client.get("/api/v1/promos")).json()]
    assert "Summer20" in codes
    check = await client.get("/api/v1/promo/check", params={"code": "summer20"})
    assert check.json()["valid"] is True

    # disable -> no longer active or valid, but still listed with ?all=true
    patched = await client.patch("/api/v1/promos/Summer20", json={"active": False})
    assert patched.status_code == 200
    assert patched.json()["active"] is False

    codes = [p["code"] for p in (await client.get("/api/v1/promos")).json()]
    assert "Summer20" not in codes
    check = await client.get("/api/v1/promo/check", params={"code": "Summer20"})
    assert check.json()["valid"] is False
    all_codes = [p["code"] for p in (await client.get("/api/v1/promos?all=true")).json()]
    assert "Summer20" in all_codes

    # a booking with a disabled code is rejected
    payload = dict(booking_payload, promo_code="Summer20")
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 422


async def test_promo_patch_missing_returns_404(client):
    resp = await client.patch("/api/v1/promos/DoesNotExist", json={"active": False})
    assert resp.status_code == 404


async def test_accepts_blank_promo_code_as_none(client, booking_payload):
    payload = dict(booking_payload, promo_code="   ")
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 201
    assert resp.json()["promo_code"] is None


async def test_rejects_invalid_email(client, booking_payload):
    payload = dict(booking_payload)
    payload["guests"] = dict(payload["guests"], email="not-an-email")
    resp = await client.post("/api/v1/bookings", json=payload)
    assert resp.status_code == 422


async def test_villas_cached(client):
    resp = await client.get("/api/v1/villas")
    assert resp.status_code == 200
    assert len(resp.json()) == 4
    # second call hits the cache
    resp2 = await client.get("/api/v1/villas")
    assert resp2.json() == resp.json()


async def test_rates_validates_dates(client):
    resp = await client.get("/api/v1/rates", params={"checkin": "2026-09-30", "checkout": "2026-09-29"})
    assert resp.status_code == 422


async def test_rates_return_all_villas(client):
    resp = await client.get("/api/v1/rates", params={"checkin": "2026-09-29", "checkout": "2026-09-30"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 4
    assert all("rates" in v for v in data)

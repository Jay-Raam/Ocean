"""GraphQL tests (in-memory storage, no external services)."""


async def test_graphql_villas_query(client):
    query = """
      query { villas { slug name maxPersons available fromPrice } }
    """
    resp = await client.post("/graphql", json={"query": query})
    assert resp.status_code == 200
    villas = resp.json()["data"]["villas"]
    assert len(villas) == 4
    assert villas[0]["slug"] == "garden-villa"


async def test_graphql_packages_query(client):
    query = """
      query { packages { slug title bookingCode includes promoLabel discountPercent } }
    """
    resp = await client.post("/graphql", json={"query": query})
    assert resp.status_code == 200
    packages = resp.json()["data"]["packages"]
    assert len(packages) == 3
    assert packages[0]["slug"] == "ocean-dolphins"
    assert packages[0]["bookingCode"] == "OceanDolphins"
    assert len(packages[0]["includes"]) >= 4
    assert packages[0]["discountPercent"] == 15
    assert "Ocean & dolphins" in packages[0]["promoLabel"]


async def test_graphql_promos_query(client):
    query = """
      query { promos { code label discountPercent active } }
    """
    resp = await client.post("/graphql", json={"query": query})
    assert resp.status_code == 200
    promos = resp.json()["data"]["promos"]
    assert len(promos) == 3
    assert promos[0]["code"] == "OceanDolphins"
    assert promos[0]["discountPercent"] == 15


async def test_graphql_rates_query(client):
    query = """
      query { rates(checkin: "2026-09-29", checkout: "2026-09-30") { slug rates { id price } } }
    """
    resp = await client.post("/graphql", json={"query": query})
    assert resp.status_code == 200
    rates = resp.json()["data"]["rates"]
    assert len(rates) == 4
    assert any(r["slug"] == "luxury-pool-villa" for r in rates)


def _gql_payload(payload: dict) -> dict:
    """Convert the REST snake_case payload to GraphQL camelCase field names."""
    villa = payload["villa"]
    guests = payload["guests"]
    return {
        "checkin": payload["checkin"],
        "checkout": payload["checkout"],
        "adults": payload["adults"],
        "children": payload["children"],
        "baby": payload["baby"],
        "rooms": payload["rooms"],
        "promoCode": payload.get("promo_code"),
        "villa": {
            "slug": villa["slug"],
            "name": villa["name"],
            "rateId": villa["rate_id"],
            "rateTitle": villa["rate_title"],
            "nightlyPrice": villa["nightly_price"],
            "nights": villa["nights"],
            "rooms": villa["rooms"],
        },
        "addOns": [
            {
                "id": a["id"],
                "title": a["title"],
                "price": a["price"],
                "unit": a["unit"],
                "quantity": a.get("quantity", 1),
            }
            for a in payload["add_ons"]
        ],
        "guests": {
            "bookingForSelf": guests["booking_for_self"],
            "firstName": guests["first_name"],
            "lastName": guests["last_name"],
            "email": guests["email"],
            "phone": guests["phone"],
            "nationality": guests["nationality"],
            "specialRequests": guests["special_requests"],
        },
        "payment": {
            "cardholderName": payload["payment"]["cardholder_name"],
            "cardNumber": payload["payment"]["card_number"],
            "expiry": payload["payment"]["expiry"],
        },
    }


async def test_graphql_create_booking_mutation(client, booking_payload):
    mutation = """
      mutation($input: BookingInput!) {
        createBooking(input: $input) {
          id
          total
          status
          villa { name }
          guests { email }
        }
      }
    """
    resp = await client.post(
        "/graphql",
        json={"query": mutation, "variables": {"input": _gql_payload(booking_payload)}},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body.get("errors") is None
    booking = body["data"]["createBooking"]
    assert booking["villa"]["name"] == "Luxury Pool Villa"
    assert booking["guests"]["email"] == "hello@oceanresortbali.com"
    assert booking["status"] == "received"
    assert booking["total"] == 10978704


async def test_graphql_rejects_invalid_promo_code(client, booking_payload):
    mutation = """
      mutation($input: BookingInput!) {
        createBooking(input: $input) { id }
      }
    """
    payload = _gql_payload(dict(booking_payload, promo_code="NOPE"))
    resp = await client.post(
        "/graphql",
        json={"query": mutation, "variables": {"input": payload}},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body.get("data") is None
    assert body.get("errors") is not None
    assert "not valid" in body["errors"][0]["message"]


async def test_graphql_accepts_valid_promo_code(client, booking_payload):
    mutation = """
      mutation($input: BookingInput!) {
        createBooking(input: $input) { promoCode }
      }
    """
    # real catalog code, spelled differently: OceanRomance lowercased
    payload = _gql_payload(dict(booking_payload, promo_code="oceanromance"))
    resp = await client.post(
        "/graphql",
        json={"query": mutation, "variables": {"input": payload}},
    )
    assert resp.status_code == 200
    booking = resp.json()["data"]["createBooking"]
    assert booking["promoCode"] == "OceanRomance"


async def test_graphql_bookings_query(client, booking_payload):
    await client.post(
        "/graphql",
        json={
            "query": "mutation($i: BookingInput!) { createBooking(input: $i) { id } }",
            "variables": {"i": _gql_payload(booking_payload)},
        },
    )
    resp = await client.post("/graphql", json={"query": "query { bookings { id } }"})
    assert resp.status_code == 200
    assert len(resp.json()["data"]["bookings"]) == 1

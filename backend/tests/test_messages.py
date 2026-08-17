"""Contact message API tests (in-memory storage, no external services)."""


async def test_create_message(client):
    resp = await client.post(
        "/api/v1/messages",
        json={
            "name": "  Jane Doe ",
            "email": "Jane@Example.com",
            "subject": "Booking enquiry",
            "message": "  Do you have a pool villa free in October?  ",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["id"]
    assert data["name"] == "Jane Doe"  # trimmed
    assert data["email"] == "jane@example.com"  # trimmed + lowercased
    assert data["message"] == "Do you have a pool villa free in October?"
    assert "created_at" in data


async def test_message_subject_defaults(client):
    resp = await client.post(
        "/api/v1/messages",
        json={"name": "Jane", "email": "jane@example.com", "message": "Hello"},
    )
    assert resp.status_code == 201
    assert resp.json()["subject"] == "General enquiry"


async def test_rejects_message_without_name_or_body(client):
    resp = await client.post(
        "/api/v1/messages",
        json={"name": "", "email": "jane@example.com", "message": "Hello"},
    )
    assert resp.status_code == 422

    resp = await client.post(
        "/api/v1/messages",
        json={"name": "Jane", "email": "jane@example.com", "message": "  "},
    )
    assert resp.status_code == 422


async def test_rejects_invalid_email(client):
    resp = await client.post(
        "/api/v1/messages",
        json={"name": "Jane", "email": "not-an-email", "message": "Hello"},
    )
    assert resp.status_code == 422


async def test_messages_are_listed_newest_first(client):
    for i in range(3):
        await client.post(
            "/api/v1/messages",
            json={"name": f"Guest {i}", "email": f"guest{i}@example.com", "message": f"Message {i}"},
        )
    # No public list endpoint yet — verify persistence via the repository layer
    import app.repositories as repositories

    repo = await repositories.get_message_repository()
    stored = await repo.list()
    assert len(stored) == 3
    assert stored[0]["name"] == "Guest 2"

"""MongoDB repository logic tests using a fake async collection (no server needed).

Proves the document mapping (_id <-> id) and create/get/list flow that the
Mongo-backed store uses once docker-compose provides a real MongoDB.
"""

import app.repositories as repositories


class _FakeCursor:
    def __init__(self, docs):
        self._docs = docs
        self._sort = None

    def sort(self, key, direction):
        self._sort = (key, direction)
        return self

    async def to_list(self, length=None):
        docs = self._docs
        if self._sort:
            key, direction = self._sort
            docs = sorted(docs, key=lambda d: str(d.get(key, "")), reverse=(direction == -1))
        return [dict(d) for d in docs]


class _FakeCollection:
    def __init__(self):
        self.docs: dict[str, dict] = {}

    async def insert_one(self, doc):
        self.docs[doc["_id"]] = dict(doc)

    async def find_one(self, query):
        doc = self.docs.get(query.get("_id"))
        return dict(doc) if doc else None

    def find(self, query=None):
        return _FakeCursor(list(self.docs.values()))


class _FakeDb:
    def __init__(self, collection):
        self._collection = collection

    def __getitem__(self, name):
        return self._collection


def _make_booking(booking_id: str, created_at: str) -> dict:
    return {
        "id": booking_id,
        "checkin": "2026-09-29",
        "checkout": "2026-09-30",
        "status": "received",
        "total": 8625395,
        "created_at": created_at,
    }


async def test_mongo_repo_create_get(monkeypatch):
    collection = _FakeCollection()
    monkeypatch.setattr(repositories, "get_mongo_db", lambda: _FakeDb(collection))

    repo = repositories.MongoBookingRepository()
    booking = _make_booking("abc123", "2026-08-16T00:00:00Z")
    await repo.create(booking)

    # stored under _id, mapped back to id on read
    assert collection.docs["abc123"]["_id"] == "abc123"
    assert "id" not in collection.docs["abc123"]

    got = await repo.get("abc123")
    assert got["id"] == "abc123"
    assert got["total"] == 8625395
    assert got["created_at"] == "2026-08-16T00:00:00Z"


async def test_mongo_repo_get_missing_returns_none(monkeypatch):
    collection = _FakeCollection()
    monkeypatch.setattr(repositories, "get_mongo_db", lambda: _FakeDb(collection))

    repo = repositories.MongoBookingRepository()
    assert await repo.get("missing") is None


async def test_mongo_repo_list_sorted_newest_first(monkeypatch):
    collection = _FakeCollection()
    monkeypatch.setattr(repositories, "get_mongo_db", lambda: _FakeDb(collection))

    repo = repositories.MongoBookingRepository()
    await repo.create(_make_booking("old", "2026-08-01T00:00:00Z"))
    await repo.create(_make_booking("new", "2026-08-16T00:00:00Z"))
    await repo.create(_make_booking("mid", "2026-08-10T00:00:00Z"))

    docs = await repo.list()
    assert [d["id"] for d in docs] == ["new", "mid", "old"]

"""Booking persistence — MongoDB when available, else in-memory store."""

import asyncio
import logging
from typing import Any, Protocol

from .db import get_mongo_db, mongo_available

logger = logging.getLogger(__name__)


class BookingRepository(Protocol):
    async def create(self, booking: dict[str, Any]) -> dict[str, Any]:
        ...

    async def get(self, booking_id: str) -> dict[str, Any] | None:
        ...

    async def list(self) -> list[dict[str, Any]]:
        ...


class MongoBookingRepository:
    """Stores bookings in the `bookings` collection (document _id == booking id)."""

    COLLECTION = "bookings"

    async def create(self, booking: dict[str, Any]) -> dict[str, Any]:
        doc = dict(booking)
        doc["_id"] = doc.pop("id")
        await get_mongo_db()[self.COLLECTION].insert_one(doc)
        return booking

    async def get(self, booking_id: str) -> dict[str, Any] | None:
        doc = await get_mongo_db()[self.COLLECTION].find_one({"_id": booking_id})
        if doc is None:
            return None
        doc["id"] = doc.pop("_id")
        return doc

    async def list(self) -> list[dict[str, Any]]:
        docs = await get_mongo_db()[self.COLLECTION].find().sort("created_at", -1).to_list(length=100)
        for doc in docs:
            doc["id"] = doc.pop("_id")
        return docs


class MemoryBookingRepository:
    def __init__(self) -> None:
        self._store: dict[str, dict[str, Any]] = {}
        self._lock = asyncio.Lock()

    async def create(self, booking: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            self._store[booking["id"]] = dict(booking)
        return booking

    async def get(self, booking_id: str) -> dict[str, Any] | None:
        async with self._lock:
            doc = self._store.get(booking_id)
            return dict(doc) if doc is not None else None

    async def list(self) -> list[dict[str, Any]]:
        async with self._lock:
            items = sorted(self._store.values(), key=lambda b: str(b.get("created_at", "")), reverse=True)
            return [dict(i) for i in items]


_repo: BookingRepository | None = None
_repo_lock = asyncio.Lock()


async def get_booking_repository() -> BookingRepository:
    global _repo
    if _repo is not None:
        return _repo
    async with _repo_lock:
        if _repo is not None:
            return _repo
        if await mongo_available():
            _repo = MongoBookingRepository()
        else:
            _repo = MemoryBookingRepository()
            logger.info("Using in-memory booking store (MongoDB unavailable).")
        return _repo


class MessageRepository(Protocol):
    async def create(self, message: dict[str, Any]) -> dict[str, Any]:
        ...

    async def list(self) -> list[dict[str, Any]]:
        ...


class MongoMessageRepository:
    """Stores contact messages in the `messages` collection."""

    COLLECTION = "messages"

    async def create(self, message: dict[str, Any]) -> dict[str, Any]:
        doc = dict(message)
        doc["_id"] = doc.pop("id")
        await get_mongo_db()[self.COLLECTION].insert_one(doc)
        return message

    async def list(self) -> list[dict[str, Any]]:
        docs = await get_mongo_db()[self.COLLECTION].find().sort("created_at", -1).to_list(length=100)
        for doc in docs:
            doc["id"] = doc.pop("_id")
        return docs


class MemoryMessageRepository:
    def __init__(self) -> None:
        self._store: dict[str, dict[str, Any]] = {}
        self._lock = asyncio.Lock()

    async def create(self, message: dict[str, Any]) -> dict[str, Any]:
        async with self._lock:
            self._store[message["id"]] = dict(message)
        return message

    async def list(self) -> list[dict[str, Any]]:
        async with self._lock:
            items = sorted(self._store.values(), key=lambda m: str(m.get("created_at", "")), reverse=True)
            return [dict(i) for i in items]


_msg_repo: MessageRepository | None = None
_msg_repo_lock = asyncio.Lock()


async def get_message_repository() -> MessageRepository:
    global _msg_repo
    if _msg_repo is not None:
        return _msg_repo
    async with _msg_repo_lock:
        if _msg_repo is not None:
            return _msg_repo
        if await mongo_available():
            _msg_repo = MongoMessageRepository()
        else:
            _msg_repo = MemoryMessageRepository()
            logger.info("Using in-memory message store (MongoDB unavailable).")
        return _msg_repo

"""Promo-code repository — MongoDB-backed with a graceful in-memory fallback.

Mongo documents live in the `promos` collection:
    {"_id": "oceandolphins", "code": "OceanDolphins", "label": "...",
     "discount_percent": 15, "active": true}

When Mongo is unreachable, the static PROMOS catalog from app/catalog.py is
used (still fully functional, just not persistent).
"""

import asyncio
import logging
from typing import Any, Protocol

from .catalog import PROMOS
from .db import get_mongo_db, mongo_available

logger = logging.getLogger(__name__)


class PromoRepository(Protocol):
    async def list(self, active_only: bool = True) -> list[dict[str, Any]]:
        ...

    async def get(self, code: str) -> dict[str, Any] | None:
        ...

    async def create(self, promo: dict[str, Any]) -> dict[str, Any]:
        ...

    async def set_active(self, code: str, active: bool) -> dict[str, Any] | None:
        ...


class MongoPromoRepository:
    COLLECTION = "promos"

    async def list(self, active_only: bool = True) -> list[dict[str, Any]]:
        query = {"active": True} if active_only else {}
        docs = await get_mongo_db()[self.COLLECTION].find(query).to_list(length=100)
        return [self._to_doc(d) for d in docs]

    async def get(self, code: str) -> dict[str, Any] | None:
        doc = await get_mongo_db()[self.COLLECTION].find_one({"_id": code.strip().lower()})
        return self._to_doc(doc) if doc else None

    async def create(self, promo: dict[str, Any]) -> dict[str, Any]:
        doc = dict(promo)
        doc["_id"] = doc["code"].strip().lower()
        await get_mongo_db()[self.COLLECTION].insert_one(doc)
        return self._to_doc(doc)

    async def set_active(self, code: str, active: bool) -> dict[str, Any] | None:
        result = await get_mongo_db()[self.COLLECTION].find_one_and_update(
            {"_id": code.strip().lower()},
            {"$set": {"active": active}},
            return_document=True,
        )
        return self._to_doc(result) if result else None

    @staticmethod
    def _to_doc(doc: dict[str, Any]) -> dict[str, Any]:
        out = dict(doc)
        if "_id" in out and "code" not in out:
            out["code"] = out.pop("_id")
        out.pop("_id", None)
        return out


class MemoryPromoRepository:
    def __init__(self) -> None:
        self._store: dict[str, dict[str, Any]] = {}
        for p in PROMOS:
            self._store[p["code"].lower()] = dict(p)

    async def list(self, active_only: bool = True) -> list[dict[str, Any]]:
        items = [dict(p) for p in self._store.values()]
        if active_only:
            items = [p for p in items if p.get("active", True)]
        return sorted(items, key=lambda p: p["code"].lower())

    async def get(self, code: str) -> dict[str, Any] | None:
        item = self._store.get(code.strip().lower())
        return dict(item) if item else None

    async def create(self, promo: dict[str, Any]) -> dict[str, Any]:
        key = promo["code"].strip().lower()
        if key in self._store:
            raise ValueError(f"promo code '{promo['code']}' already exists")
        self._store[key] = dict(promo)
        return dict(promo)

    async def set_active(self, code: str, active: bool) -> dict[str, Any] | None:
        key = code.strip().lower()
        item = self._store.get(key)
        if item is None:
            return None
        item["active"] = active
        return dict(item)


_repo: PromoRepository | None = None
_repo_lock = asyncio.Lock()


async def get_promo_repository() -> PromoRepository:
    global _repo
    if _repo is not None:
        return _repo
    async with _repo_lock:
        if _repo is not None:
            return _repo
        if await mongo_available():
            _repo = MongoPromoRepository()
        else:
            _repo = MemoryPromoRepository()
            logger.info("Using in-memory promo store (MongoDB unavailable).")
        return _repo


async def list_promos(active_only: bool = True) -> list[dict[str, Any]]:
    return await (await get_promo_repository()).list(active_only=active_only)


async def get_promo(code: str) -> dict[str, Any] | None:
    return await (await get_promo_repository()).get(code)


async def create_promo(promo: dict[str, Any]) -> dict[str, Any]:
    return await (await get_promo_repository()).create(promo)


async def set_promo_active(code: str, active: bool) -> dict[str, Any] | None:
    return await (await get_promo_repository()).set_active(code, active)

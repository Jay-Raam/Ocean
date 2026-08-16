"""Async database/cache clients.

MongoDB (motor) and Redis are used when reachable; otherwise the app degrades to
in-memory storage/cache so the API is fully runnable without external services.
"""

import asyncio
import logging
import time
from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient
from redis.asyncio import Redis

from .config import get_settings

logger = logging.getLogger(__name__)

_mongo_client: AsyncIOMotorClient | None = None
_redis_client: Redis | None = None
_availability: dict[str, bool | None] = {"mongo": None, "redis": None}
_checks = asyncio.Lock()


async def mongo_available() -> bool:
    """Ping Mongo once (cached). Returns False when unreachable."""
    global _mongo_client
    if _availability["mongo"] is not None:
        return _availability["mongo"]
    async with _checks:
        if _availability["mongo"] is not None:
            return _availability["mongo"]
        settings = get_settings()
        try:
            client = AsyncIOMotorClient(settings.mongo_uri, serverSelectionTimeoutMS=1500)
            await client.admin.command("ping")
            _mongo_client = client
            _availability["mongo"] = True
            logger.info("MongoDB connected: %s", settings.mongo_uri)
        except Exception as exc:  # noqa: BLE001
            _availability["mongo"] = False
            logger.warning("MongoDB unavailable (%s) — falling back to in-memory storage.", exc)
    return _availability["mongo"]


def get_mongo_db() -> Any:
    settings = get_settings()
    if _mongo_client is None:
        raise RuntimeError("MongoDB client is not initialised")
    return _mongo_client[settings.mongo_db]


async def redis_available() -> bool:
    """Ping Redis once (cached). Returns False when unreachable."""
    global _redis_client
    if _availability["redis"] is not None:
        return _availability["redis"]
    async with _checks:
        if _availability["redis"] is not None:
            return _availability["redis"]
        settings = get_settings()
        try:
            client = Redis.from_url(settings.redis_url, socket_connect_timeout=1.0)
            await client.ping()
            _redis_client = client
            _availability["redis"] = True
            logger.info("Redis connected: %s", settings.redis_url)
        except Exception as exc:  # noqa: BLE001
            _availability["redis"] = False
            logger.warning("Redis unavailable (%s) — falling back to in-memory cache.", exc)
    return _availability["redis"]


def get_redis() -> Redis:
    if _redis_client is None:
        raise RuntimeError("Redis client is not initialised")
    return _redis_client


async def storage_health() -> dict[str, bool]:
    return {
        "mongo": await mongo_available(),
        "redis": await redis_available(),
    }

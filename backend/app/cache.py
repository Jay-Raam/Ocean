"""TTL cache — Redis when available, otherwise an in-memory fallback."""

import asyncio
import json
import logging
import time
from typing import Any

from .config import get_settings
from .db import get_redis, redis_available

logger = logging.getLogger(__name__)


class _MemoryCache:
    def __init__(self) -> None:
        self._data: dict[str, tuple[float, str]] = {}
        self._lock = asyncio.Lock()

    async def get(self, key: str) -> str | None:
        async with self._lock:
            item = self._data.get(key)
            if item is None:
                return None
            expires_at, value = item
            if time.monotonic() > expires_at:
                self._data.pop(key, None)
                return None
            return value

    async def set(self, key: str, value: str, ttl: int) -> None:
        async with self._lock:
            self._data[key] = (time.monotonic() + ttl, value)

    async def clear(self) -> None:
        async with self._lock:
            self._data.clear()


_memory: _MemoryCache = _MemoryCache()


async def cache_get_json(key: str) -> Any | None:
    settings = get_settings()
    if await redis_available():
        try:
            raw = await get_redis().get(key)
            if raw is not None:
                return json.loads(raw)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Redis cache get failed: %s", exc)
            return None
    raw = await _memory.get(key)
    return json.loads(raw) if raw is not None else None


async def cache_set_json(key: str, value: Any, ttl: int | None = None) -> None:
    settings = get_settings()
    ttl = ttl if ttl is not None else settings.cache_ttl_seconds
    raw = json.dumps(value, default=str)
    if await redis_available():
        try:
            await get_redis().set(key, raw, ex=ttl)
            return
        except Exception as exc:  # noqa: BLE001
            logger.warning("Redis cache set failed: %s", exc)
    await _memory.set(key, raw, ttl)

"""Promo REST endpoints — quick check, list, and admin create/disable.

Admin endpoints (POST /promos, PATCH /promos/{code}) are unauthenticated for
this dev API — add auth before exposing publicly.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..promos import create_promo, get_promo, list_promos, set_promo_active

router = APIRouter()


class PromoCreate(BaseModel):
    code: str = Field(min_length=1)
    label: str = Field(min_length=1)
    discount_percent: int = Field(ge=1, le=100)
    active: bool = True


class PromoPatch(BaseModel):
    active: bool


def _serialize(promo: dict) -> dict:
    return {
        "code": promo["code"],
        "label": promo["label"],
        "discount_percent": promo["discount_percent"],
        "active": bool(promo.get("active", True)),
    }


@router.get("/promos")
async def api_list_promos(all: bool = False) -> list[dict]:
    """Active promos by default; pass ?all=true to include disabled ones."""
    promos = await list_promos(active_only=not all)
    return [_serialize(p) for p in promos]


@router.get("/promo/check")
async def api_check_promo(code: str) -> dict:
    """Quick validity check used by the booking modal's Dates step."""
    code = (code or "").strip()
    if not code:
        return {"valid": False, "reason": "empty"}
    promo = await get_promo(code)
    if promo is None or not promo.get("active", True):
        return {"valid": False, "reason": "unknown code"}
    return {"valid": True, "promo": _serialize(promo)}


@router.post("/promos", status_code=201)
async def api_create_promo(payload: PromoCreate) -> dict:
    try:
        promo = await create_promo(
            {
                "code": payload.code.strip(),
                "label": payload.label.strip(),
                "discount_percent": payload.discount_percent,
                "active": payload.active,
            }
        )
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc))
    return _serialize(promo)


@router.patch("/promos/{code}")
async def api_set_promo_active(code: str, patch: PromoPatch) -> dict:
    promo = await set_promo_active(code, patch.active)
    if promo is None:
        raise HTTPException(status_code=404, detail="Promo not found")
    return _serialize(promo)

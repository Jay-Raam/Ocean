"""Ocean Resort API — FastAPI + Pydantic v2 + MongoDB + Redis + REST & GraphQL."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

from .config import get_settings
from .db import storage_health
from .graphql import schema
from .routers.api import router as api_router
from .routers.promos import router as promos_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("ocean")


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Warm the storage health flags so Mongo/Redis availability is logged once at boot
    await storage_health()
    yield


settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_prefix)
app.include_router(promos_router, prefix=settings.api_prefix)

# GraphiQL IDE is enabled by default on the /graphql route
app.include_router(GraphQLRouter(schema), prefix="/graphql")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "services": await storage_health()}

"""Application configuration via pydantic-settings (env vars / .env file)."""

from functools import lru_cache
from typing import Annotated

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Ocean Resort API"
    api_prefix: str = "/api/v1"

    # MongoDB
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db: str = "ocean"

    # Redis cache
    redis_url: str = "redis://localhost:6379/0"
    cache_ttl_seconds: int = 300

    # CORS — comma-separated list; NoDecode passes the raw string to the validator
    cors_origins: Annotated[
        list[str],
        NoDecode,
    ] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _parse_cors_origins(cls, v):
        # accept either JSON ("[\"http://a\"]") or a comma-separated list
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    # Notifications (optional — all empty by default)
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    mail_from: str | None = None
    # Comma-separated recipients for booking requests. Defaults to MAIL_FROM.
    mail_to: str | None = None
    # Also send a copy of the confirmation to the guest's email address.
    mail_guest_confirm: bool = False
    webhook_url: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()

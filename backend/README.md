# Ocean Resort – Bali · Backend

Booking API for **Ocean Resort – Bali** — FastAPI + Pydantic v2 + MongoDB +
Redis, exposing the same surface over **REST** and **GraphQL**.

## Features

- **Booking requests** — create/list/get bookings; totals, PPN (10%) and
  promo discounts are computed server-side, never trusted from the client
- **Promo codes** — validate, list, create and enable/disable codes
- **Villa catalog & rates** — served from a bundled catalog, cached
- **Dual API** — REST (`/api/v1`) and GraphQL (`/graphql`, with GraphiQL IDE)
- **Resilient storage** — uses MongoDB + Redis when reachable, otherwise falls
  back to in-memory storage/cache and logs a warning (so the API boots
  anywhere)
- **Notifications** — optional SMTP email + webhook delivery for new bookings

## Requirements

- Python **≥ 3.13**

## Quick start

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # adjust as needed (optional)
uvicorn app.main:app --reload    # http://localhost:8000
```

Check it's alive:

```bash
curl http://localhost:8000/health
# {"status":"ok","services":{...}}
```

Without Mongo/Redis configured, the API still runs fully in memory — restart
and data is gone.

## Configuration

All settings come from environment variables / a `.env` file (see
`.env.example`). Every value is optional.

| Variable              | Default                    | Purpose                                        |
| --------------------- | -------------------------- | ---------------------------------------------- |
| `APP_NAME`            | `Ocean Resort API`         | API title                                      |
| `API_PREFIX`          | `/api/v1`                  | REST prefix                                    |
| `MONGO_URI`           | `mongodb://localhost:27017`| MongoDB connection                             |
| `MONGO_DB`            | `ocean`                    | MongoDB database                               |
| `REDIS_URL`           | `redis://localhost:6379/0` | Redis cache connection                         |
| `CACHE_TTL_SECONDS`   | `300`                      | Catalog/rates cache lifetime                   |
| `CORS_ORIGINS`        | localhost:5173/5174        | Comma-separated allowed origins                |
| `SMTP_HOST`/`SMTP_*`  | *(empty)*                  | SMTP for booking emails (unset = disabled)     |
| `MAIL_FROM`/`MAIL_TO` | *(empty)*                  | Email sender / recipients                      |
| `MAIL_GUEST_CONFIRM`  | `false`                    | CC the guest on booking confirmations          |
| `WEBHOOK_URL`         | *(empty)*                  | POST the booking payload to this URL           |

## Running with Docker Compose

```bash
cd backend
docker compose up --build        # MongoDB + Redis + API
docker compose up mongo redis    # datastores only, run uvicorn locally
```

The compose file overrides `MONGO_URI`/`REDIS_URL` with the service names so
the API container talks to the bundled instances.

## API surface

### REST (`/api/v1`)

| Method | Path                  | Description                                        |
| ------ | --------------------- | -------------------------------------------------- |
| POST   | `/bookings`           | Create a booking request (201)                     |
| GET    | `/bookings`           | List all bookings                                  |
| GET    | `/bookings/{id}`      | Get one booking                                    |
| POST   | `/messages`           | Store a contact form message + notify the team (201)|
| GET    | `/villas`             | Villa catalog (cached)                             |
| GET    | `/rates?checkin&checkout` | Rates per villa for a date range (cached)      |
| GET    | `/promos?all=`        | Active promos (`?all=true` includes disabled)      |
| GET    | `/promo/check?code=`  | Quick promo validity check (used by the booking UI)|
| POST   | `/promos`             | Create a promo (admin — unauthenticated in dev)    |
| PATCH  | `/promos/{code}`      | Enable/disable a promo (admin — unauthenticated)   |
| GET    | `/health`             | Liveness + service availability                    |

### GraphQL (`/graphql`)

- **Queries:** `bookings`, `booking(id)`, `villas`, `packages`, `promos`,
  `rates(checkin, checkout)`
- **Mutation:** `createBooking(input)` — mirrors the REST payload

GraphiQL is enabled at `/graphql` for interactive exploration.

> **Note:** the promo admin endpoints are intentionally unauthenticated for
> local development. Add authentication before exposing them publicly.

## Tests

```bash
pytest                       # or: python -m pytest
```

Coverage includes the REST + GraphQL routes, repositories (Mongo/in-memory),
and notification sending (SMTP mocked).

## Project structure

```
app/
├── main.py            # FastAPI app, CORS, routers, lifespan
├── config.py          # pydantic-settings configuration
├── models.py          # Pydantic request/response models
├── catalog.py         # Static villa catalog
├── promos.py          # Promo code repository + business rules
├── services.py        # Booking creation, pricing, validation, contact messages
├── repositories.py    # Storage layer (Mongo ↔ in-memory fallback)
├── db.py              # Motor client + health checks
├── cache.py           # Redis ↔ in-memory fallback cache
├── notifications.py   # SMTP email + webhook delivery (bookings + messages)
├── graphql.py         # Strawberry schema (queries + mutation)
└── routers/
    ├── api.py         # REST: bookings, villas, rates, messages
    └── promos.py      # REST: promo endpoints
tests/                 # pytest suite
```

The `POST /messages` endpoint stores contact-form submissions (name, email,
subject, message) and delivers them through the same notification channels
as bookings — email to `MAIL_TO` (with `Reply-To` set to the sender) and the
configured `WEBHOOK_URL`. It is used by the frontend's `/contact` page.

## Related

- [`../frontend/README.md`](../frontend/README.md) — React/Vite frontend

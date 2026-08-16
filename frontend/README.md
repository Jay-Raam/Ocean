# Ocean Resort – Bali · Frontend

Marketing site + booking engine for **Ocean Resort – Bali**, a luxury boutique
resort in Lovina, North Bali. React SPA wired to its own FastAPI booking
backend.

## Tech stack

| Layer        | Choice                                            |
| ------------ | ------------------------------------------------- |
| Framework    | React 19 + TypeScript                             |
| Build        | Vite 8                                            |
| Routing      | React Router 7 (lazy route-level code-splitting)  |
| Animation    | `motion` (Framer Motion), Lenis smooth scroll     |
| Sliders      | Swiper + a custom carousel                         |
| Styling      | Plain CSS in `src/styles/` + Tailwind CSS 4        |
| Linting      | oxlint                                            |
| Hosting      | Netlify (`public/_redirects`, `public/_headers`)  |

## Quick start

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

The site runs without a backend — catalog data lives in `src/lib/content.ts`
and `src/lib/blog.ts`. To make the booking modal and promo checks talk to the
real API, start the [backend](../backend/README.md) (see below for wiring).

### Backend wiring

Vite proxies API and GraphQL calls to a local FastAPI server:

| Client path | Proxy target          |
| ----------- | --------------------- |
| `/api/*`    | `http://127.0.0.1:8000` |
| `/graphql`  | `http://127.0.0.1:8000` |

## Environment variables

Optional, set in `.env` at the project root (or via the shell):

| Variable           | Default        | Purpose                                            |
| ------------------ | -------------- | -------------------------------------------------- |
| `VITE_API_BASE`    | `/api/v1`      | REST base for a deployed backend                   |
| `VITE_GRAPHQL_URL` | `/graphql`     | GraphQL endpoint for a deployed backend            |
| `VITE_USE_GRAPHQL` | (unset)        | Set to `1` to prefer live GraphQL catalog data     |

## Scripts

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Vite dev server with API/GraphQL proxy                   |
| `npm run build`     | `tsc -b` + `vite build` + precompress assets (`.br`/`.gz`) |
| `npm run lint`      | oxlint                                                   |
| `npm run preview`   | Serve the built `dist/` with cache headers + proxy       |

`npm run build` produces `dist/` with gzip/brotli siblings for every text
asset (`scripts/compress-dist.mjs`). The `vite preview` server and
`nginx-cache.conf` serve those precompressed variants.

## Project structure

```
src/
├── components/
│   ├── booking/       # BookingModal + DateRangePicker + catalog data
│   ├── hero/          # Home hero with loader phases
│   ├── layout/        # Header, Footer, FloatingElements, PageShell, Loader
│   ├── motion/        # Reveal / page-transition helpers
│   ├── sections/      # Home & page section components (ImageSplit, MenuSection, …)
│   └── ui/            # Button, Link, IconLink, ParallaxImage, CustomCursor, icons
├── hooks/             # useLenis, useScrollState, usePageMeta, useMediaQuery, …
├── lib/               # content, blog, assets, brand, api (REST), graphql, AppContext
├── pages/             # One file per route (Stay, Dining, Relax, Discover, Packages, Blog, …)
└── styles/            # globals, components, sections, booking (design system)
```

### Booking engine

`src/components/booking/BookingModal.tsx` is a 5-step wizard — Dates →
Categories → Rates → Summary → Details — with:

- date range picker, guest/occupancy counters, villa carousels
- promo-code validation (`checkPromo`) and available-codes listing
- server-side pricing mirror (PPN 10%, promo discount) matching the backend
- currency toggle (INR / IDR)
- keyboard (Escape, Tab trap) + focus management

The modal resets all state each time it opens, so every "Book" click starts
fresh at step 1. On small screens the stepper collapses to three zones
(currency | scrollable steps | close) so the steps never overlap the buttons.

## SEO & deployment

- **Netlify**: `public/_redirects` handles SPA fallback plus **301 redirects**
  for the legacy package slugs (`/packages/damai-*` → `/packages/ocean-*`)
  and the renamed blog slug. `public/_headers` sets cache headers.
- **`public/sitemap.xml`** lists every indexable page (including the three
  package pages); **`public/robots.txt`** references it.
- Every page emits `<link rel="canonical">` and `og:url` from its current
  pathname via `usePageMeta`, so renamed routes always declare their final URL.
- The site domain used in the sitemap/robots is `https://oceanresortbali.com`
  — update both files if the production domain differs.

## Related

- [`../backend/README.md`](../backend/README.md) — FastAPI booking API

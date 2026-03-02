# Roami — Project Handoff

**Date:** 2026-03-02
**Status:** Live at https://roami.world
**Branch:** `main`

---

## Current Status (2026-03-02)

### What's live

NLP-powered city break search engine. Users type natural language ("somewhere warm under £400"), get real flight deals with pricing, confidence scoring, price sparklines, and a contact-to-book flow.

### What changed this session

1. **Booking intent persistence** — `/api/track` now saves `bookingIntents` count + `bookingIntentDealIds` to the Supabase session profile. Previously accepted but silently discarded.
2. **Redis embedding cache** — OpenAI embedding results cached in Upstash Redis (7-day TTL) with in-memory L1 cache. Eliminates redundant API calls after Vercel cold starts.
3. **Country names fixed** — Duffel Places API fallback now extracts `country_name` and sets `slug` on resolved destinations. Previously hardcoded as empty string.
4. **Amadeus hotel pipeline fixed** — Destinations resolved via Duffel Places fallback now have slugs, so Amadeus hotel search actually runs. Previously skipped because `.filter(rd => rd.slug)` filtered them out.
5. **Amadeus test environment** — Switched to `test.api.amadeus.com` (configurable via `AMADEUS_BASE_URL`). Test credentials were being rejected by production endpoint.
6. **Architecture review** — Full written review with Mermaid diagrams at `docs/plans/2026-03-01-architecture-review.md`.
7. **README restored** — Replaced Next.js boilerplate with proper Roami documentation.

### What's working

- Search returns deals with country names ("Barcelona, Spain")
- Amadeus hotels work for cities with test data (London → "W London", Paris → "Best Western Paris CDG Airport")
- Price sparklines render when 2+ price observations exist for a route
- Booking flow: "Book This Deal" → deal summary → email/WhatsApp contact CTAs
- Session personalisation: search history, interests, budget signals, booking intents all tracked
- Embedding cache survives cold starts via Redis

### What's not working / known gaps

1. **Most cities show "Hotel TBC"** — Amadeus test environment only has hotel data for a few cities. Fix: upgrade to Amadeus production credentials and set `AMADEUS_BASE_URL=https://api.amadeus.com`
2. **Price sparklines sparse** — Need 2+ searches for the same route before sparklines render. No seed data.
3. **No payment integration** — Booking is manual via email (hello@roami.world) / WhatsApp (+447730569793)
4. **Origin hardcoded to LHR** — Should be configurable per user

---

## Architecture

See `docs/plans/2026-03-01-architecture-review.md` for full diagrams and review.

```
User query → POST /api/search
  → Claude Haiku (NLP parse) → OpenAI (embedding) → Supabase pgvector (destination match)
  → Duffel (flights, parallel) + Duffel Stays → (if empty) → Amadeus Hotels (fallback)
  → Deal Builder (pricing + FX + 5-factor confidence scoring + price intelligence)
  → Response (top 6 deals, stripped of internal margin data)

Deal card click → sessionStorage deal store → /deal/[id] → DealDetail page
  → "Book This Deal" → /deal/[id]/book → ContactSection (email + WhatsApp CTAs)
```

### Key modules

| File | Purpose |
|------|---------|
| `src/lib/nlp-parser.ts` | Claude Haiku NLP intent extraction |
| `src/lib/embeddings.ts` | OpenAI embeddings + Redis cache (7-day TTL) |
| `src/lib/destination-search.ts` | Supabase pgvector cosine similarity |
| `src/lib/duffel-client.ts` | Duffel flights + stays + destination resolution |
| `src/lib/amadeus-client.ts` | Amadeus Hotel Search (OAuth 2.0, 2-step, test env) |
| `src/lib/deal-builder.ts` | Deal assembly, 5-factor scoring, price history |
| `src/lib/pricing.ts` | Pricing engine (Duffel fees + 5% markup + ATOL) |
| `src/lib/price-intelligence.ts` | Redis price observations, percentiles, sparkline data |
| `src/lib/fx-rates.ts` | Live FX rates with 24h cache |
| `src/lib/deal-store.ts` | Client-side deal store (sessionStorage + useSyncExternalStore) |
| `src/lib/session-store.ts` | Server-side session persistence (Supabase) |
| `src/app/api/search/route.ts` | Main search orchestrator |
| `src/app/api/track/route.ts` | Event tracking (breakdown_click, pro_interest, booking_intent) |
| `src/app/api/booking/confirm/route.ts` | Duffel order creation (test mode) |

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Search page (NlpSearchDemo hero) |
| `/deal/[id]` | Deal detail (flight timeline, hotel, price breakdown, ancillaries) |
| `/deal/[id]/book` | Booking page (deal summary + email/WhatsApp contact CTAs) |

---

## Environment Variables

```
ANTHROPIC_API_KEY=          # Required — Claude Haiku NLP parsing
DUFFEL_API_TOKEN=           # Required — flight search (live token)
OPENAI_API_KEY=             # Optional — semantic embeddings (degrades to keyword without)
SUPABASE_URL=               # Required — destination database
SUPABASE_SERVICE_ROLE_KEY=  # Required — Supabase auth
NEXT_PUBLIC_SUPABASE_URL=   # Required — client-side Supabase URL
UPSTASH_REDIS_REST_URL=     # Required — rate limiting, price intelligence, embedding cache
UPSTASH_REDIS_REST_TOKEN=   # Required
AMADEUS_API_KEY=            # Optional — hotel search fallback
AMADEUS_API_SECRET=         # Optional — hotel search fallback
AMADEUS_BASE_URL=           # Optional — defaults to test.api.amadeus.com
```

---

## Testing

```bash
npm test            # 115 tests across 8 files
npx tsc --noEmit    # type check
npm run build       # production build
npm run dev         # dev server on localhost:3000
```

---

## What to Tackle Next

Ranked by impact for friends testing:

1. **Amadeus production credentials** — upgrade from test to production for real hotel names everywhere
2. **Seed price history** — pre-populate Redis with price observations so sparklines render from first search
3. **Mobile responsiveness pass** — deal detail + booking pages on phones
4. **Origin airport selection** — let users pick departure airport (currently hardcoded LHR)
5. **Error UX** — better error messages, retry with modified query suggestion
6. **Pro tier validation** — monitor breakdownClicks and proInterestClicked metrics to gauge demand

---

## Commits This Session

```
8c96ef2 fix: use Amadeus test environment by default
d8bc350 fix: remove debug logging from search route
8b4b826 fix: populate country and slug on Duffel Places fallback destinations
6e44b18 Fix: persist booking intents + Redis embedding cache (#9)
```

---

## Strategy & Research

- `docs/plans/2026-03-01-architecture-review.md` — Architecture review with Mermaid diagrams
- `docs/strategy/00-gap-analysis.md` — Start here for strategic context
- `docs/strategy/` — 14 framework analyses (BMC, Blue Ocean, Porter's, Wardley, etc.)
- `docs/research/` — Revenue models, Duffel economics, bed bank analysis

---

## Next Session Checklist

- [ ] Read this file for context
- [ ] Check if Amadeus production credentials are available
- [ ] Run `npm run dev` — localhost:3000
- [ ] Production is live at https://roami.world
- [ ] Check `vercel env ls` matches `.env.example` after any deploy

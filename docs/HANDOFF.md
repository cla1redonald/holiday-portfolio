# Roami — Project Handoff

**Date:** 2026-03-02
**Status:** Live at https://roami.world
**Branch:** `main`

---

## Current Status (2026-03-02, session 2)

### What's live

NLP-powered city break search engine. Users type natural language ("somewhere warm under £400"), get real flight deals with pricing, confidence scoring, price sparklines, and a contact-to-book flow. Multi-airport origin selection, mobile-responsive UI, and friendly error handling.

### What changed this session

1. **Error UX** — SearchError component with type-specific banners: rate limit (countdown timer + single auto-retry, then manual), server error and network (retry button), service unavailable (wait message). Replaces silent failures.
2. **Origin airport selector** — 9 UK airport pills below the search bar (LHR, LGW, MAN, STN, EDI, BHX, BRS, GLA, LTN). Multi-select with min-1 constraint, persisted in sessionStorage, validated against known codes.
3. **Multi-origin flight search** — Backend fans out Duffel searches across selected origins × destinations (round-robin, capped at 15 parallel). NLP-parsed origin overrides client selection when user mentions an airport in their query.
4. **Mobile responsiveness** — DealCard: adaptive image height, tighter padding, scaled price text, 44px touch targets. DealDetail: responsive hero overlay, stacked price intelligence grid on narrow screens.
5. **Accessibility** — OriginSelector pills have `aria-pressed` and `type="button"`.

### Previous session changes (2026-03-02, session 1)

1. Booking intent persistence — `/api/track` saves bookingIntents to Supabase session
2. Redis embedding cache — 7-day TTL with in-memory L1 cache
3. Country names fixed — Duffel Places fallback populates country_name and slug
4. Amadeus hotel pipeline fixed — slugs now present so hotel search runs
5. Amadeus test environment — switched to test.api.amadeus.com
6. Architecture review — `docs/plans/2026-03-01-architecture-review.md`
7. README restored

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
| `src/lib/duffel-client.ts` | Duffel flights (multi-origin fan-out) + stays + destination resolution |
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
npm test            # 115 tests across 8 files (all passing)
npx tsc --noEmit    # type check
npm run build       # production build
npm run dev         # dev server on localhost:3000
```

---

## What to Tackle Next

Ranked by impact for friends testing:

1. **Amadeus production credentials** — upgrade from test to production for real hotel names everywhere
2. **Seed price history** — pre-populate Redis with price observations so sparklines render from first search
3. ~~Mobile responsiveness pass~~ — done (PR #10)
4. ~~Origin airport selection~~ — done (PR #10)
5. ~~Error UX~~ — done (PR #10)
6. **Pro tier validation** — monitor breakdownClicks and proInterestClicked metrics to gauge demand

---

## Commits This Session

```
acfeba9 feat: mobile responsiveness, origin selector, error UX (#10)
```

### Previous session commits
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

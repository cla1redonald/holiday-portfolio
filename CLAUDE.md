# Roami

NLP-powered city break search engine. Users type natural language queries ("Greek islands for a couple under £600") and get scored travel deals with real flights via Duffel.

## Strategic Context

Thin vertical slice approach: build city breaks end-to-end for friends testing before expanding. Acceptable to run at loss/break-even during testing phase. See `docs/strategy/00-gap-analysis.md` for full context.

## Tech Stack

- Next.js 16.1.6 (App Router) + React 19 + TypeScript
- Supabase (pgvector for 447 destination embeddings, sessions table)
- Duffel API (flights, stays pending sales contact)
- Claude Haiku (NLP query parsing) via `@anthropic-ai/sdk`
- OpenAI text-embedding-3-small (semantic search) via `openai`
- Upstash Redis (price intelligence cache) via `@upstash/redis`
- Tailwind CSS v4 (CSS-first config)
- Vitest (testing)
- Deployed on Vercel

## Architecture

Search pipeline: NLP parse → embed query → Supabase vector search → Duffel flights+stays (parallel, Amadeus hotel fallback) → deal-builder (pricing, FX, confidence scoring) → response

Key modules:
- `src/lib/nlp-parser.ts` — Claude Haiku extracts destinations, dates, budget, travellers from natural language
- `src/lib/embeddings.ts` — OpenAI embeddings for semantic destination matching
- `src/lib/destination-search.ts` — Supabase pgvector cosine similarity search
- `src/lib/duffel-client.ts` — Duffel flight/stays API client
- `src/lib/amadeus-client.ts` — Amadeus Hotel Search fallback (OAuth 2.0, 2-step: hotel list by city → hotel offers by IDs)
- `src/lib/deal-builder.ts` — Assembles scored deals from flights+stays, 5-factor confidence scoring
- `src/lib/pricing.ts` — Pricing engine: $3 flat + 1% flight fee, configurable markup (default 5%), ATOL £2.50/pax
- `src/lib/fx-rates.ts` — Live FX rates from open.er-api.com with 24h cache
- `src/lib/price-intelligence.ts` — Market price tracking via Upstash Redis
- `src/lib/session-store.ts` — Server-side session persistence (Supabase)
- `src/lib/session-preferences.ts` — Client-side session tracking (sessionStorage)
- `src/lib/deal-store.ts` — Client-side deal store (useSyncExternalStore) for passing deals between pages

## API Routes

- `POST /api/search` — Main search endpoint (rate-limited, session-aware)
- `POST /api/booking/confirm` — Duffel order creation (test mode: balance payment)
- `POST /api/track` — Session event tracking (breakdown_click, pro_interest)
- `GET /api/health` — Liveness probe
- `POST /api/waitlist` — Email capture

## Database

- `destinations` table — 447 cities with pgvector embeddings, HNSW index
- `sessions` table — User session profiles (JSONB), 30-day expiry
- RLS enabled on both tables (service role access only for sessions)

## Environment Variables

```
ANTHROPIC_API_KEY=          # Required
DUFFEL_API_TOKEN=           # Required
OPENAI_API_KEY=             # Optional — search degrades to keyword matching without it
SUPABASE_URL=               # Required
SUPABASE_SERVICE_ROLE_KEY=  # Required
UPSTASH_REDIS_REST_URL=     # Required — rate limiting, price intelligence, deal scoring
UPSTASH_REDIS_REST_TOKEN=   # Required
AMADEUS_API_KEY=            # Optional — hotel fallback unavailable without it
AMADEUS_API_SECRET=         # Optional — hotel fallback unavailable without it
```

Copy `.env.example` to `.env.local` to get started.

## Testing

Run tests: `npm test`
Run typecheck: `npx tsc --noEmit`
Build: `npm run build`
Dev server: `npm run dev` (localhost:3000)

114 tests across 8 files in `src/lib/__tests__/`. Core coverage: deal-builder, pricing, fx-rates, price-intelligence, duffel-client, amadeus-client, embeddings, destination-search.

## Conventions

- All prices in GBP (convert via fx-rates.ts)
- Supabase client is server-only (service role key, never exposed to client)
- Session linked by httpOnly cookie `roami_sid`
- Deal confidence: 0-100 scale, 5 factors (price percentile, semantic similarity, lead time, trend, session alignment)
- Internal fields `netMargin` and `isLossMaker` stripped before client response
- Rate limit: 5 requests per IP per 60 seconds on `/api/search`, 20/min on `/api/track`
- CORS: restricted to `roami.world` and `localhost:3000/3001`
- StayResult interface is the contract between hotel providers — both Duffel Stays and Amadeus map to the same shape
- Pricing engine `markupPercentage` is parameterised (default 5%) to support future tier-aware pricing (Pro 2%)
- Price breakdown is gated behind "See cost breakdown" expand link — tracks `breakdownClicks` for demand validation
- Booking flow uses Duffel balance payment in test mode — card payments need DuffelCardForm + createThreeDSecureSession in production

## Deployment (Vercel)

**CRITICAL: After every deploy, verify env vars are in sync.** Missing env vars are the #1 cause of "no deals found" in production.

```bash
# Compare local env vars with Vercel — run this after every deploy
vercel env ls                          # see what's on Vercel
grep '^[A-Z]' .env.example            # see what's needed
```

Required env vars on Vercel (search will fail without these):
- `ANTHROPIC_API_KEY` — NLP query parsing
- `DUFFEL_API_TOKEN` — flight search
- `OPENAI_API_KEY` — semantic embeddings for destination matching
- `SUPABASE_URL` — destination database
- `SUPABASE_SERVICE_ROLE_KEY` — destination database auth
- `NEXT_PUBLIC_SUPABASE_URL` — client-side Supabase URL

Required for full functionality:
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — rate limiting + price intelligence (no rate limiting without these!)

Optional (graceful degradation without):
- `AMADEUS_API_KEY` / `AMADEUS_API_SECRET` — hotel search fallback

To add a missing var: `printf '%s\ny\n' "VALUE" | vercel env add VAR_NAME production`

## Gotchas & Patterns (for future sessions)

- **Amadeus SDK**: The `amadeus` npm package is plain JS with no TypeScript types. Use raw `fetch` instead, with typed response interfaces defined locally.
- **Amadeus Hotel Search**: 2-step flow — Hotel List by city (`/v1/reference-data/locations/hotels/by-city`) returns hotel IDs, then Hotel Offers (`/v3/shopping/hotel-offers`) returns prices. Must pass hotel IDs from step 1 into step 2.
- **Amadeus OAuth 2.0**: Token cached in memory, expires ~30min. Expire 60s early to avoid edge-case 401s. Retry once on 401 with a fresh token.
- **Duffel PaymentType**: Only `'arc_bsp_cash' | 'balance'` — there is no `'duffel_payment_intent'`. Card payments require DuffelCardForm component + `createThreeDSecureSession`, not a payment type.
- **DuffelCardForm**: It is a React component from `@duffel/components`, not a class. The API differs from what Duffel docs might suggest.
- **Duffel test mode**: Balance is unlimited, no card form needed. Payment is `{ type: 'balance', amount: '0', currency: 'GBP' }`.
- **Client-side deal passing**: Uses `useSyncExternalStore` in `deal-store.ts` (not context or URL params) to pass the selected deal from search results to `/deal/[id]`.
- **.env files**: There is a git hook that blocks editing `.env` files via the Edit tool. Use Bash for `.env.example` changes.
- **Airline logos**: Use `<img>` not `next/image` — airline logo hosts are dynamic external URLs that can't be pre-declared in `next.config.js`.

## Pages

- `/` — Search page (NlpSearchDemo hero)
- `/deal/[id]` — Deal detail page (DealDetail + BookingForm)

## Key Docs

- `docs/HANDOFF.md` — Current status and next steps
- `docs/api-architecture.md` — Search API flow detail
- `docs/style-guide.md` — Brand colours, typography, component specs
- `docs/tone-of-voice.md` — Brand voice guidelines
- `docs/strategy/` — Full strategy corpus (14 frameworks)
- `docs/research/` — Revenue model research, Duffel breakeven analysis

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

Search pipeline: NLP parse → embed query → Supabase vector search → Duffel flights+stays (parallel) → deal-builder (pricing, FX, confidence scoring) → response

Key modules:
- `src/lib/nlp-parser.ts` — Claude Haiku extracts destinations, dates, budget, travellers from natural language
- `src/lib/embeddings.ts` — OpenAI embeddings for semantic destination matching
- `src/lib/destination-search.ts` — Supabase pgvector cosine similarity search
- `src/lib/duffel-client.ts` — Duffel flight/stays API client
- `src/lib/deal-builder.ts` — Assembles scored deals from flights+stays, 5-factor confidence scoring
- `src/lib/pricing.ts` — Pricing engine: $3 flat + 1% flight fee, 5% order markup, ATOL £2.50/pax
- `src/lib/fx-rates.ts` — Live FX rates from open.er-api.com with 24h cache
- `src/lib/price-intelligence.ts` — Market price tracking via Upstash Redis
- `src/lib/session-store.ts` — Server-side session persistence (Supabase)
- `src/lib/session-preferences.ts` — Client-side session tracking (sessionStorage)

## API Routes

- `POST /api/search` — Main search endpoint (rate-limited, session-aware)
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
UPSTASH_REDIS_REST_URL=     # Optional — market price data unavailable without it
UPSTASH_REDIS_REST_TOKEN=   # Optional
```

Copy `.env.example` to `.env.local` to get started.

## Testing

Run tests: `npm test`
Run typecheck: `npx tsc --noEmit`
Build: `npm run build`
Dev server: `npm run dev` (localhost:3000)

94 tests across 7 files in `src/lib/__tests__/`. Core coverage: deal-builder, pricing, fx-rates, price-intelligence, duffel-client, embeddings, destination-search.

## Conventions

- All prices in GBP (convert via fx-rates.ts)
- Supabase client is server-only (service role key, never exposed to client)
- Session linked by httpOnly cookie `roami_sid`
- Deal confidence: 0-100 scale, 5 factors (price percentile, semantic similarity, lead time, trend, session alignment)
- Internal fields `netMargin` and `isLossMaker` stripped before client response
- Rate limit: 5 requests per IP per 60 seconds on `/api/search`
- CORS: restricted to `roami.world` and `localhost:3000/3001`

## Key Docs

- `docs/HANDOFF.md` — Current status and next steps
- `docs/api-architecture.md` — Search API flow detail
- `docs/style-guide.md` — Brand colours, typography, component specs
- `docs/tone-of-voice.md` — Brand voice guidelines
- `docs/strategy/` — Full strategy corpus (14 frameworks)
- `docs/research/` — Revenue model research, Duffel breakeven analysis

# Roami API Architecture

Last updated: 2026-03-01

## Overview

```
POST /api/search
  │
  ├─ Rate limit check (5 req/min per IP, in-memory)
  ├─ Input validation (query required, max 500 chars)
  │
  ├─ Claude Haiku (claude-haiku-4-5-20251001)
  │    Parses natural language query → structured intent
  │    (destinations, dates, travellers, interests)
  │
  ├─ Duffel (parallel)
  │    ├─ Flights: offerRequests.create → offers.list (cheapest 5)
  │    └─ Stays:   POST /stays/search (raw fetch, no SDK)
  │
  ├─ deal-builder.ts
  │    Bundles flight + stay per destination into Deal objects
  │    Adds confidence score, interest matching, tags
  │
  └─ Response: { deals[], preferences[], query, source }
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude Haiku for NLP query parsing |
| `DUFFEL_API_TOKEN` | Duffel flights and stays search |

Both are required. If either is missing, the API returns `503` immediately (no fallback to mock).

Copy `.env.example` to `.env.local` and fill in the values.

## Duffel Integration

### Flights

Uses the `@duffel/api` SDK.

1. `offerRequests.create` — creates a round-trip offer request with `return_offers: false` (avoids timeout that occurred with `return_offers: true`).
2. `offers.list` — fetches paginated results sorted by `total_amount`, limit 5. Takes the cheapest offer.
3. Searches up to 3 destinations in parallel.

Origin is hardcoded to `LHR`. Non-London users will receive London departure flights. See issues backlog item 8.

### Stays

Uses raw `fetch` against `https://api.duffel.com/stays/search` with `Duffel-Version: v2`.

The Duffel Stays API requires separate sales approval — it is not included in standard API access. If the token does not have Stays access, the endpoint returns an error, stays results are empty, and deal-builder falls back to estimated hotel costs.

Search radius is 10 km from city coordinates. Results are sorted by cheapest rate; top 3 per destination are used.

## Rate Limiting

- Window: 60 seconds
- Limit: 5 requests per IP
- Storage: in-memory `Map` (resets on server restart)
- IP extracted from `x-forwarded-for` header (first value)

Note: in-memory storage does not share state across serverless instances. In a distributed deployment this means the effective limit is higher than 5/min. See issues backlog item (addressed in a prior fix — distributed rate limiter implemented via Upstash or equivalent if configured).

## Mock Fallback

Triggered when `buildDeals` returns zero results (e.g. Stays API not enabled, Duffel test mode, no flight offers found).

The fallback:
1. Calls `searchMockDeals(query)` from `search-engine.ts` — static curated deals.
2. Uses Haiku-parsed `preferences` if available, otherwise falls back to mock preferences.
3. Sets `source: 'mock'` on the response.

The frontend reads `source` and displays a banner indicating results are sample data, not live prices.

The fallback does NOT trigger if API keys are missing — that returns a `503` instead.

## Known Limitations

| Limitation | Detail |
|-----------|--------|
| LHR-only origin | Flights always depart from Heathrow. See issues-log.md #8. |
| Stays requires sales approval | Duffel Stays API is not available on standard accounts. Without it, hotel costs are estimated at £65/night. |
| Estimated hotel costs | When Stays returns no data, `deal-builder.ts` uses a hardcoded fallback of £65/night. Actual prices will differ. |
| Hardcoded AVG_PRICES | Reference prices used for confidence scoring are static. See issues-log.md #18. |
| In-memory rate limiter | Does not persist across instances. See issues-log.md (P0-5 addressed; distributed behaviour noted above). |
| budgetPerPerson not applied | Parsed by Haiku but not used to filter Duffel results. See issues-log.md #11. |
| Mixed currencies | Flight and stay prices may be in different currencies. No normalisation is applied. See issues-log.md #17. |

## Issues Backlog

See [issues-log.md](./issues-log.md) for the full list of known issues, their severity, and status.

Items 1–7 (P0) are resolved. Items 8–23 remain in BACKLOG.

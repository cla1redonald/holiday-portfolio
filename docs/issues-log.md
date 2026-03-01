# Roami Issues Log

Last updated: 2026-03-01

## Critical (P0) — Must Fix

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | Hotel price per-room added to per-person flight price | deal-builder.ts:111 | DONE |
| 2 | Fabricated "original price" with random 15-25% markup | deal-builder.ts:113-114 | DONE |
| 3 | Silent fallback to mock data — no indication to user | route.ts:78-87, NlpSearchDemo.tsx:48 | DONE |
| 4 | `return_offers: true` causes timeout, triggering mock fallback | duffel-client.ts:81 | DONE |
| 5 | No rate limiting — unbounded API cost exposure | route.ts | DONE |
| 6 | No input validation — query length, travellers clamping | route.ts, nlp-parser.ts | DONE |
| 7 | Server-side files not committed to git | All new lib files | DONE |

## High (P1) — Should Fix

| # | Issue | File | Status |
|---|-------|------|--------|
| 8 | Hardcoded origin LHR — non-London users get wrong flights | nlp-parser.ts, route.ts, types/index.ts | DONE |
| 9 | 4 parallel Duffel searches can exceed timeout | duffel-client.ts | DONE |
| 10 | `departureWindow.latest` parsed but never used | route.ts | DONE |
| 11 | `budgetPerPerson` parsed but never applied as filter | deal-builder.ts, route.ts | DONE |
| 12 | Anthropic client re-instantiated every request | nlp-parser.ts | DONE |
| 13 | Prompt injection risk — no sanitization before LLM | nlp-parser.ts | DONE |
| 14 | No CORS restriction on /api/search | route.ts | DONE |
| 15 | Waitlist route logs email PII in plaintext | waitlist/route.ts | DONE |

## Medium (P2) — Nice to Have

| # | Issue | File | Status |
|---|-------|------|--------|
| 16 | Deal IDs use Date.now() — collision risk | deal-builder.ts | DONE |
| 17 | No currency normalization (GBP/EUR/USD mixed) | deal-builder.ts | DONE |
| 18 | Hardcoded AVG_PRICES will go stale | deal-builder.ts | DONE |
| 19 | Stays uses raw fetch instead of SDK | duffel-client.ts | DONE |
| 20 | No frontend abort controller for in-flight requests | NlpSearchDemo.tsx | DONE |
| 21 | No health check endpoint | api/health/route.ts | DONE |
| 22 | Cold start penalty on first request | — | DONE |
| 23 | Duffel singleton caches potentially revoked tokens | duffel-client.ts | DONE |

## Feature Backlog — Enhancements

| # | Feature | Reference | Status |
|---|---------|-----------|--------|
| 24 | Replace hardcoded iata-codes.ts with Duffel Places API | [Places API](https://duffel.com/docs/api/v2/places) — `duffel.suggestions.list()` for dynamic city lookups | BACKLOG |
| 25 | Flight ancillaries (seat selection, bags, meals) | [Ancillaries Component](https://duffel.com/docs/guides/ancillaries-component) — Duffel drop-in React component | BACKLOG |
| 26 | 3D Secure card payment flow | [Card Form + 3DS](https://duffel.com/docs/guides/card-form-component-with-3dsecure) — Duffel payment component | BACKLOG |
| 27 | Dynamic pricing engine with margin/markup | [Margin & Markups](https://duffel.com/docs/guides/margin-and-markups) — Duffel markup API for revenue layer | BACKLOG |
| 28 | Duffel Assistant for customer service | [Duffel Assistant](https://duffel.com/docs/guides/integrating-the-duffel-assistant) — embedded support widget | BACKLOG |

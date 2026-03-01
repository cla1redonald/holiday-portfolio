# Roami Issues Log

Last updated: 2026-03-01

## Critical (P0) — Must Fix

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | Hotel price per-room added to per-person flight price | deal-builder.ts:111 | IN PROGRESS |
| 2 | Fabricated "original price" with random 15-25% markup | deal-builder.ts:113-114 | IN PROGRESS |
| 3 | Silent fallback to mock data — no indication to user | route.ts:78-87, NlpSearchDemo.tsx:48 | IN PROGRESS |
| 4 | `return_offers: true` causes timeout, triggering mock fallback | duffel-client.ts:81 | IN PROGRESS |
| 5 | No rate limiting — unbounded API cost exposure | route.ts | IN PROGRESS |
| 6 | No input validation — query length, travellers clamping | route.ts, nlp-parser.ts | IN PROGRESS |
| 7 | Server-side files not committed to git | All new lib files | IN PROGRESS |

## High (P1) — Should Fix

| # | Issue | File | Status |
|---|-------|------|--------|
| 8 | Hardcoded origin LHR — non-London users get wrong flights | duffel-client.ts:47 | BACKLOG |
| 9 | 4 parallel Duffel searches can exceed timeout | duffel-client.ts:56 | BACKLOG |
| 10 | `departureWindow.latest` parsed but never used | route.ts:43-45 | BACKLOG |
| 11 | `budgetPerPerson` parsed but never applied as filter | deal-builder.ts | BACKLOG |
| 12 | Anthropic client re-instantiated every request | nlp-parser.ts:36 | BACKLOG |
| 13 | Prompt injection risk — no sanitization before LLM | nlp-parser.ts:42 | BACKLOG |
| 14 | No CORS restriction on /api/search | route.ts | BACKLOG |
| 15 | Waitlist route logs email PII in plaintext | waitlist/route.ts | BACKLOG |

## Medium (P2) — Nice to Have

| # | Issue | File | Status |
|---|-------|------|--------|
| 16 | Deal IDs use Date.now() — collision risk | deal-builder.ts:139 | BACKLOG |
| 17 | No currency normalization (GBP/EUR/USD mixed) | deal-builder.ts | BACKLOG |
| 18 | Hardcoded AVG_PRICES will go stale | deal-builder.ts:12-18 | BACKLOG |
| 19 | Stays uses raw fetch instead of SDK | duffel-client.ts:150 | BACKLOG |
| 20 | No frontend abort controller for in-flight requests | NlpSearchDemo.tsx | BACKLOG |
| 21 | No health check endpoint | — | BACKLOG |
| 22 | Cold start penalty on first request | — | BACKLOG |
| 23 | Duffel singleton caches potentially revoked tokens | duffel-client.ts:4-13 | BACKLOG |

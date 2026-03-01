# Roami Issues Log

Last updated: 2026-03-02

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

## P1 — UX & Product Design

| # | Issue | Reference | Status |
|---|-------|-----------|--------|
| 35 | Design full single-page UX flow beyond search → waitlist CTA | All current components | PARTIAL |
| | — ~~Search → results → deal detail → booking intent flow~~ | `/deal/[id]`, DealDetail, BookingForm | DONE (c50858c) |
| | — ~~Integrate pricing engine concepts (transparent pricing, price breakdown, service fee visibility)~~ | PriceSummary.tsx, gated breakdown | DONE (c50858c) |
| | — ~~Integrate recommendation engine concepts (preference learning, confidence explanation, personalisation signals)~~ | session-preferences.ts, deal-builder.ts | DONE (c50858c) |
| | — Payment/subscription UX (free tier, price unlock, Pro) | research-8, issues #32-34 | BACKLOG |
| | — ~~What happens when user clicks "View Deal"? Full journey to booking~~ | DealCard → `/deal/[id]` → BookingForm → `/api/booking/confirm` | DONE (c50858c) |
| | **Remaining:** Pro subscription UX, Stripe price-unlock microtransaction, production card payments. | | |

## Feature Backlog — Enhancements

| # | Feature | Reference | Status |
|---|---------|-----------|--------|
| 24 | Replace hardcoded iata-codes.ts with Duffel Places API | Supabase primary + Duffel Places API fallback in `duffel-client.ts` | DONE |
| 25 | Flight ancillaries (bags, flexible cancellation) | Pricing logic in `pricing.ts`, fetch via `offers.get()` in `duffel-client.ts`, displayed in DealCard. Bags + CFAR supported; seats/meals require separate APIs (disabled). | DONE |
| 26 | 3D Secure card payment flow | [Card Form + 3DS](https://duffel.com/docs/guides/card-form-component-with-3dsecure) — Duffel payment component. Depends on #29 (Payment Intent flow). | BACKLOG |
| 27 | Dynamic pricing engine with margin/markup | Full fee model in `pricing.ts` — Duffel fees, payment processing, ATOL, 5% markup, loss-maker detection. Feeds into Payment Intent at booking time. | DONE |
| 28 | Duffel Assistant for customer service | Premature — no customers yet. Add when needed. | REMOVED |
| 29 | Payment Intent markup integration | [Payment Intents API](https://duffel.com/docs/api/payment-intents) — `calculateDealPricing().totalCustomerPays` feeds into Payment Intent amount. Depends on booking flow (#35). | BACKLOG |
| 30 | Live FX rates for payment processing | `fx-rates.ts` fetches from open.er-api.com with 24h cache + fallback. Remaining: 2% buffer at payment time (ties into #29). | DONE |
| 31 | Transparent pricing — customer vs airline price visibility | `PriceBreakdown` on Deal type exposes flightCost, hotelCost, subtotal, markup, total. DealCard renders breakdown. | DONE |
| 32 | Tiered pricing: expose price breakdown on Deal type | `PriceBreakdown` already exposes cost vs markup split on every deal. | DONE |
| 33 | Tiered pricing: £1.50 price unlock (per deal) | [research-8](../research/research-8-tiered-pricing-model.md) — Pay £1.50 to see airline fare vs Roami fee breakdown for a specific deal. Still books at 5%. Pure profit (no markup reduction). Needs Stripe microtransaction, no auth. Drives conversion to Pro. **Demand validation in place:** breakdownClicks tracked via `/api/track` (c50858c). | BACKLOG |
| 34 | Tiered pricing: Roami Pro subscription (£24.99/yr, 2% fee) | [research-8](../research/research-8-tiered-pricing-model.md) — Subscribers see breakdown always + book at 2% instead of 5%. Profitable up to 5 bookings/yr on flights alone. Needs auth + Stripe billing. Make `PRICING_CONFIG.markup.orderPercentage` tier-aware (accept markup% as param). | BACKLOG |

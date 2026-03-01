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

## P1 — UX & Product Design

| # | Issue | Reference | Status |
|---|-------|-----------|--------|
| 35 | Design full single-page UX flow beyond search → waitlist CTA | All current components | BACKLOG |
| | — Search → results → deal detail → booking intent flow | pricing.ts, deal-builder.ts | |
| | — Integrate pricing engine concepts (transparent pricing, price breakdown, service fee visibility) | research-8-tiered-pricing-model.md | |
| | — Integrate recommendation engine concepts (preference learning, confidence explanation, personalisation signals) | session-preferences.ts, deal-builder.ts | |
| | — Payment/subscription UX (free tier, price unlock, Pro) | research-8, issues #32-34 | |
| | — What happens when user clicks "View Deal"? Full journey to booking | issues #26, #29 | |
| | **Approach:** Use @strategist + @designer to design the flow before building. Start with user journey mapping, then screen specs, then implement. | | |

## Feature Backlog — Enhancements

| # | Feature | Reference | Status |
|---|---------|-----------|--------|
| 24 | Replace hardcoded iata-codes.ts with Duffel Places API | [Places API](https://duffel.com/docs/api/v2/places) — `duffel.suggestions.list()` for dynamic city lookups | BACKLOG |
| 25 | Flight ancillaries (seat selection, bags, meals) | [Ancillaries Component](https://duffel.com/docs/guides/ancillaries-component) — Duffel drop-in React component. Has built-in `markup` prop (`{ amount, rate }` per category) — use `filterViableAncillaries()` for category gating, let the Duffel component handle price display. Rate applied first, then flat amount. Cannot supply both `markup` and `priceFormatters` simultaneously. | BACKLOG |
| 26 | 3D Secure card payment flow | [Card Form + 3DS](https://duffel.com/docs/guides/card-form-component-with-3dsecure) — Duffel payment component. Depends on #29 (Payment Intent flow). | BACKLOG |
| 27 | Dynamic pricing engine with margin/markup | [Margin & Markups](https://duffel.com/docs/guides/margin-and-markups) — Duffel has three markup routes: (1) Payment Intents — inflate amount, difference is markup; (2) Sessions API (`markup_rate`, `markup_amount`) for Duffel Links; (3) Ancillaries Component `markup` prop. Our `pricing.ts` calculates customer prices; at booking time, feed those into Payment Intent. | BACKLOG |
| 28 | Duffel Assistant for customer service | [Duffel Assistant](https://duffel.com/docs/guides/integrating-the-duffel-assistant) — embedded support widget | BACKLOG |
| 29 | Payment Intent markup integration | [Payment Intents API](https://duffel.com/docs/api/payment-intents) — No `markup_amount` on Create Order. Markup is applied by creating a Payment Intent where amount > offer cost. Formula: `((offer total + markup) × FX rate) / (1 - payment_fee%)`. `calculateDealPricing().totalCustomerPays` feeds into this. Duffel dashboard shows markup split on Balance page. Default max 5,000 GBP per intent (contact Duffel for higher). Depends on #26. | BACKLOG |
| 30 | Live FX rates for payment processing | [Margin & Markups](https://duffel.com/docs/guides/margin-and-markups) — `deal-builder.ts` uses static FX rates (EUR: 0.86, USD: 0.79). At payment time, need live mid-market rates + 2% buffer to cover Duffel Payments FX fee. Duffel recommends fixer.io or similar. Only needed when customer currency differs from settlement (GBP). | BACKLOG |
| 31 | Transparent pricing — customer vs airline price visibility | [Margin & Markups](https://duffel.com/docs/guides/margin-and-markups) — If a customer checks their booking reference on the airline website, they will see the price excluding our markup. Proactive transparency is better than customers discovering this — frame as honesty. See #32-34. | BACKLOG |
| 32 | Tiered pricing: expose price breakdown on Deal type | [research-8](../research/research-8-tiered-pricing-model.md) — Add `airlinePrice` and `serviceFee` fields to `Deal` interface. `calculateDealPricing()` already computes `costPricePerPerson` and `customerPricePerPerson` — expose the split. Low complexity, no auth needed. | BACKLOG |
| 33 | Tiered pricing: £1.50 price unlock (per deal) | [research-8](../research/research-8-tiered-pricing-model.md) — Pay £1.50 to see airline fare vs Roami fee breakdown for a specific deal. Still books at 5%. Pure profit (no markup reduction). Needs Stripe microtransaction, no auth. Drives conversion to Pro. | BACKLOG |
| 34 | Tiered pricing: Roami Pro subscription (£24.99/yr, 2% fee) | [research-8](../research/research-8-tiered-pricing-model.md) — Subscribers see breakdown always + book at 2% instead of 5%. Profitable up to 5 bookings/yr on flights alone. Needs auth + Stripe billing. Make `PRICING_CONFIG.markup.orderPercentage` tier-aware (accept markup% as param). | BACKLOG |

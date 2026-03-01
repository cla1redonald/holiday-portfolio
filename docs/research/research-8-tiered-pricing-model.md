# Tiered Pricing Model: Transparent Fees + Subscription

**Date:** March 2026
**Purpose:** Model the economics of transparent pricing as a USP, with a per-deal unlock and annual subscription tier.
**Builds on:** research-7-duffel-breakeven.md, research-5-revenue-models.md

---

## The Insight

No UK travel OTA shows customers what the airline actually charges vs what they add on top. Roami can. Duffel passes through airline fares directly (via NDC and GDS) — they don't inflate or discount them. Our 5% service fee is the only markup. Making that visible is a trust signal nobody else offers.

Transparency becomes the product, not just a policy.

---

## Three-Tier Model

### Tier 1: Free (5% service fee)

Customer sees a single total price. Standard OTA experience. Core revenue driver.

```
Barcelona — Vueling direct, 4 nights
Total: £328 pp
[Book this deal]
```

### Tier 2: Price Unlock (£1.50 per deal)

Customer pays £1.50 to see the airline fare vs Roami fee breakdown for a specific deal. Still books at 5%. The £1.50 is for information, not a discount.

```
Barcelona — Vueling direct, 4 nights

  Airline fare         £312 pp
  Roami service fee     £16 pp
  ────────────────────────────
  Total                £328 pp

  [Book this deal — £328 pp]
```

The £1.50 is pure profit — we don't reduce the markup. Most customers who see the breakdown will think "£16 is fair" and book anyway. Customers who don't book were never going to — but we still earned £1.50. At £1.50 it's more than a throwaway impulse but still low enough that curiosity wins.

### Tier 3: Roami Pro (£19.99/year, 2% service fee)

Subscribers see the price breakdown on every deal and book at a reduced 2% fee.

```
Barcelona — Vueling direct, 4 nights

  Airline fare         £312 pp      PRO
  Roami service fee      £6 pp      (was £16)
  ────────────────────────────
  Total                £318 pp

  [Book this deal — £318 pp]
  You're saving £10 pp with Roami Pro
```

---

## Unit Economics by Tier

### Reference booking: 2 people, £300pp flight, £600 total order

| | Free (5%) | £1 Unlock (5%) | Pro (2%) |
|--|-----------|----------------|----------|
| **Markup revenue** | £30 | £30 | £12 |
| **Unlock/sub revenue** | — | £1.50 | £24.99/yr amortised |
| **Duffel flight fee** | -£8.40 | -£8.40 | -£8.40 |
| **Payment processing (1.4%)** | -£8.82 | -£8.82 | -£8.57 |
| **Total cost to us** | -£17.22 | -£17.22 | -£16.97 |
| **Net per booking** | **+£12.78** | **+£14.28** | **-£4.97** |

### Pro subscriber annual economics

| Bookings/year | Booking margin | Sub fee | Annual net |
|---|---|---|---|
| 1 | -£4.97 | +£24.99 | **+£20.02** |
| 2 | -£9.94 | +£24.99 | **+£15.05** |
| 3 | -£14.91 | +£24.99 | **+£10.08** |
| 4 | -£19.88 | +£24.99 | **+£5.11** |
| 5 | -£24.85 | +£24.99 | **+£0.14** |

Breakeven at ~5 bookings/year. UK average is 2.4 holidays/year (ONS 2024), so the vast majority of subscribers are comfortably profitable. Even heavy bookers (5/year) just break even on flights alone — ancillary and hotel commission keeps them in the black.

### Pro subscriber with ancillaries (bags)

Adding one £30 bag per person per booking:
- Ancillary markup (10%): +£6
- Ancillary cost (£1.60 × 2): -£3.20
- Ancillary net: +£2.80 per booking

| Bookings/year | Booking + ancillary margin | Sub fee | Annual net |
|---|---|---|---|
| 2 | 2 × (-£4.97 + £2.80) = -£4.34 | +£19.99 | **+£15.65** |
| 3 | 3 × -£2.17 = -£6.51 | +£19.99 | **+£13.48** |
| 4 | 4 × -£2.17 = -£8.68 | +£19.99 | **+£11.31** |

With ancillaries, even 5-booking-a-year power users are profitable.

### With hotel commission (packages)

When Duffel Stays is live, hotel commission is pure revenue (£0 cost to seller).
Estimated 5-10% commission on hotel component:

- £100/night × 4 nights = £400 hotel
- 7.5% commission = £30 per booking, at zero cost

This makes every tier significantly more profitable. Package subscribers become highly valuable even at 2% flight markup.

---

## Why £24.99/year

| Price point | Pays for itself on... | Profitable up to... | Risk |
|---|---|---|---|
| £9.99/yr | £334 order (1 budget trip) | 2 trips/yr | Unprofitable at 3+ trips |
| £19.99/yr | £667 order (1 mid-range trip) | 4 trips/yr | Breakeven at 4, loss at 5 |
| **£24.99/yr** | **£834 order (1 mid-range trip)** | **5 trips/yr** | **Breakeven at 5 — safe for almost all users** |
| £29.99/yr | £1,000 order (1 premium trip) | 6 trips/yr | Higher barrier, fewer conversions |
| £39.99/yr | £1,334 order | 8 trips/yr | Too high for a new brand |

**£24.99 is the sweet spot.** A customer booking a £600 trip saves £18 (5% → 2%). The subscription very nearly pays for itself on one trip, and clearly pays for itself by two. Profitable up to 5 bookings/year without ancillary or hotel revenue — and with those factored in, even heavy bookers are covered.

Annual net at £24.99 with 2% subscriber markup:

| Bookings/year | Net (flights only) | Net (with bags) | Net (with bags + hotel commission) |
|---|---|---|---|
| 1 | +£20.02 | +£22.82 | +£52.82 |
| 2 | +£15.05 | +£20.65 | +£80.65 |
| 3 | +£10.08 | +£18.48 | +£108.48 |
| 4 | +£5.11 | +£16.31 | +£136.31 |
| 5 | +£0.14 | +£14.14 | +£164.14 |

---

## Conversion Funnel

```
Search (free)
  │
  ├── 85% → See total price → Book at 5% ← CORE REVENUE
  │
  ├── 10% → Pay £1.50 to see breakdown → "£16 fee, fair enough" → Book at 5%
  │                                      ↑ pure £1.50 profit even if they don't book
  │
  └── 5% → Subscribe (£24.99/yr) → Book at 2% ← RETENTION + PREDICTABLE REVENUE
              ↑
              Driven by: repeat bookers, price-sensitive users,
              anyone who's paid £1.50 twice and thinks "I should just subscribe"
```

### The £1.50 → Pro conversion path

The £1.50 unlock creates a natural upgrade funnel:
- First trip: Pays £1.50 to see breakdown. Interesting.
- Second trip: Pays £1.50 again. Thinks "I keep doing this."
- Third trip: Sees "Roami Pro: see every breakdown + book at 2%"
- The cumulative £1.50 spend (£4.50) makes £24.99/yr feel like a logical step.

---

## Competitive Positioning

| Platform | Pricing approach | Transparency |
|---|---|---|
| Skyscanner | Redirects to airline/OTA — no own markup | No fee visibility |
| Booking.com | Hotel commission baked in (~16%) | Hidden |
| LoveHolidays | ~10% take rate on packages | Hidden |
| On The Beach | ~£209 margin per package | Hidden |
| **Roami (Free)** | **5% service fee** | **Shown on unlock** |
| **Roami (Pro)** | **2% service fee** | **Always visible** |

Nobody in UK travel offers transparent fee breakdowns. The closest analogy is Wise (formerly TransferWise) in fintech — they showed the FX markup that banks hide, and built a £10bn company on the trust that created.

---

## What This Requires Technically

### Already built
- `calculateDealPricing()` computes `costPricePerPerson` (airline price) and `customerPricePerPerson` (with markup) — pricing.ts
- `PRICING_CONFIG.markup.orderPercentage` is a single config value — easy to make tier-dependent

### Needs building
| Component | Complexity | Depends on |
|---|---|---|
| Expose `airlinePrice` + `serviceFee` fields on `Deal` type | Low | — |
| Tier-aware markup in `calculateDealPricing()` (accept markup% as param) | Low | — |
| Frontend: price breakdown display (unlock/Pro) | Medium | Deal type changes |
| £1 unlock payment (Stripe/Duffel microtransaction) | Medium | Payment integration |
| User accounts + subscription (auth + Stripe billing) | High | Auth system |
| Subscription state passed through to pricing engine | Low | Auth + sub billing |

### Implementation order
1. Expose price breakdown fields on Deal type (no auth needed, just data)
2. Make markup% parameterised in pricing engine (prep for tiers)
3. Build transparent pricing UI (show breakdown to everyone during beta)
4. Add £1 unlock via Stripe (microtransaction, no auth needed)
5. Add auth + Stripe subscription for Pro tier

---

## Risks

| Risk | Mitigation |
|---|---|
| Transparency causes booking leakage ("I'll book direct with the airline") | 5% is low enough that convenience wins. Airline direct booking UX is worse. We bundle flight + hotel. |
| £1.50 unlock cannibalises Pro subscriptions | Monitor conversion. If £1.50 users rarely upgrade, consider removing the unlock tier. |
| Pro subscribers book too frequently (5+/year), eroding margin | Ancillary and hotel commission covers the gap. Cap Pro benefits at reasonable level if needed. |
| Competitors copy transparent pricing | First-mover trust advantage. Brand association with transparency is sticky (cf. Wise vs banks). |
| Airline price visible on booking reference anyway (Duffel limitation) | Proactive transparency is better than customers discovering it themselves. Frame as honesty. |

---

## Decision Log

- **Why not 0% markup for Pro?** Duffel's cost floor (~2.7-3% of order value) means 0% markup loses ~£17 per £600 booking. No viable subscription price covers that for frequent bookers.
- **Why not £1.50 to book at reduced markup?** Adds friction to the core booking flow. The £1.50 should be for information (transparency), not gating the checkout.
- **Why £24.99 not £19.99?** At £19.99, breakeven is at 4 bookings/year — too tight. £24.99 extends to 5 bookings, covering nearly all UK travellers. Still pays for itself on one mid-range trip.
- **Why £1.50 not £1?** £1 feels throwaway. £1.50 signals the information has value while still being low enough that curiosity wins.
- **Why show transparency to everyone during beta?** It's the core USP. Gate it later when there's enough traffic to test conversion. Friends testing should experience the full vision.

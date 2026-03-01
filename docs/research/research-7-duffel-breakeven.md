# Duffel Breakeven Analysis: Minimum Viable Order Value

**Date:** March 2026
**Purpose:** Calculate the minimum flight booking value at which Roami breaks even on Duffel orders, under different scenarios.

---

## Duffel Fee Structure (as of March 2026)

### Flights API — Per Confirmed Order
| Fee | Amount |
|-----|--------|
| Flat fee per order | **$3.00 (~£2.40)** |
| Percentage of ticket value | **1%** |
| Ancillary fee (bags, seats, meals) | **$2.00 (~£1.60) per paid ancillary** |
| Excess search fee | $0.005/search above 1500:1 search-to-book ratio |

### Duffel Payments — Per Transaction (if using Duffel's payment processing)
| Card Type | Fee |
|-----------|-----|
| European card (UK business) | **1.4%** |
| Non-European card | **2.9%** |
| FX conversion surcharge | **2% on exchange rate** |

### Duffel Stays — Commission Share
| Component | Amount |
|-----------|--------|
| Cost to seller | **£0** — commission is paid by the accommodation provider |
| Revenue to seller | Profit-share of hotel commission; scales with volume |
| Settlement | On guest checkout (not at booking time) |

Sources: [Duffel Pricing](https://duffel.com/pricing), [Duffel Payments Pricing](https://help.duffel.com/hc/en-gb/articles/4408072905362-How-does-Duffel-Payments-pricing-work), [Duffel Margin & Markups](https://duffel.com/docs/guides/margin-and-markups)

---

## Scenario Modelling: Flights Only

### Assumptions
- $1 = £0.80 (used throughout for GBP conversion)
- Duffel flat fee: £2.40 per order
- Duffel percentage: 1% of ticket value
- Booking is for **return flights** (single order, not two separate one-ways)

### Scenario A: Duffel API + Own Payment Processing

You handle payments yourself (Stripe, Adyen, etc.) and only pay Duffel's API fees.

**Your costs per order:**
| Cost | Formula |
|------|---------|
| Duffel flat fee | £2.40 |
| Duffel 1% | 0.01 × ticket_value |
| Own payment processing (high-risk travel: 3.5%) | 0.035 × ticket_value |
| **Total cost** | **£2.40 + 4.5% of ticket value** |

**Breakeven if you add X% markup:**

```
markup_revenue = X% × ticket_value
cost = £2.40 + 4.5% × ticket_value

Breakeven: X% × ticket_value = £2.40 + 4.5% × ticket_value
```

| Your Markup | Breakeven Ticket Value | Typical Route |
|-------------|----------------------|---------------|
| 5% | £480 | — |
| 6% | £160 | Short-haul budget (London → Barcelona) |
| 7% | £96 | Below most flight prices |
| 8% | £69 | Below most flight prices |
| 10% | £44 | Below most flight prices |

**Key insight:** At **5% markup**, you need the flight to cost at least **£480** to cover Duffel's £2.40 flat fee plus the combined 4.5% in percentage fees. At 6% markup or above, breakeven drops to very achievable levels.

### Scenario B: Duffel API + Duffel Payments (European Card)

Using Duffel Payments simplifies integration but adds their payment processing fee.

**Your costs per order:**
| Cost | Formula |
|------|---------|
| Duffel flat fee | £2.40 |
| Duffel 1% (API fee) | 0.01 × ticket_value |
| Duffel Payments (EU card) | 0.014 × ticket_value |
| **Total cost** | **£2.40 + 2.4% of ticket value** |

**Breakeven if you add X% markup:**

| Your Markup | Breakeven Ticket Value | Typical Route |
|-------------|----------------------|---------------|
| 3% | £400 | Medium-haul (London → Canaries) |
| 4% | £150 | Short-haul shoulder season |
| 5% | £92 | Below most flight prices |
| 6% | £67 | Below most flight prices |

**Key insight:** Duffel Payments at 1.4% is materially cheaper than a high-risk travel merchant account at 3.5%+. If you can use Duffel Payments, the breakeven threshold drops significantly.

### Scenario C: Duffel API + Duffel Payments (Non-European Card)

**Your costs per order:**
| Cost | Formula |
|------|---------|
| Duffel flat fee | £2.40 |
| Duffel 1% | 0.01 × ticket_value |
| Duffel Payments (non-EU card) | 0.029 × ticket_value |
| **Total cost** | **£2.40 + 3.9% of ticket value** |

| Your Markup | Breakeven Ticket Value |
|-------------|----------------------|
| 4% | £2,400 — not viable for most bookings |
| 5% | £218 |
| 6% | £114 |
| 7% | £77 |

---

## Scenario Modelling: Flight + Stay Package

This is where the economics fundamentally change.

### How Duffel Stays Works For You
Duffel Stays is a **commission-share** model — the hotel pays commission, Duffel shares it with you. You pay **nothing** to Duffel for hotel bookings. The hotel component is **pure revenue**.

### Package Breakeven: Flight + Hotel

**Example: Family of 4, 7-night Mediterranean holiday**
- Flight: £1,200 (4 × £300pp return)
- Hotel: £1,050 (£150/night × 7 nights)
- **Total package value: £2,250**

**Your costs:**
| Cost | Amount |
|------|--------|
| Duffel flight API fee (flat) | £2.40 |
| Duffel flight API fee (1%) | £12.00 |
| Duffel Payments on flight (1.4% EU) | £16.80 |
| Duffel Stays | £0.00 (hotel pays commission) |
| ATOL contribution (£2.50 × 4 pax) | £10.00 |
| **Total cost to you** | **£41.20** |

**Your revenue:**
| Revenue Source | Amount |
|---------------|--------|
| Flight markup (5%) | £60.00 |
| Duffel Stays commission share (est. 5-10% of hotel) | £52.50–£105.00 |
| **Total revenue** | **£112.50–£165.00** |

**Net margin per package: £71.30–£123.80** (3.2%–5.5% of booking value)

---

## The Real Breakeven Table: What's the Minimum Order?

### Flights Only (Most Conservative Case)

Using the worst-case scenario (own high-risk payment processing at 3.5%, 5% markup):

```
Breakeven: 0.05V = £2.40 + 0.045V
           0.005V = £2.40
           V = £480
```

**Minimum flight order: £480 to break even at 5% markup with own payment processing.**

Using Duffel Payments (EU cards, 5% markup):

```
Breakeven: 0.05V = £2.40 + 0.024V
           0.026V = £2.40
           V = £92
```

**Minimum flight order: £92 to break even at 5% markup with Duffel Payments.**

### Summary: Minimum Viable Flight Order Value

| Scenario | Markup | Minimum Order to Break Even |
|----------|--------|-----------------------------|
| Own payments (3.5% high-risk) | 5% | **£480** |
| Own payments (3.5% high-risk) | 7% | **£96** |
| Duffel Payments (1.4% EU) | 3% | **£400** |
| Duffel Payments (1.4% EU) | 5% | **£92** |
| Duffel Payments (2.9% non-EU) | 5% | **£218** |

### With Ancillaries (Bags, Seats)

Each ancillary adds $2 (~£1.60) flat cost. If a family of 4 each adds a checked bag:
- Extra Duffel cost: 4 × £1.60 = **£6.40**
- Extra revenue (if you markup ancillaries 10%): depends on ancillary price

At £30/bag × 4 = £120 ancillary value, your 10% markup = £12 revenue vs £6.40 cost. **Net positive.**

---

## What This Means For Roami

### The £2.40 Flat Fee is the Killer on Cheap Flights

On a £50 Ryanair one-way, £2.40 is **4.8% of the ticket** before you even count the 1% percentage fee. Combined with payment processing, you're at ~9-10% cost on a cheap flight. No sensible markup covers that.

### The Sweet Spot

| Booking Type | Typical Value | Breakeven Risk | Verdict |
|-------------|--------------|----------------|---------|
| Budget one-way (Ryanair/easyJet) | £30–£80 | **Loss-making** at any reasonable markup | Do not sell these standalone |
| Short-haul return (economy) | £100–£250 | **Marginal** — needs 6%+ markup | Viable only in packages |
| Medium-haul return (Canaries, Turkey) | £250–£500 | **Profitable** at 5% markup | Core target |
| Long-haul return (Caribbean, US) | £500–£2,000 | **Clearly profitable** | High-value target |
| Family package (flights + hotel) | £1,500–£4,000 | **Best margin** — hotel commission is free revenue | Strategic priority |

### Recommendations

1. **Use Duffel Payments if possible.** The difference between 1.4% (Duffel EU) and 3.5%+ (own high-risk processing) is enormous at scale. On £100K annual flight bookings, that's £2,100 saved.

2. **Never sell budget flights standalone.** A £50 Ryanair ticket costs you ~£5 in fees. Unless you're charging the customer £55+ (10% markup), you lose money. And 10% markup on a visible commodity price = instant booking leakage to Skyscanner.

3. **Always bundle.** The hotel commission from Duffel Stays (or RateHawk net rate margin) cross-subsidises the flight fees. A £2,250 family package with £41 in costs and £112+ in revenue is a real business. A £150 flight with £9 in costs and £7.50 in revenue is not.

4. **Target order values above £250 for flight-only.** This gives you comfortable margin at 5% markup (~£10 margin vs £5 cost) and doesn't require aggressive pricing that causes leakage.

5. **The ATOL cost is flat and fixed.** £2.50 per passenger matters on a £30 budget flight but is negligible on a £2,000 package. Another reason to prioritise packages.

6. **Watch the search-to-book ratio.** At 1500:1 you start paying $0.005/search. If users browse heavily but rarely book, this adds up. 10,000 excess searches = $50/month. Not catastrophic but worth monitoring.

---

## Appendix: Quick Reference Formulas

### Flight-Only Breakeven (solve for V)
```
V = £2.40 / (markup% - duffel_api% - payment%)

Where:
  markup%  = your added markup (e.g., 0.05 for 5%)
  duffel_api% = 0.01 (always 1%)
  payment% = 0.014 (Duffel EU) or 0.029 (Duffel non-EU) or 0.035 (own high-risk)
```

### Package Margin
```
margin = (flight_markup + hotel_commission) - (£2.40 + 1% × flight + payment% × flight + £2.50 × passengers)
```

### Cost per £1,000 of Flight Bookings
| Payment Method | Cost per £1,000 |
|---------------|-----------------|
| Duffel Payments (EU) | £2.40 + £24.00 = **£26.40** |
| Duffel Payments (non-EU) | £2.40 + £39.00 = **£41.40** |
| Own processing (high-risk) | £2.40 + £45.00 = **£47.40** |

# Business Model Canvas — Current State (MVP Launch)
## Holiday Portfolio

**Version:** Current State / MVP Launch
**Date:** 2026-02-28
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Confidence scores:** Desirability 8/10 | Viability 7/10 | Feasibility 8/10

> See [[02-bmc-target]] for 18-month target state.
> See [[00-gap-analysis]] for synthesis of all 13 framework artefacts.

---

## Canvas Overview

| Block | Status |
|-------|--------|
| Customer Segments | Defined — behaviour-based, not demographic |
| Value Propositions | Defined — 6 USPs validated vs competitors |
| Channels | Partial — organic + SEO identified, paid not costed |
| Customer Relationships | Partial — NLP onboarding designed, support model TBD |
| Revenue Streams | Defined — affiliate Day 1, RateHawk Month 2-3 |
| Key Resources | Defined — stack specified, IP to be built |
| Key Activities | Defined — sequenced build plan exists |
| Key Partnerships | Partial — Duffel confirmed, RateHawk to initiate |
| Cost Structure | Partial — tech costs modelled, full burn rate not set |

---

## 1. Customer Segments

### Primary Segment: Frequent Self-Serve Travellers

**Behaviour profile (not demographic):**
- 3+ trips per year — mix of city breaks, beach holidays, ski, long-haul
- Self-directed planners who enjoy the process but hate fragmentation
- Price-conscious but not budget-only — they want confidence they're not overpaying
- Currently manage travel across 5+ platforms (Google Flights, Booking.com, Skyscanner, airline sites, hotel sites)
- Average 303 minutes of research per trip (source: Expedia, n=5,713)

**Evidence for segment existence:**
- 14% of 16-24s have 3+ trips booked simultaneously (discovery.md, Desirability)
- 20% of UK adults had 2+ international holidays booked for following year
- Sunshine Saturday: 4.3M ATOL bookings in January 2025 alone
- UK: 94.6M overseas trips in 2024, market >$98B

**Entry point (MVP hook):**
City break deal-seeker — "find me a long weekend somewhere warm, under £400." Low-stakes, familiar intent, fast booking cycle. Not "plan my whole year" — that's the retention layer.

**Secondary segment (emerging at MVP):**
Budget-aware families booking 1-2 holidays per year who currently use human travel agents (agent usage doubled among UK 18-24s: 26% → 48%; 53% of high-income households use agents). These users pay for seamless organisation — HP replicates agent curation at lower cost.

### 🟡 GAP-01: Segment Sizing
**Missing:** TAM/SAM/SOM breakdown for "3+ trips/year self-serve UK travellers." Market is £98B+ total UK outbound but no sub-segment sizing exists.
**Owner:** Founder
**Action:** Commission or build TAM model using ABTA/ONS travel data before Seed raise.

### 🟡 GAP-02: Persona Validation
**Missing:** Qualitative research — 8-10 user interviews recommended (discovery.md Validation Playbook). No primary research completed yet.
**Owner:** Founder / CMO
**Action:** Gate 1 messaging test (three variants: city break deal, portfolio planning, personalised deal feed) before platform build.

---

## 2. Value Propositions

### The Core Problem Solved
Frequent travellers manage a year of trips across fragmented platforms, spending 303 minutes per trip researching whether prices are fair. No single platform learns how they travel, tracks their year, or tells them "this is a good deal for you."

### Six Validated USPs (vs Mindtrip, Expedia Romie, Google Travel)

| USP | Description | Competitor gap |
|-----|-------------|----------------|
| **Price-first, not inspiration-first** | Entry point is "find me a great deal" + deal confidence scoring (price history + preferences + budget) | Mindtrip is inspiration-first. Nobody fuses Hopper price intelligence with personalised discovery |
| **Annual portfolio with budget tracking** | Every competitor is trip-by-trip. HP tracks budget spent/remaining, trips booked/planned/dreamed: "You've spent £1,200 of your £3,500 year." | No competitor has portfolio view |
| **UK-native, ATOL-compliant** | Mindtrip not in UK. Zero AI-native travel startups target UK consumers. ATOL protection = trust signal | Mindtrip covers Belgium/Germany/Ireland/Netherlands only |
| **Visible preference profile** | Shows users their preference graph: "Here's what we think you like — is this right?" Transparency solves commission-credibility | All incumbent personalisation is opaque ML |
| **Deal monitoring and alerts** | Monitors destinations of interest, alerts when prices drop: "Porto just hit £240 for your May dates — 30% below average" | Mindtrip doesn't watch prices. Going.com does alerts but doesn't personalise |
| **Multi-API package assembly** | Duffel flights + RateHawk hotels + Cartrawler cars = flexible package, more inventory, better margin | Mindtrip books through single supplier (TUI) |

*Source: research-3-ai-travel.md competitor matrix; discovery.md USP section*

### What the Preference Engine Delivers at MVP
- **Basic preference graph:** Explicit preferences (onboarding conversation) + booking history. Semantic embeddings in v2.
- **NLP input:** "Long weekend somewhere warm, under £400, good food scene" — not filters
- **Deal confidence score:** "This is a good deal for you" based on price history + your preferences + your budget
- **Portfolio view:** Budget tracker + trip history. Visible from day one. Earns relevance after first booking.

### 🟡 GAP-03: Value Proposition Testing
**Missing:** No A/B test results on which USP resonates most as an acquisition hook. Three variants designed but not tested.
**Owner:** CMO / Founder
**Action:** Landing page test before any paid spend. Measure email capture rate by variant.

---

## 3. Channels

### Acquisition Channels (MVP)

| Channel | Rationale | Cost profile |
|---------|-----------|-------------|
| **Organic SEO** | Long-tail travel deal queries — "best city breaks under £500 UK 2026" — low cost, compounding | Near-zero variable cost; 3-6 month lead time |
| **Content marketing** | Deal spotting content, destination guides, "is this a good price?" articles | Editorial cost only |
| **Deal alert email list** | Going.com model — build subscriber base before booking conversion | Email tool cost ~£50-200/month at MVP scale |
| **PR / earned media** | UK travel press (Travel Weekly, The Points Guy UK) — ATOL + AI angle is newsworthy | Near-zero cash cost |
| **Word-of-mouth / referral** | Frequent travellers share deals. Portfolio view is shareable ("look what I've got planned") | Zero cost; requires product investment |
| **Founder network** | PM has Duffel relationship (discovery.md); direct outreach to early adopters | Time cost only |

### 🔴 CONTRADICTION-01: Paid CAC vs Organic-First Imperative
**Issue:** Travel CAC via paid channels is £80-200+ for new entrant (research-5-revenue-risks.md). First-booking bed bank revenue is £45-60 (discovery.md unit economics). Paid CAC does not survive on first booking alone — requires 2-3 repeat bookings to break even. BUT: organic-only growth is slow and the January window is a 4-6 week concentrated acquisition opportunity.
**Resolution needed:** Define explicit rule — no paid acquisition until LTV model is validated with real booking data (minimum 100 bookings). Paid channels are Year 1 H2 at earliest.
**Owner:** CMO / CFO

### 🟡 GAP-04: Referral / Viral Mechanic
**Missing:** No referral programme designed. Portfolio sharing and deal alerts could be viral hooks but mechanics not specified.
**Owner:** CTO / CMO

---

## 4. Customer Relationships

### Relationship Model at MVP

| Phase | Relationship type | Mechanism |
|-------|-----------------|-----------|
| **Discovery** | Self-serve + algorithmic | NLP deal search; personalised feed |
| **Onboarding** | Guided conversation | Taste calibration — 5-question onboarding chat builds initial preference graph |
| **Ongoing** | Proactive + self-serve | Deal alerts push notifications + email; portfolio view as passive engagement |
| **Post-booking** | Transactional | Booking confirmation, ATOL documentation, travel docs |
| **Retention** | Invisible loyalty | Preference graph improves with every interaction — leaving means starting from scratch |

### Key Differentiator: Visible Preference Graph
Unlike Expedia Romie (opaque ML), HP shows users what the system thinks about them. This transparency:
1. Builds trust (solves commission-credibility problem)
2. Invites correction (user invests time improving the graph)
3. Creates switching cost (personalised graph = data moat)

### Commission-Credibility Tension
HP earns commission on bookings it recommends. Users may perceive recommendations as commercially motivated. Mitigation: visible preference graph + deal confidence scoring with price history data makes the recommendation logic transparent. Sources: research-5-revenue-risks.md, Part 4.

### 🟡 GAP-05: Customer Support Model
**Missing:** No support model defined. High-risk travel merchant (chargebacks at 0.89% in travel, 816% increase 2023-2024). Who handles missed flights, cancellations, ATOL claims?
**Owner:** Founder / CFO
**Action:** Define support scope at MVP. Options: (a) async email only, (b) outsourced travel support desk, (c) AI-first with human escalation. Must be specified before ATOL application.

---

## 5. Revenue Streams

### Revenue Stream Sequencing (Research-validated)

| Stream | Timeline | Mechanism | Revenue per booking | Evidence |
|--------|----------|-----------|-------------------|---------|
| **Affiliate commissions** | Day 1 | Booking.com, Expedia affiliate links | £8-32 on hotel; £2 flat on flights | research-5-revenue-risks.md, Part 2 |
| **Ancillary affiliate** | Day 1 | Insurance (15-20%), activities (8-15%), car hire (8-12%) | £5-20 per booking | research-5-revenue-models.md |
| **RateHawk bed bank net rate** | Month 2-3 | Buy at net, sell at net + markup. No minimum volume. | £40-45 on hotel (25% markup on £160 net) | research-6-bed-banks.md, 1.3 |
| **Dynamic packages** | Month 4-6 post-ATOL | Duffel flight (net) + RateHawk hotel (net) + package markup | £50-60 per package | discovery.md revised unit economics |
| **Premium subscription** | Month 6-12 | £59.99/yr — preference graph features, priority alerts, deal calendar | £60/user/year from premium cohort | discovery.md; Going.com model |

### Unit Economics Comparison

| Model | Hotel component | Flight component | Per-booking revenue | Source |
|-------|----------------|------------------|-------------------|--------|
| Affiliate only | 4% of £200 = £8 | ~£5 | **£13** | research-5-revenue-risks.md |
| Bed bank + markup | Buy £160, sell £200 (25% markup) | ~£5 | **£45** | research-6-bed-banks.md |
| Dynamic package | Buy £160 hotel + £120 flight, sell at 15-20% markup | included | **£50-60** | discovery.md |

**At 3 bookings/user/year with bed bank:**
- Conservative (20% markup): ~£135/user/year
- Base (25% markup + ancillaries): ~£180-220/user/year
- With subscription: +£60/year from premium users
- **Breakeven: ~800-1,200 users at small team scale** (vs 2,500+ affiliate-only)

*Sources: discovery.md revised unit economics; research-5-revenue-models.md LoveHolidays model (9.9% take rate)*

### Benchmarks from Comparable Operators

| Operator | Revenue per booking | EBITDA margin | Model |
|----------|--------------------|--------------|----|
| LoveHolidays | ~£115 | 28.8% | Dynamic packaging (Hotelbeds + Ryanair) |
| On The Beach | £209 | ~29% | Dynamic packaging (moving upmarket) |
| Jet2 package | ~£98 profit/passenger | ~8.5% (vertically integrated) | Own airline + hotel contracting |
| Going.com | $49/subscriber/year | ~80%+ gross | Subscription information only |

*Sources: research-5-revenue-models.md*

### 🔴 CONTRADICTION-02: Affiliate vs Bed Bank Timing
**Issue:** Affiliate model (Day 1) and bed bank model (Month 2-3) have different user-facing experiences. Affiliate sends users to Booking.com, creating booking leakage risk — users complete the transaction on Booking.com and never return. Switching to bed bank in-platform booking changes the funnel entirely.
**Resolution needed:** Decide whether to start with in-platform booking from Day 1 (RateHawk, accepting slower launch) OR accept leakage in affiliate phase as deliberate demand validation before building the owned booking layer.
**Owner:** Founder / CTO
**Action:** Define explicit strategy before build begins — this affects the MVP scope materially.

### 🟡 GAP-06: Payment Processing Setup
**Missing:** Travel is high-risk classification. Rolling reserve 5-15% of card deposits held 6-12 months (real working capital impact). Visa registration £950/year. No payment processor selected.
**Owner:** CFO / Founder
**Action:** Get quotes from Stripe (standard, may refuse), WorldPay, and travel-specialist processor (e.g., PaySafe, Nuvei) before ATOL application.

### 🟡 GAP-07: Subscription Pricing Validation
**Missing:** £59.99/yr is an assumption. Going.com charges $49/yr (US). No UK price sensitivity data.
**Owner:** CMO / Founder
**Action:** A/B test subscription price points in Gate 2 (landing page + early access). Do not set price until tested.

### Revenue NOT available at MVP

| Stream | Blocker | Timeline |
|--------|---------|----------|
| Price Freeze / fintech | FCA authorisation required — 6-18 months. Criminal offence to operate without. | Year 2+ |
| B2B API licensing | Requires established preference graph with real user data | Year 3+ |
| Advertising / sponsored placements | Destroys trust at startup scale; requires volume for meaningful revenue | Year 2+ |

*Source: research-5-revenue-risks.md, Part 3 (FCA regulation)*

---

## 6. Key Resources

### Technology Stack

| Component | Technology | Cost at MVP scale | Source |
|-----------|-----------|------------------|--------|
| **Flights API** | Duffel (REST, no IATA, $3/order + 1%) | Variable, ~£3/booking | discovery.md Feasibility |
| **Hotels** | RateHawk API (free access, net rate, 2.5M+ properties) | Net rate only | research-6-bed-banks.md |
| **Car hire** | Cartrawler or Jayride | Commission split | discovery.md |
| **NLP intent parsing** | Claude Haiku or GPT-4o mini | ~£0.006/user/month | discovery.md |
| **Vector DB / preference graph** | pgvector (Supabase free) → Qdrant Cloud at scale | ~£150/month at 100K users | discovery.md |
| **Recommendation engine v1** | Cosine similarity (user vector vs destination vector) | Negligible compute | discovery.md |
| **Total AI infra (1K users)** | — | ~£46/month | discovery.md |
| **Total AI infra (10K users)** | — | ~£190/month | discovery.md |

### Intellectual Property (to be built)
- Semantic preference graph — per-user embedding of travel identity
- Deal confidence scoring algorithm
- NLP intent parsing tuning for travel domain

### Human Capital (MVP team)
- **Founder / PM** — product, strategy, commercial partnerships
- **CTO / Lead engineer** — full-stack, API integrations, ML infra

### 🟡 GAP-08: Team Gaps at MVP
**Missing:** No CMO / growth lead, no CFO / finance lead, no customer support. Who owns compliance (ATOL, GDPR, payment processing)? No job descriptions or equity structure defined.
**Owner:** Founder
**Action:** Define minimum viable team before any capital raise.

### Financial Resources
- **Target build budget:** £50-100K (research-4-tech-feasibility.md verdict)
- **ATOL setup cost:** ~£2,700 all-in (Small Business ATOL: £1,223 application + £1,250 advance APC; ABTOT franchise ~£942 as bridge option)
- **Working capital:** Rolling reserve on payment processing = 5-15% of booking value unavailable for 6-12 months

---

## 7. Key Activities

### Phase 1: Prove Demand (Months 1-3)

| Activity | Description | Owner |
|----------|-------------|-------|
| Gate 1 messaging test | Three landing page variants (city break, portfolio, personalised feed). Target: >25% email capture rate | CMO / Founder |
| User interviews | 8-10 qualitative interviews with 3+ trips/year travellers | Founder |
| RateHawk API sandbox | Evaluate inventory quality, API reliability, pricing for target destinations | CTO |
| ATOL application | Small Business ATOL — 12-week process. Start immediately. | Founder / CFO |
| Duffel API integration | PM has contact at Duffel — initiate commercial + technical onboarding | CTO / Founder |

### Phase 2: MVP Build (Months 2-4)

| Activity | Description |
|----------|-------------|
| NLP intent parser | Claude Haiku or GPT-4o mini. Parse "long weekend somewhere warm under £400" → structured intent |
| Basic preference graph | Explicit preferences (onboarding conversation) + booking history → user embedding |
| Deal confidence scoring | Price history + preference match + budget = confidence score |
| RateHawk integration | Hotel search, net rate pricing, markup, booking flow |
| Duffel integration | Flight search, booking, ticketing |
| Portfolio view | Budget tracker, trip list, deal feed |

### Phase 3: Launch and Learn (Months 4-6)

| Activity | Description |
|----------|-------------|
| Dynamic packaging (post-ATOL) | Duffel flight + RateHawk hotel assembled as ATOL-compliant package |
| Deal alert system | Price monitoring for bookmarked destinations + personalised push/email |
| Conversion optimisation | Reduce booking leakage — ensure in-platform booking UX matches incumbent trust |
| Data collection | Every click, search, bookmark, conversation enriches preference graph |

*Source: discovery.md Validation Playbook; strategy/12-decision-tree.md (5 phase gates)*

### 🟡 GAP-09: Cold Start Problem
**Missing:** Preference graph needs data to generate personalised recommendations. Day 1 users get generic recommendations. Designed mitigations (onboarding conversation + archetype priors + taste calibration swipe) are specified but not built. No A/B test of cold start UX.
**Owner:** CTO / Founder
**Action:** Build and test cold start flow before public launch.

---

## 8. Key Partnerships

### Confirmed / Initiated

| Partner | Role | Status | Commercial terms |
|---------|------|--------|-----------------|
| **Duffel** | Flights API — search, booking, ticketing. No IATA required. | PM has contact at Duffel | $3/order + 1% of ticket value |
| **RateHawk** (Emerging Travel Group) | Bed bank — hotel net rates. 2.5M+ properties. Free API, no minimum volume. | To initiate | Net rate (buy at net, sell at net + markup) |
| **Booking.com Affiliate** | Hotel affiliate links — Day 1 revenue while bed bank integrates | Available immediately | 4% of booking value |
| **CAA / ATOL** | ATOL protection licence — required for UK flight+hotel packages | Application to file | ~£2,700 all-in; ~£2.50/passenger APC |

### Partnership Roadmap

| Partner | Phase | Role |
|---------|-------|------|
| **Hotelbeds** | Month 3-6 | Scale-up bed bank (300K+ properties, 80K bookings/day). Requires booking history to access. |
| **TravelgateX** | Phase 2 | Aggregator — one GraphQL API → 1,000+ suppliers. Reduces integration complexity at scale. |
| **Cartrawler / Jayride** | Month 3-6 | Car hire API for package assembly |
| **Insurance provider** | Month 6+ | Travel insurance affiliate (15-20% commission). FCA-authorised partner takes the risk. |
| **ABTOT** | Bridge | Franchise ATOL — faster path to ATOL compliance at ~£942 while full application processes |

### 🔴 CONTRADICTION-03: Duffel Stays vs RateHawk
**Issue:** Duffel Stays exists (hotels via Duffel) but uses commission-share model, not net rate. Faster to integrate (single API) but "dead end for margin control" (discovery.md). RateHawk gives net rate and margin control but requires separate API integration.
**Resolution needed:** Determine whether Duffel Stays is a viable bridge (faster MVP) or whether the margin difference justifies building RateHawk from Day 1.
**Owner:** CTO / Founder
**Comparative data:** Duffel Stays ≈ affiliate economics (~£13/booking). RateHawk net rate ≈ £45/booking. At 500 bookings, that's £16,000 vs £22,500 — the difference is £6,500 but the integration cost difference may offset this in early months.

### 🟡 GAP-10: Hotelbeds Commercial Terms
**Missing:** Hotelbeds requires booking history and commercial negotiation. No minimum volume published publicly. Unknown what HP would need to demonstrate to get production access.
**Owner:** Founder / CTO
**Action:** Initiate Hotelbeds sandbox registration now (free, gets sandbox credentials immediately) — even if production access waits for Month 3-6.

---

## 9. Cost Structure

### Technology Costs (Monthly, at MVP scale)

| Cost item | Monthly (MVP / 1K users) | Monthly (growth / 10K users) | Source |
|-----------|--------------------------|------------------------------|--------|
| AI infra (LLM + vector DB) | ~£46 | ~£190 | discovery.md |
| Hosting / cloud (Vercel + Supabase) | ~£50-100 | ~£200-400 | Standard |
| Duffel API | £3/order + 1% | Variable | Duffel pricing |
| RateHawk | Net rate only (no platform fee) | Net rate only | research-6-bed-banks.md |
| Payment processing (high-risk) | 3.5-6% of transaction value + Visa £950/yr | Same % | research-5-revenue-risks.md |
| ATOL contribution (APC) | £2.50/passenger/booking | £2.50/passenger | CAA |
| Email (deal alerts) | ~£50-100 | ~£200-500 | Standard |

### Fixed Costs (Annual)
| Cost item | Annual | Source |
|-----------|--------|--------|
| ATOL licence (Small Business ATOL) | £1,223 application + £1,250 advance APC | CAA |
| Visa high-risk registration | £950 | research-5-revenue-risks.md |
| Mastercard registration | £500 | research-5-revenue-risks.md |
| Legal / compliance | £5,000-15,000 (estimated) | — |

### Human Capital Costs (Indicative)
| Role | Basis |
|------|-------|
| Founder(s) | Likely deferred / equity-only at MVP |
| CTO / engineer | Salary or equity split — not specified |

### 🟡 GAP-11: Full Burn Rate Model
**Missing:** No monthly burn rate modelled. No runway calculation. No salary costs specified for CTO or other early hires. No fundraising target set.
**Owner:** CFO / Founder
**Action:** Build 18-month financial model before any capital raise. Must include rolling reserve working capital impact.

### Key Cost Insight: Working Capital Trap
Payment processor holds 5-15% of booking value as rolling reserve for 6-12 months. If HP processes £100,000 in bookings in Month 3, £10,000-15,000 is unavailable. This constrains cash flow materially at growth stage.
*Source: research-5-revenue-risks.md, Part 2*

### Cost Advantage vs Incumbents
- Zero inventory risk (dynamic packaging — no pre-committed beds)
- No physical distribution (no stores, no reps)
- AI infra costs are negligible at startup scale (£46/month at 1K users)
- RateHawk: no minimum volume, no deposit required

---

## Flags Summary

### Gaps (🟡) — Missing Information

| ID | Gap | Owner | Priority |
|----|-----|-------|----------|
| GAP-01 | TAM/SAM/SOM segment sizing | Founder | High — needed for Seed raise |
| GAP-02 | Qualitative user research (8-10 interviews) | Founder / CMO | Critical — validate before build |
| GAP-03 | Value proposition A/B test results | CMO / Founder | Critical — Gate 1 |
| GAP-04 | Referral / viral mechanic design | CTO / CMO | Medium |
| GAP-05 | Customer support model | Founder / CFO | High — required for ATOL |
| GAP-06 | Payment processor selected | CFO / Founder | High — blocks launch |
| GAP-07 | Subscription price point validation | CMO / Founder | Medium |
| GAP-08 | Team structure and equity | Founder | High — blocks hiring |
| GAP-09 | Cold start UX designed and tested | CTO / Founder | High — blocks launch |
| GAP-10 | Hotelbeds commercial terms explored | Founder / CTO | Medium — Month 3-6 |
| GAP-11 | Full burn rate and runway model | CFO / Founder | Critical — before capital raise |

### Contradictions (🔴) — Requiring Resolution

| ID | Contradiction | Owner | Action |
|----|--------------|-------|--------|
| CONTRADICTION-01 | Paid CAC (£80-200+) vs organic-only imperative (affiliate economics don't survive paid CAC at launch) | CMO / CFO | Define paid acquisition trigger: minimum 100 bookings + LTV validated |
| CONTRADICTION-02 | Affiliate Day 1 (booking leakage risk) vs RateHawk in-platform booking (slower launch but owns funnel) | Founder / CTO | Decide MVP scope before build begins |
| CONTRADICTION-03 | Duffel Stays (fast, commission-share) vs RateHawk (slower, net rate, 3x margin) for hotel inventory | CTO / Founder | Financial model the trade-off at 500 bookings |

---

## Data Sources

| Claim | Source |
|-------|--------|
| 303 minutes research per trip | Expedia, n=5,713 (discovery.md) |
| 94.6M overseas trips UK 2024 | discovery.md Viability |
| 14% of 16-24s with 3+ trips booked | discovery.md Desirability |
| Travel CAC £80-200+ for new entrant | research-5-revenue-risks.md, Part 2 |
| Booking.com affiliate 4% | research-5-revenue-risks.md, Part 2 |
| RateHawk free API, no minimum volume | research-6-bed-banks.md, 1.3 |
| Bed bank margin 20-30% below retail | research-6-bed-banks.md, Executive Summary |
| ATOL Small Business cost ~£2,700 | research-5-revenue-risks.md, Part 2; research-6-bed-banks.md |
| LoveHolidays 9.9% take rate, £115/booking | research-5-revenue-models.md, 1.1 |
| OTB £209 margin/booking | research-5-revenue-models.md, 1.2 |
| Hopper 70% fintech revenue, FCA risk | research-5-revenue-risks.md, Part 3 |
| Chargeback rate travel 0.89%, 816% increase | research-5-revenue-risks.md, Part 2 |
| Rolling reserve 5-15% | research-5-revenue-risks.md, Part 2 |
| AI infra 1K users ~£46/month | discovery.md Feasibility |
| 48.7% trial-to-paid conversion (travel apps) | research-5-revenue-models.md, Going.com |
| Duffel: $3/order + 1% | discovery.md Feasibility |

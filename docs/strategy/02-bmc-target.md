# Business Model Canvas — Target State (18 Months Post-Launch)
## Holiday Portfolio

**Version:** Target State — 18 months post-launch
**Date:** 2026-02-28 (reference)
**Target date:** Approximately Q4 2027
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?

> See [[01-bmc-current]] for current state / MVP launch BMC.
> See [[00-gap-analysis]] for synthesis of all 13 framework artefacts.

---

## What Changes Between Current and Target State

| Dimension | MVP Launch (Current) | 18-Month Target |
|-----------|---------------------|----------------|
| Revenue model | Affiliate + early RateHawk bed bank | Dynamic packaging as primary revenue. Subscription established. Fintech in FCA pipeline. |
| Hotel inventory | RateHawk only (2.5M properties) | RateHawk + Hotelbeds (300K+ directly contracted) via TravelgateX aggregator |
| Booking model | Potentially hybrid affiliate/in-platform | Fully in-platform — own the booking funnel end-to-end |
| User scale | 0 → ~500-1,000 bookings | 800-1,200+ users (breakeven threshold) with 3+ bookings/user/year |
| Preference graph | Basic (explicit prefs + booking history) | Semantic embeddings + collaborative filtering (5K+ users trigger v2) |
| ATOL status | Application in progress | Small Business ATOL active. Full dynamic packaging authorised. |
| Team | Founder + CTO (2 people) | Founder + CTO + CMO + finance/ops lead (4-5 people) |
| Subscription | Not yet launched | Premium tier (£59.99/yr) with 48.7% trial-to-paid conversion target |
| Fintech | Blocked — FCA required | FCA application in progress. Insurance affiliate partnership in place as bridge. |

---

## 1. Customer Segments

### Primary: Established Power Users (Portfolio Loyalists)

By 18 months, the first cohort of users has completed 2-3 booking cycles through HP. The portfolio model has earned relevance:
- Average 3+ bookings/year on platform — city break + beach + ski mix or similar
- Preference graph is meaningfully personalised — HP's feed is "uniquely theirs"
- Budget tracker shows full year: "You've spent £2,100 of your £4,000 year — here are 3 trips that fit your remaining budget and upcoming windows"
- Switching cost is real: leaving HP means starting from scratch with generic recommendations

**Retention target:** Trip #3 cohort should show >70% intent to book Trip #4 on HP.
*Source: discovery.md — "By trip #3, their travel year lives here."*

### Secondary: Acquired via Deal Alerts (Pre-bookers)

Going.com model validation: deal alert subscribers who have not yet booked on HP. These users are in the preference-building phase — they engage with alerts, wishlist destinations, track prices. Conversion funnel: alert subscriber → first booking.

**Target:** 2M+ subscriber model (Going.com) is aspirational. 18-month target: 10,000-50,000 email subscribers with 5-15% booking conversion.

### Emerging: Budget-Conscious Premium Segment

OTB's playbook shows moving upmarket increases margin per booking (£209/booking vs budget market's ~£150). As HP's preference graph matures, it can identify users with higher willingness to pay and surface premium packages with proportionally higher markup.

**A premium HP booking:** 5-star city break hotel, business class flights assembled dynamically. Margin at 15-20% package markup on a £2,000 package = £300-400/booking. Same economics as OTB's strategic shift.
*Source: research-5-revenue-models.md, OTB section*

### 🟡 GAP-12: Cohort Retention Data
**Missing:** No real cohort data exists yet — these are design targets. First retention metrics will be available at Month 6-9.
**Owner:** Founder / CMO
**Action:** Define retention KPIs before launch. Track: day 30, day 90, booking-to-booking interval, deal alert open rate.

### 🟡 GAP-13: Premium Segment Identification
**Missing:** No model for identifying premium-intent users from preference graph data. What signals predict willingness to pay £2,000+ per package?
**Owner:** CTO
**Action:** Define premium intent signals in preference graph schema from Day 1 even if not acted on until Month 12+.

---

## 2. Value Propositions

### Evolved Core Promise at 18 Months

The MVP hook ("find me a great city break deal") has proven the platform works. By 18 months, the value proposition deepens:

| Level | Promise | Mechanism |
|-------|---------|-----------|
| **Entry** | Great city break deals found by conversation, not filters | NLP search + deal confidence scoring |
| **Engagement** | Your travel year, managed | Portfolio view: budget tracker, trip history, planned/dreamed trips |
| **Retention** | A feed that knows you better than any other platform | Semantic preference graph — enriched by every interaction over 12+ months |
| **Premium** | Deal monitoring that works while you sleep | Proactive price alerts, "Porto just dropped to £240 — 30% below average for your May window" |
| **Subscription** | Unlock the full preference graph and priority alerts | £59.99/year — portfolio features, deal calendar, preference graph editor |

### The Moat at 18 Months

At MVP launch, the moat is positioning (UK-native, price-first, visible graph). At 18 months, the moat is data:
- 12+ months of per-user conversational preference data
- Booking history across multiple trips
- Price alert interaction history (what made each user click)

**Competitors cannot replicate this without rebuilding the user's history.** Expedia Romie or a Mindtrip UK launch would start from zero. HP users who leave lose 12 months of preference learning.

*Source: discovery.md — "Competitors can copy the UI, the portfolio, even the NLP input — but they can't copy 12 months of conversational preference data."*

### Preference Graph: v1 vs v2

| Feature | v1 (MVP) | v2 (18-month) |
|---------|---------|--------------|
| Input | Explicit onboarding conversation + booking history | Above + every NLP search, click, bookmark, price alert interaction |
| Representation | Basic preference tags + embeddings | Full semantic embeddings (OpenAI text-embedding-3-small, 1,536 dimensions) |
| Recommendation | Cosine similarity (user vector vs destination vector) | Collaborative filtering (5K+ users) — "users like you also loved..." |
| Visible to user | Basic "here's what we think you like" | Full editable preference graph — edit preferences, see why a deal was recommended |
| Cold start | Archetype priors + onboarding swipe | Above + cross-user collaborative signals |

*Source: discovery.md Feasibility — "Phase 2: collaborative filtering at 5K+ users. Phase 3: two-tower neural network at 50K+ users."*

### 🟡 GAP-14: Mindtrip UK Expansion Watch
**Missing:** Mindtrip ($22.5M, TUI partnership) is the primary competitive threat. TUI partnership currently covers Belgium/Germany/Ireland/Netherlands — NOT UK. No intelligence on Mindtrip UK expansion timeline.
**Owner:** Founder
**Action:** Set up Mindtrip monitoring. If Mindtrip enters UK within 18 months, HP must have established booking history + preference graph data as switching cost barrier. This accelerates the urgency of early user acquisition.

---

## 3. Channels

### Acquisition Channel Mix at 18 Months

| Channel | MVP role | 18-month role | Target contribution |
|---------|---------|--------------|-------------------|
| **Organic SEO + content** | Primary | Still primary foundation | 40-50% of new users |
| **Deal alert email list** | Building subscriber base | Conversion engine — alerts → first booking | 20-30% of bookings |
| **Referral / word-of-mouth** | Organic only | Structured referral programme | 15-20% of new users |
| **PR / earned media** | Launch PR | Ongoing — ATOL + AI story, case studies | 5-10% of new users |
| **Paid social (limited)** | Avoided — CAC too high | Selective — retargeting existing email subscribers only | <10%, only if LTV validated |
| **Partnerships / co-marketing** | None | Potential — fintech (travel credit card), loyalty programme | TBD |

### Channel Economics at 18 Months

**Organic + referral strategy rationale:** Paid CAC is £80-200+ in UK travel. First-booking bed bank revenue is £45-60. Payback requires 2-3 bookings. Paid acquisition only viable once:
1. LTV model validated with 100+ real bookings
2. Repeat booking rate demonstrated (>2 bookings/user/year)
3. Subscription adds £60/year from premium cohort

**When paid makes sense:** If organic growth delivers 800 verified users (breakeven threshold), the LTV model is proven. Paid acquisition then has a known payback period.

*Source: research-5-revenue-risks.md Part 2; discovery.md — "Breakeven: ~800-1,200 users at small team scale"*

### 🟡 GAP-15: SEO Content Strategy
**Missing:** No keyword research, no content calendar, no SEO architecture defined. Organic strategy is identified as primary channel but not specified.
**Owner:** CMO
**Action:** Define content strategy in first 30 days. Long-tail travel deal queries (e.g., "best city breaks under £500 Europe 2027") are low-competition, high-intent.

---

## 4. Customer Relationships

### Relationship Evolution: Transactional → Habitual

| Stage | MVP | 18 months |
|-------|-----|-----------|
| **Onboarding** | 5-question taste calibration chat | Same + archetype priors reduce cold start friction |
| **Ongoing engagement** | Deal alerts (email + push) | Deal alerts + portfolio "what's next" prompts + annual review ("here's your year in travel") |
| **Post-booking** | Confirmation + ATOL docs | Above + pre-trip nudges ("your Porto trip is in 3 weeks — here's what's trending") |
| **Subscription relationship** | Not yet | Premium users get preference graph editor + priority alerts + dedicated support tier |
| **Retention mechanic** | Graph improves with use | 12-month anniversary review: "Here's everything we've learned about how you travel this year." |

### Resolving the Commission-Credibility Problem (by 18 months)

At MVP, commission-credibility is a risk: users may perceive recommendations as commercially motivated. By 18 months:
1. **Visible preference graph** — user can see exactly why a deal was recommended. Not opaque ML.
2. **Deal confidence scoring** — shows price history. "This hotel is 23% below its 6-month average — and matches your preference for boutique + good food scene."
3. **Subscription decouples revenue from recommendation** — premium subscribers pay HP directly. HP's incentive is user satisfaction, not affiliate click-through.
4. **Track record** — 12 months of "HP recommended this and it was worth it" builds trust.

*Source: discovery.md Kill Signals — commission-credibility resolved by reframe 3; research-5-revenue-risks.md Part 4*

### 🟡 GAP-16: NPS / Satisfaction Measurement
**Missing:** No NPS programme or satisfaction measurement defined. How will HP know if the preference graph is building trust or eroding it?
**Owner:** CMO / Founder
**Action:** Embed NPS prompt after every completed trip (post-return, not post-booking). Track preference graph satisfaction separately.

---

## 5. Revenue Streams

### Revenue Model at 18 Months: Dynamic Packaging as Primary

| Stream | Status | Mechanics | Revenue profile |
|--------|--------|-----------|----------------|
| **Dynamic package margin** | Primary — post-ATOL | Duffel flight (net) + RateHawk/Hotelbeds hotel (net) + 15-20% package markup | £50-60/package booking |
| **Bed bank net rate (hotel-only)** | Active | Buy RateHawk net, sell at 25% markup | £40-45/hotel booking |
| **Ancillary affiliate** | Active | Insurance (15-20%), car hire (8-12%), activities (8-15%) | £10-25/booking |
| **Premium subscription** | Active — Month 6-12 launch | £59.99/yr — preference graph features, deal calendar, priority alerts | £60/user/year from premium cohort |
| **Affiliate (legacy bridge)** | Declining | Still active where bed bank inventory is thinner | £13/booking |
| **FCA application in progress** | Pipeline only | Price Lock, Portfolio Protect — requires FCA authorisation (6-18 months from application) | Year 2+ at earliest |

### Revenue Model Benchmarked to LoveHolidays

HP's target model at 18 months mirrors LoveHolidays' mechanics at startup scale:

| Metric | LoveHolidays (mature) | HP target (18 months) |
|--------|----------------------|----------------------|
| Revenue per booking | ~£115 | £50-70 (smaller packages, lower volume premium) |
| Take rate | ~9.9% of GTV | Target 10-15% |
| EBITDA margin | 28.8% | Not yet achievable — still investing in growth |
| Model | Dynamic packaging (Hotelbeds + Ryanair) | Dynamic packaging (RateHawk/Hotelbeds + Duffel) |
| ATOL | Full ATOL licence | Small Business ATOL |

*Source: research-5-revenue-models.md, LoveHolidays*

### Unit Economics Target at 18 Months

**At 1,200 users with 3 bookings/year and 60% dynamic package mix:**

| User type | Revenue per user/year | Users | Total revenue |
|-----------|----------------------|-------|--------------|
| Dynamic package user (primary) | £150-180 (3 × £50-60) + ancillaries | 720 (60%) | £108,000-130,000 |
| Hotel-only bed bank | £120-135 (3 × £40-45) | 360 (30%) | £43,000-49,000 |
| Premium subscriber uplift | +£60/year (est. 40% of users subscribe) | 480 | £28,800 |
| **Total estimated revenue** | | **1,200 users** | **~£180,000-210,000** |

**Breakeven:** Small team (Founder + CTO + CMO + ops) at ~£150-200K annual cost = breakeven at 1,000-1,200 active users. This matches the discovery.md projection ("breakeven at ~800-1,200 users").

### 🟡 GAP-17: Subscription Churn Rate
**Missing:** Travel subscription churn is high — industry benchmark is 55% retention (45% annual churn). Going.com data not published. HP's subscription retention is entirely unvalidated.
**Owner:** CMO / CFO
**Action:** Set churn as a primary KPI from subscription launch. Build win-back flows from Day 1. Target: >65% Year 1 retention (above industry average).

### 🟡 GAP-18: FCA Authorisation Timeline
**Missing:** FCA authorisation (for Price Lock / Portfolio Protect fintech) takes 6-18 months from application. Application not yet started. Insurance affiliate partnership not yet identified as FCA-authorised bridge.
**Owner:** Founder / CFO
**Action:** File FCA authorisation pre-application (no cost) to start clock. Identify FCA-authorised insurance partner for bridge revenue.

### 🔴 CONTRADICTION-04: Subscription vs Commission Trust Tension (Persists)
**Issue:** Subscription model builds trust (user pays HP directly, HP's incentive = satisfaction). Commission model creates potential conflict (HP earns more if user books a higher-commission option). At scale, platforms like Kayak run both without issue. At startup scale, one bad recommendation that feels commercially motivated could destroy subscription trust.
**Resolution needed:** Decision rule — HP must always recommend the best-value option for the user's preference + budget. Markup is applied to the package price, not used to steer recommendations. Visible preference graph and deal confidence scoring must be the proof. This is a product and editorial principle, not just a comms message.
**Owner:** Founder (product principle) + CMO (communications)

---

## 6. Key Resources

### Evolved Technology Stack at 18 Months

| Component | MVP | 18-month target | Notes |
|-----------|-----|----------------|-------|
| **Hotel inventory** | RateHawk only | RateHawk + Hotelbeds (via TravelgateX) | TravelgateX: one GraphQL API → 1,000+ suppliers |
| **Flights** | Duffel | Duffel (continuing) | Relationship deepened — potential commercial term improvement |
| **Preference graph** | pgvector (Supabase) — basic embeddings | Qdrant Cloud — semantic embeddings, collaborative filtering | Trigger: 5K+ users |
| **Recommendation engine** | Cosine similarity (v1) | Collaborative filtering (v2) | Two-tower neural at 50K+ users (Phase 3) |
| **AI infra cost (10K users)** | ~£190/month | ~£190/month | Scales very gradually |
| **Payment processing** | High-risk processor TBD | Established relationship — rolling reserve negotiated down | Requires 12 months history |

### Intellectual Property (built over 18 months)

| Asset | Status at 18 months |
|-------|---------------------|
| Semantic preference graph (per-user) | Operational — enriched by 12+ months of data per user |
| Deal confidence scoring algorithm | Operational + iterated on real booking data |
| NLP intent parsing (travel-tuned) | Operational |
| Price monitoring and alert engine | Operational |
| Collaborative filtering model (v2) | Emerging — activated when 5K+ users |

**This IP is the moat.** It cannot be replicated without rebuilding the user's history.

### Brand and Trust Assets

- ATOL licence — trust signal that no US competitor can offer UK consumers
- 12+ months of booking history — real customer testimonials and case studies
- Preference graph reputation — "HP knows how I travel better than I do"

### 🟡 GAP-19: Data Infrastructure and GDPR
**Missing:** Preference graph stores rich personal travel behaviour data. GDPR implications: lawful basis for processing, user data deletion requests ("right to be forgotten" would destroy preference graph for that user), data retention policy.
**Owner:** Founder / CTO
**Action:** GDPR legal review before launch. Preference graph deletion policy = user deletes their history but cannot selectively remove it. Must be disclosed in privacy policy.

---

## 7. Key Activities

### Core Activities at 18 Months

| Activity | Description | Frequency |
|----------|-------------|-----------|
| **Package assembly and pricing** | Duffel + RateHawk/Hotelbeds packages priced and updated | Continuous (live pricing) |
| **Price monitoring** | Alert engine scanning destination prices for subscribed users | Continuous |
| **Preference graph enrichment** | Every NLP search, click, bookmark, booking updates user embeddings | Real-time |
| **Deal curation** | Editorial + algorithmic — identifying and surfacing genuinely good deals | Daily |
| **Subscription management** | Onboarding, renewal, win-back, churn prevention | Automated |
| **ATOL compliance** | Passenger manifests, APC payments, trust account management | Per-booking |
| **Supplier relationship management** | RateHawk account management, Hotelbeds commercial negotiation, Duffel relationship | Monthly |
| **Collaborative filtering model** | Retrain recommendation model as user base grows | Weekly/monthly |

### Growth Activities at 18 Months

| Activity | Description |
|----------|-------------|
| **Content and SEO** | Long-tail travel deal content — drives organic acquisition |
| **Deal alert email programme** | Weekly deal alerts to subscriber base — conversion funnel |
| **Referral programme** | Structured — "Give a friend £25 credit, get £25 yourself" when they book |
| **PR and case studies** | User stories: "HP found me a deal I'd never have found on Booking.com" |
| **FCA pre-application preparation** | Building compliance documentation for fintech products |

---

## 8. Key Partnerships

### Partnership Stack at 18 Months

| Partner | Role at 18 months | Commercial model |
|---------|------------------|-----------------|
| **Duffel** | Primary flights API — deepened relationship | $3/order + 1%. Potential volume discount negotiation. |
| **RateHawk** | Primary hotel bed bank | Net rate + HP markup. Credit terms by Month 6-12. |
| **Hotelbeds** | Secondary bed bank — larger property set | Net rate. Requires booking history to access production. Target Month 3-6. |
| **TravelgateX** | Aggregator — normalised access to RateHawk + Hotelbeds + 1,000+ others | Usage/volume based. Reduces integration complexity. |
| **Cartrawler / Jayride** | Car hire — package completion | Commission split |
| **FCA-authorised insurance partner** | Travel insurance affiliate + CFAR bridge product | 15-20% commission to HP |
| **ABTOT / CAA** | ATOL compliance | APC £2.50/passenger. Small Business ATOL active. |

### Partnership Roadmap Beyond 18 Months

| Partner | Phase | Role |
|---------|-------|------|
| **B2B API customers** | Year 3+ | Licence preference engine to corporate travel platforms (Hopper HTS model) |
| **Loyalty / fintech co-marketing** | Year 2 | Travel credit card partnership — HP as booking surface for rewards earners |
| **Experiences (Viator/GetYourGuide)** | Month 12+ | Activities affiliate — adds itinerary depth to packages |

### 🔴 CONTRADICTION-05: TravelgateX vs Direct Integration Trade-off
**Issue:** TravelgateX provides one API → 1,000+ suppliers but charges for connectivity. Direct RateHawk + Hotelbeds integration is two APIs but gives more control and potentially better commercial terms directly with each bed bank.
**Resolution needed:** At 18-month scale (800-1,200 users), the volume likely does not justify TravelgateX fees. The benefit of TravelgateX is speed of access to multiple suppliers during early growth. Direct integration is better at scale.
**Decision rule:** Start direct (RateHawk). Use TravelgateX only if needing to access 3+ suppliers simultaneously and integration cost exceeds TravelgateX fees.
**Owner:** CTO / CFO

---

## 9. Cost Structure

### Cost Structure at 18 Months (4-5 person team, ~1,200 users, dynamic packaging active)

#### Fixed Costs (Annual)

| Cost item | Annual estimate | Notes |
|-----------|----------------|-------|
| Salaries (4 people: Founder + CTO + CMO + ops) | £160,000-240,000 | Founder likely below market rate; CTO/CMO at market |
| ATOL Small Business licence | £1,223 + ongoing APC | APC is variable (£2.50/passenger) |
| Visa high-risk registration | £950 | |
| Mastercard registration | £500 | |
| Legal / compliance / GDPR | £10,000-20,000 | Includes FCA pre-application work |
| Accounting / CFO support | £5,000-15,000 | |

#### Variable Costs (Monthly, at ~1,200 users)

| Cost item | Monthly estimate | Notes |
|-----------|----------------|-------|
| AI infra (LLM + vector DB at 10K searches/month) | ~£190 | discovery.md |
| Hosting (Vercel + Supabase + Qdrant) | ~£300-600 | Scale with usage |
| Payment processing (3.5-6% of GTV) | ~£1,500-3,000 on £50K/month GTV | High-risk classification |
| RateHawk / Hotelbeds (net rate purchases) | Net rate only — no platform fee | Working capital needed for payment cycle |
| Email / communications | ~£200-500 | |
| Deal alert infrastructure | ~£100-200 | |

#### Working Capital Requirements

| Requirement | Amount | Timeline |
|-------------|--------|---------|
| Rolling reserve (5-15% of GTV) | £2,500-7,500 on £50K/month GTV | Held 6-12 months by processor |
| ATOL trust account (customer payments) | Ring-fenced until departure | Cannot use as working capital |
| RateHawk net rate payments | Due at booking or on credit terms (15-30 days) | Manageable with credit line |

**Total estimated annual cost base (18 months):** £200,000-320,000
**Required revenue for breakeven:** ~£200,000-250,000 (from ~1,200 active users at £180-220/user/year)

*This aligns with the discovery.md projection: "Breakeven: ~800-1,200 users at small team scale"*

### Cost Advantage vs Incumbents (Preserved)

- Zero inventory risk — dynamic packaging means no pre-committed hotel beds
- No physical distribution — no stores, reps, or physical customer touchpoints
- AI infra remains cheap — £190/month at 10K users is negligible vs revenue
- Bed bank access without volume minimums (RateHawk) — no fixed supply costs

### 🟡 GAP-20: Fundraising Strategy
**Missing:** No fundraising amount, structure, or timeline defined. The £50-100K build budget (research-4-tech-feasibility.md) gets to MVP. Getting to 1,200 users and breakeven likely requires £200-400K total capital (12-18 months burn before revenue matches costs).
**Owner:** Founder / CFO
**Action:** Define capital requirements before any investor conversations. Model three scenarios: bootstrapped (slow), angel-funded (medium), Seed-funded (fast). Decision at Gate 3 (discovery.md Validation Playbook).

---

## Flags Summary

### Gaps (🟡) — Missing Information (Target State Specific)

| ID | Gap | Owner | Priority |
|----|-----|-------|----------|
| GAP-12 | Cohort retention KPIs defined | Founder / CMO | High — define before launch |
| GAP-13 | Premium intent signals in preference graph | CTO | Medium — design from Day 1 |
| GAP-14 | Mindtrip UK expansion monitoring | Founder | High — competitive threat |
| GAP-15 | SEO content strategy | CMO | High — primary acquisition channel |
| GAP-16 | NPS / satisfaction measurement | CMO / Founder | Medium |
| GAP-17 | Subscription churn modelling | CMO / CFO | High — subscription viability |
| GAP-18 | FCA authorisation timeline | Founder / CFO | Medium — Year 2 revenue |
| GAP-19 | GDPR and preference graph data policy | Founder / CTO | High — pre-launch legal requirement |
| GAP-20 | Fundraising strategy and capital requirements | Founder / CFO | Critical — before any investor conversations |

### Contradictions (🔴) — Requiring Resolution (Target State Specific)

| ID | Contradiction | Owner | Resolution |
|----|--------------|-------|-----------|
| CONTRADICTION-04 | Subscription trust vs commission revenue (persists from MVP) | Founder / CMO | Product principle: always recommend best-value. Markup on package price, not on recommendations. |
| CONTRADICTION-05 | TravelgateX aggregator (fast multi-supplier) vs direct integration (more control, lower fees at scale) | CTO / CFO | Start direct (RateHawk). TravelgateX only if accessing 3+ suppliers simultaneously. |

---

## Transition Milestones (MVP → Target State)

| Milestone | Trigger | Owner |
|-----------|---------|-------|
| Switch from affiliate to bed bank | RateHawk API integrated and tested | CTO |
| ATOL active | 12-week application approved | Founder |
| Dynamic packaging live | ATOL active + Duffel + RateHawk integrated | CTO |
| Subscription launched | First 100 bookings completed + LTV model validated | CMO / Founder |
| Hotelbeds production access | 3-6 months booking history demonstrated | Founder / CTO |
| Collaborative filtering v2 | 5,000+ users in system | CTO |
| FCA pre-application filed | Month 9-12 | Founder / CFO |
| Breakeven | 800-1,200 active users at 3 bookings/year with dynamic packaging | All |

---

## Data Sources

| Claim | Source |
|-------|--------|
| Breakeven at 800-1,200 users | discovery.md revised unit economics |
| LoveHolidays 9.9% take rate, 28.8% EBITDA | research-5-revenue-models.md, 1.1 |
| OTB £209/booking, 29% EBITDA, upmarket shift | research-5-revenue-models.md, 1.2 |
| Hotelbeds 300K+ properties, requires booking history | research-6-bed-banks.md, 1.1 |
| TravelgateX one API → 1,000+ suppliers | research-6-bed-banks.md, 1.6 |
| Collaborative filtering trigger at 5K+ users | discovery.md Feasibility |
| 48.7% trial-to-paid conversion (travel apps) | research-5-revenue-models.md, Going.com |
| 55% retention rate (travel subscriptions) | research-5-revenue-risks.md, Part 4 |
| FCA authorisation 6-18 months | research-5-revenue-risks.md, Part 3 |
| Mindtrip TUI partnership covers Belgium/Germany/Ireland/Netherlands not UK | discovery.md Kill Signals |
| RateHawk credit terms 15-30 days for established agents | research-6-bed-banks.md, 1.3 |
| AI infra 10K users ~£190/month | discovery.md Feasibility |
| GDPR right to be forgotten applies to preference graph | Legal requirement — not yet assessed |

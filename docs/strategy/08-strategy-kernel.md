# Strategy Kernel — Holiday Portfolio

**Framework:** Richard Rumelt, *Good Strategy / Bad Strategy* (2011)
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Status:** 🟢 Diagnosis is clear and evidence-backed | 🟡 Guiding policy has an organic growth assumption that is unvalidated | 🔴 Coherent actions require strict sequencing discipline — doing them out of order destroys the model
**Last updated:** 2026-02-28
**Sources:** [[discovery]], [[research-3-ai-travel]], [[research-5-revenue-models]], [[research-6-bed-banks]]

---

## Preamble: What a Strategy Kernel Is (and Is Not)

Rumelt's kernel has exactly three elements:

1. **Diagnosis** — a clear characterisation of the *challenge*. Not the opportunity. The obstacle that makes winning hard.
2. **Guiding Policy** — the *approach* to addressing the challenge. Not a goal. A constraint that rules things in and rules things out.
3. **Coherent Actions** — specific, coordinated moves that follow from the policy. Not a to-do list. Actions that *reinforce each other* and cannot be executed independently.

**Bad strategy** lists goals as if they were strategy ("grow to 100K users," "become the leading platform"). These are aspirations, not strategy. Bad strategy also paddles around the hard part — the crux.

**Good strategy** identifies the crux — the specific hardest part of the challenge — and addresses it directly with a constraining policy and coherent action set.

---

## 1. Diagnosis

> What is the challenge?

### The Surface Problem

The UK outbound travel market is large (£98B+, 94.6M overseas trips in 2024 — discovery.md) and growing in AI adoption (61% YoY increase in UK holidaymakers using AI-powered travel platforms — research-3-ai-travel.md). Self-serve frequent travellers — those who take 3+ international trips per year — currently use 4–6 disconnected tools to manage annual travel behaviour: Skyscanner for price-tracking, Going.com or Dollar Flight Club for deal alerts, Booking.com or LoveHolidays for booking, TripIt or a spreadsheet for trip management. No single product holds the annual picture.

The opportunity is unambiguous: 44% of UK consumers cite lack of personalisation as their primary pain point (research-3-ai-travel.md). No AI-native domestic UK travel competitor exists. The semantic preference graph + portfolio model combination is unoccupied across all 12 platforms assessed in competitive research (research-3-ai-travel.md, Part 6).

### The Crux

The challenge is not building the product. The technical feasibility verdict is clear: buildable within £50–100K (discovery.md), with commodity infrastructure (LLM embeddings, pgvector, Duffel API, RateHawk REST API).

The challenge is not finding the market. 94.6M outbound trips, £98B market, 61% YoY AI adoption, zero AI-native domestic competitors.

**The crux is threefold:**

**Crux 1: The booking leakage trap**
300+ travel planning startups have failed at exactly the point HP is entering. The failure mode is consistent: users plan on the new platform and book on Booking.com. Desti (built by the Siri/SRI team) is the canonical example — users loved the product, booked elsewhere. The planning layer generates zero revenue unless HP owns the full booking funnel. Affiliate-only economics (4–8% commission = £8–13/booking) cannot survive paid CAC of £80–200+. The bed bank model (£45–60/booking via RateHawk net rate + markup) changes the unit economics — but only if HP captures the booking, not just the planning.

**Crux 2: The cold start + organic growth paradox**
The preference graph is HP's primary differentiator and primary moat. But the graph has no value on Day 1 — it requires data to learn. And the organic growth strategy (content/SEO, deal alert list-building) required to acquire users at low CAC takes 6–12 months to yield traffic, while January Sunshine Saturday (35% of annual bookings in a 4–6 week window — discovery.md) represents the primary annual demand concentration. HP must build distribution *before* it has a compelling product, and build a compelling product *before* it can demonstrate the value of its distribution.

**Crux 3: The affiliate window is a cash flow trap**
The path to bed bank margins requires ATOL (12 weeks minimum). The path to ATOL requires operating as an affiliate first (no package sales without ATOL). Affiliate economics yield £8–13/booking. At 100 bookings/month, that is £800–1,300 revenue — insufficient to cover development costs, ATOL fees, or content production. The window between "proving demand" (affiliate) and "activating margin" (bed bank + ATOL) requires either external funding or aggressive runway management.

### What Is Not the Challenge

- **Building the NLP layer:** Claude Haiku or GPT-4o mini solves this. <600ms latency, ~£0.006/user/month. No fine-tuning required (discovery.md)
- **Finding the inventory:** RateHawk provides 2.5M+ properties with free API access and no minimum volume. Duffel provides flights via modern REST API without IATA accreditation (discovery.md, research-6-bed-banks.md)
- **Proving the category exists:** Mindtrip ($22.5M funded, TUI partnership, Amex/Capital One/United investors) proves market demand for AI personalised travel. HP does not need to prove the category
- **Competing on AI features:** NLP input is now table-stakes (all major OTAs ship it). HP does not win on NLP alone — it wins on the combination of price-first positioning + visible preference graph + portfolio model + bed bank margins + ATOL compliance

🟡 **Gap:** The diagnosis above is synthesised from secondary research and competitive analysis. It has not been tested against real users. Gate 1 (messaging test) and Gate 2 (user interviews) are the required validation steps. If users consistently plan on HP and book elsewhere in early beta testing, Crux 1 is validated as fatal and the model must be revised — the booking funnel must be tightened before scaling.

---

## 2. Guiding Policy

> What approach addresses the diagnosis?

### The Policy: Price-First Personalisation via City Break Gateway, Owned Booking Funnel, and Organic-Led Bed Bank Margin

The guiding policy is a set of constraints — what HP will and will not do — that directly address all three elements of the crux:

**Policy A: Own the booking funnel from Day 1 (addresses Crux 1: booking leakage)**
HP is not a planning tool. HP is not an inspiration layer. HP is a booking platform with a personalisation engine layered on top. Every NLP query flows into a booking flow. Affiliate links are used *only* for revenue during ATOL application (the bridge); the goal from Month 1 is to move every booking through HP's own funnel. The deal confidence score ("this deal is 30% below average for you") exists specifically to capture the booking moment by removing the user's need to cross-check elsewhere.

This rules out: building a planning-only MVP that defers booking to v2. The booking funnel must be in v1, even if the preference graph is basic.

**Policy B: Enter via price, not inspiration (differentiates from Mindtrip, addresses Crux 2: cold start)**
The entry point is always a specific deal on a specific city break at a specific price — not "where should I go?" or "discover new destinations." This serves two functions: (1) it immediately demonstrates value to users who have a concrete booking intent, and (2) it generates preference data (booking behaviour is the richest preference signal) from the first interaction, seeding the graph faster than inspiration-browsing would.

This rules out: leading with the annual portfolio view or the preference graph as the first user experience. These are revealed through use, not pitched at onboarding.

**Policy C: Grow organically until bed bank margins are live (addresses Crux 3: cash flow trap)**
Paid CAC (£80–200+) destroys unit economics at affiliate rates (£8–13/booking) and requires at minimum 5–10x ROAS to be viable. HP will not spend on paid acquisition until bed bank margins (£45–60/booking) are live and ATOL is in hand. Organic channels — city break deal content, destination price guides, deal alert email list — build distribution slowly but at near-zero marginal cost.

This rules out: growth-at-all-costs before margin is validated. Series A fundraising before Gate 4 is not ruled out, but capital deployed before ATOL is in hand should fund content and team, not paid acquisition.

**Policy D: Apply for ATOL on Day 1 (removes the primary structural blocker)**
ATOL takes 12 weeks minimum. Every week of delay is a week without dynamic package economics (the model that makes HP structurally viable vs. Desti, which failed on affiliate economics). ABTOT franchise ATOL is available from ~£942 as a bridge to enable package sales while the Small Business ATOL application is processed. This is not optional — it is the unlock for everything that follows.

This rules out: treating ATOL as a Phase 2 concern. It must be concurrent with the affiliate-only Phase 1.

**Policy E: Bed bank, not affiliate, as the permanent revenue model**
Affiliate commission (4–8%) is the starting point for demand validation, not the business model. The business model is: buy hotel nights at RateHawk net rate → add 15–35% markup → assemble with Duffel flights → sell as ATOL-compliant dynamic package at 9–10% take rate on package value. This is LoveHolidays' model at startup scale (LoveHolidays: £288M revenue, 28.8% EBITDA, 9.9% take rate on £2.9B GTV — research-5-revenue-models.md).

This rules out: treating subscription revenue as the primary revenue model. Subscription (£59.99/yr) is the third revenue stream, not the first. Going.com's ceiling (2M subscribers at $49/yr, 80%+ gross margin, but zero take rate on actual bookings) shows why subscription-only fails to capture the real economic value.

🟡 **Gap:** Policy C (organic growth) is the most vulnerable assumption. The timing gap between organic channel maturation (6–12 months for SEO) and January Sunshine Saturday (primary booking window) creates a risk that HP launches too late to capture 2027's peak. Mitigation: begin content production in Month 1, build deal alert email list as the fastest organic channel (list can drive January traffic even with no SEO authority). **Owner: Founder/Growth lead.**

🔴 **Contradiction:** Policy A (own the booking funnel) conflicts with the affiliate-only bridge in Policy E during the ATOL window. A user who plans on HP but clicks through to Booking.com for the booking is exactly the Desti failure mode. Mitigation: during the affiliate bridge period, the "book now" button should complete as much of the booking on-platform as possible (Duffel white-label for flights, hotel affiliate link as a last resort only). Track leakage rate explicitly — if >50% of users who view a deal book elsewhere, this is a kill signal. **Owner: Tech lead, tracking from Day 1.**

---

## 3. Coherent Actions

> What specific, coordinated actions follow from the guiding policy?

The actions below are coherent — each one reinforces the others. They cannot be reordered without breaking the model. The sequencing is the strategy.

### Phase 1: Prove Demand + Activate Bed Bank (Month 0–3)

**Action 1.1: Gate 1 — Messaging test (Week 1–2)**
- Deploy three landing page variants: (a) city break deal feed, (b) portfolio planning + budget tracker, (c) personalised deal alerts
- Target: 500+ visitors per variant (paid or organic; cost ~£300–500 on Google/Meta)
- Success signal: >5% email capture conversion on winning variant
- Kill signal: <2% across all three variants — reconsider the entry point before building
- **Owner:** Founder. **Cost:** £500–1,500 (landing page + ads)
- **Links to:** Policy B (enter via price/deal, not portfolio pitch)

**Action 1.2: Gate 2 — User interviews (Week 2–4)**
- 8–10 interviews with self-identified frequent travellers (3+ trips/year) from UK network
- Focus questions: current workflow (which tools, how they price-check), decision moment (what triggers booking), deal confidence (how do they know if a price is good?), portfolio behaviour (do they plan multiple trips in advance?)
- Success signal: ≥6/10 interviews identify fragmentation + deal uncertainty as primary pain
- Kill signal: "I just use Booking.com and I'm happy" from majority — reconsider differentiation
- **Owner:** Founder. **Cost:** £0 (time) to £500 (incentives)

**Action 1.3: ATOL application — Day 1**
- Apply for ABTOT franchise ATOL immediately (~£942, faster than Small Business ATOL)
- Begin Small Business ATOL application concurrently (~£3,200–4,700, 12 weeks)
- Neither application requires working product — they require company registration, insurance, and financial statements
- **Owner:** Founder. **Cost:** £942 (ABTOT bridge) + £3,200–4,700 (Small Business ATOL)
- **Links to:** Policy D (ATOL on Day 1)

**Action 1.4: RateHawk API sandbox evaluation (Week 2–4)**
- Sign up free at ratehawk.com; access sandbox immediately with no commercial commitment
- Build test integration: NLP query → structured intent → RateHawk hotel search → price + markup calculation
- Validate: can HP buy a hotel room at net rate, apply 25% markup, and present a price that is competitive with Booking.com retail while still generating £40+ margin?
- Rate parity check: confirm hotel rate parity rules do not prevent HP from displaying competitive prices
- **Owner:** Tech lead. **Cost:** £0 (free API access)
- **Links to:** Policy E (bed bank as permanent revenue model)

**Action 1.5: Content production begins — Month 1**
- 20 city break destination guides targeting long-tail search intent: "Barcelona city break deals 2026," "is £350 for Porto a good deal," "best time to book Lisbon from UK"
- Deal alert email capture: landing page + "set an alert for [destination]" — building the list before the product is live
- SEO takes 6–12 months; content must start on Day 1 to be ready for January 2027
- **Owner:** Founder/Growth lead. **Cost:** £0 (founder writes) to £2,000/month (freelance content)
- **Links to:** Policy C (organic growth until bed bank margins live)

### Phase 2: Build MVP + First Bookings (Month 2–5)

**Action 2.1: NLP + preference graph v1 (Month 2–3)**
- NLP intent parsing: Claude Haiku or GPT-4o mini — "somewhere warm under £400 boutique hotel" → structured intent object
- Preference graph v1: explicit preferences from onboarding conversation + booking history → stored in Supabase (pgvector)
- Recommendation engine v1: cosine similarity between user preference vector and destination/hotel vectors
- End-to-end latency target: <3 seconds (NLP 600ms + preference lookup 50ms + candidate generation 100ms + live pricing 1,500ms parallel + ranking 100ms = ~2,350ms — discovery.md)
- **Owner:** Tech lead. **Cost:** ~£46/month AI infrastructure at 1K users; £190/month at 10K users
- **Links to:** Policy B (enter via price/deal) and Policy A (own the booking funnel)

**Action 2.2: Booking funnel v1 — affiliate bridge (Month 3)**
- Duffel API integration for flights: no IATA required, modern REST API, PM has direct relationship at Duffel
- Hotel: affiliate links to Booking.com (4–8% commission) as bridge while RateHawk commercial terms are established
- Leakage tracking: instrument every "book now" click to distinguish on-platform completion vs. affiliate redirect
- Kill signal on leakage: if >50% of deal views result in off-platform booking, rebuild the on-platform booking flow before proceeding
- **Owner:** Tech lead + Founder. **Cost:** Duffel API: $3/order + 1% — minimal at startup volume

**Action 2.3: Beta cohort — Month 3–5**
- 50–100 users recruited from Gate 1 email list, user interview participants, founder network
- Target: ≥10 completed bookings (end-to-end, not just platform visits)
- Measure: booking conversion rate, leakage rate, preference graph depth after first booking, NPS
- This is the data that justifies RateHawk commercial terms negotiation (booking history = credibility with suppliers)
- **Owner:** Founder. **Cost:** £0 to £500 (user incentives)

**Action 2.4: Preference graph v2 — semantic embeddings (Month 4–6)**
- Upgrade preference storage from JSON to LLM embeddings (OpenAI text-embedding-3-small, 1,536 dimensions)
- Every NLP conversation, search, bookmark, click, and completed booking enriches the user's preference vector
- Visible preference profile: surface the graph to users — "Here's what we think you like — is this right?"
- Cold start calibration: onboarding conversation covers 8–10 taste dimensions; archetype priors fill gaps
- **Owner:** Tech lead. **Cost:** ~£150/month vector storage at 100K users
- **Links to:** USP 4 (visible preference graph) — the differentiator that addresses the commission-credibility problem

### Phase 3: Dynamic Packages + Margin Activation (Month 4–8)

**Action 3.1: RateHawk production integration (Month 4–5)**
- Transition from Booking.com affiliate to RateHawk net rate for hotel component
- Net rate model: HP buys at net, applies 15–35% markup, presents gross price to user
- Margin validation: confirm £40+ hotel margin per booking at average 2-night city break
- Rate parity compliance: validate that HP's markup results in prices at or above minimum selling rates on rate-parity-restricted properties
- At 100 bookings/month: bed bank model yields £4,500–6,000/month revenue vs. £800–1,300 affiliate-only
- **Owner:** Tech lead. **Cost:** No minimum volume; pay-per-booking via RateHawk
- **Links to:** Policy E (bed bank as permanent revenue model)

**Action 3.2: Dynamic packaging + ATOL activation (Month 5–6)**
- With ATOL in hand: begin assembling Duffel flights + RateHawk hotels as ATOL-compliant packages
- Package markup: 9–10% take rate on package value (LoveHolidays benchmark — research-5-revenue-models.md)
- At average £1,000 package: £90–100 revenue per package vs. £45–60 hotel-only bed bank
- Deal confidence score: "This 3-night Barcelona package is £340 — 28% below average for May dates" — requires price history database (build from Day 1 by logging all prices queried via RateHawk)
- **Owner:** Tech lead + Founder. **Cost:** ATOL annual fee + RateHawk per-booking cost + Duffel per-order fee

**Action 3.3: Hotelbeds commercial negotiation (Month 5–7)**
- With 50–200 bookings of history on RateHawk: approach Hotelbeds sales team for commercial terms
- Hotelbeds: 300K+ directly contracted properties, 80K bookings/day — adds inventory breadth beyond RateHawk's 2.5M aggregated properties
- Goal: dual supplier coverage (RateHawk for immediate access, Hotelbeds for European city break depth)
- TravelgateX (one GraphQL API → 1,000+ suppliers) as Phase 2 option to avoid multiple integrations
- **Owner:** Founder. **Cost:** Hotelbeds commercial negotiation — terms unknown, likely volume-based commitment required

**Action 3.4: Deal alert engine — Month 4**
- Price monitoring on destinations users have searched or bookmarked
- Alert trigger: "Porto just hit £240 for your May dates — 30% below the average you've seen"
- This is the between-booking engagement mechanic — HP exists in users' lives even when they're not actively planning
- Going.com model: 2M subscribers, $49/yr, 80%+ gross margin on subscription — deal alerts are the #1 retention driver
- **Owner:** Tech lead. **Cost:** RateHawk polling cost + notification infrastructure (minimal)

### Phase 4: Subscription + Scale (Month 6–18)

**Action 4.1: Premium subscription launch (Month 6–12)**
- £59.99/year for premium features: full preference graph, advanced deal alerts, portfolio analytics, price lock notifications
- Free tier: basic deal feed + city break booking; no preference graph persistence
- Conversion target: >25% of active users to paid (RevenueCat benchmark: 48.7% trial-to-paid for travel apps — research-5-revenue-models.md)
- At 1,000 active users and 25% conversion: £15,000/year subscription revenue
- **Owner:** Founder + Product lead. **Cost:** Minimal (feature-flag existing functionality)

**Action 4.2: January Sunshine Saturday campaign (December 2026 – January 2027)**
- 35% of annual UK ATOL bookings happen in a 4–6 week January window (discovery.md)
- By this point: deal alert email list, preference graphs built from 6+ months of data, ATOL-compliant dynamic packages live
- Campaign: "Start your travel year. Set your budget. Find your first deal." — portfolio frame activated for annual planning season
- Paid acquisition now justifiable: bed bank margins (£45–60/booking) can absorb £40–50 CAC at >1 ROAS
- **Owner:** Founder/Growth lead. **Cost:** £5,000–20,000 campaign budget (first paid acquisition spend)

**Action 4.3: B2B licensing assessment (Year 2–3)**
- Hopper HTS (Hopper Technology Solutions) = 75% of Hopper's $850M revenue — licences price prediction and fintech products to airlines and OTAs (research-5-revenue-models.md)
- HP analogue: licence the preference engine (semantic graph + recommendation engine) to UK travel brands lacking AI personalisation (Thomas Cook reboot, smaller UK OTAs, loyalty programmes)
- Assessment milestone: only viable once preference graph has 10K+ users with 3+ trip history
- **Owner:** Founder. **Cost:** Legal + commercial development; no technical cost if architecture is API-first

🟡 **Gap:** The B2B API path (Action 4.3) requires HP to have built a proprietary, demonstrably superior preference engine. At pre-revenue stage, this is an option value claim, not a plan. It should not be used to justify current investment or delay core consumer product execution.

---

## Coherence Test

Rumelt's test: do the actions reinforce each other, or could each one be executed independently without the others?

| Action | Depends on | Enables |
|---|---|---|
| Gate 1 messaging test | Nothing | User interviews (1.2); recruiting beta cohort (2.3) |
| User interviews | Gate 1 email list | Validates crux 1 (booking leakage) before build |
| ATOL application (Day 1) | Company registration | Dynamic packaging (3.2); removes the primary structural blocker |
| RateHawk sandbox (1.4) | Nothing | RateHawk production integration (3.1); validates unit economics |
| Content production (1.5) | Nothing | January 2027 organic traffic; deal alert list-building |
| NLP + preference graph v1 (2.1) | Gate 2 validation | Booking funnel (2.2); preference graph v2 (2.4) |
| Booking funnel v1 (2.2) | NLP v1; Duffel API | Beta cohort bookings (2.3); leakage tracking |
| Beta cohort (2.3) | Booking funnel | RateHawk commercial terms (3.1); preference graph data |
| RateHawk production (3.1) | Beta cohort history | Dynamic packages (3.2); margin activation |
| Dynamic packages (3.2) | ATOL + RateHawk production | Subscription launch (4.1); January campaign (4.2) |
| Subscription launch (4.1) | Active user base (500+) | Predictable revenue; B2B licensing assessment |
| January campaign (4.2) | ATOL + bed bank + content | First paid acquisition; annual retention test |

**Result: The actions are tightly coherent.** Executing them out of order breaks the model (e.g., launching subscription before you have 500 active users yields no revenue; running paid acquisition before bed bank margins are live destroys unit economics).

---

## What Good Strategy Rejects Here

The following are goals masquerading as strategy that this kernel explicitly rejects:

| Bad strategy element | Why it's bad strategy |
|---|---|
| "Become the UK's leading AI travel platform" | A goal, not a strategy. Does not address the crux |
| "Build the best personalisation engine" | A capability aspiration. Does not address the booking leakage trap |
| "Grow to 100K users in Year 1" | A target with no policy to achieve it. Does not rule anything out |
| "Partner with a major UK OTA" | A distribution dream with no specificity. Distracts from building direct channel |
| "Launch subscription from Day 1" | Premature. Going.com's ceiling shows subscription-only fails to capture booking economics |
| "Expand to Europe in Year 1" | Resource spread that weakens the UK moat before it is established |

---

## Rumelt's Crux Test

> "Good strategy works by focusing energy and resources on one or a very few pivotal objectives whose accomplishment will lead to a cascade of favourable outcomes." — Richard Rumelt

**HP's pivotal objective:** Own the booking funnel with bed bank margins before January 2027's Sunshine Saturday demand peak.

Everything else is secondary. If HP enters January 2027 with:
- ATOL in hand
- RateHawk producing £40–60/booking margins
- A deal alert list of 5,000+ subscribers
- A preference graph with 6+ months of user data
- Content ranking for city break deal queries

...then the January demand peak is capturable with limited paid spend, and the model is proven. If HP enters January 2027 with only an affiliate integration and a planning UI, it is repeating the Desti failure.

**Owner of the crux:** Founder. No delegation.

---

## Related Artefacts

- [[07-five-choices]] — Playing to Win five choices cascade
- [[06-blue-ocean]] — Strategy canvas: portfolio + personalisation as unoccupied space
- [[05-five-forces]] — Market attractiveness: 2.5/5, unattractive but profitable at scale
- [[12-decision-tree]] — 5 phase gates; kill at Gate 3 costs <£2,500
- [[13-phase-1-plan]] — Detailed Phase 1 actions and owners
- [[discovery]] — Full product concept, scores D8/V7/F8
- [[research-3-ai-travel]] — 12 platforms assessed; semantic preference graph confirmed as unoccupied
- [[research-5-revenue-models]] — LoveHolidays (28.8% EBITDA), Hopper ($850M), Going.com (80%+ margin)
- [[research-6-bed-banks]] — RateHawk (free API, no minimum), Hotelbeds, ATOL requirements

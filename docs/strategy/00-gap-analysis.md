# Gap Analysis Synthesis — Holiday Portfolio
## START HERE: Master Index for All 13 Strategy Artefacts

**Date:** 2026-02-28 (pivot update: 2026-03-01)
**Status:** Synthesis complete — Research Rounds 1–6 + 13 framework artefacts
**Confidence Scores:** D8 / V7 / F8
**Pivotal Objective:** Own the booking funnel with bed bank margins before January 2027 Sunshine Saturday

> This is the master orientation document. It is self-contained enough to understand the full strategic picture. For depth on any topic, follow the [[wiki-links]] to the relevant artefact.

---

## Strategy Pivot — 2026-03-01

> **This section supersedes the original gated validation framework (Gates 1-3) as the active execution plan. The original analysis is preserved below — it remains strategically valuable as reference material.**

### What happened

The original strategy called for a gated validation approach: three landing page variants, paid traffic test (~£500), user interviews, then build. Gate 1 was attempted, but the landing page was not usable for meaningful demand testing — it could not generate the kind of signal the gates were designed to capture.

### The pivot

Rather than iterate on landing page validation, the decision was made to **build a thin vertical slice of working capability for city breaks** and validate through real usage instead of proxy metrics. This is a deliberate strategic choice, not scope creep.

**Revised approach:**
- Build a live, working city break search product — NLP parsing, real Duffel flights, deal confidence scoring, pricing engine
- Put it in the hands of 10-20 friends as early testers
- Validate through real usage patterns and qualitative feedback, not landing page conversion rates
- Acceptable economics during friends testing: break-even or loss-making is fine — the goal is honest product feedback, not revenue

### Why this is strategically sound

The original gates existed to prevent wasted build spend. The pivot achieves the same risk-reduction goal through a different mechanism: instead of testing messaging before building, we build the thinnest possible working slice and test the product directly. This actually generates stronger signal — real usage data rather than landing page click-through rates.

The three cruxes identified in the original analysis (booking leakage, cold start paradox, affiliate cash flow trap) remain valid. The pivot addresses them differently: by getting a working product into real hands quickly, we get direct evidence on whether users would actually book through Roami vs defaulting to Skyscanner/Google Flights.

### New validation framework

| Stage | What | Success signal | Kill signal |
|-------|------|---------------|-------------|
| **Now** | Thin vertical slice — city break search with real flights, deal scoring, pricing engine | Working end-to-end | — |
| **Next** | Friends testing — 10-20 friends using the live product | Friends actually use it, come back, give specific feedback | Universal "I'd just use Skyscanner" with no differentiation identified |
| **Then** | Iterate based on real feedback → expand to hotels/booking flow | Friends say they'd book through it | No engagement after initial curiosity |

### Status of original gates

The original Gates 1-5 from [[12-decision-tree]] and the Month 0-1 validation phase from [[13-phase-1-plan]] are **no longer the active validation framework**. They are preserved as reference — the analysis behind them (booking leakage risk, cold start problem, unit economics) is still correct and informs current decisions. Future agents should not flag the absence of Gate 1 completion as a compliance gap.

---

## 1. Executive Summary

Holiday Portfolio is a UK travel personalisation engine entering an industry that is structurally unattractive for new entrants (Porter Five Forces: 2.5/5) but highly profitable for those who reach scale and loyalty. The core thesis is that combining a semantic preference graph with bed bank net rate economics produces unit economics that are viable at startup scale (breakeven at 800–1,200 users vs 2,500+ on affiliate-only), while filling a competitive whitespace that no current platform occupies: price-first NLP discovery with a visible, persistent preference graph, annual portfolio management, and ATOL-protected dynamic packaging built for UK consumers.

Thirteen framework artefacts — BMC Current and Target, Value Proposition Canvas, SWOT Confrontation Matrix, Five Forces, Blue Ocean, Playing to Win, Strategy Kernel, Wardley Map, Opportunity Trees, WWHTBT Conditions, Decision Tree, and Phase 1 Plan — converge on the same strategic reading. The idea is commercially sound and technically proven, the competitive whitespace is real and confirmed across 12 platforms, and the bed bank net rate model (RateHawk, Hotelbeds) fundamentally changes the economic calculus compared to affiliate-only operations. Mindtrip's $22.5M raise and TUI partnership validate the category without competing in the UK market as of February 2026.

However, the analysis surfaces three existential risks that every artefact flags in some form: booking leakage (the documented failure mode of 300+ planning startups), the cold start problem (preference graph has no value on Day 1), and the affiliate cash flow trap (the window between proving demand on affiliate economics and activating bed bank margins requires either external funding or ruthless runway management). These are not product risks — they are strategic cruxes that must be addressed before the model scales. The analysis also surfaces 8 critical data gaps, 20 important gaps, and 5 unresolved contradictions. The most urgent actions are: run Gate 1 messaging test this week (~£500), submit ATOL application on Day 1 (12-week lead time — every week of delay is a week without dynamic package margins), and complete RateHawk API sandbox evaluation (free, validates the entire unit economics model before committing to build spend).

---

## 2. Scores: D8 / V7 / F8

| Dimension | Score | One-Line Justification |
|-----------|-------|------------------------|
| **Desirability** | **8/10** | 44% of UK consumers cite personalisation as #1 pain; 61% YoY AI travel adoption growth; confirmed competitive whitespace across 12 platforms; 81% product-market fit score on primary segment. Penalised 2 points because no primary research has been done yet — all signals are survey-derived, not user-tested. |
| **Viability** | **7/10** | Bed bank net rates (RateHawk: free API, no minimum volume, 20–30% below retail) enable £45–60/booking vs £13 affiliate-only; breakeven at 800–1,200 users; LoveHolidays model (28.8% EBITDA, 9.9% take rate on £2.9B GTV) is the proven template at scale. Penalised 3 points because unit economics are modelled but unvalidated with real bookings, and the affiliate cash flow trap creates a dangerous window before bed bank margins activate. |
| **Feasibility** | **8/10** | Stack is buildable within £50–100K using commodity infrastructure (Claude Haiku/GPT-4o mini, pgvector, Duffel, RateHawk REST API); end-to-end latency under 3 seconds verified; precedents confirmed (Spotify, Netflix, Expedia architectures). Penalised 2 points because RateHawk sandbox not yet evaluated and cold-start preference graph quality unverified against real users. |

---

## 3. Concrete Data Inventory

What we KNOW — evidence-backed data points only. **39 confirmed data points across 5 categories.**

### Market Data

| Data Point | Value | Source Artefact |
|------------|-------|-----------------|
| UK outbound travel market size | £98B+ / 94.6M overseas trips in 2024 | [[01-bmc-current]], [[discovery]] |
| UK AI travel platform adoption growth | 61% YoY (2024→2025) | [[04-swot-confrontation]], [[05-five-forces]], [[06-blue-ocean]] |
| AI travel adoption among 18–34s | 183% YoY | [[04-swot-confrontation]], [[05-five-forces]] |
| UK consumers citing personalisation as #1 pain | 44% | [[03-value-proposition-canvas]], [[04-swot-confrontation]], [[05-five-forces]], [[06-blue-ocean]] |
| UK 25–34s frustrated by lack of personalisation | 52% | [[03-value-proposition-canvas]], [[05-five-forces]] |
| UK consumers frustrated by filtering irrelevant options | 37% | [[03-value-proposition-canvas]], [[05-five-forces]] |
| Average research time per trip | 303 minutes (Expedia, n=5,713) | [[01-bmc-current]], [[03-value-proposition-canvas]], [[05-five-forces]] |
| ATOL bookings in January 2025 (Sunshine Saturday) | 4.3M | [[01-bmc-current]], [[04-swot-confrontation]], [[05-five-forces]] |
| Annual bookings concentration in January window | 35% of annual bookings in 4–6 weeks | [[08-strategy-kernel]], [[04-swot-confrontation]] |
| UK 16–24s with 3+ trips booked simultaneously | 14% | [[01-bmc-current]], [[03-value-proposition-canvas]], [[11-wwhtbt-conditions]] |
| UK adults with 2+ international trips booked for following year | 20% | [[01-bmc-current]], [[03-value-proposition-canvas]], [[07-five-choices]] |
| Travel agent usage among UK 18–24s | Doubled: 26% → 48% | [[01-bmc-current]], [[03-value-proposition-canvas]], [[05-five-forces]] |
| High-income households using travel agents | 53% | [[01-bmc-current]], [[03-value-proposition-canvas]], [[05-five-forces]] |
| UK travellers preferring spontaneous travel decisions | 78% | [[03-value-proposition-canvas]], [[05-five-forces]], [[11-wwhtbt-conditions]] |

### Competitor Data

| Data Point | Value | Source Artefact |
|------------|-------|-----------------|
| Mindtrip total funding | $22.5M (Amex Ventures, Capital One Ventures, United Airlines Ventures, Forerunner) | [[01-bmc-current]], [[04-swot-confrontation]], [[05-five-forces]] |
| Mindtrip UK presence | None — TUI partnership covers BE/DE/IE/NL only (not UK) as of Feb 2026 | [[01-bmc-current]], [[06-blue-ocean]], [[07-five-choices]] |
| Layla AI funding and revenue | €3M seed; $2.8M revenue (Oct 2025) | [[05-five-forces]] |
| Expedia Q3 2025 gross bookings | $30.7B; operating margin expanded 18.8% → 23.5% with AI | [[05-five-forces]] |
| LoveHolidays revenue and margin | £288M revenue, £83M EBITDA (28.8% margin), 9.9% take rate on £2.9B GTV | [[01-bmc-current]], [[02-bmc-target]], [[05-five-forces]] |
| On The Beach margin per booking | £209 / 29% EBITDA margin | [[01-bmc-current]], [[05-five-forces]] |
| Hopper revenue and fintech mix | $850M revenue, 70% from fintech; 60%+ fintech attach rate | [[01-bmc-current]], [[04-swot-confrontation]], [[05-five-forces]] |
| Going.com subscribers and model | 2M+ subscribers, $49/yr, 80%+ gross margin | [[01-bmc-current]], [[04-swot-confrontation]], [[05-five-forces]] |
| Secret Escapes margin reality | £170M revenue, £1.6M operating profit (£523.8M gross bookings) | [[04-swot-confrontation]], [[05-five-forces]] |
| Travel startup funding level | $5.8B in 2024 (10-year low); Q1 2025 under $1B (−40% YoY) | [[04-swot-confrontation]], [[05-five-forces]] |
| AI-native travel platforms with UK presence | Zero (all US-headquartered) | [[04-swot-confrontation]], [[06-blue-ocean]], [[07-five-choices]] |

### Technical Data

| Data Point | Value | Source Artefact |
|------------|-------|-----------------|
| NLP parsing latency (Claude Haiku / GPT-4o mini) | <600ms; ~£0.006/user/month | [[01-bmc-current]], [[09-wardley-map]], [[11-wwhtbt-conditions]] |
| End-to-end recommendation latency | ~2,350ms (NLP 600ms + preference 50ms + candidate gen 100ms + live pricing 1,500ms + ranking 100ms) | [[09-wardley-map]], [[discovery]] |
| AI infrastructure cost at 1K users | ~£46/month | [[01-bmc-current]], [[09-wardley-map]], [[discovery]] |
| AI infrastructure cost at 10K users | ~£190/month | [[01-bmc-current]], [[09-wardley-map]], [[discovery]] |
| Vector DB cost at 100K users | ~£150/month (pgvector/Qdrant) | [[01-bmc-current]], [[09-wardley-map]] |
| Estimated total build cost | £50–100K | [[01-bmc-current]], [[09-wardley-map]], [[discovery]] |
| Duffel API pricing | $3/confirmed order + 1% managed content | [[01-bmc-current]], [[09-wardley-map]], [[discovery]] |

### Revenue and Unit Economics Data

| Data Point | Value | Source Artefact |
|------------|-------|-----------------|
| Affiliate-only revenue per booking | £13 (£8 hotel affiliate + ~£5 Duffel) | [[01-bmc-current]], [[05-five-forces]], [[09-wardley-map]] |
| Bed bank revenue per booking | £45 (buy £160 net, sell £200 at 25% markup + £5 flight) | [[01-bmc-current]], [[05-five-forces]], [[09-wardley-map]] |
| Dynamic package revenue per booking | £50–60 | [[01-bmc-current]], [[02-bmc-target]], [[05-five-forces]] |
| Bed bank vs affiliate revenue multiplier | 2–3x | [[04-swot-confrontation]], [[09-wardley-map]] |
| Breakeven users (bed bank model) | 800–1,200 | [[01-bmc-current]], [[02-bmc-target]], [[11-wwhtbt-conditions]] |
| Breakeven users (affiliate-only model) | 2,500+ | [[01-bmc-current]], [[11-wwhtbt-conditions]] |
| 48.7% trial-to-paid conversion benchmark | Travel apps (RevenueCat) | [[01-bmc-current]], [[04-swot-confrontation]] |
| Travel subscription annual churn | ~45% (55% retention) | [[02-bmc-target]], [[11-wwhtbt-conditions]] |

### Regulatory and Compliance Data

| Data Point | Value | Source Artefact |
|------------|-------|-----------------|
| ATOL Small Business cost | ~£2,700–4,700 all-in (~12 weeks processing) | [[01-bmc-current]], [[05-five-forces]], [[09-wardley-map]] |
| ABTOT franchise ATOL cost | ~£942 (faster bridge option) | [[01-bmc-current]], [[04-swot-confrontation]], [[09-wardley-map]] |
| High-risk payment processing rate | 3.5–6% per transaction (vs 1.5–2.9% standard) | [[01-bmc-current]], [[05-five-forces]] |
| Payment rolling reserve | 5–15% of card deposits held 6–12 months | [[01-bmc-current]], [[05-five-forces]] |
| Travel chargeback rate | 0.89% (816% increase 2023–2024); Visa threshold 0.65% | [[01-bmc-current]], [[04-swot-confrontation]] |
| FCA authorisation timeline (fintech) | 6–18 months — criminal offence to operate without | [[01-bmc-current]], [[05-five-forces]] |

---

## 4. Critical Gaps — 🔴 Blocks Decision, Must Fill Before Proceeding

Collected and deduplicated from all 13 artefacts. **8 critical gaps.**

### CG-01: Gate 1 Messaging Test — NOT YET RUN
**What's missing:** No demand signal exists. Three landing page variants (city break deal / portfolio planning / personalised deal feed) must be tested before any platform build begins. Without this, all downstream investment decisions are based on assumption.
**Kill threshold:** <1% conversion across all variants. Go threshold: >3% signup, >100 email addresses.
**Owner:** Founder
**Effort:** ~£500, 1–2 weeks
**Cited in:** [[04-swot-confrontation]] G1, [[08-strategy-kernel]] Action 1.1, [[12-decision-tree]] Gate 1, [[13-phase-1-plan]] Month 0–1

### CG-02: User Interviews — NOT YET DONE (8–10 Interviews Required)
**What's missing:** No primary qualitative research with actual target users (3+ trips/year, self-serve UK travellers). All desirability evidence is survey-derived or analogue-based. Interviews must probe: do users plan on one platform and book elsewhere? Would they pay more for deal confidence? Do they want portfolio tracking or just deals?
**Kill threshold:** >6/10 interviews show no reason to switch from Booking.com.
**Owner:** Founder / CMO
**Effort:** ~£500 (incentives), 2–4 weeks
**Cited in:** [[01-bmc-current]] GAP-02, [[03-value-proposition-canvas]] A-S1, [[04-swot-confrontation]] G1, [[12-decision-tree]] Gate 2, [[13-phase-1-plan]]

### CG-03: RateHawk API Sandbox Evaluation — NOT YET DONE
**What's missing:** The entire bed bank revenue model depends on RateHawk net rates being commercially viable for HP's target destinations (southern European city breaks: Barcelona, Lisbon, Porto, Amsterdam, Rome). Rate parity rules may constrain markup. Content quality relative to Booking.com is unconfirmed. 4–6 week integration estimate is unvalidated.
**Kill threshold:** Net-to-retail gap <15% on representative inventory (below viable margin). Integration complexity requires >8 weeks.
**Owner:** CTO
**Effort:** £0 (free API), 1–2 engineer weeks
**Cited in:** [[01-bmc-current]] GAP-10, [[04-swot-confrontation]] G2, [[08-strategy-kernel]] Action 1.4, [[09-wardley-map]], [[11-wwhtbt-conditions]] F3, [[12-decision-tree]] Gate 3

### CG-04: ATOL Application — NOT YET FILED (DAY 1 REQUIREMENT)
**What's missing:** ATOL is the legal unlock for dynamic packaging (the primary margin model). 12-week processing time means every week of delay is a week without £50–60/booking revenue. Without ATOL, HP is confined to affiliate economics (£13/booking) during the affiliate bridge period with no structural defence against leakage.
**Blocking:** Cannot legally sell flight+hotel packages to UK consumers without ATOL. Criminal liability.
**Owner:** Founder (non-delegatable)
**Effort:** £942 (ABTOT bridge) + £2,700–4,700 (Small Business ATOL)
**Cited in:** [[01-bmc-current]] W4, [[04-swot-confrontation]] G6, [[07-five-choices]] Capability 6, [[08-strategy-kernel]] Action 1.3, [[09-wardley-map]], [[11-wwhtbt-conditions]] V4, [[12-decision-tree]] Gate 5

### CG-05: Full Burn Rate and 18-Month Financial Model — NOT BUILT
**What's missing:** No monthly burn rate, no runway calculation, no salary costs for CTO or other early hires, no fundraising target. Working capital impact of rolling payment reserve (5–15% of booking value unavailable for 6–12 months) is unmodelled. No investor-ready unit economics model.
**Blocking:** Cannot have an investor conversation. Cannot make hiring decisions. Cannot determine whether affiliate bridge period is survivable.
**Owner:** CFO / Founder
**Cited in:** [[01-bmc-current]] GAP-11, [[02-bmc-target]] GAP-20, [[07-five-choices]], [[12-decision-tree]]

### CG-06: Payment Processor Selection — NOT COMPLETED
**What's missing:** Travel is classified high-risk automatically. No payment processor selected. Rolling reserve terms unknown. Without a processor willing to accept a travel merchant with no booking history, HP cannot take customer payments.
**Blocking:** Cannot accept bookings without a payment processor.
**Owner:** CFO / Founder
**Cited in:** [[01-bmc-current]] GAP-06, [[05-five-forces]], [[11-wwhtbt-conditions]]

### CG-07: Cold Start UX — NOT DESIGNED OR TESTED
**What's missing:** The preference graph has no value on Day 1. The designed mitigations (onboarding conversation + archetype priors + taste calibration swipe) have never been tested against real users. If first-session recommendations feel generic, users leave before the preference flywheel starts.
**Kill threshold:** <4/5 Likert score on "does this feel like it understands your travel style?" in onboarding prototype test.
**Owner:** CTO / Founder
**Cited in:** [[01-bmc-current]] GAP-09, [[04-swot-confrontation]] G3, [[06-blue-ocean]], [[09-wardley-map]], [[11-wwhtbt-conditions]] F2, [[12-decision-tree]] Gate 3

### CG-08: Team Structure — NOT DEFINED
**What's missing:** No CTO hired, no CMO hired, no CFO/finance function. No equity structure defined. No minimum viable team specification. Solo founder cannot simultaneously build the product, file ATOL, negotiate with RateHawk/Duffel, manage compliance, and acquire users.
**Blocking:** Build cannot start without CTO. Growth cannot start without CMO or equivalent.
**Owner:** Founder
**Cited in:** [[01-bmc-current]] GAP-08, [[04-swot-confrontation]] W5, [[07-five-choices]], [[13-phase-1-plan]]

---

## 5. Important Gaps — 🟡 De-Risks Execution, Should Fill

Collected and deduplicated from all 13 artefacts. **20 important gaps**, prioritised by execution risk.

### High Priority (affects near-term decisions)

| ID | Gap | Owner | When Needed | Cited In |
|----|-----|-------|-------------|---------|
| IG-01 | TAM/SAM/SOM sizing for "3+ trips/year self-serve UK travellers" — no sub-segment model built | Founder | Before Seed raise | [[01-bmc-current]] GAP-01 |
| IG-02 | Booking leakage measurement — no defined metric, no instrumentation plan | CTO / Founder | Day 1 of MVP | [[04-swot-confrontation]] G4, [[08-strategy-kernel]], [[11-wwhtbt-conditions]] D4 |
| IG-03 | Booking conversion rate target — no defined threshold for "is the booking funnel working?" | CTO / Founder | Gate 4 | [[12-decision-tree]], [[07-five-choices]] |
| IG-04 | Value proposition A/B test — which USP (city break deal / portfolio / personalised feed) converts as acquisition hook | CMO / Founder | Gate 1 | [[01-bmc-current]] GAP-03, [[03-value-proposition-canvas]] A-G1 |
| IG-05 | Agent demand diagnosis — is agent usage among 18–24s relationship-driven or outcome-driven? If relationship-driven, HP cannot substitute. | CMO / CPO | Before messaging lock | [[05-five-forces]], [[03-value-proposition-canvas]] |
| IG-06 | Duffel commercial terms — PM has a contact at Duffel. Relationship not yet activated. Fee sensitivity at +50%/+100% unmodelled. | Founder / CTO | Month 1 | [[05-five-forces]], [[09-wardley-map]] |
| IG-07 | ATOL share capital requirement — Small Business ATOL may require £30,000 share capital. Unverified against current CAA guidance. | Founder / Legal | Before ATOL application | [[09-wardley-map]] |
| IG-08 | Hotelbeds minimum volume and production access threshold | Founder / CTO | Month 3–6 | [[01-bmc-current]] GAP-10, [[05-five-forces]], [[09-wardley-map]] |
| IG-09 | Expedia Romie monitoring protocol — Romie is "the incumbent most likely to close the preference graph gap." No monitoring system exists. | Founder | Ongoing from now | [[04-swot-confrontation]] G7, [[05-five-forces]], [[06-blue-ocean]], [[07-five-choices]] |
| IG-10 | Mindtrip UK expansion monitoring — TUI UK is a natural next step from existing TUI partnerships | Founder | Ongoing from now | [[02-bmc-target]] GAP-14, [[07-five-choices]] |

### Medium Priority (affects Month 3–12 execution)

| ID | Gap | Owner | When Needed | Cited In |
|----|-----|-------|-------------|---------|
| IG-11 | Subscription price validation — £59.99/yr is assumed from Going.com analogue. No UK price sensitivity data. | CMO / Founder | Month 6 (before subscription launch) | [[01-bmc-current]] GAP-07 |
| IG-12 | Subscription churn model — industry benchmark is 45% annual churn. HP's model assumes >65% retention. Unvalidated. | CMO / CFO | Month 6 | [[02-bmc-target]] GAP-17 |
| IG-13 | FCA authorisation timeline — pre-application not started. Price Lock / Portfolio Protect blocked. | Founder / CFO | Month 9–12 | [[01-bmc-current]], [[02-bmc-target]] GAP-18 |
| IG-14 | GDPR and preference graph data policy — right to be forgotten destroys preference graph. No legal review. | Founder / CTO | Pre-launch | [[02-bmc-target]] GAP-19 |
| IG-15 | SEO content strategy — no keyword research, no content calendar, organic is the primary acquisition channel | CMO | Month 1 (must start immediately for January 2027 SEO authority) | [[02-bmc-target]] GAP-15, [[08-strategy-kernel]] Action 1.5 |
| IG-16 | Referral / viral mechanic design — deal alerts and portfolio sharing could be viral hooks but mechanics not specified | CTO / CMO | Month 3–6 | [[01-bmc-current]] GAP-04 |
| IG-17 | Customer support model — who handles missed flights, cancellations, ATOL claims? | Founder / CFO | Pre-ATOL application | [[01-bmc-current]] GAP-05 |
| IG-18 | Fundraising strategy — no amount, structure, or timeline. £50–100K build budget + 12–18 months to breakeven likely requires £200–400K total capital. | Founder / CFO | Before any investor conversation | [[02-bmc-target]] GAP-20 |
| IG-19 | Preference graph schema design — specific dimensions and taxonomies not formally specified. Schema changes are expensive once data accumulates. | CTO | Month 1 (Day 1 architectural decision) | [[09-wardley-map]] |
| IG-20 | NLP accuracy benchmark — 85%+ intent extraction accuracy on representative query set not yet measured | CTO | Gate 3 (prototype) | [[11-wwhtbt-conditions]] F1 |

---

## 6. Contradictions — Conflicting Data Across Artefacts

**5 unresolved contradictions and 3 resolved contradictions.** Unresolved contradictions require explicit decisions before build begins.

### Unresolved Contradictions (require explicit decisions)

#### CONTRADICTION-A: Affiliate Day 1 vs Booking Leakage Risk
**Conflict:** The affiliate bridge model (Day 1 revenue while ATOL processes) requires sending users to Booking.com for the hotel booking. This is structurally identical to the Desti failure mode — users plan on HP, book on Booking.com, never return. The affiliate bridge is necessary for demand validation but creates exactly the leakage risk the model is trying to prevent.
**Artefacts in conflict:** [[01-bmc-current]] (affiliate Day 1 is planned), [[04-swot-confrontation]] (Desti failure mode is CRITICAL), [[08-strategy-kernel]] (Policy A and Policy E are in direct tension during ATOL window), [[11-wwhtbt-conditions]] D4 (D4 is rated UNLIKELY — the #1 kill condition)
**Decision needed:** Either (a) accept affiliate bridge as deliberate demand validation with explicit leakage measurement from Day 1 (kill signal: >50% leakage), or (b) skip affiliate phase entirely and build RateHawk integration first (slower launch, better economics, lower leakage risk).
**Owner:** Founder / CTO

#### CONTRADICTION-B: Organic Growth Dependency vs January Sunshine Saturday Timing
**Conflict:** Organic content and SEO are the primary acquisition strategy (Policy C in Strategy Kernel). But organic SEO takes 6–12 months to build ranking authority. If HP launches in Q3 2026, it may miss the January 2027 Sunshine Saturday window (35% of annual bookings in 4–6 weeks). Missing January 2027 means waiting until January 2028.
**Artefacts in conflict:** [[07-five-choices]] (organic-first strategy), [[08-strategy-kernel]] (January 2027 as pivotal objective)
**Decision needed:** Content production must begin Month 1 to have any SEO authority by January 2027. Deal alert email list is the faster organic channel — build this first regardless of product readiness.
**Owner:** Founder / CMO

#### CONTRADICTION-C: Duffel Stays vs RateHawk Hotel Model
**Conflict:** Duffel Stays (hotels via Duffel) offers a single API integration (faster MVP) but uses commission-share model with undisclosed commission percentage and no pricing control. RateHawk provides net rate model with 2–3x better margins but requires separate API integration. The previous version of the Wardley Map recommended Duffel Stays — this has been corrected in [[09-wardley-map]] but the architectural decision must be made explicit.
**Artefacts in conflict:** [[01-bmc-current]] CONTRADICTION-03, [[09-wardley-map]] (corrected to RateHawk)
**Resolution:** RateHawk is the correct choice — net rate model is the economic foundation. Duffel Stays is architecturally simpler but commercially a dead end. At 500 bookings: RateHawk generates ~£22,500 vs Duffel Stays ~£6,500 (estimated).
**Status:** Resolved in principle — needs implementation commitment from CTO.
**Owner:** CTO / Founder

#### CONTRADICTION-D: Subscription Trust vs Commission Revenue
**Conflict:** Subscription model builds trust (user pays HP directly). Commission model creates potential conflict (HP earns more if user books higher-commission options). At startup scale, one perceived commercially-motivated recommendation could destroy subscription trust.
**Artefacts in conflict:** [[01-bmc-current]] CONTRADICTION-02, [[02-bmc-target]] CONTRADICTION-04, [[11-wwhtbt-conditions]] D3
**Decision needed:** Explicit product principle — HP always recommends the best-value option for the user's preference + budget. Markup applied to package price, not used to steer recommendations. Must be documented as a product principle, not just a comms message.
**Owner:** Founder (product principle) + CMO (communications)

#### CONTRADICTION-E: TravelgateX Aggregator vs Direct Integration
**Conflict:** TravelgateX provides one GraphQL API → 1,000+ suppliers (faster multi-supplier access) but charges connectivity fees that may not be justified at 800–1,200 user scale. Direct RateHawk + Hotelbeds gives more control and better commercial terms but requires managing two APIs.
**Artefacts in conflict:** [[02-bmc-target]] CONTRADICTION-05, [[09-wardley-map]], [[05-five-forces]]
**Decision rule:** Start direct (RateHawk). Use TravelgateX only if accessing 3+ suppliers simultaneously and integration cost exceeds TravelgateX fees.
**Status:** Resolved in principle. Not a Day 1 decision.
**Owner:** CTO / CFO

### Resolved Contradictions (documented for completeness)

| ID | Contradiction | Resolution |
|----|--------------|------------|
| RC-01 | 78% spontaneous travel preference vs portfolio planning product | City break hook resolves this: user enters via single trip; portfolio emerges through use, not pitch. Do not lead with "annual planning." |
| RC-02 | Deal-seeking segment pays for travel agents (premium) while also being price-sensitive | Tension is confidence vs. effort, not price vs. quality. Messaging for Segment B should lead with confidence and reassurance, not lowest price. |
| RC-03 | Paid CAC (£80–200+) vs organic-first imperative | No paid acquisition until bed bank margins live + 100 bookings + LTV validated. Paid acquisition trigger is an explicit rule. |

---

## 7. Owner Assignments

All gaps and actions assigned to a responsible stakeholder.

| Gap / Action | Founder | CTO | CMO | CFO |
|-------------|---------|-----|-----|-----|
| Gate 1 messaging test (CG-01) | PRIMARY | | supporting | |
| User interviews (CG-02) | PRIMARY | | supporting | |
| RateHawk sandbox (CG-03) | | PRIMARY | | |
| ATOL application (CG-04) | PRIMARY | | | supporting |
| Burn rate model (CG-05) | supporting | | | PRIMARY |
| Payment processor (CG-06) | supporting | | | PRIMARY |
| Cold start UX (CG-07) | supporting | PRIMARY | | |
| Team structure / equity (CG-08) | PRIMARY | | | |
| TAM/SAM/SOM model (IG-01) | PRIMARY | | | |
| Leakage measurement (IG-02) | supporting | PRIMARY | | |
| Booking conversion target (IG-03) | supporting | PRIMARY | | |
| Value proposition A/B test (IG-04) | supporting | | PRIMARY | |
| Agent demand diagnosis (IG-05) | supporting | | PRIMARY | |
| Duffel relationship activation (IG-06) | PRIMARY | supporting | | |
| ATOL share capital verification (IG-07) | PRIMARY | | | supporting |
| Hotelbeds commercial exploration (IG-08) | PRIMARY | supporting | | |
| Romie monitoring (IG-09) | PRIMARY | | | |
| Mindtrip UK monitoring (IG-10) | PRIMARY | | | |
| Subscription price validation (IG-11) | supporting | | PRIMARY | |
| Subscription churn model (IG-12) | | | supporting | PRIMARY |
| FCA pre-application (IG-13) | supporting | | | PRIMARY |
| GDPR / preference graph policy (IG-14) | PRIMARY | supporting | | |
| SEO content strategy (IG-15) | | | PRIMARY | |
| Referral mechanic design (IG-16) | | supporting | PRIMARY | |
| Customer support model (IG-17) | PRIMARY | | | supporting |
| Fundraising strategy (IG-18) | PRIMARY | | | supporting |
| Preference graph schema (IG-19) | | PRIMARY | | |
| NLP accuracy benchmark (IG-20) | | PRIMARY | | |

---

## 8. The Three Cruxes

From [[08-strategy-kernel]] — these are the specific hardest parts of the challenge that the entire strategy is designed to address. Not product risks. Existential structural challenges.

### Crux 1: The Booking Leakage Trap

300+ travel planning startups have failed at exactly the point HP is entering. The failure mode is consistent: users plan on the new platform and book on Booking.com. Desti (built by the Siri/SRI team) is the canonical example — users loved the product, booked elsewhere. The planning layer generates zero revenue unless HP owns the full booking funnel.

The WWHTBT assessment rates D4 (users must NOT leak bookings to Booking.com) as UNLIKELY — the only condition rated UNLIKELY across all 11 assessed. This is the #1 kill condition in the analysis.

The structural defence: dynamic packaging (Duffel flight + RateHawk hotel assembled as one ATOL package) creates an offer that Booking.com literally cannot match — they do not sell flights. ATOL protection on packages is a genuine trust signal. But this defence only works once ATOL and dynamic packaging are live. During the affiliate-only bridge period, there is no structural defence against leakage.

Measurement from Day 1: instrument booking completion rate vs drop-off to external OTAs. Kill signal: >50% leakage in Month 1–3.

### Crux 2: The Cold Start + Organic Growth Paradox

The preference graph is HP's primary differentiator and primary moat. But the graph has no value on Day 1 — it requires data to learn. And the organic growth strategy (content/SEO, deal alert list-building) required to acquire users at low CAC takes 6–12 months to yield traffic, while January Sunshine Saturday (35% of annual bookings in a 4–6 week window) represents the primary annual demand concentration. HP must build distribution before it has a compelling product, and build a compelling product before it can demonstrate the value of its distribution.

The designed resolution: cold start mitigations (onboarding conversation + archetype priors + taste calibration swipe) seed the preference graph before any booking history exists. Deal alert email list is the fastest organic channel — can be built before the product is live. Content production begins Month 1 for January 2027 SEO authority.

Critical dependency: both mitigations are designed but unvalidated. CG-07 (cold start UX test) and IG-15 (SEO content strategy) must be addressed in Month 1.

### Crux 3: The Affiliate Cash Flow Trap

The path to bed bank margins requires ATOL (12 weeks minimum). The path to ATOL requires operating as an affiliate first (no package sales without ATOL). Affiliate economics yield £8–13/booking. At 100 bookings/month, that is £800–1,300 revenue — insufficient to cover development costs, ATOL fees, or content production. The window between "proving demand" (affiliate) and "activating margin" (bed bank + ATOL) requires either external funding or aggressive runway management.

The designed resolution: apply for ABTOT franchise ATOL on Day 1 (~£942, faster than Small Business ATOL). This shortens the affiliate-only window from potentially 6+ months to 3–4 months. Maintain lean operations during the affiliate bridge — no paid acquisition, no hires beyond CTO, no material capex until bed bank margins are live.

Critical dependency: CG-05 (burn rate model) must be built to determine whether the affiliate bridge period is survivable on founder capital or requires external funding immediately.

---

## 9. Pivotal Objective

> **"Own the booking funnel with bed bank margins before January 2027's Sunshine Saturday demand peak."**

Source: [[08-strategy-kernel]] — Rumelt's Crux Test

Everything else is secondary. If HP enters January 2027 with ATOL in hand, RateHawk producing £40–60/booking margins, a deal alert email list of 5,000+ subscribers, a preference graph with 6+ months of user data, and content ranking for city break deal queries — the January demand peak is capturable with limited paid spend, and the model is proven. If HP enters January 2027 with only an affiliate integration and a planning UI, it is repeating the Desti failure.

Backwards planning from January 2027:
- ATOL must be filed by Month 0–1 (today) to have it by Month 3–4
- RateHawk integration must be live by Month 3–4 to have booking history before January 2027
- Deal alert list must start building now (no product required — just email capture)
- Content production must begin now (6–12 months to SEO authority)
- Gate 1 must happen this week

---

## 10. Next Steps — Gate 1 Actions (Week 1–2)

These actions must be completed before any significant platform build begins. Total cost: ~£1,500–2,500.

### This Week (Day 1–7)

| Action | Owner | Cost | Output |
|--------|-------|------|--------|
| **Deploy Gate 1 messaging test** — 3 landing page variants: (a) city break deal feed, (b) portfolio planning + budget tracker, (c) personalised deal alerts. 500+ visitors per variant. | Founder | £500–1,500 | Winning variant identified; email list started; demand signal confirmed or killed |
| **Submit ABTOT franchise ATOL application** — £942, faster path than Small Business ATOL. 12-week clock must start now. | Founder | £942 | Dynamic packaging unlocked ~Month 3–4 |
| **Activate Duffel contact** — PM has a contact at Duffel. Initiate commercial and technical onboarding conversation. | Founder | £0 | Commercial terms confirmed; technical onboarding started |
| **Register for RateHawk sandbox** — free API access at ratehawk.com. No commitment required. | CTO | £0 | Sandbox credentials; 1-week spike can begin |

### Week 2–4

| Action | Owner | Cost | Output |
|--------|-------|------|--------|
| **Run 8–10 user interviews** — recruit from Gate 1 email list + founder network. Probe: fragmentation pain, booking leakage risk, deal confidence need, portfolio behaviour. | Founder / CMO | £0–500 | Kill signal identified or confirmed; messaging locked; Gate 2 passed or failed |
| **RateHawk API spike** — 1 engineer, 1 week: authentication, property search, rate lookup, mock booking. Validate integration complexity and rate parity constraints. | CTO | £0 | Go/no-go on 4–6 week bed bank integration estimate |
| **Begin financial model** — 18-month burn rate, 3 scenarios (bootstrapped / angel / Seed). Must include rolling reserve working capital impact. | CFO / Founder | £0–2,000 | Runway assessment; fundraising trigger defined |
| **Define preference graph schema v1** — which dimensions, which taxonomies. Day 1 architectural decision. Schema changes are expensive once data accumulates. | CTO | £0 | Foundational data architecture document |

### Month 1–2

| Action | Owner | Cost | Output |
|--------|-------|------|--------|
| **Start content production** — 20 city break destination guides targeting long-tail search. SEO authority takes 6–12 months. Must start now for January 2027. | CMO / Founder | £0–2,000/month | SEO pipeline for January 2027 |
| **Define leakage measurement** — instrument every "book now" click from Day 1. Define kill signal (>50% leakage) and intervention trigger. | CTO / Founder | £0 | Operational metric live from MVP launch |
| **Select payment processor** — get quotes from Stripe, WorldPay, and travel-specialist processors (PaySafe, Nuvei). Assess rolling reserve terms. | CFO / Founder | £0 (quotes) | Payment processor selected before MVP launch |
| **Initiate GDPR / data policy review** — lawful basis for processing, right to be forgotten implications, data retention policy. | Founder / CTO | £1,500–3,000 (legal) | Privacy policy ready for MVP launch |

---

## 11. Artefact Index

All 13 strategy artefacts with one-line summary.

| # | Artefact | One-Line Summary |
|---|----------|-----------------|
| 01 | [[01-bmc-current]] — Business Model Canvas (Current) | How the business creates and captures value at MVP launch: affiliate bridge → RateHawk → ATOL → dynamic packages. Contains 11 yellow gaps and 3 red contradictions. |
| 02 | [[02-bmc-target]] — Business Model Canvas (Target) | 18-month target state: dynamic packaging as primary revenue, RateHawk + Hotelbeds, subscription launched, preference graph personalised, ATOL active, 4–5 person team at breakeven. |
| 03 | [[03-value-proposition-canvas]] — Value Proposition Canvas | Customer-side reality (303-min research, deal anxiety, fragmentation) mapped against product-side (NLP, preference graph, deal confidence, portfolio). 81% PMF score on primary segment; 73% on secondary. |
| 04 | [[04-swot-confrontation]] — SWOT + Confrontation Matrix | 10 Strengths, 9 Weaknesses (leakage and cold start are CRITICAL), 10 Opportunities, 9 Threats (booking leakage and Google/Romie are HIGH). Full confrontation matrix with 4 strategic quadrants. |
| 05 | [[05-five-forces]] — Porter's Five Forces | Industry attractiveness: 2.5/5 — unattractive for new entrants but highly profitable at scale. Binary outcome: escape velocity or failure. Bed bank model changes the calculus. |
| 06 | [[06-blue-ocean]] — Blue Ocean Strategy | HP peaks where all competitors are flat: visible preference profile (5 vs 1), portfolio/budget tracking (5 vs 1), deal confidence scoring (5 vs 2), preference learning across trips (5 vs 1). These four factors are the blue ocean. |
| 07 | [[07-five-choices]] — Playing to Win | Five-choices cascade: win in UK annual travel cockpit via city break gateway, price-first personalisation, organic-led bed bank margins. Organic growth vs January seasonality is the primary coherence tension. |
| 08 | [[08-strategy-kernel]] — Strategy Kernel (Rumelt) | Three cruxes: booking leakage, cold start paradox, affiliate cash flow trap. Pivotal objective: own the booking funnel with bed bank margins before January 2027 Sunshine Saturday. |
| 09 | [[09-wardley-map]] — Wardley Map | Build: semantic preference graph (primary moat), portfolio view, deal confidence scoring. Buy: NLP (Claude Haiku), flights (Duffel), hotels (RateHawk). Corrected from original: Duffel Stays is a dead end — RateHawk net rate is the correct commercial model. |
| 10 | [[10-opportunity-trees]] — Opportunity Solution Trees | Five user opportunities (research fragmentation, deal trust deficit, year management, personalisation failure, booking fragmentation) mapped to solutions with evidence strength ratings and validation methods. |
| 11 | [[11-wwhtbt-conditions]] — WWHTBT Conditions | 11 conditions for the 1,000-user / breakeven hypothesis. One rated UNLIKELY (D4: booking leakage — the #1 kill condition). Four rated POSSIBLE with significant gaps. Three rated PROBABLE. |
| 12 | [[12-decision-tree]] — Decision Tree | 5 phase gates: Gate 1 (messaging, ~£500), Gate 2 (interviews, ~£1,000), Gate 3 (prototype, ~£2,500), Gate 4 (live MVP, ~£15,000), Gate 5 (bed bank + ATOL, ~£30,000). Total to scale decision: ~£49,000. Kill at Gate 3 costs <£4,000. |
| 13 | [[13-phase-1-plan]] — Phase 1 Execution Plan | 18-month roadmap across 6 phases: Validation (Month 0–1), Technical Foundation (Month 1–3), Bed Bank Integration (Month 3–5), Dynamic Packages (Month 5–8), Personalisation Engine (Month 8–12), Scale (Month 12–18). |

---

## Totals

- **Confirmed data points:** 39 (across market, competitor, technical, revenue, and regulatory categories)
- **Critical gaps:** 8 (blocks decision — must fill before proceeding)
- **Important gaps:** 20 (de-risks execution — should fill)
- **Unresolved contradictions:** 5 (A through E above; C and E have implicit resolutions)
- **Resolved contradictions:** 3 (RC-01 through RC-03)
- **WWHTBT conditions:** 11 total: 1 UNLIKELY, 6 POSSIBLE, 4 PROBABLE

---

## What Is Validated vs What Is Assumed

### Validated (evidence-backed)
- Competitive whitespace confirmed across 12 platforms (research-3-ai-travel.md)
- Bed bank net rate economics (RateHawk publicly documented; LoveHolidays proven model at scale)
- NLP parsing latency and cost (Claude Haiku benchmarks)
- Technical build cost estimate (£50–100K from research-4-tech-feasibility.md)
- ATOL cost and timeline (CAA documentation)
- Personalisation demand (survey data, UK AI travel adoption reports)
- Competitor funding and revenue (public financial records, press releases)
- Booking leakage failure pattern (documented post-mortems: Desti, TripIt, Google Trips, Culture Trip)

### Assumed (not yet tested with real users or market)
- Users will not leak bookings to Booking.com during affiliate phase (UNLIKELY by WWHTBT assessment — the #1 kill condition)
- City break hook converts to portfolio engagement and 3+ bookings/year
- Cold start mitigations (onboarding conversation + archetype priors) produce compelling first-session recommendations
- Organic content channels can build sufficient deal alert subscriber base before January 2027
- Subscription price of £59.99/yr will convert UK users (assumed from US Going.com analogue)
- Specific RateHawk net rates for HP's target destinations are commercially viable after rate parity constraints
- CAC will stay below £50 through organic channels (contradicted by sector data showing £80–200+ for new entrants with no brand)

---

*Generated by ProveIt agent | Holiday Portfolio discovery session | 2026-02-28*
*All 13 artefacts read in synthesis: 01-bmc-current, 02-bmc-target, 03-value-proposition-canvas, 04-swot-confrontation, 05-five-forces, 06-blue-ocean, 07-five-choices, 08-strategy-kernel, 09-wardley-map, 10-opportunity-trees, 11-wwhtbt-conditions, 12-decision-tree, 13-phase-1-plan*

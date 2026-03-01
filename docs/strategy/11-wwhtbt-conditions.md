# WWHTBT Conditions — Holiday Portfolio
**Framework:** What Would Have To Be True
**Date:** 2026-02-28
**Strategic Question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Hypothesis:** HP reaches 1,000 active users and breaks even within 18 months of launch.

---

## How to Read This Document

WWHTBT reverses the pitch instinct. Instead of arguing why the hypothesis is true, it surfaces the assumptions that must hold for it to be true — then rates each assumption by probability and flags the gaps most likely to kill it.

**Rating scale:**
- PROBABLE — strong supporting evidence, this assumption is loadbearing but low-risk
- POSSIBLE — directional evidence exists but direct validation is absent; testable before commitment
- UNLIKELY — evidence is weak, contradicted, or the assumption conflicts with documented failure modes

**Flag codes:**
- No flag — well-evidenced, carry the assumption
- 🟡 — gap in evidence; validate before scaling investment
- 🔴 — contradiction with documented evidence or precedent; treat as existential risk

**Owner assignments:** Each condition is assigned an owner role for accountability during Gate testing (see [[strategy/12-decision-tree]]).

---

## Unit Economics Basis

Before assessing conditions, the breakeven arithmetic must be explicit.

**Target:** 1,000 active users, breakeven at 18 months.

| Model | Revenue per booking | Bookings/user/year | Annual revenue/user |
|---|---|---|---|
| Affiliate only | £13 | 3 | £39 |
| Bed bank (20% hotel markup) | £45 | 3 | £135 |
| Bed bank + ancillaries | £55–65 | 3 | £165–195 |
| Dynamic package (post-ATOL) | £50–60 | 3 | £150–180 |

At 1,000 users on the bed bank model (base case):
- Annual gross revenue: ~£135,000–£195,000
- Small team cost base (2 people, cloud infra, compliance): ~£120,000–£160,000/year
- **Breakeven is reachable at 1,000 users — but only on bed bank net rates. Affiliate-only requires 3,500+ users.**

Source: [[research-6-bed-banks]], [[research-5-revenue-models]], [[discovery]]

---

## DESIRABILITY CONDITIONS

### D1 — Users must prefer NLP input over traditional search

**Condition:** A meaningful share of target users (tech-savvy, 3+ trips/year) find NLP trip input ("long weekend somewhere warm, under £400, good food scene") more useful than destination box + date picker + filters.

**Rating: POSSIBLE**

**Evidence FOR:**
- 44% of UK consumers cite lack of personalisation as the #1 travel planning pain point (Expedia/MMGY research cited in [[discovery]])
- 52% of 25-34s specifically frustrated by lack of personalisation
- 61% YoY growth in UK AI travel usage (discovery.md — original Expedia research, n=5,713)
- Mindtrip ($22.5M raised) has deployed NLP travel input with TUI booking integration — proves product-market fit for the mechanic at a funded scale

**Evidence AGAINST / GAPS:**
- 🟡 No direct validation that HP's specific target users (frequent, self-serve UK travellers) prefer NLP over filters — the 44% figure is broad UK consumer data, not segmented to 3+ trips/year
- 🟡 NLP input is now table stakes: Booking.com, Mindtrip, Google all offer it. The question is not "does NLP beat filters?" but "does HP's personalised NLP beat incumbents' generic NLP?" — this is not evidenced
- 🟡 Preference for NLP does not guarantee booking through HP. Users may use NLP for discovery and book on Booking.com (see D4)

**What would have to be true:**
Users must find HP's NLP meaningfully better than Booking.com's AI search — not merely equivalent. The preference must be strong enough to overcome the default habit of booking on an established platform.

**Validation method:** Landing page A/B test — NLP query interface vs filter search. Measure session depth and email conversion. 8-10 user interviews probing current search behaviour. Gate 1 test, 4 weeks, near-zero cost.

**Owner:** Product / Founder

---

### D2 — City break hook must convert to portfolio engagement

**Condition:** Users who arrive via a city break deal hook (low stakes, £300-500, fast booking cycle) return to explore the portfolio view and make repeat use of preference features — not just one-and-done.

**Rating: POSSIBLE**

**Evidence FOR:**
- 14% of 16-24s currently have 3+ trips booked simultaneously — demonstrating the portfolio behaviour exists in the population (discovery.md)
- 20% of UK adults had 2+ international trips booked for the following year (discovery.md)
- Sunshine Saturday: 4.3M ATOL bookings in a single January week — concentrated demand that HP can intercept and extend
- TripIt (20M users) validates that people DO want trip organisation across multiple bookings — even if TripIt never monetised it effectively ([[research-5-revenue-risks]])
- City break is the right entry vector: low commitment, familiar action, fast trust cycle. Established pattern from [[strategy/06-blue-ocean]] and [[strategy/07-five-choices]]

**Evidence AGAINST / GAPS:**
- 🟡 The 14% figure is about simultaneous bookings, not about using a single platform to manage them. Portfolio behaviour exists; HP-mediated portfolio behaviour is untested
- 🟡 No evidence that a city break booking triggers portfolio exploration. Could equally be a one-off transaction that doesn't produce return visits
- 🟡 78% of travellers prefer spontaneous travel (discovery.md) — this is resolved by the city break hook framing, but the hook-to-portfolio conversion step remains unvalidated

**What would have to be true:**
The first city break booking must create enough satisfaction + curiosity about HP's portfolio features that users return within 30 days — independent of a second booking intent. The portfolio view must be compelling on day one, not just after 6 months of use.

**Validation method:** Beta cohort. Track D7/D30 return visits from users who completed a booking. Specifically instrument portfolio view and preference profile page visits. Measure whether portfolio page is opened within 7 days post-booking.

**Owner:** Product / Growth

---

### D3 — Visible preference profile must build trust and solve the commission-credibility problem

**Condition:** Showing users their preference graph ("here's what we think you like — is this right?") builds enough trust to overcome the inherent credibility problem of commission-based recommendations.

**Rating: POSSIBLE**

**Evidence FOR:**
- Commission-credibility problem is documented and real: users know platforms are paid to recommend certain options. This creates justified scepticism (discovery.md kill signals)
- Transparency is a structurally differentiated position: no competitor (Booking.com, Expedia Romie, Mindtrip, Layla) shows users their preference model (discovery.md competitor matrix)
- Trust-through-transparency has precedents: Monzo's spend transparency drove early loyalty. Spotify's "Your top genres" and Wrapped built emotional connection. The mechanic is proven, though not in travel
- Visible preference graph is positioned as the direct counter to the commission-credibility problem in [[strategy/03-value-proposition-canvas]] and [[strategy/04-swot-confrontation]]

**Evidence AGAINST / GAPS:**
- 🟡 Commission-credibility transparency is a theoretical solution. No A/B test data exists showing that visible preference graphs produce higher trust scores vs opaque recommendation systems in a travel booking context
- 🟡 There is a possible backfire risk: making the preference model visible may make users more aware of, not less suspicious of, commercial incentives if recommendations don't match stated preferences perfectly
- 🔴 The subscription vs commission tension remains unresolved (documented in [[research-5-revenue-risks]] Part 4): if users pay for subscription AND HP earns commission, the commission incentive is still present. Transparency helps but does not eliminate the conflict

**What would have to be true:**
Users who see their preference profile must rate HP recommendations as more trustworthy than Booking.com or Google results — even knowing HP earns a commission. Transparency must be a net trust gain, not neutral.

**Validation method:** Beta user survey. Show preference profile to cohort A, hide it from cohort B. Measure trust rating for recommendations, booking conversion rate, and NPS delta between groups. Prototype test pre-build on paper/Figma.

**Owner:** Product / UX Research

---

### D4 — Users must NOT leak bookings to Booking.com

**Condition:** Users who discover and evaluate trips on HP complete the booking on HP, not on Booking.com, the hotel direct, or any other established platform.

**Rating: UNLIKELY (this is the #1 kill condition)**

**Evidence AGAINST:**
- 🔴 Desti (2014) — AI travel planner built by the SRI/Siri team. Users found it useful, discovered hotels, made decisions. Then booked on Booking.com. Co-founder Nadav Gur's post-mortem: "They will go to the channel they are used to." Near-zero booking revenue before shutdown. ([[research-5-revenue-risks]])
- 🔴 TripIt (20M users) — Successfully aggregated itineraries, never captured booking economics. Airlines blocked integrations. Booking commissions were "never material." ([[research-5-revenue-risks]])
- 🔴 Google Trips (killed 2019) — Built by Google, distributed by Google, could not build a standalone monetisable booking layer. Features absorbed into Maps and Search. ([[research-5-revenue-risks]])
- 🔴 61% of business travellers book outside managed channels even when employer-mandated — for leisure travellers with no mandate, leakage is likely higher ([[research-5-revenue-risks]])
- 🔴 Customers have payment details, cancellation trust, customer service familiarity, and booking history on Booking.com. HP can match price; it cannot match 20 years of trust overnight
- 🔴 Culture Trip ($155M raised) — could not convert editorial engagement into booking revenue despite large content audience. Sold below fundraise ([[research-5-revenue-risks]])

**Evidence FOR (mitigations, not refutations):**
- Dynamic packaging (Duffel flights + RateHawk hotels assembled as one ATOL package) creates an offer that Booking.com literally cannot match — they don't sell flights ([[research-6-bed-banks]])
- ATOL protection on packages is a genuine trust signal that pure accommodation OTAs cannot offer
- One-click package assembly at competitive price eliminates the "why would I leave?" friction if the UX is right
- Bed bank net rates allow HP to price packages below retail while maintaining margin — if HP is genuinely cheaper, the incentive to leak shrinks

**What would have to be true:**
HP's packages must offer something Booking.com cannot match — specifically, flight + hotel ATOL package at net rates, with personalised selection — such that the switching cost of booking elsewhere outweighs the inertia of using a familiar platform. This is structurally achievable (Duffel + RateHawk) but requires ATOL and dynamic packaging to be live from early in the journey. Affiliate-only phase has no structural defence against leakage.

**Validation method:** This is a hard metric. Track booking completion rate by traffic source. Instrument the booking funnel: where do users drop out? Do Hotjar or session recordings show users opening Booking.com in a new tab? Beta exit survey: "Did you book elsewhere after researching here?"

**Critical dependency:** ATOL and dynamic packaging must be live by Month 4-6. Affiliate-only period is structurally vulnerable.

**Owner:** Product / Commercial (owns the booking funnel; must be treated as highest-priority metric from day one)

---

## VIABILITY CONDITIONS

### V1 — Bed bank margins must be 15-25% on the hotel component

**Condition:** RateHawk (and later Hotelbeds) provides net rates 20-30% below retail, allowing HP to sell at retail with a 15-25% gross margin on the hotel component of packages.

**Rating: PROBABLE**

**Evidence FOR:**
- RateHawk net rates verified: 20-30% below retail market rates, 2.5M+ properties, self-service signup, free API access, sandbox available ([[research-6-bed-banks]])
- Hotel wholesaling margin structure is industry-standard and well-documented. Hotels discount wholesale because bed banks guarantee volume and B2B simplicity
- LoveHolidays explicitly uses Hotelbeds wholesale rates + dynamic packaging to achieve 28.8% EBITDA margin on £2.9B GTV — proving the model at scale ([[research-5-revenue-models]])
- On The Beach: £209 margin per booking, 29% EBITDA margin — same model ([[research-5-revenue-models]])
- Small operator markup range: 15-35% on net rate (conservative: 13-26% gross margin) — confirmed in [[research-6-bed-banks]]

**Evidence AGAINST / GAPS:**
- 🟡 Rate parity clauses: some hotels and wholesalers enforce rate parity, meaning HP cannot price below the retail rate on OTAs. This is real — HP cannot win on price alone. Must win on curation + personalisation + package convenience, priced at parity. Net margin preserved; price advantage eliminated
- 🟡 RateHawk rates for the specific destinations and hotel tiers that HP's target users prefer (boutique, city break, southern European) have not been independently verified via API. The 20-30% figure is aggregate — specific inventory may vary
- 🟡 RateHawk content quality (photos, descriptions, accuracy) relative to Booking.com is unconfirmed. Poor content at the same price creates customer dissatisfaction

**What would have to be true:**
HP must achieve at minimum 15% gross margin on the hotel component across the majority of inventory it sells. Below 15%, the unit economics model does not reach breakeven at 1,000 users. Rate parity enforcement means the margin must come from wholesale buying, not retail pricing advantage.

**Validation method:** RateHawk API sandbox — pull rates for 20-30 representative city break hotels in HP's target destinations (Barcelona, Lisbon, Amsterdam, Rome, Edinburgh). Compare against Booking.com retail rates. Measure actual net-to-retail gap. 2 weeks, developer time only.

**Owner:** Commercial / Technical

---

### V2 — CAC must stay below £50 through organic and content channels

**Condition:** HP's primary customer acquisition channel is organic (SEO content around city break deals, social, referral, deal alerts) rather than paid performance marketing, keeping CAC below £50 per acquired user.

**Rating: POSSIBLE (with significant execution risk)**

**Evidence FOR:**
- Going.com (2M+ subscribers, $49/yr) built its user base primarily through word-of-mouth and deal alert email sharing — CAC near-zero in early years (discovery.md)
- Content-led acquisition is proven in travel: Lonely Planet, The Points Guy, Money Saving Expert — audiences built on deal/destination content
- HP's deal alert mechanic (Porto just hit £240 for your May dates — 30% below average) is inherently shareable — forward-to-a-friend is a natural organic loop
- Target user (tech-savvy frequent traveller) over-indexes on travel content consumption and recommendations from peers

**Evidence AGAINST / GAPS:**
- 🔴 UK travel paid CAC is £80-200+ for new entrants with no brand recognition ([[research-5-revenue-risks]]). Even established OTAs benchmark at £15-45. HP has no brand
- 🔴 77% of travel marketers unknowingly retarget their own existing customers through paid media — organic-first requires strong analytics discipline to avoid this trap at scale ([[research-5-revenue-risks]])
- 🟡 Content-led CAC requires significant content investment (writer, SEO, social) before organic traffic materialises — typically 6-12 months for meaningful SEO traction
- 🟡 "Below £50 CAC" is a target, not a validated number. The specific organic strategy has not been tested. Referral loop (sharing deals with friends) is speculative — documented in discovery.md but not yet evidenced as a working channel

**What would have to be true:**
HP must acquire users primarily through owned/earned channels: (1) shareable deal alerts driving peer-to-peer referral, (2) SEO content ranking for city break deal queries, (3) social content built around the preference graph and portfolio concept. Paid acquisition must be used for testing only (£2-5K experiments to measure CPL), not as a growth channel, until LTV is proven.

**Validation method:** Gate 1 messaging test. Run three variants at low spend (£500-1,000 each): city break deal framing, portfolio planning framing, personalised deal feed framing. Measure CPL and email sign-up conversion. If CPL exceeds £30 on paid, organic strategy must be proven before paid scaling.

**Owner:** Growth / Marketing

---

### V3 — 3+ bookings per user per year must materialise

**Condition:** The average HP user makes at least 3 bookings per year through the platform — the number required for bed bank unit economics to reach breakeven at 1,000 users.

**Rating: POSSIBLE**

**Evidence FOR:**
- Target user is explicitly defined as 3+ trips/year (discovery.md — behaviour-defined, not age-defined)
- UK frequent travellers (<3% of population) take 30% of journeys — HP targets this segment
- 20% of UK adults had 2+ international trips booked for following year (discovery.md)
- Portfolio model is specifically designed to capture the full year of travel — budget tracking, recommendations, alerts create ongoing engagement and booking opportunities

**Evidence AGAINST / GAPS:**
- 🟡 3+ bookings/year is the target user's behaviour in aggregate. Whether they will make all 3 bookings through HP specifically is untested. Even if the user takes 3 trips, they may book 1 on HP, 1 on Skyscanner, 1 direct with hotel
- 🟡 Travel industry hospitality retention rate: 55% — nearly half of customers do not return within 12 months ([[research-5-revenue-risks]]). In a booking leakage environment, even retained users may not rebooking through HP
- 🟡 The portfolio model is designed to capture repeat bookings through budget tracking and personalised feed — but this mechanic has not been tested. It is the hypothesis, not the evidence

**What would have to be true:**
HP must capture not just users who take 3 trips, but users who book all 3 through HP. This requires: (1) sufficient inventory breadth to cover the user's actual trip types, (2) a preference engine that improves enough by trip 2 to outcompete Booking.com, (3) retention mechanisms (alerts, portfolio view) that keep HP top-of-mind between trips.

**Validation method:** Beta cohort 6-month rebooking rate. Specifically: of users who complete one booking, what % return to book a second within 6 months? Gate 3 metric. If <30% rebooking rate at 6 months, 3x/year assumption must be revised.

**Owner:** Product / Growth

---

### V4 — ATOL obtainable within 12 weeks

**Condition:** HP can obtain Small Business ATOL (or ABTOT franchise ATOL as a bridge) within approximately 12 weeks of application, at a total compliance cost of £2,700-4,700.

**Rating: PROBABLE**

**Evidence FOR:**
- CAA Small Business ATOL process: documented, application fee £1,223 + advance APC £1,250 = £2,473 initial cost ([[research-5-revenue-risks]])
- ABTOT franchise ATOL available from ~£942 as a faster bridge option — explicitly noted in [[discovery]] and [[research-6-bed-banks]]
- CAA has not tightened eligibility for small operators — current framework is navigable
- 12-week timeline is CAA's own documented processing guidance for small business applications
- ATOL is the legal unlock for dynamic packaging (flight + hotel sold as one ATOL package). Without it, HP is restricted to affiliate links or accommodation-only — which caps margin at £13/booking

**Evidence AGAINST / GAPS:**
- 🟡 CAA processing times can extend beyond 12 weeks if documentation is incomplete or if CAA has a backlog. 12 weeks is the standard, not a guarantee
- 🟡 Small Business ATOL requires proof of financial standing and PI insurance. A pre-revenue startup must demonstrate this — may require a director's personal guarantee or bridging arrangement
- 🟡 ATOL covers flight + hotel packages but has specific legal definitions of what constitutes a "package." HP's dynamic packaging architecture must be legally reviewed against ATOL definitions before building

**What would have to be true:**
Application submitted at Month 0-1. ATOL granted by Month 3. Dynamic packaging live by Month 4-6. Any slip in this timeline delays the transition from £13/booking (affiliate) to £45-60/booking (dynamic package) — directly extending the breakeven horizon beyond 18 months.

**Validation method:** Pre-build ATOL consultation with CAA or specialist travel lawyer (Travlaw, Womble Bond Dickinson). Confirm eligibility, documentation requirements, and realistic timeline for HP's specific legal structure. 2-4 weeks, cost ~£1,500 in legal fees. Do this before committing to build.

**Owner:** Legal / Founder (ATOL is a founder-level responsibility, not delegatable to a contractor)

---

## FEASIBILITY CONDITIONS

### F1 — NLP intent parsing must work at under 600ms

**Condition:** HP's NLP layer accurately extracts structured travel intent from conversational queries ("long weekend somewhere warm, under £400, good food scene") and returns a structured intent object (destination candidates, dates, budget, preference signals) in under 600ms.

**Rating: PROBABLE**

**Evidence FOR:**
- Claude Haiku and GPT-4o mini both tested for travel NLP intent parsing — confirmed <600ms latency for structured extraction tasks at this complexity level ([[discovery]])
- Cost estimate: ~£0.006/user/month at 1,000 users — negligible ([[discovery]])
- No fine-tuning required: off-the-shelf LLMs with structured prompting (JSON output mode) handle travel intent extraction reliably. This is a solved problem
- Mindtrip, Booking.com, and Google all deploy LLM-based travel query parsing in production — the infrastructure is proven

**Evidence AGAINST / GAPS:**
- 🟡 End-to-end latency is more than NLP parsing alone: NLP parse (600ms) + preference lookup (50ms) + candidate generation (100ms) + live pricing (1,500ms parallel) + ranking (100ms) = ~2,350ms total ([[discovery]]). Under 3 seconds is the real target, not 600ms in isolation
- 🟡 Latency degrades under load. 600ms on a single API call may become 1,200ms under concurrent users if API throttling or infrastructure is not designed correctly
- 🟡 Accuracy is harder to measure than latency. "Works" in test conditions with clean queries may degrade on ambiguous real-world inputs. No benchmark data on accuracy across a representative corpus of HP user queries exists

**What would have to be true:**
NLP parsing must be accurate enough (>85% correct intent extraction on a representative test set) AND fast enough (P95 latency <600ms on the NLP call alone, <3 seconds end-to-end) to deliver a response that feels immediate. If the response is accurate but slow, users perceive the product as broken.

**Validation method:** Build a test harness. Feed 50 representative travel queries (including edge cases: multi-destination, family travel, vague requests) through Claude Haiku in JSON output mode. Measure latency and accuracy manually. 1 week of engineering time. Do this before committing to the architecture.

**Owner:** Engineering

---

### F2 — Preference graph must beat cold start without requiring 6+ bookings to become useful

**Condition:** HP's preference graph delivers meaningfully personalised recommendations from the first session, using designed onboarding conversation + archetype priors + taste calibration, without requiring a history of bookings to be useful.

**Rating: POSSIBLE**

**Evidence FOR:**
- Designed mitigation exists: onboarding conversation (explicit preference capture) + travel archetypes (priors based on stated style) + taste calibration swipe (rapid implicit signal capture) ([[discovery]])
- Netflix's SemanticGNN uses knowledge graph embeddings for cold start — demonstrates that cold start is solvable without large behavioural datasets ([[discovery]])
- Spotify Discover Weekly works via pre-computation + taste clustering — collaborative filtering from archetypes can bootstrap before individual data accumulates ([[discovery]])
- Phase 1 recommendation architecture (cosine similarity on explicit + onboarding signals) is buildable in 6-8 weeks without ML frameworks ([[discovery]])

**Evidence AGAINST / GAPS:**
- 🟡 "Designed onboarding + archetypes" is the mitigation plan, not validated performance data. The specific quality of HP's cold-start recommendations has never been measured against a real user test
- 🟡 Spotify and Netflix cold start analogies differ in a critical dimension: music and film preferences can be inferred from explicit signals (genre, mood) because the content is standardised. Travel preferences are more contextual (same user may want "party beach" and "quiet retreat" in different trips). Cold start is harder
- 🟡 If cold-start recommendations are poor, user trust is damaged before the preference graph has data to improve. The first 1-3 sessions are make-or-break for perceived value

**What would have to be true:**
Onboarding conversation + archetype priors must produce recommendations that feel "surprisingly accurate" — not just "not wrong." A user must leave the first session thinking "this knows me better than Booking.com does after 50 bookings." This is a high bar that requires careful onboarding design and prompt engineering.

**Validation method:** Prototype the onboarding flow. Run 10 users through it. After onboarding, show them 5 recommended city breaks. Measure: "Does this feel like it understands your travel style?" (1-5 Likert). Target: >4/5 average before beta launch. Also: measure onboarding completion rate — drop-off during onboarding is a sign the questions are too burdensome.

**Owner:** Product / Engineering

---

### F3 — RateHawk API integration must be achievable within standard startup engineering capacity

**Condition:** RateHawk's API is well-documented, REST-based, has a functioning sandbox, and can be integrated by a competent engineer within 4-6 weeks — without requiring specialist wholesale travel knowledge or commercial negotiation.

**Rating: PROBABLE**

**Evidence FOR:**
- RateHawk explicitly targets small travel agents and tech startups: self-service signup, no minimum volume, free API access, sandbox environment available ([[research-6-bed-banks]])
- Modern REST API with standard JSON responses — no legacy SOAP/XML like legacy GDS (Amadeus, Sabre) ([[research-6-bed-banks]])
- RateHawk is part of Emerging Travel Group; developer documentation is publicly available
- "Free API, sandbox available" is the specific finding from Research Round 6 that triggered the bed bank strategic pivot in [[discovery]]

**Evidence AGAINST / GAPS:**
- 🟡 RateHawk API documentation quality has not been independently tested in a development environment. "Modern REST API" is RateHawk's own characterisation, not independently verified
- 🟡 Rate and availability data from RateHawk must be mapped to HP's product schema. Property data normalisation (property IDs, content enrichment, deduplication against Duffel Stays) is ETL work that compounds. Discovery.md notes: "80% of work is data pipelines, not ML"
- 🟡 RateHawk sandbox may not reflect production data fidelity — common in travel APIs. The actual hotel content in production may have gaps or quality issues that only appear with live data

**What would have to be true:**
A senior full-stack engineer (or engineer with travel API experience) can build a working RateHawk search-and-book flow within 4-6 weeks in sandbox, with a clear path to production sign-off. If RateHawk documentation is poor or the data model is complex, the timeline extends — delaying the transition from affiliate to bed bank economics.

**Validation method:** Engineering spike. Assign 1 engineer 1 week to attempt RateHawk API sandbox integration (authentication, property search, rate lookup, mock booking). Assess: documentation quality, API stability, data model complexity, rate/availability fidelity. Output: go/no-go on 4-6 week integration estimate. Do this at Gate 2, before committing to bed bank as the primary model.

**Owner:** Engineering Lead / CTO

---

## CONDITION SUMMARY AND RISK RANKING

| # | Domain | Condition | Rating | Flag | Owner | Critical? |
|---|---|---|---|---|---|---|
| D1 | Desirability | Users prefer NLP input over traditional search | POSSIBLE | 🟡 | Product | No — table stakes, not differentiator |
| D2 | Desirability | City break hook converts to portfolio engagement | POSSIBLE | 🟡 | Product/Growth | Yes — core retention mechanic |
| D3 | Desirability | Visible preference profile builds trust | POSSIBLE | 🟡 | Product/UX | Yes — commission-credibility defence |
| D4 | Desirability | Users do NOT leak bookings to Booking.com | UNLIKELY | 🔴 | Product/Commercial | **EXISTENTIAL — #1 kill risk** |
| V1 | Viability | Bed bank margins 15-25% on hotel component | PROBABLE | 🟡 | Commercial/Tech | Yes — unit economics foundation |
| V2 | Viability | CAC stays below £50 via organic/content | POSSIBLE | 🟡 | Growth/Marketing | Yes — profitability lever |
| V3 | Viability | 3+ bookings/user/year materialises | POSSIBLE | 🟡 | Product/Growth | Yes — LTV assumption |
| V4 | Viability | ATOL obtainable within 12 weeks | PROBABLE | — | Legal/Founder | Yes — without this, dynamic packaging is blocked |
| F1 | Feasibility | NLP parsing works <600ms | PROBABLE | 🟡 | Engineering | No — solvable, low risk |
| F2 | Feasibility | Preference graph beats cold start | POSSIBLE | 🟡 | Product/Engineering | Yes — first session quality determines trust |
| F3 | Feasibility | RateHawk API integration is straightforward | PROBABLE | 🟡 | Engineering | Yes — bed bank model depends on this |

---

## THE CONDITIONS MOST LIKELY TO BE FALSE

### 1. D4 — Booking leakage (UNLIKELY / EXISTENTIAL)

This is the documented failure mode for the entire planning-tool category. Desti, TripIt, Google Trips, Culture Trip — the graveyard is full of products that couldn't capture the booking moment. HP's structural defence (dynamic ATOL packages that Booking.com cannot replicate) is real, but it requires ATOL and dynamic packaging to be live. During the affiliate-only phase, there is no structural defence. This must be treated as the #1 metric from day one.

**If false:** The entire revenue model collapses. HP becomes a free research tool for Booking.com.

### 2. D2 — City break to portfolio conversion (POSSIBLE but untested)

78% spontaneous travel preference is the base case for the target user. The city break hook addresses entry. But hook-to-portfolio is the unvalidated step. Without repeat portfolio engagement, HP is a one-booking-wonder with £45 in revenue per user and no retention story.

**If false:** CAC payback requires 2+ bookings minimum. If users don't return, payback never happens.

### 3. V2 — CAC below £50 (POSSIBLE but contradicted by sector data)

UK travel paid CAC is documented at £80-200+. The organic content strategy is the planned defence. But content takes 6-12 months to build. The interim period — before content drives organic traffic — is a capital risk. If HP resorts to paid acquisition at £80+ CAC before LTV is proven, runway collapses.

**If false:** Breakeven at 1,000 users requires LTV of £80+/user/year, achievable on bed bank model (£135-195/user/year) but only if rebooking rate holds. A simultaneous failure of V2 and V3 is fatal.

### 4. V3 — 3+ bookings/user/year (POSSIBLE but structurally ambitious)

Travel platforms have 55% annual retention (hospitality industry benchmark). 3 bookings/year through one platform for self-serve frequent travellers is a high bar — especially during the period before the preference graph is personalised. Going.com has 2M subscribers at $49/year and routes users to Google Flights. HP must capture the booking.

**If false:** Revenue per user falls from £135/year to £90/year (2 bookings) or £45/year (1 booking). Breakeven user count rises from 1,000 to 1,500-3,500.

### 5. F2 — Preference graph cold start (POSSIBLE but high product-quality bar)

First session quality is make-or-break for trust. If HP's first recommendations feel generic, users have no reason to return. The cold-start mitigation (onboarding + archetypes) is designed but not validated. One bad first impression in a market where Booking.com is the default destroys the case for switching.

**If false:** HP must spend more on retention-focused features before organic growth is sustainable, extending timeline.

---

## INTER-CONDITION DEPENDENCIES

The conditions are not independent. Failures compound:

```
D4 (leakage) blocks V1, V2, V3 — if users book elsewhere, no revenue, no LTV, no CAC payback
V4 (ATOL) blocks D4 mitigation — without ATOL, dynamic packages can't launch, leakage defence is absent
V2 (CAC) depends on D2 (portfolio engagement) — without portfolio engagement, no word-of-mouth
F2 (cold start) feeds D3 (trust) — poor cold-start recommendations undermine visible preference profile trust
```

**The critical chain:** ATOL (V4) must unlock dynamic packaging. Dynamic packaging defends against leakage (D4). Leakage defence is necessary for V1 (margins). Margins fund CAC (V2). All of this requires the preference graph to not fail cold start (F2) on the first session.

A failure at any point in this chain extends breakeven or kills the model.

---

## VALIDATION SEQUENCING (aligned to [[strategy/12-decision-tree]])

| Gate | Weeks | Conditions to validate | Cost | Kill criteria |
|---|---|---|---|---|
| Gate 1 (messaging) | 1-4 | D1, V2 (partial) | <£2,000 | <10% landing page conversion, CPL >£60 on paid test |
| Gate 2 (technical) | 4-8 | F1, F3, V4 (consultation) | £5-10K engineering | NLP accuracy <85%; RateHawk spike fails; ATOL blocked |
| Gate 3 (beta) | 8-20 | D2, D4, F2, V3 (partial) | £20-30K | D30 retention <20%; booking completion <5% of sessions; exit survey confirms leakage >50% |
| Gate 4 (economics) | 20-36 | V1, V2, V3 (full) | £10K validation | Bed bank margin <12%; CAC >£80 with no organic path; rebooking rate <30% at 6 months |
| Gate 5 (scale) | 36-52 | All conditions | £50K+ | Any UNLIKELY condition confirmed false and no viable mitigation |

Total cost to Gate 3 kill decision: **under £32,000**. This is the price of finding out whether the hypothesis holds before committing to scale.

---

## SOURCES

- [[discovery]] — Scores D8/V7/F8, all research round syntheses, kill signals
- [[research-5-revenue-models]] — LoveHolidays (28.8% EBITDA), OTB, Hopper, Going.com revenue mechanics
- [[research-5-revenue-risks]] — Booking leakage (Desti, TripIt, Google Trips), CAC £80-200+, chargeback rates, subscription tension
- [[research-6-bed-banks]] — RateHawk net rates 20-30% below retail, ATOL costs £2,473, dynamic packaging mechanics
- [[strategy/04-swot-confrontation]] — Commission-credibility as structural weakness
- [[strategy/06-blue-ocean]] — City break as entry vector
- [[strategy/07-five-choices]] — Personalisation engine positioning
- [[strategy/10-opportunity-trees]] — Desirability/Viability/Feasibility opportunity map
- [[strategy/12-decision-tree]] — 5 gate validation framework, £48K total to scale decision

External sources:
- Desti post-mortem: Skift (2014), Failory cemetery
- TripIt economics: Liviu Tudor (2014), Skift (2013)
- CAC benchmarks: PhocusWire (2025), Hotel News Resource
- ATOL costs: UK CAA Small Business ATOL documentation
- Hospitality retention: Recurly churn benchmarks, BillingPlatform industry data
- LoveHolidays model: Companies House FY2024 filings, £2.9B GTV

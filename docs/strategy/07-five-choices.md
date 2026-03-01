# Playing to Win — Five Choices Canvas
## Holiday Portfolio

**Framework:** Roger Martin & A.G. Lafley, *Playing to Win* (2013)
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Status:** 🟢 Where-to-play and how-to-win are clear and evidence-backed | 🟡 Capabilities require build sequencing; organic growth dependency unvalidated | 🔴 Management systems premature at pre-revenue stage
**Last updated:** 2026-02-28
**Sources:** [[discovery]], [[research-3-ai-travel]], [[research-5-revenue-models]], [[research-6-bed-banks]]

---

## Preamble: How the Five Choices Interlock

Martin's model is a cascade, not a checklist. Each choice constrains and enables the next:

```
Winning Aspiration
  └── Where to Play (which arena)
        └── How to Win (competitive advantage in that arena)
              └── Capabilities Required (what you must be able to do)
                    └── Management Systems (how you sustain it)
```

If a lower choice conflicts with a higher one, revise upward. The choices are only "strategy" when they are mutually reinforcing.

---

## Choice 1: Winning Aspiration

> What does winning look like for Holiday Portfolio?

### The Aspiration

**Holiday Portfolio becomes the default annual travel cockpit for self-serve frequent travellers in the UK — the tool they open in January to set their travel budget, throughout the year to act on deals, and after each trip to sharpen their preference profile.**

Winning is not:
- "Most bookings" — that is Booking.com's game (£5B+ annual revenue, unwinnable for a new entrant at any reasonable capital level)
- "Most subscribers" — that is Going.com's game ($49/yr, discovery-only, revenue capped by ARPU with no booking take rate)
- "Best AI" — NLP and conversational interfaces are now table-stakes across all major OTAs (research-3-ai-travel.md confirms every incumbent now ships NLP; HP does not win on the feature alone)

Winning IS:
- **Category ownership of the "annual travel portfolio" frame** — a concept no competitor has shipped
- **Structural margin advantage over affiliates** — 13–26% gross margin on hotel via RateHawk bed bank vs. 4–8% affiliate commission (research-6-bed-banks.md)
- **Switching cost built from semantic preference data** — by trip 3, a user's preference graph is genuinely theirs; leaving HP means reverting to generic recommendations everywhere else

### Concrete Winning Metrics

| Horizon | Metric | Target | Evidence basis |
|---|---|---|---|
| **Year 1** | Active portfolio users (set budget + booked ≥1 trip) | 10,000–50,000 | 🟡 No validation yet — estimate only. Gate 1 messaging test required |
| **Year 1** | Revenue per active user (bed bank model) | £135–220 | £45–60/booking × 3 bookings/yr (discovery.md unit economics) |
| **Year 2** | January re-engagement rate (users who reset budget in new year) | >40% | 🟡 No benchmark for this specific metric; industry retention for OTAs is ~5%/month |
| **Year 2** | Bed bank gross margin on hotel component | 15–25% | RateHawk net rate + 25% markup (research-6-bed-banks.md) |
| **Year 3** | Premium subscription attach rate | >25% of active users | RevenueCat: 48.7% trial-to-paid for travel apps (research-5-revenue-models.md) |
| **Year 3** | Breakeven booking volume | 800–1,200 users | vs. 2,500+ on affiliate-only model (discovery.md) |

**Owner:** Founder/CEO owns aspiration definition and annual metric review.

🟡 **Gap:** Year 1 active user target (10,000–50,000) is an estimate with no demand validation behind it. Gate 1 messaging test (three landing page variants: city break deal / portfolio planning / personalised deal feed) is the required validation step before committing to a target.

---

## Choice 2: Where to Play

> In which markets, segments, channels, and value chain positions will Holiday Portfolio compete?

### 2.1 Geography: United Kingdom (primary market)

**Why UK first:**
- 94.6M overseas trips in 2024; UK outbound travel market £98B+ (discovery.md)
- 61% YoY increase in UK holidaymakers using AI-powered travel platforms (2024→2025) — fastest adoption curve in HP's favour (research-3-ai-travel.md)
- 44% of UK consumers cite lack of personalisation as #1 pain point; 52% of 25–34s share this frustration (research-3-ai-travel.md)
- **Zero AI-native UK domestic competitors.** Mindtrip ($22.5M funded) does not serve the UK — TUI partnership covers Belgium, Germany, Ireland, Netherlands only, not UK as of February 2026 (research-3-ai-travel.md)
- ATOL licensing is a genuine UK-specific moat; competitors without it cannot sell UK-legal flight+hotel packages

**Not yet:** European expansion (Year 3+), B2B API licensing (Year 3+, Hopper HTS model), US market (never at startup stage)

🟡 **Gap:** No primary research on UK consumer willingness-to-switch from Booking.com/LoveHolidays. The 44% personalisation pain point data is survey-derived — behavioural validation needed via landing page test.

### 2.2 Customer Segment: Tech-Savvy Frequent Travellers

**Primary target:** Behaviour-defined, not demographic-defined:
- 3+ international trips per year (UK data: this group is <3% of population but takes ~30% of overseas journeys — discovery.md)
- Self-serve planning preference (not agent-dependent; active researching, comparison, deal-seeking)
- Budget-conscious but not budget-restricted (city breaks at £300–500; annual travel budget £1,500–4,000)
- Frustrated by fragmentation: currently using 4–6 disconnected tools (Skyscanner, Going.com, Booking.com, TripIt, spreadsheets)

**Entry segment: City break bookers**
- City breaks are the lowest-stakes entry (£300–500, familiar action, fast booking cycle)
- 78% of UK travellers prefer spontaneous travel decisions — don't lead with "annual portfolio," lead with "great deal on your next trip" (discovery.md)
- Sunshine Saturday: 4.3M ATOL bookings in January 2025 alone — confirms mass demand concentration and deal-seeking behaviour

**Secondary segment (Year 2+):** Portfolio builders who have completed 2–3 trips on HP and are actively using the preference graph and budget tracker

**Not served (by choice):**
- Family beach holiday bookers (Jet2holidays, LoveHolidays own this; HP's NLP personalisation is less differentiated here)
- Business travel (entirely different segment; BizTrip AI serves this)
- Luxury/ultra-premium travel (margins are higher but volume is lower; Phase 2 option)

🟡 **Gap:** No user research validating the 3+ trips/year cohort's willingness to consolidate onto a single platform. Switch cost research needed.

### 2.3 Channel: Direct Digital (Web + App)

- **Primary:** Web app (Next.js, Vercel) — lowest friction for first-time visitors arriving via content/SEO or deal alerts
- **Secondary (Year 1):** Mobile app for deal alert engagement and portfolio management between bookings — deal alerts create between-booking touchpoints that a web-only product cannot match
- **Not:** Travel agency wholesale (different commercial model), B2B API (Year 3+), retail partnerships (no stores)

**Distribution strategy:** Organic-first to preserve unit economics at low booking volume. CAC in UK travel likely £80–200+ for new entrant with no brand. At affiliate-only economics (£13/booking), paid CAC destroys unit economics immediately. Bed bank model (£45–60/booking) makes paid acquisition viable only above ~£60 CAC threshold.

Organic channels:
1. Content/SEO — city break deal guides, destination price histories, personalisation explainers
2. Deal alert email list — Going.com model, 80%+ gross margin on subscriber acquisition
3. Social proof and word-of-mouth — preference graph transparency ("here's what we think you like") is shareable

🔴 **Contradiction:** Organic growth assumption vs. January seasonality. 35% of annual bookings happen in a 4–6 week window (Sunshine Saturday effect — discovery.md). Organic content and SEO typically take 6–12 months to build ranking authority. If HP launches in Q3 2026, it may miss January 2027's Sunshine Saturday. Mitigation: soft launch October 2026, deal alert list-building through Q4, aggressive January 2027 push. **Owner: Founder/Head of Growth.**

### 2.4 Value Chain Position: Personalisation + Packaging Layer

Holiday Portfolio does NOT compete at:
- **Inventory level** (Hotelbeds, RateHawk own this; HP is a customer, not a competitor)
- **Flight GDS level** (Amadeus, Sabre own this; Duffel abstracts it via API)
- **Search/meta-search** (Google, Skyscanner, Kayak; HP is not a price aggregator)
- **Brand/loyalty programme** (Jet2, TUI; HP has no loyalty programme at launch)

Holiday Portfolio DOES compete at:
- **Personalisation layer:** Semantic preference graph, NLP intent parsing, recommendation engine — the intelligence layer that determines what a user sees
- **Packaging layer:** Dynamic assembly of Duffel (flight) + RateHawk (hotel) + Cartrawler (car) into ATOL-compliant packages with HP's markup — this is where the margin is created
- **Relationship layer:** Annual portfolio view, preference tracking, deal alerts — the retention mechanic that transforms transactional bookers into annual users

**Analogy:** LoveHolidays holds the same packaging position (£288M revenue, 28.8% EBITDA, 9.9% take rate on £2.9B GTV — research-5-revenue-models.md). HP adds a personalisation layer on top of the same packaging mechanic.

---

## Choice 3: How to Win

> What is the competitive advantage Holiday Portfolio will own in its chosen markets?

### The Core Advantage: Price-First Personalisation + Structural Bed Bank Margins

HP's competitive advantage is not a single feature — it is the combination of:

**A. Price-first entry point** (vs. inspiration-first competitors)
- Mindtrip's TUI partnership answers "where should I go?" — HP answers "is this a good deal *for me*?"
- Deal confidence scoring = Hopper's price intelligence ($850M revenue, 70% fintech — research-5-revenue-models.md) fused with personalised preference matching
- Nobody else does deal confidence at the personalised level. Hopper does it without preference context. Going.com does it without booking

**B. Semantic preference graph** (vs. opaque ML incumbents)
- Tripadvisor has vector DB infrastructure (Qdrant) for *content* search — not per-user preference learning
- Expedia Romie claims cross-trip learning but the mechanism is opaque ML on interaction data, not a structured semantic graph visible to the user
- HP's graph is: (1) derived from NLP conversation, (2) persisted across trips, (3) visible to the user, (4) explicitly updated after each completed holiday
- Tech: LLM embeddings + pgvector (Supabase free → Qdrant at scale). 100K users = ~£150/month vector storage. Not a cost problem — a build problem (discovery.md)

**C. Bed bank margins** (vs. affiliate-only economics)
- Affiliate commission: 4–8% = £8–13 per booking
- RateHawk net rate + 25% markup: ~£45–60 per booking (including Duffel flight margin)
- Dynamic packaging (Duffel + RateHawk): mirrors LoveHolidays' 9.9% take rate on package value
- RateHawk: free API access, no minimum volume, modern REST API v3, sandbox environment, self-service signup — zero barriers for a startup (research-6-bed-banks.md)
- Hotelbeds (scale play): 300K+ properties, 80K bookings/day — approach at Month 3–6 once booking history established

**D. UK-native ATOL compliance** (vs. all AI-native competitors)
- Small Business ATOL: ~£3,200–4,700, ~12 weeks (discovery.md). ABTOT franchise ATOL available from ~£942 as bridge
- No AI-native travel startup (Mindtrip, Layla, Airial, Vacay) holds UK ATOL — none can legally sell dynamic packages to UK consumers
- ATOL = trust signal: 4.3M ATOL-protected bookings in January 2025 alone proves UK consumer demand for ATOL-backed packages

### Six USPs vs. Primary Competitor (Mindtrip)

| USP | Holiday Portfolio | Mindtrip | Evidence |
|---|---|---|---|
| **1. Price-first, not inspiration-first** | Deal confidence scoring: "this deal is X% below average for you" | Inspiration-first: "where should I go?" no deal scoring | research-3-ai-travel.md; Hopper benchmark ($850M rev, price prediction) |
| **2. Annual portfolio + budget tracker** | "You've spent £1,200 of £3,500 this year. Here's what fits next." | No portfolio model; single-trip planning | research-3-ai-travel.md; Gap 2 confirmed: no competitor has shipped portfolio model |
| **3. UK-native + ATOL** | Built for UK, ATOL-compliant from v1 | US-focused; no UK ATOL; TUI covers BE/DE/IE/NL only | research-3-ai-travel.md; Mindtrip TUI partnership scope confirmed |
| **4. Visible preference graph** | User sees their preference profile; can correct it | Opaque ML; preference learning unverified | research-3-ai-travel.md; Part 3 preference learning deep dive |
| **5. Deal monitoring + alerts** | Porto just hit £240 for your May dates — 30% below average | No deal monitoring | Going.com model: 2M subscribers, $49/yr, 80%+ gross margin (research-5-revenue-models.md) |
| **6. Multi-API package assembly** | Duffel (flights) + RateHawk (hotels) + Cartrawler (cars) | Books through TUI only; single supplier, limited inventory | research-6-bed-banks.md; Duffel API — no IATA required, modern REST |

🟡 **Gap:** USP validation is theoretical — no user has seen and responded to the HP proposition vs. Mindtrip side by side. Gate 1 messaging test is required to confirm which USPs resonate as purchase drivers vs. nice-to-have.

🔴 **Contradiction:** USP 3 (UK-native ATOL) is a moat only if HP applies for and receives ATOL before a well-funded competitor (Mindtrip UK expansion, Trip.com) does the same. Trip.com explicitly highlighted UK expansion at WTM 2025 (research-3-ai-travel.md). ATOL is not a permanent moat — it is a first-mover advantage with a 12-week application window. **Owner: Founder. Action: ATOL application begins at or before Month 2.**

### Defensibility Curve

```
Month 0–3:   NLP UX + city break deal feed (copyable in 6 months by funded competitors)
Month 3–6:   RateHawk bed bank integration + ATOL licence (structural, takes 3–6 months to replicate)
Month 6–12:  Preference graph with 6 months of user data (increasingly hard to replicate — data moat)
Month 12–18: Portfolio retention loop — annual re-engagement, January Sunshine Saturday campaigns
Year 2+:     Network effects (collaborative filtering at 5K+ users), B2B API potential
```

The moat builds over time. The first 6 months are the most vulnerable period — HP is most replicable when it has no user data and no booking history.

---

## Choice 4: Capabilities Required

> What capabilities must Holiday Portfolio have (or build) to win where it has chosen?

### Capability Map

| Capability | Priority | Build vs. Buy | Timing | Owner |
|---|---|---|---|---|
| **NLP intent parsing** | P0 | Buy/API — Claude Haiku or GPT-4o mini | v1 | Tech lead |
| **Semantic preference graph** | P0 | Build — pgvector (Supabase) → Qdrant | v1 basic, v2 semantic | Tech lead |
| **Recommendation engine** | P0 | Build — cosine similarity Phase 1, collaborative filtering Phase 2 | v1 | Tech lead |
| **RateHawk bed bank integration** | P0 | Buy/API — free access, no minimum | Month 2–3 | Tech lead |
| **Duffel flights integration** | P0 | Buy/API — PM has direct Duffel relationship | v1 | Tech lead |
| **ATOL compliance** | P0 | Apply — Small Business ATOL or ABTOT franchise | Month 1–12 | Founder |
| **Content + SEO** | P1 | Build — city break deal guides, destination price histories | Month 1 ongoing | Growth lead |
| **Deal alert engine** | P1 | Build — price monitoring on tracked destinations | v1 | Tech lead |
| **Hotelbeds integration** | P2 | Buy/API — requires booking history for commercial terms | Month 3–6 | Tech lead |
| **TravelgateX aggregator** | P2 | Buy/API — 1,000+ suppliers via single GraphQL API | Phase 2 | Tech lead |
| **Cartrawler car hire** | P2 | Buy/API — ancillary, 8–12% commission | v1 or v2 | Tech lead |
| **Preference graph transparency UI** | P1 | Build — unique differentiator; no off-shelf equivalent | v1 | Product lead |
| **Deal confidence scoring** | P1 | Build — price history + preference match + budget fit | v1 | Tech lead |
| **FCA authorisation (fintech)** | P3 | Apply — 6–18 months; not MVP | Year 2 | Founder |
| **B2B API licensing** | P3 | Build — licence preference engine to OTAs | Year 3+ | Founder |

### Capability Details

**NLP Intent Parsing**
- Solution: Claude Haiku or GPT-4o mini. Latency <600ms, cost ~£0.006/user/month (discovery.md)
- "Somewhere warm, under £400, boutique hotel, good food scene" → structured intent: {region: Southern Europe, budget: £400, accommodation: boutique, priorities: [food, local feel]}
- Solved problem; no fine-tuning required

**Semantic Preference Graph**
- Phase 1 (v1): Explicit preferences from onboarding + booking history → stored as JSON preference object
- Phase 2 (v2): LLM embeddings (OpenAI text-embedding-3-small, 1,536 dimensions) stored in pgvector (Supabase free tier) → user preference vector enriched by every NLP query, click, bookmark, and completed trip
- Cold start mitigation: Designed onboarding conversation + travel archetype priors + taste calibration (Netflix-style)
- Scale: 100K users = ~£150/month vector storage (discovery.md)

**Recommendation Engine (Phased)**
- Phase 1 (v1, 6–8 weeks): Cosine similarity — user preference vector vs. destination/hotel vectors. No ML framework required
- Phase 2 (5K+ users): Collaborative filtering — "users who travel like you also loved Porto in October"
- Phase 3 (50K+ users): Two-tower neural network (Expedia's architecture, documented in academic literature)

**RateHawk Integration**
- REST/JSON API v3, sandbox environment, free access
- Net rate model: buy at net, sell at net + markup (15–35% hotel markup = 13–26% gross margin on hotel component)
- No minimum volume; dedicated UK account manager assigned on signup
- Path to Hotelbeds: approach at Month 3–6 once booking history establishes credibility; 300K+ properties, 80K bookings/day at scale

**ATOL Compliance**
- Package holiday definition (UK): flight + hotel sold together = requires ATOL
- Small Business ATOL: ~£3,200–4,700 all-in, ~12 weeks (discovery.md, research-6-bed-banks.md)
- Bridge option: ABTOT franchise ATOL from ~£942 — allows package selling while own ATOL application proceeds
- Dynamic packaging via Duffel + RateHawk is the primary ATOL trigger; affiliate-only flow avoids ATOL requirement

🟡 **Gap:** ATOL application timeline not yet started. If application begins Month 1, ATOL arrives Month 3–4 at earliest. Dynamic package revenue is blocked until ATOL is in hand. Affiliate-only economics (£8–13/booking) must sustain operations during this window. At 100 bookings/month affiliate-only, that is £800–1,300/month revenue — not sustainable without runway. **Owner: Founder. Mitigation: Apply for ABTOT franchise ATOL immediately as bridge.**

**Content + SEO Capability**
- City break deal guides for top 20 UK-traveller destinations (Barcelona, Lisbon, Amsterdam, Prague, Rome, Porto, Paris, etc.)
- Destination price history content — "Is £350 for 3 nights in Barcelona a good deal?" — exactly the query HP's deal confidence scoring answers
- SEO for long-tail intent: "city break deals under £400 2026," "best time to book Lisbon," "Porto deals from UK"
- These content assets take 6–12 months to rank — must start on Day 1

---

## Choice 5: Management Systems

> What processes and metrics must be in place to sustain the strategy?

*Note: At pre-revenue stage, full management systems are premature. This section defines what needs to be in place by end of Year 1.*

🔴 **Status:** Most of these systems do not yet exist. They are the build roadmap, not current state. Listing them as if they exist would be bad strategy.

### Year 1 Priority Systems

**A. Gate Review Process (Decision Points)**
See [[12-decision-tree]] — 5 phase gates, £48K total to scale decision. Kill at Gate 3 costs <£2,500.

- Gate 1 (now): Messaging test — 3 landing page variants, 500+ visitors per variant, conversion signal
- Gate 2 (Month 1–2): User interviews — 8–10 interviews with target segment, qualitative preference validation
- Gate 3 (Month 2–3): RateHawk sandbox + prototype — NLP input to booking flow, unit economic validation
- Gate 4 (Month 3–6): Beta with 50–100 users — real bookings, real revenue, real retention signal
- Gate 5 (Month 6–12): ATOL + dynamic packages — first package bookings, margin validation at scale

**B. Core Metrics Dashboard (Year 1)**

| Metric | Why it matters | Kill threshold |
|---|---|---|
| Activation rate (NLP query → deal viewed) | Does the NLP front door work? | <20% = rebuild the input |
| Booking conversion (deal viewed → booked) | Does the deal flow convert? | <3% = pricing or UX problem |
| Booking leakage rate | Do users plan here and book on Booking.com? | >50% = model-threatening |
| Revenue per booking (by model: affiliate vs. bed bank vs. package) | Are the unit economics working? | Affiliate-only → investigate bed bank transition |
| January re-engagement rate (Year 2 test) | Is the portfolio frame creating annual loyalty? | <20% = portfolio mechanic not resonating |
| Preference graph depth (avg. preference dimensions per user) | Is the personalisation engine learning? | <5 dimensions per user after 3 bookings = architecture problem |

**C. Competitive Intelligence System**

Primary watch: **Expedia Romie** — most likely incumbent to close the explicit preference graph gap (research-3-ai-travel.md). If Romie ships a user-visible, structured preference profile derived from conversation in 2026, HP's core differentiation narrows significantly.

Secondary watch: **Mindtrip UK expansion** — any announcement of ATOL application or UK commercial partnership is a signal to accelerate.

Tertiary watch: **Trip.com UK expansion** — highlighted at WTM 2025; could add AI personalisation layer to existing UK inventory.

**Review cadence:** Monthly competitive scan; quarterly strategy review against five choices.

**Owner:** Founder. No dedicated competitive intelligence resource at startup stage.

**D. Revenue Model Transition Checkpoints**

| Phase | Revenue model | Trigger to transition |
|---|---|---|
| Day 1 | Affiliate only (4–8% commission) | First 10 bookings validated |
| Month 2–3 | RateHawk bed bank (15–25% hotel margin) | API integrated + sandbox tested |
| Month 4–6 | Dynamic packages (9–10% take rate on package value) | ATOL in hand |
| Month 6–12 | Subscription launch (£59.99/yr) | 500+ active users |
| Year 2 | Fintech — Price Lock, Portfolio Protect | FCA authorisation received |

🟡 **Gap:** No CFO/finance function at startup stage. Revenue model transitions require financial modelling and cash flow management. Founder must own this until Series A, when a finance hire is warranted. Risk: running out of runway during the affiliate-only window before bed bank economics kick in.

---

## Cascade Coherence Check

| Choice | Reinforces | Tension |
|---|---|---|
| Win in UK annual travel | UK = ATOL = moat vs. US-focused competitors | UK market requires content + brand; both take time |
| City break frequent travellers | City break = low-stakes entry = fast booking cycle = faster preference data | Frequent travellers are hard to reach via organic; CAC risk |
| Price-first + preference graph | Deal confidence + preference transparency = solves commission-credibility | Building trust from zero with no brand is the hardest part |
| Bed bank margins | RateHawk makes unit economics viable at 800–1,200 users | Requires ATOL for full dynamic packaging; ATOL takes 12 weeks |
| Organic growth | Preserves unit economics at low volume | January Sunshine Saturday timing risk; organic takes 6–12 months |

**Overall coherence: High.** The choices reinforce each other. The primary tension is the organic growth dependency — HP's unit economics require low CAC, but organic channels take time to build while January seasonality creates a narrow window of opportunity. Solving this is the job of the Phase 1 plan ([[13-phase-1-plan]]).

---

## Related Artefacts

- [[08-strategy-kernel]] — Rumelt's diagnosis, guiding policy, and coherent actions
- [[06-blue-ocean]] — Strategy canvas confirming portfolio + personalisation as unoccupied space
- [[05-five-forces]] — Market attractiveness (2.5/5 — unattractive but profitable at scale)
- [[04-swot-confrontation]] — SWOT confrontation matrix
- [[12-decision-tree]] — 5 phase gates to scale decision
- [[13-phase-1-plan]] — Detailed Phase 1 actions and owners
- [[discovery]] — Full product concept, scores D8/V7/F8
- [[research-3-ai-travel]] — Competitive landscape: 12 platforms assessed
- [[research-5-revenue-models]] — Revenue benchmarks: LoveHolidays, OTB, Jet2, Hopper, Going.com
- [[research-6-bed-banks]] — Bed bank channel: RateHawk, Hotelbeds, TravelgateX, ATOL

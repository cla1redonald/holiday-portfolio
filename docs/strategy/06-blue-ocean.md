# 06 — Blue Ocean Strategy Analysis
## Holiday Portfolio: UK AI Travel Personalisation Engine

**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Status:** Revised 2026-02-28 — incorporates bed bank economics (R6), AI competitor capability gap matrix (R3), USP framework
**Owner:** Product Strategy
**Linked:** [[01-bmc-current]] | [[03-value-proposition-canvas]] | [[04-swot-confrontation]] | [[05-five-forces]] | [[00-gap-analysis]]

---

## 1. Strategy Canvas

### Competitive Factors: Definition & Rationale

| Factor | Why It Matters for This Canvas |
|---|---|
| **Inventory breadth** | Number of bookable properties / flights accessible to user. Red ocean standard — incumbents compete fiercely here. |
| **Price competitiveness** | Ability to surface cheaper prices than alternatives. Core consumer expectation. |
| **Brand trust** | Established credibility to handle payment, manage disruption, guarantee ATOL/ABTA protection. High barrier for new entrants. |
| **NLP input** | Ability to accept natural language queries ("long weekend, warm, under £400, good food") instead of form fields. Table stakes by 2026 — but depth of implementation varies. |
| **Personalisation depth** | Degree to which recommendations are shaped by individual user data vs. generic inventory ranking. |
| **Visible preferences** | Whether the user can see and edit what the platform thinks they like. Distinguishes transparent engines from opaque ML. |
| **Portfolio / budget tracking** | A structured view of multiple planned/booked/aspirational trips within a declared annual budget. Currently non-existent in the market. |
| **Deal confidence scoring** | Contextualised signal: is this deal genuinely good *for this user* (price history + budget fit + preference match)? |
| **Deal alerts** | Proactive notifications when prices drop on destinations/dates the user cares about. Ongoing engagement between bookings. |
| **UK ATOL compliance** | Legal protection on flight+hotel packages under the UK Package Travel Regulations. Critical trust signal for UK buyers; no AI-native startup currently offers this. |
| **Package assembly** | Ability to bundle flights + hotel + car + transfers in a single checkout. Package margin (15–25% gross) vs. affiliate commission (4–8%). |
| **Preference learning across trips** | Does the system get demonstrably better after each completed trip? The "Spotify Discover Weekly" flywheel. |

---

### Scoring Matrix (1–5 scale)

**Scoring key:** 1 = Absent or negligible | 2 = Weak/nascent | 3 = Functional | 4 = Strong | 5 = Best-in-class / category-defining

| Competitive Factor | **Holiday Portfolio** | **Booking.com** | **Mindtrip** | **LoveHolidays** | **Google** |
|---|:---:|:---:|:---:|:---:|:---:|
| Inventory breadth | 2 | 5 | 3 | 3 | 5 |
| Price competitiveness | 3 | 4 | 2 | 4 | 4 |
| Brand trust | 1 | 5 | 2 | 4 | 5 |
| NLP input | 5 | 4 | 5 | 1 | 4 |
| Personalisation depth | 5 | 3 | 3 | 2 | 3 |
| Visible preferences | 5 | 1 | 1 | 1 | 1 |
| Portfolio / budget tracking | 5 | 1 | 1 | 1 | 1 |
| Deal confidence scoring | 5 | 2 | 1 | 2 | 2 |
| Deal alerts | 4 | 2 | 1 | 1 | 3 |
| UK ATOL compliance | 4 | 1 | 1 | 5 | 1 |
| Package assembly | 4 | 1 | 1 | 5 | 1 |
| Preference learning across trips | 5 | 2 | 2 | 1 | 1 |

**Source notes:**
- Booking.com NLP (4): AI Trip Planner (OpenAI-powered, June 2023 launch, multiple EU markets by 2025); persistent preference is implicit/booking-history-based, not conversation-derived. Source: research-3-ai-travel.md §2.2
- Mindtrip NLP (5): Full conversational NLP from launch; preference learning claimed but unverified as semantic graph. Source: research-3-ai-travel.md §1.1
- Mindtrip UK ATOL (1): TUI partnership covers Belgium, Germany, Ireland, Netherlands only — not UK as of February 2026. Source: research-3-ai-travel.md §1.1
- LoveHolidays ATOL (5): Full ATOL-protected dynamic packaging, £2.9B GTV, 9.9% take rate. Source: discovery.md §Viability
- Google personalisation (3): Broad behavioural profile from Search/Maps/Gmail; not a purpose-built travel preference graph. Source: research-3-ai-travel.md §2.1
- HP brand trust (1): New entrant with no booking history, no ATOL yet at launch. Honest starting point.
- HP deal alerts (4): Core feature from v1 (price drops on saved destinations); not 5 because cold-start limits relevance in early months.

🟡 **Gap note:** NLP input is now table stakes among digital-native platforms. The differentiation is NOT "we have NLP" but the combination of visible preferences + portfolio + deal confidence. Booking.com and Google both score 4 on NLP — HP's moat is elsewhere. (research-3-ai-travel.md §3)

---

### Value Curve: ASCII Representation

```
Score
  5  |  HP        BK        HP  HP  HP           HP  LH  HP
     |      BK        MT               HP  HP
  4  |  LH  LH  LH  HP      LH  HP       GL  HP  LH
     |      GL  GL               GL      HP
  3  |  MT      HP  BK  BK  MT  BK  BK  LH  BK  BK
     |                  GL      GL          GL
  2  |      MT  MT          HP  BK  BK  GL  MT  BK  BK  BK
     |                                  MT              GL
  1  |  HP      GL  LH  LH  LH  LH  LH  MT  MT  GL  LH  GL
     |  MT  MT      MT  MT  MT  MT      LH  LH  MT
     |___________________________________________________________
       Inv  Prc  Brt  NLP  Per  Vis  Por  DCS  Dal  ATL  Pkg  Lrn

HP = Holiday Portfolio  BK = Booking.com  MT = Mindtrip  LH = LoveHolidays  GL = Google
```

**Reading the canvas:**
- HP peaks where all competitors are flat (Visible, Portfolio, DCS, Learning): this is the blue ocean territory
- HP scores low on Inventory and Brand Trust — accepted trade-offs as a new entrant
- HP and LoveHolidays converge on ATOL and Package — HP differentiates by layering personalisation on top of the package model LoveHolidays validated
- Mindtrip and HP converge on NLP but diverge sharply on everything downstream of first query

🟡 **Gap:** HP's ATOL score of 4 assumes the ABTOT franchise ATOL path (£942, ~4 weeks) or Small Business ATOL (~£3,200–4,700, 12 weeks). Until ATOL is live, this score is 1. Plan accordingly — ATOL before dynamic package launch. Source: discovery.md §Feasibility

---

## 2. Four Actions Framework

### ELIMINATE — What the industry competes on that Holiday Portfolio should drop

| Factor | Industry behaviour | Why HP eliminates it | Evidence |
|---|---|---|---|
| **Massive inventory breadth as primary signal** | Booking.com (2.9M+ properties), Expedia (900K+), Google index everything. "Most inventory" is the arms race. | Inventory breadth creates paradox of choice and undifferentiated ranking. HP competes on relevance, not volume. 10 right options beat 50,000 ranked by margin. | 37% of UK consumers frustrated by "time spent filtering irrelevant options" — research-3-ai-travel.md §5 |
| **Destination content and editorial production** | Secret Escapes (curated editorial), Tripadvisor (1B+ reviews), Google (Maps + editorial). Heavy content investment as engagement driver. | Self-serve tech travellers — HP's target segment — don't want editorial; they want preference-matched signal. Content is expensive, not differentiated, and distracts from the personalisation engine. | Target user behaviour: "enjoys planning but wants confidence they're not overpaying" — discovery.md §Idea |
| **Single-trip transaction mindset** | Every OTA optimises for one booking event. Skyscanner, Booking.com, Kayak: enter destination + dates → search → book → gone. Repeat from scratch next trip. | The single-trip frame ignores the annual travel behaviour of the 3+ trips/year target user. Portfolio frame converts transactions into a managed annual relationship. | 20% of UK adults had 2+ international trips booked simultaneously for following year; 14% of 16–24s had 3+ simultaneously — discovery.md §Desirability |
| **Generic deal newsletters and broadcast alerts** | Going.com ($49/yr, 2M subscribers), Scott's Cheap Flights: email blasts to full subscriber base. | Broadcast without personalisation creates noise, not signal. HP's alerts are preference-matched and budget-aware. Eliminate broadcast; build matched feed. | HP USP 5: "Porto just hit £240 for your May dates — 30% below average" — discovery.md §USP 5 |

---

### REDUCE — What to offer less of than industry standard

| Factor | Current industry level | HP target level | Rationale | Risk |
|---|---|---|---|---|
| **Generic search and filter UX** | All OTAs lead with destination box + date picker + 20+ filter options. Skyscanner's Everywhere search is closest to open-ended, but still destination-anchored. | Minimal — NLP entry replaces form fields from v1. Filters available as secondary refinement only. | "Nobody accepts: 'long weekend somewhere warm, under £400, good food scene.'" HP does. Filters are the symptom of a platform that doesn't know you. | Risk: power users expect filter control. Keep as secondary option, not primary. |
| **Price comparison as primary hook** | Skyscanner, Google Flights, Kayak: price-lowest-first ranking is the default. Meta-search is the dominant travel discovery paradigm. | Price is one signal among several (preference match + budget fit + deal quality). HP isn't Skyscanner. | You can't out-search Google. HP's moat is relevance to the individual, not lowest aggregate price. | 🟡 Risk: users arrive expecting price comparison. Messaging must reframe "best deal for you" vs "lowest price." |
| **Brand trust through marketing spend** | Booking.com ~$5B/year performance marketing. Expedia comparable. Trust built through volume + brand. | Below incumbent spending — acceptable for early adopters. Trust built through deal accuracy, transparent commission disclosure, visible preference profile. | New entrant cannot win a marketing spend arms race. Trust via transparency is the structural alternative. | 🔴 Risk: low brand trust is the most significant barrier to first booking. Visible preference graph + ATOL + deal confidence are the trust substitutes. |
| **Human customer service** | Travel agents doubled among 18–24s (26%→48%). Thomas Cook reboot used human agents. Premium brands compete on human touch. | Near-zero at MVP (automated disruption handling via Duffel). Human escalation path for ATOL-protected packages. | Target segment is self-serve by choice. Human service is a cost centre, not a differentiator for this user. | Risk: package ATOL requires accessible complaint/support channel. Build lightweight; don't eliminate. |

---

### RAISE — What to push well above industry standard

| Factor | Current best-in-class | HP target | How HP achieves it | Evidence |
|---|---|---|---|---|
| **Personalisation depth** | Expedia Romie: claims cross-trip preference memory, ML on interaction history + stated preferences. Still opaque and behaviour-derived, not conversation-derived. | Explicit semantic preference graph: dimension-level capture (travel style, accommodation preference, cuisine, pace, party composition, budget tier) from NLP conversation, stored as vector embeddings, enriched with every interaction. | pgvector/Qdrant + OpenAI text-embedding-3-small. Architecture validated: Spotify Discover Weekly (pre-computation + taste clustering), Netflix SemanticGNN (cold start), SPiKE paper (2025). Cost: ~£150/month at 100K users. | No platform has shipped explicit, structured, visible preference profiles derived from NLP conversation. Gap confirmed: research-3-ai-travel.md §3 |
| **Preference transparency** | Every personalising platform operates through opaque ML. Booking.com, Expedia Romie, Google: none show users what the system thinks they like. | User-visible preference graph: "Here's what we think you like — is this right?" User can see, edit, and confirm preferences. Closes the commission-credibility gap by showing the algorithm's reasoning. | Preference graph UI from v1 (explicit preferences + booking history). Semantic embeddings in v2. | 44% of UK consumers cite lack of personalisation as #1 pain; 52% of 25–34s frustrated by personalisation failures — research-3-ai-travel.md §5 |
| **Deal confidence scoring** | Going.com: historical pricing + deal certainty signals (best-in-class for deal quality signalling). Hopper: price prediction + freeze (best-in-class for timing). Neither contextualises against personal budget or preferences. | Deal confidence score = price history (Hopper model) + preference match (HP semantic graph) + budget fit (portfolio remaining budget). "This is a good deal for you" not just "this is a cheap price." | Duffel flight pricing history + RateHawk hotel net rates vs. retail. Budget tracking from portfolio view. Preference match from semantic graph. | No competitor fuses all three signals. HP USP 1 — discovery.md |
| **UK package compliance** | LoveHolidays and On The Beach: full ATOL dynamic packaging. Jet2: 5.4x margin on packages vs. flight-only. No AI-native startup is ATOL-authorised. | ATOL-protected dynamic packages from Month 4–6. Duffel flights + RateHawk hotels + markup = retail package price. Small Business ATOL: ~£3,200–4,700, 12 weeks. | LoveHolidays model: 9.9% take rate on £2.9B GTV. Dynamic packaging is the economic unlock — 13–26% gross margin on hotel vs. 4–8% affiliate. | "UK buyers want ATOL protection on packages — a trust signal no US startup offers." — discovery.md USP 3 |

---

### CREATE — What doesn't exist yet anywhere in the market

| New factor | Description | Why it wins | Current nearest analog | Gap evidence |
|---|---|---|---|---|
| **Visible semantic preference graph** | User can see a structured representation of how the platform understands their travel identity: "You prefer boutique hotels, southern European cities, good food scenes, 3-night breaks, travelling without kids." Each dimension derived from NLP conversations, searches, clicks, and bookings. User can confirm, correct, or add. | Closes the commission-credibility gap — user can see *why* a deal is recommended. Builds trust without advertising spend. Creates switching cost: leaving HP means losing your preference graph and starting with generic recommendations. | Expedia Romie: closest incumbent claim, but mechanism is opaque ML on interaction data, not visible to user. | "No platform has implemented a richly structured semantic preference graph... that users can see, edit, or that surfaces explicitly in recommendations." — research-3-ai-travel.md §3 |
| **Annual travel portfolio with budget tracking** | User declares an annual travel budget at onboarding (e.g., £3,500). The portfolio view tracks: budget spent/remaining, trips booked/planned/aspirational, calendar gaps, upcoming deal opportunities. Every recommendation is contextualised against this view: "You've used £1,200. Here are three trips that fit your remaining £2,300 and your preference for city breaks." | Transforms one-time transactional users into annual retained users. The retention mechanic that turns infrequent interactions into a managed annual relationship — without a subscription requirement. | TripIt (20M users): trip storage and itinerary management, but no booking integration, no budget layer, no deal feed. | "Every competitor is trip-by-trip. HP tracks your travel year." — discovery.md USP 2. Portfolio behaviour data: 20% of UK adults had 2+ international trips simultaneously — discovery.md §Desirability |
| **NLP-to-preference pipeline** | Every natural language query automatically enriches the user's preference graph — not just returns results. "Somewhere warm, local feel, good food" is parsed by LLM (Claude Haiku / GPT-4o mini, ~£0.006/user/month) into structured preference signals that update the vector embedding. The system gets better after every query, not just every booking. | The Spotify flywheel: recommendation quality compounds with use. By query 10, HP knows you better than Booking.com does after 5 bookings. By trip 3, your feed is uniquely yours — leaving means starting from scratch with generic results everywhere else. | Mindtrip: NLP input and preference claims, but no evidence of structured semantic graph or per-query enrichment of a persistent profile. | research-3-ai-travel.md §3: "The critical gap: no platform has implemented a richly structured semantic preference graph... derived from conversational NLP input." |
| **Per-trip preference improvement loop** | After each completed trip, HP proactively requests a structured review (not a star rating — a preference signal): "Did Porto match what you expected? Was the hotel style right? What would you change?" Responses directly update the preference graph. Next recommendation is measurably more accurate. | Creates a data flywheel competitors cannot replicate without years of trip data. Equivalent to Netflix's thumbs up/down but travel-specific and preference-dimensioned. The longer you use HP, the worse alternatives look. | No travel platform has shipped a verifiable per-trip preference update loop. Expedia Romie claims to "get smarter" but mechanism is opaque and not feedback-loop driven. | research-3-ai-travel.md §3: "What doesn't exist: explicit, transparent, semantically structured preference profiles derived from NLP conversation that meaningfully improve trip recommendations with each completed holiday." |
| **Deal confidence score fused with portfolio context** | A single number (e.g., 87/100) communicating: this price is X% below 90-day average (Hopper model) + matches 8 of your 10 preference dimensions + fits your remaining budget + falls in your identified travel window. Shown on every deal card. | Addresses the fundamental information asymmetry in travel booking — "is this a good deal?" — while simultaneously surfacing personalisation. Converts generic price signals into personally relevant decision support. | Hopper: price prediction without preference context. Going.com: deal quality without personal budget context. No competitor fuses all three. | HP USP 1 — discovery.md |

---

## 3. Value Curve: Current vs. Target Positioning

### Current State (Industry Average) vs. Holiday Portfolio Target

| Factor | Industry Average | HP at Launch (v1) | HP at Scale (v2+, 12mo+) |
|---|:---:|:---:|:---:|
| Inventory breadth | 4 | 2 | 3 |
| Price competitiveness | 3 | 3 | 4 |
| Brand trust | 3 | 1 | 2 |
| NLP input | 3 | 5 | 5 |
| Personalisation depth | 2 | 3 | 5 |
| Visible preferences | 1 | 4 | 5 |
| Portfolio / budget tracking | 1 | 5 | 5 |
| Deal confidence scoring | 2 | 4 | 5 |
| Deal alerts | 2 | 4 | 4 |
| UK ATOL compliance | 2 | 1→4* | 4 |
| Package assembly | 2 | 1→4* | 4 |
| Preference learning across trips | 1 | 3 | 5 |

*HP at launch = affiliate only (score 1); ATOL + RateHawk bed bank by Month 4–6 (score 4). Phased.

**Narrative:** The HP value curve at scale diverges from industry average in exactly the right places: invented categories (Portfolio, Visible Preferences, Learning, DCS) peak at 5 while industry average sits at 1–2. Accepted trade-offs (Inventory, Brand Trust) are below average — these are costs HP does not pay to win. The curve converges with industry on NLP (table stakes, must match) and price competitiveness (must be credible, not cheapest).

---

## 4. Blue Ocean Logic: The Non-Competing Space

### What Holiday Portfolio is NOT competing on:

HP explicitly exits the red ocean on:
1. **Inventory arms race** — 2M properties vs. 2.9M is not the competition. 50 right deals beat 2M undifferentiated.
2. **Brand marketing** — Booking.com spends ~$5B/year on performance marketing. New entrant cannot match this. Trust is earned through deal accuracy and transparency.
3. **Price meta-search** — You cannot out-search Google Flights. The race to lowest price is a race to zero margin. HP's bed bank model (13–26% gross margin on hotel) only works if HP is not a meta-search engine.
4. **Content and editorial** — Expensive to produce, commoditised by AI, not what the self-serve target segment wants.

### What Holiday Portfolio IS creating:

The three-way combination that no platform offers:
1. **Preference graph + transparency** — See what we think you like. Control it. Watch it learn.
2. **Portfolio frame** — Your whole travel year in one place. Budget. Trips. Deals.
3. **Deal confidence** — Not "cheap." "Good for you."

This is the blue ocean. Research Round 3 confirms: "The combination — conversational NLP to capture rich preference data + a structured, semantic preference graph that persists across trips + a curated portfolio of holidays matched specifically to that preference graph — does not exist." (research-3-ai-travel.md §7)

---

## 5. Strategic Positioning Summary

### The Positioning Statement (Internal)

For self-serve UK travellers who take 3+ trips per year and want deal confidence, not just deal discovery, Holiday Portfolio is the personalisation engine that learns how you travel — not a search engine that shows you everything. Unlike Booking.com or Mindtrip, HP builds a visible, structured preference graph from your conversations, tracks your whole travel year against your budget, and gets measurably better after every trip. And unlike any AI-native travel platform, it is ATOL-protected and built for UK consumers from day one.

### Owner Assignments

| Workstream | Owner | Dependency |
|---|---|---|
| Semantic preference graph (v1 — explicit preferences + booking history) | Engineering | Supabase pgvector, Duffel API integration |
| NLP-to-preference pipeline (LLM intent parsing → vector update) | Engineering | Claude Haiku or GPT-4o mini API |
| Portfolio / budget tracking UI | Product + Design | Auth layer, user onboarding |
| Deal confidence scoring (price history + preference match + budget fit) | Engineering | RateHawk API + price history data |
| Deal alerts (preference-matched price drops) | Engineering + Product | Price monitoring job, notification infrastructure |
| ATOL authorisation | Founder / Legal | ABTOT franchise ATOL (£942, ~4 weeks) as bridge → Small Business ATOL (~£3,200–4,700, 12 weeks) |
| RateHawk bed bank integration (net rate model) | Engineering + Commercial | RateHawk API sandbox → live |
| Visible preference profile UI | Design + Engineering | Preference graph data model |
| Per-trip preference improvement loop | Product + Engineering | Post-trip review flow, preference update mechanism |

---

## 6. Risk and Contradiction Flags

| Flag | Issue | Severity | Mitigation |
|---|---|---|---|
| 🟢 | Capability gap confirmed by R3: no platform combines preference graph + portfolio + UK-native. Blue ocean is real and unoccupied as of Feb 2026. | Validated | Monitor quarterly — especially Expedia Romie feature releases |
| 🟢 | Bed bank economics (R6) validate the revenue model: 13–26% gross margin on hotel component vs. 4–8% affiliate. Package margin mirrors LoveHolidays' proven model. | Validated | RateHawk API sandbox evaluation before platform build |
| 🟡 | **NLP as table stakes:** By Feb 2026, Booking.com, Google, Expedia, Mindtrip, Kayak all offer conversational NLP. HP cannot position on NLP alone. Messaging must foreground preference transparency, portfolio, and deal confidence — not the NLP input. | Medium | Update all messaging to lead with preference graph + portfolio frame, not "tell us in your own words" |
| 🟡 | **ATOL timing gap:** HP cannot legally sell ATOL-protected packages until authorisation is complete (~12 weeks for Small Business ATOL). At launch, HP is affiliate-only — which limits package margin. Revenue model must be honest about this phasing. | Medium | ABTOT franchise ATOL as bridge. Affiliate-only at launch is fine if framed as "prove demand" phase. |
| 🟡 | **Cold-start preference problem:** Preference graph has no data at first session. First recommendations are based on archetype priors + onboarding conversation, not real preference data. Risk: first experience feels generic, undermining the core proposition. | Medium | Designed onboarding conversation (5–7 preference questions) + taste calibration swipe (Tinder-style). Archetype priors (city break adventurer, beach relaxer, cultural explorer, etc.) as cold-start scaffolding. |
| 🟡 | **Planning-to-booking leakage:** 300+ planning startups failed because users plan on the platform and book on Booking.com. HP must own the full booking funnel. City break hook + deal confidence scoring + in-platform package booking are the mitigation. | Medium | Measure booking completion rate vs. drop-off to external OTAs. Kill signal if >40% leakage in first 90 days. |
| 🔴 | **Expedia Romie convergence risk:** Romie is "the incumbent most likely to close [the preference graph] gap." (research-3-ai-travel.md §7). If Expedia ships a visible, structured, user-editable preference profile, HP's differentiation narrows substantially. Monitoring Romie's 2026 feature roadmap is the most important competitive intelligence task. | High | Quarterly Romie feature audit. Build switching costs (preference graph data, trip history, year-of-travel narrative) before Romie closes the gap. |
| 🔴 | **Brand trust as ceiling:** HP scores 1 on brand trust at launch. First-booking conversion will be suppressed by zero brand recognition. Booking.com and Expedia score 5. ATOL is the most important trust signal — without it, asking UK consumers to book packages on an unknown platform is a hard sell. | High | ATOL authorisation is non-negotiable before dynamic package launch. Deal confidence scoring + visible preference graph as interim trust substitutes. Consider partnership with established UK travel brand for launch credibility. |
| 🔴 | **UK ATOL / FCA regulatory timing:** Travel fintech products (Price Lock, Portfolio Protect) require FCA authorisation (6–18 months). Not MVP features. Fintech revenue is a Year 2+ story. | High | Revenue model must be viable without fintech at scale. Bed bank + subscription path to breakeven at 800–1,200 users. |

---

## 7. Data Sources and Confidence

| Claim | Source | Confidence |
|---|---|---|
| 61% YoY growth in UK AI travel platform usage | research-3-ai-travel.md §5 (Travolution report) | High — cited primary research |
| 44% of UK consumers cite personalisation as #1 pain | research-3-ai-travel.md §5 (Travel and Tour World report) | High — cited primary research |
| No platform combines preference graph + portfolio + UK-native | research-3-ai-travel.md §6–7 (capability gap matrix) | High — competitor-by-competitor verification |
| Mindtrip TUI partnership not live in UK as of Feb 2026 | research-3-ai-travel.md §1.1 | High — confirmed from TUI announcement |
| LoveHolidays 9.9% take rate on £2.9B GTV | discovery.md §Viability (R5) | High — public financial data |
| Bed bank gross margin 13–26% on hotel component | discovery.md §Viability (R6) | High — RateHawk net rate model verified |
| ATOL Small Business cost £3,200–4,700, ~12 weeks | discovery.md §Feasibility | Medium — estimated from CAA guidance, subject to change |
| Expedia Romie as closest incumbent to cross-trip learning | research-3-ai-travel.md §2.3, §7 | High — competitor analysis confirms |
| Booking.com ~$5B performance marketing spend | discovery.md (swarm analysis) | Medium — estimate from public sources |
| 300+ planning startups failed at booking leakage | discovery.md §Kill Signals | High — cited in Desti post-mortem and category analysis |

---

## 8. Links and Backlinks

- [[01-bmc-current]] — Revenue streams and cost structure (bed bank vs. affiliate)
- [[03-value-proposition-canvas]] — Customer jobs, pains, gains that the blue ocean factors address
- [[04-swot-confrontation]] — Strengths HP raises, Weaknesses HP accepts, Opportunities in the gap
- [[05-five-forces]] — Why the industry is 2.5/5 attractive and how HP's positioning escapes commodity dynamics
- [[07-five-choices]] — How to Win choices that operationalise the four actions
- [[08-strategy-kernel]] — Kernel that unifies the blue ocean logic into a single strategic statement
- [[12-decision-tree]] — Gate 1 messaging test validates whether portfolio/preference framing converts
- [[13-phase-1-plan]] — RateHawk API sandbox, ATOL authorisation, NLP pipeline as Phase 1 workstreams

**Research inputs:**
- [[research-3-ai-travel]] — Capability gap matrix: all 12 platforms assessed
- [[research-6-bed-banks]] — Bed bank economics: RateHawk, Hotelbeds, dynamic packaging margins
- [[research-5-revenue-models]] — LoveHolidays, OTB, Jet2, Hopper benchmark data

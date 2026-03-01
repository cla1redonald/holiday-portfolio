# ProveIt: Holiday Portfolio

Generated: 2026-02-28
Last updated: 2026-02-28

## Confidence Score
Desirability: 8/10 | Viability: 7/10 | Feasibility: 8/10
Status: Research Round 6 complete — bed bank economics validated, viable path to profitability confirmed

## Idea (Brain Dump)

**One-liner:** A travel personalisation engine that learns how you travel, finds deals you'd love, and manages your year of trips.

**Tagline:** "Start with one trip. See where the year takes you."

A personalisation engine — not a search engine — for travel. Users enter via a city break deal, and the platform learns their travel identity through natural language conversations, searches, and bookings. Over time, it builds a semantic preference graph unique to each user: not just "likes warm places" but a rich model of how they think about travel. The portfolio view tracks their year — budget, trips booked/planned/dreamed — and the recommendation feed gets better with every interaction, like Spotify's Discover Weekly but for holidays.

### How the Product Evolved

| Phase | Reframe | What changed |
|-------|---------|-------------|
| Brain dump | "Holiday subscription — plans your year of travel" | Starting concept: annual budget + portfolio of trips |
| Post-research (R1+R2) | "Cockpit, not autopilot" | Users enjoy planning. Product enhances it, doesn't replace it. |
| Post-strategy analysis | "City break hook, portfolio as loyalty" | 78% prefer spontaneous travel. Don't lead with annual planning — lead with a single trip. Portfolio earns relevance through use. |
| Post-strategy analysis | "Personalisation engine, not search engine" | Every competitor does search + filters. HP competes on relevance. The feed learns from you. |
| Post-competitor research (R3) | "Spotify for holidays + NLP + semantic preference graph" | No competitor builds a visible, structured preference profile from conversation that improves per trip. This is the moat. |

### Product Architecture

- **Hook:** "Find a great deal on your next city break" — NLP input, not filters. Low stakes (£300-500), familiar action, fast booking cycle.
- **First value:** Deal confidence score was right. Good experience. Trust established.
- **Stickiness:** Portfolio view — budget tracker, trip history, "here's what else fits your preferences and budget." Visible from day one, earns relevance after first booking.
- **Personalisation:** Every search, click, bookmark, conversation, and booking trains the recommendation feed. Preference graph visible to the user — "here's what we think you like, is this right?"
- **Loyalty lock:** By trip #3, their travel year lives here. Preferences dialled in. Feed is uniquely theirs. Leaving means starting from scratch with generic recommendations.

### Key Concepts

**1. Portfolio thinking.** Treating your year of travel as a managed set of trips within a budget, not individual transactional bookings. Users arrive via a single trip and discover the portfolio through use, not through a pitch.

**2. Personalisation engine, not search engine.** Skyscanner, Google Flights, and Booking.com compete on price and inventory for users who already know what they want. Holiday Portfolio competes on relevance for users who want to be shown what they'd love. Structural difference: you can't out-search Google, but Google isn't learning how *you* travel across a whole year.

**3. NLP input, not filter search.** Every travel platform uses destination box + date picker + filters. Nobody accepts: "long weekend somewhere warm, under £400, good food scene." HP combines NLP intent parsing with the personalisation engine — "somewhere warm" + [knows you prefer southern Europe, boutique hotels, hate tourist traps] = a specific, personalised recommendation, not a filtered list.

**4. Semantic preference graph.** Natural language and voice input captures what users *mean*, not just what they select. "Somewhere relaxed, local feel, good food" builds a web of connected concepts — travel identity, aesthetic preferences, values. Each conversation enriches the graph. Over time, HP holds a semantic model of how each user thinks about travel. Competitors can copy the UI, the portfolio, even the NLP input — but they can't copy 12 months of conversational preference data. Tech: LLM embeddings + vector DB (commodity infrastructure).

**5. Visible preference profile.** Unlike Expedia Romie or Booking.com (opaque ML), HP shows users their preference graph: "Here's what we think you like — is this right?" Transparency builds trust and directly solves the commission-credibility problem.

### Core Promises
- **Great city break deals** — find your next trip through natural conversation, not filters
- **Learns how you travel** — recommendation feed improves with every interaction. Like Spotify Discover Weekly, but for holidays. Your feed after 6 months is uniquely yours.
- **Seamless planning** — budget, dates, destinations, deals across your whole year, all connected
- **Deal confidence** — "this is a good deal *for you*" based on price history + your preferences + your budget
- **One-click booking** — flights, hotel, car, transfers assembled as a package, booked in one flow
- **Self-serve, user in control** — you discover, you choose, the platform makes it seamless

**What sparked it:** Amadeus Destination Experiences API; Duffel API identified as primary starting point (flights + stays, modern REST API, no IATA required).

**Target user:** Tech-savvy self-serve travellers who take 3+ trips/year (likely including multiple city breaks), enjoy planning but want confidence they're not overpaying. Not age-defined — behaviour-defined. Entry via city break intent; portfolio behaviour emerges through repeat use.

**Current workaround:** Monthly payments to providers like Neilson/OTB fund 2-3 trips per year. Separate research to price-check. Spreadsheets, Notion templates, and mental maths to manage the year. 303 minutes of research per trip across scattered sites. No single tool manages the yearly portfolio.

**Key differentiator vs mass market:** Not a search engine — a deal-finding personalisation engine. Mindtrip ($22.5M, TUI partnership) validates the market for AI travel personalisation but is inspiration-first. HP is price-first. Six clear USPs vs Mindtrip and incumbents:

**USP 1: Price-first, not inspiration-first.** Entry point is "find me a great deal" not "where should I go?" Deal confidence scoring tells users whether a price is good *for them* based on history + preferences + budget. Nobody else does this — it's Hopper's price intelligence fused with personalised discovery.

**USP 2: Annual portfolio with budget tracking.** Every competitor is trip-by-trip. HP tracks your travel year: budget spent/remaining, trips booked/planned/dreamed. "You've spent £1,200 of your £3,500 year. Here's what fits next." This is the retention mechanic that turns one-time users into annual users.

**USP 3: UK-native, ATOL-compliant.** Mindtrip isn't in the UK. Zero AI-native travel startups target UK consumers. UK buyers want ATOL protection on packages — a trust signal no US startup offers. HP is built for the UK market from day one.

**USP 4: Visible preference profile.** Every platform that personalises does it behind an opaque ML model. HP shows users their preference graph: "Here's what we think you like — is this right?" Transparency builds trust, solves the commission-credibility problem, and makes users invest in the platform.

**USP 5: Deal monitoring and alerts.** Mindtrip doesn't watch prices. HP monitors destinations you care about and alerts you when prices drop: "Porto just hit £240 for your May dates — 30% below average." This is Going.com's model ($49/yr, 2M subscribers) fused with personalised preference matching. Creates ongoing engagement between bookings.

**USP 6: Multi-API package assembly.** Mindtrip books through one supplier (TUI). HP assembles packages from Duffel (flights) + hotel APIs + Cartrawler (cars) — more inventory, more flexibility, more room for fintech layering (Price Lock, Portfolio Protect).

**MVP scope:** Flights, hotels, car hire, transfers. NLP input from v1. Preference graph basic in v1 (explicit preferences + booking history), semantic embeddings in v2. Experiences/activities later.

---

## Discovery

### Desirability
- Target user: Tech-savvy self-serve travellers, 3+ trips/year, mix of budget and premium
- Current workaround: Monthly payments to Neilson/OTB + ad hoc research + separate bookings + spreadsheets/Notion
- Pain level: Planning friction is real (303 min research per trip, Expedia n=5,713). Frequent travellers enjoy planning but hate the fragmentation and deal uncertainty across multiple trips.
- Portfolio behaviour exists: 14% of 16-24s have 3+ trips booked simultaneously. 20% of UK adults had 2+ international trips booked for following year. Sunshine Saturday: 4.3M ATOL bookings in Jan 2025.
- Switching behaviour: Travel agent usage doubled among UK 18-24s (26%→48%). 53% of high-income households use agents. People ARE paying for seamless planning — through humans.
- Key insight (from swarm 2): People pay for ORGANISATION (TripIt, 20M users) and CURATION by humans (agents). The product opportunity is seamless planning tools + deal confidence — user stays in control, platform enhances the process.
- Personalisation demand (from R3): 44% of UK consumers cite lack of personalisation as #1 pain point. 52% of 25-34s frustrated by lack of personalisation. 37% frustrated by time filtering irrelevant options. 61% YoY growth in UK AI travel usage.
- Reframe resolves: Autonomy (cockpit not autopilot), planning pleasure (enhances not replaces), spontaneous preference (city break hook), commission-credibility (visible preference graph + deal scoring transparency)
- Distribution: City break deals as hook — low barrier entry. Landing page test recommended with three variants.

### Viability
- Business model: Commission on bookings + premium subscription + fintech (phased). Zero consumer cost barrier at entry.
- Market size: UK outbound travel $98B+, 94.6M overseas trips in 2024. Frequent travellers (<3% pop) take 30% of journeys.
- **Mindtrip validates the category:** $22.5M raised, TUI partnership, Amex/Capital One/United investors. Proves market demand for AI personalised travel.

**Competitor revenue benchmarks (Research Round 5):**
- LoveHolidays: £288M rev, £83M EBITDA (28.8% margin), ~£115 revenue per booking, ~9.9% take rate on £2.9B GTV. Dynamic packaging = zero inventory risk.
- On The Beach: £209 margin per booking, 29% EBITDA margin. Proving premium bookings increase margin.
- Jet2: Flight-only = £18 profit/passenger. Package = £98 profit/passenger (5.4x). Ancillaries £89.99/passenger.
- Hopper: $850M revenue, 70% from fintech. Price Freeze = options contract (~$30 deposit). 60%+ fintech attach rate. B2B arm (HTS) = 75% of business.
- Going.com: 2M+ subscribers at $49/yr. 80%+ gross margin. But capped — monetises discovery, not booking.
- Secret Escapes: £170M revenue but only £1.6M operating profit. Margin ceiling for flash-sale model.

**Bear case reality check (Research Round 5):**
- Affiliate-only commission = 4% from Booking.com. At £30-40 per booking, unit economics don't survive paid CAC.
- 300+ planning startups failed at booking leakage. Desti (SRI/Siri team): users loved it, booked on Booking.com anyway.
- Travel fintech (Price Lock, CFAR) requires FCA authorisation in UK — 6-18 months. Not an MVP feature.
- CAC in UK travel likely £80-200+ for new entrant with no brand.

**Bed bank channel changes everything (Research Round 6):**
- **RateHawk** = starting point. Free API access, no minimum volume, net rate model, self-service signup, 2.5M+ properties. Buy at net, sell at net + your markup. Modern REST API with sandbox.
- **Hotelbeds** = scale play (300K+ properties, 80K bookings/day). Needs commercial negotiation and booking history. Path: build on RateHawk → approach Hotelbeds at Month 3-6.
- **TravelgateX** = aggregator (one GraphQL API → 1,000+ suppliers). Phase 2 option to expand inventory without multiple integrations.
- **Duffel Stays** exists but is commission-share, not net rate. Good for fastest MVP, dead end for margin control.
- **Bed bank margins:** Hotels discount 20-30% below retail for wholesalers. Small operator can add 15-35% markup on net rate = **13-26% gross margin on hotel component**. Net rates yield 2-3x more margin than affiliate commission on the same booking.
- **Dynamic packaging:** Duffel flight (net) + RateHawk hotel (net) + your markup = retail package price. This is how LoveHolidays works (9.9% take rate on £2.9B GTV). Booking.com can't match packages — they don't sell flights.
- **ATOL:** Required for flight+hotel packages. Small Business ATOL costs ~£3,200-4,700, takes ~12 weeks. ABTOT franchise ATOL available from ~£942 as bridge.

**Revenue stream priority (revised with bed bank channel):**
1. Affiliate booking (Day 1) — prove the flow works. 4-8% commission. Validate demand.
2. Bed bank net rate (Month 2-3) — RateHawk API. Buy wholesale, sell at markup. 15-25% margin on hotel.
3. Dynamic packages (Month 4-6, post-ATOL) — Duffel flights + RateHawk hotels + markup. This is the economic unlock.
4. Ancillary affiliate (Day 1) — insurance 15-20%, activities 8-15%, car hire 8-12%.
5. Premium subscription (Month 6-12) — £59.99/yr. Preference graph features. 48.7% trial-to-paid conversion.
6. Fintech products (Year 2+, FCA required) — Price Lock, Portfolio Protect.
7. B2B API (Year 3+) — licence preference engine (Hopper HTS model).

**Revised unit economics (with bed bank):**

| Model | Hotel (2 nights, £160 net) | Flight (Duffel) | Markup/commission | Per-booking revenue |
|-------|--------------------------|-----------------|-------------------|-------------------|
| Affiliate only | 4% of £200 = £8 | ~£5 | — | **£13** |
| Bed bank + markup | Buy £160, sell £200 | ~£5 | 25% hotel markup | **£45** |
| Dynamic package | Buy £160 hotel + £120 flight | — | Package markup 15-20% | **£50-60** |

At 3 bookings/user/year with bed bank:
- Conservative (20% markup): ~£135/user/year
- Base (25% markup + ancillaries): ~£180-220/user/year
- With subscription: +£60/year from premium users
- Breakeven: ~800-1,200 users at small team scale (vs 2,500+ on affiliate-only)

**The path:** Start affiliate → prove demand → RateHawk API → ATOL → dynamic packages → scale.

**Strategic imperative:** Grow through organic/low-CAC channels early. Bed bank net rates make unit economics viable at much lower scale than affiliate-only. Subscription adds predictable revenue. Package booking is the real margin.

- Biggest business risk: Planning-to-booking leakage. Must own full booking funnel OR accept affiliate economics + subscription as bridge.
- January concentration: 35% of annual bookings in 4-6 week window. Deal alerts + portfolio view create year-round engagement.
- Full analysis: research-5-revenue-models.md, research-5-revenue-risks.md

### Feasibility
- **Verdict (Research Round 4): Buildable within £50-100K.** Stack is proven by Expedia, Tripadvisor, Spotify. Risk is sequencing, not capability.
- **Travel data layer:** Duffel API (flights + stays, modern REST, no IATA required, $3/order + 1%). Car: Cartrawler/Jayride. Experiences later (Viator/GetYourGuide).
- **NLP intent parsing:** Claude Haiku or GPT-4o mini. <600ms latency, ~£0.006/user/month. Reliably extracts structured intent from conversational travel queries. Solved problem, no fine-tuning needed.
- **Semantic preference graph:** pgvector (Supabase, free) → Qdrant Cloud at scale. OpenAI text-embedding-3-small (1,536 dimensions). 100K users = ~£150/month vector storage. Store per-user preference embeddings enriched by every NLP conversation, search, click, and booking.
- **Recommendation engine (phased):** Phase 1: cosine similarity (user vector vs destination vector, no ML framework, 6-8 weeks). Phase 2: collaborative filtering at 5K+ users. Phase 3: two-tower neural network at 50K+ users (Expedia's architecture).
- **End-to-end latency:** NLP parse (600ms) + preference lookup (50ms) + candidate generation (100ms) + live pricing (1,500ms parallel) + ranking (100ms) = ~2,350ms. Under 3 seconds. Key: show destination cards instantly with cached prices, live pricing on click.
- **AI infrastructure costs:** 1K users = ~£46/month. 10K = ~£190/month. 100K = ~£1,110/month. Negligible at startup scale.
- **ATOL compliance:** Required for UK packaged travel. Whitelabel ATOL holder initially (£20-50K).
- **Critical risks:** (1) Cold start — preference graph needs data. Mitigation: designed onboarding conversation + archetype priors + taste calibration swipe. (2) ETL complexity — 80% of work is data pipelines, not ML. Must build simple first.
- **Precedents:** Spotify Discover Weekly (pre-computation + taste clustering), Netflix SemanticGNN (knowledge graph for cold start), Expedia two-tower architecture, Tripadvisor semantic search (Qdrant + embeddings). SPiKE paper (2025) describes exactly this architecture.
- Duffel contact: PM knows someone at Duffel — key relationship for commercial terms and technical onboarding
- Full technical research: research-4-tech-feasibility.md

---

## Competitive Landscape (Research Round 3)

### AI Travel Competitor Matrix

| Capability | Mindtrip | Layla | Booking.com | Expedia Romie | Google | **Holiday Portfolio** |
|---|---|---|---|---|---|---|
| NLP input | Yes | Yes | Yes | Yes | Yes | Yes |
| Persistent preference learning | Claimed | No | Implicit | Claimed/opaque | Implicit | **Explicit + visible** |
| Semantic preference graph | No | No | No | No | No | **Yes** |
| Preference visible to user | No | No | No | No | No | **Yes** |
| Improves per completed trip | Unverified | No | No | Claimed | No | **Yes** |
| Portfolio model | No | No | No | No | No | **Yes** |
| UK-native product | No (US) | No (US) | No (NL) | No (US) | No (US) | **Yes** |

### Key Findings
- **Mindtrip is the primary competitor.** $22.5M funded, TUI booking partnership, live product, NLP personalisation. Validates the market. But: inspiration-first (not price/deal), no portfolio/budget view, no UK presence, no deal confidence scoring, no visible preference profile, no deal alerts. HP differentiates on 6 USPs (see above).
- **Mindtrip validates the thesis.** TUI investing in AI personalised travel booking proves the market wants this. HP doesn't need to prove the category — it needs to prove it can win the UK slice with a price-first, portfolio-based approach.
- **Expedia Romie** is the incumbent to watch — closest to cross-trip learning, opaque ML
- **Tripadvisor** has vector DB infrastructure (Qdrant, semantic embeddings) but uses it for content, not users
- **UK market wide open:** 61% YoY AI travel adoption growth, 44% cite personalisation as #1 pain, zero AI-native domestic competitors
- Full analysis: research-3-ai-travel.md

---

## Research Files
- research-1.md — 13 competitors mapped, whitespace confirmed for portfolio frame, tarpit flag on planning layer (2026-02-28)
- swarm-1-synthesis.md — Deep dive: viability of commission-based portfolio platform at startup scale (2026-02-28)
- swarm-2-synthesis.md — Deep dive: desirability evidence — planning pain real, reframe to "seamless planning tool" addresses key risks (2026-02-28)
- research-3-ai-travel.md — AI travel competitor landscape: 12 platforms assessed, semantic preference graph + portfolio combination confirmed as unoccupied whitespace (2026-02-28)
- research-4-tech-feasibility.md — Technical feasibility of personalisation engine: NLP parsing, vector DBs, recommendation architecture, cost modelling, risk assessment. Verdict: buildable within £50-100K (2026-02-28)
- research-5-revenue-models.md — Competitor revenue deep dive (LoveHolidays, OTB, Jet2, Hopper, Going.com, Secret Escapes) + revenue stream analysis + unit economics model (2026-02-28)
- research-5-revenue-risks.md — Bear case: why travel startups fail financially, real margin problems, fintech regulation risks, honest revenue assessment (2026-02-28)
- research-6-bed-banks.md — Bed banks and wholesalers: RateHawk, Hotelbeds, TravelgateX, dynamic packaging, ATOL, margin reality. Bed bank net rates yield 2-3x affiliate margins (2026-02-28)

## Strategy Artefacts
- strategy/00-gap-analysis.md — Synthesis of all 13 framework artefacts, revenue model, critical gaps
- strategy/01-bmc-current.md — Business Model Canvas (Obsidian)
- strategy/03-value-proposition-canvas.md — Value Proposition Design (Obsidian)
- strategy/04-swot-confrontation.md — SWOT + Confrontation Matrix
- strategy/05-five-forces.md — Porter's Five Forces (2.5/5 — unattractive but profitable at scale)
- strategy/06-blue-ocean.md — Blue Ocean Strategy Canvas
- strategy/07-five-choices.md — Playing to Win
- strategy/08-strategy-kernel.md — Strategy Kernel (Rumelt)
- strategy/09-wardley-map.md — Wardley Map
- strategy/10-opportunity-trees.md — Opportunity Solution Trees
- strategy/11-wwhtbt-conditions.md — WWHTBT Conditions
- strategy/12-decision-tree.md — Decision Tree (5 gates, ~£48k to scale decision)
- strategy/13-phase-1-plan.md — Phase 1 Plan

## Kill Signals
- **Tarpit flag (planning layer):** 300+ failed planning startups. Portfolio model + personalisation engine + NLP positioning are structural differences vs. pure planning tools. Flag, not kill.
- **Planning-to-booking leakage:** Must own full booking funnel (Duffel enables this). If users plan here and book on Booking.com, the model fails. City break hook + deal confidence scoring + in-platform package booking are the mitigation.
- **Planning as pleasure:** RESOLVED by reframe 1 — product enhances planning rather than replacing it. User stays in control.
- **Spontaneous vs. portfolio contradiction:** RESOLVED by reframe 2 — city break hook doesn't require portfolio buy-in. 78% spontaneous preference is fine — they enter via a single trip, portfolio emerges through repeat use.
- **Commission-credibility:** RESOLVED by reframe 3 — visible preference graph + transparent deal confidence scoring. User can see *why* a deal is recommended. Unlike opaque incumbent ML, HP shows its working.
- **Mindtrip as direct competitor:** SERIOUS. Mindtrip ($22.5M funded, TUI partnership, live product) does NLP travel planning with preference learning and booking integration. Core experience overlaps significantly with HP. However: Mindtrip is inspiration-first not price-first, has no annual budget/portfolio view, no deal confidence scoring, no UK presence (TUI partnership covers Belgium/Germany/Ireland/Netherlands only), no visible preference profile, no deal monitoring/alerts, and books through single supplier (TUI) not multi-API packages. Mindtrip validates the market — proves demand for AI personalised travel. HP differentiates on price focus, UK market, portfolio frame, transparency, and deal intelligence. Must monitor Mindtrip UK expansion closely.
- **Incumbent AI threat:** MONITORED — Expedia Romie is closest to cross-trip preference learning among incumbents. (research-3-ai-travel.md)
- **NLP/personalisation as table stakes:** Research Round 3 confirms NLP input is now table stakes. The differentiation is NOT "we have NLP" — it's the combination of price-first positioning + visible preference graph + annual portfolio + deal intelligence + UK-native.

## Recommendation
Strong concept with confirmed competitive whitespace, technical feasibility, and credible path to profitability across six research rounds. Scores at 8/7/8. Mindtrip ($22.5M, TUI) validates the category but differentiates on inspiration, not price/deals. HP's six USPs are clear: price-first positioning, annual portfolio with budget, UK-native ATOL, visible preference profile, deal monitoring/alerts, multi-API packages. The bear case on affiliate economics was sobering — but bed bank net rates (Research Round 6) fundamentally change the picture: £45-60/booking vs £13 affiliate-only, breakeven at 800-1,200 users vs 2,500+. RateHawk provides free API access with no minimum volume. Dynamic packaging (Duffel flights + RateHawk hotels) mirrors LoveHolidays' model at startup scale. The path forward: (1) affiliate to prove demand, (2) RateHawk bed bank for real margins, (3) ATOL for dynamic packages, (4) subscription + fintech layered on top. Recommend Gate 1 messaging test (three variants: city break deal, portfolio planning, personalised deal feed) + 8-10 user interviews + RateHawk API sandbox evaluation before platform build.

## Validation Playbook
See strategy/12-decision-tree.md — 5 phase gates, £48k total to scale decision. Kill at Gate 3 costs <£2,500.

## Gamma Deck
V1 (pre-reframes): https://gamma.app/docs/2x80cm9k9z9r1ay
V2 (full evolved concept): https://gamma.app/docs/zddjw1pb9ce2q8t
V3 (complete — 6 research rounds, bed bank model, strategy synthesis): https://gamma.app/docs/1z1d4r7omx2801k

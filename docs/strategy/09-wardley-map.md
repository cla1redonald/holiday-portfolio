# Wardley Map Analysis — Holiday Portfolio

**Date:** 2026-02-28
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Owner:** Product Strategy
**Status:** Research Rounds 1–6 complete — all capability placements evidence-based

---

## What Wardley Mapping Shows

A Wardley Map plots capabilities on two axes:

- **Y-axis (Value Chain):** User-facing (top) → back-end infrastructure (bottom). Higher = more visible to the user and more directly connected to the user need.
- **X-axis (Evolution):** Genesis → Custom Built → Product → Commodity. Further right = more standardised, more available, less differentiated.

The strategic rule: **invest engineering time and capital where the capability sits left (novel, differentiating)**; outsource or buy where it sits right (solved, commodity). Getting this wrong in either direction destroys value — over-building commodity is waste; under-investing in Genesis is competitive suicide.

---

## Evolution Axis Definitions

| Stage | Description | Strategic Signal | Decision Rule |
|---|---|---|---|
| **Genesis** | New, poorly understood. No standard approach. High uncertainty, high potential differentiation. | Experiment. Accept failure. Protect learnings. | Build internally. Do not outsource what you don't yet understand. |
| **Custom Built** | Exists but bespoke to each player. No off-the-shelf option. Best practice not yet codified. | Build if it differentiates. Buy time if it doesn't. | Build with a clear owner. Plan for it to evolve toward Product. |
| **Product** | Packaged offerings emerge. Best practices forming. Multiple vendors. Feature parity narrowing. | Buy or partner unless you have unique IP to layer on top. | Buy the best available. Don't rebuild what already exists. |
| **Commodity** | Utility. Interchangeable across providers. Price-driven. No strategic value in building. | Use the cheapest/most reliable. Never build. | Outsource entirely. Treat as infrastructure cost. |

---

## User Need (Map Anchor)

**"Personalised travel deals that learn my preferences"**

This is the terminal user outcome the entire value chain serves. Every capability below is only valuable insofar as it contributes to this experience. The personalisation engine — and specifically the semantic preference graph — is what differentiates this user need from being served by Google Flights, Booking.com, or Skyscanner.

Evidence of need:
- 44% of UK consumers cite lack of personalisation as their #1 travel pain point (research-3-ai-travel.md)
- 52% of 25–34s frustrated by lack of personalisation in travel tools (research-3-ai-travel.md)
- 37% frustrated by time spent filtering irrelevant options (research-3-ai-travel.md)
- 303 minutes average research time per trip across scattered sites (Expedia, n=5,713)
- Zero AI-native travel startups currently targeting UK consumers with a price-first personalisation engine (research-3-ai-travel.md)

---

## Full Capability Map

### Layer 1: User-Facing (Visible to Customer)

These capabilities are directly experienced by users. Poor execution here loses users. But this layer is not where the moat lives — the moat lives in Layer 2 (personalisation). The UI must be excellent, but the NLP interface and deal feed derive their value from the personalisation engine beneath them.

| Capability | Evolution Stage | Build / Buy / Partner | Rationale | Owner | Flags |
|---|---|---|---|---|---|
| **NLP interface** — conversational travel query input ("long weekend somewhere warm, under £400, good food scene") | Product → Commodity | **Buy** (Claude Haiku / GPT-4o mini as API) | LLMs now reliably extract structured intent from travel queries. Claude 3.5 Haiku: ~300–500ms end-to-end, ~£0.00021/query. GPT-4o mini: ~200–400ms, ~£0.00011/query. ScienceDirect (2025) confirmed modern LLMs outperform traditional NLU for open-ended travel queries. No fine-tuning needed at startup scale. This is **commodity infrastructure**, not differentiation. | Tech lead | 🟢 Solved problem. Do not build. |
| **Preference dashboard** — visible preference profile ("here's what we think you like — is this right?") | Custom Built | **Build** | No competitor surfaces a visible, user-editable preference graph. Booking.com, Expedia Romie, Mindtrip all use opaque ML. Transparency is the trust mechanism and the commission-credibility solution (research-3-ai-travel.md). This UI is genuinely novel — but it is a thin display layer on top of the semantic preference graph (Layer 2). | Product / Tech | 🟢 Build. Core differentiator UI. |
| **Deal feed** — ranked, personalised stream of matched packages | Custom Built | **Build** (UI) / **Buy** (ranking signals) | The feed surface is custom. The ranking signals (price history, preference match, budget fit) come from Layer 2 engines. The display pattern is analogous to Spotify Discover Weekly — well-understood UX, no need to invent. Invest in the ranking logic, not the feed UI. | Product | 🟡 UI is straightforward. Don't over-engineer the feed component itself. |
| **Portfolio view** — annual trip tracker: budget allocated/spent/remaining, trips booked/planned/aspirational | Genesis | **Build** | No travel product frames a year of trips as a managed portfolio. Closest analogues are personal finance dashboards (YNAB, Monzo). This is the primary retention surface — users return to check their portfolio, not just to browse deals. Genuine whitespace. | Product | 🟢 Build. This is the product's identity. |
| **Booking flow** — flight + hotel + car + transfer assembled as one package | Custom Built | **Build** (orchestration) / **Partner** (APIs) | The orchestration logic — holding bookings, collecting payment, confirming simultaneously — is custom. The underlying components (Duffel for flights, RateHawk for hotels) are bought. ATOL compliance wraps the assembled package. LoveHolidays executes this at 9.9% take rate on £2.9B GTV — the model is proven. | Tech | 🟡 Complex orchestration. Build on top of commodity APIs. Phase behind ATOL approval. |
| **Deal confidence score** — "this is a good deal for you" based on price history + preferences + budget | Custom Built | **Build** | No competitor surfaces deal quality scoring at the individual level. Hopper does price prediction (95% accuracy, 8+ years historical data — not replicable at startup scale). HP's deal confidence is preference-aware scoring, not just price prediction. Rules-based v1 (price vs 90-day history + preference match + budget fit); ML-improved at sufficient data volume. | Product / Tech | 🟡 Build phased: rules-based v1 → statistical v2 → ML v3 at 50K+ bookings |
| **Price monitoring and alerts** — notify user when watched destinations drop to match budget | Custom Built | **Build** (logic) / **Buy** (notifications) | Alert logic (preference-matched, budget-aware, destination-specific) is custom. Delivery infrastructure (email via SendGrid, push via Firebase/OneSignal) is commodity. Going.com ($49/yr, 2M subscribers, 80%+ gross margin) validates demand for deal alerts — HP's version is personalised, not broadcast. Core retention mechanic between booking events. | Tech | 🟢 Build alert logic. Buy notification delivery. |

---

### Layer 2: Personalisation (The Competitive Moat)

This is the map's most important layer. The semantic preference graph sits at Genesis/Custom — it is what no competitor has built, it is what takes 12+ months of conversational data to develop, and it is what makes the recommendation feed uniquely valuable over time. Everything in this layer is build.

🔴 **Key contradiction identified:** The existing 09-wardley-map.md placed hotels with "Duffel Stays" as the supply recommendation. Research Round 6 (research-6-bed-banks.md) directly contradicts this: Duffel Stays is a commission-share model (percentage undisclosed, paid post-stay) with no pricing control — structurally a dead end for a dynamic packaging product. RateHawk net rate model (buy at net, add 15–35% markup) yields 2–3x the margin. This has been corrected below and in Layer 3.

| Capability | Evolution Stage | Build / Buy / Partner | Rationale | Owner | Flags |
|---|---|---|---|---|---|
| **Semantic preference graph** — per-user embedding encoding travel identity across climate preference, cuisine culture, trip type, budget psychology, pace, aesthetic style, destination history | Genesis / Custom Built | **Build** | This is the moat. No competitor has built this (confirmed: Mindtrip, Layla, Booking.com, Expedia Romie, Google all lack visible semantic preference graphs — research-3-ai-travel.md). Infrastructure is commodity (pgvector/Qdrant, OpenAI embeddings at $0.02/1M tokens). The data is proprietary — 12 months of conversational preference signals from each user cannot be replicated by a new entrant. Copying the UI takes weeks; copying 12 months of user data is impossible. Architecture: OpenAI text-embedding-3-small (1,536 dimensions) stored in pgvector (Supabase, free tier covers 50K users) → Qdrant Cloud at scale (~£100–200/month at 100K users). SPiKE paper (2025) describes exactly this architecture. | Tech | 🟢 This is the investment. Build with care. Cold-start risk — see flags. |
| **Recommendation engine** — matching user preference vector to destination/inventory vectors | Custom Built | **Build** (logic) / **Buy** (frameworks) | Phase 1: cosine similarity (user preference embedding vs destination embedding, 6–8 weeks to build, no ML framework needed). Phase 2: collaborative filtering at 5K+ users ("users similar to yours loved Lisbon and Tbilisi"). Phase 3: two-tower neural network at 50K+ users — Expedia's documented architecture (Two-Tower Neural Network, published). TensorFlow Recommenders (TFRS) is the open-source framework. IEEE (2025): hybrid models reach precision 0.85, recall 0.83, F1 0.84 on travel datasets. Hopper: 25% of bookings come from AI-suggested trips the user did not explicitly search for. | Tech | 🟡 Phased. Don't build two-tower before you have data. Cosine similarity is sufficient at MVP scale. |
| **NLP intent parsing** (backend) — structured JSON extraction from conversational travel queries | Product / Commodity | **Buy** (LLM API) | Claude 3.5 Haiku or GPT-4o mini as the parser. ~£0.006/user/month at 3.5 sessions × 15 queries. End-to-end latency target: <600ms — achievable (benchmarked). No fine-tuning needed. Merging session intent with persistent preference embedding is the custom logic, not the parsing itself. | Tech | 🟢 Buy the LLM. Build the intent-merging logic. |
| **Cold start resolution** — generating preference signal before booking history exists | Custom Built | **Build** | New users have no preference history. Three mitigations: (1) 3–5 question NLP onboarding conversation ("best trip you ever took?") generates enough signal to seed the preference vector; (2) archetype priors — cluster new users into travel archetypes (city break cultural explorer, beach hedonist, adventure seeker) based on stated preferences; (3) Booking.com cold-start technique (IP + browser settings for geo-inference) — replicable. Research consensus: 5–10 meaningful interactions before collaborative filtering adds value; content-based recommendations useful from interaction 1. | Product | 🟡 High risk. Instrument from day one. Onboarding quality directly determines Month 1 retention. |
| **Deal scoring engine** — price distribution modelling and deal quality ranking per user | Custom Built | **Build** | Rules-based v1 (price vs 90-day history + preference match % + budget fit). Proprietary once booking volume provides a price distribution dataset. Hopper ingests 300 billion prices/month — not replicable at startup. HP's competitive edge is not raw price prediction but preference-weighted deal scoring: a £300 Porto flight is a great deal for a user with Porto in their preference graph and £400 remaining in their Q2 budget, a mediocre deal for everyone else. | Tech | 🟡 Heuristics to start. Do not attempt ML until 50K+ bookings. |
| **Package assembler** — orchestrate Duffel flight + RateHawk hotel + Cartrawler car into one coherent package with net pricing | Custom Built | **Build** | Complex orchestration: hold flight booking → hold hotel booking → collect customer payment → confirm both → handle failures and rollbacks. No off-the-shelf solution. LoveHolidays executes this (£288M revenue, 28.8% EBITDA margin). The orchestration logic is custom; the APIs are bought. ATOL compliance wraps the assembled package. | Tech | 🔴 Critical path. ATOL must be in place before selling flight+hotel as a package. Phase to Month 4–6. |

---

### Layer 3: Travel Supply (APIs and Partners)

The supply layer is almost entirely Product/Commodity — buy or partner. The one exception is ATOL compliance, which sits at Custom Built due to the UK regulatory specificity.

🟡 **Gap identified:** The previous version of this document recommended Duffel Stays as the hotel layer. Research Round 6 definitively shows this is wrong for a margin-focused dynamic packaging model. Duffel Stays is commission-share (undisclosed %, paid post-stay, no pricing control). RateHawk is net rate (buy at net, sell at net + your markup, immediate pricing control, free API access, no minimum volume). This update reflects the corrected supply chain.

| Capability | Evolution Stage | Build / Buy / Partner | Rationale | Owner | Flags |
|---|---|---|---|---|---|
| **Duffel flights API** — IATA-free flight search, booking, and management | Product | **Partner** (Duffel) | Modern REST API. No IATA required. Pricing: $3/confirmed order + 1% managed content + $2/ancillary. Self-service signup. PM has relationship at Duffel — commercial priority. 🔴 Amadeus self-service EOL July 2026 removes the only credible alternative. Commit to Duffel. Duffel search queries are free — only confirmed bookings incur cost. Build abstraction layer. | Tech | 🔴 Single supplier dependency. Negotiate contractual protections. Build abstraction layer. |
| **RateHawk hotels API** — net rate hotel access, 2.5M+ properties, 260+ wholesaler partners | Product | **Partner** (RateHawk) | Free API access. No minimum volume. No upfront deposit. Net rate model: buy at net (typically 20–30% below retail BAR), sell at net + markup (15–35%). RateHawk REST API v3 (2024). Sandbox launched Q4 2024/2025. Yields 2–3× the margin of affiliate commission on the same booking: commission 10% on £200 = £20; net rate buy £140, sell £180 = £40 (research-6-bed-banks.md). UK team active, 20+ account managers. Signed up in Phase 1 — no barriers. | Tech / Commercial | 🟢 Starting point confirmed. Free, instant access, correct commercial model. |
| **Hotelbeds** — scale play at 300K+ directly contracted hotels, 80K bookings/day | Product | **Partner** (Hotelbeds, Month 3–6) | Scale play once booking history exists. Production access requires commercial negotiation and booking data. Sandbox: free, immediately available at api.test.hotelbeds.com (50 requests/day evaluation tier). Modern REST/JSON (APItude suite). Approach with 2–3 months of RateHawk booking data as commercial leverage. SHA-256 auth, Swagger specs, Postman collections. Net rate model identical to RateHawk. | Commercial | 🟡 Gate behind booking history. Do not attempt commercial negotiation at zero volume. |
| **TravelgateX** — aggregator: one GraphQL API → 1,000+ suppliers including Hotelbeds and WebBeds | Product | **Partner** (Phase 2, Month 6–12) | One integration accesses multiple bed banks normalised. Test credentials immediate (test0000-0000-0000-0000-000000000000). Operations: Search → Quote → Book. Commercial arrangements with each underlying supplier still required, but TravelgateX normalises the data. Reduces ongoing technical overhead of managing multiple bed bank integrations. Phase 2 option to expand supply without building multiple additional integrations. | Tech / Commercial | 🟡 Phase 2. Evaluate after Hotelbeds direct relationship established. |
| **Package assembly — ATOL compliance** — Air Travel Organiser's Licence, required for UK flight+hotel packages under Package Travel Regulations 2018 | Custom Built | **Partner initially → Build** (own licence at scale) | Required by law. Dynamic packaging (Duffel flight + RateHawk hotel + markup = retail package) is a licensable activity. Small Business ATOL: ~£3,200–4,700 total, ~12 weeks lead time, £30,000 share capital required (research-6-bed-banks.md). ABTOT franchise ATOL available from ~£942 as immediate bridge. Apply Month 1 (12-week runway). Do not sell flight+hotel as a package before licence is in place. Failing to comply = criminal liability. | Legal / Commercial | 🔴 Apply immediately. Do not skip. ABTOT franchise as bridge if ATOL delayed. |
| **Car hire** — rental car content and booking | Product | **Partner** (Cartrawler or RentalCars Connect) | Aggregators give broad coverage. Cartrawler powers Ryanair, TUI, British Airways. Commission 8–12%. No build case. | Tech | 🟢 Partner. Validate destination coverage before committing. |
| **Transfers** — airport-to-hotel, private hire | Product | **Partner** (Jayride or Holiday Taxis) | Commission model 8–12%. Narrow inventory needed (target city break destinations). | Tech | 🟢 Partner. Lower priority than flights/hotels at MVP. |
| **Ancillary — travel insurance** | Product | **Partner** (affiliate) | 15–20% commission on travel insurance (research-5-revenue-models.md). White-label from Cover Genius or Battleface. FCA authorisation required to underwrite — partner, never build. | Commercial | 🟡 Strong margin but FCA complexity. Partner only. |
| **Activities and experiences** | Product | **Partner** (Viator / GetYourGuide affiliate) | 8–15% commission. Phase 2 — not MVP. Adds deal basket size but complex to integrate pre-scale. | Tech | 🟢 Phase 2. |

---

### Layer 4: Data Infrastructure

The data layer that enables the personalisation engine. pgvector/Qdrant and LLM APIs are now Product/Commodity — the marginal cost of storing preference embeddings is near-zero. The value is not the data infrastructure; it is the proprietary data that lives in it.

| Capability | Evolution Stage | Build / Buy / Partner | Rationale | Owner | Flags |
|---|---|---|---|---|---|
| **Vector DB / pgvector** — store per-user preference embeddings (1,536-dimensional vectors) | Product | **Buy** (Supabase pgvector → Qdrant Cloud at scale) | pgvector (Supabase): free tier covers ~50K user profiles at 1,536 dimensions. pgvectorscale achieves 1.5× higher query throughput than Pinecone at 79% lower cost (Supabase benchmark 2025). At 100K users: ~£100–200/month. At 10K users: ~£25/month. p99 < 200ms vector similarity search — achievable at startup scale. Qdrant Cloud at 100K+ users for dedicated infrastructure. Pinecone: not recommended — costs >$500/month at scale with no compensating advantage. | Tech | 🟢 Buy. Infrastructure cost, not competitive advantage. |
| **LLM APIs** — NLP parsing and preference synthesis | Commodity | **Buy** (Anthropic / OpenAI APIs) | Claude 3.5 Haiku: $0.25/$1.25 per 1M tokens (input/output). GPT-4o mini: $0.15/$0.60. Total LLM cost at scale: ~£0.02–0.05/user/month. Negligible. 1K users = ~£46/month total AI infrastructure. 10K = ~£190/month. 100K = ~£1,110/month. These costs do not justify any in-house model hosting. | Tech | 🟢 Buy. Cost is negligible. Do not build. |
| **Embeddings** — OpenAI text-embedding-3-small (1,536 dimensions) | Product | **Buy** (OpenAI API) | $0.02/1M tokens. Re-embed user profile after each booking (~1,000 tokens/update, ~0.25 updates/month). Cost: ~$0.000005/user/month. Generating destination embeddings for the knowledge base: one-time cost, maintainable thereafter. Tripadvisor's approach (embed destinations from review text + POI descriptions + attributes) is the model. "Somewhere like Valencia but cheaper" = cosine similarity against Valencia's embedding, filtered by price bracket. | Tech | 🟢 Buy. Trivial cost. |
| **Inventory cache / price distribution store** — pre-fetch and cache price distributions for fast feed generation | Custom Built | **Build** (data model) / **Buy** (infrastructure) | Performance-critical. Feed must show cached prices instantly; live pricing fetched on demand. Cache TTL: destination metadata 30 days (CDN), price search results 5–15 minutes (Redis), flight calendar grids 24 hours (Redis). Duffel search is free (only confirmed orders incur cost) — aggressive pre-fetching is cost-effective. | Tech | 🟡 Build data model. Redis is commodity. |
| **Analytics and behavioural data pipeline** — capture engagement signals (clicks, bookmarks, searches, dwell time) to improve scoring | Product | **Buy** (Segment / Rudderstack for ingestion) / **Build** (models) | Every click, bookmark, search, and booking trains the preference graph. Segment or Rudderstack for event ingestion — commodity. Custom models on top to translate signals into embedding updates — build. | Tech / Data | 🟢 Buy ingestion. Build model update logic. |

---

### Layer 5: Core Infrastructure (Invisible Platform)

All commodity. No exceptions.

| Capability | Evolution Stage | Build / Buy / Partner | Rationale | Owner | Flags |
|---|---|---|---|---|---|
| **Supabase / Postgres** — relational database, auth, pgvector | Commodity | **Buy** (Supabase) | pgvector bundled. Auth included. Free tier sufficient for MVP. Scales cleanly. LoveHolidays architecture uses GKE — Supabase is appropriate for earlier stage. | Tech | 🟢 Buy. |
| **Cloud hosting** — compute, auto-scaling, container orchestration | Commodity | **Buy** (GCP / AWS) | LoveHolidays on GKE is the domain precedent. Start with managed services (Cloud Run or App Engine), expand to GKE at scale. | Tech | 🟢 Buy. |
| **Payment processing** — card acceptance, 3DS, refunds | Commodity | **Buy** (Stripe) | Stripe has native Duffel integration — reduces integration complexity. 2% FX conversion handled. Stripe Radar covers payment fraud. | Tech | 🟢 Buy. |
| **Notification delivery** — push, email, in-app alerts | Commodity | **Buy** (SendGrid + Firebase/OneSignal) | Delivery infrastructure is commodity. The alert logic (what to send, to whom, when) is custom — built in Layer 2. | Tech | 🟢 Buy. |
| **Auth** — account management, session management | Commodity | **Buy** (Supabase Auth / Clerk) | No build case. Auth0, Clerk, Supabase Auth are all production-ready. | Tech | 🟢 Buy. |
| **Observability** — logging, tracing, alerting | Product | **Buy** (Datadog / Grafana) | Instrument from day one. Don't build. | Tech | 🟢 Buy. |
| **CI/CD** — deployment pipeline | Product | **Buy** (GitHub Actions + cloud deploy) | Standard. | Tech | 🟢 Buy. |

---

## The Map: Evolution Positioning Summary

```
USER NEED: Personalised travel deals that learn my preferences
│
├── GENESIS ──────────────────────────────────────────────────────
│   Portfolio view (annual trip tracker)
│   Budget dashboard (travel as financial planning)
│   Budget engine (portfolio commitment modelling)
│
├── CUSTOM BUILT ──────────────────────────────────────────────────
│   Semantic preference graph ◄── PRIMARY MOAT
│   Recommendation engine (cosine → CF → two-tower)
│   Deal confidence scoring
│   Package assembler (Duffel + RateHawk orchestration)
│   Cold start resolution (onboarding conversation + archetypes)
│   Preference dashboard (UI surface)
│   Deal feed (ranking + display)
│   Price monitoring and alerts
│   ATOL compliance structure
│   Inventory cache / price distribution store
│
├── PRODUCT ──────────────────────────────────────────────────────
│   NLP intent parsing (Claude Haiku / GPT-4o mini)
│   Duffel flights API
│   RateHawk hotels API
│   Hotelbeds (Month 3–6)
│   TravelgateX aggregator (Month 6–12)
│   Vector DB / pgvector → Qdrant
│   Embeddings (OpenAI text-embedding-3-small)
│   Analytics pipeline ingestion (Segment)
│   Car hire (Cartrawler)
│   Travel insurance (white-label affiliate)
│   Notification delivery platform
│
└── COMMODITY ────────────────────────────────────────────────────
    LLM APIs (Anthropic / OpenAI)
    Supabase / Postgres
    Cloud hosting (GCP / AWS)
    Payment processing (Stripe)
    Auth (Supabase Auth / Clerk)
    Observability (Datadog)
    CDN / Edge (Cloudflare)
    CI/CD (GitHub Actions)
```

---

## Build vs Buy vs Partner: Decision Summary

### Build (Genesis / Custom Built — the investment)

These capabilities are moving left. They represent genuine differentiation. Engineering effort here compounds over time.

| Capability | Why Build | Expected Moat |
|---|---|---|
| Semantic preference graph | No competitor has it. Data is proprietary after 12 months. Cannot be bought or replicated without user data. | High — grows with each conversation and booking. 12-month head start on incumbents. |
| Portfolio view | No travel product frames annual trips as a managed portfolio. Structural product innovation. | Medium — UI can be copied; switching cost (preference data + trip history) is the real lock. |
| Deal confidence scoring | Preference-aware deal scoring does not exist at the individual level. Hopper does price prediction, not preference-weighted scoring. | Medium — rules-based is replicable; ML version trained on proprietary engagement data is not. |
| Recommendation engine | Must be custom-tuned to HP's preference graph schema and inventory. Off-the-shelf recommenders don't model travel psychology. | High at Phase 3 (two-tower + proprietary data). Low at Phase 1 (cosine similarity is easy to replicate). |
| Package assembler | Complex multi-API orchestration with ATOL wrapping. No off-the-shelf solution. | Low — orchestration can be copied; supplier relationships and ATOL are the barriers. |
| Cold start resolution | Novel onboarding conversation design. Proprietary archetype priors. | Low — can be copied; advantage is accumulating real preference data faster. |

### Buy / Partner (Product / Commodity — the infrastructure)

These capabilities are solved. Building them is waste. The market has already competed on them and established best practices.

| Capability | Solution | Cost Benchmark |
|---|---|---|
| NLP intent parsing | Claude 3.5 Haiku or GPT-4o mini | ~£0.006/user/month |
| Flights API | Duffel | $3/order + 1% |
| Hotels API | RateHawk (net rate) | Free API access, 20–30% below retail |
| Hotel scale | Hotelbeds (Month 3–6) | Commercial negotiation |
| Hotel aggregation | TravelgateX (Month 6–12) | Pay-as-you-go |
| Vector DB | pgvector (Supabase) → Qdrant | £0–200/month at 100K users |
| Embeddings | OpenAI text-embedding-3-small | $0.02/1M tokens |
| Payments | Stripe | Standard card fees |
| Auth | Supabase Auth | Included in Supabase |
| Notifications | SendGrid + Firebase | Commodity pricing |
| Car hire | Cartrawler | 8–12% commission |
| Hosting | GCP / AWS | Commodity |

### Partner Now, Internalise Later

| Capability | Current Partner | Trigger to Internalise |
|---|---|---|
| ATOL / Package compliance | ABTOT franchise (bridge) → Small Business ATOL | Apply immediately; own licence at Month 4 |
| Hotelbeds hotel supply | RateHawk first → Hotelbeds at Month 3–6 | 2–3 months of booking history as commercial leverage |
| TravelgateX aggregation | Direct bed bank integrations first | When managing multiple bed bank integrations becomes technically expensive |
| Fintech add-ons (Price Lock, CFAR) | Cover Genius / Battleface white-label | FCA authorisation in Year 2; requires actuarial data first |

---

## Unit Economics: Wardley Lens

The bed bank model changes the strategic calculus entirely. The shift from affiliate commission to net rate wholesale unlocks the unit economics at startup scale.

| Model | Hotel Component | Flight Component | Per-Booking Revenue | Breakeven Users |
|---|---|---|---|---|
| Affiliate only | 4% of £200 = £8 (Booking.com rate) | ~£5 Duffel | **£13** | 2,500+ |
| Bed bank (RateHawk net rate) | Buy £160 net, sell £200 gross = £40 | ~£5 | **£45** | 800–1,200 |
| Dynamic package | £160 hotel net + £120 flight net, 15–20% package markup | — | **£50–60** | 600–900 |

Sources: research-6-bed-banks.md (bed bank margins), research-5-revenue-models.md (competitor benchmarks: LoveHolidays 9.9% take rate on £2.9B GTV, On The Beach £209 margin/booking)

The implication for the Wardley Map: **the bed bank supply layer (RateHawk) is as strategically important as the personalisation layer.** It is a Product-stage capability (buy, not build), but selecting the right product (net rate vs commission) is a critical strategic decision that determines whether the unit economics work.

---

## Phased Supply Chain Evolution

```
Month 0–2 (Validate demand)
├── Affiliate bookings (Booking.com affiliate, Duffel)
└── Prove the flow works. 4–8% commission. Validate user behaviour.

Month 2–3 (Unlock real margins)
├── RateHawk API live (hotel net rates)
├── Duffel flights (confirmed)
└── Buy at net, sell at markup. 15–25% hotel margin. Unit economics viable.

Month 4–6 (Dynamic packaging — the economic unlock)
├── ATOL approved
├── Duffel flight + RateHawk hotel = dynamic package
└── 15–20% package markup. Mirrors LoveHolidays model at startup scale.

Month 6–12 (Scale supply)
├── Approach Hotelbeds with booking history
├── Evaluate TravelgateX as aggregator layer
└── Premium subscription launch (£59.99/yr)

Year 2+ (Economic expansion)
├── FCA authorisation → fintech add-ons (Price Lock, Portfolio Protect)
└── B2B API licensing (Hopper HTS model — Year 3+)
```

---

## Risk Register (Wardley Lens)

| Risk | Capability Affected | Flag | Mitigation |
|---|---|---|---|
| Duffel dependency — single flight API source | Flights supply | 🔴 | Build abstraction layer so supplier switch is possible. Negotiate commercial protections. Amadeus self-service EOL July 2026 removes fallback — commit to Duffel or invest in IATA cert (6 months, significant cost). |
| Duffel Stays commission opacity — undisclosed commission %, paid post-stay | Hotels supply (if chosen over RateHawk) | 🔴 | Do not use Duffel Stays as primary hotel layer. RateHawk net rate model is correct commercial structure. Duffel Stays is architecturally simpler but commercially a dead end for margin control. |
| ATOL delay — 12-week application timeline blocks dynamic packaging | Package assembly | 🔴 | Apply Month 1. ABTOT franchise (~£942) as immediate bridge. Do not sell flight+hotel package without ATOL in place — criminal liability. |
| Cold start — preference graph needs data before it is useful | Semantic preference graph | 🟡 | Designed onboarding conversation seeds the preference vector before any bookings exist. Archetype priors provide heuristic fallback. Instrument from day one to measure preference signal quality. |
| Rate parity tightening — OTAs closing bed bank arbitrage gap | RateHawk hotel margins | 🟡 | Do not compete on price with Booking.com for the same room. Compete on package value (flight+hotel Booking.com can't match) and personalisation that justifies a slight premium. Bed bank margins may compress over time. |
| Hotelbeds gatekeeping — production access requires booking history | Hotels supply at scale | 🟡 | Gate Hotelbeds approach behind 2–3 months of RateHawk bookings. Do not attempt commercial negotiation at zero volume. |
| Recommendation engine over-engineering — building two-tower before having data | Recommendation engine | 🟡 | Phase strictly: cosine similarity in Phase 1 (sufficient at <5K users). Do not build collaborative filtering or neural architecture until user base and booking data justify it. |
| Planning-to-booking leakage — users plan on HP, book on Booking.com | Booking flow | 🟡 | Package booking (one flow, ATOL-protected, in-platform) must be complete and high-quality. Leakage breaks the commission chain entirely. This is historically fatal for planning-only tools. |
| LLM vendor dependency — API pricing changes | NLP parsing | 🟢 | Low risk. Multiple LLM providers at equivalent cost (Anthropic, OpenAI, Google). Abstraction layer allows switching. NLP parsing is commodity — do not over-index on a single vendor. |

---

## Key Strategic Insight: What This Map Reveals

The Wardley Map surfaces a counter-intuitive strategic truth for Holiday Portfolio:

**The AI/personalisation layer (Genesis/Custom) is the moat — but it cannot be monetised without the supply layer (Product) being commercially structured correctly.**

Most AI travel startups optimise the personalisation layer and accept commodity economics on the supply side (affiliate commission). This leads to unit economics that don't survive paid CAC (£13/booking at affiliate rates vs £80–200 CAC in UK travel — research-5-revenue-risks.md).

Holiday Portfolio's strategic advantage is combining:
1. A personalisation layer that no competitor has (semantic preference graph, portfolio view, deal confidence scoring)
2. A supply layer with 2–3× better economics than affiliate models (RateHawk net rate, dynamic packaging)

The preference graph is the differentiation. The bed bank net rate is what makes the differentiation economically viable at startup scale.

Neither layer alone is sufficient. Together they define the strategy.

---

## Gaps and Open Questions

| Gap | Severity | Owner | Resolution Path |
|---|---|---|---|
| 🟡 **Duffel Stays commission rate unknown** — Duffel does not publish Stays commission percentages. If <8%, the model doesn't work for packages even as an MVP. | High | Commercial | Contact Duffel directly before making architectural decision. Validate before any build commitment. |
| 🟡 **RateHawk content coverage for target destinations** — RateHawk aggregates 260+ wholesaler partners (including Hotelbeds inventory) but independently contracted hotel coverage for UK city break targets (Paris, Lisbon, Porto, Seville, Rome) unverified against Hotelbeds. | Medium | Tech / Commercial | Run RateHawk sandbox against target destination list. Identify coverage gaps before launch. |
| 🟡 **TravelgateX commercial model** — pricing for TravelgateX connectivity is not publicly disclosed ("pay as you go" implied). Usage-based pricing could be material at scale. | Medium | Commercial | Request commercial terms from TravelgateX sales team in Month 6. |
| 🟡 **ATOL share capital requirement** — Small Business ATOL requires £30,000 share capital (CAA requirement). Not mentioned in some secondary sources. Needs verification against current CAA guidance. | High | Legal | Verify directly with CAA or specialist travel lawyer before committing to ATOL route vs ABTOT franchise. |
| 🟡 **Hotelbeds minimum volume expectation** — commercial terms not publicly disclosed. Zero-booking startup may face deferred production access or unfavorable rates. | Medium | Commercial | Approach only with booking history. Do not cold-approach. |
| 🟡 **Preference graph schema design** — the specific schema for encoding travel identity (which dimensions, which taxonomies) has not been formally specified. This is a product design decision with long-term data architecture implications. | High | Product / Tech | Design preference schema in Month 1 as a foundational artefact. Schema changes are expensive once preference data accumulates. |
| 🟡 **Deal scoring ground truth** — without historical booking data, deal quality scores are heuristic. Calibration methodology (how do you know a score of 7/10 is correct?) is undefined. | Medium | Product / Tech | Define scoring validation methodology. Use Going.com-style user feedback ("was this a good deal?") to generate early calibration data. |

---

## Linked Artefacts

- [[discovery]] — Full product context, confidence scores, competitive landscape
- [[research-4-tech-feasibility]] — NLP parsing benchmarks, vector DB comparisons, recommendation engine architecture, cost modelling
- [[research-6-bed-banks]] — RateHawk, Hotelbeds, TravelgateX, ATOL detail, unit economics
- [[strategy/08-strategy-kernel]] — Rumelt strategy kernel: diagnosis (coordination problem), guiding policy (portfolio as reason to return), coherent actions
- [[strategy/06-blue-ocean]] — Blue Ocean canvas: preference graph + portfolio view as uncontested space
- [[strategy/05-five-forces]] — Porter analysis: 2.5/5 structural attractiveness, viable at scale
- [[strategy/12-decision-tree]] — 5 phase gates, £48K total to scale decision
- [[strategy/13-phase-1-plan]] — Phase 1 execution plan

---

*Sources: research-4-tech-feasibility.md (NLP latency, vector DB benchmarks, recommendation architecture, cost models), research-6-bed-banks.md (RateHawk net rates, Hotelbeds access, TravelgateX, ATOL costs, dynamic packaging unit economics), research-3-ai-travel.md (competitor matrix, personalisation demand data), research-5-revenue-models.md (LoveHolidays, OTB, Hopper revenue benchmarks), discovery.md (product architecture, USP analysis)*

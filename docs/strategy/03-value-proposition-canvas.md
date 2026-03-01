# Value Proposition Canvas — Holiday Portfolio

**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?

**Generated:** 2026-02-28
**Status:** Draft v1 — populated from research rounds 1–6
**Confidence:** D8 / V7 / F8

**Segments covered:**
- Segment A: Tech-savvy frequent travellers (primary)
- Segment B: Deal-seeking couples / families (secondary)

**Links:** [[discovery]] | [[research-3-ai-travel]] | [[research-4-tech-feasibility]] | [[01-bmc-current]] | [[04-swot-confrontation]] | [[06-blue-ocean]]

---

## How to Read This Canvas

The Value Proposition Canvas maps customer-side reality (Jobs, Pains, Gains) against product-side reality (Products & Services, Pain Relievers, Gain Creators). Fit is achieved when the product relieves important pains and creates meaningful gains for jobs that actually matter.

Flags:
- **🟢 Confirmed** — evidence from research rounds 1–6
- **🟡 Gap** — missing data; owner assigned
- **🔴 Contradiction** — conflicting signals requiring resolution

---

## Segment A: Tech-Savvy Frequent Travellers

**Profile:** Self-serve travellers taking 3+ trips/year, predominantly city breaks. Behaviour-defined, not age-defined. Mix of budget-conscious and premium. Comfortable with technology. Already use Google Flights, Skyscanner, Notion, TripIt, apps. Likely 25–44. Source: [[discovery]] target user definition.

---

### A1. Customer Profile

#### A1a. Customer Jobs

**Functional jobs** (what they are trying to do)

1. **Find a great deal on the next trip** without spending hours validating it is genuinely a good price.
   - Evidence: 303 minutes average research time per trip (Expedia study, n=5,713). Source: [[discovery]]
   - Evidence: 37% frustrated by time spent filtering irrelevant options. Source: [[research-3-ai-travel]] Part 5

2. **Manage the year's travel as a whole** — budget, booked trips, planned trips, ideas — in one place rather than across spreadsheets, emails, and apps.
   - Evidence: 14% of 16–24s have 3+ trips booked simultaneously; 20% of UK adults had 2+ international trips booked for the following year. Source: [[discovery]] Desirability

3. **Discover trips they would love** without knowing exactly where they want to go.
   - Evidence: 78% prefer spontaneous travel decisions. Source: [[discovery]] post-strategy reframe
   - Evidence: NLP query behaviour ("somewhere warm, good food, under £400") is well-established. Source: [[research-4-tech-feasibility]]

4. **Book a complete package** (flights + hotel, optionally car and transfers) in a single flow.
   - Evidence: Jet2 package profit per passenger (£98) vs flight-only (£18) shows consumer preference for bundled product. Source: [[discovery]] Viability

5. **Monitor prices on destinations they are interested in** without constantly re-checking.
   - Evidence: Going.com model — 2M subscribers at $49/yr; deal alert engagement drives repeat visits. Source: [[discovery]] Viability

**Social jobs** (how they want to be seen)

6. Be seen as a savvy, well-travelled person who finds great deals — not someone who overpays or books generic holidays.
7. Demonstrate lifestyle curation — the places they visit, not just the transport and hotel.
8. 🟡 **Gap A-S1:** No qualitative research on social signalling motivations for this segment specifically. *Owner: PM. Method: 8–10 user interviews recommended in [[12-decision-tree]] Gate 1. Priority: medium.*

**Emotional jobs** (how they want to feel)

9. **Confident** — that the deal is genuinely good, not just cheap-looking.
   - Evidence: Commission-credibility is a core resolved kill signal. Source: [[discovery]] Kill Signals
10. **In control** — not handed a recommendation they don't understand or trust. "Cockpit, not autopilot." Source: [[discovery]] post-research reframe
11. **Excited** about what's coming up — a feed of trips they would love, not a list of results.
12. **Organised** — everything in one place, no mental overhead across apps.

---

#### A1b. Customer Pains

**Pains ranked by severity (H = high, M = medium, L = low)**

| # | Pain | Severity | Evidence | Source |
|---|------|----------|----------|--------|
| P1 | **Deal anxiety** — can't tell if a price is genuinely good or just seems good | H | 303 min research/trip spent partly on price validation; 44% cite lack of personalisation as #1 pain | [[discovery]], [[research-3-ai-travel]] |
| P2 | **Research fragmentation** — information across Google Flights, Skyscanner, hotel sites, review sites, social, spreadsheets | H | 303 min average research time. "No single tool manages the yearly portfolio." | [[discovery]] |
| P3 | **Lack of personalisation** — search results are the same for everyone; filters don't capture nuance | H | 44% cite as #1 pain; 52% of 25–34s frustrated. Source: [[research-3-ai-travel]] Part 5 | [[research-3-ai-travel]] |
| P4 | **Irrelevant recommendations** — generic results that don't match how they actually travel | H | 37% frustrated by time filtering irrelevant options; 32% frustrated by generic recommendations | [[research-3-ai-travel]] |
| P5 | **Year-round budget blindness** — no visibility of how this trip fits the travel budget for the year | M | Current workaround: spreadsheets, Notion templates, mental maths. | [[discovery]] |
| P6 | **Booking fragmentation** — flights on one site, hotel on another, car hire separately; no single package flow | M | Frequent travellers managing 3+ trips/year feel this acutely. | [[discovery]] |
| P7 | **Trust deficit** — suspecting recommendations are driven by commission, not fit | M | Commission-credibility kill signal. Visible preference graph as resolution. | [[discovery]] Kill Signals |
| P8 | **Platform reset** — every new trip starts from scratch; no platform learns how they travel | M | No competitor builds persistent semantic preference graph. Source: [[research-3-ai-travel]] Part 3 | [[research-3-ai-travel]] |
| P9 | 🟡 **Gap A-P1:** Price alert fatigue — frequency and relevance of existing deal alert services (e.g. Going.com, Google Flights alerts) not validated for UK segment. *Owner: PM. Method: survey or interviews. Priority: medium.* | — | — | — |
| P10 | 🔴 **Contradiction A-P1:** 78% prefer spontaneous travel vs. annual portfolio planning. If travel decisions are mostly spontaneous, portfolio-level budget management may be a latent need rather than an active pain. Needs resolution via interview. Source: [[discovery]] Kill Signals (resolved by city break hook framing) | — | — | — |

---

#### A1c. Customer Gains

**Gains ranked by importance (H = high, M = medium, L = low)**

| # | Gain | Importance | Evidence | Source |
|---|------|-----------|----------|--------|
| G1 | **Deal confidence** — know this price is genuinely good *for them*, not just cheap | H | 303 min research time = seeking confidence they can't currently achieve fast | [[discovery]] |
| G2 | **A feed that gets their taste** — recommendations that improve the more they use the platform, like Spotify Discover Weekly | H | Confirmed gap: no competitor does this. | [[research-3-ai-travel]] Part 3 |
| G3 | **One place for the travel year** — budget tracker, booked/planned/dreamed trips, feed all connected | H | Portfolio behaviour exists: 14% of 16–24s have 3+ trips booked simultaneously | [[discovery]] |
| G4 | **Faster decisions** — going from idea to booked trip significantly faster than current 303-min research cycle | H | Expedia study n=5,713. NLP input → sub-3s recommendations validated. | [[discovery]], [[research-4-tech-feasibility]] |
| G5 | **Trusted recommendations** — platform shows its reasoning ("here's what we think you like — is this right?") | H | Visible preference graph differentiator vs. all incumbents. | [[discovery]] USP 4, [[research-3-ai-travel]] Gap 1 |
| G6 | **Price alerts on destinations they care about** — notified when Porto drops to £240 for their dates | M | Going.com: 2M subscribers, 80%+ gross margin on alert model | [[discovery]] USP 5 |
| G7 | **Platform loyalty payoff** — their travel history and preferences are an asset that makes future recommendations better | M | Loyalty lock: "By trip #3, their travel year lives here." | [[discovery]] |
| G8 | **UK protection** — ATOL coverage on packages, built in | M | 53% of high-income households use agents partly for trust/protection | [[discovery]] Desirability |
| G9 | 🟡 **Gap A-G1:** Specific time saving (in minutes) that users would find motivating to switch is not validated. Would saving 200 minutes matter if the trust gap isn't solved first? *Owner: PM. Method: messaging test Gate 1. Priority: high.* | — | — | — |

---

### A2. Value Proposition (Segment A)

#### A2a. Products & Services

| # | Product / Service | Phase | Source |
|---|------------------|-------|--------|
| S1 | **NLP city break search** — "somewhere warm, good food, under £400, long weekend" → personalised results in under 3 seconds | v1 (MVP) | [[discovery]], [[research-4-tech-feasibility]] |
| S2 | **Deal confidence score** — "this deal is 23% below your typical spend for this destination type and 18% below 30-day average" | v1 | [[discovery]] USP 1 |
| S3 | **Visible preference profile** — "here's what we think you like, is this right?" — user can view, edit, confirm | v1 | [[discovery]] USP 4, [[research-3-ai-travel]] Gap 1 |
| S4 | **Portfolio view** — budget tracker, trips booked/planned/dreamed, year-to-date spend | v1 | [[discovery]] Product Architecture |
| S5 | **One-click package booking** — Duffel flights + RateHawk hotel + Cartrawler car in a single flow, ATOL-compliant | v1 (post-ATOL, Month 4–6) | [[discovery]] Viability |
| S6 | **Deal alerts** — price monitoring on saved destinations, push notifications when prices hit thresholds | v1 | [[discovery]] USP 5 |
| S7 | **Recommendation feed** — improving with every search, click, bookmark, and booking via semantic preference graph | v1 basic → v2 semantic | [[discovery]], [[research-4-tech-feasibility]] |
| S8 | **Premium subscription** — £59.99/yr — preference graph features, extended price history, advanced alerts | Month 6–12 | [[discovery]] Revenue stream priority |
| S9 | **Fintech layer** — Price Lock, Portfolio Protect (Cancel for Any Reason) | Year 2+, FCA required | [[discovery]] Viability |

---

#### A2b. Pain Relievers

| Pain # | Pain Relieved | How | Fit strength |
|--------|--------------|-----|-------------|
| P1 — Deal anxiety | Deal confidence score: price history + your budget + your preferences = a specific verdict, not a raw price | Direct, unique vs. all incumbents | Strong |
| P2 — Research fragmentation | NLP input condenses research; portfolio view consolidates across trips; single booking flow eliminates tab-switching | Partial — still requires initial exploration | Moderate |
| P3 — Lack of personalisation | Semantic preference graph built from NLP conversations + booking history. Visible to user. No competitor does this. | Direct, uncontested | Strong |
| P4 — Irrelevant recommendations | Preference graph filters inventory to high-fit options only; feed improves per trip | Direct | Strong |
| P5 — Year-round budget blindness | Portfolio view: budget set, spend tracked, "£1,200 of £3,500 spent — here's what fits" | Direct | Strong |
| P6 — Booking fragmentation | Dynamic package: flights + hotel + car in one booking flow, ATOL-protected | Direct post-ATOL | Strong |
| P7 — Trust deficit | Visible preference graph shows reasoning; deal score shows methodology. Transparency is the core trust mechanism. | Direct, unique | Strong |
| P8 — Platform reset | Preference graph persists and improves. By trip 3, platform knows how you travel. Leaving = starting from scratch. | Direct, uncontested | Strong |

---

#### A2c. Gain Creators

| Gain # | Gain Created | How | Fit strength |
|--------|-------------|-----|-------------|
| G1 — Deal confidence | Deal confidence score answers "is this a good deal for me?" definitively | Direct | Strong |
| G2 — A feed that gets their taste | Semantic preference graph + trip feedback loop. Spotify analogy: each trip sharpens the next recommendation. | Direct, uncontested | Strong |
| G3 — One place for travel year | Portfolio view: booked, planned, dreamed, budget. Always visible from first login. | Direct | Strong |
| G4 — Faster decisions | NLP input → sub-3s personalised results. No filter fiddling. Fewer irrelevant results to discard. | Direct | Strong |
| G5 — Trusted recommendations | Visible preference profile + transparent deal scoring. User sees *why* a deal is recommended. | Direct | Strong |
| G6 — Price alerts | Deal monitoring on saved destinations. Porto drops to £240 → notification. | Direct | Moderate (depends on alert relevance) |
| G7 — Platform loyalty payoff | Preference graph as personal asset. More trips = better feed. Switching cost grows with engagement. | Direct | Strong (lagged — takes 2–3 trips to materialise) |
| G8 — UK protection | ATOL on all packages. Built-in, not add-on. | Direct | Moderate |

---

## Segment B: Deal-Seeking Couples and Families

**Profile:** UK couples and families taking 2–3 trips/year, mix of city breaks and package holidays (beach, European sun). Price-sensitive but willing to pay for the right deal at the right time. Trust is earned through social proof, price transparency, and ATOL. More likely to have used a travel agent. Less likely to self-build from components. Source: [[discovery]] Desirability — travel agent usage doubling among UK 18–24s (26%→48%).

---

### B1. Customer Profile

#### B1a. Customer Jobs

**Functional jobs**

1. **Find a family or couple holiday that is worth the money** — value for money is the primary filter, but value includes experience quality, not just cheapest price.
   - Evidence: On The Beach £209 margin per booking indicates consumers pay premium for curated packages. Source: [[discovery]] Viability
   - Evidence: LoveHolidays £288M revenue shows mass-market appetite for dynamic package deals. Source: [[discovery]] Viability

2. **Make a quick, confident booking decision** — avoid the hours of research and second-guessing.
   - Evidence: Travel agent usage doubled among UK 18–24s (26%→48%); 53% of high-income households use agents. People pay for the decision being made *for them* or *with them*. Source: [[discovery]] Desirability

3. **Book everything in one place** — flights, hotel, transfers, optionally car — without fear of mismatched dates or ATOL issues.

4. **Get the timing right** — book when the deal is genuinely good, not just when they get around to it.
   - Evidence: Hopper's Price Freeze product ($30 deposit option contract) shows demand for timing confidence. Source: [[discovery]] Viability

5. **Plan around school terms and specific dates** (for families) — constrained dates make finding value harder.
   - 🟡 **Gap B-F1:** School holiday premium data for UK family travel not quantified in research. Relevant to deal confidence scoring for this segment. *Owner: PM. Method: desk research on school holiday price uplift (typically 30–50% premium on term-adjacent dates). Priority: medium.*

**Social jobs**

6. Be a family/couple that has good holidays — not necessarily aspirational, but competent and satisfied.
7. 🟡 **Gap B-S1:** Social comparison dynamics in deal-seeking segment (e.g. sharing deals with friends/family) not validated. *Owner: PM. Priority: low.*

**Emotional jobs**

8. **Reassured** — that the platform has checked the deal, and they are not going to regret it.
9. **Trusted** — particularly important after Thomas Cook collapse; ATOL is an emotional reassurance, not just a legal one.
   - Evidence: Thomas Cook collapse (September 2019) — 150,000 UK holidaymakers stranded. ATOL trust signal is acute for this segment. Source: [[discovery]] USP 3
10. **Relieved** — the research is done, the decision is made, they can look forward to the trip.
11. **Not embarrassed** — they want to feel like they got a good deal, not that they were taken advantage of.

---

#### B1b. Customer Pains

| # | Pain | Severity | Evidence | Source |
|---|------|----------|----------|--------|
| P1 | **Price uncertainty** — difficult to know if the package price is competitive across providers | H | 303 min research/trip; 44% personalisation as #1 pain applies to packages too | [[discovery]], [[research-3-ai-travel]] |
| P2 | **Trust deficit with online-only platforms** — OTAs have faced trust issues post-Thomas Cook; hidden fees, booking complications | H | ATOL trust signal acute; 53% of high-income households use agents (partly for protection) | [[discovery]] |
| P3 | **Generic package options** — holiday catalogue doesn't understand their specific preferences, budget tier, or family composition | H | 44% cite lack of personalisation as #1 pain; this is the core package holiday complaint | [[research-3-ai-travel]] |
| P4 | **Complexity of multi-component bookings** — coordinating flights + hotel + transfers across providers, checking dates align | H | Current workaround: booking through agents precisely to avoid this | [[discovery]] |
| P5 | **Timing anxiety** — not knowing when to book, whether to wait for a better deal or commit now | M | Hopper Price Freeze product validates this demand; Going.com deal alert model | [[discovery]] |
| P6 | **School holiday premium sting** — forced into peak pricing with no tool to find relative value within constrained dates | M | 🟡 Not yet quantified. See Gap B-F1. | — |
| P7 | **Post-booking regret** — seeing the same holiday cheaper after booking | M | Hopper Price Freeze (options contract) directly addresses this — demand signal | [[discovery]] |
| P8 | 🔴 **Contradiction B-P1:** This segment is described as "deal-seeking" yet also values the reassurance of a travel agent (who charges a premium). Suggests the tension is not price vs. quality but *confidence vs. effort*. Agent usage is about buying confidence, not just the product. This should shape messaging: HP must sell confidence first, price second, to this segment. Source: [[discovery]] Desirability | — | — | — |

---

#### B1c. Customer Gains

| # | Gain | Importance | Evidence | Source |
|---|------|-----------|----------|--------|
| G1 | **Package deal confidence** — clear signal that this deal is good *for them*, not just a low headline price | H | Equivalent to agent saying "yes, that's a good price" | [[discovery]] |
| G2 | **One-click complete package** — flights, hotel, transfers, ATOL in one booking flow, no gaps | H | Agent use is substantially about this | [[discovery]] |
| G3 | **ATOL protection, built in** — trust signal baked into the product, not an optional add-on | H | USP 3; Thomas Cook context | [[discovery]] |
| G4 | **Personalised options that understand their constraints** — family composition, budget, dates, style | H | Current package holidays don't personalise; same catalogue for everyone | [[research-3-ai-travel]] |
| G5 | **Price timing confidence** — know whether to book now or wait | M | Hopper Price Freeze validates demand | [[discovery]] |
| G6 | **Ongoing deal alerts** — told when a holiday they'd love drops to the right price, without having to check | M | Going.com model; engagement between bookings | [[discovery]] |
| G7 | 🟡 **Gap B-G1:** "Family trip planning made easy" — specific friction points for families (kids' dietary needs, child-friendly hotels, airport logistics) not yet mapped. HP could serve these as enrichment of the preference graph (family composition, accommodation requirements). *Owner: PM. Priority: medium.* | — | — | — |

---

### B2. Value Proposition (Segment B)

#### B2a. Products & Services

Same core product stack as Segment A (S1–S9) with segment-specific emphasis:

| # | Product / Service | Segment B emphasis | Phase |
|---|------------------|--------------------|-------|
| S1 | NLP search | "Family beach week, under £2,500, late July" — constrained date search with family composition input | v1 |
| S2 | Deal confidence score | "This Algarve package is 19% below average for July school holidays — it's a good time to book" | v1 |
| S3 | Visible preference profile | Family composition, accommodation requirements, budget tier, preferred destinations | v1 |
| S5 | ATOL package booking | ATOL logo and protection statement prominent in booking flow — emotional reassurance | v1 post-ATOL |
| S6 | Deal alerts | School holiday date ranges set; alerts fire when qualifying packages hit threshold price | v1 |
| S9 | Portfolio Protect | Cancel for Any Reason — acute for families with more disruption risk (illness, school events) | Year 2+ |
| — | 🟡 **Gap B-S1:** Child-friendly filtering within NLP (pool, kids' club, family rooms, proximity to beach) not specified in MVP scope. Would require preference graph enrichment for family composition. *Owner: Product. Priority: medium (v1.5 feature).* | — | — |

---

#### B2b. Pain Relievers (Segment B)

| Pain # | Pain Relieved | How | Fit strength |
|--------|--------------|-----|-------------|
| P1 — Price uncertainty | Deal confidence score with family-package context (school holiday premium comparison) | Direct | Strong |
| P2 — Trust deficit | ATOL built in; visible preference reasoning; deal score methodology shown | Direct | Strong |
| P3 — Generic packages | Preference graph captures family composition, budget tier, accommodation style, destination type | Direct | Moderate (v1 basic, v2 semantic) |
| P4 — Multi-component complexity | One-click package flow: flights + hotel + transfers | Direct | Strong |
| P5 — Timing anxiety | Deal confidence includes price trend: "prices rising — book now" vs. "prices stable — 2 weeks of runway" | Partial | Moderate |
| P6 — School holiday premium | Date-constrained search with relative value scoring within peak periods | Partial | Moderate |
| P7 — Post-booking regret | Price Lock (Year 2, FCA required). Deal alerts as partial bridge. | Partial (Year 2) | Moderate |

---

#### B2c. Gain Creators (Segment B)

| Gain # | Gain Created | How | Fit strength |
|--------|-------------|-----|-------------|
| G1 — Package deal confidence | Deal confidence score — "good deal for a family of 4 in July" | Direct | Strong |
| G2 — One-click complete package | ATOL-compliant dynamic package in single flow | Direct | Strong |
| G3 — ATOL protection | Built into every flight+hotel booking, prominently surfaced | Direct | Strong |
| G4 — Personalised family options | Preference graph includes family composition, accommodation requirements | Moderate (v1 basic) | Moderate |
| G5 — Price timing confidence | Deal confidence score includes price trend direction | Partial | Moderate |
| G6 — Ongoing deal alerts | School-holiday-aware deal alerts on saved destinations | Direct | Moderate |

---

## Fit Analysis

### Product-Market Fit Scoring

Scoring method: each job/pain/gain is scored on whether the value proposition directly addresses it (2), partially addresses it (1), or does not address it (0). Weighted by importance rating (H=3, M=2, L=1).

#### Segment A — Tech-Savvy Frequent Travellers

| Dimension | Items scored | Weighted score | Max possible | PMF % |
|-----------|-------------|---------------|-------------|-------|
| Jobs (functional) | 5 items | 24/30 | 30 | 80% |
| Jobs (social/emotional) | 6 items | 16/24 | 24 | 67% |
| Pains | 8 items | 38/45 | 45 | 84% |
| Gains | 8 items | 36/42 | 42 | 86% |
| **Overall Segment A** | | **114/141** | **141** | **81%** |

**Notes:**
- Social jobs score lower because social signalling validation is missing (Gap A-S1).
- Emotional jobs score lower because "excited" and "in control" are hard to create through product features alone — require UX execution.
- Overall 81% is strong for a pre-launch product. Indicates solid fit with primary segment.

#### Segment B — Deal-Seeking Couples / Families

| Dimension | Items scored | Weighted score | Max possible | PMF % |
|-----------|-------------|---------------|-------------|-------|
| Jobs (functional) | 5 items | 22/30 | 30 | 73% |
| Jobs (social/emotional) | 4 items | 14/21 | 21 | 67% |
| Pains | 7 items | 30/42 | 42 | 71% |
| Gains | 6 items | 28/36 | 36 | 78% |
| **Overall Segment B** | **94/129** | | **129** | **73%** |

**Notes:**
- Lower score primarily due to v1 MVP not including family-specific filtering (Gap B-S1) and Price Lock (Year 2).
- 73% indicates good fit but meaningful gaps — particularly for family composition and timing anxiety.
- Segment B PMF improves significantly with: (a) school holiday price comparison in deal confidence score, (b) family composition in preference graph, (c) ATOL prominently surfaced.
- 🟡 **Gap F-1:** PMF scoring methodology is illustrative without empirical weighting. Scores should be validated via Sean Ellis survey ("how disappointed would you be if this product no longer existed?" — target 40%+ "very disappointed"). *Owner: PM. Method: Gate 2 survey in [[12-decision-tree]]. Priority: high.*

---

### Fit Narrative

**Strongest fit (both segments):** Deal confidence scoring. This directly resolves the #1 pain (lack of personalisation as proxy for "I don't know if this is right for me") and the trust deficit (commission-credibility). It is also unique — no competitor in the 12-platform analysis offers this. Source: [[research-3-ai-travel]] Part 6 Gap Analysis.

**Strongest fit (Segment A):** Visible preference profile + portfolio view. These serve the tech-savvy frequent traveller's emotional need for control and organisational gains. The "cockpit, not autopilot" framing lands specifically for this segment. Source: [[discovery]] reframes.

**Strongest fit (Segment B):** ATOL-compliant one-click package booking. Removes the primary friction (booking complexity) and resolves the primary trust need (protection post-Thomas Cook). Source: [[discovery]] USP 3.

**Weakest fit (both segments):** Social jobs — HP does not yet have a clear mechanism for status signalling or social sharing. This is intentional at MVP (reduces scope) but represents an engagement and growth channel not yet addressed.

**Weakest fit (Segment B specifically):** Family-specific features (child-friendly filtering, school holiday premium scoring, family composition in preference graph). These are v1.5 scope items, not MVP blockers, but reduce fit score for this segment in v1.

---

### Competitive Fit Gap (Why HP Wins Here)

| Competitor | Closest overlap | What they lack vs. HP |
|-----------|----------------|----------------------|
| Mindtrip ($22.5M, TUI) | NLP input, preference learning claimed, booking integration | No UK presence; inspiration-first not price-first; no portfolio model; no visible preference profile; no deal confidence scoring; no deal alerts. Source: [[research-3-ai-travel]] §1.1 |
| Expedia Romie | Cross-trip preference learning claimed; strongest incumbent | Opaque ML, not visible to user; no portfolio model; no deal confidence scoring; no UK-native product. Source: [[research-3-ai-travel]] §2.3 |
| Booking.com | Full UK presence; real-time inventory | Session-only AI; history-based not conversation-derived; no portfolio; no deal confidence score. Source: [[research-3-ai-travel]] §2.2 |
| Google | Dominant UK search; hotel price tracking | Discovery tool, not preference engine; starts fresh each session; no deal confidence; no portfolio. Source: [[research-3-ai-travel]] §2.1 |
| Hopper | Price prediction; deal alerts | No NLP; no preference graph; no portfolio; primarily US. Source: [[research-3-ai-travel]] §2.4 |

**Uncontested space (5 capabilities no competitor has combined):** Structured semantic preference graph + visible to user + improvement per completed trip + portfolio curation model + UK-native package product. Source: [[research-3-ai-travel]] Part 6.

---

## Open Gaps Register

| ID | Gap | Impact | Owner | Method | Priority | Status |
|----|-----|--------|-------|--------|----------|--------|
| A-S1 | Social signalling motivations for Segment A not validated | Medium | PM | 8–10 user interviews (Gate 1) | Medium | Open |
| A-P1 | Price alert fatigue / relevance for UK frequent traveller segment | Medium | PM | Survey / interviews | Medium | Open |
| A-G1 | Specific time saving that motivates switching not validated | High | PM | Gate 1 messaging test (3 variants) | High | Open |
| B-F1 | School holiday price premium data not quantified | Medium | PM | Desk research: UK school holiday uplift | Medium | Open |
| B-S1 | Social comparison dynamics in deal-seeking segment | Low | PM | Low priority | Low | Open |
| B-G1 | Family-specific friction points (kids' dietary needs, child-friendly hotels, airport logistics) not mapped | Medium | Product | v1.5 requirements doc | Medium | Open |
| B-S1 (product) | Child-friendly filtering in NLP / preference graph not specified in MVP scope | Medium | Product | v1.5 feature spec | Medium | Open |
| F-1 | PMF scoring is illustrative — needs empirical Sean Ellis survey validation | High | PM | Gate 2 survey [[12-decision-tree]] | High | Open |

---

## Contradictions Register

| ID | Contradiction | Resolution | Status |
|----|--------------|------------|--------|
| A-P10 | 78% spontaneous preference vs. portfolio planning as active pain | Resolved by city break hook: enter via single trip, portfolio emerges through repeat use. Not a conflict if HP doesn't lead with "annual planning" pitch. Source: [[discovery]] Kill Signals | Resolved |
| B-P8 | Deal-seeking segment pays for travel agents (premium) while also being price-sensitive | Tension is confidence vs. effort, not price vs. quality. Agents are bought for confidence. HP messaging for Segment B should lead with confidence and reassurance, not lowest price. Confirmed by agent usage data (26%→48% among 18-24s). Source: [[discovery]] Desirability | Resolved (messaging implication) |

---

## Entry Strategy Implications

**City break as entry hook (Segment A primary):** The city break deal entry point (low stakes, £300–500, fast booking cycle) serves Segment A most directly. Deal confidence scoring is the value proof on first interaction. Portfolio view is visible from day one but earns relevance after first booking. This is the correct sequencing.

**Package holidays as Segment B entry (post-ATOL):** Segment B is not accessible until ATOL is in place (Month 4–6). This is not a v1 target — it is a Month 4–6 growth segment. ATOL is the unlock.

**Dual-segment risk:** Running two segments simultaneously risks messaging dilution. Recommendation: lead with Segment A (city break, tech-savvy, frequent traveller) in Gate 1 messaging test. Test Segment B positioning separately only after ATOL. Source: [[12-decision-tree]] Gate 1.

**Shared value proposition core:** Both segments share the deal confidence score and visible preference profile as core value — these are segment-agnostic. The portfolio view is higher relevance for Segment A. ATOL protection is higher relevance for Segment B. This suggests a single product with segment-aware messaging rather than two distinct products.

---

## Related Artefacts

- [[discovery]] — Master discovery document, scores D8/V7/F8
- [[research-3-ai-travel]] — 12-platform AI competitor analysis, gap analysis
- [[research-4-tech-feasibility]] — Technical feasibility: NLP, vector DB, recommendation engine, cost model
- [[01-bmc-current]] — Business Model Canvas
- [[04-swot-confrontation]] — SWOT + Confrontation Matrix
- [[06-blue-ocean]] — Blue Ocean Strategy Canvas
- [[12-decision-tree]] — 5 gate validation plan, £48K to scale decision
- [[13-phase-1-plan]] — Phase 1 execution plan

---

*Generated by ProveIt agent | Holiday Portfolio discovery session | 2026-02-28*

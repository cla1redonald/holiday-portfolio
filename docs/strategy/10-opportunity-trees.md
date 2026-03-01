# Opportunity Solution Trees — Holiday Portfolio

**Framework:** Teresa Torres, Continuous Discovery Habits (2021)
**Strategic Question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?
**Desired Outcome:** 1,000 active users making 3+ bookings/year within 18 months of launch
**Revenue implication:** At bed bank margins (£45–60/booking), 1,000 users × 3 bookings = £135,000–180,000/year. With ancillaries + subscription: ~£220,000/year. Breakeven at small-team scale.
**Date:** 2026-02-28
**Status:** Research Rounds 1–6 complete — evidence base consolidated

---

## How to Read This Tree

Each branch follows: **Opportunity (user struggle) → Solutions → Evidence + Validation + Risk**

Evidence rating key:
- **STRONG** — direct UK consumer data or market-validated analogue
- **PARTIAL** — proxy evidence or analogous market; directionally valid
- **WEAK** — assumption not yet tested; requires validation before build
- 🟡 **GAP** — evidence exists but is incomplete or unrepresentative
- 🔴 **CONTRADICTION** — evidence conflicts with a product assumption

Owner assignments:
- **[PM]** — Product Manager owns validation
- **[ENG]** — Engineering owns build
- **[BIZ]** — Business/commercial owns relationship

---

## ROOT OUTCOME

```
1,000 active users making 3+ bookings/year within 18 months
│
├── OPPORTUNITY 1: "I waste hours researching trips across scattered sites"
├── OPPORTUNITY 2: "I don't trust that deals are actually good"
├── OPPORTUNITY 3: "I can't manage my year of travel in one place"
├── OPPORTUNITY 4: "Recommendations don't match what I actually like"
└── OPPORTUNITY 5: "Booking packages is fragmented"
```

---

## OPPORTUNITY 1: "I waste hours researching trips across scattered sites"

**The struggle:** UK travellers spend an average of 303 minutes (5 hours) researching each trip across scattered platforms — Google Flights, Skyscanner, Booking.com, TripAdvisor, travel blogs. Each tool has different inventory, different pricing, and no continuity between sessions. The research cycle repeats from scratch for every trip.

**Why this matters for the outcome:** Reducing research friction is the primary acquisition hook. NLP search and personalised deal feeds are the surface entry point. Users who arrive via a deal alert or NLP query are pre-qualified for booking intent. This opportunity drives user activation and repeat visit frequency — both necessary for 3+ bookings/year.

**Evidence base:**
- 303 minutes average research time per trip — Expedia consumer research, n=5,713 (STRONG)
- 37% of UK consumers frustrated by "time spent filtering irrelevant options" — UK AI travel adoption report, Travolution/Travel and Tour World, 2025 (STRONG)
- 61% YoY growth in UK holidaymakers using AI-powered travel platforms — Travolution, 2025 (STRONG)
- 183% growth in AI travel usage among 18–34s — same source (STRONG)
- 🟡 GAP: No published data on how many of those 303 minutes are search vs comparison vs decision. Time-in-task by phase would sharpen the solution priority.

---

### 1.1 Solution: NLP Natural Language Search ("long weekend somewhere warm, under £400")

**Description:** Replace the destination box + date picker + filters paradigm with a single natural language input. Claude Haiku or GPT-4o mini parses intent into structured query parameters (destination cluster, date range, budget, travel style), passes to Duffel + RateHawk APIs, and returns personalised ranked results — not a list of everything that matches.

**Mechanism:** LLM intent parsing → structured query → API calls (Duffel flights, RateHawk hotels) → cosine similarity ranking against user preference vector → ranked results with deal confidence score.

**Technical feasibility:** Proven. <600ms NLP parse latency at £0.006/user/month (research-4-tech-feasibility.md). No fine-tuning required for travel intent. End-to-end latency under 3 seconds with parallel API calls and cached destination pricing.

**Evidence:**
- All major competitors (Booking.com, Expedia Romie, Kayak AI Mode, Mindtrip, Layla) have shipped NLP search — it is table stakes, not a differentiator (research-3-ai-travel.md) (STRONG)
- The differentiator is NOT the NLP layer — it is what the NLP feeds: a semantic preference graph that learns across trips. NLP search without a preference layer is commodity (discovery.md) (STRONG)
- 🔴 CONTRADICTION: NLP input is confirmed as table stakes by R3. Positioning this as "we have NLP" would be insufficient. Must position as "NLP input that feeds a learning preference engine" — the distinction matters for messaging.

**Validation method:** Gate 1 landing page A/B test (three variants: city break deal, portfolio planning, NLP deal finder). Measure email capture conversion rate. Target: >8% conversion. Cost: £500–1,000. Owner: [PM]. Timeline: Week 1–2. [[strategy/12-decision-tree.md]]

**Risk:** LOW for build, MEDIUM for differentiation. The NLP layer is fast and cheap to build. The risk is users treating it as a commodity search box rather than the entry point to a preference engine. Mitigate: design the NLP response to explicitly surface the preference graph — "based on your query, here's what we've learned about you."

---

### 1.2 Solution: Personalised Deal Feed (Spotify Discover Weekly for holidays)

**Description:** A curated, chronologically-ordered feed of deals specifically matched to the user's semantic preference graph. Not a search results page — a proactive feed that surfaces deals the system predicts the user will love, before they ask. Updates as preferences are refined.

**Mechanism:** Batch job computes cosine similarity between user preference vector and available inventory embeddings (destination, hotel type, price tier, travel style). Top-N results populate the feed. Feed refreshes daily or when new deals land from RateHawk/Duffel.

**Why this is the core product:** Every competitor is reactive — users search, platform returns results. HP is proactive — platform surfaces deals the user would have searched for if they knew to. This is the Spotify analogy: Discover Weekly doesn't wait for you to search for a song. [[strategy/06-blue-ocean.md]]

**Evidence:**
- 44% of UK consumers cite lack of personalisation as #1 pain point — UK travel AI report, 2025 (STRONG)
- 52% of 25–34s frustrated by lack of personalisation — same source (STRONG)
- 32% frustrated by generic recommendations — same source (STRONG)
- Spotify Discover Weekly: 40M+ users on launch day in 2015; the personalised-feed model is proven at scale (PARTIAL — cross-domain analogue)
- 🟡 GAP: No direct evidence of personalised deal feed conversion rates in travel. Closest proxy is Hopper's "Hot Deals" push notifications — which drive re-engagement — but Hopper's personalisation is price-pattern-based, not preference-graph-based. Need to validate that users will engage with a proactive deal feed vs. actively searching.

**Validation method:** Concierge MVP — manually send 3 personalised deal options per week to 20 early users via email/WhatsApp. Measure open rate, click rate, and booking conversion. Target: >40% open rate, >15% click-to-consider. Cost: £0 build, £2,000 PM time. Owner: [PM]. Timeline: Month 2–3. [[strategy/13-phase-1-plan.md]]

**Risk:** MEDIUM. Cold start problem — feed quality is low until preference graph has enough signal. Mitigation: archetype priors from onboarding conversation (explicit preference capture before implicit learning begins). First 3–5 deals are based on stated preferences; subsequent deals blend stated + inferred.

---

### 1.3 Solution: Deal Alerts for Tracked Destinations

**Description:** Users mark destinations or travel windows as "watching." The system monitors RateHawk/Duffel pricing and triggers an alert when prices hit a user-defined threshold or drop significantly below historical average. "Porto just hit £240 for your May dates — 30% below average."

**Why this resolves the research problem:** Users don't need to check prices daily across multiple sites. The system does the monitoring. This is Going.com's model (2M+ subscribers at $49/yr, 80%+ gross margin — research-5-revenue-models.md) fused with personalised preference matching. Going.com monitors; HP monitors AND matches to your preferences.

**Differentiator vs Going.com:** Going.com sends generic flight deals to anyone who signed up for a route. HP alerts are qualified by the preference graph — "Porto at £240 is a good deal AND matches your preference for boutique city breaks under £400." The alert is personalised, not broadcast.

**Evidence:**
- Going.com: 2M+ subscribers, $49/year, 80%+ gross margin — validates willingness to pay for deal alerts at scale (STRONG)
- Hopper: personalised price drop notifications are a primary re-engagement driver; 60%+ fintech attach rate on users who engage with alerts (STRONG)
- Google Travel: "Hotel price tracking" rolled out globally November 2025 — price alert behaviour is validated by Google entering the space (STRONG)
- 🟡 GAP: Going.com's model monetises alerts as the primary product (subscription), whereas HP treats alerts as a retention mechanic that drives booking commission. The conversion rate from alert to HP-platform booking (vs user going to Booking.com directly) is unvalidated — this is a booking leakage risk.

**Validation method:** Waitlist sign-up with stated destination/budget preferences. Send 5 manual alerts to waitlist members in Month 1. Measure click-through rate and platform-booking conversion. Target: >30% CTR, >10% booking conversion. Owner: [PM]. Timeline: Month 1–2.

**Risk:** MEDIUM. Booking leakage from alerts is the primary risk — user gets the alert, goes to Booking.com to book. Mitigation: deep-link the alert directly to a pre-populated HP booking flow. One fewer click to book on HP vs Booking.com = leakage reduction. Also: HP's deal confidence score is the reason to book here, not on Booking.com.

---

## OPPORTUNITY 2: "I don't trust that deals are actually good"

**The struggle:** UK travellers, particularly the 3+ trips/year segment, have been burned by "deals" that weren't. They've seen dynamic pricing inflate artificially, "sale" labels on full-price inventory, and hotel descriptions that don't match reality. The commission-credibility problem is structural: platforms that earn commission on bookings have an inherent incentive to push higher-commission options, not the best options.

**Why this matters for the outcome:** Trust is the conversion lever at the booking moment. Users who plan on HP and book on Booking.com (the #1 failure mode — Desti, TripIt, Culture Trip) are doing so because they trust Booking.com's pricing integrity more than an unfamiliar platform. Deal confidence scoring that is transparent, evidence-based, and personalised is the mechanism that captures the booking.

**Evidence base:**
- Booking leakage killed Desti (SRI/Siri team), TripIt revenue model, Culture Trip — documented in research-5-revenue-risks.md (STRONG)
- "They will go to the channel they are used to" — Desti co-founder Nadav Gur, post-mortem (STRONG)
- 61% of business travellers book outside managed channels even when mandated — Fox World Travel research (STRONG — leisure leakage is likely higher)
- 🔴 CONTRADICTION: The visible preference graph + transparent deal scoring was designed to resolve commission-credibility (discovery.md Kill Signals section). But there is no direct evidence this mechanism actually changes booking behaviour in favour of a new entrant. The mechanism is logical but unvalidated. This is the highest-priority assumption to test.

---

### 2.1 Solution: Deal Confidence Scoring ("This is a good deal for you")

**Description:** Every deal in the HP feed carries a Deal Confidence Score: a visible, explained metric that tells users whether a price is good based on (a) price history for that route/hotel, (b) their personal budget constraints, and (c) their preference graph match. Not a generic "good deal" badge — a personalised signal.

**Display:** Score from 1–10 with three components shown: "Price: 8/10 (24% below 6-month average) | Fit: 9/10 (matches your boutique hotel + city preference) | Budget: 7/10 (£380 of your £400 city break budget)." User can see exactly why this is recommended.

**Why this directly addresses leakage:** The user's alternative is Booking.com, which shows them a price with no context. HP shows them the same price plus evidence that it's good. If HP's evidence is credible, the decision calculus shifts. This is Hopper's price intelligence fused with personalised matching — but made transparent, not a black box.

**Evidence:**
- Hopper: price prediction and deal confidence drive 40% of annual bookings; users who engage with price prediction book at significantly higher rates — McKinsey/Hopper (STRONG)
- Transparent pricing increases conversion: 94% of consumers are more likely to remain loyal to a brand that offers complete transparency — Label Insight study (PARTIAL — cross-domain)
- HP's visible preference graph and transparent deal scoring resolves commission-credibility — identified as a kill signal resolution in discovery.md (PARTIAL — logical resolution, not user-validated)
- 🟡 GAP: No direct A/B test data on whether deal confidence scoring increases booking conversion vs standard OTA price display. This is the core commercial assumption and needs a concierge experiment to validate.

**Validation method:** Concierge A/B — send Group A three deals with price + description only. Send Group B same deals with deal confidence score + explanation. Measure booking conversion rate difference. Target: Group B converts at 1.5x Group A. Cost: £0 build. Owner: [PM]. Timeline: Month 1–2. [[strategy/12-decision-tree.md]]

**Risk:** MEDIUM. Risk is that users don't value the scoring enough to change booking behaviour, or that early scores are inaccurate (cold start on price history data) and damage trust rather than build it. Mitigation: use Going.com's pricing data and Google Flights historical patterns to seed price history before HP has its own dataset.

---

### 2.2 Solution: Price History Transparency ("See the last 6 months of pricing")

**Description:** For every deal shown, users can expand to see a simple price history chart: last 6 months of pricing for this route/hotel combination, with the current price annotated. No algorithm, no magic — just evidence. "This hotel was £320 last month. Today it's £260."

**Why this builds trust:** It mirrors what a knowledgeable friend would show you. It's the mechanism Hopper built its entire brand on — but Hopper presents it as a recommendation ("buy now" / "wait"). HP presents it as evidence the user can evaluate themselves. This is consistent with the "cockpit, not autopilot" design principle — user stays in control, platform provides ammunition.

**Technical implementation:** Price history requires data collection before launch. Start scraping route/hotel prices via Duffel sandbox and RateHawk API 8–12 weeks before user-facing launch. Historical depth at launch: 2–3 months. This is thinner than Hopper's 8-year dataset but sufficient for directional trust-building.

**Evidence:**
- Hopper built to $850M revenue (2024) on price intelligence as primary value proposition (STRONG)
- Google Flights "price tracking" and "best time to buy" features have been rolled out globally — validates user appetite for pricing transparency (STRONG)
- 🟡 GAP: HP's price history at launch will be 2–3 months deep. Hopper's is 8 years. Early users may notice the thin historical dataset and lose confidence. Mitigation: be transparent about data depth ("Based on 10 weeks of pricing data — we're building this dataset to serve you better over time").

**Validation method:** Include price history chart in concierge MVP emails. Ask users in follow-up survey: "Did seeing the price history affect your decision?" Target: >60% say yes. Owner: [PM]. Timeline: Month 2–3.

**Risk:** LOW-MEDIUM. Implementation is straightforward (data collection + charting). Risk is thin historical dataset at launch. Acceptable at MVP stage.

---

### 2.3 Solution: Transparent Preference Matching ("Here's why we recommended this")

**Description:** Every recommendation shows an explicit preference match explanation: "We recommend this because you prefer boutique hotels (set in preferences), you've searched for warm destinations three times, and this property has a food scene score that matches your cuisine preference." User can edit the preference graph directly from the recommendation card.

**Why this directly addresses commission-credibility:** The fundamental trust problem with OTAs is opacity — users suspect recommendations are driven by commission, not quality. HP shows its working. If users can see the preference-based logic, they can evaluate whether the recommendation is genuine. This is the "visible preference profile" USP vs every incumbent (research-3-ai-travel.md Gap Analysis).

**Evidence:**
- No travel platform has shipped a visible preference graph — confirmed across 12 competitors in research-3-ai-travel.md (STRONG — competitive whitespace confirmed)
- "Preference graph visible to user" — unique to HP in the competitor matrix (discovery.md) (STRONG)
- 94% trust increase with transparency — directional proxy (PARTIAL)
- 🟡 GAP: No user research on whether visible preference graphs actually change trust levels or booking conversion. The mechanism is logically sound but empirically unvalidated. Priority for Week 5–8 user interviews.

**Validation method:** Week 5–8 user interviews (8–10 participants from target user segment). Show mockup of preference graph with "why recommended" explanation. Ask: "Does seeing this make you more likely to book through this platform vs Booking.com?" Target: >7/10 users say yes. Cost: £500. Owner: [PM]. [[strategy/12-decision-tree.md]]

**Risk:** MEDIUM. Risk is that the preference graph at MVP is too sparse to be meaningful and the "why" explanation feels hollow. Early users may have only 2–3 stated preferences, making the explanation generic. Mitigation: design the onboarding conversation to capture enough explicit preference data on Day 1 to make explanations meaningful from the first recommendation.

---

## OPPORTUNITY 3: "I can't manage my year of travel in one place"

**The struggle:** UK travellers who take 3+ trips/year manage their travel across spreadsheets, Notion templates, email threads, saved Booking.com pages, and mental accounting. There is no single place that holds their full travel year: what's booked, what's planned, what they're dreaming about, how much budget is left. The cognitive overhead of managing multiple trips across different platforms is real — but it's a need that only emerges after the first booking, not before.

**Why this matters for the outcome:** The portfolio view is the retention mechanic, not the acquisition hook. Users arrive via a city break deal (Opportunity 1). They book. Then they see a portfolio view that tracks their year. This is the "loyalty lock" — by trip #3, their travel year lives here. Leaving means starting from scratch.

**Evidence base:**
- Current workaround: spreadsheets, Notion templates, mental maths — documented in discovery.md (STRONG — validated via PM's direct experience and target user behaviour)
- TripIt: 20M users organising their travel itineraries — validates market for travel organisation tools (STRONG)
- 53% of high-income households use travel agents — people ARE paying for organisation and seamless planning by humans (discovery.md, swarm-2-synthesis.md) (STRONG)
- 14% of 16–24s have 3+ trips booked simultaneously (ABTA 2024) — portfolio behaviour already exists in the target segment (STRONG)
- 20% of UK adults had 2+ international trips booked for the following year (ABTA) (STRONG)
- 🔴 CONTRADICTION: 78% prefer spontaneous travel decisions (discovery.md). The portfolio view requires forward planning — it assumes users want to manage their year, not react to deals. The city break hook resolves this tension (users enter reactively, discover portfolio benefit through use), but the portfolio as a primary messaging frame may repel spontaneous travellers. Do NOT lead with portfolio in acquisition messaging.

---

### 3.1 Solution: Portfolio View (budget tracker, trip timeline, booked/planned/dreamed states)

**Description:** A persistent dashboard showing the user's travel year. Three trip states: Booked (confirmed, ATOL-protected), Planned (in consideration, saved deals), Dreaming (destinations noted, no dates set). Budget tracker shows: total annual travel budget, spent, committed, remaining. "You've spent £1,200 of your £3,500 year. Here's what fits for May."

**Why this is the retention mechanism:** Unlike every other feature, the portfolio view becomes more valuable the more trips a user has. Trip #1 — mildly useful. Trip #2 — clearly useful. Trip #3 — essential. This is the compound value mechanic that drives 3+ bookings/year from the same user.

**Evidence:**
- TripIt: 20M users, proving demand for travel management tools even without booking integration (STRONG)
- Monzo Goals / YNAB: budget commitment increases follow-through — cross-domain proxy for annual budget mechanic (PARTIAL)
- 🟡 GAP: TripIt's 20M users are primarily business travellers managing existing itineraries, not leisure travellers planning future trips. The leisure trip planning portfolio is a different use case. No direct evidence that leisure travellers want a portfolio management tool vs just a booking tool. Week 5–8 user interviews should probe this.

**Validation method:** User interview question: "After your first booking with HP, would you return to the platform to add a second trip?" + "Would you use a view that showed your whole travel year?" Target: >7/10 say yes. Owner: [PM]. Timeline: Week 5–8.

**Risk:** LOW for build (this is a display layer over booking data). MEDIUM for adoption — users may not return to a planning tool between bookings. Mitigation: deal alerts + personalised feed drive return visits without requiring the user to intentionally "manage" their portfolio.

---

### 3.2 Solution: Budget Tracker with Spend Awareness

**Description:** At onboarding, users set an annual travel budget (optional). The portfolio view tracks spend: confirmed bookings, estimated costs for planned trips, and remaining budget. The deal feed filters recommendations to fit remaining budget. "You've got £1,800 left. Here's what fits."

**Why budget-awareness drives bookings:** Budget uncertainty is a real friction point. Users who don't know how much they've spent (because it's scattered across multiple cards and platforms) can't confidently commit to a new booking. HP's budget tracker removes that friction — users can see the commitment clearly and act.

**Evidence:**
- YNAB and Monzo Goals: explicit budget commitment increases follow-through rates significantly — cross-domain evidence from fintech (PARTIAL)
- Jet2: Package bookings at £98 profit/passenger vs flight-only at £18 — users buying packages have already committed to a budget for the trip, not just the flight. Budget pre-commitment correlates with higher AOV. (PARTIAL proxy)
- 🟡 GAP: No direct evidence that an annual travel budget tracker changes booking frequency or conversion rates. The mechanism is logical but unvalidated in the travel context. This is a Phase 1b feature, not MVP.

**Validation method:** Include budget-setting in onboarding for 50% of early users (A/B test). Measure whether users who set a budget make 2nd booking faster than those who don't. Target: Budget users book 2nd trip 20% faster. Owner: [PM/ENG]. Timeline: Month 4–6.

**Risk:** LOW. Budget tracking is a display feature. Risk is low adoption if users find annual budget-setting feels constraining rather than enabling.

---

### 3.3 Solution: Trip Timeline with Multi-State Management

**Description:** A chronological timeline of the user's travel year. Booked trips are locked with confirmation details. Planned trips have a placeholder with a deal attached. Dreaming entries are destinations/windows without pricing. Users can promote entries: Dreaming → Planned → Booked.

**Why this is the "year of travel" realisation:** The first time a user sees three trips on their timeline — one booked, one planned, one dreaming — the portfolio concept clicks without explanation. The product explains itself through the data.

**Evidence:**
- Notion travel template market: hundreds of community-made travel planning templates — validates that users want this structure (PARTIAL — Notion templates are a workaround proxy)
- Google Trips (killed 2019): Google built this and shut it down, not because users didn't want it, but because it had no booking surface. HP has the booking surface. (STRONG — key precedent that planning tool without booking = no revenue)
- 🔴 CONTRADICTION: Google Trips had Google's distribution, brand, and data. It was killed because a planning tool without a booking surface is a utility, not a business (research-5-revenue-risks.md). HP's answer is identical architecture but with a booking surface. The contradiction is not fatal, but it is the exact failure mode to avoid — the trip timeline must drive bookings, not just organisation.

**Validation method:** After first booking, show 20 users the trip timeline with their booked trip. Ask: "Would you add your next trip here?" + "Would you add trips you're considering?" Observe navigation behaviour. Target: >70% add a second entry unprompted. Owner: [PM]. Timeline: Month 3–4.

**Risk:** MEDIUM. The timeline is only useful if users have >1 trip. For the first 3 months of use, single-trip users won't see the value. Mitigation: pre-populate with sample future trips ("Here's what might fit next") to demonstrate the portfolio concept before they've earned it.

---

## OPPORTUNITY 4: "Recommendations don't match what I actually like"

**The struggle:** Every travel platform that claims personalisation either (a) restates what the user just searched for ("you searched Paris, here's Paris again"), (b) uses opaque ML models that users can't see or correct, or (c) applies generic persona clusters ("adventure traveller," "luxury traveller") that don't capture individual nuance. The result is recommendations that feel generic, even when they've been told your preferences.

**Why this matters for the outcome:** Personalisation quality is the differentiator that drives repeat bookings and reduces leakage. Users who trust that HP knows what they like will book through HP rather than reverting to Booking.com. By trip #3, if the recommendations are genuinely personalised, the preference graph is a loyalty lock.

**Evidence base:**
- 44% cite personalisation as #1 pain point (STRONG)
- 52% of 25–34s frustrated by lack of personalisation (STRONG)
- No platform has shipped a structured, transparent semantic preference graph derived from NLP conversation — confirmed across 12 competitors (research-3-ai-travel.md) (STRONG — competitive whitespace)
- Expedia Romie: closest incumbent, claims cross-trip learning, but mechanism is opaque ML — users cannot see or correct it (research-3-ai-travel.md) (STRONG — confirms the gap)
- 🟡 GAP: 44% cite lack of personalisation as pain, but it's unclear whether they want the platform to know them better OR whether they want more control over filtering. These are different product answers. User interviews need to probe "personalisation as learning" vs "personalisation as control."

---

### 4.1 Solution: Visible Preference Graph ("Here's what we think you like — is this right?")

**Description:** A user-facing representation of the HP preference model. Not a settings page — a living graph. Shows: destination preferences (specific countries/cities, climate type), travel style (city break vs beach vs adventure), accommodation preference (boutique vs chain, price tier), travel party (solo, couple, family), pace (relaxed vs packed itinerary), cuisine priority, budget tier. Each dimension is editable. Derived from NLP conversations + searches + bookings + explicit input.

**Why this is unique:** No platform shows users their preference model. Expedia Romie, Booking.com, Google — all learn implicitly and apply opaquely. HP shows its working. Users can edit it. This transparency is simultaneously a trust mechanism AND a data quality mechanism (users correcting wrong inferences improves model quality).

**Evidence:**
- Competitor matrix confirms no platform has shipped a visible preference graph (research-3-ai-travel.md) — genuine whitespace (STRONG)
- "Preference visible to user: No" across all 12 competitors assessed — discovery.md (STRONG)
- User-correctable ML models: Netflix (thumbs up/down on recommendations) shows that user feedback improves model quality AND increases engagement — cross-domain proxy (PARTIAL)
- 🟡 GAP: No evidence that travel users specifically want to see and edit a preference graph vs simply wanting better recommendations. Some users may find the explicit preference graph to feel "work-like" rather than delightful. User interview question: "Would you use a preference profile you could edit?" needs to be asked directly.

**Validation method:** Show mockup of preference graph in Week 5–8 user interviews. Ask: "Does seeing this make you trust the platform more?" + "Would you edit it?" Target: >8/10 users engage positively with the concept. Owner: [PM]. Timeline: Week 5–8. Cost: £500 (mockup + recruitment).

**Risk:** MEDIUM. Cold start — preference graph is sparse at first and may feel presumptuous ("How do you know I like boutique hotels? I only searched once."). Mitigation: onboarding conversation populates explicit preferences before inference begins. Day 1 preference graph is mostly explicit; Day 90 graph is mostly inferred + confirmed.

---

### 4.2 Solution: Onboarding Conversation ("Tell me how you travel")

**Description:** A structured but conversational onboarding flow that captures explicit travel preferences through questions, not form fields. Not "select your travel style" with 4 checkboxes — a real conversation. "What's the best trip you've ever taken? What made it great?" → NLP extracts implicit preferences from the answer. "Who do you usually travel with?" → explicit data. "What's your rough travel budget for this year?" → budget constraint. "What's your next trip you're thinking about?" → intent signal.

**Duration:** 5–7 turns. Users skip freely. Every answer enriches the preference graph. Unanswered questions are noted as gaps — the system uses session behaviour to fill them.

**Evidence:**
- Netflix cold-start solution: explicit taste calibration at onboarding ("thumbs up/down on sample movies") significantly improves early recommendation quality — cross-domain PARTIAL proxy
- Netflix Semantic GNN and SPiKE paper (2025) describe exactly this architecture for cold start: knowledge graph + explicit onboarding → seed recommendations → implicit refinement (research-4-tech-feasibility.md) (STRONG — architectural precedent)
- 🟡 GAP: Travel preferences are more complex than movie preferences and harder to capture in 5–7 turns. "What makes a great trip?" is open-ended in a way that "do you like comedy movies?" is not. NLP extraction from open-ended travel descriptions needs to be tested — does it reliably extract actionable preferences?

**Validation method:** Build onboarding conversation in Typeform (no code, £0). Run 30 users through it. Manually review NLP extractions for accuracy. Target: >80% of extracted preferences are confirmed as accurate by users. Owner: [PM/ENG]. Timeline: Month 1–2.

**Risk:** MEDIUM. User drop-off during onboarding is a real risk — every additional question reduces completion rate. Mitigation: make all questions optional, immediately demonstrate value after question 1 ("Based on what you've said, here are 3 trips you might love"), and complete the rest of the graph through session behaviour.

---

### 4.3 Solution: Per-Trip Learning ("Rate your last trip, improve your next one")

**Description:** After a trip is completed (inferred from return date in portfolio), HP prompts the user to rate 3–5 specific dimensions: "How was the hotel? (1–5)" / "Was the destination what you expected?" / "What would you change?" / "Would you go back to this region?" The ratings update the preference graph with confirmed signal from a real experience.

**Why this creates the loyalty lock:** Every competitor's personalisation is based on browsing behaviour. HP's is based on actual trip outcomes. A user who rates their trips is giving HP something no competitor has: ground truth preference data from lived experience. After 3–5 rated trips, the preference graph is uniquely rich. Leaving HP means abandoning that data.

**Evidence:**
- Spotify "Discover Weekly" model: the more you listen, the better the recommendations — weekly listening data is the equivalent of per-trip ratings (PARTIAL — cross-domain)
- "Preference improves per completed trip: No evidence" across all 12 competitors — research-3-ai-travel.md (STRONG — unique feature, confirmed unoccupied)
- Airbnb post-trip review flow converts at high rate and is the primary trust signal for both guests and hosts — cross-domain proxy for post-trip engagement (PARTIAL)
- 🟡 GAP: Travel trips happen at most 3–6 times per year. Spotify users listen daily. The data signal from per-trip learning is much sparser than the music streaming analogy implies. The preference graph may need 2–3 years of trips to reach meaningful depth — but the 18-month outcome window requires it to be useful earlier.

**Validation method:** After first booking (Month 3–6), prompt 20 users for trip rating. Measure completion rate. Ask: "Did rating your trip change what you saw in your deal feed?" Target: >60% complete trip rating, >50% observe feed change. Owner: [PM]. Timeline: Month 4–6.

**Risk:** LOW for feature, MEDIUM for impact at 18 months. Per-trip learning is the long-term moat — it takes time to mature. At the 18-month mark, most users will have 3–5 rated trips at most. The preference graph will be richer but not yet the fully-formed loyalty lock. This is a Year 2+ competitive advantage, not a Month 12 differentiator.

---

## OPPORTUNITY 5: "Booking packages is fragmented"

**The struggle:** Self-serve package booking in the UK is broken. OTAs (Booking.com, Expedia) don't sell flights — they send users to Google Flights or a separate tab. Flight-first booking (Skyscanner) doesn't include hotels. Package operators (Jet2Holidays, LoveHolidays) have curated packages but limited flexibility and no NLP/personalisation. The result: users who want flights + hotel + car + transfer have to book each element separately, manage multiple confirmation emails, and have no ATOL protection on piecemeal bookings.

**Why this is the economic unlock:** The bed bank model transforms the unit economics. Affiliate commission on hotel: £8–13/booking. Bed bank net rate + markup: £40–50/booking. Dynamic package (Duffel flight + RateHawk hotel): £50–60/booking. The strategic imperative from research-6-bed-banks.md is clear: affiliate economics don't survive paid CAC. Dynamic package economics do.

**Evidence base:**
- LoveHolidays: £288M revenue, £83M EBITDA (28.8% margin), 9.9% take rate on £2.9B GTV — dynamic packaging = zero inventory risk (discovery.md) (STRONG)
- On The Beach: £209 margin per booking, 29% EBITDA margin (discovery.md) (STRONG)
- Jet2: Package = £98 profit/passenger vs flight-only = £18 (5.4x) (discovery.md) (STRONG)
- Bed bank margins: 13–26% gross margin on hotel component vs 4% affiliate (research-6-bed-banks.md) (STRONG)
- RateHawk: free API access, no minimum volume, self-service signup, 2.5M+ properties — accessible starting point confirmed (discovery.md) (STRONG)
- 🔴 CONTRADICTION: Booking leakage killed Desti, TripIt, and 300+ planning startups (research-5-revenue-risks.md). The package booking feature MUST be better than Booking.com at the moment of booking — not just better at research. If users plan on HP and book on Booking.com, the bed bank economics are irrelevant. One-click booking is the critical execution requirement.

---

### 5.1 Solution: Multi-API Package Assembly (Duffel + RateHawk)

**Description:** A single booking flow that assembles a personalised package in real time: Duffel API for flights (modern REST, no IATA required, $3/order + 1%) + RateHawk API for hotels (net rate model, 2.5M+ properties, free API access) + Cartrawler/Jayride for car hire. User sees: flight + hotel + car as one package price, with HP markup applied. ATOL-protected on booking confirmation.

**Why Duffel + RateHawk is the right starting stack:**
- Duffel: no IATA required, developer-friendly, PM has a contact at Duffel (discovery.md) — fastest path to live flight booking
- RateHawk: free API access, no minimum volume, self-service signup (discovery.md) — fastest path to bed bank margins without commercial negotiation
- Path to scale: Hotelbeds (300K+ properties, 80K bookings/day) at Month 3–6 when booking history exists; TravelgateX (1,000+ suppliers via one GraphQL API) in Phase 2

**Evidence:**
- Dynamic packaging mirrors LoveHolidays model — £288M revenue, confirmed viable (STRONG)
- RateHawk API confirmed: free access, sandbox available, net rate model (research-6-bed-banks.md) (STRONG)
- Duffel API: PM has contact, confirmed modern REST API, no IATA required (discovery.md) (STRONG)
- ATOL: Small Business ATOL costs £3,200–4,700, takes 12 weeks. ABTOT franchise ATOL from £942 as bridge (discovery.md) (STRONG)
- 🟡 GAP: The 12-week ATOL timeline means dynamic packaging cannot launch at MVP. The path: affiliate booking at Day 1 → RateHawk bed bank at Month 2–3 → ATOL at Month 3–6 → dynamic packages at Month 4–6. The 18-month outcome requires dynamic packages to be live by Month 6 to drive the economics.

**Validation method:** RateHawk API sandbox evaluation — [ENG] to build proof-of-concept hotel search + booking in sandbox within 2 weeks. Target: successful test booking via sandbox API. Cost: £0 (free sandbox). Owner: [ENG]. Timeline: Week 3–4. Parallel: begin ATOL application. Owner: [BIZ]. Timeline: Month 1 (12-week clock starts day 1).

**Risk:** HIGH for timeline, LOW for technical feasibility. The ATOL 12-week timeline is the critical path constraint. Without ATOL, HP cannot sell ATOL-protected packages — it can only sell hotels (bed bank) and refer flights (affiliate). The dynamic package economics (£50–60/booking) are not available until ATOL is in place. Mitigation: begin ATOL application on Day 1 in parallel with product build. [[strategy/13-phase-1-plan.md]]

---

### 5.2 Solution: One-Click Booking from Deal Feed

**Description:** The deal feed card shows a pre-assembled package: "Porto, 4 nights, 2 adults. Flights from Gatwick + 4-star boutique hotel. £387 total." One button: "Book this." HP handles the multi-API booking in the background, presents a single confirmation, and issues an ATOL certificate. The user does not navigate between tabs, re-enter details, or manage multiple confirmation emails.

**Why one-click is the anti-leakage mechanism:** The single biggest reason users leak to Booking.com is that the path to booking is shorter there — they have saved card details, saved personal info, and a trusted interface. HP's one-click booking reduces the friction differential to near-zero. If the booking experience on HP is as fast as Booking.com, and HP's deal confidence score is trusted, the leakage incentive disappears.

**Technical requirements:** Pre-authenticated user (email/Google SSO from onboarding), saved payment method (Stripe), pre-populated passenger details from profile, background Duffel + RateHawk API calls on "Book this" click, single payment capture, ATOL certificate generation, confirmation email. All orchestrated server-side.

**Evidence:**
- Booking.com/Expedia: dominant because of saved credentials and trusted checkout — identified as the primary leakage mechanism (research-5-revenue-risks.md) (STRONG)
- Stripe: PCI-compliant, travel-sector-ready, 3D Secure, FX handling, dispute management — reduces payment infrastructure build by months (PARTIAL — Stripe capability confirmed)
- One-click checkout: Amazon 1-Click patent (expired) drove significant conversion lift — cross-domain proxy (PARTIAL)
- 🔴 CONTRADICTION: "One-click booking" requires all APIs to succeed in a single flow. Duffel + RateHawk + payment + ATOL in one transaction has real failure modes: flight/hotel sold out between display and booking, API timeout, card decline. The "one-click" UX must handle failure gracefully without abandoning the user. Error handling is as important as the happy path.

**Validation method:** Technical: implement Duffel + RateHawk API integration in sequence and measure end-to-end booking success rate. Target: >95% success rate on test transactions before going live. Owner: [ENG]. Timeline: Month 3–5.

**Risk:** HIGH. This is the most technically complex feature in the product. Multi-API orchestration with real-time pricing, payment, and ATOL compliance is non-trivial. Risk mitigation: Phase this. Month 2–3: hotel-only booking via RateHawk (simpler, no ATOL needed for hotel-only). Month 4–6: flight + hotel package with ATOL. Month 6+: car + transfer additions.

---

### 5.3 Solution: ATOL-Compliant Package with UK Trust Signals

**Description:** Every HP package booking is ATOL-protected and displays the ATOL certificate number and CAA logo at checkout and in the confirmation email. For UK consumers, ATOL is a meaningful trust signal — it means financial protection if the operator fails. This is a genuine differentiator vs US-based AI travel startups (Mindtrip, Layla) that have no UK regulatory presence.

**Why ATOL matters for the 18-month outcome:** 4.3 million ATOL bookings were made on "Sunshine Saturday" (January 2025) alone. UK consumers who book packages expect ATOL protection. A platform without it is invisible to the package-holiday segment — which is HP's core revenue model.

**Evidence:**
- 4.3M ATOL bookings on Sunshine Saturday, January 2025 — validates scale of ATOL-protected booking market (STRONG)
- ATOL is legally required for UK flight + hotel packages — this is not optional (STRONG)
- Zero AI-native travel startups are ATOL-registered in the UK — Mindtrip, Layla have no UK regulatory status (research-3-ai-travel.md) (STRONG — genuine first-mover advantage in AI travel + ATOL)
- "UK-native, ATOL-compliant" — USP 3 in discovery.md (STRONG)
- 🟡 GAP: ATOL recognition among younger UK travellers (HP's target: 25–34s) is unknown. Some users in this demographic may not know what ATOL means or care. Messaging test needed: does "ATOL-protected" meaningfully increase conversion for under-35 users, or is it primarily a reassurance for 35+ customers?

**Validation method:** Include ATOL explanation on landing page for 50% of traffic (A/B). Measure email capture rate vs no ATOL mention. Target: ATOL variant converts at >10% higher rate. Owner: [PM]. Timeline: Month 1–2.

**Risk:** LOW for compliance (ATOL application is well-understood). MEDIUM for messaging — ATOL is a hygiene factor for 35+ users but may not move the needle for 25–34s. Design for both: lead with the deal/personalisation hook, ATOL in the trust layer below.

---

## Evidence & Gap Summary Matrix

| Opportunity | Solution | Evidence Strength | Key Gap | Validation Method | Risk | Owner | Timeline |
|---|---|---|---|---|---|---|---|
| 1. Research friction | NLP search | PARTIAL | NLP is table stakes — differentiation is in preference layer, not NLP itself | Gate 1 A/B landing page | LOW-MEDIUM | [PM] | Week 1–2 |
| 1. Research friction | Personalised deal feed | PARTIAL | Feed conversion rate for proactive (not searched) deals unvalidated | Concierge MVP: manual deals to 20 users | MEDIUM | [PM] | Month 2–3 |
| 1. Research friction | Deal alerts | STRONG | Booking leakage from alert to Booking.com unvalidated | Alert → platform booking conversion test | MEDIUM | [PM] | Month 1–2 |
| 2. Deal trust | Deal confidence score | PARTIAL | Does scoring change booking behaviour vs Booking.com? Unvalidated | Concierge A/B: scored vs unscored deals | MEDIUM | [PM] | Month 1–2 |
| 2. Deal trust | Price history | STRONG | Data depth at launch only 2–3 months (vs Hopper's 8 years) | User interview: does thin history build or damage trust? | LOW-MEDIUM | [PM] | Month 2–3 |
| 2. Deal trust | Transparent preference matching | STRONG (whitespace) | Does transparency change booking behaviour? Unvalidated | User interview: mockup test | MEDIUM | [PM] | Week 5–8 |
| 3. Portfolio management | Portfolio view | STRONG (TripIt proxy) | Leisure travellers vs business travellers — TripIt is B2B proxy | User interview: "Would you return to see your year?" | LOW | [PM] | Week 5–8 |
| 3. Portfolio management | Budget tracker | PARTIAL | Does budget commitment increase booking frequency? Unvalidated | A/B: budget-set vs no-budget onboarding | LOW | [PM/ENG] | Month 4–6 |
| 3. Portfolio management | Trip timeline | PARTIAL-STRONG | Google Trips precedent: planning tool without booking surface = failure | Observe: do users add 2nd trip to timeline? | MEDIUM | [PM] | Month 3–4 |
| 4. Personalisation quality | Visible preference graph | STRONG (whitespace) | Do users want to see/edit their preference graph? Unvalidated | User interview: mockup test | MEDIUM | [PM] | Week 5–8 |
| 4. Personalisation quality | Onboarding conversation | PARTIAL | Does NLP reliably extract travel preferences from open answers? | Typeform test: 30 users, manual accuracy check | MEDIUM | [PM/ENG] | Month 1–2 |
| 4. Personalisation quality | Per-trip learning | PARTIAL | Signal too sparse at 3–5 trips/year vs daily streaming data | Post-trip rating completion + feed change observation | LOW (build) MEDIUM (impact) | [PM] | Month 4–6 |
| 5. Package fragmentation | Multi-API package assembly | STRONG | ATOL 12-week timeline is critical path — delays dynamic package economics | RateHawk sandbox test Week 3–4; ATOL application Day 1 | HIGH (timeline) | [ENG/BIZ] | Week 3–4 / Day 1 |
| 5. Package fragmentation | One-click booking | STRONG | Multi-API orchestration failure modes unhandled | End-to-end booking success rate test | HIGH | [ENG] | Month 3–5 |
| 5. Package fragmentation | ATOL trust signal | STRONG | ATOL recognition among 25–34s unknown | A/B: ATOL vs no ATOL on landing page | LOW | [PM] | Month 1–2 |

---

## Contradictions Requiring Resolution

### 🔴 C1: NLP is Table Stakes
**Conflict:** HP positions NLP search as a key differentiator, but research-3-ai-travel.md confirms NLP is now standard across all 12 major competitors including Booking.com, Expedia, Kayak, Mindtrip, and Layla.
**Resolution required:** Messaging must position NLP as the *input layer* to a learning preference engine — not as the differentiator itself. "We have NLP" is not a reason to choose HP. "Our NLP feeds a preference graph that gets to know you across every trip" is.
**Owner:** [PM]. **Timeline:** Gate 1 messaging test.

### 🔴 C2: Booking Leakage is the Default Outcome
**Conflict:** The entire HP revenue model depends on capturing the booking, not just the planning. But 300+ startups with equivalent or better planning products failed at exactly this step — users planned on-platform and booked on Booking.com (Desti, TripIt, Culture Trip, Hitlist, Utrip — all documented in research-5-revenue-risks.md).
**Resolution required:** One-click booking + deal confidence scoring + ATOL protection must together reduce the friction differential vs Booking.com to near-zero. If users still prefer to book on Booking.com after using HP's deal confidence score and one-click flow, the revenue model fails. This is the #1 assumption to validate in Months 1–3.
**Owner:** [PM/ENG]. **Timeline:** Month 2–3 concierge test.

### 🔴 C3: Portfolio Frame vs Spontaneous Travel Preference
**Conflict:** 78% of UK travellers prefer spontaneous travel decisions (discovery.md). The portfolio view requires forward planning — explicitly managing your travel year. These appear contradictory.
**Resolution:** City break hook resolves this. HP does not ask users to plan their year upfront. They arrive via a single deal ("great city break, under £400"). The portfolio becomes visible *after* the first booking. Spontaneous travellers enter reactively, discover portfolio benefit through use. Portfolio framing is a retention frame, not an acquisition frame.
**Status:** RESOLVED by product architecture. But messaging must never lead with "plan your year" — always lead with "find your next deal."
**Owner:** [PM]. **Monitor** in Gate 1 A/B test.

### 🔴 C4: Google Trips Precedent
**Conflict:** Google built a fully-featured travel portfolio/itinerary management tool with Google's distribution and data. They killed it in 2019. A standalone travel planning tool, even a great one, is not a business.
**Resolution:** HP has a booking surface — Google Trips did not. The portfolio view is the retention layer, not the product. Revenue comes from bookings (bed bank margin), not from the planning tool. HP is LoveHolidays with a preference engine, not Google Trips with an API.
**Status:** RESOLVED by business model. Must monitor: if users use the portfolio for planning and book elsewhere, HP becomes Google Trips. Booking conversion rate is the leading indicator.
**Owner:** [PM]. **Monitor** monthly from launch.

---

## Opportunity Prioritisation

**Phase 1a (Weeks 1–8) — Validate core assumptions before building:**
1. Gate 1 messaging test (Opportunity 1.1) — does "NLP + personalised deals" messaging convert at >8%?
2. User interviews (Opportunities 2.3, 4.1) — does visible preference graph build trust and change booking intent?
3. Concierge MVP (Opportunity 1.2) — do manually-curated personalised deals generate booking intent?
4. Deal confidence A/B (Opportunity 2.1) — does scoring change booking behaviour?

**Phase 1b (Months 2–4) — Build core product:**
1. RateHawk API integration (Opportunity 5.1) — bed bank margin from Month 2–3
2. ATOL application (Opportunity 5.3) — begin Day 1, required for Month 4–6 package launch
3. NLP onboarding conversation (Opportunity 4.2) — preference graph seeding from first session
4. Portfolio view + deal feed (Opportunities 3.1, 1.2) — retention and re-engagement surface

**Phase 1c (Months 4–6) — Dynamic packages:**
1. Duffel + RateHawk dynamic package assembly (Opportunity 5.1)
2. One-click booking flow (Opportunity 5.2)
3. Deal alerts (Opportunity 1.3)
4. Price history display (Opportunity 2.2)

**Phase 2 (Months 7–12) — Personalisation depth:**
1. Visible preference graph (Opportunity 4.1)
2. Per-trip learning (Opportunity 4.3)
3. Budget tracker (Opportunity 3.2)
4. Premium subscription tier

---

## Revenue Projection Under Desired Outcome

**Desired outcome:** 1,000 active users making 3+ bookings/year within 18 months

| Revenue layer | Per-booking revenue | 1,000 users × 3 bookings | Annual total |
|---|---|---|---|
| Bed bank (hotel net rate, 25% markup) | £40 | 3,000 bookings | £120,000 |
| Dynamic package uplift (Duffel + RateHawk) | £50–60 | 2,000 bookings (67% package rate) | £100,000–120,000 |
| Ancillary affiliate (insurance, car hire, activities) | £15–25 | 3,000 bookings | £45,000–75,000 |
| Premium subscription | £59.99/yr | 300 subscribers (30% attach) | £18,000 |
| **Total ARR at outcome** | | | **£283,000–333,000** |
| Breakeven estimate (small team) | | | **£200,000–280,000** |

At the desired outcome: HP is at or approaching breakeven with a small team. This is the financial gate for raising seed funding or expanding to Hotelbeds + B2B API track.

---

## Linked Artefacts

- [[strategy/00-gap-analysis.md]] — Research synthesis
- [[strategy/03-value-proposition-canvas.md]] — Pain/gain/job analysis
- [[strategy/04-swot-confrontation.md]] — SWOT + response strategies
- [[strategy/05-five-forces.md]] — Structural attractiveness
- [[strategy/06-blue-ocean.md]] — Value curve vs competitors
- [[strategy/07-five-choices.md]] — Where to play, how to win
- [[strategy/08-strategy-kernel.md]] — Diagnosis, guiding policy, coherent actions
- [[strategy/09-wardley-map.md]] — Capability evolution map
- [[strategy/11-wwhtbt-conditions.md]] — Conditions for success
- [[strategy/12-decision-tree.md]] — 5 phase gates, £48k to scale decision
- [[strategy/13-phase-1-plan.md]] — Execution plan

---

## Sources

- Expedia consumer research (n=5,713): 303 minutes average research per trip — discovery.md
- UK AI travel adoption report (Travolution/Travel and Tour World, 2025): 44% lack of personalisation as #1 pain; 61% YoY AI travel usage growth; 183% growth in 18–34s — research-3-ai-travel.md
- research-3-ai-travel.md: 12-competitor matrix; semantic preference graph + portfolio combination confirmed as unoccupied whitespace; UK-native AI travel market open
- research-5-revenue-risks.md: Desti post-mortem (Nadav Gur, Skift); Culture Trip ($155M raised, sold below cost); TripIt (20M users, near-zero booking commission); booking leakage documented; CAC benchmarks £80–200+ for new UK travel entrant
- discovery.md: bed bank margins £45–60/booking (RateHawk net rate + markup); LoveHolidays £288M revenue 28.8% EBITDA; On The Beach £209 margin/booking; Jet2 package £98 profit/passenger vs £18 flight-only; RateHawk free API access confirmed; ATOL costs and timeline; 78% spontaneous travel preference; 14% of 16–24s with 3+ trips simultaneously booked; Sunshine Saturday 4.3M ATOL bookings January 2025
- research-6-bed-banks.md: RateHawk, Hotelbeds, TravelgateX options; dynamic packaging architecture; bed bank margin 13–26% vs 4% affiliate
- Going.com: 2M+ subscribers, $49/yr, 80%+ gross margin — discovery.md
- Hopper: $850M revenue, 70% from fintech; Price Freeze 40% of bookings — discovery.md
- SPiKE paper (2025): preference graph architecture for travel AI — research-4-tech-feasibility.md
- Tripadvisor Qdrant case study: vector DB + semantic embeddings for travel search — research-3-ai-travel.md
- PhocusWire "most common bad startup idea" analysis: travel planning software failure pattern — research-5-revenue-risks.md

---

*Tree version: 2.0. Last updated: 2026-02-28. Next review: at Gate 2 (user interview synthesis, Week 8).*

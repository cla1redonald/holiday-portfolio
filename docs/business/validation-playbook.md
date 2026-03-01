# Holiday Portfolio: Validation Playbook
## Gates 1–3 — 8-Week Pre-Build Validation Programme

**Product:** Holiday Portfolio — UK travel personalisation engine
**Document date:** 2026-02-28
**Status:** Gate 1 ready (landing page built, not yet deployed)
**Confidence scores:** Desirability 8/10 | Viability 7/10 | Feasibility 8/10
**Source documents:** strategy/12-decision-tree.md | strategy/13-phase-1-plan.md | discovery.md

---

## Contents

1. [Executive Summary](#1-executive-summary)
2. [Gate 1: Messaging Test](#2-gate-1-messaging-test-week-1-2-£500)
3. [Gate 2: User Interviews](#3-gate-2-user-interviews-week-2-4-£1000)
4. [Gate 3: Technical Prototype](#4-gate-3-technical-prototype-week-4-8-£2500)
5. [Week-by-Week Timeline](#5-week-by-week-timeline)
6. [Budget Summary](#6-budget-summary)
7. [Risk Register](#7-risk-register)
8. [Recruitment Plan](#8-recruitment-plan)
9. [Tools and Infrastructure](#9-tools-and-infrastructure)
10. [Decision Log Template](#10-decision-log-template)

---

## 1. Executive Summary

### What We Are Validating

Holiday Portfolio is a travel personalisation engine that enters via city break deals, uses NLP input instead of filter search, builds a semantic preference graph over time, and gives users a portfolio view of their travel year. The revenue model depends on bed bank net rates (RateHawk) yielding £45–60 per booking versus £13 on affiliate-only — making breakeven achievable at 800–1,200 users rather than 2,500+.

Six research rounds have produced strong conviction scores (D8/V7/F8). This playbook covers the three pre-build gates designed to stress-test that conviction with real market data before any engineering spend beyond the current landing page.

The three core bets being tested:

1. **Desirability:** UK frequent travellers will voluntarily engage with an NLP-first deal-finding platform rather than defaulting to Booking.com.
2. **Viability:** Booking leakage (planning here, booking on Booking.com) is addressable through trust and deal confidence — not structural.
3. **Feasibility (early signal):** NLP personalisation adds measurable perceived value over standard filter search.

### Current Confidence Scores

| Dimension | Score | Basis |
|-----------|-------|-------|
| Desirability | 8/10 | 6 research rounds: 303-min planning friction confirmed (Expedia n=5,713), 44% cite personalisation as #1 pain, 61% YoY AI travel adoption growth in UK |
| Viability | 7/10 | Bed bank model confirmed (RateHawk free API, no minimum volume), LoveHolidays 9.9% take rate benchmark, breakeven at 800–1,200 users. Bear case: Desti failure pattern, leakage risk, ATOL timeline |
| Feasibility | 8/10 | Stack proven (Claude Haiku NLP, pgvector, Duffel API). Cost modelling at £50–100K total build. Primary risk is sequencing, not capability |

### Total Validation Budget (Gates 1–3)

**£4,000** across 8 weeks. Kill at Gate 3 costs £4,000 total. Build does not start until Gate 3 GO.

### Decision Framework

Every gate produces one of three outcomes:

| Decision | Meaning | Action |
|----------|---------|--------|
| **GO** | Evidence supports proceeding | Commit to next gate's budget and timeline |
| **PIVOT** | Signal exists but not strong enough | Run one additional iteration (extended timeline, refined message or concept) before deciding |
| **KILL** | Evidence contradicts core assumption | Stop. Do not proceed to the next gate. Re-examine the problem framing before any further investment |

The kill cost is front-loaded by design. Failing at Gate 1 costs £500. Failing at Gate 3 costs £4,000. Failing at Gate 4 (live MVP, post-build) costs £19,000. The purpose of this playbook is to surface the most likely failure modes before a single line of production code is written.

> **The Desti lesson:** Desti (SRI/Siri team) built a fully functional AI travel planner. Users loved it. They booked on Booking.com anyway. Co-founder Nadav Gur's post-mortem: "They will go to the channel they are used to." Gate 1 and Gate 2 exist because of Desti.

---

## 2. Gate 1: Messaging Test (Week 1–2, £500)

### Objective

Which value proposition generates genuine demand pull from UK city break travellers who have never heard of Holiday Portfolio? This is a demand-pull test, not a brand awareness test. We are measuring whether the message creates enough pull to trigger a voluntary action (email signup) from a stranger who has seen a paid ad.

### Why This Gate Exists

Before writing a single line of backend code, we need evidence that at least one framing of this product generates real demand. Three different entry frames exist: deal-finding, annual planning, and personalised feed. Research suggests the city break deal frame is strongest (78% spontaneous travel preference finding, discovery.md), but this is a hypothesis. Gate 1 tests all three simultaneously for £500.

### Test Asset

**Landing page:** `holiday-portfolio.vercel.app` (deployed for this test)

The landing page with interactive NLP demo is the Gate 1 test asset. Three URL variants serve three distinct value propositions:

| Variant | URL param | Headline | Frame | CTA |
|---------|-----------|----------|-------|-----|
| **A: Deal Finder** | `?v=a` | "Find your next city break deal — and stop overpaying" | NLP search, deal confidence, no filters | Get early access |
| **B: Annual Planner** | `?v=b` | "Plan your whole travel year in one place" | Budget tracker, preference profile, year view | Join the waitlist |
| **C: Personalised Feed** | `?v=c` | "A deal feed that actually knows how you travel" | Spotify-style discovery, improves per trip | Get personalised deals |

All three variants share:
- Clean single-screen layout
- Interactive NLP demo as centrepiece (the landing page's key differentiator — let users type a query and see intent parsing in action)
- 3-bullet sub-copy matching the variant's frame
- Email capture form above the fold
- No product screenshots beyond the NLP demo
- No logo required at this stage

The interactive NLP demo is the most important element. Visitors should be able to type something like "long weekend somewhere warm, good food, under £400" and see it parsed into structured intent in real time. This is what no competitor landing page can show — and it is the primary thing that will differentiate a high-signup variant from a low-signup variant.

### Ad Setup

**Primary platform:** Meta Ads (Facebook/Instagram)
**Secondary platform:** Google Ads (search terms: "city break deals," "cheap city breaks UK," "travel deals UK")

**Targeting:**
- Geography: UK only
- Age: 25–45
- Interests: travel, city breaks, weekend getaways, frequent flyers, Booking.com, Skyscanner, budget travel
- Household income: £35K+ (inferred via postcode/affluence signals)
- Exclude: current travel agents, people who work in travel

**Budget allocation:**

| Item | Budget |
|------|--------|
| Meta Ads (3 ad sets, equal split) | £300 |
| Google Ads (search, single ad group per variant) | £100 |
| Tooling (Vercel Analytics, email capture) | £50 |
| Contingency | £50 |
| **Total** | **£500** |

**Ad sets:** One ad set per variant, equal budget split (£100 Meta each + £33 Google each). Simple creative — no video required. Headline matches the variant landing page headline. Body copy is 2–3 sentences matching the sub-headline frame. Single image: abstract travel/city imagery or lifestyle photo.

**Budget management rule:** At Day 5, check click-through rate per variant. Kill the weakest performer if its CTR is less than half the best performer's CTR. Redirect remaining budget to the top two variants.

**Traffic volume target:** Minimum 300 unique visitors per variant (900 total) to produce statistically meaningful conversion data. At £400 ad spend across 3 variants, this requires a CPC of ~£0.44 — achievable on Meta for travel interests targeting.

### Metrics to Track

**Primary metric:**
- Landing page visit → email signup conversion rate, per variant

**Secondary metrics:**
- Time on page per variant
- NLP demo interaction rate (did they type a query?)
- Scroll depth (did they read past the fold?)
- Bounce rate per variant
- Cost per email signup per variant

**Tool:** Vercel Analytics (free, built-in) for on-site behaviour. Meta Ads Manager and Google Ads for off-site metrics. Email captures go to Vercel KV or a free Mailchimp/ConvertKit account.

**Tracking setup (Day 1, before ads launch):**
1. Vercel Analytics enabled on all three variant URLs
2. Email form submission fires a custom event in Vercel Analytics
3. Meta Pixel installed on all three pages with `CompleteRegistration` event on form submit
4. UTM parameters on all ad links: `?v=a&utm_source=meta&utm_medium=paid&utm_campaign=g1`

### GO/PIVOT/KILL Criteria

| Signal | GO | PIVOT | KILL |
|--------|-----|-------|------|
| Best variant signup rate | >3% | 1–3% | <1% across ALL variants |
| Total emails collected | >100 | 50–100 | <50 total |
| Clear winning variant | One variant >30% above others | Two variants within 10% of each other | All variants flat and below 1% |
| NLP demo interaction | >40% of visitors type a query | 20–40% | <20% (message not compelling enough to prompt demo use) |

**GO:** Best variant exceeds 3% signup rate AND total signups exceed 100. Proceed to Gate 2 using the winning variant's positioning as the primary interview frame.

**PIVOT:** Best variant hits 1–3%. Interest exists but message isn't sharp enough. Run one revised headline on the best variant for an additional week (£150–200 ad spend extension). If revised headline breaks 3%, proceed to Gate 2. If it stays below 2%, kill.

**KILL:** All variants below 1% after £400 spend. The message has no resonance with UK travellers via paid discovery. Do not proceed to Gate 2 or any build phase. Revisit problem framing or target segment.

### Day-by-Day Timeline

| Day | Activity |
|-----|----------|
| 1 | Deploy all three landing page variants. Enable Vercel Analytics. Configure UTM parameters. |
| 2 | Set up Meta Ads Manager account. Create three ad sets (one per variant). Upload creatives. Set £100/variant budget. Launch ads. |
| 3 | Set up Google Ads campaign. Create ad groups mirroring Meta variants. Launch. |
| 4–5 | Monitor daily. Check CTR, impressions, spend pace. |
| 5 | **Day 5 review:** Kill lowest-performing variant if CTR is less than half the best. Redirect budget. |
| 6–10 | Run ads. Check daily metrics. Note any unusual signups or email replies. |
| 10 | Pause ads. Export all data from Meta Ads Manager, Google Ads, and Vercel Analytics. |
| 11–12 | Analyse results. Calculate conversion rate per variant. Identify winning message. |
| 13–14 | Make gate decision (GO/PIVOT/KILL). Document in Decision Log. If GO, begin Gate 2 recruitment. |

### Outputs from Gate 1

1. Winning value proposition (A, B, or C)
2. Email list of self-selected early adopters (if GO: 100+ contacts)
3. Conversion rate data per variant
4. NLP demo interaction data (which queries do people type?)
5. Gate decision documented in Decision Log (Section 10)

---

## 3. Gate 2: User Interviews (Week 2–4, £1,000)

### Objective

Do real users have the pain we think they have? Is booking leakage — planning on Holiday Portfolio, booking on Booking.com — structural and fatal, or is it addressable through trust and deal confidence?

### Why This Gate Exists

Every planning startup that reached this stage and failed did so because of booking leakage. Desti, Hitlist, Utrip, Onepagetrip, Google Trips — all confirmed planning pain, all saw users book on incumbents. The question Gate 2 must answer is not "do people like the idea?" — it is "is the leakage driven by trust and habit (fixable through transparent deal scoring and visible preference profile) or by price and inventory (not fixable through UX at startup scale)?"

These are not mutually exclusive with desirability. Users can simultaneously want better personalisation (a desirability signal) and continue to book on Booking.com (a commercial failure). Gate 2 must probe the difference explicitly.

### Recruitment

**Total participants:** 8–10 interviews, 45 minutes each

**Participant criteria:**
- UK resident
- Books own leisure travel (not through employer or travel agent exclusively)
- 3+ trips per year, including at least one city break in the past 12 months
- Primary researcher and booker for their household
- Aged 25–50 (skew to the 30–42 range where disposable income and trip frequency intersect)

**Primary source:** Gate 1 email signups — warm leads who self-selected as interested. Email them 24 hours after signing up with a subject line: "Can we get 45 minutes of your time? (+ £20 gift card)."

**Secondary source:** Respondent.io (respondent.io) — professional participant panel. Filter: UK, travel-frequent, 25–45, self-books travel. Cost: approximately £50–75 per participant recruited through the panel.

**Incentive:** £20 Amazon gift card per completed 45-minute session. Send via email immediately after the interview ends.

**Scheduling tool:** Calendly (free tier) — embed link in recruitment email. Sessions via Zoom or Google Meet. Record with participant consent.

**Transcription:** Otter.ai (£40 for the batch — approximately 7.5 hours of recording).

**Estimated recruitment budget:**
- Gate 1 signups (warm): £0 recruitment cost, £20 incentive per person
- Respondent.io supplement (if needed for 8–10 total): £50–75 per participant
- Target: 6 from Gate 1 signups + 4 from Respondent.io = 10 total
- Budget: £200 incentives + £300–500 Respondent.io = £500–700

### Interview Script

**Format:** 45 minutes, semi-structured. One interviewer. Record with consent. Do not pitch the product in the first 30 minutes — listen and probe.

---

**Opening (2 min)**

"Thank you for your time. I'm doing research into how people plan and book travel — I'm not selling anything today. I'd love to hear about your experiences. There are no right or wrong answers. I'll ask you to react to something at the end, but first I want to understand how you actually travel today."

---

**Block 1: Current Behaviour (15 min)**

These questions establish the baseline. Do not mention Holiday Portfolio yet. The goal is to hear the pain in the user's own words, not to confirm your assumptions.

1. "Walk me through how you planned your last city break — from the moment you decided you wanted to go somewhere to the moment you booked."
2. "How many sites or apps did you visit during that process? Which ones? In what order?"
3. "What's the most frustrating part of finding a good deal? What does 'a good deal' even mean to you?"
4. "How do you know when a price is actually good, versus just looks cheap?"
5. "How many trips do you typically take per year? Do you think about them as a group, or one at a time?"
6. "Do you have any system for tracking trips you've planned, trips you're considering, or how much you've spent on travel this year?"

*Probe if they mention spreadsheets, Notion, or any organisation system — this is a key signal.*

---

**Block 2: Leakage Intent (15 min)**

These questions probe the structural question: is leakage trust/habit or price/inventory?

1. "When you find a deal on a new site you've never used before, what happens next — do you book there, or do you check somewhere else first?"
2. "What would make you trust a new travel platform enough to actually book through it, rather than checking Booking.com?"
3. "If a platform showed you a deal and explained *exactly why* it thinks it's a good price for you — based on price history, your budget, and your past preferences — would that change how you evaluated it?"
4. "Have you ever used an AI travel tool — something that let you describe what you wanted in plain English rather than using filters? What happened?"
5. "How important is ATOL protection to you when you book a package? Do you actively look for it?"
6. "If you found a great deal on a platform you'd never heard of, what's the one thing that would stop you from booking it right there?"

*Listen for: "I'd want to check they're reputable" = trust/habit. "Booking.com always has better prices" = inventory/price. These require different responses.*

---

**Block 3: Concept Test (15 min)**

Share screen — show the Gate 1 winning variant landing page. Do not explain it. Watch their reaction.

1. "What's your first impression — what do you think this does?"
2. "Can you show me what you'd search for?" — let them type into the NLP demo. Watch what they type. Note their reaction to the output.
3. "Does the result match what you expected?"
4. "Would you sign up for something like this? What would make you more likely to? What would put you off?"
5. "What's missing from what you've seen?"
6. "Would you pay for this? If so, how much — per trip, or per year?"
7. "How does this compare to how you currently plan and book?"

*Key moment: watch them use the NLP demo. Their query choice, their reaction to the parsed output, and their facial expression are as informative as their verbal answers.*

---

**Closing (3 min)**

"Is there anything about travel planning and booking that we haven't touched on that you think is important?"

Thank them. Send gift card immediately.

---

### Analysis Framework

Score each interview 1–5 on four dimensions immediately after the session:

| Dimension | 1 | 3 | 5 |
|-----------|---|---|---|
| **Pain recognition** | "I don't really have a problem with how I book now" | "It takes a while but it's fine" | "I hate how scattered it is / I always wonder if I'm overpaying" |
| **Solution fit** | "I wouldn't use this over Booking.com" | "Interesting but I'd need to see it working" | "This is exactly what I've wanted" |
| **Willingness to try** | Would not try it | Might try it for something low-stakes | Would try it for their next city break |
| **Willingness to pay** | Would not pay | Might pay £0–20/year | Would pay £30–60/year |

Track the following across all interviews:

- **Leakage driver:** Trust/habit vs. price/inventory (record verbatim quote)
- **Strongest objection:** What would most prevent them from booking here?
- **NLP demo reaction:** Did they engage, get excited, get confused, or seem indifferent?
- **Portfolio interest:** Did they show any emotional engagement with the annual view concept?
- **Spontaneous question:** Did they ask "how do I sign up?" without being prompted?

### Key Hypotheses

| Hypothesis | Test method | GO signal |
|------------|-------------|-----------|
| H1: Planning fragmentation is a felt pain, not just a data point | Block 1 questions | Spontaneous frustration without prompting |
| H2: Leakage is trust/habit, not price/inventory | Block 2, question 1 and 6 | Trust/habit cited by >6/10 as the primary barrier |
| H3: Deal confidence framing changes the evaluation | Block 2, question 3 | >6/10 say the explanation changes how they'd evaluate the deal |
| H4: NLP input is preferable to filter search | Block 3, NLP demo | >6/10 engage positively with the demo; <4/10 express confusion |
| H5: Portfolio view generates any emotional engagement | Block 3, question 7 | Any participant says "I'd love that" or asks a follow-up |

### GO/PIVOT/KILL Criteria

| Signal | GO | PIVOT | KILL |
|--------|-----|-------|------|
| Would try HP for next booking | >6/10 score ≥3 on willingness to try | 4–6/10 | <4/10 |
| Leakage driver | Trust/habit dominates in >6/10 | Mixed — both trust and price cited | Price/inventory cited by >6/10 as primary reason they use Booking.com |
| NLP demo engagement | >6/10 engage positively | Mixed reactions | >6/10 confused, indifferent, or prefer standard search |
| Willingness to pay | >4/10 would pay £30+/year | 2–4/10 would pay something | <2/10 would pay anything |
| Unprompted "how do I sign up?" | >5/10 | 2–5/10 | 0–1/10 |

**GO:** >6/10 would try it, leakage is trust/habit-based, NLP demo resonates. Proceed to Gate 3.

**PIVOT:** Pain is clearly real (Block 1 confirms it) but the solution frame isn't landing (low NLP engagement, weak willingness to try). Refine the concept — potentially shifting emphasis from the portfolio view to the deal confidence scoring — before committing to a prototype build.

**KILL — Hard stop:** Users consistently and explicitly state: "I use Booking.com/Expedia because they have better prices or more options, and I see no reason to switch." If more than 6 out of 10 participants give this as their primary reason, the barrier is inventory and price — not solvable through better UX or AI personalisation at startup scale. Do not proceed to Gate 3. This is the Desti outcome. The model requires a structural rethink.

### Timeline

| Week | Activity |
|------|----------|
| Week 2, Day 1 | Email Gate 1 signups with interview request and Calendly link |
| Week 2, Day 2 | Open Respondent.io recruitment (supplement if Gate 1 list insufficient) |
| Week 2, Day 3–5 | Confirm 8–10 bookings. Briefing email to participants the day before. |
| Week 3, Day 1–4 | Conduct interviews (2–3 per day across 4 days). Record, transcribe same day. |
| Week 4, Day 1–2 | Score all interviews. Synthesise findings across the four dimensions. |
| Week 4, Day 3 | Identify dominant leakage driver. Map hypotheses to evidence. |
| Week 4, Day 4 | Write interview synthesis (1–2 pages). Make gate decision. |
| Week 4, Day 5 | Document decision in Decision Log. If GO, begin Gate 3 prototype spec. |

### Outputs from Gate 2

1. Interview synthesis document (8–10 interviews scored across 4 dimensions)
2. Confirmed leakage driver (trust/habit or price/inventory)
3. Verbatim quote bank organised by theme
4. Revised concept brief (if PIVOT) or confirmed concept (if GO)
5. Pool of 4–6 willing participants for Gate 3 prototype testing
6. Gate decision documented in Decision Log

---

## 4. Gate 3: Technical Prototype (Week 4–8, £2,500)

### Objective

Does NLP personalisation add measurable perceived value over standard filter search — specifically in travel, specifically for UK city breaks, specifically for this user segment? Can a first-time user get from a conversational query to a result they would actually book in under 3 minutes?

### Why This Gate Exists

NLP input is now table stakes across travel platforms (Booking.com, Google Travel, Mindtrip, Layla). The differentiation is not "we have NLP" — it is the combination of NLP + visible preference graph + deal confidence scoring. Gate 3 tests whether this combination creates a materially different *felt experience* from typing into a standard search box. If it does not, the core product differentiator is not working at prototype level, and committing £15,000 to a live MVP build is premature.

### Prototype Evolution

The Gate 1 landing page already has a client-side NLP demo. Gate 3 evolves this into a functional prototype with four screens:

**Screen 1: NLP Input**

Text field accepting conversational queries. Claude Haiku (Anthropic API) replaces the client-side keyword matching — the search engine is already async, making this a drop-in replacement. Extract structured intent from free-text travel queries.

Example:
```
User input: "Long weekend somewhere warm, good food scene, under £400 for two"
Parsed output: {
  budget_gbp: 400,
  party_size: 2,
  trip_duration: "3–4 nights",
  destination_attributes: ["warm climate", "strong food culture"],
  style: ["local feel", "not tourist traps"]
}
```
Target latency: under 3 seconds total (NLP parse <600ms + result generation <2,400ms). Source: research-4-tech-feasibility.md.

**Screen 2: Personalised Results**

Deal cards with deal confidence scoring. Use Duffel sandbox (free tier) for real flight data on common routes: London Heathrow → Lisbon, Manchester → Amsterdam, London Gatwick → Barcelona, London → Porto, Birmingham → Seville.

Each card shows:
- Destination name and photo
- Estimated total price (flight + hotel)
- Deal confidence score: "Good deal for you" / "Fair price" / "Monitor — prices may drop"
- One-sentence rationale: "Prices on this route are 18% below the 90-day average for your preferred travel dates."
- "Book this" CTA (goes to Screen 4)

Hotel data: RateHawk test account (free sandbox) or curated static mock data for the 8–10 routes above. Do not attempt live hotel API integration at this stage — static plausible pricing is sufficient to test perceived value.

**Screen 3: Visible Preference Profile**

A visible, editable preference profile seeded automatically from the prototype session.

Example output after one search query:
> "Based on your search, we think you: prefer warm climates, value strong food scenes, travel in pairs, and typically spend under £400 per trip. Is this right?"

Editable via toggle/tag interface — add or remove tags, adjust budget slider. This is the differentiator no incumbent offers. It is the primary thing being tested in Gate 3 sessions.

**Screen 4: Mock Booking Flow**

Not a real booking. A checkout screen showing the assembled package (flight + hotel + price breakdown) with a "Complete booking" button that leads to a thank-you confirmation screen. We are measuring willingness to reach the booking intent step, not actual payment conversion.

### Tech Stack for Prototype

| Component | Technology | Cost |
|-----------|------------|------|
| Frontend | Next.js on Vercel (preferred) — the landing page is already Next.js | £0 (free tier) |
| NLP | Claude Haiku API (drop-in replacement for client-side matching) | ~£0.006/query — negligible |
| Preference graph | Static JSON per session — no database required at Gate 3 stage | £0 |
| Flight data | Duffel sandbox API (free tier) | £0 |
| Hotel data | RateHawk sandbox OR static mock data for 10 routes | £0 |
| Session recording | Lookback.io or Loom (observer during moderated sessions) | £0–50 |

**Development estimate:** 2–3 weeks at junior/mid full-stack developer rates (£800–1,200/week). The NLP swap is the core change — estimated 3–5 days of engineering. The preference profile screen is the next priority — estimated 2–3 days. Results display and mock checkout: 3–4 days.

**Total prototype budget:**

| Item | Cost |
|------|------|
| Developer time (2.5 weeks at £800/week mid-weight) | £2,000 |
| Claude Haiku API credits (test volume) | £50 |
| Duffel sandbox (free) + tooling | £50 |
| Session recording tool (Lookback) | £50 |
| Participant incentives (6 sessions × £20) | £120 |
| Contingency | £230 |
| **Total** | **£2,500** |

### A/B Test Design

Recruit 50–100 users from the combined Gate 1/2 email list for a 2-week remote test.

**Group A (keyword matching — control):** 50% of users receive the existing client-side keyword matching version of the landing page NLP demo. This is the baseline.

**Group B (Claude Haiku NLP — treatment):** 50% of users receive the prototype with real Claude Haiku intent parsing, personalised results, and the visible preference profile.

**Randomisation:** Simple 50/50 split via URL parameter or Vercel A/B feature flag.

**Primary funnel to track:**
1. NLP input typed → results displayed
2. Results displayed → deal card clicked
3. Deal card clicked → preference profile viewed
4. Preference profile viewed → "Book this" CTA clicked (mock booking intent)

**Test period:** 2 weeks (Week 6–7). Minimum 50 users per group for directional signal.

**Moderated sessions in parallel:** 5–6 participants from Gate 2 who expressed interest. Run moderated 30-minute usability sessions via Zoom screen-share during Week 6. Task: "You want a city break in the next 6 weeks. Use this to find something." Observe without prompting. Note where they hesitate, what they type, their reaction to the preference profile.

**Moderated session script:**

1. "You've got a city break coming up in 6 weeks. Use this tool to find something you'd actually book." (Observe without prompting for 10 minutes.)
2. After they reach results: "What's your reaction to what you're seeing?"
3. After they see the preference profile: "What do you think of this? Is it accurate? Does it feel useful?"
4. After they hit the mock booking CTA: "If this were real, would you have completed that booking? What would have stopped you?"
5. "Compare this to how you'd normally search for a city break. What's different? Better? Worse?"

### GO/PIVOT/KILL Criteria

**Primary metric:** Percentage of NLP group users who reach the "Book this" CTA click (mock booking intent step).

| Signal | GO | PIVOT | KILL |
|--------|-----|-------|------|
| NLP group: reach mock booking CTA | >50% of NLP users | 30–50% — engagement but drop-off before intent | <30% — NLP adds no value over baseline |
| NLP vs keyword: funnel improvement | NLP group meaningfully outperforms keyword group at each funnel step | NLP group engages more but conversion gap is small | NLP group shows no material difference from keyword group |
| Moderated sessions: preference profile reaction | >4/6 participants say the profile is accurate and feel it adds value | Mixed — some find it useful, some indifferent | >4/6 find it confusing, wrong, or see no value in it |
| Time to first result | Under 3 seconds (NLP + results displayed) | 3–5 seconds (borderline, may cause drop-off) | Over 5 seconds (unacceptable for consumer product) |
| Search → result click rate | >40% of users click a deal card | 20–40% | <20% — results not compelling enough |

**GO:** >50% of NLP users reach mock booking CTA AND NLP outperforms keyword matching across the funnel AND preference profile lands well in moderated sessions. Proceed to Gate 4: Live MVP build (£15,000, 8–10 weeks engineering).

**PIVOT:** NLP users engage more than keyword users but drop off before reaching booking intent. The personalisation thesis is directionally correct but the results display or deal confidence scoring needs iteration. Spend 1 additional week refining the results screen and confidence display before making the GO/KILL call.

**KILL:** NLP adds no measurable value over keyword matching across the funnel AND the preference profile generates confusion or indifference in moderated sessions. The personalisation thesis is not validated at prototype level. Do not invest £15,000 in a live build. This is a pivot point: re-examine whether the product is a planning tool with affiliate revenue (lower conviction model) or whether a different differentiator needs to be identified.

### Timeline

| Week | Activity |
|------|----------|
| Week 4 | Spec the prototype. Commission developer. Set up Duffel sandbox. Request RateHawk test account. |
| Week 5 | Build: NLP swap (Claude Haiku), results screen with deal confidence, preference profile screen. |
| Week 5, Day 5 | Internal test: PM runs through full flow. Fix critical UX issues. |
| Week 6, Day 1 | Send A/B test invitations to 100 users from Gate 1/2 list. |
| Week 6, Day 1–4 | Moderated sessions: 5–6 participants from Gate 2, 30 minutes each. |
| Week 6–7 | A/B test running. Monitor funnel daily. Check for technical errors. |
| Week 8, Day 1–2 | Close test. Export funnel data. Analyse A/B results. Synthesise moderated session notes. |
| Week 8, Day 3 | Make gate decision (GO/PIVOT/KILL). Write Gate 3 summary. |
| Week 8, Day 4–5 | Document in Decision Log. If GO, begin Gate 4 developer brief and RateHawk API evaluation. |

### Outputs from Gate 3

1. Functional prototype URL (private, invite-only)
2. A/B funnel data (keyword vs NLP, across all funnel steps)
3. Moderated session synthesis (5–6 participants, scored on preference profile reaction and booking intent)
4. Gate decision with evidence summary
5. If GO: developer brief for Gate 4 live MVP
6. Gate decision documented in Decision Log

---

## 5. Week-by-Week Timeline

| Week | Gate | Primary Activity | Owner | Budget Spent | Milestone | Dependencies |
|------|------|-----------------|-------|-------------|-----------|--------------|
| **Week 1** | Gate 1 | Deploy 3 landing page variants. Configure Vercel Analytics, Meta Pixel, UTM params. | PM | £0 (pre-spend) | All variants live, tracking confirmed | Landing page already built — deploy to Vercel |
| **Week 1** | Gate 1 | Launch Meta Ads (3 ad sets, £100 each). Launch Google Ads (secondary). | PM | £500 committed | Ads live and serving | Meta Ads account active; payment method set |
| **Week 1, Day 5** | Gate 1 | Day 5 review: CTR check. Kill weakest variant. Redirect budget. | PM | Included in £500 | Budget redistributed to top 2 variants | Minimum 3-day run per variant before killing |
| **Week 2** | Gate 1 / Gate 2 | Continue ad run (Days 6–10). Begin Gate 2 recruitment in parallel. | PM | £500 total | 300+ visitors per variant reached | Gate 1 email signups beginning to accumulate |
| **Week 2** | Gate 2 | Email Gate 1 signups with interview request. Open Respondent.io recruitment. | PM | £200 incentives reserved | 8–10 interviews scheduled on Calendly | Gate 1 email list populated |
| **Week 2, Day 10** | Gate 1 | Pause ads. Export all data. | PM | £500 spent | Data exported. Gate 1 analysis begins. | All ad spend exhausted or paused |
| **Week 2, Day 11–14** | Gate 1 | Analyse conversion rates per variant. Make Gate 1 GO/PIVOT/KILL decision. | PM | — | **Gate 1 Decision** | Raw data from Vercel Analytics + Meta Ads Manager |
| **Week 3** | Gate 2 | Conduct interviews (2–3 per day across 4 days). Record. Transcribe same day via Otter.ai. | PM | £700 total (incentives + Respondent.io) | 8–10 interviews complete | Calendly bookings confirmed; Zoom set up |
| **Week 4, Day 1–2** | Gate 2 | Score all interviews across 4 dimensions. Identify leakage driver. | PM | £1,000 total | Interview synthesis complete | All transcripts available |
| **Week 4, Day 3–5** | Gate 2 | Write synthesis. Make Gate 2 GO/PIVOT/KILL decision. | PM | — | **Gate 2 Decision** | Interview scores + leakage driver confirmed |
| **Week 4** | Gate 3 | Begin prototype spec. Commission developer. Set up Duffel sandbox + RateHawk test account. | PM | £100 (tooling) | Developer briefed. Sandbox accounts active. | Gate 2 GO. Developer sourced. |
| **Week 5** | Gate 3 | Prototype build: NLP swap (Claude Haiku), results screen, preference profile, mock checkout. | Developer | £800 (dev time) | Full prototype flow functional | Claude Haiku API access. Duffel sandbox. |
| **Week 5, Day 5** | Gate 3 | Internal prototype review. PM completes full flow end-to-end. Critical bugs fixed. | PM + Developer | £1,200 cumulative | Prototype stable for testing | Developer available for rapid fixes |
| **Week 6, Day 1** | Gate 3 | Send A/B test invitations to 100 Gate 1/2 list users. Launch 50/50 split. | PM | £1,500 cumulative | A/B test live | Prototype deployed. Invitation email prepared. |
| **Week 6, Days 1–4** | Gate 3 | Moderated sessions: 5–6 Gate 2 participants, 30 min each via Zoom. | PM | Included in incentives | Moderated sessions complete | Session recordings active (Lookback/Loom) |
| **Week 6–7** | Gate 3 | A/B test running. Monitor funnel daily. Check for errors. | PM | £2,000 cumulative | Test running cleanly | Prototype stable |
| **Week 8, Day 1–2** | Gate 3 | Close A/B test. Export funnel data. Analyse results. | PM | £2,500 total | Analysis complete | Test closed after 2 full weeks |
| **Week 8, Day 3–5** | Gate 3 | Write Gate 3 summary. Make GO/PIVOT/KILL decision. If GO: begin Gate 4 developer brief. | PM | — | **Gate 3 Decision** | A/B data + moderated session synthesis |

**Key dependencies and blockers:**

- Gate 2 cannot begin until Gate 1 email list is non-empty (minimum 30 contacts to attempt recruitment)
- Gate 3 build cannot begin until Gate 2 GO is confirmed
- RateHawk sandbox signup should happen in parallel during Week 3–4 (self-service, free, no minimum volume — takes approximately 2 hours: ratehawk.com/api)
- Duffel contact should be notified at Week 4 that commercial terms discussion is forthcoming (not yet a commitment)
- If Gate 1 produces a PIVOT decision, add 1 week to the timeline before Gate 2 begins

---

## 6. Budget Summary

### Gate-by-Gate Budget

| Gate | Activity | Gate Budget | Cumulative | Kill Cost If Failed Here |
|------|----------|-------------|-----------|--------------------------|
| Gate 1 | Messaging Test (Week 1–2) | £500 | £500 | £500 |
| Gate 2 | User Interviews (Week 2–4) | £1,000 | £1,500 | £1,500 |
| Gate 3 | Technical Prototype (Week 4–8) | £2,500 | £4,000 | £4,000 |

**Total to scale decision (all 5 gates):** ~£49,000 (per strategy/12-decision-tree.md)
**Scope of this playbook:** Gates 1–3 only (£4,000 total)

### Gate 1 Budget Detail

| Item | Cost | Notes |
|------|------|-------|
| Meta Ads (3 ad sets × £100) | £300 | Kill weakest at Day 5; reallocate |
| Google Ads (secondary, search) | £100 | "City break deals UK" terms |
| Vercel Analytics | £0 | Built into Vercel |
| Email capture tool (Mailchimp free) | £0 | Free tier covers <500 contacts |
| Contingency | £100 | Extended ad spend if PIVOT |
| **Total** | **£500** | |

### Gate 2 Budget Detail

| Item | Cost | Notes |
|------|------|-------|
| Participant incentives (10 × £20) | £200 | Amazon gift cards, sent immediately after session |
| Respondent.io recruitment (4–6 participants) | £300–450 | ~£75/participant; supplement Gate 1 signups |
| Otter.ai transcription | £40 | ~7.5 hours of interview recording |
| Calendly (free tier) | £0 | Scheduling |
| Zoom (free tier) | £0 | Video sessions |
| Contingency | £110–260 | |
| **Total** | **~£1,000** | |

### Gate 3 Budget Detail

| Item | Cost | Notes |
|------|------|-------|
| Developer time (2.5 weeks, mid-weight full-stack) | £2,000 | £800/week; remote; Next.js/React required |
| Claude Haiku API credits | £50 | ~£0.006/query; negligible at test scale |
| Duffel sandbox | £0 | Free sandbox tier |
| RateHawk sandbox | £0 | Free API access, no minimum volume |
| Session recording (Lookback or Loom) | £50 | Moderated session tool |
| Participant incentives (6 × £20) | £120 | Gate 3 moderated session participants |
| Contingency | £280 | |
| **Total** | **£2,500** | |

### Budget Efficiency Note

The gate structure is designed so that the most likely failure modes surface at the cheapest possible point. The Desti failure (confirmed planning demand, fatal booking leakage) is caught at Gate 2 for £1,500 total. The personalisation thesis failure is caught at Gate 3 for £4,000 total. Neither requires any engineering investment to surface.

---

## 7. Risk Register

Risks are drawn from strategy/12-decision-tree.md and strategy/13-phase-1-plan.md, with mitigations specific to the Gates 1–3 context.

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | **Low Gate 1 signup rate** — all three variants below 1% | Medium | High — kill signal at £500 | Run A vs B first if budget is tight; winner vs C second. If all below 1% after £300 spend, stop early. Do not exhaust £500 on a clear kill signal. |
| R2 | **Insufficient ad traffic for significance** — £400 spread across 3 variants is borderline | Medium | Medium — inconclusive data, not a kill | Run sequentially (A vs B first, winner vs C) rather than simultaneously if traffic is slow. Accept directional data — this is not a clinical trial. |
| R3 | **Gate 1 email list too small to recruit Gate 2 participants** — <30 signups from Gate 1 | Medium | Medium — delays Gate 2, increases Respondent.io spend | If Gate 1 GO is declared but list is small (<30), open Respondent.io immediately rather than waiting. Budget allows for full Respondent.io recruitment. |
| R4 | **Interview recruitment failure** — Respondent.io cannot find UK frequent travellers at budget | Low | Medium — delays Gate 2 by 1–2 weeks | Backup: Prolific (similar panel, similar cost). Secondary backup: LinkedIn targeting (post in UK travel communities) at £0 additional cost, slower turnaround. |
| R5 | **Booking leakage confirmed as structural** — Gate 2 finds users prefer Booking.com for price/inventory reasons | Medium | High — Gate 2 kill, do not build | This is the Desti outcome. If confirmed, the only viable response is a structural pivot: full booking funnel ownership from Day 1 (Duffel flights + RateHawk hotels in MVP, not affiliate) or a B2B model. Do not continue to Gate 3. |
| R6 | **NLP demo confusion** — users find conversational input less intuitive than expected | Medium | Medium — Gate 3 PIVOT signal | The preference profile is a stronger differentiator than NLP input alone. If NLP input generates confusion, the pivot is to make the onboarding conversational (5-question wizard style) rather than open-ended query. |
| R7 | **Claude Haiku API latency** — NLP parse exceeds 3 seconds on average | Low | Medium — degrades prototype UX significantly | Pre-warm the API call. Show a skeleton results screen immediately after input while NLP processes. Research-4-tech-feasibility.md confirms <600ms parse time is achievable — this risk is primarily about cold-start latency. |
| R8 | **Developer unavailability for Gate 3** — mid-weight full-stack developer not available within 1-week lead time | Medium | Medium — delays Gate 3 by 1–2 weeks | Source developer during Gate 2 (not at the Gate 2/3 boundary). Briefing and onboarding can happen in parallel with interviews. Backup: Toptal or Contra for rapid placement. |
| R9 | **ATOL complexity emerging early** — Gate 2 interviews reveal ATOL protection is a hard requirement for booking trust | Low | Medium — does not kill Gate 3 but accelerates ATOL timeline | ATOL is a Gate 5 item in the full decision tree, but if Gate 2 interviews reveal it as a blocking concern for >6/10 participants, the Gate 4 live MVP must display ATOL-equivalent trust signals (ABTOT franchise ATOL from ~£942 as bridge). Begin ABTOT conversation before Gate 4. |
| R10 | **Mindtrip UK expansion during validation period** — Mindtrip ($22.5M, TUI partnership) announces UK launch during the 8-week test period | Low | High — changes competitive dynamics significantly | Monitor Mindtrip.com and TUI UK press releases weekly. If Mindtrip UK launches before Gate 3 completes, run a forced comparison in Gate 3 moderated sessions ("Have you seen Mindtrip? How does this compare?"). If Mindtrip is already in the UK market, the differentiation argument shifts entirely to price-first positioning and ATOL compliance — both must be sharpened. |
| R11 | **Meta Ads policy rejection** — travel advertising flagged for restricted claims | Low | Medium — delays Gate 1 by 3–5 days | Avoid superlative claims ("best deals," "cheapest"). Use factual copy: "Find city break deals," "Natural language travel search." Have a backup Google Ads campaign ready if Meta rejects the ad set. |
| R12 | **A/B test user drop-off** — Gate 1/2 email list users don't engage with Gate 3 prototype invitation | Medium | Medium — reduces A/B test sample size | Personalise the invitation email using their Gate 1 signup variant (if they signed up via Variant A, reference deal-finding). Offer a £10 Amazon gift card for completing the A/B test flow. |

---

## 8. Recruitment Plan

### Gate 1: Cold Traffic via Paid Ads

**Channel:** Meta Ads (primary) + Google Ads (secondary)
**Audience:** UK, 25–45, travel interests, £35K+ HHI
**Volume target:** 900+ unique landing page visitors (300+ per variant)
**Cost per visitor target:** <£0.50 CPC
**Expected signups (at 3% conversion):** 27+ per variant, 80+ total. At 5% (strong result): 45+ per variant, 135+ total.
**Email tool:** Mailchimp free tier (up to 500 contacts) or ConvertKit free tier
**Data captured:** Email address, variant (from UTM parameter), timestamp, NLP demo interaction (if tracked)

### Gate 2: Warm Pool (Gate 1 Signups) + Respondent.io Supplement

**Primary source:** Gate 1 email signups

Recruitment email template:

> Subject: "45 minutes of your time + a £20 gift card"
>
> Hi [first name],
>
> You signed up for early access to Holiday Portfolio last week. Thank you.
>
> I'm the founder, and before we build anything I'd love to spend 45 minutes hearing about how you actually plan and book travel — the frustrations, the workarounds, the tools you use.
>
> There's no sales pitch. I'll ask you to react to a prototype at the end, but mostly I want to hear your experience.
>
> If you're interested: [Calendly link]. Sessions are over Zoom at a time that works for you.
>
> I'll send a £20 Amazon gift card immediately after the session as a thank you.
>
> [Founder name]

**Secondary source:** Respondent.io
- Filter: UK resident, 3+ leisure trips in past 12 months, primary booker in household, 25–50
- Target: 4–6 participants to supplement Gate 1 signups
- Cost: ~£75 per participant placed
- Timeline: 5–7 days from order to confirmed bookings

**Screening question for all participants (Respondent.io pre-screener):**
1. How many leisure trips abroad did you take in the past 12 months? (Qualify: 3+)
2. Who books the travel in your household? (Qualify: "I do, mostly" or "I do, always")
3. Have you taken a city break (1–4 night trip to a city) in the past 12 months? (Qualify: Yes)
4. Do you use travel agents for leisure trips? (Qualify: No, or only occasionally)

### Gate 3: Combined Gate 1 + Gate 2 Pool

**A/B test pool:** Full Gate 1/2 combined email list (target: 80–150 contacts)

Invitation email for A/B test:

> Subject: "Test something new — 10 minutes, £10 gift card"
>
> Hi [first name],
>
> We've built a first version of the Holiday Portfolio experience and we'd love your feedback before we go further.
>
> It takes about 10 minutes. You'll be able to search for an actual city break using plain language — no filters — and see how the tool responds.
>
> [Link to prototype — your assigned version]
>
> Tap "I'm done" at the end and we'll send you a £10 Amazon gift card.
>
> [Founder name]

**Moderated session pool:** 5–6 participants from Gate 2 who expressed interest or scored highly on willingness to try. Contact directly via email with specific Calendly link.

---

## 9. Tools and Infrastructure

### Gate 1 Tools

| Tool | Purpose | Cost | Setup time |
|------|---------|------|-----------|
| Vercel | Landing page hosting (already in use) | £0 (free tier) | 0 — already deployed |
| Vercel Analytics | On-site conversion tracking, time on page, scroll depth | £0 (built-in) | 15 minutes |
| Meta Ads Manager | Ad creation, targeting, spend management | £0 (ad spend is the cost) | 1 hour (account setup if new) |
| Google Ads | Search campaign for high-intent terms | £0 (ad spend is the cost) | 1 hour |
| Mailchimp (free) | Email capture and list management | £0 | 30 minutes |
| Vercel KV | Alternative email capture storage if Mailchimp not preferred | £0 (included in Vercel) | 30 minutes |
| Meta Pixel | Conversion tracking (form submit = CompleteRegistration event) | £0 | 20 minutes |

### Gate 2 Tools

| Tool | Purpose | Cost | Setup time |
|------|---------|------|-----------|
| Calendly (free) | Interview scheduling | £0 | 20 minutes |
| Zoom (free) | Video interviews | £0 | 0 — already common |
| Otter.ai | Transcription of recorded sessions | £40 (batch) | 10 minutes setup |
| Respondent.io | Supplementary participant recruitment | £75/participant placed | 30 minutes to create brief |
| Notion | Interview notes, scoring framework, synthesis | £0 (free tier) | 1 hour for template setup |
| Amazon gift cards | Participant incentives | £20 per participant | 5 minutes per card (email delivery) |

### Gate 3 Tools

| Tool | Purpose | Cost | Notes |
|------|---------|------|-------|
| Vercel | Prototype hosting | £0 | Already in use |
| Claude Haiku API (Anthropic) | NLP intent parsing | ~£50 credits | Sign up at anthropic.com; self-service |
| Duffel sandbox | Real flight data for UK city break routes | £0 | Free sandbox tier; sign up at duffel.com |
| RateHawk sandbox | Hotel net rate data | £0 | Free API, no minimum volume; sign up at ratehawk.com/api |
| Lookback.io | Moderated session recording and observation | £50 (short trial) | Alternative: Loom screen-share at £0 |
| PostHog (free tier) | A/B test funnel tracking within prototype | £0 | Self-service; integrates with Next.js in 30 minutes |
| GitHub | Version control for prototype | £0 | Already assumed in use |

### Ongoing Tools (Post-Gate 3, for reference)

| Tool | Purpose | Phase | Cost |
|------|---------|-------|------|
| Supabase Pro | Postgres + pgvector preference graph | Gate 4+ | £25/month |
| Vercel Pro | Production hosting, edge functions | Gate 4+ | £20/month |
| Stripe | Payments (Gate 4 affiliate, Gate 5 subscription) | Gate 4+ | 1.4% + 20p per transaction |
| Resend | Transactional email (deal alerts, onboarding) | Gate 4+ | £0–20/month |
| OneSignal | Push notifications (deal price drops) | Gate 4+ | £0 up to 1K users |

---

## 10. Decision Log Template

Use this table to record each gate decision as it is made. Complete immediately after the gate review — before beginning the next gate.

| Date | Gate | Decision | Primary evidence | Secondary evidence | Deciding factor | Next steps |
|------|------|---------|-----------------|-------------------|----------------|-----------|
| — | Gate 1 | GO / PIVOT / KILL | Best variant signup rate: X%. Total signups: X. | NLP demo interaction rate: X%. Winning variant: A/B/C. | — | — |
| — | Gate 2 | GO / PIVOT / KILL | X/10 would try HP. Leakage driver: trust/habit OR price/inventory. | NLP resonance: X/10 positive. Willingness to pay: X/10 at £30+/yr. | — | — |
| — | Gate 3 | GO / PIVOT / KILL | NLP group mock booking CTA rate: X%. NLP vs keyword: X% improvement in funnel. | Preference profile: X/6 found it accurate and useful. Latency: Xs average. | — | — |

**Decision guidance:**

When completing the "deciding factor" column, be specific about which single piece of evidence most influenced the decision. This disciplines future retrospectives — you can compare what you thought was decisive at the time against what actually turned out to matter.

If the decision is KILL, add a "Lessons" row:

| Date | Gate | Decision | Root cause of kill | What this means for the problem space | Any salvageable insight |
|------|------|---------|-------------------|--------------------------------------|------------------------|
| — | Gate X | KILL | — | — | — |

If the decision is PIVOT, add a "Pivot brief" row:

| Date | Gate | Decision | What specifically changes | Revised criteria to trigger GO | Extended budget | New timeline |
|------|------|---------|--------------------------|-------------------------------|-----------------|--------------|
| — | Gate X | PIVOT | — | — | £X | X weeks |

---

*This playbook covers Gates 1–3 of the 5-gate decision tree defined in strategy/12-decision-tree.md. Gates 4 (Live MVP with Affiliate, ~£15,000) and 5 (Bed Bank + ATOL + Dynamic Packages, ~£30,000) are documented separately in strategy/13-phase-1-plan.md and will be planned in detail only if Gate 3 produces a GO decision.*

*Total investment to reach the scale decision: ~£49,000 across all 5 gates. Kill at Gate 3: £4,000.*

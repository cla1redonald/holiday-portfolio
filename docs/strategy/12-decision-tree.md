# Decision Tree: Holiday Portfolio Market Entry
## 5 Phase Gates — UK Travel AI Personalisation Engine with Bed Bank Revenue Model

**Strategic Question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?

**Date:** 2026-02-28
**Total investment to scale decision:** ~£49,000
**Kill cost at Gate 3:** <£4,000
**Owner:** Founder/PM

Related: [[discovery]] | [[research-5-revenue-risks]] | [[research-6-bed-banks]] | [[research-4-tech-feasibility]] | [[11-wwhtbt-conditions]] | [[13-phase-1-plan]]

---

## The Core Bet

Holiday Portfolio's thesis rests on three compounding claims:

1. **Desirability:** UK frequent travellers will adopt an NLP-first deal-finding platform that learns their preferences over time — rather than defaulting to Booking.com.
2. **Viability:** Bed bank net rates (RateHawk: no minimum volume, free API) produce £45–60/booking vs £13 on affiliate-only — enough to reach breakeven at 800–1,200 users rather than 2,500+.
3. **Feasibility:** The personalisation stack (LLM intent parsing + pgvector preference graph + Duffel API) can be built within £50–100K using a phased architecture.

Each gate tests one of these claims with real market data before committing to the next tranche of investment. The tree is designed so the most likely failure modes surface early and cheaply.

---

## Decision Tree Diagram

```
START: "How do we enter the UK travel market?"
  │
  ▼
┌─────────────────────────────────────────────┐
│ GATE 1: Messaging Test                      │
│ Week 1-2 · ~£500 · Owner: Founder/PM        │
│ Q: Does anyone want this?                   │
└─────────────────────────────────────────────┘
  │
  ├── NO-GO (<1% all variants) ──────────────► KILL ✗ Total spent: ~£500
  │                                            "Messaging fails. Don't build."
  │
  ▼ GO (>3% signup, >100 emails)
  │
┌─────────────────────────────────────────────┐
│ GATE 2: User Interviews                     │
│ Week 2-4 · ~£1,000 · Owner: Founder/PM      │
│ Q: Would users switch from Booking.com?     │
└─────────────────────────────────────────────┘
  │
  ├── NO-GO (>6/10 see no reason to switch) ─► KILL ✗ Total spent: ~£1,500
  │                                            "Leakage is structural. Don't build."
  │
  ▼ GO (>6/10 would try, leakage addressable)
  │
┌─────────────────────────────────────────────┐
│ GATE 3: Technical Prototype                 │
│ Week 4-8 · ~£2,500 · Owner: FM + Developer  │
│ Q: Does NLP personalisation add value?      │
└─────────────────────────────────────────────┘
  │
  ├── NO-GO (<50% complete mock booking) ────► KILL ✗ Total spent: ~£4,000
  │                                            "NLP = no value. Pivot or stop."
  │
  ▼ GO (>50% complete, NLP resonates)
  │
┌─────────────────────────────────────────────┐
│ GATE 4: Live MVP with Affiliate             │
│ Month 2-4 · ~£15,000 · Owner: FM + Dev      │
│ Q: Do real users actually book here?        │
└─────────────────────────────────────────────┘
  │
  ├── NO-GO (>50% leakage, <20 bookings) ───► KILL ✗ Total spent: ~£19,000
  │                                            "Desti failure confirmed. Exit."
  │
  ▼ GO (50+ bookings, <30% leakage, repeat use)
  │
┌─────────────────────────────────────────────┐
│ GATE 5: Bed Bank + ATOL                     │
│ Month 4-8 · ~£30,000 · Owner: FM + Dev + Legal│
│ Q: Are the unit economics real?             │
└─────────────────────────────────────────────┘
  │
  ├── NO-GO (<£25/booking, ATOL denied) ─────► KILL ✗ Total spent: ~£49,000
  │                                            "Margin floor failed. B2B pivot or exit."
  │
  ▼ GO (£45+/booking, 200+ bookings, ATOL approved)
  │
  ▼
[SCALE DECISION] — Raise seed / hire / paid acquisition
```

**Cost-of-learning view:**

```
£500        £1,500      £4,000      £19,000     £49,000
  │           │           │            │            │
[G1]────────[G2]────────[G3]─────────[G4]─────────[G5]────► SCALE
Messaging  Interviews  Prototype    Live MVP    Bed Bank
 Week 1-2   Week 2-4   Week 4-8   Month 2-4   Month 4-8
  ↑           ↑           ↑            ↑            ↑
Cheapest                                        Most expensive
kill                                            kill
```

---

## Cumulative Investment Tracker

| Gate | Activity | Gate Cost | Cumulative | Kill Cost If Failed Here |
|------|----------|-----------|------------|--------------------------|
| G1 | Messaging Test | £500 | £500 | £500 |
| G2 | User Interviews | £1,000 | £1,500 | £1,500 |
| G3 | Technical Prototype | £2,500 | £4,000 | £4,000 |
| G4 | Live MVP (Affiliate + Duffel) | £15,000 | £19,000 | £19,000 |
| G5 | Bed Bank + ATOL + Dynamic Packages | £30,000 | £49,000 | £49,000 |
| — | Scale decision reached | — | £49,000 | — |

**Budget breakdown by gate:**

| Gate | Primary Cost Categories |
|------|------------------------|
| G1 (£500) | Carrd/Webflow landing page £0–20 · Meta/Google Ads £400–450 · Email tool £30–50 |
| G2 (£1,000) | Respondent.io recruitment ~£50/participant (8–10 people) · Participant incentives £10–20 each · Researcher time |
| G3 (£2,500) | Developer time 2–3 weeks · Framer/Next.js prototype · Claude Haiku API (~£0.006/query) · User testing sessions |
| G4 (£15,000) | Developer time 8–10 weeks · Duffel API production ($3/order + 1%) · Affiliate setup · RateHawk sandbox · Hosting £50–100/month · Legal review £1,000–2,000 |
| G5 (£30,000) | Developer time 4–6 weeks (RateHawk live) · ATOL application £2,473 upfront + £2.50/passenger · High-risk merchant account setup · Legal/compliance £3,000–5,000 · 3 months runway |

---

## Gate 1: Messaging Test

**Timeline:** Week 1–2
**Budget:** ~£500
**Owner:** Founder/PM
**Core question:** Does any framing of this product generate enough pull — from UK travellers who have never heard of Holiday Portfolio — that they voluntarily give us their email?

### Why This Gate Exists

**The Desti lesson.** Desti (SRI/Siri team) built a fully functional AI travel planner. Users loved it. They booked on Booking.com anyway. Co-founder Nadav Gur's post-mortem: "They will go to the channel they are used to." The product worked; the demand signal did not exist. A messaging test surfaces whether UK travellers will voluntarily engage with an alternative framing — before a single line of production code is written.

This is a demand-pull test, not a brand test. We are not measuring awareness or trust — we are measuring whether the message creates enough pull to trigger an action (email signup) from a stranger.

### Test Design

Three landing page variants, each targeting a distinct entry frame for the same product. All pages: clean single-screen, headline + 3-bullet sub-copy + email capture CTA. No product screenshots. No logo required.

| Variant | Headline | Sub-headline frame | Primary CTA |
|---------|----------|-------------------|-------------|
| **A: City Break Deal Finder** | "Find your next city break deal — and stop overpaying" | "Natural language search. Deal confidence scoring. No endless filters." | Get early access |
| **B: Portfolio Planner** | "Plan your whole travel year in one place" | "Budget tracker, preference profile, deals that fit your year." | Join the waitlist |
| **C: Personalised Deal Feed** | "A deal feed that actually knows how you travel" | "Like Spotify Discover Weekly, but for holidays. Gets better every trip." | Get personalised deals |

**Traffic:** Meta and/or Google Ads. UK geo-targeted, 25–45 age bracket, interest signals: travel, frequent flyer, weekend breaks, city breaks. Budget: £400–450 over 10–14 days.

**Tools:** Carrd or Webflow (landing pages) + Mailchimp or ConvertKit (email capture) + Meta Pixel (conversion tracking).

**Measurement:**
- Primary: Email signup rate per variant (unique visitors → signups)
- Secondary: Time on page, scroll depth, click through on any sub-CTA
- Qualitative: Any spontaneous messages in reply to confirmation email

### GO/NO-GO Criteria

| Signal | GO | BORDERLINE | NO-GO |
|--------|-----|------------|-------|
| Best variant signup rate | >3% | 1–3% | <1% across all variants |
| Total email signups | >100 | 50–100 | <50 total |
| Clear winning variant | One variant >30% above others | Two within 10% | Flat / all below 1% |

**GO:** Best variant exceeds 3% signup rate AND total signups exceed 100. Proceed to Gate 2 with the winning variant's positioning as the interview frame.

**BORDERLINE (1–3%):** Run a revised headline on the best-performing variant for 1 additional week before committing to Gate 2. Extend by £150–200 ad spend.

**KILL:** All variants below 1%. The message has no resonance with UK travellers via paid discovery. Do not build. Revisit problem framing or target segment before any further investment.

🟡 **Gap:** No data yet on which variant will outperform. The city break frame (Variant A) is assumed to be strongest based on the 78% spontaneous travel preference finding (discovery.md), but this is a hypothesis.

🟡 **Gap:** £400–450 ad spend is borderline for statistical significance across three variants simultaneously. If budget is tight, run A vs B first, then winner vs C.

---

## Gate 2: User Interviews

**Timeline:** Week 2–4 (begins as Gate 1 emails are captured)
**Budget:** ~£1,000
**Owner:** Founder/PM
**Core question:** Is booking leakage (planning on our platform, booking on Booking.com) addressable — or is it structural and fatal?

### Why This Gate Exists

Every planning startup that failed at scale failed at this point: Desti, Hitlist, Utrip, Onepagetrip, Google Trips. Users planned. They booked on incumbents. 61% of business travellers book outside managed channels even when those channels are employer-mandated — for leisure travellers with no mandate, the leakage rate is likely higher.

Gate 2 asks: is the leakage in this segment driven by **trust and habit** (addressable through transparent deal scoring and visible preference profile) or by **price and inventory** (not addressable through UX at startup scale)?

Source: [Fox World Travel leakage analysis](https://www.foxworldtravel.com/business-travel-blog/what-is-booking-leakage-and-how-does-it-affect-your-travel-program/)

### Participant Recruitment

- 8–10 participants
- Primary source: Gate 1 email signups (already self-selected as interested)
- Supplement: Respondent.io or UserTesting.com if list is insufficient
- Segment: UK residents, 3+ trips/year including at least 1 city break in past 12 months, self-identified as the primary trip researcher/booker in their household
- Incentive: £15–20 Amazon voucher per 45-minute session
- Estimated cost: £300–500 recruitment + £150–200 incentives = £450–700

### Interview Protocol (45 minutes)

**Block 1: Current behaviour (15 min)**
- Walk me through your last city break — how did you find it, how did you decide it was good value, where did you book it?
- How many sites and apps did you visit? What frustrated you most?
- Do you have any system for tracking travel plans across the year — upcoming trips, budget, past trips?

**Block 2: Leakage intent (15 min)**
- When you find a deal somewhere new, what stops you from booking there and then?
- What would it take for you to book on a platform you've never used before? What would make you trust it?
- If a platform found you a deal and showed you exactly *why* it thinks it's a good price for you — does that change anything?

**Block 3: Concept test (15 min)**
- Show Gate 1 winning variant landing page
- "What do you think this does? What would happen if you signed up?"
- "If this worked as described, would you try it for your next city break?"
- "What's the one thing that would most put you off?"

### Key Hypotheses

| Hypothesis | Test Method | GO Signal |
|------------|-------------|-----------|
| H1: Leakage is trust/habit, not price | "What stops you booking somewhere new?" | Trust and habit cited more than price |
| H2: "Good deal for you" framing matters | "Does knowing *why* it's good change anything?" | >6/10 say yes, the explanation matters |
| H3: NLP input preferred over filters | Describe "somewhere warm, good food, under £400" vs filters | >6/10 see value or prefer conversational |
| H4: Portfolio/budget view is interesting | Describe year view + budget tracker | Any emotional engagement vs indifference |

### GO/NO-GO Criteria

| Signal | GO | BORDERLINE | NO-GO |
|--------|-----|------------|-------|
| Would try HP for next booking | >6/10 | 4–6/10 | <4/10 |
| Leakage driven by trust/habit (addressable) | Yes — trust and habit dominate | Mixed trust and price | "I use Booking.com because they're cheaper / have more options" (price problem, not solvable with UX) |
| NLP preference resonates | >6/10 see value in conversational search | Split | <4/10, prefer filters or see no difference |
| No single incumbent named as default by majority | No clear competitor monopoly | One or two mentioned | >6/10 spontaneously say they'd use Booking.com/Expedia instead and see no reason not to |

**GO:** >6/10 would try, leakage is trust/habit-based, NLP resonates.

**KILL — Hard stop:** Users consistently and explicitly state "I use Booking.com/Expedia because they have better prices or more options, and I see no reason to switch." This is a distribution and inventory problem that cannot be solved through better UX or AI personalisation at startup scale. Do not proceed to building a prototype.

🟡 **Gap:** 8–10 interviews is a small sample. Findings should be treated as directional, not statistically conclusive. Hard kill signals (near-unanimous no from participants) are more reliable than weak go signals.

🔴 **Contradiction to resolve:** discovery.md notes 44% of UK consumers cite lack of personalisation as their #1 pain point (Research Round 3). But research-5-revenue-risks.md documents that users plan on personalised platforms and book on incumbents anyway (Desti, TripIt). These are not mutually exclusive — users *want* personalisation but *trust* Booking.com. Gate 2 must distinguish between "I want better personalisation" (a desirability signal) and "I would switch platforms for it" (a necessary commercial signal). Probe this distinction explicitly in Block 2.

---

## Gate 3: Technical Prototype

**Timeline:** Week 4–8
**Budget:** ~£2,500
**Owner:** Founder/PM + Developer
**Core question:** Does NLP personalisation add perceived value over conventional filter search — specifically in travel, specifically for city breaks, specifically for this user segment?

### Why This Gate Exists

NLP input is now table stakes across travel platforms (Booking.com, Google Travel, Mindtrip, Layla). The differentiation is not "we have NLP" — it is the combination of NLP + visible preference graph + deal confidence scoring. Gate 3 tests whether this combination creates a materially different *felt experience* from typing into a standard search box. If it doesn't, the core product differentiator is not working at prototype level, and committing £15,000 to a live build is premature.

This gate also surfaces the cold-start problem in controlled conditions: can a first-time user get from a conversational query to a result they would actually book, in under 3 minutes?

### Prototype Scope

Not a live product. A working prototype with real NLP and plausible inventory:

**1. NLP input screen**
Text field accepting conversational queries. Claude Haiku (or GPT-4o mini) parses the query and extracts structured intent. Example:
```
User input: "Long weekend somewhere warm, good food scene, under £400 for two"
Parsed output: {budget: 400, duration: "3-4 nights", party_size: 2,
                attributes: ["warm climate", "strong food culture"],
                style: ["local feel"]}
```
Target latency: <3 seconds total. Source: research-4-tech-feasibility.md — NLP parse at <600ms, live pricing 1,500ms parallel, ranking 100ms.

**2. Personalised results screen**
Mock destination cards with deal confidence scoring. Prices can be Duffel sandbox (real inventory) or plausible static data for common routes (London → Lisbon, Manchester → Amsterdam, London → Barcelona). Each card shows: destination, price, deal score ("Good deal for you"), 1-sentence rationale.

**3. Preference profile screen**
A visible, editable preference profile seeded from the prototype session. "Based on your search, we think you: prefer warm climates, value food scenes, seek local character over tourist spots. Is this right?" Editable via toggle/tag interface. This is the differentiator no incumbent offers — and the primary thing to test.

**4. Mock booking flow**
Not a real booking. A checkout screen showing the assembled package (flight + hotel + price) with a "Complete booking" CTA that leads to a thank-you/success confirmation. We are measuring intent, not conversion.

**Tech stack:**
- Frontend: Next.js on Vercel (preferred) or Framer for prototype speed
- NLP: Claude Haiku API (~£0.006/query, negligible at test scale)
- Preference graph: Static JSON per session — no database required at this stage
- Inventory: Duffel sandbox (free) for flight data; RateHawk sandbox or curated static hotel mock data for 8–10 common city break routes

**Estimated build time:** 2–3 weeks at junior/mid developer rates (£800–1,200/week). Total including tooling: £2,000–2,500.

### Test Protocol

Recruit 5–6 participants from Gate 2 who expressed interest. Run moderated usability sessions (remote via Loom screen-share or Lookback, 30 minutes each).

**Task flow:**
1. "You want a city break — somewhere warm, good food, under £400 for a long weekend. Use the search."
2. Observe: do they understand what to type? Do they reach results? Does the deal confidence scoring make sense without explanation?
3. Show preference profile: "Does this capture how you think about travel? Would this be useful to you over time?"
4. Mock booking flow: "You've found a deal you like. Walk me through what you'd do next." Watch for spontaneous leakage statements ("I'd check on Booking.com first").

**Key observations:**

| Observation | GO Signal | NO-GO Signal |
|-------------|-----------|--------------|
| NLP input comprehension | User types naturally, no confusion | User asks "should I type a destination or what?" |
| Results relevance | "Oh, that's actually a good suggestion" | "These don't seem right for what I typed" |
| Deal confidence scoring | "That's helpful — I'd trust that" | "What does that mean?" / ignored entirely |
| Preference profile reaction | "Yes, that's exactly right" / "Can I edit this?" | "That's a bit creepy" / total indifference |
| Mock booking intent | Clicks CTA, engaged with checkout screen | "I'd go to Booking.com to verify the price" |

### GO/NO-GO Criteria

| Signal | GO | BORDERLINE | NO-GO |
|--------|-----|------------|-------|
| Mock booking CTA reached (task completion) | >50% of participants | 30–50% | <30% |
| NLP perceived as better than typing destination + dates | >4/6 prefer or see clear value | Split 3/3 | <3/6, prefer conventional search |
| Preference profile resonates | >4/6 find it interesting or useful | Mixed | <3/6 indifferent or concerned |
| Leakage signals in session | <2/6 say they'd verify on Booking.com before booking | 2–3/6 | >3/6 immediately mention going to Booking.com |

**GO:** >50% complete mock booking AND NLP adds perceived value AND preference profile resonates.

**KILL:** NLP adds no perceived value over standard filter search. If participants say "this is basically the same as typing into Booking.com" or "I'd rather just pick a destination" — the core product differentiator is not working. A live build at this point would reproduce the Desti failure mode with more expensive infrastructure.

🟡 **Gap:** Cold start problem is not fully testable at prototype stage — the preference graph is seeded from a single 30-minute session. The compounding value (feed improving over 3+ trips) cannot be demonstrated in testing. Gate 3 tests the *felt quality* of NLP personalisation, not the accumulated value over time. Document this limitation explicitly in the session debrief.

🟡 **Gap:** Duffel sandbox may not return live inventory for all UK city break routes tested. Prepare static fallback data for at least: London → Lisbon, London → Barcelona, Manchester → Amsterdam, London → Rome. These are the four highest-volume UK city break routes by search volume.

---

## Gate 4: Live MVP with Affiliate

**Timeline:** Month 2–4
**Budget:** ~£15,000
**Owner:** Founder/PM + Developer
**Core question:** Do real users complete real bookings on Holiday Portfolio — or do they plan here and book on Booking.com?

### Why This Gate Exists

This is the Desti gate. The failure mode that killed every planning-first travel startup is planning-to-booking leakage: users plan on your platform, book on the OTA they trust. Gate 3 tested this with a prototype and mock bookings. Gate 4 tests it with real inventory, real prices, and real stakes. There is no substitute for this test. User behaviour with live bookings is categorically different from behaviour with mock flows.

Source: research-5-revenue-risks.md — "Even when there's a 'Book Now' button on a travel planning platform, if customers can buy the same thing at the same price on a channel they've done business with before — why wouldn't they?"

### MVP Scope

**What to build:**

**1. NLP search → personalised results (live inventory)**
- Claude Haiku intent parsing, full production implementation
- Duffel API production: flights + stays. Pricing: $3/booking + 1% of booking value. Real-time availability.
- Hotel affiliate fallback: Booking.com affiliate API or Travelpayouts for broader inventory on routes Duffel doesn't cover
- RateHawk: begin B2B account application now (2–4 week approval process). Sandbox integration only at this stage.

**2. Basic preference profile (explicit, not semantic)**
- 5–7 onboarding questions: budget range, travel style tags, typical trip length, destination history
- Stored in Supabase (free tier: 500MB — sufficient for MVP)
- Profile visible to user and editable. This is the visible preference graph from discovery.md.

**3. Deal confidence scoring v1 (rule-based)**
- Price vs 90-day average (Duffel historical or Skyscanner public data)
- Comparison to market median for the route and dates
- Output: "Good deal," "Average deal," "Below average" — with 1-sentence rationale
- Not ML, not personalised. Personalised scoring is Gate 5+.

**4. Affiliate booking flow**
- In-platform checkout screen assembling the package visually
- "Book now" links via affiliate to Duffel (flights) and Booking.com affiliate (hotels)
- Affiliate conversion tracked via UTM parameters and affiliate dashboards
- Leakage tracking: users who initiated checkout but did not convert within 24 hours

**5. Basic analytics**
- PostHog or Mixpanel: funnel tracking from search → results → deal selected → checkout initiated → booking confirmed
- Weekly funnel review cadence

**What NOT to build at Gate 4:**
- Semantic preference graph (embeddings, vector DB) — Gate 5+
- RateHawk live booking integration — Gate 5
- ATOL-compliant dynamic packages — Gate 5
- Subscription paywall
- Mobile app
- Price alerts or deal monitoring

### Distribution Strategy (Gate 4)

Organic only. No paid CAC at Gate 4 — the per-booking economics (£13–17 affiliate only) cannot sustain paid acquisition at any realistic CAC.

Sources:
- Gate 1 email waitlist (100+ signups, self-selected)
- Product Hunt launch (coordinate for a Tuesday)
- r/HolidaysUK, r/UKtravel, r/citytravel — editorial posts with value, not ads
- PM's personal network and LinkedIn
- 1–2 relevant UK travel newsletters (offer editorial, not advertising)

🟡 **Gap:** Organic distribution is slow and noisy. 50+ bookings in 60 days from a cold start is achievable but requires active community presence — not passive posting. Owner must commit to daily distribution work during Gate 4. This is a time constraint, not a budget constraint.

### Revenue Expectation (Gate 4)

Gate 4 revenue is a signal, not a business. The economics at affiliate-only are:
- Hotel: 4% of accommodation booking value = ~£8 on a £200 hotel component (Booking.com standard affiliate rate)
- Flights via Duffel: $3 flat + 1% = ~£4–5 on a £150 flight component
- Ancillary (travel insurance via Travelpayouts): 15–20% × £30–50 policy = ~£5–9
- **Total per booking at affiliate: £17–22**

This does not cover CAC, support costs, or infrastructure. Gate 4 is not about making money — it is about proving the booking funnel works and measuring leakage rate. The economic model is unlocked at Gate 5.

Source: [Booking.com Affiliate Support Centre](https://affiliates.support.booking.com/kb/s/article/Commission-and-Payments) — 4% standard affiliate rate confirmed.

### Payment and Compliance Note

At Gate 4, Holiday Portfolio does not process payments directly — the OTA (Booking.com, Duffel) handles checkout. This means the high-risk merchant account requirement does not apply at Gate 4. However: begin the merchant account application at Gate 4 start, because the approval process takes 4–6 weeks and must be in place before Gate 5 direct bookings begin.

High-risk travel merchant account reality (for Gate 5 awareness):
- Processing rate: 3.5–6% per transaction vs 1.5–2.9% standard
- Rolling reserve: 5–15% of credit card deposits held 6–12 months
- Visa high-risk registration: £950/year (increased April 2024)
- Mastercard: £500/year

Sources: [TailoredPay](https://tailoredpay.com/blog/high-risk-merchant-account-fees/), [Vendoservices](https://vendoservices.com/blog/visa-mastercard-high-risk-fees-and-virp/)

### GO/NO-GO Criteria

| Signal | GO | BORDERLINE | NO-GO |
|--------|-----|------------|-------|
| Total bookings (60-day window) | 50+ | 20–49 | <20 |
| Booking leakage rate (checkout initiated → booking confirmed) | <30% | 30–50% | >50% |
| Repeat usage (second search within 30 days) | >20% of users | 10–20% | <10% |
| Qualitative signal | "I'd use this again" / "I'd recommend this" from majority | Mixed | "I liked it but booked on Booking.com in the end" from majority |
| RateHawk B2B account | Approved, sandbox live | Application submitted | Not started or rejected |

**GO:** 50+ real bookings, <30% leakage rate, any repeat usage signal present. Begin ATOL application immediately. Proceed to Gate 5.

**KILL — Hard stop 1:** >50% booking leakage sustained over 30 days. The Desti failure mode is live. Booking leakage at this rate is not fixable with better UX at startup scale — it is a trust and inventory problem. Full funnel ownership (Gate 5) may reduce leakage further; if leakage is already >50% at Gate 4 even with transparent deal scoring, the structural problem is deeper. Do not proceed.

**KILL — Hard stop 2:** <20 bookings in 60 days from organic distribution. This is a demand distribution failure, not a product failure. The organic channels do not have sufficient reach to bootstrap this model. Options: paid acquisition (requires different unit economics), B2B pivot, or shutdown.

🔴 **Contradiction to manage:** discovery.md states "must own full booking funnel." Gate 4 uses affiliate links — which is not full funnel ownership. This is intentional: affiliate allows fast live testing without the 12-week ATOL wait. The contradiction is managed by treating Gate 4 leakage rate as a *leading indicator* for Gate 5. If leakage >50% at Gate 4 (where checkout friction exists because we send users to another site), the situation at Gate 5 (where we own the full flow) should be better — but not by 50+ percentage points. Gate 4 leakage sets the floor; Gate 5 should improve it.

---

## Gate 5: Bed Bank + ATOL + Dynamic Packages

**Timeline:** Month 4–8
**Budget:** ~£30,000
**Owner:** Founder/PM + Developer + Legal/Compliance
**Core question:** Are the unit economics real — can Holiday Portfolio generate £45+/booking at scale, with ATOL approval, using RateHawk net rates and Duffel flights?

### Why This Gate Exists

This is the economic unlock gate. The move from affiliate commission (~£13/booking) to bed bank net rates with dynamic packaging (~£45–60/booking) is the entire commercial thesis of Holiday Portfolio. Without it, the model requires 2,500+ users to reach breakeven. With it, breakeven is 800–1,200 users. Gate 5 validates whether this thesis holds in production — with real suppliers, real margins, and real compliance costs.

Source: discovery.md revised unit economics; research-6-bed-banks.md RateHawk and Hotelbeds analysis.

### What Changes at Gate 5

| Component | Gate 4 | Gate 5 |
|-----------|--------|--------|
| Hotel revenue model | 4% affiliate commission (~£8) | Bed bank markup 15–25% on net rate (~£32–40) |
| Flight revenue model | Duffel affiliate (~£5) | Duffel net rate, bundled into package markup |
| Package structure | Separate affiliate links | Dynamic package: single checkout, one price |
| ATOL status | Not required (components sold separately) | Required (flight + hotel sold as package) |
| Payment processing | OTA handles payment | HP handles payment (high-risk merchant account) |
| Per-booking revenue | ~£13–17 | ~£45–60 |
| Breakeven user count | 2,500+ | 800–1,200 |

### ATOL Application — Critical Path Item

**Start ATOL application at the Gate 4 GO decision. Do not wait until Gate 5 build begins.**

ATOL is a 12-week process from application to licence. If Gate 4 GO is at Month 2, submitting ATOL application immediately means approval arrives at Month 5 — just as Gate 5 live bookings begin. Delay at this step delays the entire Gate 5 timeline.

**Small Business ATOL costs:**
- Application fee: £1,223 (upfront, non-refundable if denied)
- Advance ATOL Protection Contribution: £1,250 (upfront)
- Ongoing: £2.50 per passenger per booking
- **Total upfront: £2,473**

**Bridge option:** ABTOT franchise ATOL (~£942, faster approval timeline). Use as a bridge if the 12-week CAA process would delay Gate 5. Transition to Small Business ATOL once volume justifies it.

Source: [UK CAA Small Business ATOL](https://www.caa.co.uk/atol-protection/trade/about-atol/small-business-atol/)

🔴 **Risk: ATOL denial.** If ATOL is denied, Holiday Portfolio cannot legally sell flight + hotel packages in the UK. This is a kill signal for the dynamic packaging revenue model specifically (not the whole business). Two fallback options: (1) hotel-only bed bank (no ATOL required, lower margins but legal); (2) B2B pivot — licence the preference engine to an existing ATOL holder. Submit the ATOL application with legal support. Prepare financial statements demonstrating sufficient working capital to honour package bookings.

🟡 **Gap:** ATOL denial rate for new applicants is not publicly published by the CAA. Rejection is rare but not zero — typically occurs where the CAA has financial viability concerns. Engage a travel law specialist for application support (cost: ~£1,000–2,000, but materially reduces rejection risk).

### RateHawk Integration

**Why RateHawk:**
- No minimum booking volume — viable from booking 1
- Free API access, self-service B2B signup
- 2.5M+ properties worldwide
- Modern REST API with a full sandbox environment
- Net rate model: HP buys at wholesale, sells at HP markup
- Designed specifically for small travel agents and operators

Source: research-6-bed-banks.md; [RateHawk for business](https://www.ratehawk.com/for-business/)

**Integration scope (Gate 5):**
- RateHawk production API credentials (B2B account applied at Gate 4)
- Hotel availability search by destination + dates
- Booking creation and confirmation endpoint
- Cancellation and amendment handling
- Automated margin layer: configurable markup (15–25%) applied to net rate before display
- Package assembly: Duffel flight + RateHawk hotel → single checkout price
- ATOL compliance flag on each dynamic package booking record

**Estimated developer time:** 4–6 weeks for senior developer (£1,600–2,400/week contracted). This is the primary cost driver at Gate 5.

**Future inventory expansion (post Gate 5):**
- Hotelbeds: approach at 200+ bookings/month. 300K+ properties, better rates at volume. Requires commercial negotiation and booking history. Source: research-6-bed-banks.md.
- TravelgateX: one GraphQL API → 1,000+ suppliers. Inventory expansion without multiple integrations. Phase 2 option.

### Margin Reality Check

Bed bank rates are 20–30% below retail. However, rate parity rules mean Holiday Portfolio cannot simply undercut OTAs on price — it must add value through personalisation, curation, and deal confidence scoring. The margin comes from the B2B discount; the differentiation comes from the product.

**Example per-booking economics (2-night city break, 2 adults, Gate 5 live):**

| Line item | Amount |
|-----------|--------|
| Hotel retail price (2 nights) | £200 |
| RateHawk net rate (20% below retail) | £160 |
| HP sells at retail (rate parity) | £200 |
| HP hotel margin | £40 |
| Duffel flight (London → Lisbon, 2 pax) | £180 retail |
| Duffel fee to HP: $3 + 1% | ~£5 |
| ATOL contribution: £2.50 × 2 passengers | −£5 |
| Payment processing (high-risk, 4% of £380 total) | −£15.20 |
| **Net margin per booking (base case)** | **~£24.80** |

With 25% hotel markup and ancillary attach (insurance):
- Hotel at 25% markup: +£40 → +£50 net margin contribution
- Insurance affiliate (15% × £50 policy): +£7.50
- **Total per booking (25% markup + ancillaries): ~£35–45**

🟡 **Gap:** The GO criterion of £45+/booking requires 25–30% hotel markup on higher-value bookings plus consistent ancillary revenue. The first 200 bookings will skew toward lower-value test cases and lower markup. Set expectation that the 200-booking average will land at £30–40, with trajectory toward £45+ by booking 400+. The GO criterion should be evaluated as a trend, not a point-in-time snapshot.

🔴 **Contradiction:** discovery.md unit economics table does not fully account for high-risk payment processing (3.5–6% per transaction). At 3.5%, processing on a £380 booking = ~£13. At 6%, it is ~£23. The margin range of £25–45 above reflects this spread. The £45+/booking GO criterion assumes 4% processing and 25%+ markup — achievable but requires active margin management.

### Subscription Layer (Gate 5 → Gate 5+)

Do not launch the subscription paywall at Gate 5. Wait until:
- 200+ bookings completed
- 30-day repeat usage rate >20%
- Users have experienced the preference profile improving across 2+ trips
- NPS consistently positive

At 200 bookings from ~150 unique users (avg 1.3 bookings each), the subscription addressable base is ~150 users × 15% conversion = ~22 subscribers at £59.99/yr = ~£1,320/year. Negligible at this scale — do not optimise for subscription revenue until active user base exceeds 500. Source: discovery.md revenue stream priority order.

### GO/NO-GO Criteria

| Signal | GO | BORDERLINE | NO-GO |
|--------|-----|------------|-------|
| Average net margin per booking | £45+ | £25–44 | <£25 |
| Total bookings in Gate 5 window (~4 months) | 200+ | 100–199 | <100 |
| ATOL status | Approved, licence in hand | Application submitted, pending | Not submitted or denied |
| Repeat booking rate | >25% of Gate 4 bookers make a second booking | 15–25% | <15% |
| RateHawk | Live bookings confirmed | Sandbox only | Not integrated |
| High-risk merchant account | Active and processing | Approval pending | Not applied |

**GO → SCALE:** £45+/booking average, 200+ bookings, ATOL approved, repeat signals present. This is the point at which the unit economics support a growth decision: marketing spend, team hiring, or seed fundraising.

**KILL — Hard stop:** ATOL denied AND margins consistently below £25/booking. Both conditions together make the dynamic packaging model unviable. Options:
1. **Hotel-only bed bank:** Drop flights, no ATOL required. Hotel-only at 15–25% markup = ~£25–35/booking. Viable if subscription is layered on top and CAC is kept very low.
2. **B2B pivot:** Licence the preference engine and portfolio view to an existing ATOL holder (OTA or large travel agent). Monetises the technology without the compliance burden.
3. **Shutdown:** Return remaining capital.

**KILL — Margin only (£25–44/booking):** Below £45 average sustained across 50+ bookings, pause growth spend. Analyse: is margin low because of booking mix (too many low-value short breaks), because of markup (too conservative), or because of ancillary attach failure? Fix and retest before committing to scale spend.

---

## Killswitch Criteria Summary

Any of the following triggers an immediate review meeting before proceeding to the next gate:

| # | Killswitch | Trigger Condition | Response |
|---|------------|-------------------|----------|
| KS1 | Zero demand signal | Gate 1: all variants <1% signup | Stop. Revisit problem framing. No Gate 2. |
| KS2 | Competitor lock-in | Gate 2: >6/10 say Booking.com/Expedia, see no reason to switch | Stop. Structural problem — not solvable with UX. |
| KS3 | NLP adds no value | Gate 3: <30% complete mock booking + majority prefer filters | Pause. Pivot interaction model or reduce scope to deal alerts only. |
| KS4 | Booking leakage >50% | Gate 4: sustained >50% over 30 days | Review before Gate 5. Full funnel ownership may help — but if structural, exit. |
| KS5 | ATOL denied | Gate 5: CAA declines licence | Immediate pivot evaluation: hotel-only or B2B. |
| KS6 | Margin floor failure | Gate 5: <£25/booking sustained over 50 bookings | Review markup and ancillary strategy. If not improvable, exit. |
| KS7 | Cash runway <8 weeks | Any gate | Freeze non-essential spend. Raise or exit decision required. |

---

## Owner Assignments

| Activity | Owner | Dependency | Timing |
|----------|-------|------------|--------|
| Landing page build (G1) | Founder — no-code tools | None | Week 1 |
| Ad campaign setup (G1) | Founder or freelance marketer | Landing pages live | Week 1 |
| Email list management | Founder | Gate 1 live | Ongoing |
| Interview recruitment (G2) | Founder/PM | Gate 1 email list | Week 2 |
| Interview facilitation (G2) | Founder/PM | Participants confirmed | Week 2–4 |
| Interview synthesis (G2) | Founder/PM | Interviews complete | Week 4 |
| Prototype architecture (G3) | Developer | Gate 2 GO | Week 4–5 |
| NLP integration (G3) | Developer | Claude/OpenAI API key | Week 5 |
| User testing sessions (G3) | Founder/PM | Prototype complete | Week 7–8 |
| MVP development (G4) | Developer (freelance or co-founder) | Gate 3 GO | Month 2 |
| Duffel API production (G4) | Developer | Duffel account + Gate 3 GO | Month 2 |
| Affiliate account setup (G4) | Founder | Gate 3 GO | Month 2 |
| RateHawk B2B account application | Founder | Gate 4 start | Month 2 — do not delay |
| Organic distribution (G4) | Founder | MVP live | Month 2–4 |
| ATOL application submission | Founder + legal specialist | Gate 4 GO decision | Month 3 — critical path |
| High-risk merchant account application | Founder | Gate 4 start | Month 2 — allow 4–6 weeks |
| RateHawk live integration (G5) | Developer | RateHawk approved + ATOL submitted | Month 4–5 |
| Legal review of package T&Cs (G5) | Travel law specialist | Gate 5 start | Month 4 |
| ATOL compliance workflow (G5) | Developer + legal | ATOL approved | Month 5 |

---

## Post-Gate 5 Scale Decision Framework

### If all five gates produce GO:

The unit economics are validated. Holiday Portfolio has demonstrated:
- Demand signal (>100 signups, organic pull from strangers)
- Desirability (>6/10 users would switch, NLP resonates, preference profile trusted)
- Product-market fit signal (50+ real bookings, <30% leakage rate)
- Commercial viability (£45+/booking, ATOL approved, 200+ bookings)

**Post-Gate 5 decisions:**
1. **Scale organic acquisition** — content marketing, SEO (city break deals by destination), deal alert email list (Going.com model: 2M subscribers at $49/yr, 80%+ gross margin on subscriptions)
2. **Approach Hotelbeds** — at 200+ bookings/month, commercial negotiation becomes viable. 300K+ properties, better wholesale rates at volume.
3. **TravelgateX** — one GraphQL API → 1,000+ suppliers. Inventory expansion in Phase 2 without multiple integrations.
4. **Subscription launch** — when active base exceeds 500 users. £59.99/yr. Target 15–20% conversion.
5. **Seed fundraising** — with validated unit economics (£45+/booking, 200+ bookings, ATOL), a seed round becomes credible. Target: £300–500K for 12-month growth runway.

### If the tree kills before Gate 4 (cost <£4,000):

The thesis was wrong and was discovered cheaply. The most likely kill points are Gate 2 (booking leakage structural) and Gate 3 (NLP adds no value). In either case, £1,500–4,000 to avoid a £50,000+ platform build that replicates the Desti failure mode is a rational outcome. Document learnings and redirect.

### If the tree kills at Gate 5 (cost ~£49,000):

ATOL denied or margins persistently below £25/booking.
- **B2B pivot:** Licence the preference engine to an existing ATOL holder. The 12 months of user behaviour data, NLP search infrastructure, and preference graph have real IP value to an established OTA or travel agent network.
- **Hotel-only bed bank:** Remove flight component. No ATOL required. Margins lower (~£25–35/booking) but legally simple. Viable with subscription layered on top and organic-only CAC.

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Gate |
|------|-------------|--------|------------|------|
| Booking leakage >50% | High | Critical | Own full booking funnel (Gate 5). Transparent deal scoring. In-platform checkout. Visible preference profile builds trust. | G4, G5 |
| CAC exceeds LTV permanently | High (Year 1) | High | Organic-only through Gate 4. Bed bank margins reduce breakeven from 2,500+ to 800–1,200 users. | G4 |
| ATOL application denied | Low-Medium | Critical | Apply with legal support. Financial viability documentation. ABTOT bridge as backup. | G5 |
| Mindtrip UK expansion | Medium (12–36 month horizon) | High | HP differentiates on price-first, UK-native, visible portfolio. Speed to Gate 5 is the defence — establish user base before Mindtrip UK launch. | All |
| High-risk merchant account rejection | Medium | High | Apply early (Gate 4 start). Allow 4–6 weeks. Have alternative processor identified. | G4, G5 |
| Affiliate commission rate changes | Medium | Medium | Affiliate (G4) is a stepping stone, not the model. Bed bank (G5) removes dependence on affiliate rates. Diversify suppliers. | G4 |
| Cold start (preference graph) | High | Medium | Designed onboarding conversation. Archetype priors. Explicit user-editable profile from Day 1. Preference graph visible and useful even from session 1. | G3, G4 |
| Disruption event (pandemic, ash cloud, airline strike) | Low-per-year; near-certain over 5 years | Critical | Commission-only model has zero revenue during disruptions. Subscription revenue adds a floor. Gate 5 validates this before growth spend. | G5 |
| Chargeback rate triggers processor exit | Medium | High | Travel chargeback rate: 0.89% (vs ecommerce average 0.6%). Visa threshold: 0.65%. Travel routinely exceeds this. Implement fraud screening from Day 1 of G5 direct bookings. | G5 |
| NLP as table stakes (no moat) | High (already true) | Medium | The moat is not NLP — it is the combination of visible preference graph + portfolio frame + price-first positioning + UK-native ATOL. NLP is the entry point, not the differentiation. | G3, G4 |

Sources: research-5-revenue-risks.md (chargeback statistics, CAC benchmarks, affiliate risks, disruption events); research-6-bed-banks.md (ATOL timeline, RateHawk, Hotelbeds); discovery.md (kill signals, competitive whitespace); research-4-tech-feasibility.md (NLP latency, cold start mitigations)

---

## Sources

### Internal Research Files
- [[discovery]] — Confidence scores (D:8/V:7/F:8), competitive landscape, product architecture, revised unit economics with bed bank channel, kill signals, validation playbook
- [[research-5-revenue-risks]] — Bear case: Desti (planning-to-booking leakage), Culture Trip, TripIt, Secret Escapes, CAC/LTV math, chargeback rates 0.89%, high-risk processing 3.5–6%, affiliate rate reality (4% standard)
- [[research-6-bed-banks]] — RateHawk (no minimum volume, free API, 2.5M+ properties), Hotelbeds (300K+ properties, volume-gated), TravelgateX (GraphQL aggregator), ATOL compliance path, dynamic packaging margin analysis
- [[research-4-tech-feasibility]] — NLP parse <600ms (Claude Haiku), end-to-end latency ~2,350ms, vector DB costs (100K users = £150/month), phased recommendation engine, build cost £50–100K, cold start mitigations

### External Sources
- [Failory: Desti post-mortem](https://www.failory.com/cemetery/desti) — AI travel planner, SRI/Siri team, planning-to-booking leakage case study
- [Skift: Lessons from a failed travel startup](https://skift.com/2014/06/26/lessons-from-the-demise-of-another-failed-travel-startup/) — Desti post-mortem quotes
- [UK CAA Small Business ATOL](https://www.caa.co.uk/atol-protection/trade/about-atol/small-business-atol/) — £1,223 application + £1,250 advance APC = £2,473 upfront; £2.50/passenger ongoing; ~12 weeks
- [TailoredPay: High-risk merchant account fees](https://tailoredpay.com/blog/high-risk-merchant-account-fees/) — 3.5–6% processing rate, 5–15% rolling reserve
- [Vendoservices: Visa/Mastercard high-risk fees](https://vendoservices.com/blog/visa-mastercard-high-risk-fees-and-virp/) — Visa £950/year registration (up from £500, April 2024)
- [Booking.com Affiliate Support Centre](https://affiliates.support.booking.com/kb/s/article/Commission-and-Payments) — 4% standard affiliate rate confirmed
- [Chargeflow: Chargeback statistics 2025](https://www.chargeflow.io/blog/chargeback-statistics-trends-costs-solutions) — Travel chargeback rate 0.89%, 816% increase 2023–2024, £2.40 cost per £1 disputed
- [Fox World Travel: Booking leakage](https://www.foxworldtravel.com/business-travel-blog/what-is-booking-leakage-and-how-does-it-affect-your-travel-program/) — 61% of business travellers book outside managed channels even when mandated
- [Phocuswright: Travel startup funding Q1 2025](https://www.phocuswright.com/Travel-Research/Research-Updates/2025/travel-startup-funding-falters-in-q1-2025) — $5.3B in 2023, <$1B in Q1 2025, investor retreat from category
- [RateHawk for business](https://www.ratehawk.com/for-business/) — No minimum volume, free API, 2.5M+ properties, net rate model
- [Going.com: How it works](https://www.going.com/how-it-works) — 2M+ subscribers, subscription-not-commission model, 80%+ gross margin
- [Mize Tech: 2025 travel industry margins](https://mize.tech/blog/2025-travel-industry-recovery-high-volume-low-margin/) — Industry EBITDA 15% below pre-pandemic despite volume recovery

---

*Strategy artefact 12 of 13. See also: [[11-wwhtbt-conditions]] (conditions for the strategy to work) and [[13-phase-1-plan]] (execution plan for Gate 1–3).*

*Previous version of this document used a different gate structure (Duffel API terms as Gate 4, repeat behaviour as Gate 5). This version reflects the revised go-to-market sequence with bed bank economics as the central commercial thesis validated at Gate 5.*

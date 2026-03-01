# Phase 1 Execution Roadmap — Holiday Portfolio

**Horizon:** 18 months (Month 0 = decision to proceed)
**Date:** February 2026
**Framework:** Sequential build with embedded gates; cheapest validation first
**Strategic question:** How should Holiday Portfolio enter the UK travel market as an AI personalisation engine with a bed bank revenue model?

---

## Contents

1. [Phase Overview](#phase-overview)
2. [Milestone Table](#milestone-table)
3. [Budget Tracker](#budget-tracker)
4. [Phase Detail](#phase-detail)
   - [Month 0-1: Validation](#month-0-1-validation)
   - [Month 1-3: Technical Foundation](#month-1-3-technical-foundation)
   - [Month 3-5: Bed Bank Integration](#month-3-5-bed-bank-integration)
   - [Month 5-8: Dynamic Packages](#month-5-8-dynamic-packages)
   - [Month 8-12: Personalisation Engine](#month-8-12-personalisation-engine)
   - [Month 12-18: Scale](#month-12-18-scale)
5. [Success Metrics by Phase](#success-metrics-by-phase)
6. [Team Requirements](#team-requirements)
7. [Key Dependencies](#key-dependencies)
8. [Risk Register](#risk-register)
9. [Revenue Model Evolution](#revenue-model-evolution)

---

## Phase Overview

| Phase | Months | Name | Primary Goal | Budget | Key Unlock |
|---|---|---|---|---|---|
| 1 | 0-1 | Validation | Kill or confirm before a penny of build spend | ~£1,500 | Booking leakage not fatal |
| 2 | 1-3 | Technical Foundation | MVP live: NLP + Duffel flights + affiliate hotels | ~£15,000 | First real booking |
| 3 | 3-5 | Bed Bank Integration | RateHawk live; preference graph v1; ATOL submitted | ~£20,000 | Net rate margin unlocked |
| 4 | 5-8 | Dynamic Packages | ATOL licence; flight+hotel packages; deal scoring | ~£15,000 | Package economics confirmed |
| 5 | 8-12 | Personalisation Engine | Semantic graph; visible profile; subscription launch | ~£15,000 | Subscription revenue |
| 6 | 12-18 | Scale | Collaborative filtering; Hotelbeds; B2B exploration | ~£20,000 | Seed-fundable metrics |
| **Total** | **0-18** | | | **~£86,500-101,500** | |

> **Budget range note:** The £85,000-100,000 total reflects Phase 1-5 completion. Phase 6 is conditional on Phase 5 GO metrics (repeat booking rate, subscription conversion). If Phase 5 metrics are weak, Phase 6 budget is reallocated to iteration, not scale.

---

## Milestone Table

| Milestone | Month | Owner | Success Metric | Phase |
|---|---|---|---|---|
| Landing page (3 variants) live | M0 | Founder | All variants deployed, tracking live | 1 |
| Gate 1: Messaging validation | M0.5 | Founder | Email capture >8% on winning variant | 1 |
| User interviews complete (8-10) | M0.75 | Founder | 6+ confirm portfolio pain as felt problem | 1 |
| Concierge MVP: first booking | M1 | Founder | ≥1 booking via recommendation | 1 |
| Gate 2: Booking conversion | M1 | Founder | >50% booking conversion; leakage <30% | 1 |
| RateHawk sandbox account | M1 | Founder | Sandbox API keys active | 1 |
| NLP intent parser live (Haiku) | M1.5 | Engineer | Parses "warm, cheap, long weekend" to structured intent <600ms | 2 |
| Preference capture: onboarding | M1.5 | Engineer | Budget wizard + explicit prefs stored per user | 2 |
| Duffel flights integration | M2 | Engineer | Search + book live in sandbox | 2 |
| Affiliate hotel links live | M2 | Engineer | Booking.com affiliate returning hotel results | 2 |
| Basic deal feed UI | M2.5 | Engineer | Deal feed visible; sortable; linked | 2 |
| Tech foundation complete | M3 | Engineer | End-to-end booking possible (affiliate channel) | 2 |
| RateHawk API: live booking | M3.5 | Engineer | First net-rate hotel booking completed | 3 |
| Package assembly: Duffel + RateHawk | M4 | Engineer | Flight + hotel assembled and priced as package | 3 |
| ATOL Small Business application submitted | M4 | Founder | Application and fee (£2,700) submitted to CAA | 3 |
| Preference graph v1 (pgvector) | M4.5 | Engineer | Cosine similarity returning relevant destinations | 3 |
| Bed bank integration complete | M5 | Engineer | Net rate bookings live; margin confirmed >15% hotel | 3 |
| ATOL licence received | M6 | Founder | CAA licence in hand; 12-week process from M4 | 4 |
| Flight+hotel packages live (ATOL-protected) | M6 | Engineer | First packaged booking completed under ATOL | 4 |
| Deal confidence scoring | M6.5 | Engineer | Score generated per deal (price history + prefs + budget) | 4 |
| Portfolio view live | M7 | Engineer | Budget tracker + trip timeline + deal alerts visible | 4 |
| Deal monitoring + alerts | M7.5 | Engineer | Price drop alerts sent via email/push | 4 |
| Dynamic packages fully operational | M8 | Founder | Package GTV >£5,000/month | 4 |
| Semantic preference graph | M9 | Engineer | Vector embeddings from conversations stored per user | 5 |
| Visible preference profile | M10 | Engineer | User can view + edit their preference graph | 5 |
| Recommendation feed v2 | M11 | Engineer | CTR on recommendations >15% | 5 |
| Subscription tier launch (£59.99/yr) | M12 | Founder | >48 subscribers at launch month | 5 |
| 500+ users on platform | M12 | Growth | 500 registered, 200+ with ≥1 booking | 5 |
| Collaborative filtering live | M14 | Engineer | 5K+ users enabling similarity modelling | 6 |
| Hotelbeds integration | M15 | Engineer | Hotelbeds returning inventory alongside RateHawk | 6 |
| Content marketing engine | M16 | Growth | 10+ SEO articles ranking; 3K+ monthly organic visitors | 6 |
| B2B API scoping complete | M18 | Founder | First prospect conversation; API spec drafted | 6 |
| Phase 1 close | M18 | Founder | Seed-fundable metrics OR ramen profitability | 6 |

---

## Budget Tracker

### Cumulative Spend by Phase

| Phase | Period | Phase Budget | Cumulative | Primary Spend |
|---|---|---|---|---|
| 1: Validation | M0-1 | £1,500 | £1,500 | Ads, interviews, incentives |
| 2: Technical Foundation | M1-3 | £15,000 | £16,500 | Engineering (contract) |
| 3: Bed Bank Integration | M3-5 | £20,000 | £36,500 | Engineering + ATOL application |
| 4: Dynamic Packages | M5-8 | £15,000 | £51,500 | Engineering + ATOL compliance |
| 5: Personalisation Engine | M8-12 | £15,000 | £66,500 | Engineering + subscription infra |
| 6: Scale | M12-18 | £20,000 | £86,500 | Engineering + Hotelbeds + content |
| **Contingency (15%)** | | **~£13,000** | **~£99,500** | |

### Phase Budget Breakdown

**Phase 1: Validation (~£1,500)**

| Item | Cost | Notes |
|---|---|---|
| Paid social (3 landing page variants, Meta) | £900 | £300 per variant; kill underperformer at Day 5 |
| Landing page tool (Carrd Pro) | £15 | Three variants; single account |
| Interview recruitment (Respondent.io, 8-10 users) | £300 | UK, 25-45, 2+ trips/year, £35k+ HHI |
| Interview incentives (10 x £30) | £300 | Amazon vouchers; standard for 45-min interview |
| Transcription (Otter.ai) | £40 | ~7.5 hours of recording |
| Concierge tools (Notion, Typeform, Airtable) | £80 | Notion Business; Typeform and Airtable free tier |
| Contingency | £150 | |
| **Total** | **£1,785** | |

> 🟡 **Gap:** Recruitment cost depends on Respondent.io availability for UK travel segment. Backup: Prolific (similar cost), or personal network + LinkedIn (£0, slower). Budget assumes professional recruitment panel.

**Phase 2: Technical Foundation (~£15,000)**

| Item | Cost | Notes |
|---|---|---|
| Engineer (contract, 3 days/week x 8 weeks) | £9,600 | £400/day market rate (mid-weight, remote) |
| Designer (contract, 2 days/week x 6 weeks) | £3,600 | £300/day; deal feed UI + onboarding UX |
| Infrastructure (Vercel Pro + Supabase Pro) | £400 | £80/month; 5 months to end of Phase 3 |
| Duffel API (sandbox; first live fees minimal) | £200 | $3/order + 1% commission; minimal at low volume |
| Booking.com Affiliate API (free to join) | £0 | No cost; pays commission on completed bookings |
| Domain, SSL, tooling | £200 | Annual; plus monitoring (Sentry free tier) |
| **Total** | **£14,000** | |

> 🟡 **Gap:** Engineer day rate varies £300-600 depending on seniority and contract type. £400/day assumes mid-weight full-stack with React/Next.js experience. Senior/London-based rates will be higher. Source: YunoJuno 2025 rate card, Toptal benchmarks.

**Phase 3: Bed Bank Integration (~£20,000)**

| Item | Cost | Notes |
|---|---|---|
| Engineer (contract, 3 days/week x 8 weeks) | £9,600 | Continuation from Phase 2 |
| ATOL Small Business application fee | £2,700 | CAA fee: £2,700 all-in per research-6-bed-banks.md |
| ATOL compliance consultant | £2,500 | Legal review of terms, package definitions, T&Cs |
| pgvector setup and schema design | £500 | Supabase pgvector is free; cost is engineering time |
| RateHawk API integration testing | £0 | RateHawk sandbox: free API access, no minimum volume |
| Travel agent registration (Companies House + CAA) | £500 | Ltd company if not already registered |
| Contingency | £1,700 | |
| **Total** | **£17,500** | |

> 🟡 **Gap:** ATOL Small Business application costs cited as "~£2,700 all-in" in research-6-bed-banks.md, but the CAA fee structure has three tiers. Confirm exact fee against current CAA schedule at application time. ABTOT franchise ATOL available from ~£942 as interim if timeline is tight.

> 🔴 **Contradiction:** discovery.md states ATOL costs "~£3,200-4,700" while research-6-bed-banks.md states "~£2,700 all-in." The discrepancy likely reflects different data points: £2,700 is the Small Business ATOL application fee; £3,200-4,700 includes legal/compliance costs. Budget Phase 3 at £2,700 (CAA fee) + £2,500 (compliance consultant) = £5,200 total ATOL compliance cost.

**Phase 4: Dynamic Packages (~£15,000)**

| Item | Cost | Notes |
|---|---|---|
| Engineer (contract, 3 days/week x 8 weeks) | £9,600 | Focus: package assembly, deal scoring, portfolio UI |
| Deal confidence scoring algorithm | £0 | Engineering time (included above); no additional licensing |
| Price history data feed | £500 | Kayak API or Skyscanner affiliate data; or build from cached Duffel responses |
| Push notifications infrastructure | £400 | OneSignal free tier up to 1K users; upgrade ~£100/month after |
| ATOL annual renewal (prorated) | £300 | Renewal costs post-licence |
| Contingency | £1,200 | |
| **Total** | **£12,000** | |

> 🟡 **Gap:** Price history data for "deal confidence scoring" is not yet sourced. Options: (1) cache Duffel flight prices over time (free, takes 6-8 weeks to accumulate); (2) subscribe to Skyscanner Travel Insight API (pricing on application); (3) use Kayak Affiliate API (free, limited). The cached-Duffel approach is cheapest and most realistic for Phase 4. Deal confidence will be imprecise early — communicate this to users.

**Phase 5: Personalisation Engine (~£15,000)**

| Item | Cost | Notes |
|---|---|---|
| Engineer (contract, 3 days/week x 10 weeks) | £12,000 | Semantic embeddings, profile UI, recommendation engine v2 |
| OpenAI embeddings (text-embedding-3-small) | £150 | ~£0.006/user/month at 1K users. Source: research-4-tech-feasibility.md |
| Qdrant Cloud (vector DB upgrade from pgvector) | £100 | Optional upgrade if pgvector performance insufficient at >10K vectors |
| Subscription billing infrastructure (Stripe) | £0 | Stripe Billing included in existing Stripe integration |
| Subscription landing page + comms | £500 | Copywriting, email sequence, in-app prompts |
| Contingency | £1,000 | |
| **Total** | **£13,750** | |

> 🟡 **Gap:** Subscription conversion benchmarks vary widely. discovery.md cites "48.7% trial-to-paid conversion" but this is sourced from SaaS benchmarks, not travel-specific subscription products. Going.com ($49/yr, 2M subscribers) is the closest comparable but is a US deal-alert product without the booking integration. UK travel subscription willingness-to-pay at £59.99/yr is unvalidated. This should be tested in Phase 4 via a waitlist or pre-order before Phase 5 launch.

**Phase 6: Scale (~£20,000)**

| Item | Cost | Notes |
|---|---|---|
| Engineer (contract or FT hire, 3-4 days/week x 12 weeks) | £12,000 | Collaborative filtering, Hotelbeds integration |
| Hotelbeds API integration | £0 | API access: free. Cost is engineering time (included above) |
| Content marketing (10-15 articles) | £3,000 | £200-300/article; SEO-focused; travel deal content |
| B2B API scoping (design, documentation) | £1,500 | Engineering time for spec; legal review of licence model |
| Paid acquisition (CAC testing) | £2,000 | Test one paid channel at scale; measure CAC precisely |
| Infrastructure scaling | £500 | Supabase/Vercel tier upgrade as user base grows |
| **Total** | **£19,000** | |

> 🟡 **Gap:** Hotelbeds access requires "booking history and commercial negotiation" per research-6-bed-banks.md. By Month 12-15, Holiday Portfolio should have 3-6 months of RateHawk booking data. This may be sufficient for a Hotelbeds conversation — but Hotelbeds may require a minimum booking volume guarantee. TravelgateX aggregator (single GraphQL API → 100+ suppliers) is the fallback if Hotelbeds negotiation fails.

---

## Phase Detail

### Month 0-1: Validation

**Goal:** Confirm the three kill assumptions before a penny of build spend. Kill at Month 1 costs under £2,000. Gate: booking leakage must not be fatal.

**Owner:** Founder (solo execution)

**What you're testing:**
1. Does the messaging resonate? (Landing page email capture)
2. Is portfolio planning pain real as a felt experience? (Interviews)
3. Will users actually book — or leak to OTAs? (Concierge MVP)

**Execution:**

*Weeks 1-2: Three-variant landing page test*
- Build three variants in Carrd: (A) "Build your travel year — set a budget, get matched deals," (B) "Know when to book before prices move — beat the market on flights and hotels," (C) "The personalised deal feed that learns how you travel"
- Deploy £300/variant on Meta (UK, 25-45, travel intent signals, £30-60k HHI)
- Kill weakest two variants at Day 7; redirect remaining budget to winner
- Minimum threshold: >8% email capture rate on winning variant; >2.5% CTR on ad
- Tools: Carrd Pro (£15), Meta Ads Manager, Google Analytics 4, Hotjar

*Weeks 2-4: User interviews (8-10)*
- Recruit via Respondent.io (UK, 25-45, 2+ leisure trips/year, £35k+ HHI)
- Jobs-to-be-Done framework: "Tell me about the last time you planned a holiday"
- Validate: 303-minute research time per trip (Expedia, n=5,713); planning-to-booking leakage as felt pain; concept reaction; willingness to pay £50-100/yr
- GO criteria: 6+ of 10 confirm portfolio pain; 5+ ask "how do I sign up?" unprompted; <4 raise commission trust as blocking concern

*Weeks 3-4: RateHawk sandbox signup (parallel)*
- Self-service signup: ratehawk.com/api — no minimum volume, no commercial negotiation required
- Objective: API keys in hand before Phase 2 starts; understand data model, net rate structure, search/booking flow
- Time: ~2 hours. Cost: £0

*Weeks 4-5: Concierge MVP (20-30 users from interview pool + waitlist)*
- Notion workspace per user; WhatsApp deal alerts (2-3/week); manual booking assistance
- Track: deal alert → opened → clicked → booked → or leaked to OTA (UTM parameters)
- GO criteria: >50% of users complete ≥1 booking through platform; leakage <30%

**Kill signals:** If email capture <4% on all three variants at £200 spend each → STOP. If <5/8 interviews confirm planning-to-booking pain as felt → PAUSE and reframe ICP. If concierge conversion <30% after 15 users through full deal cycle → KILL (planning-to-booking leakage confirmed as fatal).

**Dependencies:**
- [[Duffel API]] contact to be alerted (not yet engaged commercially — just relationship notice)
- Companies House registration recommended before Phase 2 begins
- [[RateHawk]] sandbox access confirmed before Month 1 close

---

### Month 1-3: Technical Foundation

**Goal:** Working MVP with NLP intent parsing, basic preference capture, Duffel flights, affiliate hotel links, and a deal feed UI. First real (affiliate) booking through the platform.

**Owner:** Founder + Contract Engineer (primary) + Contract Designer (secondary)

**Prerequisite:** Validation GO at Month 1. Build does not start if concierge MVP conversion is below 30%.

**Tech stack confirmed:**
- Frontend: Next.js (App Router) — fast, SEO-capable, Vercel-native
- Backend: Next.js API routes + Supabase (Postgres) — serverless; auth included; RLS
- Hosting: Vercel — zero-config; auto-scaling; free tier covers early beta
- Payments: Stripe — PCI compliant; 3DS; FX handling
- NLP: Claude Haiku (Anthropic API) — <600ms latency; ~£0.006/user/month at 1K users
- Vector DB: Supabase pgvector (Phase 3 upgrade to Qdrant Cloud if needed at scale)
- Analytics: PostHog (open-source, self-hostable)
- Email: Resend (Supabase-native transactional email)

**Build sequence:**

*Month 1-1.5: NLP intent parser*
- System prompt: extract structured intent from free-text travel queries
- Input: "Long weekend somewhere warm, under £400, good food scene"
- Output: `{ destination_attributes: ["warm climate", "strong food culture"], budget_ceiling_gbp: 400, trip_duration: "long weekend (3-4 nights)" }`
- Stack: Claude Haiku API via Next.js API route; structured JSON output via tool_use or response_format
- Latency target: <600ms. AI infrastructure cost: ~£0.006/user/month at 1K users (source: research-4-tech-feasibility.md)
- Test: 50 real query strings; assess extraction accuracy vs manual ground truth

*Month 1.5-2: Basic preference capture*
- Onboarding conversation: 5-question budget wizard (annual budget, party size, typical trip length, destination type, preferred airline/hotel tier)
- Explicit preferences stored in Supabase user profile table
- Preference schema: `user_id`, `budget_annual`, `destinations_liked`, `style_tags`, `budget_per_trip`, `trip_frequency`
- No ML at this stage — explicit preferences only. Semantic graph comes in Phase 5.

*Month 2-2.5: Duffel flights integration*
- Flight search: Duffel Flights API → search by origin, destination, dates, passenger count
- Duffel pricing: $3/order + ~1% of total order value. Source: discovery.md, Duffel docs
- Integration: Next.js API route → Duffel REST API → results stored/cached in Supabase
- PM to engage Duffel contact for commercial terms discussion (start conversation; don't commit)
- Sandbox test: 50 flight search queries; 5 end-to-end test bookings (test cards)

*Month 2-2.5: Affiliate hotel links*
- Booking.com Affiliate API: free to join; 4-8% commission on completed bookings
- Returns: hotel results with affiliate deep-link to Booking.com checkout
- This is the interim hotel solution — not the margin play. RateHawk replaces this in Phase 3.
- Integration: hotel search results displayed alongside Duffel flights in deal feed

*Month 2.5-3: Basic deal feed UI*
- Deal cards: destination name, dates, flight price (Duffel), hotel recommendation (Booking.com affiliate link), estimated total cost
- Sortable by: price, destination match score (based on explicit preferences), date
- "Save" / "Monitor" CTA: saves deal for deal alerts (Phase 4 feature; stub in Phase 2)
- Portfolio sidebar: budget remaining, trips booked (stub in Phase 4)
- Mobile-responsive: 60%+ of UK travel searches on mobile (source: Ofcom 2025 data)

**Success metrics (Phase 2):**
- NLP parser: >85% structured intent extraction accuracy on 50 test queries
- First real booking: ≥1 affiliate booking completed through platform (not concierge)
- Deal feed engagement: >30% of users who reach deal feed click through to a hotel/flight result
- Page load: <3 seconds on mobile (Core Web Vitals Lighthouse >80)

**Dependencies:**
- [[Duffel API]] — commercial terms not yet confirmed; sandbox access first. Gate: if Duffel API is denied, assess Amadeus Developers API (free sandbox, IATA required — adds 4-8 weeks) or Travelfusion (commission model only) as fallback
- [[Booking.com Affiliate]] programme approval — typically 1-2 week review
- Engineer contracted by start of Month 1 (use YunoJuno or Toptal; trial with paid test task first)

---

### Month 3-5: Bed Bank Integration

**Goal:** RateHawk API live for net-rate hotel booking. Package assembly (Duffel + RateHawk). ATOL Small Business application submitted. Preference graph v1 operational.

**Owner:** Founder (commercial/compliance) + Engineer (technical)

**The commercial unlock:** Moving from affiliate commission (4-8% of hotel price) to bed bank net rate (buy at wholesale, sell at markup 15-25%) transforms unit economics. At £160 net rate for 2 nights:
- Affiliate: £200 retail × 4% = **£8 revenue**
- Bed bank + 25% markup: sell at £200, buy at £160 = **£40 revenue**
- Source: discovery.md unit economics table

**Execution:**

*Month 3-3.5: RateHawk API live*
- Transition from RateHawk sandbox (established Month 1) to live API
- RateHawk net rate model: buy at wholesale net price, sell at net + your markup. No minimum volume. Self-service. Source: research-6-bed-banks.md
- RateHawk inventory: 2.5M+ properties; strong European coverage (key for UK city breaks)
- Integration: search → net rate returned → apply markup → display to user → book via RateHawk API → confirmation to user
- Markup strategy: 20-25% on net rate (competitive with retail OTA pricing while preserving margin)
- Rate parity note: RateHawk net rates may be subject to rate parity clauses. Cannot display prices lower than OTA retail — must add value through personalisation/curation, not price undercutting. Source: research-6-bed-banks.md

*Month 3.5-4: Package assembly (Duffel + RateHawk)*
- Package builder: Duffel flight search + RateHawk hotel search → assembled as single itinerary
- Pricing: flight net price + hotel net rate + markup = package retail price
- Display: single package price; itinerary breakdown on detail view; booking splits into two API calls (Duffel + RateHawk)
- Pre-ATOL compliance: display as "flight + hotel" not as "package holiday" until ATOL licence received. Add explicit disclaimer.
- This mirrors LoveHolidays' model: 9.9% take rate on Duffel flight + RateHawk hotel combinations. Source: research-5-revenue-models.md

*Month 4: ATOL Small Business application submitted*
- Submit to Civil Aviation Authority: Small Business ATOL
- Required documents: Ltd company registration, evidence of insurance, trust account setup, sample T&Cs
- Timeline: ~12 weeks from submission to licence. Source: research-6-bed-banks.md
- Fee: ~£2,700 all-in (see Phase 3 budget note for contradiction on costs)
- Interim option: ABTOT franchise ATOL from ~£942 if timeline is critical. Allows dynamic package sales while waiting for own ATOL licence.
- Owner: Founder + Travel Compliance Consultant

*Month 4-5: Preference graph v1 (pgvector, cosine similarity)*
- Schema: user preference vector (1,536 dimensions using OpenAI text-embedding-3-small) stored in Supabase pgvector
- Phase 3 inputs: explicit preferences from onboarding + click/save behaviour in deal feed
- Not yet conversational (semantic graph comes in Phase 5) — this is explicit prefs → embedding → cosine similarity
- Destination vector: each destination embedded with attributes (climate, culture, food, price tier, distance from UK)
- Matching: cosine similarity between user preference vector and destination vectors → ranked recommendation list
- Build time estimate: 6-8 weeks for initial cosine similarity implementation. Source: research-4-tech-feasibility.md
- Cold start mitigation: archetype priors (5 UK traveller archetypes: city breaker, beach seeker, cultural explorer, adventure traveller, luxury escapist). New users mapped to archetype on onboarding.

**Success metrics (Phase 3):**
- RateHawk bookings: ≥5 live hotel bookings via RateHawk net rate
- Margin confirmation: gross hotel margin ≥15% on first 5 bookings (vs 4% affiliate)
- ATOL submission: application submitted and acknowledged by CAA by end of Month 4
- Preference graph: recommendations returning relevant destinations for 80%+ of test users

**Dependencies:**
- [[RateHawk API]] — sandbox confirmed Month 1; live access requires business account and initial documentation
- [[ATOL CAA]] — application requires Ltd company registration, insurance, trust account. Must start Companies House + bank account setup no later than Month 2.
- [[pgvector]] — Supabase extension; free; enable in Supabase dashboard. No additional infrastructure cost.

---

### Month 5-8: Dynamic Packages

**Goal:** ATOL licence received and first ATOL-protected packages sold. Deal confidence scoring live. Portfolio view with budget tracking and deal monitoring. This is the economic unlock — the phase that makes unit economics viable.

**Owner:** Founder (commercial) + Engineer (product features)

**The package economics:** Duffel flight (at net) + RateHawk hotel (at net + 20-25% markup) = dynamic package at retail price. Gross margin per package booking: £50-60 vs £13 on affiliate-only. Source: discovery.md unit economics table.

**Execution:**

*Month 5.5-6: ATOL licence received*
- Timeline: 12 weeks from Month 4 submission = Month 7. Budget for arrival at Month 6-7.
- On licence receipt: update website, booking T&Cs, certificate display (legal requirement)
- All flight+hotel packages must display ATOL certificate and include in booking confirmation
- ATOL bonding: trust account required; customer money held in trust until travel complete
- Jet2 model comparison: flight-only £18 profit/passenger vs package £98 profit/passenger (5.4x). Source: research-5-revenue-models.md. HP targets similar uplift via dynamic packaging.

*Month 6-6.5: Flight+hotel packages live (ATOL-protected)*
- Booking flow: select flight (Duffel) → select hotel (RateHawk) → package price displayed → book as package under ATOL
- Payment: Stripe Payments; customer funds held in trust (ATOL requirement)
- Booking confirmation: dual confirmation email (Duffel itinerary + RateHawk hotel voucher + ATOL certificate)
- Package AOV target: £800-1,200 (city break: 2-3 nights hotel + return flights, 2 adults)

*Month 6-7: Deal confidence scoring*
- Algorithm inputs: (1) price history for flight route (cached from Duffel over 6+ weeks of data); (2) user preference match score (preference graph v1); (3) user budget fit (% of annual budget remaining)
- Score output: "Strong deal / Good deal / Average / Wait" with explanation text
- Display: deal card shows confidence score + one-line reason ("Porto flights are 23% below 8-week average — strong deal for beach + food travellers")
- 🟡 **Gap:** Price history accuracy is limited in Phase 4 (only 6-8 weeks of cached data). Confidence intervals will be wide early. Communicate uncertainty to users. Full price intelligence improves over 6+ months of data accumulation.

*Month 7-7.5: Portfolio view (budget tracking + trip timeline)*
- Portfolio: annual travel budget (set at onboarding); trips booked (confirmed); trips in progress (saved/monitored); trips dreamed (wishlist)
- Budget tracker: "You've spent £1,200 of your £3,500 travel year. Here's what fits in the remaining £2,300"
- Trip timeline: calendar view of booked trips, gaps, and ideal booking windows
- This is the retention mechanic — by Month 7-8, users have 1-2 bookings in their portfolio. Leaving means starting from scratch.

*Month 7.5-8: Deal monitoring + alerts*
- User saves a destination or deal → system monitors Duffel (flight price) + RateHawk (hotel rate) daily
- Alert trigger: price drops >10% from saved price OR falls below user's budget threshold
- Alert channels: email (Month 8), push notification (Month 8, OneSignal)
- Going.com model validation: 2M subscribers at $49/yr on deal alerts alone. HP combines alerts with booking capability. Source: discovery.md, research-5-revenue-models.md

**Success metrics (Phase 4):**
- ATOL licence: received and active by Month 7
- Package bookings: ≥10 ATOL-protected packages sold by Month 8
- Package GMV: >£10,000 cumulative by Month 8
- Gross package margin: ≥15% on package revenue (vs 4% affiliate-only)
- Deal alert open rate: >60% on deal price-drop alerts
- Portfolio view DAU: >40% of active users open portfolio at least once per week

**Dependencies:**
- [[ATOL Small Business]] — receipt is calendar dependency (12-week CAA processing). No engineering dependency but hard external timeline.
- [[Stripe Payments]] — trust account mechanics require Stripe review; initiate early.
- [[Price history data]] — starts accumulating from Duffel API caching in Phase 2. Confidence scoring quality is directly correlated with cache depth.

---

### Month 8-12: Personalisation Engine

**Goal:** Semantic preference graph from conversational data. Visible preference profile. Recommendation feed v2 (embeddings-based). Subscription tier launch at £59.99/yr.

**Owner:** Founder (strategy + subscription launch) + Engineer (personalisation infrastructure)

**The moat:** Every competitor does search + filters. Nobody builds a visible, structured preference profile from conversation that improves per trip. Expedia Romie, Mindtrip, Booking.com — all opaque ML. HP shows users their preference graph and lets them edit it. This is both the differentiation and the lock-in. Source: discovery.md Competitive Landscape table.

**Execution:**

*Month 8.5-9.5: Semantic preference graph (vector embeddings)*
- Upgrade from explicit preferences + cosine similarity (Phase 3) to full semantic embeddings
- Input sources: (1) NLP conversation logs (user queries, deal saves, searches); (2) booking history; (3) explicit profile edits; (4) deal alert engagement (what price drops did they act on?)
- Embedding model: OpenAI text-embedding-3-small (1,536 dimensions). Cost: ~£0.006/user/month at 1K users. Source: research-4-tech-feasibility.md
- Storage: Supabase pgvector at this scale (upgrade to Qdrant Cloud at 10K+ vectors if performance degrades)
- SPiKE paper (2025) describes this exact architecture: conversational preference capture + vector retrieval + real-time ranking. Source: research-4-tech-feasibility.md
- Cold start (persists): new users get archetype priors until 3+ conversations + 1 booking. Fast onboarding conversation (5 questions) + taste calibration swipe (swipe on 10 destination images) compresses cold start.

*Month 9.5-10.5: Visible preference profile*
- UI component: "Your travel style" card on user dashboard
- Displays: top 5 destination attributes (e.g., "warm climate," "boutique hotels," "food-forward cities"), travel pace preference, budget tier, typical party size
- Editable: user can add/remove/weight attributes. Edits update the preference vector in real time.
- Trust mechanic: shows *why* a deal was recommended ("Recommended because: warm climate, strong food scene, within your usual budget, 35% below your saved price for Athens")
- This is the visible preference profile USP. No competitor shows this. Source: discovery.md USP 4.

*Month 10.5-11.5: Recommendation feed v2*
- Phase 3 feed: cosine similarity on explicit preferences → ranked list
- Phase 5 feed: semantic embeddings from conversations + booking history + alert engagement → re-ranked
- Recommendation architecture: two-stage. Stage 1: candidate generation (cosine similarity, ~100ms). Stage 2: re-ranking (embedding similarity + recency weighting + budget fit). End-to-end: <350ms recommendation latency. Source: research-4-tech-feasibility.md (Expedia two-tower architecture reference)
- Metric target: recommendation CTR >15% (vs typical <5% for non-personalised feeds)
- A/B test: preference graph v1 (Phase 3) vs v2 (Phase 5) on same user cohort. Measure CTR and booking conversion delta.

*Month 12: Subscription tier launch (£59.99/yr)*
- Tier name: "Portfolio Pro" (or test name based on interview data)
- Included: visible preference profile, deal alerts (unlimited), price history charts, early access to new deals, portfolio export (PDF/CSV)
- Free tier retains: NLP search, deal feed, basic portfolio view, 3 deal alerts/month
- Paywall logic: >3 deal alerts/month requires Pro; preference profile editing requires Pro; price history chart requires Pro
- Pricing rationale: £59.99/yr = £5/month. Going.com is $49/yr (£39/yr) without booking. HP adds booking capability and UK-native ATOL → premium justified. Source: research-5-revenue-models.md
- Launch: email to waitlist (collected from Phase 1 landing page captures + Phase 4 deal alert subscribers); in-app prompt; Lifetime offer at £99 for first 100 subscribers
- Target: 48+ subscribers at launch month (48.7% trial-to-paid conversion cited in discovery.md — context unclear; see Gap note below)

> 🟡 **Gap:** "48.7% trial-to-paid conversion" in discovery.md is not sourced to a specific comparable. This appears to be a general SaaS benchmark, not travel subscription specific. Going.com's trial-to-paid rate is not public. Treat as aspirational, not forecast. Conservative case: 15-20% of active users subscribe in Month 12.

**Success metrics (Phase 5):**
- Semantic graph: preference vectors stored for 100% of active users with ≥3 conversations
- Recommendation CTR: >15% (up from baseline <5%)
- Subscription: ≥100 paying subscribers at £59.99/yr by Month 12 (conservative)
- Subscription MRR contribution: ≥£500/month by Month 12
- User retention: ≥60% of Month 8 active users still active at Month 12

**Dependencies:**
- [[OpenAI embeddings]] API — text-embedding-3-small. Stable API; no integration risk. Cost scales linearly with user base.
- [[Conversation logs]] — embedding quality depends on conversation volume accumulated since Phase 2. Cold start risk if user growth is slow. Mitigation: taste calibration swipe in onboarding.
- [[Stripe Billing]] — subscription management; annual billing with prorated upgrades. No additional integration required beyond Phase 2 Stripe Payments.

---

### Month 12-18: Scale

**Goal:** Collaborative filtering at 5K+ users. Hotelbeds integration for inventory depth. Content marketing engine. B2B API exploration. Close Phase 1 with seed-fundable metrics or ramen profitability.

**Owner:** Founder + Engineer + Part-time Growth Hire

**Context:** Month 12 represents the end of the core personalisation build. Phase 6 is conditional on Phase 5 GO metrics. If subscription launch underperforms or repeat booking rate is weak, Phase 6 budget is reallocated to iteration, not scale. The scale budget (£20,000) assumes Phase 5 metrics are strong enough to justify expansion.

**Execution:**

*Month 12-14: Collaborative filtering*
- Prerequisite: 5K+ users with booking history. Source: research-4-tech-feasibility.md (Phase 2 recommendation engine)
- Algorithm: user-based collaborative filtering. "Users with similar preference vectors to yours also loved [destination]"
- Implementation: Scikit-learn (Python) or TensorFlow Recommenders for initial model; weekly retraining batch job
- Data required: user-user similarity matrix computed from preference vectors; minimum 5K users for meaningful signals
- 🟡 **Gap:** 5K users by Month 14 requires consistent growth from Month 1. Conservative case: 500 users at Month 12, 2K at Month 18 — collaborative filtering would be premature at this scale. Phase 6 collaborative filtering is aspirational; cosine similarity (Phase 3) remains primary if user base is below 3K.

*Month 14-16: Hotelbeds integration*
- Why Hotelbeds: 300,000+ properties vs RateHawk's 2.5M. Hotelbeds has deeper European resort inventory and established relationships with 71,000+ travel distributors. Source: research-6-bed-banks.md
- Access: requires commercial negotiation and booking history. By Month 14, HP should have 6-9 months of RateHawk booking data to present.
- Approach: contact Hotelbeds HBX Group commercial team with booking volume data from RateHawk period
- Alternative: [[TravelgateX]] aggregator (single GraphQL API → 100+ suppliers including Hotelbeds). Faster integration; slightly higher per-booking cost. Use TravelgateX if direct Hotelbeds access is delayed past Month 16.
- Integration: parallel with RateHawk. Display best available rate across both suppliers; route booking to lowest net cost.

*Month 15-17: Content marketing engine*
- Strategy: SEO-driven deal content. Target: UK travellers searching "[destination] deals," "best time to book [destination]," "city breaks [month]"
- 10-15 articles in Months 15-17. Target: 3K+ monthly organic visitors by Month 18
- Structure: each article links to relevant HP deal feed (NLP search pre-filled). Converts organic traffic to deal feed engagement.
- Distribution: The Points Guy UK (pitch as editorial); The Travel Hack; Which? Travel; MoneySavingExpert Travel forum
- Cost: £200-300/article (freelance travel writer) or founder-written (£0 cost, high time cost)

*Month 16-18: B2B API exploration*
- Hopper HTS model: Hopper's B2B arm (Hopper Technology Solutions) generates 75% of Hopper's revenue by licensing fintech products (Price Freeze, CFAR) and recommendation APIs to airlines and OTAs. Source: discovery.md, research-5-revenue-models.md
- HP Phase 6 exploration: can the preference engine be licensed to UK travel agents, TMCs, or hotel groups?
- Scope: draft API spec for preference matching endpoint; identify 3 prospect conversations
- This is scoping only — no build commitment in Phase 1. Build decision in Phase 2 (Month 18+).

**Success metrics (Phase 6):**
- Users: 2,000+ registered; 800+ with ≥1 booking; 500+ with ≥2 bookings
- Monthly package GMV: >£50,000/month by Month 18
- Monthly net revenue: >£7,500/month by Month 18 (15% take rate on £50K GMV)
- Subscription: >300 paying subscribers (£59.99/yr = £18,000 ARR from subscriptions)
- CAC: <£45 per activated user (user with ≥1 booking)
- Organic traffic: >3,000 monthly visitors from content by Month 18
- B2B: ≥1 prospect conversation completed; API spec drafted

---

## Success Metrics by Phase

| Phase | Metric | Target | Source/Benchmark |
|---|---|---|---|
| 1: Validation | Email capture rate | >8% on winning variant | Industry: 2-5% for travel. Source: research-4-tech-feasibility.md |
| 1: Validation | Concierge booking conversion | >50% of users book through platform | Gate 3 from strategy/12-decision-tree.md |
| 1: Validation | Leakage rate | <30% booking independently elsewhere | Gate 3 kill threshold |
| 1: Validation | Interview portfolio pain confirmation | 6+ of 10 interviewees | Gate 2 from strategy/12-decision-tree.md |
| 2: Tech Foundation | NLP extraction accuracy | >85% on 50 test queries | Research-4 benchmark |
| 2: Tech Foundation | First affiliate booking | ≥1 real booking | Binary milestone |
| 2: Tech Foundation | Page load (mobile) | <3 seconds | Core Web Vitals |
| 3: Bed Bank | Hotel gross margin | >15% per booking | RateHawk net rate model; research-6-bed-banks.md |
| 3: Bed Bank | RateHawk live bookings | ≥5 in Phase 3 | Proof of commercial model |
| 3: Bed Bank | ATOL submission | Submitted by Month 4 | Hard calendar dependency |
| 4: Dynamic Packages | Package GMV | >£10,000 cumulative by Month 8 | Internal target |
| 4: Dynamic Packages | Gross package margin | ≥15% | vs LoveHolidays 9.9% take rate as ceiling |
| 4: Dynamic Packages | Deal alert open rate | >60% | Going.com benchmark: 80%+ for personalised alerts |
| 4: Dynamic Packages | Portfolio view DAU | >40% weekly active | Retention mechanic signal |
| 5: Personalisation | Recommendation CTR | >15% | vs <5% non-personalised baseline |
| 5: Personalisation | Subscription subscribers | ≥100 by Month 12 | Conservative; 48.7% trial-to-paid unvalidated |
| 5: Personalisation | Month 8→12 retention | ≥60% users still active | Platform stickiness |
| 5: Personalisation | Subscription MRR | ≥£500/month | 100 subscribers × £5/month |
| 6: Scale | Registered users | 2,000+ | Conservative growth trajectory |
| 6: Scale | Monthly package GMV | >£50,000/month | ~833 package AOV × 60 bookings/month |
| 6: Scale | Monthly net revenue | >£7,500/month | 15% take rate on GMV |
| 6: Scale | CAC (paid acquisition) | <£45/activated user | Gate 5 from strategy/12-decision-tree.md |
| 6: Scale | Paying subscribers | >300 | £18,000 ARR from subscriptions alone |

**Breakeven analysis:**
- Breakeven at small team scale: ~800-1,200 users at 3 bookings/year with bed bank model. Source: discovery.md
- vs affiliate-only: breakeven requires 2,500+ users. Bed bank halves the user count required.
- Phase 1 end (Month 18): 800-2,000 users (conservative-base). Breakeven is a Phase 2 target.
- Seed round target: £300-500K. Funds path from 200 users (Year 1) to 700+ users (breakeven). Source: strategy/12-decision-tree.md decision matrix.

---

## Team Requirements

### Phase-by-Phase Hiring Plan

| Phase | Months | Role | Type | Rate | Rationale |
|---|---|---|---|---|---|
| 1: Validation | M0-1 | Founder/PM only | — | £0 | Solo execution; no hired help needed |
| 2: Tech Foundation | M1-3 | Full-stack engineer | Contract | £400/day, 3 days/week | Duffel + NLP + deal feed UI |
| 2: Tech Foundation | M1.5-3 | Product designer | Contract | £300/day, 2 days/week | Deal feed UX; onboarding flow |
| 3: Bed Bank | M3-5 | Engineer (continuation) | Contract | £400/day, 3 days/week | RateHawk integration + preference graph |
| 3: Bed Bank | M4 | Travel compliance consultant | One-time | £2,500 flat | ATOL application + T&Cs |
| 4: Dynamic Packages | M5-8 | Engineer (continuation) | Contract | £400/day, 3 days/week | Package assembly, deal scoring, portfolio UI |
| 5: Personalisation | M8-12 | Engineer (continuation or FT hire) | FT preferred | £50,000-60,000/yr | Semantic graph is complex; continuity valuable |
| 5: Personalisation | M11-12 | Growth/marketing (part-time) | Contract | £2,500/month | Subscription launch prep; acquisition testing |
| 6: Scale | M12-18 | Engineer (FT, continuation) | FT | £50,000-60,000/yr | Collaborative filtering, Hotelbeds |
| 6: Scale | M12-18 | Growth/marketing (FT or pt) | FT preferred | £35,000-45,000/yr | Content engine, CAC reduction |
| 6: Scale | M12-18 | Customer support | Part-time | £1,200/month | 800+ users; booking queries; alert failures |

> 🟡 **Gap:** Day rates are based on UK 2025 market (YunoJuno, Toptal benchmarks). Senior engineers in London command £500-600+/day. Remote engineers in non-London UK/EU: £300-400/day. FT salary for engineer at Month 8-12 depends on whether co-founder equity split applies. If technical co-founder recruited before Month 3, Phase 2-4 engineering contract budget (~£30,000) is partially replaced by co-founder equity share.

**Co-founder note:** A technical co-founder (CTO) would be the highest-leverage hire before Month 1. Reduces cash burn by ~£25-30K, increases build speed, and strengthens seed round story. Priority: find technical co-founder before committing to Phase 2 build.

**Headcount by phase:**

| Phase | Months | Headcount |
|---|---|---|
| Validation | M0-1 | 1 (founder) |
| Technical Foundation | M1-3 | 3 (founder + engineer + designer) |
| Bed Bank Integration | M3-5 | 2-3 (founder + engineer + compliance) |
| Dynamic Packages | M5-8 | 2 (founder + engineer) |
| Personalisation Engine | M8-12 | 3 (founder + FT engineer + pt growth) |
| Scale | M12-18 | 4-5 (founder + FT engineer + FT growth + pt support + compliance) |

---

## Key Dependencies

### Critical Path Dependencies (ordered by risk)

| # | Dependency | Phase | Risk Level | Mitigation | Owner |
|---|---|---|---|---|---|
| 1 | ATOL licence (12-week CAA processing) | M4 submit → M6-7 receive | HIGH | Apply Month 4; use ABTOT interim if delayed. Do NOT sell packages without ATOL. | Founder |
| 2 | Duffel API commercial terms | M1-2 | HIGH | PM has Duffel contact — engage early. Amadeus as backup (IATA accreditation needed — 4-8wk delay). | Founder |
| 3 | RateHawk live API access | M3 | MEDIUM | Sandbox established Month 1. Live access: provide business docs. No minimum volume. | Engineer |
| 4 | Planning-to-booking leakage | M1 (Gate 3) | HIGH | Concierge MVP tests this. Kill at Gate 3 if conversion <30%. Do not build without this confirmation. | Founder |
| 5 | Engineer quality and continuity | M1-18 | HIGH | Use YunoJuno or Toptal. Trial with paid test task. Build relationship; offer rate increase for continuity. | Founder |
| 6 | User growth for collaborative filtering | M12-14 | MEDIUM | 5K users required. Conservative case: 500 at Month 12. May need to defer Phase 6 feature. | Growth |
| 7 | Hotelbeds commercial access | M14-16 | MEDIUM | Requires booking history. TravelgateX as fallback (covers Hotelbeds via aggregator). | Founder |
| 8 | Price history data depth | M6-7 | MEDIUM | Starts accumulating Month 1 (Duffel cache). 6+ months needed for confident scoring. | Engineer |
| 9 | Stripe trust account setup | M5-6 | MEDIUM | Initiate at Month 4 alongside ATOL application. Stripe review can take 2-4 weeks. | Founder |
| 10 | Subscription WTP validation | M11-12 | MEDIUM | Pre-order test at Month 10. Don't launch £59.99 subscription without price sensitivity data. | Founder |

### External Regulatory Dependencies

| Dependency | Requirement | Timeline | Owner |
|---|---|---|---|
| Companies House registration | Ltd company before ATOL application | Month 2 | Founder |
| CAA ATOL Small Business | Required for flight+hotel packages | Apply M4; licence M6-7 | Founder + Consultant |
| Booking.com Affiliate programme | Review and approval | 1-2 weeks from application | Founder |
| RateHawk commercial agreement | Standard T&Cs; no negotiation required | 1-2 weeks | Founder |
| Duffel commercial terms | Negotiation required; PM has contact | 4-8 weeks from first contact | Founder |
| FCA authorisation (fintech) | Required for Price Freeze, CFAR | NOT in Phase 1 — Year 2+ | — |

> 🔴 **Contradiction:** discovery.md mentions "Price Lock" as a Phase 1b feature (Week 24 in the original plan). However, Price Lock / Price Freeze is a financial product that may require FCA authorisation in the UK ("Travel fintech requires FCA authorisation — 6-18 months. Not an MVP feature." Source: discovery.md Bear case reality check). These two statements conflict directly. **Resolution:** Do not build Price Lock in Phase 1. Remove from roadmap. Include in Phase 2+ strategy only if FCA advice confirms it can be structured outside FCA scope (e.g., as a non-financial booking option rather than a financial product).

---

## Risk Register

### High Priority Risks

| Risk ID | Risk | Probability | Impact | Phase | Mitigation | Trigger | Owner |
|---|---|---|---|---|---|---|---|
| R1 | Planning-to-booking leakage (users plan on HP, book on Booking.com) | HIGH | FATAL | M1 | Gate 3 concierge MVP tests this. Kill if conversion <30%. | Booking leakage rate >50% at Gate 3 | Founder |
| R2 | Duffel API terms commercially unworkable | MEDIUM | SEVERE | M2 | PM has Duffel contact; Amadeus as backup; meta-search fallback | Duffel per-booking fee >£8 on economy | Founder |
| R3 | ATOL licence delay (>16 weeks) | MEDIUM | MODERATE | M6-7 | ABTOT franchise (~£942) as interim. Cannot sell packages without ATOL protection. | CAA delays acknowledgement >4 weeks | Founder |
| R4 | CAC exceeds £45 (paid acquisition not viable) | MEDIUM | SEVERE | M6+ | Organic channels first. January spike as low-CAC acquisition moment. Referral loop. | CAC >£90 in Gate 5 | Growth |
| R5 | Cold start: preference graph unusable with <100 user interactions | HIGH | MODERATE | M3-5 | Archetype priors + taste calibration swipe. Explicit prefs bridge until conversational data accumulates. | Recommendation CTR <5% at Phase 3 end | Engineer |
| R6 | Rate parity restrictions limit RateHawk margin | MEDIUM | MODERATE | M3 | Add value through personalisation, not price undercutting. Verify RateHawk T&Cs pre-integration. | RateHawk T&Cs prevent markup display | Founder |
| R7 | Mindtrip UK expansion (primary competitor) | MEDIUM | HIGH | M6+ | Monitor Mindtrip job postings and press for UK signals. Accelerate UK-native ATOL and portfolio moat. | Mindtrip announces UK launch | Founder |
| R8 | Hotelbeds minimum volume requirement | MEDIUM | LOW | M14-16 | TravelgateX fallback (aggregator covers Hotelbeds). RateHawk sufficient for Phase 1-5. | Hotelbeds requires >£500K annual GTV | Founder |

### Medium Priority Risks

| Risk ID | Risk | Probability | Impact | Phase | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R9 | Subscription WTP below £59.99/yr | MEDIUM | MODERATE | M12 | Pre-order test at Month 10; A/B test price points (£39, £59, £99) | Founder |
| R10 | January concentration: missed January booking spike | MEDIUM | HIGH | M12 | Platform must be fully operational by November. January campaign prep from Month 16 (Year 1 plan: Month 12+) | Growth |
| R11 | Engineer turnover mid-build | MEDIUM | HIGH | M1-12 | Continuity premium; documentation standards; pair programming from Month 3 | Founder |
| R12 | ETL complexity underestimated (data pipelines = 80% of build) | HIGH | MODERATE | M2-5 | "Build simple first" rule. ETL before ML. No ML without clean data pipelines. Source: research-4-tech-feasibility.md | Engineer |
| R13 | Booking.com affiliate commission reduced | LOW | LOW | M2-3 | Transitional dependency only. RateHawk replaces affiliate in Phase 3. | Engineer |
| R14 | UK travel market slowdown (macro risk) | LOW | HIGH | M6+ | City breaks (£300-500) are recession-resilient. Focus on value/deal positioning. | Founder |

### Risk Watchlist (Monitor Only)

| Risk ID | Risk | Phase | Watch Signal |
|---|---|---|---|
| R15 | FCA scope creep on deal confidence scoring | M6-7 | Legal advice if "deal confidence" is construed as financial advice |
| R16 | Expedia Romie launches visible preference profile | M8+ | Expedia product announcements; patent filings |
| R17 | LLM API pricing increase (Anthropic Haiku) | M2+ | Anthropic pricing announcements; hedge with caching |
| R18 | Supabase pgvector performance at 10K+ users | M8-12 | Query latency >200ms; migrate to Qdrant Cloud |

---

## Revenue Model Evolution

### Revenue Stream Timeline

| Revenue Stream | Live | Monthly Revenue (Est.) | Source |
|---|---|---|---|
| Affiliate commissions (Booking.com) | Month 2 | £0-200 (proves flow; poor margin) | 4-8% commission; research-5-revenue-models.md |
| RateHawk net rate hotel margin | Month 3.5 | £200-800 | 20-25% markup on net rate |
| Ancillary affiliate (insurance, car hire) | Month 2+ | £50-200 | Insurance 15-20%, car 8-12%; discovery.md |
| Dynamic packages (ATOL-protected) | Month 6 | £1,000-5,000 | £50-60/package; research-6-bed-banks.md |
| Deal monitoring (retention, not revenue yet) | Month 8 | — | Retention mechanic |
| Subscription (£59.99/yr) | Month 12 | £500-1,500+ | 100-300 subscribers |
| B2B API (scoping only) | Month 18 | — | Phase 2 target |

### Unit Economics at Scale

| Metric | Affiliate-Only | Bed Bank + Packages | Source |
|---|---|---|---|
| Hotel revenue (2 nights, £160 net) | £8 (4% of £200) | £40 (25% markup on £160) | discovery.md unit economics table |
| Package revenue (Duffel + RateHawk) | £13 total | £50-60 total | discovery.md unit economics table |
| Breakeven user count | 2,500+ | 800-1,200 | discovery.md |
| Revenue per user per year (3 bookings) | ~£39 | ~£150-180 | discovery.md |
| LoveHolidays comparable take rate | — | 9.9% on GTV | research-5-revenue-models.md |

> 🔴 **Contradiction:** The two discovery.md revenue scenarios show "£45" for bed bank (25% markup, 2 nights, £160 net + £5 Duffel) but the "£50-60" figure for dynamic packages includes a 15-20% markup on the full package (flight + hotel combined). These are different calculations: (1) hotel-only bed bank margin; (2) full package markup. Both are correct but represent different scenarios. Use £50-60 as the dynamic package target; use £40-45 as the hotel-only bed bank target.

---

## Wiki Links

- [[discovery.md]] — Full product concept, revenue phasing, tech stack, confidence scores
- [[research-4-tech-feasibility.md]] — NLP parser specs, vector DB choices, recommendation architecture, cost modelling
- [[research-5-revenue-models.md]] — LoveHolidays, OTB, Jet2, Hopper, Going.com benchmarks; unit economics
- [[research-6-bed-banks.md]] — RateHawk, Hotelbeds, TravelgateX; ATOL compliance; net rate margin reality
- [[strategy/12-decision-tree.md]] — 5 phase gates; kill criteria; cumulative spend thresholds
- [[strategy/00-gap-analysis.md]] — Synthesis of all 13 framework artefacts
- [[Duffel API]] — Flight booking API; PM contact; $3/order + 1%; modern REST
- [[RateHawk API]] — Bed bank; free API; self-service; 2.5M+ properties; no minimum volume
- [[ATOL Small Business]] — CAA; ~12-week timeline; ~£2,700 fee; required for dynamic packages
- [[TravelgateX]] — Aggregator fallback; single GraphQL API → 100+ suppliers
- [[Hotelbeds]] — Scale bed bank; 300K+ properties; requires booking history for access
- [[pgvector]] — Supabase extension; cosine similarity; Phase 3 preference graph
- [[OpenAI embeddings]] — text-embedding-3-small; 1,536 dimensions; ~£0.006/user/month
- [[Mindtrip]] — Primary AI travel competitor; $22.5M funded; TUI partnership; no UK presence

---

*Phase 1 Execution Roadmap — last updated: February 2026. Review at each phase gate and monthly from Month 6 onward.*
*Owner: Founder. Next review: Month 1 gate decision.*

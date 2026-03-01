# Technical Feasibility: Can a curated holiday portfolio platform generate enough booking volume and repeat usage to be a viable business?
Date: 2026-02-28

## Thesis

The core engineering required to build this platform — multi-provider package assembly, deal scoring, price monitoring, portfolio optimisation — is genuinely buildable using existing travel APIs and modern cloud infrastructure. LoveHolidays has demonstrated at scale that a modern microservices platform running on GKE can serve billions of real-time flight and hotel combinations on legacy GDS rails. The critical risk is not whether the platform is buildable, but whether the key dependency — Amadeus self-service API — survives long enough to build on. Amadeus announced it is decommissioning its self-service portal on July 17, 2026, forcing new entrants to negotiate enterprise access: a process requiring IATA accreditation, 2–6 months of certification, and custom commercial terms. That regulatory and commercial barrier compresses the viable build window and increases pre-revenue capital requirements substantially. If that hurdle is cleared, the technical stack is tractable; if it cannot be cleared quickly, the whole project stalls before a single booking is made.

## Evidence

### Evidence Point 1: Amadeus Self-Service API Decommission Creates Hard Deadline
- **Claim:** Amadeus is shutting down its free self-service developer portal on July 17, 2026. New registrations are already paused. Enterprise API access requires IATA/ARC certification, an NDA, commercial negotiations, and a certification process typically lasting 2–6 months. This eliminates the "start building cheaply on the free tier" path that most travel startups have relied on.
- **Source:** [PhocusWire — Amadeus to shut down self-service APIs portal for developers](https://www.phocuswire.com/amadeus-shut-down-self-service-apis-portal-developers); [Amadeus Enterprise API access overview](https://developers.amadeus.com/enterprise)
- **Confidence:** 5 — confirmed by Amadeus directly and widely reported

### Evidence Point 2: Enterprise API Access is Achievable But Expensive and Slow
- **Claim:** Amadeus Enterprise APIs are accessed through a formal sales process. Costs are custom-negotiated, typically $0.50–$1.50 per booking segment. Full integration and certification adds $15,000–$25,000+ in setup costs and 2–6 months of engineering effort before a single production booking. Alternative aggregators (Travelport, Sabre, or whitelabel solutions like Zentrumhub) exist but add a layer between the platform and live inventory, increasing latency and reducing margin.
- **Source:** [AltexSoft — Amadeus API Integration Guide](https://www.altexsoft.com/blog/amadeus-api-integration/); [TravelTekPro — Amadeus API Pricing](https://traveltekpro.com/a-comprehensive-guide-for-amadeus-api-pricing-and-cost/)
- **Confidence:** 4 — pricing ranges are publicly documented; exact negotiated terms vary

### Evidence Point 3: LoveHolidays Proves the Technical Model Works at Scale
- **Claim:** LoveHolidays operates 5,000 production pods on GKE across Java, Go, Rust, and Python, serving billions of real-time flight and hotel combinations from the same legacy GDS APIs this platform would use. They achieved 70% infrastructure cost reduction by moving to modern cloud-native architecture on Google Cloud. Their deployment cadence (145,000+ deploys, 300 per day) shows that travel platforms on legacy API rails can be operated with modern engineering discipline. This proves the architecture is achievable — but their current scale required years of investment and a team of hundreds.
- **Source:** [Google Cloud — loveholidays case study](https://cloud.google.com/customers/loveholidays); [CNCF — loveholidays used Linkerd](https://www.cncf.io/case-studies/loveholidays/)
- **Confidence:** 5 — first-party published case studies

### Evidence Point 4: Multi-Provider Package Assembly Carries Significant Compliance Engineering Overhead
- **Claim:** Assembling a package from independent flight and hotel providers in the UK triggers ATOL (Air Travel Organiser's Licence) obligations under the Package Travel Regulations. A "Flight-Plus" product requires a separate ATOL licence, annual CAA bonding, ongoing financial reporting, and customer data submission. This is not optional engineering overhead — it is a legal requirement. For a startup, ATOL setup is time-consuming and costly, with bonding requirements that can be capital-intensive before any bookings are generated.
- **Source:** [TravelGenix — Pros and Cons of Dynamic Packaging and ATOL](https://www.travelgenix.io/the-pros-and-cons-of-dynamic-packaging-and-atol-for-travel-agents); [CAA — What is ATOL?](https://www.caa.co.uk/newsroom/blogs/what-is-atol/)
- **Confidence:** 5 — regulatory requirement, not in dispute

### Evidence Point 5: Deal Scoring and Price Monitoring Are Solvable Engineering Problems, Not Research Projects
- **Claim:** The deal scoring algorithm and real-time price monitoring components can be built with well-understood techniques: time-series forecasting (ARIMA, LSTM), regression models for fare class prediction, and ML-based anomaly detection for deal identification. Booking.com and Skyscanner have demonstrated these at scale. The hard part is data acquisition: flight prices change every few seconds, anti-bot defences block scraping, and GDS rate limits constrain real-time search volume. A practical MVP deal scorer would use cached price distributions with periodic refresh rather than true real-time comparison — reducing confidence in "deal" claims but dramatically reducing infrastructure cost and API spend.
- **Source:** [AltexSoft — AI Revenue Management and Dynamic Pricing](https://www.altexsoft.com/blog/ai-revenue-management-dynamic-pricing/); [iWebDataScraping — Real-Time Airfare Data Extraction](https://www.iwebdatascraping.com/extract-real-time-airfare-data-price-volatility-travel-strategies.php)
- **Confidence:** 4 — approaches are proven; implementation difficulty at startup scale is medium-high

### Evidence Point 6: Portfolio Optimisation Is Novel Engineering That Requires Cold-Start Data
- **Claim:** The "portfolio" concept — optimising a set of future holidays across a user's year based on budget, dates, and destination preferences — has no direct precedent in production travel platforms. Booking.com and similar platforms optimise for single-trip conversion, not multi-trip planning. Implementing this requires: a user preference model, a multi-objective optimisation engine (budget vs. timing vs. destination diversity), and enough historical booking and pricing data to calibrate recommendations. At launch, none of this data exists. Cold-start problem means the first cohort of users will receive weaker recommendations, reducing the core value proposition precisely when retention matters most.
- **Source:** [Tandfonline — Recommender Systems in Tourism Literature Review](https://www.tandfonline.com/doi/full/10.1080/23311975.2024.2367088); [LinkedIn — Designing a Travel Recommendation Engine](https://www.linkedin.com/pulse/how-would-you-design-recommendation-engine-travel-experiences-m-r-tlfqc)
- **Confidence:** 4 — cold-start problem is a known ML challenge; specific travel portfolio optimisation has no published precedent

## Risks to This Position

1. **The Amadeus timeline may be unworkable.** The self-service shutdown on July 17, 2026 and the 2–6 month enterprise certification timeline mean a new entrant starting today would need to begin enterprise negotiations immediately. If negotiations stall, delay, or result in commercially unacceptable terms, the entire data foundation of the platform is removed. There are alternative GDS aggregators (Sabre, Travelport, whitelabel middleware providers), but each introduces its own negotiation delay and adds margin compression that directly undermines the commission-based business model.

2. **The compliance stack may exceed the engineering budget.** ATOL bonding, PCI DSS for payments, GDPR data handling, and Package Travel Regulations together represent a non-trivial engineering and legal cost before the first booking. TravelGenix reports that ongoing ATOL maintenance is "time-consuming and costly." A lean MVP cannot legally skip these requirements if it sells packaged flight-plus-accommodation products in the UK market. This could add £20,000–£50,000+ in pre-revenue compliance costs.

3. **"Curated" at scale requires data that does not exist at launch.** The platform's differentiation is curation quality — the portfolio recommendation and deal scoring algorithms. These depend on training data (user preferences, historical prices, booking patterns) that will not exist until the platform has been operating for months with real users. The MVP version of curation will likely be rule-based heuristics rather than genuine ML, which reduces the defensibility of the technical moat and the quality of the user experience at exactly the moment first impressions are being formed.

## Overall Confidence
**3** — The platform is technically buildable using well-understood patterns proven by LoveHolidays and others, but the Amadeus self-service API shutdown and UK package travel compliance requirements create two near-term blockers that could each individually delay or kill a lean startup before it reaches revenue.

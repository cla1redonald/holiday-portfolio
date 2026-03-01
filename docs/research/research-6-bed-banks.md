# Research: Bed Banks, Hotel Wholesalers, and Dynamic Packaging
## For Holiday Portfolio — UK Travel Startup

**Research Date:** February 2026
**Purpose:** Assess how Holiday Portfolio can access hotel inventory at wholesale/net rates to build dynamic packages (Duffel flight + wholesale hotel + markup)

---

## Executive Summary

The bed bank channel is viable for a UK startup and could be the defining commercial advantage of Holiday Portfolio. The key finding: **RateHawk is the right starting point** — it has no minimum volume, free API access, self-service signup, and is specifically designed for small travel agents and operators. Hotelbeds and WebBeds are the scale plays once you have booking history. TravelgateX offers a clever aggregator approach that gives access to 100+ suppliers through a single API integration.

The margin reality is promising but not guaranteed: bed bank rates are typically 20–30% below retail, but rate parity rules mean you need to add your own value (personalisation, curation, UX) rather than simply undercutting OTAs on price. The ATOL requirement for selling dynamic packages in the UK is a real compliance hurdle but is manageable — Small Business ATOL costs approximately £2,700 all-in and takes ~12 weeks to obtain.

---

## Part 1: Bed Banks and Hotel Wholesalers

### 1.1 Hotelbeds

**What it is:** The world's largest B2B hotel wholesaler. Spain-based, part of HBX Group. The industry reference point.

**Scale:**
- 300,000+ directly contracted hotels across 185+ countries
- Processes 80,000+ bookings and 14 million searches daily
- Serves 71,000+ travel distributors worldwide
- Covers hotels, activities (18,000+), and transfers (24,000+)

**Net Rate Model:**
Hotelbeds operates a pure wholesale/net rate model. You receive the hotel room at a net price (i.e., no commission baked in — the rate is "clean"), then you apply your own markup before presenting the price to the customer. Their documentation states: "If the hotelMandatory value is true, you must respect the sellingRate attribute value; otherwise you can add your own markup."

The "sellingRate" constraint is important: some hotels with rate parity obligations require you to sell at or above a minimum price. You cannot arbitrarily undercut the market on those properties.

**API Quality:**
- REST API with JSON (preferred) and XML support
- SHA-256 authentication (API key + secret + timestamp)
- API Suite called "APItude" — covers hotels, activities, and transfers separately, each with its own key set
- Sandbox available for immediate free testing at `https://api.test.hotelbeds.com`
- Sandbox is limited to 50 requests/day in evaluation tier — need to progress through profile to get certification quota
- Well-documented with Swagger specs and Postman collections
- Response times claimed under 1 second

**Access Process:**
1. Register on developer portal — free, gets you sandbox credentials immediately
2. Build integration against test environment
3. Complete "certification process" (technical review by Hotelbeds API team)
4. Sign commercial agreement with Hotelbeds sales team
5. Receive production credentials and go live

The commercial agreement (step 4) is the gating step. Hotelbeds does NOT publish their commercial terms or minimum volumes publicly. The cert process documentation says: "A commercial agreement with Hotelbeds is needed in order to complete the certification process and obtain LIVE credentials."

**Minimum Volume / Startup Accessibility:**
Not publicly disclosed. Multiple sources confirm you need to negotiate directly with a Hotelbeds sales manager. For a zero-booking startup, getting favorable terms will be difficult — Hotelbeds is oriented toward established operators with proven volume. The "evaluation plan" gives you a generic API key with no pricing, which means you can test but not price real inventory.

**Bedsonline Variant:**
Hotelbeds operates Bedsonline as its retail-facing travel agent brand (formerly absorbed GTA, TravelCube, Travel Bound). Bedsonline is the same inventory but targeted at retail travel agents rather than OTA/tech buyers. The underlying API infrastructure is the same.

**UK Considerations:**
Hotelbeds' UK team is active in the market. For a UK startup, they would likely require ATOL (for package sales) or at minimum proof of company registration and insurance. No specific IATA requirement mentioned — IATA accreditation matters mainly for airline ticketing, not hotel bookings.

**Sources:**
- [Hotelbeds Developer Portal](https://developer.hotelbeds.com/)
- [Hotelbeds API Getting Started](https://developer.hotelbeds.com/documentation/getting-started/)
- [Hotelbeds Pricing Models](https://developer.hotelbeds.com/documentation/hotels/knowledge-base/pricing-models/)
- [AltexSoft: Hotelbeds API Integration](https://www.altexsoft.com/blog/hotelbeds-api-integration/)
- [AltexSoft: Bed Banks Comparison](https://www.altexsoft.com/blog/bed-banks-hotelbeds-travco-bonotel-hotelspro/)

---

### 1.2 WebBeds (Webjet / Destinations of the World)

**What it is:** Second-largest bed bank globally. Launched in 2013, part of Webjet Limited. Absorbed JacTravel (strong European inventory, especially UK and Mediterranean) and Destinations of the World.

**Scale:**
- 500,000+ properties listed across 170+ countries
- 30,000+ directly contracted hotels
- Multiple sub-brands: Destinations of the World, Sunhotels, FIT Ruums (formerly JacTravel)

**JacTravel (Now FIT Ruums/WebBeds):**
JacTravel was a major UK-focused European bed bank that was acquired by WebBeds. Its inventory lives under the WebBeds umbrella now under the FIT Ruums brand. This is relevant because it means WebBeds has particularly strong European city break and Mediterranean beach coverage — exactly the inventory Holiday Portfolio needs.

**Net Rate Model:**
Standard wholesale net rate model. WebBeds buys inventory from hotels at contracted rates, resells to travel buyers who add their own markup.

**API Quality:**
- Varies by brand within WebBeds family
- Sunhotels: XML API
- FIT Ruums: Open XML API
- Not all WebBeds inventory accessible through a single unified API — brand fragmentation is a real issue
- API documentation is not as polished as Hotelbeds

**Access Process:**
Simple form on website, then commercial sales discussion. WebBeds says: "Complete a form and their team will be in touch to get you underway."

**Minimum Volume / Startup Accessibility:**
To obtain a Credit Line, WebBeds requires "a floating deposit or bank guarantee from an internationally recognised bank, equivalent to a value that is mutually agreed upon between the parties." This is a meaningful financial barrier for a startup — you may need £10,000–£50,000 in deposit depending on expected volume.

However, you can start with prepayment (wallet/card) rather than a credit line, which lowers the barrier. Exact minimums are negotiated commercially.

**Sources:**
- [WebBeds Travel Buyers](https://www.webbeds.com/buyers/)
- [WebBeds Buyer Registration](https://www.webbeds.com/forms/buyer-join-us/)
- [FIT Ruums Terms](https://www.fitruums.com/en/corporate/terms-and-conditions/)
- [ZentrumHub: Top 10 Hotel Suppliers 2025](https://www.zentrumhub.com/top-10-hotel-suppliers-in-2025-guide-for-otas/)

---

### 1.3 RateHawk (Emerging Travel Group)

**What it is:** B2B hotel booking platform specifically designed for travel agents and small operators. Part of Emerging Travel Group (ETG), which also operates ZenHotels (consumer). RateHawk is the standout option for a UK startup — it was built to be accessible.

**Scale:**
- 2.5 million+ accommodation options across ~220 countries
- 100,000+ directly contracted properties
- Aggregates from 260+ wholesaler partners (including accessing Hotelbeds inventory through their network)
- Flights, transfers, and car rentals available alongside hotels

**Net Rate Model:**
RateHawk offers three financial models:

1. **Net Rate Model (default):** You see net prices, pay net prices, add your own markup via their interface to generate client-facing gross prices. "You see net prices on the site and pay net prices, with the interface allowing you to show the markup to demonstrate gross prices to the client."

2. **Gross Price Model:** You see gross prices, pay gross prices using client's card, commission is paid to you after the reporting period ends.

3. **Commission Model:** You set a commission percentage; RateHawk pays it out.

The net rate model (Model 1) is what Holiday Portfolio needs — buy at net, sell at net + your markup, client pays gross.

**Markup Flexibility:**
"RateHawk enables partners to set the desired amount of commission themselves and to seamlessly add it to the net price." No limits on markup amount — you set what you want. The mobile app lets you hide the net price from client-facing views with a single button.

**API Quality:**
- Modern REST/JSON API (v3 launched 2024)
- Sandbox environment (launched Q4 2024/2025) — dedicated testing environment
- SDK available in multiple languages
- Free API access: "Access to our API is free of charge"
- Clear, well-maintained documentation
- Pre-Book API feature (verify availability before confirming)
- Content API for static hotel data

**Access Process:**
1. Sign up free on ratehawk.com — no upfront costs, no deposits
2. Register as a travel agent or company
3. You are assigned an onboarding sales manager and a personal account manager
4. For API access: apply for API credentials through the portal, work with support team
5. Start booking — no minimum volume

**Minimum Volume:**
**None.** "All services — whether that's accommodation, flights or transfers — can be booked without a deposit." This is the key differentiator from Hotelbeds/WebBeds.

**Payment Terms:**
- No upfront deposit required
- Book refundable rates without paying immediately; system auto-cancels 30 minutes before free cancellation deadline if unpaid
- Pay by bank transfer, debit/credit card, or PayPal
- "Pay By Link" feature: send payment link directly to clients
- Established agents can apply for credit terms (15–30 day cycles)

**Startup Accessibility:**
High. RateHawk is explicitly designed for this market. Travel agents and small tour operators with zero bookings can sign up, get access, and start booking. The UK team has 20+ sales and account managers. Travel Weekly UK describes it as "bookings made simple."

**UK Activity:**
RateHawk is actively expanding in the UK market with a dedicated UK team. Travel Weekly UK has coverage. Multiple UK travel agent reviews on GetApp and Capterra confirm it works well for independent agents.

**Sources:**
- [RateHawk API for Travel Agents](https://www.ratehawk.com/lp/en-us/API/)
- [RateHawk Blog: Hotel Booking API](https://blog.ratehawk.com/hotel-booking-api-for-travel-agents/)
- [RateHawk Blog: Finance Models](https://blog.ratehawk.com/types-of-ratehawk-finance-models/)
- [RateHawk Blog: API v3](https://blog.ratehawk.com/ratehawk-api-version-3/)
- [RateHawk Blog: API Sandbox](https://blog.ratehawk.com/introducing-the-ratehawk-api-sandbox/)
- [RateHawk Blog: Payment Periods](https://blog.ratehawk.com/booking-payment-periods-on-ratehawk/)
- [Travel Weekly UK: Bookings Made Simple with RateHawk](https://travelweekly.co.uk/travel-weekly-hub/bookings-made-simple-with-ratehawk)
- [TravelPulse: RateHawk Redefining Hotel Distribution](https://www.travelpulse.com/news/technology/how-ratehawk-is-redefining-hotel-distribution-for-travel-advisors)

---

### 1.4 Bonotel

**What it is:** Boutique/luxury-focused hotel wholesaler. Niche player with 10,000+ luxury hotel partners. Works with 1,500+ international tour operators.

**Scale:**
- 10,000+ luxury hotel partners globally
- 2,200+ hotel partners
- RESTful APIs with XML messaging for hotel and data management
- Uses third-party channel managers (DerbySoft, RateTiger, SiteMinder)

**Key Differentiator:**
Bonotel uses a "Gross Rate" model, not a net rate model. "Travel agencies that are just starting out favor Bonotel, since their Gross Rate ability allows these parties to present hotels online without the financial commitment NET agreements need." This means you see gross rates (retail-equivalent) and earn a commission, rather than seeing net rates and adding markup — simpler for beginners but less pricing control.

**Fee Structure:**
- $25 for changes to existing bookings
- $30 for refunds/cancellations

**API Access:**
Not self-service. Requires direct commercial agreement to receive API access. No public developer portal.

**Startup Accessibility:**
Low-moderate. Bonotel's stated focus on "luxury" makes it a poor fit for volume city break packages. Gross rate model limits pricing control. Better for agents wanting to upsell premium hotel content rather than building a dynamic packaging engine.

**Relevant for Holiday Portfolio?**
Only if the product evolves toward luxury positioning. Not the right starting point for a dynamic packaging engine.

**Sources:**
- [AltexSoft: Bed Banks Comparison](https://www.altexsoft.com/blog/bed-banks-hotelbeds-travco-bonotel-hotelspro/)
- [Bonotel API Integration](https://www.bonotel.com)

---

### 1.5 JacTravel

JacTravel was acquired by WebBeds in 2017 and now trades as FIT Ruums, a WebBeds brand. It is no longer an independent entity. Its European inventory is accessible through the WebBeds platform. For UK city breaks and Mediterranean packages, the FIT Ruums/WebBeds channel is the relevant one. See WebBeds section above.

---

### 1.6 TravelgateX (now Travelgate)

**What it is:** A B2B travel marketplace/connectivity platform — not a bed bank itself, but a hub that connects buyers (OTAs, tour operators) to 1,000+ suppliers (bed banks, channel managers, DMCs) through a single standardized GraphQL API. Based in Palma de Mallorca.

**The Value Proposition:**
Instead of integrating Hotelbeds, WebBeds, and RateHawk separately (three API integrations, three commercial agreements, three sets of data to normalize), TravelgateX lets you integrate once and access all of them. "With one integration, you gain access to all Suppliers in the Marketplace."

**API Quality:**
- GraphQL-based Hotel-X API (modern, developer-friendly)
- Single endpoint: `https://api.travelgate.com`
- Three operations: Search → Quote → Book
- Test credentials available immediately (`test0000-0000-0000-0000-000000000000`)
- 1,000+ suppliers accessible through one integration
- Good documentation with certification resources and customer success support

**How It Works:**
1. Integrate the Hotel-X Buyers API once
2. Connect to individual suppliers on the marketplace (each supplier connection may require its own commercial agreement with the supplier)
3. Run normalized searches across all connected suppliers simultaneously
4. Compare and book the best available rate

**Commercial Terms:**
TravelgateX charges for connectivity — their commercial model is not publicly disclosed but is based on usage/volume. The platform markets itself as "startup ready with plans that let you pay as you go." You still need commercial agreements with each supplier you want to access through the marketplace, though TravelgateX can facilitate introductions.

**Startup Accessibility:**
Moderate-high. The technical barrier is lower (one API instead of many). The commercial barrier still requires agreements with each supplier. For a startup that wants access to multiple bed banks quickly, TravelgateX could be the fastest path to broad inventory.

**Relevance to Holiday Portfolio:**
High potential. Connect once to TravelgateX → access Hotelbeds, WebBeds, RateHawk, and 100+ others through normalized search. This is how many OTAs aggregate hotel content at scale without maintaining dozens of separate integrations.

**Sources:**
- [Travelgate Hotel-X Buyers API Quickstart](https://docs.travelgate.com/docs/apis/for-buyers/hotel-x-pull-buyers-api/quickstart/)
- [Travelgate APIs Overview](https://www.travelgate.com/apis)
- [ProgrammableWeb: TravelgateX HotelX Launch](https://www.programmableweb.com/news/travelgatex-launches-hotelx-api-hotel-search-and-booking/2018/08/09)

---

### 1.7 Impala

**What it is:** Hotel API aggregator / connectivity platform, founded in 2016, UK-based (London). Positions itself as the "Stripe for hotels" — a developer-first, easy-to-integrate hotel booking API.

**Model:**
Impala is different from traditional bed banks. It connects directly to hotel Property Management Systems (PMS) and channel managers, giving buyers access to direct hotel rates rather than wholesale rates. This is a direct-to-hotel model, not a wholesale model.

**Key Facts:**
- 2% fee per stay booking (though different agencies get different percentages)
- Earn up to 15% in seller commission through the Hotel Booking API
- No upfront costs
- No minimum number of bookings
- "Get started in less than 48 hours"
- GDPR-compliant, bank-grade security
- JSON API, well-documented

**Commission Model:**
Impala operates more like an affiliate/commission model than a net rate model. You earn commission on bookings (up to 15%) rather than buying at net and setting your own retail price. This is simpler but gives less pricing control than a true net rate model.

**Startup Accessibility:**
Very high — no minimums, instant access, developer-friendly. Best in class for ease of entry.

**The Catch:**
Impala is focused on direct hotel connectivity, which means its inventory is skewed toward hotels that have connected their PMS to Impala. Coverage of smaller European properties may be thinner than Hotelbeds or RateHawk, which have direct contracts with hundreds of thousands of properties.

**Relevance to Holiday Portfolio:**
Good for initial validation and building the booking flow before commercial agreements are in place. Less suitable as the primary inventory source for a package-focused product where pricing control matters.

**Sources:**
- [Impala Website](https://getimpala.com)
- [Impala Pricing](https://impala.travel/pricing/)
- [AltexSoft: Direct Hotel Booking APIs](https://www.altexsoft.com/blog/direct-b2b-hotel-booking-apis/)
- [Hotel Tech Report: Impala](https://hoteltechreport.com/revenue-management/channel-managers/impala-booking-api)
- [TechCrunch: Impala Builds a Single API](https://techcrunch.com/2019/10/02/impala-builds-a-single-api-for-the-entire-hotel-industry/)

---

### 1.8 Juniper

**What it is:** Spanish travel technology platform that provides booking engines, connectivity platforms, and distribution hubs. Access to 1,000+ sellers.

**Model:**
Juniper is primarily a booking engine / technology platform rather than a bed bank. It provides the infrastructure for travel companies to build their own booking systems, with connectivity to hotel suppliers through PUSH, PULL, or hybrid models. You connect via their Buyer Portal after agreeing terms with the Juniper Seller you want to access.

**API Technology:**
XML-based WebService API. Older technology architecture compared to Hotelbeds (REST/JSON) or RateHawk. Less developer-friendly.

**Relevance to Holiday Portfolio:**
Low as a primary integration. Juniper is more relevant for established operators building a full technology stack, not a startup doing API-first dynamic packaging.

**Sources:**
- [Juniper Web Services](https://ejuniper.com/en/products/juniper-booking-engine/modules/web-services/)
- [Juniper API Documentation](https://api-edocs.ejuniper.com/)

---

### 1.9 HotelsPro (HPro Travel)

**What it is:** Global wholesale hotel API provider, owned by Metglobal Group. One of the more accessible wholesale platforms.

**Scale:**
- 500,000+ hotels in 70,000 destinations across 205 countries
- New-generation search API called "Coral" (fast and reliable)
- Hotel mapping system called "Cosmos" (multilingual hotel data)

**API Quality:**
- JSON API with detailed documentation
- Developers must register with their affiliate program first
- HTTP over SSL authentication
- "User-friendly" booking interface with multi-currency and multi-language support

**Key Differentiator:**
HotelsPro markets itself with "no deposits, limits, or permanent credit requirement nor signup or usage cost." This would make it highly accessible for startups — similar to RateHawk's positioning.

**Net Rate Model:**
Standard wholesale net rate model. Access pricing is through direct registration.

**Startup Accessibility:**
Moderate-high. The "no deposits" claim is notable. Registration required but appears straightforward.

**Sources:**
- [AltexSoft: Hotel API Overview](https://www.altexsoft.com/blog/hotel-api/)
- [AltexSoft: Bed Banks Hotelbeds/Bonotel/HotelsPro](https://www.altexsoft.com/blog/bed-banks-hotelbeds-travco-bonotel-hotelspro/)
- [HotelsPro API via MQBit](https://mqbittechnologies.com/hotelspro-api/)

---

## Part 2: How Dynamic Packaging Actually Works

### 2.1 The Architecture

Dynamic packaging is the real-time assembly of flight + hotel (+ optional transfer/activity) into a single itinerary with a single retail price. The key word is "dynamic" — prices are pulled live from supplier APIs at the moment of search, not pre-packaged at static rates.

**Typical Flow:**
1. Customer enters destination, dates, passenger count
2. System simultaneously calls:
   - Flight API (e.g., Duffel) for available flights
   - Hotel API (e.g., RateHawk) for available rooms
3. System combines results: flight cost (net) + hotel cost (net) + markup = retail package price
4. Customer selects a combination and books
5. System creates two separate supplier bookings (one flight, one hotel) in the background
6. Customer receives a single confirmation and ATOL Certificate

**LoveHolidays / On The Beach Architecture:**
- LoveHolidays aggregates from multiple bed banks (Hotelbeds, WebBeds, and others) via API, plus low-cost carrier GDS feeds
- On The Beach uses Intuitive Systems' iVector platform for inventory management, with direct bed bank connections
- Both operate their own proprietary pricing engines that combine net supplier costs with dynamic markup rules
- The "dynamic" in dynamic packaging refers to real-time pricing, not pre-negotiated package prices

**Technology Stack Options:**

*Build from scratch:*
- Flight API (Duffel) + Hotel API (RateHawk) + custom pricing engine + booking management = 3–9 months engineering
- Full pricing control, but significant build cost

*Off-the-shelf dynamic packaging platforms:*
- **iVector (Intuitive Systems):** Used by On The Beach. Mature UK product. Enterprise pricing, not startup-friendly
- **Traveltek:** Dynamic packaging solutions for OTAs and tour operators. B2B focused
- **OTRAMS:** Packaged dynamic packaging engine
- **Trawex:** Dynamic packaging software
- These platforms solve the assembly problem but add licensing costs and reduce flexibility

*Aggregator approach (recommended for MVP):*
- Duffel (flights) + RateHawk API (hotels) + simple pricing engine = lean MVP
- TravelgateX in future to expand hotel supply

### 2.2 Pricing Calculation

```
Retail Package Price =
  (Hotel Net Rate × (1 + hotel_markup_pct)) +
  (Flight Net Cost + Duffel fee + your flight margin) +
  ATOL levy (£2.50/passenger) +
  payment processing fees (1.5–2.5%)
```

Key insight: The markup on the hotel component is where the margin lives. Flight margins are slim and increasingly commoditised (Duffel takes a fee per booking). Hotel markup of 15–25% on net rate is where a dynamic packaging business makes money.

### 2.3 ATOL and Package Travel Regulations 2018

**The Legal Framework:**

If Holiday Portfolio combines a flight and a hotel and sells them as a package to UK consumers, it is creating a "package holiday" under the Package Travel and Linked Travel Arrangements Regulations 2018 (PTRs). This makes the company an "organiser" with significant legal responsibilities.

**What "Organiser" Means:**
- Liable for the proper performance of all services in the package
- Customer can hold you responsible if the hotel or airline fails
- Must provide financial protection (ATOL) in case of your own insolvency
- Must issue ATOL Certificates at point of booking
- Must have written agency agreements with all suppliers

**ATOL Requirement:**
"Agents selling dynamic holidays require a licence — specifically a full ATOL licence — in the same way as a tour operator." Flight-Plus as a separate licence category has been effectively merged into the standard ATOL requirement.

**What ATOL Requires (Small Business ATOL):**
- Application fee: £1,477 (non-refundable)
- Advance APC payment: £1,250 (Air Travel Protection Contribution, credited against future per-passenger APC)
- Per-passenger APC: £2.50 per passenger on all ATOL-protected bookings
- £30,000 paid-up share capital (permanent requirement)
- Certified opening balance sheet in CAA format
- Financial projections for 12+ months
- Personal assets/liabilities statement for directors
- Demonstrated "fit and competent" status for business owners
- Processing time: approximately 12 weeks

**Total Startup ATOL Cost (approximate):**
- Application fee: £1,477
- Advance APC: £1,250
- Professional advice/preparation: £500–£2,000
- **Total: £3,200–£4,700**

**Alternative: ATOL Franchise**
New businesses can operate under an existing ATOL holder's licence (an "Approved Body" franchise) through organisations like ABTOT. This avoids the initial application process and financial requirements, at the cost of a franchise fee and percentage of revenue. ABTOT's franchise ATOL starts from approximately £942. This is worth considering for the first 12–18 months while building up booking volume.

**The PTR Obligation Gap:**
If you collect money for flight + hotel together before the customer has paid for both separately, you're creating a package. One structural option used by some operators: present flight and hotel as separate bookings with separate payment flows (Linked Travel Arrangements or LTAs), which carries lower legal obligations. LTAs still require some protection but avoid full package organiser liability. Legal advice is needed on this structuring question.

**Sources:**
- [CAA: Do I Need an ATOL?](https://www.caa.co.uk/atol-protection/atol-requirements-for-the-travel-industry/do-i-need-an-atol/)
- [CAA: Small Business ATOL](https://www.caa.co.uk/atol-protection/atol-requirements-for-the-travel-industry/air-travel-organisers-licensing-atol/small-business-atol/)
- [ATOL Licence Costs: MMBA Accounting](https://www.mmba.co.uk/blog/cost-atol-license/)
- [Package Travel Regulations 2018: Gov.uk Guidance PDF](https://assets.publishing.service.gov.uk/media/62dea082e90e0766afece5ee/package-travel-regulations-2018-guidance.pdf)
- [Travel Weekly: Dynamic Packaging ATOL Facts](http://travelweekly.co.uk/articles/39439/dynamic-packaging-the-facts-about-atol)
- [Travelgenix: Pros and Cons of Dynamic Packaging and ATOL](https://www.travelgenix.io/the-pros-and-cons-of-dynamic-packaging-and-atol-for-travel-agents)
- [ABTOT: ATOL Franchise Options](https://www.abtot.com/types-of-atol/)
- [ABTA: New Package Travel Regulations](https://www.abta.com/tips-and-advice/is-my-holiday-protected/new-package-travel-regulations)

---

## Part 3: The Margin Reality

### 3.1 What Discount Do Bed Banks Get From Hotels?

Hotels typically offer bed banks/wholesalers a discount of **20–30% (sometimes more) off the publicly available retail rate** (BAR — Best Available Rate). This is the fundamental spread that makes the model work.

The mechanics:
- Hotel sets a BAR (Best Available Rate) of, say, £150/night on its own site and Booking.com
- Hotel contracts the room to Hotelbeds at £100/night net (33% below BAR)
- Hotelbeds sells to travel agent at £100 net
- Travel agent marks up to £125 and sells to customer
- Customer pays £125 — cheaper than the £150 BAR, travel agent earns £25 margin

Why hotels accept this: Bed banks deliver volume bookings at bulk rates, reducing the hotel's direct sales and marketing costs. The net to the hotel may be similar to or better than OTA bookings (which carry 15–20% OTA commission), but it depends on the specific contract.

**Dynamic Wholesale Rates (emerging trend):**
The traditional model used fixed annual rate contracts. Hotels are increasingly shifting to "dynamic wholesale rates" — a fixed percentage discount off the live BAR (e.g., always 20% below current BAR). This gives hotels more pricing flexibility while maintaining the wholesale relationship. Duetto Cloud writes about this trend in detail.

### 3.2 What Markup Can a Small Operator Add?

**Typical achievable markups:**

| Scenario | Net Rate | Markup | Retail Price | Operator Margin |
|----------|----------|--------|--------------|-----------------|
| Standard city break hotel | £80 | 20% | £96 | £16 |
| Package premium (add value) | £80 | 30% | £104 | £24 |
| High-demand property | £120 | 15% | £138 | £18 |
| Budget property | £45 | 25% | £56 | £11 |

Typical net rate margins available: **15–35% markup on net rate**, yielding **13–26% gross margin** on hotel component.

The upper end (30%+ markup) is achievable on bookings where you add genuine value through personalisation, curated selection, or convenience — which is exactly Holiday Portfolio's proposition.

The lower end (10–15%) is what you get in highly competitive markets (e.g., Benidorm in August) where customers will price-check Booking.com directly.

### 3.3 Can You Undercut Booking.com?

**The Rate Parity Problem:**
Hotels sign rate parity clauses with major OTAs (Booking.com, Expedia) that require the hotel to offer the same rate across all channels. In theory, this should prevent bed bank resellers from undercutting OTAs.

**The Reality:**
Rate parity enforcement is imperfect. The wholesale channel was never fully brought under parity rules because wholesale rates are meant to be B2B only. In practice:

- Bed bank rates ARE frequently lower than Booking.com retail, especially for refundable rates
- This is well-documented: "Even after a bed bank marks them up and distributes them to various booking channels, the prices are still lower than published ones"
- The reason: OTA commission (15–20%) is baked into the BAR that Booking.com shows. Bed bank rates were contracted before OTA parity became universal, at deeper discounts
- For the customer, a hotel that would pay Booking.com 18% commission can offer a 20% discount to a bed bank and still net the same amount. The consumer gets a lower price

**The Catch:**
Hotels and OTAs are increasingly aware of this arbitrage. Hotels are being penalised by OTAs when rate disparity is discovered (dropped in rankings, etc.). The situation is "currently has no universal solution" but is evolving toward tighter controls. Rate parity is tightening, meaning the ability to undercut Booking.com on the same room is narrowing.

**The Right Framing for Holiday Portfolio:**
Don't try to compete on price with Booking.com for the same room. Instead:
1. Offer **package value** — flight + hotel at a combined price that Booking.com can't match (they don't do packages)
2. Offer **personalisation** — curated recommendations that justify a slight premium
3. Use bed bank net rates to achieve healthy margins (20–25% on hotel) even when pricing competitively

**Sources:**
- [AltexSoft: Hotel Rates Guide](https://www.altexsoft.com/blog/hotel-rates/)
- [CloudBeds: What are Bed Banks?](https://www.cloudbeds.com/articles/bed-banks/)
- [AltexSoft: Rate Parity](https://www.altexsoft.com/blog/rate-parity/)
- [Duetto: Dynamic Wholesale Rates](https://www.duettocloud.com/library/dynamic-wholesale-rates-new-frontier-hotel-distribution)
- [PhocusWire: Hotels Grapple with Secondary OTAs](https://www.phocuswire.com/hotels-grapple-secondary-otas-pricing-control)
- [HotelPriceReporter: Wholesale Rate Definition](https://www.hotelpricereporter.com/term/wholesale-rate/)
- [DMCQuote: B2B Hotel Booking Guide](https://dmcquote.com/blog/post/b2b-hotel-booking-guide-for-travel-agents)

### 3.4 Comparative Margins: Bed Bank vs Commission

The economic case for net rates vs commission is clear for high-value bookings:

| Model | Hotel Price | Agent Earns | Margin % |
|-------|-------------|-------------|----------|
| Commission (10% on £200) | £200 (BAR) | £20 | 10% |
| Commission (15% on £200) | £200 (BAR) | £30 | 15% |
| Net rate: buy £140, sell £180 | £180 | £40 | 22% |
| Net rate: buy £140, sell £175 | £175 | £35 | 20% |

Net rates yield 2–3x higher margins on the same booking compared to commission. This is the core financial argument for the bed bank model.

---

## Part 4: The Startup Path

### 4.1 What Does a UK Startup Need Before a Bed Bank Will Talk to It?

**Minimum requirements across all bed banks:**

1. **Registered UK company** — Companies House registration. This is table stakes.
2. **Business insurance** — Public liability and professional indemnity. Standard business insurance.
3. **Business bank account** — Required for financial settlement.
4. **ATOL licence (for selling packages with flights)** — Legally required. ~12 week lead time.
5. **Website or booking platform** — Most bed banks want to see where their inventory will be displayed.
6. **Description of business model** — What kind of bookings, what volumes projected, what markets targeted.

**What you DON'T need for hotel-only access:**
- IATA accreditation (IATA matters for airline ticketing, not hotel bookings)
- ABTA membership (not legally required, though commercially helpful)
- Minimum booking history for RateHawk, HotelsPro, and Impala

**RateHawk specifically:** No prerequisites beyond company registration. Free signup, immediate access to the booking platform. API access requires a request but no minimum volumes.

**Hotelbeds and WebBeds:** Will want to see a credible business plan, projected volumes, and have a commercial negotiation. A zero-booking startup will get more cautious treatment — potentially lower inventory access, higher deposit requirements, or deferred production access.

### 4.2 Minimum Viable Integration Timeline

**Month 1–2: Pre-integration**
- Register company (immediate)
- Begin ATOL application (12-week process, start immediately — or use ABTOT franchise initially)
- Register on RateHawk, Impala, and Hotelbeds sandbox
- Build hotel search/display/booking flow using RateHawk API (most accessible)
- Simultaneously integrate Duffel for flights

**Month 3–4: MVP Build**
- Complete Duffel flights integration (Duffel is self-service, fast)
- Complete RateHawk hotel integration (free API access, good docs)
- Build pricing engine: net_hotel + net_flight + markup = package price
- Build booking management: hold flight booking, hold hotel booking, collect payment, confirm both
- Test end-to-end booking flow

**Month 5–6: Go Live**
- ATOL may be approved by now (if applied in Month 1)
- Begin taking live bookings — start with hotel-only or flight-only to avoid package liability initially
- Collect booking data and reviews
- Approach Hotelbeds with 2–3 months of booking history for commercial conversation

**Month 6–12: Scale Supply**
- Apply for Hotelbeds production access using early booking data
- Evaluate TravelgateX as aggregator layer to access multiple bed banks
- Explore WebBeds for expanded European inventory
- Assess whether to join TravelgateX or maintain direct relationships

### 4.3 Are There Self-Service API Signups?

| Provider | Self-Service? | Notes |
|----------|---------------|-------|
| RateHawk | Yes — free, instant | Best option for startups |
| Impala | Yes — 48-hour onboarding | Commission model, not net rate |
| Hotelbeds | Sandbox: yes. Production: requires commercial agreement | Need to negotiate with sales team |
| HotelsPro | Registration required, then access | Claims no deposit/minimum |
| WebBeds | Form + commercial discussion | Requires floating deposit for credit |
| Duffel (flights) | Yes — fully self-service | Ideal for flights side |
| TravelgateX | Yes — test credentials immediate | Aggregator: need supplier agreements too |

**Duffel comparison:** Duffel flights is fully self-service with pay-as-you-go pricing, making it the gold standard for startup-accessible travel API. RateHawk for hotels is the closest equivalent.

### 4.4 Payment and Settlement Terms

**RateHawk:**
- No upfront deposit required
- Book refundable rates without paying immediately
- Payment due before free cancellation expires
- System auto-cancels 30 minutes before deadline if unpaid
- Pay by card, bank transfer, or PayPal
- Credit terms available for established agents (15–30 day cycles)

**Hotelbeds/Bedsonline:**
- Typically credit line or wallet-based
- Credit line requires floating deposit from established bank guarantee
- New partners may need to prepay bookings

**WebBeds:**
- Floating deposit or bank guarantee required for credit line
- New partners: prepayment or wallet funding

**Implication for cash flow:**
With RateHawk, you can collect payment from the customer first (via Stripe/similar), then pay RateHawk. This is a positive cash flow model — you're not funding inventory upfront. The key risk is that refundable bookings need to be cancelled and refunded if the customer changes their mind, requiring clear cancellation policies and reserve management.

**Sources:**
- [CAA: ATOL Licence Renewal Fees](https://www.caa.co.uk/atol-protection/trade/maintain-and-renew-your-atol/atol-licence-renewal-fees/)
- [MMBA: How Much Does an ATOL License Cost?](https://www.mmba.co.uk/blog/cost-atol-license/)
- [CAA: Small Business ATOL](https://www.caa.co.uk/atol-protection/atol-requirements-for-the-travel-industry/air-travel-organisers-licensing-atol/small-business-atol/)
- [ZentrumHub: Top 10 Hotel Suppliers 2025](https://www.zentrumhub.com/top-10-hotel-suppliers-in-2025-guide-for-otas/)
- [Vervotech: Comparing Hotel API Providers 2025](https://vervotech.com/blog/comparing-the-best-hotel-api-providers-in-2025/)

---

## Part 5: Duffel Hotels (Duffel Stays)

### 5.1 Does Duffel Have a Hotel Product?

**Yes.** Duffel launched "Duffel Stays" as a full accommodation booking API. It is live, documented, and actively marketed.

**Official page:** [duffel.com/stays](https://duffel.com/stays)

### 5.2 How It Works

Duffel Stays provides a single API for searching, booking, and managing accommodation worldwide. The flow is:

1. Search by location, dates, guests
2. Receive results with a `quote_id` for each available option
3. Create a booking by providing `quote_id` + guest information
4. Pay using Duffel balance or card
5. Receive booking confirmation

The API is the same REST/JSON architecture as Duffel flights — consistent, developer-friendly, same auth model.

### 5.3 Inventory and Coverage

- **1 million+ properties globally**
- Includes major chains: Marriott, Hilton, Westin, JW Marriott, Shangri-La Hotels
- "Aggregated sources" — Duffel is pulling inventory from OTA-equivalent sources, not direct hotel contracts
- Coverage of independent and boutique properties is less clear

**Inventory source note:** Duffel Stays does not appear to be sourcing from traditional bed banks at net rates. The inventory is more likely sourced from channel managers and GDS-adjacent distribution — meaning rates may be closer to retail (BAR) than wholesale net rates.

### 5.4 Commission Model

Duffel Stays uses a **commission/profit-share model**, not a net rate model:

- "Commission is payable by the accommodation provider on completed bookings"
- "When you book with Duffel, we share that commission with you"
- "The more volume you place through Duffel, the larger your share of the profit from the commission"
- "Available from your first booking with no negotiation needed"
- A stay booking is "completed" when the guest checks out (meaning commission is paid post-stay)

Duffel does not publish specific commission percentages publicly. Their pricing page shows the pay-as-you-go and enterprise models but specific Stays commission rates require contacting sales.

**Critical Difference from Bed Banks:**
Duffel Stays is a **commission model** — you earn a percentage of the room price rather than buying at net and setting your own markup. This is fundamentally different from RateHawk or Hotelbeds where you control the retail price. With Duffel Stays:
- You cannot set your own margin
- You cannot price the hotel component independently
- Your earnings are determined by Duffel's commission share, which scales with volume
- Commission is paid post-stay, not at booking

**What this means for Holiday Portfolio:**
Duffel Stays simplifies the supply chain (one supplier relationship for flights + hotels) but sacrifices pricing control and margin transparency. If the goal is to build a dynamic packaging engine where you control the package price and margin structure, Duffel Stays is less suitable than RateHawk as the hotel layer.

### 5.5 Can You Do Flights + Hotels Through Duffel Alone?

**Technically yes.** Duffel offers both flights (Duffel Orders) and accommodation (Duffel Stays) through the same API and developer account. This is a genuine advantage for an MVP:

- One API authentication
- One commercial relationship
- Consistent developer experience
- No need to normalise data from two different suppliers
- Duffel handles supplier relationships on both sides

**For a rapid MVP:** Building the first version of Holiday Portfolio using Duffel Flights + Duffel Stays is technically the fastest path to a working flight+hotel product. It avoids bed bank commercial negotiations entirely in the early stage.

**The upgrade path:** Once booking volume is established and margin optimisation becomes priority, replace Duffel Stays with RateHawk API on the hotel side to gain net rate access and pricing control. The flight side stays with Duffel.

### 5.6 Pricing

Duffel Flights pricing:
- $3.00 per confirmed order
- 1% of total order value for managed content
- $2.00 per paid ancillary
- 2% FX conversion fee

Duffel Stays: Commission-share (percentage undisclosed, contact Duffel).

**No upfront costs, no minimum bookings — pure pay-as-you-go.** This is startup-friendly.

**Sources:**
- [Duffel Stays Landing Page](https://duffel.com/stays)
- [Duffel Pricing](https://duffel.com/pricing)
- [Duffel: Getting Started with Stays](https://duffel.com/docs/guides/getting-started-with-stays)
- [Duffel: Stays Key Concepts](https://duffel.com/docs/api/overview/stays-key-concepts)
- [Duffel Blog: Introducing Duffel Stays](https://duffel.com/blog/introducing-duffel-stays-the-fastest-way-to-sell-accommodation)
- [Travel Massive: Duffel Stays](https://www.travelmassive.com/posts/duffel-stays-415120587)

---

## Summary Comparison Table

| Provider | Model | Startup Access | Min Volume | API Quality | Net Rate? | Best For |
|----------|-------|----------------|------------|-------------|-----------|----------|
| **RateHawk** | Wholesale | Very Easy | None | Modern REST | Yes | Starting point for Holiday Portfolio |
| **Hotelbeds** | Wholesale | Moderate (sandbox easy, prod needs negotiation) | Not disclosed | Modern REST | Yes | Scale play once you have volume |
| **WebBeds** | Wholesale | Moderate (deposit required) | Floating deposit | XML/fragmented | Yes | European inventory depth |
| **HotelsPro** | Wholesale | Easy (claims no deposit) | None claimed | JSON | Yes | Good backup option |
| **Bonotel** | Gross rate | Moderate | Not disclosed | XML | No (gross) | Luxury/boutique only |
| **TravelgateX** | Aggregator | Easy (test instant) | Pay-as-you-go | GraphQL (modern) | Depends on supplier | Multi-supplier access via one API |
| **Impala** | Commission | Very Easy (48hr) | None | JSON/modern | No (commission) | Quick start, less pricing control |
| **Duffel Stays** | Commission-share | Very Easy (instant) | None | REST/modern | No (commission-share) | Fastest MVP (with Duffel flights) |

---

## Recommended Path for Holiday Portfolio

### Phase 1: MVP (Months 1–4)

**Flights:** Duffel (already decided)
**Hotels:** Duffel Stays (for speed) OR RateHawk API (for net rate control)

The choice between these depends on the founding team's priorities:

- **Duffel Stays first:** Fastest to MVP. One account, one integration, zero commercial negotiation. Accept lower hotel margin initially. Validate the product concept.
- **RateHawk first:** Takes 2–4 extra weeks of integration but gives net rate model from day one. Better margin structure for the long term.

**Recommendation:** Start with RateHawk for hotels. The API access is free, the docs are good, the signup is instant, and the net rate model is the right commercial structure for a dynamic packaging product. Duffel Stays is compelling for speed but the commission model is a dead end once you want pricing control.

### Phase 2: ATOL (Apply Month 1, Approved ~Month 4)

Apply for Small Business ATOL immediately. While the application processes, do not sell flight+hotel packages — either:
- Sell flights and hotels as separate bookings (no package, no ATOL needed)
- Or operate under an ABTOT ATOL franchise (faster, lower cost, covers you immediately)

ABTOT franchise is worth serious consideration for the first year.

### Phase 3: Expand Supply (Months 6–12)

Once you have 2–3 months of booking data, approach Hotelbeds with a concrete conversation. Your booking history is the commercial leverage.

Consider TravelgateX as an aggregator layer to access Hotelbeds, WebBeds, and others through a single normalised API — this dramatically reduces the ongoing technical overhead of managing multiple bed bank integrations.

### Financial Model

**Unit Economics (illustrative, per package booking):**

| Item | Amount |
|------|--------|
| Hotel net rate (e.g., 3 nights × £80) | £240 |
| Hotel markup (25%) | £60 |
| Flight net cost (e.g., 2 pax return) | £180 |
| Flight margin (10%) | £18 |
| ATOL levy (2 pax × £2.50) | £5 |
| Duffel flight fee ($3 × 2) | ~£5 |
| Payment processing (2%) | ~£9 |
| **Total Revenue** | **£517** |
| **Total Cost** | **£439** |
| **Gross Margin** | **£78 (15%)** |

At scale (1,000 packages/year): ~£78,000 gross contribution before fixed costs.
At scale (5,000 packages/year): ~£390,000 gross contribution.

These are illustrative — actual margins depend heavily on destination, property type, and season. City breaks to European capitals with boutique hotels (the Holiday Portfolio target segment) should achieve 18–25% gross margins if curated well.

---

## Key Risks

1. **Rate parity tightening:** Hotels are under pressure from OTAs to close the bed bank arbitrage gap. Margins may compress over time as parity enforcement improves.

2. **ATOL complexity:** The 12-week application timeline and £30,000 share capital requirement may delay go-live. ABTOT franchise is the mitigation.

3. **Hotelbeds gatekeeping:** The best inventory is behind commercial negotiations that favour established operators. Early Hotelbeds rates may be less competitive than a larger operator gets.

4. **Duffel Stays commission opacity:** Duffel doesn't publish Stays commission rates. If the commission share is low (e.g., 5–8%), the model doesn't work for packages. Validate this with Duffel directly before committing.

5. **Cash flow timing:** If operating on pre-payment model (customer pays before you pay supplier), cash flow is positive. If credit is extended before income, cash flow risk rises. RateHawk's payment model (pay before cancellation deadline) aligns well with collecting customer payment first.

---

*Research compiled from public sources. Commercial terms for bed banks are not publicly disclosed and require direct negotiation. All figures should be validated with actual supplier quotes before building financial models.*

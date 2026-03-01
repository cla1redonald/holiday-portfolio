# Technical Feasibility Research: Travel Recommendation Engine with Semantic Preference Graphs

**Product:** Holiday Portfolio — UK Travel Personalisation Platform
**Research Date:** 2026-02-28
**Scope:** Three-system architecture: Travel data layer (Duffel API) + Recommendation engine + Semantic preference graph

---

## Executive Summary

This report assesses the technical feasibility of building a travel recommendation engine powered by NLP intent parsing, a vector-based user preference graph, and real-time inventory integration at startup scale.

**Verdict:** Buildable at startup scale within a £50–100K budget, but only with deliberate architecture choices and a phased approach. The stack is proven by Expedia, Tripadvisor, and Hopper. The risk is not whether it can be built — it can — but whether a small team can sequence it correctly, avoid over-engineering, and generate enough user data to beat the cold start problem before budget runs out.

**Critical caveat:** The semantic preference graph is the hardest component. The NLP layer is now commodity. The recommendation engine is solved problem. The fusion of all three in under 3 seconds is engineering execution risk, not research risk.

---

## Section A: LLM-Powered NLP Intent Parsing for Travel

### How good are current LLMs at parsing travel intent?

Current-generation LLMs (Claude 3.5 Haiku, GPT-4o, GPT-4o mini) are highly capable at extracting structured intent from conversational travel queries. This is now a well-solved problem. A query like "Warm, good food, under £400, long weekend" can be reliably extracted into:

```json
{
  "destination_attributes": ["warm climate", "strong food culture"],
  "budget_ceiling_gbp": 400,
  "trip_duration": "long weekend (3-4 nights)",
  "departure_flexibility": "unspecified",
  "implicit_constraints": ["direct or short-haul from UK"]
}
```

Research from ScienceDirect (2025) directly evaluated GPT, BERT, LLaMA, and RoBERTa for intent classification in tourism chatbots, confirming modern LLMs outperform traditional NLU approaches for open-ended travel queries. The hybrid approach — using LLM as a parser to translate natural language into structured representation — is the dominant architecture pattern.

The ATIS (Air Travel Information System) dataset is the standard benchmark for travel NLP. Production systems like Expedia's "Romie" (launched spring 2024) and Hopper's AI assistant demonstrate that this is now production-ready, not experimental.

### Latency

Leading LLM inference systems achieve sub-0.5 second time-to-first-token with throughput exceeding 1,000 tokens/second. For a typical travel intent query (200-300 input tokens, 100-150 output tokens for structured JSON), you can expect:

- **Claude 3.5 Haiku:** ~300-500ms end-to-end for structured JSON output
- **GPT-4o mini:** ~200-400ms end-to-end
- **Target for intent parsing step:** < 800ms (leaving 2.2 seconds for the rest of the pipeline)

This is achievable. The intent parsing step is not the latency bottleneck.

### Cost per Query

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Est. cost per query (300 in / 150 out) |
|-------|----------------------|------------------------|----------------------------------------|
| Claude 3.5 Haiku | $0.25 | $1.25 | ~$0.000263 (~£0.00021) |
| GPT-4o mini | $0.15 | $0.60 | ~$0.000135 (~£0.00011) |
| Claude Sonnet 4 | $3.00 | $15.00 | ~$0.00315 (~£0.0025) |
| GPT-4o | $2.50 | $10.00 | ~$0.00225 (~£0.0018) |

**Recommendation:** Use Claude 3.5 Haiku or GPT-4o mini for intent parsing. Reserve Sonnet/GPT-4o for complex preference synthesis tasks only. At scale, intent parsing cost is negligible compared to infrastructure.

### Travel-Specific Fine-Tuning

You do not need to fine-tune for intent parsing at startup scale. The Tripadvisor approach — fine-tuning embedding models on travel-domain text — is appropriate for embedding generation (see Section B), not for intent classification. Pre-trained LLMs handle travel vocabulary well without domain fine-tuning.

### Sources
- [Assessing LLMs for intent detection in tourism chatbots — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S246822762500119X)
- [Intent-Driven NLI: Hybrid LLM + Intent Classification — Medium](https://medium.com/data-science-collective/intent-driven-natural-language-interface-a-hybrid-llm-intent-classification-approach-e1d96ad6f35d)
- [Claude API Pricing — Anthropic](https://platform.claude.com/docs/en/about-claude/pricing)
- [LLM API Pricing Comparison 2025 — IntuitionLabs](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)
- [Claude Haiku 4.5 vs GPT-4o mini vs Gemini Flash comparison — Skywork](https://skywork.ai/blog/claude-haiku-4-5-vs-gpt4o-mini-vs-gemini-flash-vs-mistral-small-vs-llama-comparison/)

---

## Section B: Vector Databases for User Preference Graphs

### Which Database for User Preference Profiles?

The core requirement for Holiday Portfolio is: store a per-user preference vector that encodes travel identity (climate preferences, cuisine culture, budget range, activity style, trip type, past destinations liked/disliked), and query it at search time to find inventory that matches.

**Qdrant** is the strongest recommendation for this use case at startup scale:
- Free tier: 1GB storage (sufficient for ~50K user profiles at 1536 dimensions)
- Rust-based: highest raw performance of managed options
- Best combination of metadata filtering + vector similarity (critical for filtering by budget, dates, departure airport alongside semantic match)
- Serverless/"Flex" pricing scales with actual usage
- Open-source: self-host on a £20/month VPS during early days, migrate to managed when needed

**pgvector (PostgreSQL extension)** is the strongest alternative if you want to consolidate infrastructure:
- Open source, zero additional cost if you already run PostgreSQL (which you will for user accounts, bookings)
- Recent benchmarks show pgvectorscale achieves 1.5x higher query throughput than Pinecone at 79% lower monthly cost
- Supabase ships pgvector out of the box — directly relevant given this project likely uses Supabase
- Tradeoff: at 100K+ users with complex filtering, a dedicated vector DB will outperform

**Pinecone** is not recommended for startup scale. Costs climb above $500/month as usage scales, and the managed overhead is not justified when pgvector + Supabase covers the early phase.

### Embedding Dimensions

| Model | Dimensions | Cost/1M tokens | Query latency impact |
|-------|-----------|----------------|---------------------|
| text-embedding-3-small | 1,536 | $0.02 | Baseline |
| text-embedding-3-large | 3,072 | $0.13 | ~2x slower |
| text-embedding-3-small (reduced) | 256-512 | $0.02 | ~4x faster |

For user preference profiles, **1,536 dimensions** is the correct choice. This captures rich semantic information while keeping query latency acceptable. The OpenAI text-embedding-3-small model at $0.02/million tokens is the default recommendation. A text-embedding-3-large embedding can be shortened to 256 dimensions and still outperform the older ada-002 model at 1,536 dimensions, so there is room to reduce dimensions if query latency becomes a bottleneck.

Storage cost at 1,536 dimensions: approximately $3.75/month per 10 million vectors. For 100,000 users, user profile storage is under $1/month.

### Query Latency

Vector similarity search for p99 < 200ms is the industry health benchmark. At startup scale (1K–100K users), both Qdrant and pgvector deliver this comfortably. At 10 million+ users you need dedicated infrastructure — not a startup concern.

### Pricing at Scale

| Scale | pgvector (Supabase) | Qdrant Cloud | Pinecone |
|-------|--------------------|--------------| ---------|
| 1,000 users | Included in free tier | Free (1GB) | Free tier |
| 10,000 users | ~$25/month (Pro plan) | ~$25–50/month | ~$70/month |
| 100,000 users | ~$100–200/month | ~$100–200/month | ~$300–500/month |

### Sources
- [Vector Database Comparison 2025 — LiquidMetal AI](https://liquidmetal.ai/casesAndBlogs/vector-comparison/)
- [Pinecone vs Qdrant vs Weaviate — Xenoss](https://xenoss.io/blog/vector-database-comparison-pinecone-qdrant-weaviate)
- [pgvector vs Pinecone: cost and performance — Supabase](https://supabase.com/blog/pgvector-vs-pinecone)
- [pgvectorscale is faster than Pinecone at 75% less cost — Tiger Data](https://www.tigerdata.com/blog/pgvector-is-now-as-fast-as-pinecone-at-75-less-cost)
- [OpenAI text-embedding-3-small pricing — Helicone](https://www.helicone.ai/llm-cost/provider/openai/model/text-embedding-3-small)
- [How many embedding dimensions? — Particula Tech](https://particula.tech/blog/embedding-dimensions-rag-vector-search)
- [Vector Embeddings at Scale — Medium](https://medium.com/@singhrajni/vector-embeddings-at-scale-a-complete-guide-to-cutting-storage-costs-by-90-a39cb631f856)
- [Best Vector Databases 2026 — Firecrawl](https://www.firecrawl.dev/blog/best-vector-databases)

---

## Section C: Recommendation Engine Architecture

### What Works for Travel?

Travel is different from e-commerce and media in three ways that affect recommendation architecture:

1. **Low purchase frequency.** A user might book 2-3 trips per year, giving the system very few explicit signals.
2. **High contextual dependence.** The same user wants Ibiza in August and the Maldives in February — context (trip type, who they're travelling with, season) matters more than in Netflix.
3. **Inventory is perishable and volatile.** Unlike movie recommendations, flight and hotel prices change by the minute. The recommendation must reflect real-time availability.

**Hybrid approach is the confirmed best architecture.** Research published in IEEE and IJACSA (2025) shows hybrid models combining content-based and collaborative filtering outperform either alone, with the best implementations reaching precision 0.85, recall 0.83, F1-score 0.84 on travel datasets.

For Holiday Portfolio, the practical architecture is:

1. **Content-based filtering** (dominant in early days, no cold start issue): Match user preference vector to destination/product attribute vectors. "This user prefers warm Mediterranean climates, seafood, architecture — embed those as vectors and find semantically close inventory."

2. **Collaborative filtering** (adds value after ~10,000 users): "Users similar to this user's preference graph also loved Lisbon and Tbilisi." Requires sufficient population to find meaningful clusters.

3. **Two-tower neural architecture** (production-grade once you have data): Expedia explicitly uses the Two-Tower Neural Network for recommendations. Google Cloud's architecture documentation describes it as the standard for large-scale candidate generation. One tower learns user embeddings, the other learns item embeddings; approximate nearest neighbor search finds candidates at query time.

### Cold Start Problem

This is the most acute challenge in the early product phase. Key findings:

- New users with zero history cannot benefit from collaborative filtering
- Content-based filtering works immediately if users provide any preference signals
- **Booking.com's cold start solution:** uses IP address, browser settings, and cookies to infer context for first-time visitors (city-level geo-inference) — replicable
- **LLM onboarding conversation** is the most powerful cold start solution for Holiday Portfolio: a 3-5 question NLP conversation ("What was the best trip you ever took? What's your travel style?") generates enough signal to seed the preference vector before any bookings exist
- Research consensus: minimum ~5-10 meaningful interactions before collaborative filtering adds value; content-based recommendations are useful from interaction 1

### Open-Source Frameworks

| Framework | Best for | Production-ready? |
|-----------|----------|-------------------|
| TensorFlow Recommenders (TFRS) | Two-tower models, full workflow | Yes |
| NVIDIA Merlin | GPU-accelerated, end-to-end pipeline | Yes (GPU required) |
| LensKit | Research/experimentation | No (research tool) |
| Surprise | Classical CF algorithms (SVD, KNN) | Lightweight, limited scale |

**Recommendation:** Start with TFRS for the two-tower model when you have data. In early days, pure vector similarity (user embedding vs. item embedding cosine similarity) from Qdrant or pgvector is sufficient and requires no ML framework — just embeddings.

### Hopper's Architecture (Reference)

Hopper ingests ~300 billion prices per month across 5 years of historical data. Their Scala microservices backend on HBase/HDFS with Kafka, Python, Spark, and TensorFlow ML stack is the matured version. The key insight: **25% of Hopper's bookings come from AI-suggested trips the user didn't explicitly search for.** This is the aspirational benchmark for Holiday Portfolio's preference-driven discovery.

Hopper's price prediction at 95% accuracy for up to 1 year ahead is built on 8+ years of historical data — this is not replicable at startup scale. Focus on preference personalisation first, not price prediction.

### Sources
- [Deep Neural Collaborative Filtering for Travel — Nature Scientific Reports](https://www.nature.com/articles/s41598-025-34585-0)
- [Personalized Hybrid Tourist Destination Recommendation — IJACSA](https://thesai.org/Downloads/Volume15No8/Paper_3-A_Personalized_Hybrid_Tourist_Destination_Recommendation_System.pdf)
- [Two-Tower Candidate Generation at Expedia — Medium](https://medium.com/expedia-group-tech/candidate-generation-using-a-two-tower-approach-with-expedia-group-traveler-data-ca6a0dcab83e)
- [Two-Tower Architecture Deep Dive — Shaped AI](https://www.shaped.ai/blog/the-two-tower-model-for-recommendation-systems-a-deep-dive)
- [Google Cloud Two-Tower Retrieval — GCP Docs](https://docs.cloud.google.com/architecture/implement-two-tower-retrieval-large-scale-candidate-generation)
- [Cold Start Problem in Recommenders — FreeCodeCamp](https://www.freecodecamp.org/news/cold-start-problem-in-recommender-systems/)
- [How Hopper Uses AI — Built In Boston](https://www.builtinboston.com/articles/spotlight-working-at-hopper-engineering-data)
- [Hopper: Using AI to Plan Your Vacation — Harvard Digital](https://d3.harvard.edu/platform-digit/submission/hopper-using-ai-to-plan-your-next-vacation/)
- [NVIDIA Merlin Framework](https://developer.nvidia.com/merlin)
- [TensorFlow Recommenders](https://www.tensorflow.org/recommenders)

---

## Section D: The Fusion — NLP + Preferences + Inventory Search

### The End-to-End Chain

```
User query: "Warm, good food, under £400, long weekend"
    │
    ▼ Step 1: NLP Intent Parse (LLM)
    │  Input: raw query → Output: structured JSON intent
    │  Latency target: < 600ms
    │
    ▼ Step 2: Preference Lookup (Vector DB)
    │  Retrieve user's stored preference embedding
    │  Merge with session intent (blend persistent + ephemeral)
    │  Latency target: < 50ms
    │
    ▼ Step 3: Candidate Generation (ANN search)
    │  Find top-N destination/product embeddings similar to fused vector
    │  Filter by: budget, dates, departure airport (metadata filters)
    │  Latency target: < 100ms
    │
    ▼ Step 4: Inventory Enrichment (Duffel API + hotel API)
    │  Fetch live prices for top-N candidates
    │  This is the latency danger zone — live API calls
    │  Latency target: < 1,500ms (parallelised)
    │
    ▼ Step 5: Re-ranking
    │  Score candidates by: preference match + price fit + availability
    │  Latency target: < 100ms
    │
    ▼ Ranked results returned to user
    Total target: < 3,000ms
```

**The 3-second budget is achievable, but Step 4 is the risk.** Real travel API calls to Duffel for live pricing can take 1-3 seconds each if done sequentially. Mitigation strategies:

1. **Parallel API calls:** Fan out to Duffel for top 10 destinations simultaneously. 10 parallel calls at 800ms each = 800ms total, not 8 seconds.
2. **Cached skeleton + live price fill:** Pre-cache destination metadata (climate, cuisine, activities, photos) indefinitely. Cache price brackets (e.g., "flights to Seville from London: typically £80–£180") for 24-48 hours. Call live pricing only at the point of user selection, not during search.
3. **Stale-while-revalidate:** Return results with cached prices immediately, update prices asynchronously.

**Duffel API pricing:** Charges per confirmed booking, not per search query. This means search-heavy behaviour during recommendation browsing does not incur API costs — only conversions do. This is an excellent cost model for discovery-driven products.

### The "Somewhere Like Valencia But Cheaper" Query

This is the most technically interesting query type and it is solvable with vector similarity. Tripadvisor has explicitly published their approach: embed destinations using their review text, POI descriptions, and attributes. "Like Valencia" means: find destinations where the embedding (warm Mediterranean climate + seafood + architecture + beach + cultural + affordable) has high cosine similarity to Valencia's embedding, then filter the result set by `average_trip_cost < Valencia_average_trip_cost`.

The implementation path:
1. Embed all destinations using their attributes (climate, food type, activities, vibe)
2. At query time, embed "Valencia" → find cosine-similar destinations
3. Apply hard filters: price_bracket < X
4. Return ranked results

This requires a pre-built destination knowledge base with rich attribute embeddings — a one-time build effort, maintainable thereafter.

### Caching Strategy

| Data type | Cache TTL | Storage |
|-----------|-----------|---------|
| Destination metadata (descriptions, photos, attributes) | 30 days | CDN / Redis |
| Destination embeddings | 7 days (or on content change) | Vector DB |
| Price search results (specific date/route) | 5–15 minutes | Redis |
| User preference embedding | Until updated by new interaction | Vector DB |
| Flight calendar/price grids | 24 hours | Redis |

### Reference Architecture: Tripadvisor's Semantic Search Engine

Tripadvisor published their semantic search implementation directly. They embed POIs, reviews, and user queries. Their system separates POI embeddings (from structured data) and Review embeddings (from user text), enabling queries to match against both types. Holiday Portfolio can adapt this directly for destinations and user preference profiles.

### Sources
- [Evolving Tripadvisor Search: Semantic Search for Travel — Medium](https://medium.com/tripadvisor/evolving-tripadvisor-search-building-a-semantic-search-engine-for-travel-recommendations-830f464318b7)
- [AI-Driven Search and Personalized Travel Recommendation using RAG — ResearchGate](https://www.researchgate.net/publication/393599105_AI-Driven_Search_and_Personalized_Travel_Recommendation_System_based_on_Retrieval_Augmented_Generator_Framework)
- [Hyper-Local AI Travel Marketplace Using Microservices and Semantic Search — Sciety](https://sciety.org/articles/activity/10.21203/rs.3.rs-8821912/v1)
- [200ms Latency: Real-Time Personalization — InfoWorld](https://www.infoworld.com/article/4134015/the-200ms-latency-a-developers-guide-to-real-time-personalization.html)
- [Duffel API — Official Site](https://duffel.com/)
- [Travel and Booking APIs: Flight and Hotel Data — API7.ai](https://api7.ai/learning-center/api-101/travel-and-booking-apis)
- [Skyscanner Meta-Search Aggregation — Frugal Testing](https://www.frugaltesting.com/blog/skyscanners-meta-search-aggregation-for-travel-deals)

---

## Section E: Cost Modelling at Startup Scale

### Assumptions

- Sessions: 3-4 per user per month
- Queries per session: 10-20 NLP intent parses
- Average query: 300 input tokens, 150 output tokens
- Model: GPT-4o mini for intent parsing (cheapest capable option)
- Embeddings: Re-generated per booking + major preference shift (not per query)
- Vector DB: Qdrant Cloud or Supabase pgvector

### LLM API Cost per User per Month

Using GPT-4o mini ($0.15/1M input, $0.60/1M output):

- Queries per month: 3.5 sessions × 15 queries = ~52 queries/month
- Tokens per month: 52 × 300 input + 52 × 150 output = 15,600 input + 7,800 output
- Monthly cost per user: (15,600 × $0.15/1M) + (7,800 × $0.60/1M) = $0.00234 + $0.00468 = **~$0.007/user/month (~£0.006)**

Even with Claude Sonnet for complex synthesis tasks (10% of queries):
- **Total LLM cost: ~£0.02–0.05/user/month**

This is negligible at startup scale.

### Embedding Generation Cost

Using OpenAI text-embedding-3-small ($0.02/1M tokens):

- Re-embed user profile after each booking: ~1,000 tokens per profile update
- Frequency: ~2-3 bookings/year = ~0.25 updates/month
- Cost: 0.25 × 1,000 × ($0.02/1M) = **$0.000005/user/month**

Near-zero. Embedding costs are not a meaningful budget item at startup scale.

### Infrastructure Cost per Month at Scale

| Scale | LLM APIs | Vector DB | Backend hosting | Redis/cache | Total est. |
|-------|----------|-----------|----------------|-------------|------------|
| 1,000 MAU | £6 | £0 (free) | £30 | £10 | **~£46/month** |
| 10,000 MAU | £60 | £30 | £80 | £20 | **~£190/month** |
| 100,000 MAU | £600 | £150 | £300 | £60 | **~£1,110/month** |
| 500,000 MAU | £3,000 | £600 | £800 | £150 | **~£4,550/month** |

These are AI infrastructure costs only — not development costs, not Duffel API costs (booking-dependent), not general hosting.

### When Does Cost Become Unsustainable?

At £100K total budget and allocating ~40% (£40K) to AI infrastructure runway:
- At £1,110/month: 36 months of runway at 100K MAU — **sustainable**
- At £4,550/month: 9 months of runway at 500K MAU — **borderline, needs revenue by then**

The economics are very favourable at startup scale. The AI stack is cheap when you use lightweight models (Haiku/mini) for high-frequency tasks. The unsustainability cliff appears only if you use Sonnet/GPT-4o for every query, which would be £0.25–0.50/user/month, or £25,000/month at 100K users — ruinous.

**Rule:** Use smallest capable model. Claude 3.5 Haiku or GPT-4o mini for intent parsing. Reserve expensive models for offline batch jobs (profile synthesis, preference summarisation) where you use Batch API at 50% discount.

### Sources
- [LLM API Pricing Comparison 2025 — IntuitionLabs](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)
- [What Does It Cost to Build an AI System in 2025 — BusinessWareTech](https://www.businesswaretech.com/blog/what-does-it-cost-to-build-an-ai-system-in-2025-a-practical-look-at-llm-pricing)
- [OpenAI Embeddings API Pricing — CostGoat](https://costgoat.com/pricing/openai-embeddings)
- [LLM Cost Comparison 2025 — Skywork](https://skywork.ai/skypage/en/LLM-Cost-Comparison-2025-A-Deep-Dive-into-Managing-Your-AI-Budget/1975592241004736512)
- [AI on a Startup Budget — Classic Informatics](https://www.classicinformatics.com/blog/ai-on-a-startup-budget)

---

## Section F: Precedents and Patterns

### Spotify Discover Weekly — Transferable Patterns

Spotify's architecture is the most directly transferable reference for Holiday Portfolio's preference graph approach. Key transferable elements:

1. **Pre-computation over real-time:** Discover Weekly is generated once per week for all users, then cached. At query time, users fetch pre-computed results. This allows computationally expensive ML models that could not run in real-time. Holiday Portfolio can adopt this for weekly "suggested trips" while keeping real-time search for explicit queries.

2. **Taste clustering:** Spotify groups users into taste clusters based on listening patterns, not explicit preferences. Holiday Portfolio's equivalent: cluster users by implicit preference signals (dwell time on destination pages, click patterns, past bookings) using the Two-Tower architecture.

3. **Kafka for real-time event streaming:** Spotify tracks skips, replays, session duration via Kafka. Holiday Portfolio equivalent: track dwell time on destination cards, price-check actions, wishlist additions — these are stronger preference signals than explicit ratings.

4. **Multi-signal fusion:** Spotify uses audio features (CNNs on spectrograms) + collaborative signals + natural language processing of playlist names. Holiday Portfolio: destination attribute embeddings + user behaviour signals + NLP preference extraction from conversations.

### Netflix's SemanticGNN

Netflix's SemanticGNN builds knowledge graphs where nodes are movies, genres, actors, directors — edges encode both collaborative and semantic relationships. When a new title launches with no collaborative data, SemanticGNN uses semantic connections. This directly maps to Holiday Portfolio's new destination problem: a newly added boutique hotel with no booking data can be recommended based on its semantic similarity to properties the user has liked.

### Expedia at Scale

Expedia runs ~600 billion AI predictions annually from 70 petabytes of data. Their two-tower approach for candidate generation is published and documented. The key insight from Expedia's engineering team: combining "traditional AI" (predictive models from behavioural data) with "generative AI" (LLM content creation) produces the best personalisation results — neither alone is sufficient.

### Academic Research (2024-2025)

**SPiKE (Semantic Profiles into Knowledge Graphs)** — paper from January 2025 directly addresses Holiday Portfolio's architecture: combining structured user-item interactions with knowledge graph relations and unstructured text metadata. LLMs are used to enrich user profiles through summarisation, reasoning, and noise reduction of interaction history. This is the most relevant academic reference for the preference graph component.

**KGDAE (Knowledge-Graph-aware Disentangled Auto-Encoder)** — for travel specifically, integrates 23 types of entities and 37 semantic/geographic relationships into a tourism knowledge graph. Demonstrates that explainable recommendation ("we recommended Lisbon because you liked Porto") is achievable with this approach.

**Long-short term interest modelling (2025)** — identifies the gap that most systems miss: users have both stable long-term preferences (always prefers beach over mountains) and volatile short-term preferences (wants an adventure trip next month, not another beach holiday). A robust preference graph must model both.

### Sources
- [Inside Spotify's Recommendation System 2025 — Music Tomorrow](https://www.music-tomorrow.com/blog/how-spotify-recommendation-system-works-complete-guide)
- [How Spotify Recommendation System Works — TechAhead](https://www.techaheadcorp.com/blog/spotify-recommendation-system/)
- [Netflix Recommendation Research](https://research.netflix.com/research-area/recommendations)
- [How Netflix Uses ML — BrainForge AI](https://www.brainforge.ai/blog/how-netflix-uses-machine-learning-ml-to-create-perfect-recommendations)
- [Unlocking AI and GenAI in Travel — Expedia Group Tech / Medium](https://medium.com/expedia-group-tech/unlocking-the-value-of-ai-and-generative-ai-in-travel-2994712d0a0)
- [Elevating Travel Experiences with AI — Expedia Group Tech](https://medium.com/expedia-group-tech/elevating-travel-experiences-with-ai-acdb2cf2ec13)
- [SPiKE: Semantic Profiles into Knowledge Graphs — ArXiv](https://arxiv.org/html/2601.08148v1)
- [Knowledge Graph-Driven Attractions Recommendations — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S095741742500716X)
- [TravelAgent: AI Assistant for Personalized Travel Planning — ArXiv](https://arxiv.org/html/2409.08069v1)
- [AI Recommendation Systems for Early-Stage Startups — Stermedia](https://stermedia.ai/ai-recommendation-systems-for-early-stage-startups/)

---

## Section G: Risk Assessment

### Risk 1: Cold Start Data Flywheel — SEVERITY: HIGH

**Description:** The preference graph is useless with no data. Collaborative filtering is useless below ~5,000-10,000 users. The system must deliver value from day one based on content-based matching alone, while building towards collaborative filtering.

**What looks easy but is hard:** Assuming that the NLP onboarding conversation generates rich enough preference signals to substitute for behavioural data. A user saying "I like warm places" generates a low-entropy preference signal. What the system needs is implicit behavioural signals: which destinations they dwell on, which they skip, what they wishlist but don't book. These take time to accumulate.

**Mitigation:**
- Design the onboarding conversation to be maximally information-dense (ask about best/worst past trips, not abstract preferences)
- Use "travel personality" archetypes as priors (beach relaxer, cultural explorer, adventure seeker, city breaker) — seed user vectors from their archetype until real data accumulates
- Build in a "taste calibration" flow (swipe left/right on destination images, Tinder-style) that generates high-signal preference data in 2 minutes
- Timeline: accept that recommendations won't be meaningfully personalised for first 3-6 months of live operation

---

### Risk 2: Embedding Drift Over Time — SEVERITY: MEDIUM

**Description:** User travel preferences change. A user who loved Magaluf at 22 and Tuscany at 35 needs a preference graph that forgets, not just accumulates. Embedding drift research confirms that static embeddings trained on older data misrepresent newer preferences, causing degraded recommendation performance.

**What looks easy but is hard:** Naive accumulation of preference signals produces a muddled average rather than current intent. The system needs explicit temporal modelling.

**Mitigation:**
- Implement an **adaptive forgetting-weight function**: recent interactions weighted 3-5x more than interactions 2+ years old
- Track **long-term stable preferences** (always books 4-star hotels, never rural retreats) separately from **short-term evolving preferences** (recent interest in Japan after watching a documentary)
- Monitor embedding cosine similarity between user's current profile vector and their vector 6 months ago — sudden large drift is a signal to re-weight heavily towards recent data
- Version embeddings and maintain snapshots for rollback if re-weighting degrades recommendations

---

### Risk 3: 3-Second Latency at Live Inventory Stage — SEVERITY: MEDIUM-HIGH

**Description:** Steps 1-3 of the pipeline (NLP parse + preference lookup + candidate generation) are fast. Step 4 — fetching live prices from Duffel and hotel APIs — is the latency wildcard. Flight search APIs, including Duffel, can take 1-3 seconds when airline GDS systems are under load.

**What looks easy but is hard:** "Just call the API in parallel" — parallel calls help, but don't eliminate the problem when the tail-end API is slow. Under high load (school holiday search peaks), 3 seconds becomes 8 seconds.

**Mitigation:**
- Separate search UX into two stages: **instant personalised discovery** (Step 1-3, < 500ms, returns destination cards with cached indicative pricing) and **live pricing** (Step 4, triggered only when user clicks into a specific destination)
- Never block the initial recommendation display on live API calls
- Use Duffel's cached search endpoints for price-grid data (available before specific date selection)
- Implement circuit breakers: if Duffel response > 2s, show "prices loading" and stream results as they arrive

---

### Risk 4: The "Looks Like ML, Is Actually ETL" Trap — SEVERITY: HIGH

**Description:** Most of the engineering effort in the first 12 months will not be ML. It will be data pipelines, event tracking, preference signal normalisation, inventory schema design, and API integration plumbing. Teams underestimate this and over-invest in model sophistication.

**What senior ML engineers say is the biggest risk:** Unsuccessful recommendation implementations "are far more frequently the result of incorrect sequencing, lack of measurable hypotheses, unclear data strategy or the assumption that advanced modelling alone creates value." Complexity does not necessarily translate to good performance — simple solutions often yield the strongest results.

**Mitigation:**
- Phase 1 MVP: pure vector similarity, no ML framework. User preference vector vs. destination embedding vector. This takes 6-8 weeks to build and generates enough data to validate the concept.
- Phase 2: add collaborative filtering when you have 5,000+ users with meaningful interaction histories
- Phase 3: two-tower neural network only when you have 50,000+ users and a dedicated ML engineer
- Never skip the simple model phase to jump to the sophisticated one

---

### Risk 5: Semantic Preference Graph Architecture Complexity — SEVERITY: MEDIUM

**Description:** Designing the schema for a persistent preference graph that correctly captures multi-dimensional travel identity (long/short term, explicit/implicit signals, contextual variation by trip type) is an unsolved design problem for this product. There is no off-the-shelf solution.

**What looks easy but is hard:** Representing "this user loves culture and food but not if they're travelling with their kids" — contextual preference modulation. Standard vector approaches cannot distinguish between self preferences and trip-context preferences.

**Mitigation:**
- Store separate preference vectors per trip context: `{solo: [...], couple: [...], family: [...], business: [...]}`
- Infer context from booking party composition (Duffel passenger data) and conversation signals
- Accept that this graph design will be iterated substantially based on real user data — don't over-engineer at launch

---

### Risk 6: Over-Dependence on a Single LLM Provider — SEVERITY: LOW-MEDIUM

**Description:** If Anthropic or OpenAI changes pricing, rate limits, or model behaviour, the NLP layer breaks.

**Mitigation:**
- Design the intent parser as an interface: LLM provider is a pluggable dependency
- The prompt and structured output schema should work identically with Claude, GPT-4o mini, and Gemini Flash
- Monitor for model behaviour changes on each provider version update

---

### Risk Matrix Summary

| Risk | Likelihood | Impact | Severity | Mitigation Effort |
|------|-----------|--------|----------|-------------------|
| Cold start data flywheel | High | High | **Critical** | Design onboarding carefully, archetype priors |
| ETL complexity underestimated | High | High | **Critical** | Phase 1 = simple, Phase 2 = ML |
| Live inventory latency | Medium | High | **High** | Two-stage UX, caching, circuit breakers |
| Embedding drift | Medium | Medium | **Medium** | Temporal weighting, versioning |
| Preference graph schema | Medium | Medium | **Medium** | Iterate, don't over-design upfront |
| LLM provider dependence | Low | Medium | **Low** | Provider abstraction layer |

---

## Architecture Recommendation for Startup Scale

### Phase 1 (0–6 months, £15–25K engineering)

**Stack:**
- **NLP:** Claude 3.5 Haiku or GPT-4o mini via API (no fine-tuning)
- **Vector DB:** Supabase pgvector (zero additional cost, integrated with existing Postgres)
- **Embeddings:** OpenAI text-embedding-3-small (1,536 dimensions)
- **Destination knowledge base:** Manual curation of 200-500 destinations with rich attribute text, embedded once
- **Recommendation logic:** Cosine similarity between user preference vector and destination embeddings. No ML framework.
- **Inventory:** Duffel API for flights, direct hotel API integration (1-2 chains)
- **Cache:** Redis (Upstash, free tier / $10/month)

**What this delivers:** A working personalised travel discovery product. User says what they want, system returns 10 relevant destination options with live or near-live pricing. Preference profile persists and improves with each trip.

**What this does not deliver:** Collaborative filtering ("users like you also loved X"), sophisticated temporal modelling, neural ranking.

---

### Phase 2 (6–18 months, £20–35K engineering)

**Add:**
- Collaborative filtering layer once you have 5,000+ users with bookings
- Kafka or equivalent event stream for real-time preference signal capture (dwell time, clicks, wishlists)
- Destination knowledge graph (relationships between destinations, not just attribute vectors)
- A/B testing framework for recommendation algorithm variants

**Retain:**
- All Phase 1 components

---

### Phase 3 (18–36 months, requires dedicated ML hire)

**Add:**
- Two-tower neural architecture (TensorFlow Recommenders) for candidate generation
- Long/short term preference modelling (temporal weighting)
- Fine-tuned embedding model on proprietary travel interaction data

---

## Overall Verdict

**Is this buildable at startup scale within a £50–100K budget?**

**Yes — for the Phase 1 version that delivers genuine business value.**

The numbers work:
- AI infrastructure: £46/month at 1K users, £190/month at 10K users — negligible
- Phase 1 build cost: £15–25K engineering time
- Phase 2 build cost: £20–35K additional
- Total to a production-grade personalised travel discovery product: £35–60K

The technology is proven:
- LLM intent parsing: production-ready at commodity cost
- Vector similarity search: solved problem, extremely cheap
- Preference graph concept: academically validated, implementable with current tools
- Travel inventory integration (Duffel): developer-friendly, booking-fee model only

The real constraints are:
1. **Time to data:** The preference graph only becomes powerful with real user interaction data. Budget for 6-12 months of meaningful operation before the system feels "magical."
2. **Sequencing discipline:** Teams that try to build Phase 3 architecture at Phase 1 scale consistently fail. Start simple, iterate.
3. **The inventory problem:** Real-time travel pricing is volatile. The UX must be designed to accommodate this (two-stage search, price alerts) not fight it.

The competitive moat — if built correctly — is the preference graph. Every competitor has LLM access and Duffel API access. Nobody has your users' persistent travel identity, built from NLP conversations, behavioural signals, and actual bookings over time. That is the durable asset. Build it from day one.

---

## All Sources

### Section A
- [Assessing LLMs for intent detection in tourism chatbots — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S246822762500119X)
- [Intent-Driven NLI: Hybrid LLM + Intent Classification — Medium](https://medium.com/data-science-collective/intent-driven-natural-language-interface-a-hybrid-llm-intent-classification-approach-e1d96ad6f35d)
- [Natural Language Search with LLMs — Medium Bootcamp](https://medium.com/design-bootcamp/search-components-with-llms-natural-language-interactions-5e913f3c7326)
- [Query Understanding with LLMs — OpenSource Connections](https://opensourceconnections.com/blog/2024/02/20/what-do-you-actually-mean-query-understanding-with-llms/)
- [Claude API Pricing — Anthropic](https://platform.claude.com/docs/en/about-claude/pricing)
- [LLM API Pricing Comparison 2025 — IntuitionLabs](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)

### Section B
- [Vector Database Comparison 2025 — LiquidMetal AI](https://liquidmetal.ai/casesAndBlogs/vector-comparison/)
- [Vector Database Comparison 2025 — TensorBlue](https://tensorblue.com/blog/vector-database-comparison-pinecone-weaviate-qdrant-milvus-2025)
- [Pinecone vs Qdrant vs Weaviate — Xenoss](https://xenoss.io/blog/vector-database-comparison-pinecone-qdrant-weaviate)
- [pgvector vs Pinecone: cost and performance — Supabase](https://supabase.com/blog/pgvector-vs-pinecone)
- [pgvectorscale faster than Pinecone at 75% less cost — Tiger Data](https://www.tigerdata.com/blog/pgvector-is-now-as-fast-as-pinecone-at-75-less-cost)
- [Why we replaced Pinecone with PGVector — Confident AI](https://www.confident-ai.com/blog/why-we-replaced-pinecone-with-pgvector)
- [OpenAI text-embedding-3-small pricing — Helicone](https://www.helicone.ai/llm-cost/provider/openai/model/text-embedding-3-small)
- [OpenAI Embeddings — Official Docs](https://developers.openai.com/api/docs/guides/embeddings/)
- [How many embedding dimensions? — Particula Tech](https://particula.tech/blog/embedding-dimensions-rag-vector-search)
- [Qdrant Pricing — Official](https://qdrant.tech/pricing/)
- [Best Vector Databases 2026 — Firecrawl](https://www.firecrawl.dev/blog/best-vector-databases)

### Section C
- [Deep Neural Collaborative Filtering for Travel — Nature](https://www.nature.com/articles/s41598-025-34585-0)
- [Personalized Hybrid Tourist Destination Recommendation — IJACSA](https://thesai.org/Downloads/Volume15No8/Paper_3-A_Personalized_Hybrid_Tourist_Destination_Recommendation_System.pdf)
- [Travel Recommendation: Collaborative and Content-Based — IEEE](https://ieeexplore.ieee.org/iel7/9579467/9579470/09579907.pdf)
- [Two-Tower Candidate Generation at Expedia — Medium](https://medium.com/expedia-group-tech/candidate-generation-using-a-two-tower-approach-with-expedia-group-traveler-data-ca6a0dcab83e)
- [Two-Tower Architecture Deep Dive — Shaped AI](https://www.shaped.ai/blog/the-two-tower-model-for-recommendation-systems-a-deep-dive)
- [Google Cloud Two-Tower Retrieval Documentation](https://docs.cloud.google.com/architecture/implement-two-tower-retrieval-large-scale-candidate-generation)
- [Cold Start Problem — FreeCodeCamp](https://www.freecodecamp.org/news/cold-start-problem-in-recommender-systems/)
- [Cold Start Problem — Wikipedia](https://en.wikipedia.org/wiki/Cold_start_(recommender_systems))
- [Solving Cold Start — Things Solver](https://thingsolver.com/blog/the-cold-start-problem/)
- [How Hopper Uses AI — Built In Boston](https://www.builtinboston.com/articles/spotlight-working-at-hopper-engineering-data)
- [Hopper: Using AI to Plan Your Vacation — Harvard Digital](https://d3.harvard.edu/platform-digit/submission/hopper-using-ai-to-plan-your-next-vacation/)
- [NVIDIA Merlin Framework](https://developer.nvidia.com/merlin)
- [TensorFlow Recommenders](https://www.tensorflow.org/recommenders)

### Section D
- [Evolving Tripadvisor Search: Semantic Search — Medium](https://medium.com/tripadvisor/evolving-tripadvisor-search-building-a-semantic-search-engine-for-travel-recommendations-830f464318b7)
- [AI-Driven Personalized Travel Recommendation using RAG — ResearchGate](https://www.researchgate.net/publication/393599105_AI-Driven_Search_and_Personalized_Travel_Recommendation_System_based_on_Retrieval_Augmented_Generator_Framework)
- [Hyper-Local AI Travel Marketplace Using Microservices — Sciety](https://sciety.org/articles/activity/10.21203/rs.3.rs-8821912/v1)
- [200ms Latency: Developer Guide to Real-Time Personalization — InfoWorld](https://www.infoworld.com/article/4134015/the-200ms-latency-a-developers-guide-to-real-time-personalization.html)
- [Duffel API — Official](https://duffel.com/)
- [How to Integrate Duffel API — Guru Techno Labs](https://www.gurutechnolabs.com/how-to-integrate-duffel-flight-api-into-your-travel-platform/)
- [Travel and Booking APIs — API7.ai](https://api7.ai/learning-center/api-101/travel-and-booking-apis)
- [Skyscanner Meta-Search Aggregation — Frugal Testing](https://www.frugaltesting.com/blog/skyscanners-meta-search-aggregation-for-travel-deals)

### Section E
- [LLM API Pricing Comparison 2025 — IntuitionLabs](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)
- [What Does It Cost to Build an AI System in 2025 — BusinessWareTech](https://www.businesswaretech.com/blog/what-does-it-cost-to-build-an-ai-system-in-2025-a-practical-look-at-llm-pricing)
- [OpenAI Embeddings API Pricing Calculator — CostGoat](https://costgoat.com/pricing/openai-embeddings)
- [LLM Cost Comparison 2025 — Skywork](https://skywork.ai/skypage/en/LLM-Cost-Comparison-2025-A-Deep-Dive-into-Managing-Your-AI-Budget/1975592241004736512)
- [AI on a Startup Budget — Classic Informatics](https://www.classicinformatics.com/blog/ai-on-a-startup-budget)
- [AI SaaS Product Development Cost — Biz4Group](https://www.biz4group.com/blog/ai-saas-product-development-cost)

### Section F
- [Inside Spotify's Recommendation System 2025 — Music Tomorrow](https://www.music-tomorrow.com/blog/how-spotify-recommendation-system-works-complete-guide)
- [Spotify Recommendation System — TechAhead](https://www.techaheadcorp.com/blog/spotify-recommendation-system/)
- [Spotify Song Recommendation Systems — PyImageSearch](https://pyimagesearch.com/2023/10/30/spotify-music-recommendation-systems/)
- [Netflix Recommendation Research — Netflix Research](https://research.netflix.com/research-area/recommendations)
- [How Netflix Uses ML — BrainForge AI](https://www.brainforge.ai/blog/how-netflix-uses-machine-learning-ml-to-create-perfect-recommendations)
- [Netflix Architecture — Medium](https://shilpathota.medium.com/do-you-know-architecture-of-recommendation-system-at-netflix-f49786ca083b)
- [Unlocking AI in Travel — Expedia Group Tech](https://medium.com/expedia-group-tech/unlocking-the-value-of-ai-and-generative-ai-in-travel-2994712d0a0)
- [SPiKE: Semantic Profiles into Knowledge Graphs — ArXiv](https://arxiv.org/html/2601.08148v1)
- [Knowledge Graph-Driven Recommendations — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S095741742500716X)
- [Towards Travel Recommendation Interpretability via Knowledge Graph — ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0306457323001061)
- [TravelAgent: AI Assistant — ArXiv](https://arxiv.org/html/2409.08069v1)
- [AI Recommendation Systems for Startups — Stermedia](https://stermedia.ai/ai-recommendation-systems-for-early-stage-startups/)

### Section G
- [Embedding Drift Impact and Management — Milvus](https://milvus.io/ai-quick-reference/what-is-the-impact-of-embedding-drift-and-how-do-i-manage-it/)
- [Modelling Concept Drift in Dynamic Data Streams — ACM](https://dl.acm.org/doi/10.1145/3707693)
- [Capturing Dynamic User Preferences — MDPI Systems](https://www.mdpi.com/2079-8954/13/11/1034)
- [Algorithmic Drift in Recommender Systems — ArXiv](https://arxiv.org/html/2409.16478v1)
- [Challenges in Building AI Recommendation Systems — IT Convergence](https://www.itconvergence.com/blog/challenges-and-solutions-for-building-effective-recommendation-systems/)
- [AI Recommendation Systems for Early-Stage Startups — Stermedia](https://stermedia.ai/ai-recommendation-systems-for-early-stage-startups/)
- [Recommendation Systems Architect's Playbook — The ML Architect](https://themlarchitect.com/blog/recommendation-systems-an-architects-playbook-part-1/)

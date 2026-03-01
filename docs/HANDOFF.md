# Roami — Project Handoff

**Date:** 2026-03-01
**From:** ProveIt validation sessions → Roami production codebase
**Status:** Live at https://roami.world

---

## Current Status & Direction (2026-03-01)

### What Roami is today

An NLP-powered city break search engine with real flight data. Users type natural language queries ("somewhere warm, good food, under £400"), Claude Haiku parses intent, Duffel API returns real flights, and a 5-factor deal confidence scoring model rates each result. A pricing engine provides session-level personalisation and budget context. This is live at roami.world.

### What's next

Get city breaks working end-to-end for friends testing:
1. **Hotels** — activate Duffel Stays (needs sales contact) or alternative hotel source
2. **Booking flow** — move from "View Deal" to actual checkout
3. **Friends testing** — give 10-20 friends access, collect qualitative feedback on whether they'd actually use this for real trips

### Strategic context

This is a **deliberate thin-slice approach**, not a prototype or demo. The original strategy called for landing page validation before building. That was attempted but the landing page wasn't usable for meaningful testing. The pivot: build the thinnest possible working product and validate through real usage by friends instead of proxy metrics.

The full strategy analysis (13 framework artefacts in `docs/strategy/`) remains valid. The three core cruxes — booking leakage, cold start paradox, affiliate cash flow trap — are unchanged. The difference is how we validate: live product with real users, not landing page conversion rates.

See `docs/strategy/00-gap-analysis.md` (Strategy Pivot section) for the full rationale.

### Economics

Acceptable to run at a loss or break-even during friends testing. API costs (Duffel at $3/order + 1%, Claude Haiku at ~£0.006/user/month) are manageable at 10-20 users. Revenue is not the goal right now — honest product feedback is.

---

## What Roami Is

A travel personalisation engine that learns how you travel, finds deals you'd love, and manages your year of trips. City breaks are the entry hook; the portfolio view is the loyalty layer. NLP input (not filters), semantic preference graph, visible preference profile.

**Confidence scores (6 research rounds):** Desirability 8/10 | Viability 7/10 | Feasibility 8/10

**One-liner:** "Start with one trip. See where the year takes you."

---

## What's Built and Live

### Product
- **NLP search** — natural language query → Claude Haiku parses intent → Duffel API returns real flights
- **Deal cards** — real-time flight prices, deal confidence scoring, airline info, savings vs market average
- **Preference panel** — shows inferred travel preferences from query (confidence %)
- **Waitlist** — email capture with variant tracking, stored via API

### Tech Stack
- Next.js 16.1.6 (App Router), TypeScript, Tailwind CSS 4
- Claude Haiku (NLP parsing) via `@anthropic-ai/sdk`
- Duffel API (flights) via `@duffel/api` — sandbox mode
- Vercel (hosting, serverless functions)
- GitHub Actions (Codex auto-review on PRs)

### Architecture
```
User query → POST /api/search → Claude Haiku (parse) → Duffel (flights) → Deal builder → Response
                                                      → Duffel Stays (403 — needs sales contact)
```

### Key Files
| File | Purpose |
|------|---------|
| `src/app/api/search/route.ts` | Main search API — rate limiting, validation, orchestration |
| `src/lib/nlp-parser.ts` | Claude Haiku NLP intent extraction |
| `src/lib/duffel-client.ts` | Duffel flights + stays client |
| `src/lib/deal-builder.ts` | Bundle flights into Deal objects with confidence scoring |
| `src/lib/search-engine.ts` | Mock fallback (27 hardcoded deals) |
| `src/components/demo/NlpSearchDemo.tsx` | Search hero — the main product UI |
| `src/components/demo/DealCard.tsx` | Deal result cards |
| `src/types/index.ts` | All TypeScript interfaces |

### Environment Variables (`.env.local`)
```
ANTHROPIC_API_KEY=sk-ant-...
DUFFEL_API_TOKEN=duffel_test_...
OPENAI_API_KEY=sk-proj-...  (for Codex PR reviews)
```

---

## What's Not Built Yet

### Immediate (from issues log)
See `docs/issues-log.md` for full backlog. Key items:
- **Duffel Stays API** — returns 403, need to contact Duffel sales for access
- **Hotel bundling** — flights work, hotels are placeholder pricing
- **Origin airport selection** — hardcoded to LHR, should be configurable
- **Caching** — no flight result caching, every search hits Duffel
- **Error UX** — generic error messages, no retry with modified query

### Product Roadmap (from strategy)
See `docs/strategy/13-phase-1-plan.md` for full Phase 1 plan:
1. **Preference graph** — persist user preferences across sessions (vector DB)
2. **Portfolio view** — budget tracker, trip history, planned trips
3. **Booking flow** — move from "View Deal" → actual checkout
4. **Revenue** — commission via Duffel, bed bank net rates, dynamic packaging

---

## Business Analysis & Research

All ProveIt validation work has been copied into this repo:

### `docs/business/`
| File | Contents |
|------|----------|
| `discovery.md` | Full product discovery — idea evolution, architecture, USPs, risks, confidence scores |
| `validation-playbook.md` | 8-week pre-build validation programme (Gates 1-3), budget, risk register |

### `docs/strategy/` (14 framework analyses)
| File | Framework |
|------|-----------|
| `00-gap-analysis.md` | **Start here** — comprehensive index with gaps and owners |
| `01-bmc-current.md` | Business Model Canvas (current state) |
| `02-bmc-target.md` | Business Model Canvas (target state) |
| `03-value-proposition-canvas.md` | Value Proposition Design |
| `04-swot-confrontation.md` | SWOT + Confrontation Matrix |
| `05-five-forces.md` | Porter's 5 Forces |
| `06-blue-ocean.md` | Blue Ocean Strategy |
| `07-five-choices.md` | Playing to Win (5 Choices) |
| `08-strategy-kernel.md` | Rumelt Strategy Kernel |
| `09-wardley-map.md` | Wardley Mapping (build vs buy) |
| `10-opportunity-trees.md` | Opportunity Solution Trees |
| `11-wwhtbt-conditions.md` | What Would Have To Be True |
| `12-decision-tree.md` | Decision Tree (phase gates) |
| `13-phase-1-plan.md` | Phase 1 Execution Plan |

### `docs/research/` (18 files)
| Files | Contents |
|-------|----------|
| `research-1.md` | Initial market research |
| `research-3-ai-travel.md` | AI travel competitor analysis (Mindtrip, Romie, etc.) |
| `research-4-tech-feasibility.md` | Technical feasibility assessment |
| `research-5-revenue-models.md` | Revenue model analysis |
| `research-5-revenue-risks.md` | Revenue risk assessment |
| `research-6-bed-banks.md` | Bed bank economics deep-dive |
| `swarm-1-*.md` (6 files) | Research swarm round 1 (bull, bear, technical, customer, devil's advocate, synthesis) |
| `swarm-2-*.md` (6 files) | Research swarm round 2 |

### Obsidian Vault (external reference)
Strategy analyses also live in the Obsidian vault for browsing with graph view and backlinks:
- `~/claudesidian/Strategy/holiday-portfolio-2026/` — full 14-file strategy analysis (latest)
- `~/claudesidian/Strategy/holiday-portfolio/` — earlier iteration (BMC + VPC only)

These are the same frameworks as `docs/strategy/` but may be browsed more easily in Obsidian.

### `docs/` (existing)
| File | Contents |
|------|----------|
| `api-architecture.md` | API route design and Duffel integration docs |
| `issues-log.md` | Full issue tracker (7 done, 16 backlog) |
| `style-guide.md` | Design system and component guidelines |
| `tone-of-voice.md` | Brand voice guide |

---

## 6 USPs vs Competitors

1. **NLP input** — "somewhere warm, good food, under £400" not destination + dates + filters
2. **Semantic preference graph** — learns how *you* travel, not just what you search
3. **Visible preference profile** — "here's what we think you like, is this right?"
4. **Portfolio thinking** — your year of travel managed as a set, not individual bookings
5. **Deal confidence scoring** — transparent "why this deal is good" with rationale
6. **Conversation-driven discovery** — chat to plan, not click to filter

---

## Next Session Checklist

When continuing in `/Users/clairedonald/roami`:

- [ ] Read `docs/HANDOFF.md` (this file) for full context
- [ ] Read `docs/business/discovery.md` for product vision and architecture
- [ ] Read `docs/issues-log.md` for open backlog
- [ ] Check `docs/strategy/00-gap-analysis.md` for strategic gaps to address
- [ ] Contact Duffel sales for Stays API access
- [ ] Run `npm run dev` — site runs on localhost:3000
- [ ] Production is live at https://roami.world

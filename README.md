# ORIAN.Data — AI-Native Data Platform Accelerator

An immersive, narrative-driven single-page experience for **ORIAN.Data** by Xoriant. Built to demonstrate the "Data with Intent" philosophy — not a corporate brochure, but a product experience. Think Palantir meets Stripe: precise, intelligent, purposeful.

## Overview

The site guides visitors through a deliberate 8-section narrative journey — from provocation to action:

| # | Section | Nav Label | Theme | Description |
|---|---------|-----------|-------|-------------|
| 1 | Hero | Home | Provocation | Animated semantic D3 graph, bold opening statement, CTA |
| 2 | Inversion | Philosophy | Philosophy | "Data with Intent" concept reveal via scroll-triggered counters and timeline |
| 3 | Architecture | Architecture | Platform | Interactive D3.js force-directed knowledge graph of all 17 ORIAN.Data components |
| 4 | Proof | Industries | Validation | 20 use cases across 5 industries in a 2×2 card grid with FieldNotes |
| 5 | Acceleration | AI Gap | AI productivity gap | Animated counters, bar chart, code comparison, root cause explorer, acceleration math calculator |
| 6 | Maturity | Where Are You? | Self-assessment | 5-level maturity framework with interactive assessment quiz and radar chart |
| 7 | ROI | ROI Calculator | Conversion | Interactive ROI calculator with compounding effect charts and day-one value timeline |
| 8 | Planner | Solution Planner | Action | AI-powered solution planner backed by a Netlify serverless function |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **React 18** + **Vite 5** |
| Language | **TypeScript 5** — fully typed |
| Styling | **Tailwind CSS 3** with custom design tokens |
| Graph/Viz | **D3.js 7** — knowledge graph and semantic graph animations |
| Animation | **Framer Motion 12** — scroll-triggered reveals, layout animations, AnimatePresence |
| Charts | **Recharts 3** — ROI timeline, value breakdown, compounding effect |
| Backend | **Netlify Functions** — serverless API proxy for Solution Planner |
| Fonts | **Roboto** (body/serif), **JetBrains Mono** (code/mono) via Google Fonts |

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- npm (bundled with Node.js)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
OrionData_Webapp/
├── public/                               # Static assets (favicon, og image, etc.)
├── src/
│   ├── components/
│   │   ├── Hero/                         # Section 1: Hero + animated semantic graph
│   │   │   ├── Hero.tsx
│   │   │   ├── SemanticGraph.tsx         # D3.js particle/node animation
│   │   │   └── graphData.ts
│   │   ├── Inversion/                    # Section 2: Philosophy reveal
│   │   │   ├── InversionSection.tsx
│   │   │   ├── MetricCounters.tsx        # Animated stat counters
│   │   │   └── TimelineComparison.tsx    # Before/after timeline
│   │   ├── Architecture/                 # Section 3: D3 knowledge graph
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── KnowledgeGraph.tsx        # Force-directed D3 graph
│   │   │   ├── DeliveryChannelBar.tsx    # Channel filter bar
│   │   │   ├── MobileAccordion.tsx       # Mobile fallback accordion
│   │   │   └── NodeTooltip.tsx
│   │   ├── Proof/                        # Section 4: Industry use cases
│   │   │   ├── ProofSection.tsx          # 5 industries × 4 use cases (2×2 grid)
│   │   │   ├── IndustrySelector.tsx      # Tab selector with case counts
│   │   │   ├── UseCaseCard.tsx           # Individual case card
│   │   │   └── FieldNote.tsx             # Sticky-note style annotation
│   │   ├── Acceleration/                 # Section 5: AI productivity gap
│   │   │   ├── AccelerationSection.tsx   # Orchestrator with animated counters + bar chart
│   │   │   ├── acceleration-data.ts      # All static data, formulas, types
│   │   │   ├── CodeComparison.tsx        # Side-by-side AI code panels
│   │   │   ├── RootCauseExplorer.tsx     # 5-card expandable root cause grid
│   │   │   ├── RootCauseCard.tsx         # Individual expand/collapse card with SVG icons
│   │   │   └── AccelerationMath.tsx      # Team size slider + comparison table + ROI callout
│   │   ├── MaturityFramework/            # Section 6: Maturity assessment
│   │   │   ├── MaturityFrameworkSection.tsx
│   │   │   ├── MaturityAssessment.tsx    # Multi-step quiz
│   │   │   ├── MaturityLevel.tsx         # Level indicator
│   │   │   ├── MaturityResult.tsx        # Results display with radar chart
│   │   │   └── MiniConstellation.tsx     # Decorative node constellation
│   │   ├── Section5_ROI/                 # Section 7: ROI calculator
│   │   │   ├── ROISection.tsx
│   │   │   ├── InputPanel.tsx            # Team size, volume, scope inputs
│   │   │   ├── OutputPanel.tsx           # Calculated results
│   │   │   ├── TimelineChart.tsx         # Recharts ROI over time
│   │   │   ├── ValueBreakdown.tsx        # Per-component value bars
│   │   │   ├── AccelerationMetrics.tsx   # Efficiency metrics
│   │   │   ├── CompoundingEffect.tsx     # Compounding ROI visualization
│   │   │   ├── DayOneTimeline.tsx        # Day 1 value delivery timeline
│   │   │   └── roiCalculations.ts        # All ROI formula logic
│   │   ├── Planner/                      # Section 8: AI solution planner
│   │   │   ├── PlannerSection.tsx
│   │   │   ├── ChatInterface.tsx         # Conversational input
│   │   │   ├── SolutionPlan.tsx          # Recommended architecture display
│   │   │   ├── EngagementCTA.tsx         # Conversion CTA
│   │   │   └── PlannerAPI.ts             # Netlify function API client
│   │   ├── BackgroundLayer.tsx           # Persistent depth/particle background
│   │   ├── Navigation.tsx                # Scroll-aware dot navigation (8 sections)
│   │   └── ui/
│   │       └── Button.tsx                # Shared button primitive
│   ├── context/
│   │   └── AppContext.tsx                # Global app state (theme, active section)
│   ├── hooks/
│   │   ├── useGraphData.ts               # Loads and parses orian-knowledge-graph.json
│   │   └── useScrollSection.ts           # IntersectionObserver section tracking
│   ├── data/
│   │   └── orian-knowledge-graph.json    # Canonical copy of knowledge graph
│   ├── types/                            # Shared TypeScript type definitions
│   ├── App.tsx                           # Root component — lazy loads sections 4–8
│   ├── main.tsx                          # Entry point
│   └── index.css                         # Global styles, Tailwind base, CSS variables
├── netlify/
│   └── functions/                        # Serverless API functions (Solution Planner)
├── orian-knowledge-graph.json            # Source-of-truth knowledge graph (root)
├── netlify.toml                          # Netlify build + redirect + security header config
├── tailwind.config.ts                    # Custom color tokens, font families
├── vite.config.ts
└── tsconfig.json
```

---

## Key Data File

**`orian-knowledge-graph.json`** is the single source of truth for all platform component data. It contains:

- All 17 ORIAN.Data components with names, descriptions, pillars, and short names
- Graph edges representing data flow relationships
- Delivery channel metadata
- Industry-specific ontologies (BFSI, Healthcare, Retail, Manufacturing, Energy)
- Use cases with outcomes, metrics, and FieldNote annotations
- Value chain paths used by the ROI calculator

The file lives at both the project root and `src/data/` — the `src/data/` copy is what the app imports at runtime.

---

## Design System

The site uses a **light theme** with clean whites and grays, accented by four pillar colors tied to ORIAN.Data's platform pillars:

### CSS Variables (index.css)

| Variable | Purpose |
|----------|---------|
| `--bg-deep` | Page background (`#ffffff`) |
| `--bg-primary` | Section background (`#f8f9fa`) |
| `--bg-surface` | Elevated surface (`#f1f3f5`) |
| `--bg-card` | Card background (`#ffffff`) |
| `--text-primary` | Headings (`#111827`) |
| `--text-secondary` | Body text (`#374151`) |
| `--text-muted` | Labels, captions (`#6b7280`) |
| `--border-subtle` | Card/section borders (`#e5e7eb`) |

### Tailwind Accent Colors

| Token | Hex | Pillar |
|-------|-----|--------|
| `teal` | `#00b23b` | Foundation / semantic correctness |
| `ai` | `#a78bfa` | AI-led engineering (violet) |
| `trust` | `#f5a623` | Trust & governance (amber) |
| `foundation` | `#3b82f6` | Data foundation (blue) |

### Typography

- **Serif / body**: Roboto (maps to `font-sans` and `font-serif` in Tailwind config)
- **Mono**: JetBrains Mono (maps to `font-mono`)

---

## Sections in Detail

### Section 1 — Hero
Animated semantic graph built with D3.js. Orbiting nodes represent data assets; edges pulse to convey real-time semantic intelligence. Bold headline and a primary CTA set the platform's tone.

### Section 2 — Inversion
Challenges conventional data thinking with animated metric counters (maintenance time, deployment cycles, DQ incidents) and a before/after timeline comparison. Reveals the "Data with Intent" philosophy.

### Section 3 — Architecture
Interactive D3.js force-directed graph of all 17 ORIAN.Data components. Nodes are colour-coded by pillar; clicking a node reveals a tooltip with component description. Filterable by delivery channel. Mobile: accordion fallback.

### Section 4 — Proof
Evidence-first section. 5 industry tabs (BFSI, Healthcare, Retail, Manufacturing, Energy) each show exactly 4 use cases in a responsive 2×2 grid. Each `UseCaseCard` includes outcome metrics and a `FieldNote` sticky annotation positioned absolutely on desktop. Industry selector displays case counts as `(4)` per tab. Total: 20 use cases.

### Section 5 — Acceleration (AI Gap)
The core differentiator narrative:

- **Animated headline counters**: Web dev AI productivity = **55.8%** (green), Data engineering = **12.5%** (red) — count up on scroll using `requestAnimationFrame` with cubic ease-out.
- **Productivity gap bar chart**: Three animated bars — web dev (55.8%), data eng without ORIAN (12.5%), data eng with ORIAN (25–35%) — animated via Framer Motion `whileInView`.
- **Code Comparison** (`CodeComparison.tsx`): Side-by-side panels on dark background (`#0f172a`). Line-level coloring for comment/error/success/code types. Mobile: tab toggle between "✗ Generic AI" and "✓ ORIAN.Data".
- **Root Cause Explorer** (`RootCauseExplorer.tsx` + `RootCauseCard.tsx`): 5 expandable cards — Schema Opacity, Stateful Pipeline Complexity, Business Rule Complexity, Testing Culture Gap, Semantic Context Starvation. Desktop: 3+2 grid. Mobile: vertical accordion. The final card (`isClimax: true`) gets a special callout.
- **Acceleration Math** (`AccelerationMath.tsx`): Slider (team size 5–200). Outputs effective team size, maintenance time, pipeline deploy speed, DQ incidents. Annual value callout pulses when ≥ $1M. CTA scrolls to `#planner`.

All sub-sections use `motion.div` with `initial={{ opacity: 0, y: 16 }}` scroll reveals.

### Section 6 — Maturity Framework ("Where Are You?")
Interactive self-assessment across 5 maturity levels. Multi-step quiz with animated question transitions. Results show current level with a radar/constellation visualization and a recommended ORIAN.Data adoption path. Primary CTA: "Start Unlocking Insights".

### Section 7 — ROI Calculator
Interactive inputs for team size, data volume, and project scope. Outputs:
- Compounding ROI over 36 months (Recharts area chart)
- Day-one value delivery timeline
- Per-component value breakdown (OrionDQ, Transform, Catalog, etc.)
- Acceleration metrics (maintenance reduction, deployment speed, DQ incident reduction)

All calculations are in `roiCalculations.ts`.

### Section 8 — Solution Planner
Conversational AI planner. The user describes their use case; a Netlify serverless function calls the Claude API and returns a tailored ORIAN.Data architecture recommendation rendered as a structured solution plan.

---

## Performance

- Sections 1–3 are eagerly loaded (Hero, Inversion, Architecture)
- Sections 4–8 are **lazy-loaded** via `React.lazy` + `Suspense` with a spinner fallback, keeping the initial bundle small
- Active section tracking uses `IntersectionObserver` via `useScrollSection` hook

---

## Deployment

Deployed on **Netlify**. The `netlify.toml` configures:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Serverless functions**: `netlify/functions`
- **SPA redirect**: all `/*` routes → `index.html` (200 status)
- **Security headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`

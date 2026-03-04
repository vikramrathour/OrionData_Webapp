# ORIAN.Data — AI-Native Data Platform Accelerator

An immersive, cinematic single-page experience website for **ORIAN.Data** by Xoriant. Built to demonstrate the "Data with Intent" philosophy — not a corporate brochure, but a product experience. Think Palantir meets Stripe: dark, intelligent, alive.

## Overview

The site guides visitors through a narrative journey across 6 scroll sections:

| Section | Theme | Description |
|---|---|---|
| 1 — Hero | Provocation | Animated semantic graph, bold opening statement |
| 2 — Inversion | Philosophy | "Data with Intent" concept reveal |
| 3 — Architecture | Platform | Interactive D3.js knowledge graph of all 17 ORIAN components |
| 4 — Proof | Validation | Real-world outcomes and case evidence |
| 5 — ROI | Conversion | Interactive ROI calculator with compounding effect visualization |
| 6 — Planner | Action | AI-powered solution planner (Netlify serverless function) |

## Tech Stack

- **React 18** + **Vite 5** — fast dev and build
- **TypeScript 5** — fully typed
- **Tailwind CSS 3** — dark theme design system
- **D3.js 7** — knowledge graph and semantic graph animations
- **Framer Motion 12** — scroll-triggered animations and UI transitions
- **Recharts 3** — ROI charts and timeline visualizations
- **Netlify Functions** — serverless API proxy for the Solution Planner
- **Google Fonts** — Roboto (body), JetBrains Mono (code labels)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

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

## Project Structure

```
OrionData_Webapp/
├── public/                        # Static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── Hero/                  # Section 1: Hero + semantic graph
│   │   │   ├── Hero.tsx
│   │   │   ├── SemanticGraph.tsx
│   │   │   └── graphData.ts
│   │   ├── Inversion/             # Section 2: Philosophy reveal
│   │   ├── Architecture/          # Section 3: D3 knowledge graph
│   │   ├── Proof/                 # Section 4: Proof/outcomes
│   │   ├── Section5_ROI/          # Section 5: ROI calculator
│   │   │   ├── ROISection.tsx
│   │   │   ├── InputPanel.tsx
│   │   │   ├── OutputPanel.tsx
│   │   │   ├── TimelineChart.tsx
│   │   │   ├── ValueBreakdown.tsx
│   │   │   ├── AccelerationMetrics.tsx
│   │   │   ├── CompoundingEffect.tsx
│   │   │   ├── DayOneTimeline.tsx
│   │   │   └── roiCalculations.ts
│   │   ├── Planner/               # Section 6: AI solution planner
│   │   ├── BackgroundLayer.tsx    # Persistent depth/particle layer
│   │   ├── Navigation.tsx         # Scroll-aware nav
│   │   └── ui/                    # Shared UI primitives
│   ├── context/
│   │   └── AppContext.tsx          # Global app state
│   ├── hooks/
│   │   ├── useGraphData.ts         # Loads orian-knowledge-graph.json
│   │   └── useScrollSection.ts     # Scroll-snap section tracking
│   ├── data/                       # Static data files
│   ├── types/                      # TypeScript type definitions
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles / Tailwind base
├── netlify/
│   └── functions/                  # Serverless API functions
├── orian-knowledge-graph.json      # Single source of truth: 17 components, edges, ontologies
├── netlify.toml                    # Netlify build + redirect config
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

## Key Data File

`orian-knowledge-graph.json` is the **single source of truth** for all platform component data. It contains all 17 ORIAN.Data components, graph edges, delivery channels, industry ontologies, use cases, and value chain paths. It is loaded once and passed through to all sections that need it.

## Design System

The site uses a dark, deep-space color palette with four pillar accent colors:

| Pillar | Color |
|---|---|
| Foundation | `#3b82f6` (blue) |
| Semantic | `#00d4aa` (teal) |
| AI | `#a78bfa` (violet) |
| Trust | `#f5a623` (amber) |

Background depths range from `#060d1a` (deepest) to `#0f1e37` (surface). Every animation is conceptual — no decorative motion.

## Deployment

Deployed on **Netlify**. The `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `dist`
- Serverless functions: `netlify/functions`
- SPA redirect: all routes → `index.html`
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`

## Sections in Detail

### Section 1 — Hero
Animated semantic graph built with D3.js conveys real-time data intelligence. Bold headline and CTA set the tone.

### Section 2 — Inversion
Challenges conventional data thinking. Reveals the "Data with Intent" philosophy through scroll-triggered reveals.

### Section 3 — Architecture
Interactive D3.js force-directed graph of all 17 ORIAN.Data components. Nodes filterable by pillar; edges show data flow relationships.

### Section 4 — Proof
Outcome-driven evidence: case metrics, acceleration benchmarks, and real delivery timelines.

### Section 5 — ROI Calculator
Interactive inputs for team size, data volume, and project scope. Outputs compounding ROI over time with day-one value timeline and value breakdown charts (Recharts).

### Section 6 — Solution Planner
AI-powered planner backed by a Netlify serverless function. Visitors describe their use case and receive a tailored ORIAN.Data architecture recommendation.

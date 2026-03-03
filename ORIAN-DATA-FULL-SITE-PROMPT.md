# ORIAN.Data Experience Website — Complete Build Prompt

## OVERVIEW

Build an immersive, cinematic experience website for ORIAN.Data — an AI-native data platform accelerator by Xoriant. This is NOT a corporate brochure site. It's a product experience that demonstrates the "Data with Intent" philosophy on the visitor themselves. Think Palantir meets Stripe — dark, intelligent, alive.

The website has 5 scroll sections on a single page. Each section is a narrative "act" that builds on the previous one. The visitor journey is: provocation → philosophy → architecture → proof → conversion.

## REFERENCE FILES

- `orian-knowledge-graph.json` — Complete ontology data with all 17 components, edges, delivery channels, industry ontologies, use cases, and value chain paths. This is the SINGLE SOURCE OF TRUTH for all component data. Load it once and pass it through to all sections that need it.
- `CLAUDE-CODE-PROMPT-knowledge-graph.md` — Detailed spec for the knowledge graph visualization (Section 3). Follow that file for the graph build. This master prompt covers the full site including the sections around it.

## TECH STACK

- React 18+ with Vite
- D3.js for the knowledge graph and semantic graph animations
- Tailwind CSS (dark theme)
- Framer Motion for scroll-triggered animations and UI transitions
- Intersection Observer for scroll-based section reveals
- Netlify Functions for the Solution Planner API proxy
- Google Fonts: 'Instrument Serif' (display), 'DM Sans' (body), 'JetBrains Mono' (code/raw)
- Deploy target: Netlify (static site + serverless functions)

## DESIGN SYSTEM

```css
:root {
  /* Backgrounds */
  --bg-deep: #060d1a;
  --bg-primary: #0a1628;
  --bg-surface: #0f1e37;
  --bg-card: rgba(15, 30, 55, 0.8);
  --bg-card-hover: rgba(20, 40, 70, 0.9);

  /* Pillar colors */
  --foundation: #3b82f6;
  --foundation-glow: rgba(59, 130, 246, 0.3);
  --semantic: #00d4aa;
  --semantic-glow: rgba(0, 212, 170, 0.3);
  --ai: #a78bfa;
  --ai-glow: rgba(167, 139, 250, 0.3);
  --trust: #f5a623;
  --trust-glow: rgba(245, 166, 35, 0.3);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-trust: #f5a623;

  /* Accents */
  --accent-teal: #00d4aa;
  --accent-amber: #f5a623;

  /* Borders */
  --border-subtle: rgba(0, 212, 170, 0.08);
  --border-hover: rgba(0, 212, 170, 0.2);
}
```

Typography rules:
- Headlines: 'Instrument Serif', Georgia, serif — use for all major section headings. Italic style for emphasis words.
- Body: 'DM Sans', sans-serif — clean, professional, slightly warm.
- Code/raw data labels: 'JetBrains Mono', monospace — for anything representing raw data, schemas, technical labels.
- NEVER use Inter, Roboto, Arial, or system fonts anywhere.

Global visual rules:
- Zero stock photos anywhere on the site.
- Every animation must demonstrate a concept — no decorative motion.
- Backgrounds have depth: subtle grid lines (rgba teal at 3% opacity, 80px spacing), floating particles, and radial glows near content areas.
- The "depth layer" — faint, barely-visible code/schema fragments behind content — should persist across all sections at ~2.5% opacity as a unifying texture.
- Scroll-snap between sections on desktop for cinematic pacing.

## PROJECT STRUCTURE

```
orian-data-experience/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                          — Root: loads JSON, manages global state, renders sections
│   ├── main.jsx                         — Vite entry point
│   ├── index.css                        — Tailwind + global styles + CSS variables + keyframes
│   ├── data/
│   │   └── orian-knowledge-graph.json   — Copy the JSON file here
│   ├── hooks/
│   │   ├── useScrollSection.js          — Intersection Observer hook for section visibility
│   │   └── useGraphData.js              — Hook to load and parse the JSON data
│   ├── components/
│   │   ├── BackgroundLayer.jsx          — Persistent canvas: grid, particles, depth-layer text
│   │   ├── Navigation.jsx               — Sticky top nav
│   │   ├── Section1_Hero/
│   │   │   ├── HeroSection.jsx          — Main hero container
│   │   │   ├── SemanticGraph.jsx         — The small animated graph (raw→intent transformation)
│   │   │   └── HeroText.jsx             — Headlines, sublines, CTAs
│   │   ├── Section2_Inversion/
│   │   │   ├── InversionSection.jsx     — Main container
│   │   │   ├── TimelineComparison.jsx   — Dual timeline animation
│   │   │   └── MetricCounters.jsx       — Animated counters
│   │   ├── Section3_Architecture/
│   │   │   ├── ArchitectureSection.jsx  — Main container with section header
│   │   │   ├── KnowledgeGraph.jsx       — D3.js graph (follow CLAUDE-CODE-PROMPT-knowledge-graph.md)
│   │   │   ├── GraphCanvas.jsx          — SVG rendering layer
│   │   │   ├── NodeTooltip.jsx          — Hover/click detail panel
│   │   │   ├── DeliveryChannelBar.jsx   — Bottom filter bar
│   │   │   ├── EdgeParticles.jsx        — Animated data flow on edges
│   │   │   └── ValueChainOverlay.jsx    — Value chain highlight animation
│   │   ├── Section4_Proof/
│   │   │   ├── ProofSection.jsx         — Main container
│   │   │   ├── IndustrySelector.jsx     — Industry tab switcher
│   │   │   ├── UseCaseCard.jsx          — Individual use case display
│   │   │   ├── MiniArchDiagram.jsx      — Subset of knowledge graph for each use case
│   │   │   └── FieldNote.jsx            — Margin annotation component
│   │   └── Section5_Planner/
│   │       ├── PlannerSection.jsx       — Main container
│   │       ├── ChatInterface.jsx        — Conversational input/output
│   │       ├── SolutionPlan.jsx         — Rendered plan output
│   │       ├── EngagementCTA.jsx        — Three engagement options
│   │       └── PlannerAPI.js            — API call to Netlify Function
├── netlify/
│   └── functions/
│       └── solution-planner.js          — Serverless function proxying Claude API
├── netlify.toml
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## SECTION 1 — THE HERO (The Provocation)

**Purpose:** Hook the visitor in 5 seconds. Create dissonance. Make them feel the problem before you offer the solution.

**Height:** 100vh, scroll-snap aligned.

### Layout (desktop, >1200px)
Two-column grid: 55% text left, 45% animated graph right.

### Left Column — Text

**Phase indicator pill** (top):
- Small rounded pill with animated dot
- Syncs with the graph animation state
- States: "Observing raw data" (amber dot) → "Decoding intent..." (amber dot pulsing) → "Intent resolved" (teal dot)

**Headline** (Instrument Serif, clamp 40-64px):
```
Every enterprise has data.
Almost none of it
knows why it exists.
```
- "Almost none of it" should be italic with a gradient fill (teal → blue)
- Staggered entrance: each line fades up with 200ms delay

**Description** (DM Sans, 17px, secondary color, max-width 460px):
```
ORIAN.Data is the AI-native accelerator that encodes business
intent into your data — so agents inherit context, not just columns.
```
- Fades in 1.2s after headline

**Trust anchor** (13px, amber/italic, fades in LAST — after graph transformation completes):
```
Earned in the field. Encoded in the platform.
```
- This line only appears after the graph has fully transformed from raw→intent. The timing is deliberate: the trust statement arrives after the proof, not before.

**CTAs** (two buttons):
1. Primary: "Tell me your outcome →" — teal background, dark text, hover lift + glow. Smooth-scrolls to Section 5 (Solution Planner).
2. Secondary: "Explore the architecture" — transparent, subtle border, hover teal border. Smooth-scrolls to Section 3.

**Builder trust line** (12px, very muted, below CTAs):
```
Built by architects who've earned trust inside the
enterprises they now serve together.
```

### Right Column — Semantic Graph Animation

An animated graph that demonstrates the "Data with Intent" concept in ~8 seconds.

**Nodes (12 total):**
Start as raw data labels in monospace font (JetBrains Mono), muted gray, small dots:
```
tbl_cust_v3 → Customer Lifetime Value
txn_log_2024 → Settlement Risk Exposure
src_claims_raw → Regulatory Compliance
dim_product_stg → Revenue Attribution
fact_risk_agg → Predictive Risk Score
ref_acct_master → Customer 360 Context
stg_market_feed → Market Signal Intelligence
raw_kyc_docs → Identity Confidence Score
etl_batch_output → Operational Efficiency
log_audit_trail → Decision Accountability
src_ehr_claims → Clinical Outcome Prediction
iot_sensor_dump → Predictive Maintenance Signal
```

Each node is colored by pillar (4 foundation-blue, 4 semantic-teal, 2 ai-purple, 2 trust-amber — distribute them spatially).

**Edges:** ~20 connection lines between related nodes, initially faint gray.

**Animation sequence:**
1. (0-2s) Nodes appear one by one with staggered delay (120ms each). Edges draw in with staggered delay (80ms each). All in "raw" state — monospace labels, gray dots, gray edges.
2. (2-4.5s) Hold. Let the visitor see the raw state. The phase indicator says "Observing raw data."
3. (4.5-8s) Transformation cascade. One by one (350ms each), each node pulses with its pillar color glow, the label morphs from raw monospace to intent label in DM Sans, the dot grows slightly and takes pillar color. Edges between transformed nodes brighten to pillar gradient colors.
4. (8s+) Phase indicator shifts to "Intent resolved." The trust anchor line fades in below the CTAs. Graph settles into gentle ambient drift.

**Container:** Rounded rect (16px radius), subtle border (var(--border-subtle)), frosted glass background (rgba + backdrop-blur). Phase badge in top-right corner. Pillar legend in bottom-left.

**Hover on transformed nodes:** Show pillar name and original raw label in a small tooltip.

### Navigation Bar
- Fixed top, transparent background with blur on scroll
- Left: ORIAN.Data logo (teal gradient square with "O" + wordmark)
- Right: Section links (Architecture, Industries, Solution Planner) + Xoriant badge
- Fades in with hero text

---

## SECTION 2 — THE INVERSION (The Philosophy)

**Purpose:** Explain the "Value-to-Data" philosophy not with text but with a VISUAL COMPARISON that makes the inefficiency of the old model visceral.

**Height:** 100vh, scroll-snap aligned. Triggered when section enters viewport.

### Layout
Full-width with a centered content area (max 1200px). Section header at top, dual timeline below.

### Section Header
- Eyebrow: "THE PHILOSOPHY" (11px, teal, uppercase, letter-spacing 2px)
- Headline (Instrument Serif, ~40px):
  ```
  The industry builds data-up.
  We build outcomes-down.
  ```
  - "outcomes-down" in italic teal gradient
- Subline (DM Sans, 16px, secondary):
  ```
  Every competitor operates on the same inherited model: Data → Decisions → Value.
  We invert it. Outcome → Intent → Data.
  ```

### Dual Timeline Comparison

Two parallel horizontal timelines side by side (or stacked on mobile).

**Left Timeline — "The Old Way: Data → Decisions"**
- Header: "Supply-Side Thinking" in muted text
- Visual: A pipeline animation flowing LEFT → RIGHT
- Stages appear sequentially as the section scrolls into view:
  1. "400+ Sources" (icon: database clusters) — multiple source icons feed in
  2. "Ingestion" (icon: funnel) — data pours in
  3. "Data Lake / Warehouse" (icon: large container) — everything stored
  4. "Transform & Model" (icon: gears) — processing happens
  5. "Dashboards" (icon: chart) — 12 dashboards appear
  6. "Human squints at chart" (icon: person with magnifying glass) — tiny figure at the end
- Below the timeline, counters animate up:
  - "14 weeks" | "$2.4M" | "400 data sources" | "12 dashboards nobody uses"
- Color: all in muted blue-gray, feeling heavy and bureaucratic
- A faint red "waste" indicator shows how much data was processed that contributed nothing to the decision

**Right Timeline — "The ORIAN Way: Outcome → Data"**
- Header: "Demand-Side Thinking" in teal
- Visual: A pipeline animation flowing RIGHT → LEFT (deliberately reversed)
- Stages appear sequentially:
  1. "Business Outcome" (icon: target) — "Reduce settlement risk by 40%" in a golden card
  2. "Intent Decoded" (icon: brain/ontology) — ORIAN.Data.Ontology maps what decisions drive this
  3. "Data Identified" (icon: semantic graph) — only the relevant data assets light up
  4. "Quality Certified" (icon: shield with checkmark) — Sentinel-DQ trust scores applied
  5. "Delivered to Agent" (icon: agent) — inference-ready data packaged
- Below the timeline, counters animate up:
  - "4 weeks" | "$380K" | "12 data assets" | "1 outcome delivered"
- Color: teal and white, feeling crisp and purposeful
- A "precision" indicator shows 100% of data served the outcome

**The Comparison Math**
Below both timelines, a centered comparison block:
```
3.5× faster | 84% less cost | 97% less data processed | 100% outcome-aligned
```
Each metric animates from 0 to final value when scrolled into view.

**Closing quote** (Instrument Serif italic, 20px, centered, amber):
```
"Infrastructure disciplined by demand, not justified by supply."
```

---

## SECTION 3 — THE ARCHITECTURE (Interactive Knowledge Graph)

**Purpose:** Let the visitor explore the full ORIAN.Data ecosystem. This is where technical buyers spend 5+ minutes clicking, hovering, and understanding the depth of the platform.

**Height:** 100vh minimum, can extend for tooltip interactions. Scroll-snap aligned.

### Layout
- Section header at top
- Full-width knowledge graph in an 80vh container
- Delivery channel filter bar fixed at bottom of graph container

### Section Header
- Eyebrow: "THE ARCHITECTURE" (11px, teal, uppercase, letter-spacing 2px)
- Headline (Instrument Serif, ~40px):
  ```
  17 components. 4 pillars. One composable system.
  ```
- Subline (DM Sans, 16px, secondary):
  ```
  Every component works independently or as part of the whole.
  Hover to explore. Click to go deep. Filter by delivery channel.
  ```

### Knowledge Graph
**Follow the spec in `CLAUDE-CODE-PROMPT-knowledge-graph.md` exactly.** That file has the complete build instructions for:
- Center node + 4-quadrant layout with pillar zones
- 17 component nodes with hover tooltips (description, provenance, channels, industries)
- 30 cross-component edges with relationship labels and gradient colors
- Animated data flow particles on edges
- Industry ontology outer ring nodes (BIAN, FHIR, RAMI 4.0, etc.)
- Delivery channel filter bar with "Day 1 value" badges
- Value chain highlight mode
- All interaction behaviors (hover dim/highlight, click pin, filter)

### Additional details NOT in the knowledge graph MD:

**Scroll transition from Section 1:** When the hero section scrolls out and Section 3 scrolls in, the small hero graph (12 nodes) should visually "expand" into the full knowledge graph (17 nodes). The hero nodes drift outward into their pillar quadrant positions, new nodes appear, edges draw in, and the delivery channel bar slides up. This creates continuity — the visitor feels like they're zooming deeper into the same system, not jumping to a new page.

**"Earned in the field" provenance lines:** These appear in the node tooltips (from the JSON provenance field). Style them in italic amber (#f5a623), slightly smaller than the description text. They're the trust narrative embedded in the architecture. Not every component has one — only the ones with real field provenance:
- Migrate: "Patterns proven across 49.65 TB and 11,748 tables in production"
- Ontology: "Shaped by 25 years inside banking, healthcare, and manufacturing data architectures"
- Sentinel-DQ: "Born from the gap between what quality tools promise and what regulated enterprises actually need"
- Comply: "Built by engineers who've sat in the audit room, not just the dev room"
- Others have provenance in the JSON — display them all.

---

## SECTION 4 — THE PROOF (Industry Use Cases)

**Purpose:** Show that ORIAN.Data isn't theoretical. Ground it in specific, quantified business outcomes across real industries. This is where the "earned trust" narrative lands hardest.

**Height:** Auto (this section can extend based on content), minimum 100vh. NOT scroll-snap — allow free scrolling within this section since it has expandable content.

### Layout
- Section header at top
- Industry tab selector
- Use case grid with expandable cards
- Field notes as margin annotations

### Section Header
- Eyebrow: "THE PROOF" (11px, amber, uppercase, letter-spacing 2px) — amber here, not teal, because this is about trust/evidence
- Headline (Instrument Serif, ~40px):
  ```
  35 use cases. 5 industries.
  Every outcome earned, not promised.
  ```
- Subline (DM Sans, 16px, secondary):
  ```
  Select an industry to see how ORIAN.Data components
  combine to solve specific business problems.
  ```

### Industry Selector
A horizontal tab bar with 5 industry options:
- BFSI (10 use cases)
- Healthcare & Life Sciences (10 use cases)
- Manufacturing (5 use cases)
- Technology (5 use cases)
- Retail (5 use cases)

**Visual treatment when selecting an industry:**
- The tab highlights with the relevant color
- The background ambient glow shifts to match industry character:
  - BFSI: cool blue tone
  - Healthcare: teal/green tone
  - Manufacturing: warm amber tone
  - Technology: purple tone
  - Retail: warm coral tone
- A small industry ontology badge appears: "Powered by BIAN" for BFSI, "Powered by HL7/FHIR" for Healthcare, "Powered by RAMI 4.0" for Manufacturing, etc.

### Use Case Cards
Load from `useCases` in the JSON. Each card shows:

**Collapsed state (default):**
- Use case name (DM Sans, 16px, bold, white)
- Outcome metric in a highlighted pill (e.g., "6,000+ person-hours → 80% reduction")
- Component pills — small colored pills showing which ORIAN.Data components address this use case (colored by pillar)
- Expand arrow

**Expanded state (on click):**
- Full outcome description
- Mini architecture diagram — a SUBSET of the knowledge graph showing ONLY the 3-5 components involved in this use case, with their connecting edges. Render this as a small D3.js force graph (reuse GraphCanvas with filtered data).
- For each component shown, display: component name, its specific role in this solution, and the recommended delivery channel
- "View in Architecture Explorer →" link that scrolls to Section 3 and highlights these components

### Field Notes (THE TRUST ELEMENT)
For select use cases, display a "field note" — a small, typographically distinct annotation in the margin. Style as handwritten-feel (lighter weight Instrument Serif italic, amber color, slightly rotated 1-2deg, with a faint left border line).

Field notes by industry:
- BFSI / Regulatory Capital: "We've sat across from the OCC examiner. We know what they actually ask for."
- BFSI / KYC-AML: "Lineage in banking isn't documentation. It's audit evidence under oath."
- Healthcare / Clinical Trial: "Mapped FHIR resources for systems where the patient record is the product, not the byproduct."
- Healthcare / HIPAA Compliance: "Built by engineers who've traced PHI flows through 47 integration points."
- Manufacturing / Predictive Maintenance: "Built from OT/IT convergence work where 'downtime' means millions per hour, not an incident ticket."
- Manufacturing / Digital Product Passport: "The EU mandate is 18 months away. The data architecture takes 12. Start now."
- Technology / Data Mesh: "Every data mesh we've seen fail had the same root cause: no semantic layer."
- Retail / Customer Intelligence: "15 touchpoints. 3 consent frameworks. 1 unified view. That's the real challenge."

These field notes should only appear for the use cases listed above. They carry the "earned in the field" narrative — details that only trusted insiders would know.

### Section Closing
After the use case grid, a centered closing block:
- Stat bar: "49.65 TB migrated | 11,748 tables | $145K/month saved | 99.5% data accuracy"
- Below: "These aren't projections. They're receipts." (DM Sans, muted, 14px)

---

## SECTION 5 — THE SOLUTION PLANNER (Conversion)

**Purpose:** Convert the visitor from explorer to lead. This is the competitive weapon — an AI-powered interface that demonstrates the "Data with Intent" philosophy on the visitor's OWN problem.

**Height:** Minimum 100vh, extends based on generated content.

### Layout
- Section header at top
- Two-column layout: chat interface on left (40%), solution plan output on right (60%)
- Engagement CTAs at bottom

### Section Header
- Eyebrow: "YOUR TURN" (11px, teal, uppercase, letter-spacing 2px)
- Headline (Instrument Serif, ~40px):
  ```
  Tell us the outcome.
  We'll decode the intent.
  ```
  - "decode the intent" in italic teal gradient
- Subline (DM Sans, 16px, secondary):
  ```
  Describe your data challenge. ORIAN.Data will design
  a tailored solution plan — components, phasing,
  delivery channels, and estimated acceleration.
  ```

### Left Column — Chat Interface

A clean conversational interface. NOT a chatbot widget — a purpose-built input experience.

**Initial state:**
- A large text input area (not a single line — a textarea that grows) with placeholder text cycling through examples:
  - "We're a mid-size bank struggling with BCBS 239 compliance..."
  - "Our clinical data sits in 12 systems with no common patient identifier..."
  - "We need to migrate 5,000 tables from Oracle to Snowflake..."
  - "Our data quality issues cost us $2M annually in regulatory fines..."
- Below the input, 4 "quick start" pills the visitor can click to pre-fill:
  - "Regulatory compliance in banking"
  - "Clinical data platform for healthcare"
  - "Cloud migration at scale"
  - "Data quality for AI readiness"
- A prominent "Decode my intent →" submit button (teal)

**Loading state:**
- After submission, show an animated sequence in the chat area:
  - "Analyzing your challenge..." (1s)
  - "Mapping to ORIAN.Data components..." (1.5s)
  - "Estimating acceleration..." (1s)
  - "Building your solution plan..." (1s)
- Each step accompanied by a subtle animation (component nodes lighting up in sequence)

**Conversation state:**
- After the plan generates, the input area stays available for follow-up questions
- The visitor can refine: "What if we can't install tools due to security?" → the plan regenerates with only Specs, Prompts, Standards, and Code channels
- Full conversation history maintained in the left column

### Right Column — Solution Plan Output

When the AI generates a plan, render it as a beautifully structured output (NOT raw text):

**Block A: Challenge Analysis**
- The AI's understanding of the challenge rendered as a highlighted card
- Key pain points extracted as colored tag pills

**Block B: Recommended ORIAN.Data Components**
- A MINI KNOWLEDGE GRAPH showing only the recommended components (subset of the full Section 3 graph)
- Components colored by pillar with connecting edges
- Each component card shows: name, its specific role in this solution, recommended delivery channel, and phase
- This is a filtered, smaller version of the architecture explorer — reuse the graph rendering code

**Block C: Phased Approach**
- Horizontal timeline showing phases (Phase 1: Weeks 1-2, Phase 2: Weeks 3-8, etc.)
- Each phase shows: components activated, specific deliverables
- Color-coded by pillar

**Block D: Acceleration Comparison**
- Side-by-side cards: "Traditional Approach" vs "With ORIAN.Data"
- Animated counters for timeline savings (e.g., "18 months → 7 months")
- Animated counters for effort savings (e.g., "120 person-months → 52 person-months")
- Cost impact estimate

**Block E: Delivery Strategy**
- Which delivery channels to use and when
- "Day 1 value" callout for channels requiring no security clearance
- Timeline showing when each channel activates

**Block F: Closing line**
```
This plan draws on patterns from real engagements — not generic
frameworks, but decisions made by architects who were trusted
with the outcome.
```
Style: italic, amber, centered. This is the earned-trust anchor for the planner.

### Engagement CTAs
Below the plan output, three cards:

**Card 1: "Start with Intent Discovery"**
- Duration: 2 weeks
- Best for: New relationships, proving the approach
- Deliverables: Data maturity assessment, accelerator fit analysis, 3 quick wins
- CTA button: "Book a Discovery Sprint"

**Card 2: "Activate a Single Pillar"**
- Duration: 8-12 weeks
- Best for: Specific high-priority need (migration, DQ, compliance)
- Deliverables: Full pillar activation against your use case
- CTA button: "Scope a Pillar"

**Card 3: "Enterprise Foundation"**
- Duration: 16-24 weeks
- Best for: Strategic multi-pillar transformation
- Deliverables: Full ORIAN.Data ecosystem deployment
- CTA button: "Design a Foundation"

### Netlify Function — Solution Planner API

Create `netlify/functions/solution-planner.js`:

```javascript
// This serverless function proxies requests to the Anthropic Claude API.
// It includes the full ORIAN.Data component registry as system context
// so Claude can generate accurate, component-specific solution plans.

// Environment variable: ANTHROPIC_API_KEY (set in Netlify dashboard)

// System prompt should include:
// 1. The full component registry from orian-knowledge-graph.json
// 2. All delivery channels with their security/timeline properties
// 3. All industry use cases as reference patterns
// 4. Instructions to output a structured JSON plan with:
//    - challengeAnalysis: { summary, painPoints[] }
//    - recommendedComponents: [{ id, name, role, phase, deliveryChannel }]
//    - edges: [{ source, target, type }] (connections between recommended components)
//    - phases: [{ number, title, weeks, components[], deliverables[] }]
//    - acceleration: { traditional: { weeks, effort, cost }, withOrian: { weeks, effort, cost } }
//    - deliveryStrategy: { channels[], dayOneValue, securityNote }
// 5. Instructions to ALWAYS recommend specific components by ID from the registry
// 6. Instructions to consider the client's security environment when recommending channels
// 7. Tone: confident, specific, grounded in real patterns — not generic consulting speak

// The function should:
// - Accept POST with { message, conversationHistory[] }
// - Call Claude API (claude-sonnet-4-20250514) with system prompt + conversation
// - Parse the response and return structured JSON
// - Handle errors gracefully with user-friendly messages
```

---

## PERSISTENT ELEMENTS

### Background Layer (renders behind ALL sections)
- HTML Canvas covering the full page
- Subtle grid lines: teal at 3% opacity, 80px spacing
- Floating particles: 60-80 small dots, teal at 5-30% opacity, drifting upward slowly
- Depth-layer text: faint (~2.5% opacity) monospace text showing SQL fragments, ontology mappings, and quality rules. This is a WATERMARK-like texture that says "there's real engineering behind every surface." It scrolls at a slightly different parallax speed than the content (0.3x scroll speed).

### Sticky Navigation
- Transparent on hero, gains frosted-glass background (backdrop-blur + dark bg) when scrolling past hero
- Section indicators: small dots on the right edge showing which section is active
- Logo always visible top-left
- "Xoriant" badge always visible top-right

### Scroll Behavior
- Scroll-snap: mandatory on desktop for Sections 1-3 (hero, inversion, architecture). Free scrolling for Sections 4-5 (proof and planner have variable-height content).
- Smooth scroll for CTA links (e.g., "Explore the architecture" scrolls to Section 3)
- Section entrance animations triggered by Intersection Observer at 20% visibility threshold

---

## MOBILE RESPONSIVE BEHAVIOR

### Section 1 (Hero)
- Single column: text on top, graph below (reduced to 300px height)
- Graph nodes and labels scale down proportionally
- CTAs stack vertically

### Section 2 (Inversion)
- Timelines stack vertically: "Old Way" on top, "ORIAN Way" below
- Timelines become vertical (top→bottom flow) instead of horizontal
- Comparison math becomes a 2×2 grid

### Section 3 (Architecture)
- Replace force-directed graph with pillar accordion view
- Each pillar is a collapsible section showing its components as cards
- Cross-pillar connections shown as "Connects to: X, Y, Z" text links
- Delivery channel filter becomes horizontal pill selector at top

### Section 4 (Proof)
- Industry selector becomes horizontal scrollable pills
- Use case cards stack in a single column
- Field notes appear inline below each use case (not as margin annotations)
- Mini architecture diagrams hidden on mobile (show component pills instead)

### Section 5 (Planner)
- Single column: chat input on top, plan output below
- Plan blocks stack vertically
- Engagement CTAs become swipeable cards

---

## NETLIFY CONFIGURATION

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## BUILD ORDER

Build in this sequence, verifying each section works before moving on:

1. **Project scaffolding** — Vite + React + Tailwind + Google Fonts + CSS variables + BackgroundLayer
2. **Section 1 (Hero)** — Text, semantic graph animation, CTAs, navigation
3. **Section 3 (Architecture)** — Knowledge graph from the MD spec, delivery channel bar, tooltips (do this before Section 2 because it's the most complex and the core of the site)
4. **Section 2 (Inversion)** — Dual timeline comparison, animated counters
5. **Section 4 (Proof)** — Industry selector, use case cards, field notes, mini diagrams
6. **Section 5 (Planner)** — Chat interface, Netlify Function, plan rendering, engagement CTAs
7. **Polish** — Scroll-snap, section transitions, mobile responsive, performance optimization

---

## PERFORMANCE TARGETS

- Lighthouse Performance: >85
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Total bundle size: <500KB (excluding D3.js)
- D3.js graph: use requestAnimationFrame for all animations, debounce hover events (16ms), limit particle count to 50 on mobile
- Lazy load Sections 4 and 5 (they're below the fold)
- Preload Google Fonts with `<link rel="preload">`

---

## THE META-PRINCIPLE

This website should embody its own philosophy. It practices "Data with Intent" on the visitor:
- Every section has a purpose (intent), not just content (data)
- The Solution Planner literally takes the visitor's outcome and reverse-engineers the data solution
- The earned-trust narrative is atmospheric, not stated — it's in the provenance lines, the field notes, the specificity of the use cases, and the confidence of the design
- Zero filler. Zero stock photography. Zero generic enterprise language. Every word, every animation, every interaction demonstrates something specific about ORIAN.Data's capability

The visitor should leave thinking: "These people understand something the rest of the market doesn't."

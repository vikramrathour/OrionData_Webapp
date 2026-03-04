# CLAUDE CODE PROMPT: Add Data Intent Maturity Framework to ORIAN.Data Experience Site

## CONTEXT

The ORIAN.Data experience site (React + Vite + Tailwind, deployed on Netlify) currently has three acts:
- **Act 1**: Hero/Provocation (semantic graph animation, dark navy canvas)
- **Act 3**: Architecture Explorer (interactive 17-component, 4-pillar visualization)
- **Act 5**: Solution Planner (Claude API-powered conversational interface)

We're adding a new section — the **Data Intent Maturity Framework** — positioned between the Architecture Explorer and the Solution Planner. This is the Ogilvy performance marketing move: it's a self-diagnostic tool that shows prospective clients where they are on their data journey, what it costs them to stay there, and exactly how ORIAN.Data moves them forward. It also connects directly into the Solution Planner as a lead qualification mechanism.

## DESIGN SYSTEM (EXISTING — MATCH EXACTLY)

```
Background: #0a1628 (dark navy)
Primary accent: #00d4aa (electric teal)
Trust accent: #f5a623 (warm amber)
AI/Engineering accent: #a78bfa (purple)
Data Foundation accent: #3b82f6 (blue)
Text primary: #ffffff
Text secondary: #94a3b8 (light slate)
Typography: Inter for body, bold geometric for headlines
Motion: Purposeful only — every animation demonstrates a concept
Zero stock photos
```

## WHAT TO BUILD

### Section: Data Intent Maturity Framework

Build an interactive, scroll-driven maturity assessment that combines self-diagnosis with an immersive visual journey through five levels. This is NOT a boring survey or a static infographic. It's a performance marketing tool disguised as thought leadership.

---

### THE FIVE MATURITY LEVELS

#### Level 1: DATA AS LIABILITY
**Tagline:** "We have data. It costs us money and creates risk."

**Visual treatment:** Dark, heavy. Fragmented data nodes scattered with no connections. Red warning pulses. A counter showing money bleeding: "$X/month in maintenance, $Y in incidents."

**Diagnostic signals (what the client recognizes):**
- Legacy warehouses running on license-renewal inertia
- No one trusts the reports — teams maintain shadow spreadsheets
- Engineers spend 70%+ of time on maintenance
- Compliance is manual, always behind, always painful
- Data conversations are about storage costs and incident response, never outcomes
- The CDO (if there is one) reports into IT, not the C-suite

**ORIAN.Data intervention:**
- Entry: Intent Discovery Sprint ($80-150K, 2 weeks)
- Primary pillar: Data Foundation
- Components: Estimate → Catalog → Migrate (show as mini constellation)
- Channels: Specs + Standards on Day 1
- Acceleration: Migration 65% cost reduction, 3× speed

**The move to Level 2:** "The Discovery Sprint generates the business case for modernization. Here's what you have. Here's what it costs. Here's the path out."

---

#### Level 2: DATA AS INFRASTRUCTURE
**Tagline:** "We've modernized. Data flows. But nobody agrees on what the numbers mean."

**Visual treatment:** Connected nodes but in separate color clusters that don't talk to each other. Multiple "revenue" nodes with different values. The visual dissonance is the message.

**Diagnostic signals:**
- Completed cloud migration (Snowflake/Databricks) but reports still don't match
- "Revenue" means three different things in three different business units
- 200 dashboards and people still use spreadsheets
- Data engineering team is productive but reactive — builds what's asked, not what's needed
- Data quality addressed per-incident, not systematically
- AI/ML experiments exist but don't make it to production

**ORIAN.Data intervention:**
- Entry: Pillar Activation ($300-600K, 8-12 weeks)
- Primary pillars: Semantic Intelligence + Trust & Operations
- Components: Ontology → Semantic → Sentinel-DQ → Catalog
- Channels: Specs + Prompts + Standards from Week 1, Code by Week 3
- Acceleration: 25-35% engineer capacity gain, 80% DQ cost reduction

**The move to Level 3:** "Your infrastructure works. Your semantics don't. We start with the semantic layer — one source of truth for business concepts."

---

#### Level 3: DATA AS GOVERNED ASSET
**Tagline:** "We trust our data. We can trace it. Regulators are satisfied. But we're still reactive."

**Visual treatment:** Well-organized nodes with governance shields. But movement is slow, methodical. Everything works but nothing anticipates. A clock icon showing "6,000 person-hours" for compliance.

**Diagnostic signals:**
- Strong data foundation with semantic consistency across core domains
- Data quality is measured and managed
- Lineage exists for critical paths
- Compliance reporting works but takes massive manual effort
- Data team is respected but seen as a service function, not a strategic driver
- AI/ML models work in the lab but struggle in production — data isn't "model-ready"
- Governance is solid but it's a bottleneck, not an enabler

**ORIAN.Data intervention:**
- Entry: Pillar Activation or Enterprise Foundation ($500K-$1.5M, 12-20 weeks)
- Primary pillars: AI-Led Engineering + Trust & Operations (automation layer)
- Components: Context → Comply → Lineage → Agent + Skills → Observe
- Channels: All 5. Tool deployment for Sentinel-DQ. Prompts and Skills for engineer augmentation.
- Acceleration: 65% compliance reduction per framework, 50× faster impact analysis

**The move to Level 4:** "Your governance works but it's manual. The gap between 'trusted data' and 'data that AI agents can reason over' is context."

---

#### Level 4: DATA AS INTELLIGENCE
**Tagline:** "Our data carries meaning. AI agents consume it directly. Decisions are data-driven by default."

**Visual treatment:** Living, breathing semantic graph. Nodes pulse with activity. Connections are rich and bidirectional. Industry ontology labels visible (BIAN service domains, FHIR resources). The graph looks like it's thinking.

**Diagnostic signals:**
- Enterprise ontology implemented (BIAN/FHIR/RAMI 4.0)
- Semantic layer is the single source of truth
- Data quality runs autonomously (Sentinel-DQ or equivalent)
- AI agents operate on context-enriched data — meaning, not just values
- Data team is a strategic function
- Compliance is largely automated
- New data sources onboarded in days, not weeks

**ORIAN.Data intervention:**
- Entry: Enterprise Foundation ($1-3M, 16-24 weeks initial)
- All four pillars — full platform deployment
- Components: Full Semantic Intelligence + Agent + Skills + full Trust automation
- Channels: All 5, with Tool as primary mode
- Acceleration: Compounding — Year 2 is 40% more efficient, Year 3 is 80% more efficient

**The move to Level 5:** "Your data is intelligent. Now let's make it generative — anticipating business needs before they're articulated."

---

#### Level 5: DATA WITH INTENT
**Tagline:** "Data anticipates decisions. The system reasons about what's needed before it's asked."

**Visual treatment:** The semantic graph from the hero section — fully realized. Nodes don't just connect, they pulse with predictive energy. New connections form proactively. The graph is alive with intent. This is the north star visual — it should feel aspirational and magnetic.

**Diagnostic signals:**
- Data infrastructure anticipates regulatory changes
- Knowledge graphs update in real-time
- AI agents operate on living ontologies that evolve with the business
- Compliance is continuous, not periodic
- The line between "data platform" and "decision intelligence" has dissolved
- The system surfaces what you don't know you need

**ORIAN.Data intervention:**
- Entry: Strategic partnership (multi-year, outcome-based)
- All four pillars, continuous evolution
- The ontology evolves autonomously, quality rules self-tune, agents generate context
- This is the "Data with Intent" philosophy fully realized

**Honest note (display subtly):** "No enterprise is fully here yet. This is the 2027-2028 horizon. But naming the destination gives the journey meaning — and positions every investment along the way."

---

### INTERACTION DESIGN

**Option A: Self-Assessment Mode (Recommended for lead generation)**

Build as an interactive self-diagnostic with 5-7 questions. Each question maps to maturity dimensions. The visitor answers by clicking cards (not a boring form).

**Sample questions (present as visual card selections, not text fields):**

**Q1: "What does your data team spend most of its time on?"**
- [ ] Keeping legacy systems running (→ Level 1 signal)
- [ ] Building pipelines and dashboards on request (→ Level 2 signal)
- [ ] Managing governance and quality (→ Level 3 signal)
- [ ] Enabling AI/ML systems with curated data (→ Level 4 signal)

**Q2: "When a regulator asks 'show me the lineage for this report,' what happens?"**
- [ ] Panic. Multiple people scramble for weeks. (→ Level 1)
- [ ] We can trace it, but it takes significant manual effort (→ Level 2-3)
- [ ] Automated lineage exists for critical paths (→ Level 3-4)
- [ ] Real-time lineage with automated compliance evidence (→ Level 4-5)

**Q3: "How do your AI/ML models consume data?"**
- [ ] We're not doing AI/ML yet (→ Level 1-2)
- [ ] Models pull from warehouses directly — raw tables (→ Level 2)
- [ ] We have feature stores but data quality is inconsistent (→ Level 3)
- [ ] Models consume semantically enriched, quality-scored data with provenance (→ Level 4-5)

**Q4: "What does 'revenue' mean in your organization?"**
- [ ] Depends who you ask (→ Level 1-2)
- [ ] Defined, but different systems calculate it differently (→ Level 2)
- [ ] Consistent definition in a semantic layer (→ Level 3-4)
- [ ] One definition, one source of truth, consumed by humans and agents alike (→ Level 4-5)

**Q5: "How long does it take to onboard a new data source?"**
- [ ] Weeks to months (→ Level 1)
- [ ] 2-4 weeks with dedicated engineering (→ Level 2)
- [ ] Days with automated ingestion (→ Level 3-4)
- [ ] Hours with self-service and automated schema inference (→ Level 4-5)

**After answering:** Animate a reveal showing their maturity level with the full context — where they are, what it costs them, and the specific ORIAN.Data components that move them to the next level. Include a "See Your Custom Plan →" CTA that pre-fills the Solution Planner with their maturity context.

**Option B: Scroll-Through Exploration Mode**

For visitors who want to browse without answering questions. The five levels render as a vertical journey — each level is a full-viewport section with the visual treatment described above. As the visitor scrolls, the data visualization evolves from fragmented (Level 1) to living intelligence (Level 5). The scroll IS the story.

**Build BOTH options.** Default to the scroll-through. The self-assessment appears as a floating CTA: "Discover your level →" that opens a modal/overlay with the diagnostic.

---

### INTEGRATION POINTS

**With the Architecture Explorer (Act 3):**
- Each maturity level shows a "mini constellation" — a subset of the full architecture explorer highlighting only the 3-5 components relevant to that level. These should visually match the full explorer's style but be simplified.
- Clicking any component in a mini constellation scrolls to that component in the full Architecture Explorer.

**With the Solution Planner (Act 5):**
- The "See Your Custom Plan →" CTA from the self-assessment passes the maturity level and diagnostic signals to the Solution Planner as pre-filled context.
- The Solution Planner's system prompt should include: "The visitor has been assessed at Level {X}. Their diagnostic signals indicate: {signals}. Generate a solution plan that addresses their current level and charts a path to Level {X+1}."

**With the Hero (Act 1):**
- The semantic graph in the hero subtly reflects maturity: if the visitor has completed the self-assessment, the hero graph on return visits adjusts to show their level's visual treatment.

---

### COMPONENT STRUCTURE

```
src/
  components/
    MaturityFramework/
      MaturityFramework.jsx          — Main container, scroll logic
      MaturityLevel.jsx              — Individual level section (reusable × 5)
      MaturityAssessment.jsx         — Self-diagnostic modal/overlay
      MaturityVisualization.jsx      — D3.js visualization that evolves per level
      MaturityResult.jsx             — Result display after assessment
      MiniConstellation.jsx          — Simplified component constellation per level
      maturity-data.js               — All level data, questions, scoring logic
```

### ANIMATION SPECIFICATIONS

- **Level transitions on scroll:** Each level section should have an entry animation. The data visualization morphs smoothly from one level's state to the next as the visitor scrolls. Use Framer Motion's `useScroll` and `useTransform` hooks for scroll-linked animation.

- **Self-assessment flow:** Questions slide in one at a time. Selected cards pulse with the accent color of the matching maturity level. After the last question, the result "builds" — the maturity visualization constructs itself node by node at the diagnosed level.

- **Mini constellations:** When a level section enters viewport, its component constellation assembles — nodes appear one by one with subtle bounce, then connection lines draw between them. Match the Architecture Explorer's visual style.

- **Level 5 treatment:** This should feel distinctly different from Levels 1-4. More particle effects. More ambient motion. The graph should feel alive and self-organizing. This is the aspiration — make it magnetic.

---

### COMPETITIVE POSITIONING PER LEVEL (display as subtle sidebar or tooltip)

**Level 1 → Level 2 competitors:** Cognizant, TCS — "They'll help you stay here. We help you leave."
**Level 2 → Level 3 competitors:** LTIMindtree (Canvas.ai), Wipro (ai360) — "Migration done. Now what? They don't have an answer for 'what the data means.'"
**Level 3 → Level 4 competitors:** Tredence, Tiger Analytics — "They build analytics on top. We build the foundation underneath. Different layer, different value."
**Level 4 → Level 5 competitors:** Persistent, Fractal — "They have horizontal accelerators. We have standards-grounded ontologies. When the conversation is 'how do we make data agent-ready,' we have the deepest answer."

---

### RESPONSIVE BEHAVIOR

- **Desktop (1200px+):** Full visualization with scroll-linked animations. Side-by-side layout for level details and mini constellations. Self-assessment as floating CTA.
- **Tablet (768-1199px):** Simplified visualization. Stacked layout. Self-assessment accessible from sticky bottom bar.
- **Mobile (< 768px):** Card-based level browsing (swipe between levels). Self-assessment as full-screen flow. Mini constellations as simple icon grids.

---

### SEO AND LEAD GENERATION

- The maturity framework page should be independently linkable at `/maturity` for content marketing distribution.
- Self-assessment completion should trigger a subtle email capture: "Get your full maturity report sent to your inbox" — optional, non-blocking.
- Assessment results should be shareable: generate a unique URL like `/maturity/result?level=3` that shows the result page without requiring re-assessment.
- Track assessment completions and level distributions as analytics events for sales intelligence.

---

### DATA FILE: maturity-data.js

Export all maturity data as a structured object:

```javascript
export const maturityLevels = [
  {
    level: 1,
    name: "Data as Liability",
    tagline: "We have data. It costs us money and creates risk.",
    color: "#ef4444", // red accent for this level
    diagnosticSignals: [
      "Legacy warehouses running on license-renewal inertia",
      "No one trusts the reports — shadow spreadsheets everywhere",
      "Engineers spend 70%+ time on maintenance",
      "Compliance is manual and always behind",
      "Data conversations are about costs, never outcomes",
      "CDO reports to IT, not the C-suite"
    ],
    orianIntervention: {
      entryPoint: "Intent Discovery Sprint",
      investment: "$80K-$150K",
      duration: "2 weeks",
      primaryPillar: "Data Foundation",
      components: ["Estimate", "Catalog", "Migrate"],
      channels: ["Specs", "Standards"],
      accelerationMetrics: [
        { label: "Migration cost reduction", value: "65%" },
        { label: "Migration speed", value: "3×" },
        { label: "Scoping acceleration", value: "7×" }
      ]
    },
    pathForward: "The Discovery Sprint generates the business case. Here's what you have. Here's what it costs. Here's the path out.",
    competitorContext: "Cognizant and TCS will offer to run your legacy systems. We show you how to leave them."
  },
  {
    level: 2,
    name: "Data as Infrastructure",
    tagline: "We've modernized. Data flows. But nobody agrees on what the numbers mean.",
    color: "#3b82f6", // blue — Data Foundation color
    diagnosticSignals: [
      "Cloud migration done but reports still don't match",
      "'Revenue' means three things in three systems",
      "200 dashboards, people still use spreadsheets",
      "Data engineering is productive but reactive",
      "Quality addressed per-incident, not systematically",
      "AI/ML experiments exist but don't reach production"
    ],
    orianIntervention: {
      entryPoint: "Pillar Activation",
      investment: "$300K-$600K",
      duration: "8-12 weeks",
      primaryPillar: "Semantic Intelligence + Trust",
      components: ["Ontology", "Semantic", "Sentinel-DQ", "Catalog"],
      channels: ["Specs", "Prompts", "Standards", "Code"],
      accelerationMetrics: [
        { label: "Engineer capacity gain", value: "25-35%" },
        { label: "DQ cost reduction", value: "80%" },
        { label: "Pipeline deployment", value: "5-7×" }
      ]
    },
    pathForward: "Your infrastructure works. Your semantics don't. We start with the semantic layer — one source of truth for business concepts.",
    competitorContext: "LTIMindtree and Wipro can modernize your stack. Neither has an ontology play for when the question becomes 'what does the data mean?'"
  },
  {
    level: 3,
    name: "Data as Governed Asset",
    tagline: "We trust our data. We can trace it. Regulators are satisfied. But we're still reactive.",
    color: "#f5a623", // amber — Trust color
    diagnosticSignals: [
      "Strong foundation, semantic consistency in core domains",
      "Data quality measured and managed",
      "Lineage exists for critical paths",
      "Compliance works but takes 6,000+ person-hours annually",
      "Data team seen as service function, not strategic driver",
      "AI models work in lab, struggle in production",
      "Governance is solid but a bottleneck"
    ],
    orianIntervention: {
      entryPoint: "Pillar Activation or Enterprise Foundation",
      investment: "$500K-$1.5M",
      duration: "12-20 weeks",
      primaryPillar: "AI-Led Engineering + Trust (automation)",
      components: ["Context", "Comply", "Lineage", "Agent", "Skills", "Observe"],
      channels: ["All 5"],
      accelerationMetrics: [
        { label: "Compliance effort reduction", value: "65%/framework" },
        { label: "Impact analysis", value: "50× faster" },
        { label: "AI readiness cost", value: "50% reduction" }
      ]
    },
    pathForward: "Your governance works but it's manual. The gap between 'trusted data' and 'data AI agents can reason over' is context.",
    competitorContext: "Tredence and Tiger Analytics build analytics on top. We build the foundation underneath. Different layer, different value."
  },
  {
    level: 4,
    name: "Data as Intelligence",
    tagline: "Our data carries meaning. AI agents consume it directly. Decisions are data-driven by default.",
    color: "#00d4aa", // teal — Semantic Intelligence color
    diagnosticSignals: [
      "Enterprise ontology implemented (BIAN/FHIR/RAMI 4.0)",
      "Semantic layer is single source of truth",
      "Data quality runs autonomously",
      "AI agents operate on context-enriched data",
      "Data team is a strategic function",
      "Compliance is largely automated",
      "New sources onboarded in days, not weeks"
    ],
    orianIntervention: {
      entryPoint: "Enterprise Foundation",
      investment: "$1M-$3M",
      duration: "16-24 weeks initial",
      primaryPillar: "All four pillars",
      components: ["Full Semantic Intelligence", "Agent", "Skills", "Full Trust automation"],
      channels: ["All 5 — Tool as primary"],
      accelerationMetrics: [
        { label: "Year 2 efficiency gain", value: "40%" },
        { label: "Year 3 compounding", value: "80%" },
        { label: "3-year ROI multiplier", value: "4.2×" }
      ]
    },
    pathForward: "Your data is intelligent. Now let's make it generative — anticipating needs before they're articulated.",
    competitorContext: "Persistent has horizontal accelerators. We have standards-grounded ontologies. When the question is 'agent-ready data,' we have the deepest answer."
  },
  {
    level: 5,
    name: "Data with Intent",
    tagline: "Data anticipates decisions. The system reasons about what's needed before it's asked.",
    color: "#d946ef", // magenta — aspirational, distinct from other levels
    diagnosticSignals: [
      "Data infrastructure anticipates regulatory changes",
      "Knowledge graphs update in real-time",
      "AI agents on living ontologies that evolve with business",
      "Compliance is continuous, not periodic",
      "System surfaces what you don't know you need",
      "Decision intelligence and data platform have merged"
    ],
    orianIntervention: {
      entryPoint: "Strategic Partnership",
      investment: "Multi-year, outcome-based",
      duration: "Continuous evolution",
      primaryPillar: "All four — full ecosystem",
      components: ["Full ORIAN.Data platform", "Autonomous ontology evolution", "Self-tuning quality", "Generative context"],
      channels: ["All 5 — feedback loop operational"],
      accelerationMetrics: [
        { label: "Status", value: "North Star" },
        { label: "Horizon", value: "2027-2028" },
        { label: "Position", value: "Category-defining" }
      ]
    },
    pathForward: "This is where ORIAN.Data's 'Data with Intent' philosophy is fully realized. Every investment at Levels 1-4 compounds toward this destination.",
    competitorContext: "No competitor has a credible story for this level. This is whitespace Xoriant defines.",
    isNorthStar: true
  }
];

export const assessmentQuestions = [
  {
    id: "time-allocation",
    question: "What does your data team spend most of its time on?",
    options: [
      { text: "Keeping legacy systems alive", levelSignal: 1 },
      { text: "Building pipelines and dashboards on request", levelSignal: 2 },
      { text: "Managing governance and quality processes", levelSignal: 3 },
      { text: "Enabling AI/ML with curated, semantic data", levelSignal: 4 }
    ]
  },
  {
    id: "regulatory-response",
    question: "A regulator asks 'show me the lineage for this report.' What happens?",
    options: [
      { text: "Panic. Weeks of scrambling.", levelSignal: 1 },
      { text: "We can trace it — with significant manual effort", levelSignal: 2.5 },
      { text: "Automated lineage exists for critical paths", levelSignal: 3.5 },
      { text: "Real-time lineage with auto-generated compliance evidence", levelSignal: 4.5 }
    ]
  },
  {
    id: "ai-consumption",
    question: "How do your AI/ML models consume data?",
    options: [
      { text: "We're not doing AI/ML yet", levelSignal: 1.5 },
      { text: "Models pull from warehouses — raw tables", levelSignal: 2 },
      { text: "Feature stores exist but quality is inconsistent", levelSignal: 3 },
      { text: "Semantically enriched, quality-scored data with provenance", levelSignal: 4.5 }
    ]
  },
  {
    id: "semantic-consistency",
    question: "What does 'revenue' mean in your organization?",
    options: [
      { text: "Depends who you ask", levelSignal: 1.5 },
      { text: "Defined, but different systems calculate it differently", levelSignal: 2 },
      { text: "Consistent definition in a governed semantic layer", levelSignal: 3.5 },
      { text: "One definition, one source — consumed by humans and agents alike", levelSignal: 4.5 }
    ]
  },
  {
    id: "source-onboarding",
    question: "How long to onboard a new data source?",
    options: [
      { text: "Weeks to months", levelSignal: 1 },
      { text: "2-4 weeks with dedicated engineering", levelSignal: 2 },
      { text: "Days with automated ingestion", levelSignal: 3.5 },
      { text: "Hours with self-service schema inference", levelSignal: 4.5 }
    ]
  }
];

// Scoring: average all levelSignals, round to nearest 0.5, map to level
export function calculateMaturityLevel(answers) {
  const avg = answers.reduce((sum, a) => sum + a, 0) / answers.length;
  const rounded = Math.round(avg * 2) / 2;
  return {
    score: rounded,
    level: Math.min(5, Math.max(1, Math.round(rounded))),
    isTransitional: rounded % 1 !== 0 // e.g., 2.5 means between Level 2 and 3
  };
}
```

---

### POSITIONING IN THE PAGE

Insert this section after the Architecture Explorer (Act 3) and before the Solution Planner (Act 5). The navigation should update to include:

```
Hero → Architecture → Maturity → Solution Planner
```

Add a nav item: "Where Are You?" that scrolls to the maturity section.

### PERFORMANCE REQUIREMENTS

- All D3.js visualizations should use `requestAnimationFrame` for smooth scroll-linked animation
- Lazy load the maturity section — it contains heavy visualizations
- Assessment modal should not block the main thread
- Target: < 3s load time for the section on a throttled 3G connection
- Visualizations should gracefully degrade on low-end devices (reduce particle count, simplify animations)

# ORIAN.Data — Add ROI Calculator Section

## WHAT THIS IS

Add a new section to the ORIAN.Data experience website — an interactive ROI calculator that sits as **Section 5** between the Proof (industry use cases) and the Solution Planner. Update the section numbering so the Solution Planner becomes Section 6.

The updated site flow:
1. Hero (The Provocation)
2. Inversion (The Philosophy)
3. Architecture (Knowledge Graph)
4. Proof (Industry Use Cases)
5. **ROI Calculator (The Math) ← NEW**
6. Solution Planner (Conversion)

This calculator is NOT a generic TCO spreadsheet. It's an intent-driven ROI tool — the visitor starts with their business context and the calculator maps it to specific ORIAN.Data components and acceleration points. It should feel like a strategic conversation, not a finance exercise.

## DESIGN

Follow the existing site design system exactly:
- Background: var(--bg-deep) #060d1a
- Surface cards: var(--bg-card) rgba(15, 30, 55, 0.8) with backdrop-blur
- Pillar colors: Foundation #3b82f6, Semantic #00d4aa, AI #a78bfa, Trust #f5a623
- Accent: teal #00d4aa, amber #f5a623
- Text: white #ffffff, secondary #94a3b8, muted #64748b
- Fonts: 'Instrument Serif' for headlines, 'DM Sans' for body, 'JetBrains Mono' for numbers/data
- All animated counters use 'JetBrains Mono' for the numbers — gives them a data-precision feel
- Consistent with the rest of the site — dark, cinematic, alive

## FILE STRUCTURE

Add these files:
```
src/components/Section5_ROI/
  ├── ROISection.jsx            — Main container with section header
  ├── InputPanel.jsx            — Left side: three input blocks
  ├── OutputPanel.jsx           — Right side: results narrative
  ├── AccelerationMetrics.jsx   — The three big headline numbers
  ├── ValueBreakdown.jsx        — Five value levers with component links
  ├── TimelineChart.jsx         — Recharts 24-month comparison chart
  ├── DayOneTimeline.jsx        — Delivery channel timeline
  ├── CompoundingEffect.jsx     — 3-year compounding visualization
  └── roiCalculations.js        — All calculation logic (pure functions, no UI)
```

Update `App.jsx` to include the new section between Proof and Planner.

## LAYOUT

Two-column layout on desktop (>1200px): inputs 38% left, outputs 62% right.
Single column on mobile: inputs on top, outputs below.
Minimum height: 100vh. Allow expansion since the output panel has variable content.
Do NOT scroll-snap this section — it has interactive content that needs free scrolling.

---

## SECTION HEADER

```
Eyebrow: "THE MATH" — 11px, teal (#00d4aa), uppercase, letter-spacing 2px
Headline: "Don't take our word for it. Run your own numbers."
  — Instrument Serif, ~40px, white
  — "your own numbers" in italic with teal gradient fill
Subline: "Every enterprise data initiative has a cost of delay,
  a cost of rework, and a cost of context lost. This calculator
  quantifies what changes when data carries intent."
  — DM Sans, 16px, secondary color, max-width 640px, centered
```

---

## INPUT PANEL (Left Column)

Three input blocks, each with a conceptual header. Use frosted glass cards (bg-card + backdrop-blur + subtle border) for each block. Inputs should feel premium — custom-styled sliders with teal track color, clean dropdowns, toggle switches with teal active state.

### Block 1: "Your Data Estate"
Small label above block: "WHAT WE'RE WORKING WITH" — 10px, teal, uppercase, letter-spacing 1.5px

**Industry** — Styled dropdown (not native select)
- Options: BFSI, Healthcare & Life Sciences, Manufacturing, Technology, Retail, Other
- Default: BFSI
- Shows a small industry icon/emoji next to selection
- Selecting an industry changes the regulatory defaults in Block 3

**Data volume under management** — Custom slider
- Range: 1 TB → 1000 TB (1 PB)
- Scale: logarithmic (most enterprises are 1-100 TB)
- Labels at breakpoints: "Department" (1-10 TB), "Enterprise" (10-100 TB), "Complex Enterprise" (100+ TB)
- Display current value in large JetBrains Mono text above slider
- Unit: "TB"
- Default: 50 TB

**Number of source systems** — Custom slider
- Range: 5 → 500
- Default: 40
- Tooltip on hover: "ERP, CRM, data warehouses, SaaS platforms, legacy databases, flat files, APIs — count them all."

**Active data engineers** — Custom slider
- Range: 5 → 200
- Default: 25
- Display as large number with label "engineers"

### Block 2: "Your Current Reality"
Small label: "WHAT YOU'RE LIVING WITH" — 10px, amber (#f5a623), uppercase

**Average fully-loaded engineer cost** — Custom slider
- Range: $80,000 → $250,000 / year
- Default: $150,000
- Format: currency with commas
- Tooltip: "Salary + benefits + tools + overhead. If using contractors, use blended rate × 2080 hours."

**Time spent on maintenance vs. new value** — Custom slider with visual split
- Range: 20% → 80%
- Default: 55%
- Visual: a horizontal bar that splits into two colors — gray (maintenance) and teal (new value) — dynamically updating as the slider moves
- Label below: "Industry average: 40-60% maintenance"
- Show both percentages: "55% maintenance | 45% value creation"

**Average time to deploy a new data pipeline** — Styled pill selector (not dropdown)
- Options: "2-5 days", "1-2 weeks", "2-4 weeks", "4+ weeks"
- Default: "2-4 weeks"
- Selected pill gets teal background

**Annual data quality incident cost** — Custom slider
- Range: $0 → $10,000,000
- Default: $500,000
- Format: currency with commas, abbreviate millions (e.g., "$2.5M")
- Tooltip: "Include: regulatory fines, manual reconciliation hours, downstream decision errors, customer impact. Most enterprises underestimate this 3-5×."

### Block 3: "Your Ambitions"
Small label: "WHERE YOU NEED TO GO" — 10px, teal, uppercase

**Active or planned cloud migration?** — Toggle switch
- Default: off
- When toggled ON, two sub-inputs slide down with animation:
  - "Objects to migrate" — Slider: 500 → 50,000. Default: 5,000
  - "Source platform" — Pill selector: Oracle, SQL Server, Teradata, Netezza, Hadoop, Other

**Regulatory compliance requirements** — Multi-select pills
- Options: BCBS 239, GDPR, HIPAA, SOX, EU AI Act, DORA, MiFID II
- Multiple can be selected (teal fill when selected, border-only when not)
- Auto-suggest based on industry selection:
  - BFSI → pre-highlight BCBS 239, SOX
  - Healthcare → pre-highlight HIPAA
  - Manufacturing → pre-highlight GDPR
  - Others → no pre-selection
- Show count: "3 frameworks selected"

**Building for AI/agent consumption?** — Toggle switch
- Default: off
- When toggled ON, show a small note: "Adds inference readiness gap calculation — the cost of data that exists but isn't consumable by AI systems."

### Input Panel Footer
A small "Reset to defaults" link at the bottom of the input panel (muted text, teal on hover).

---

## OUTPUT PANEL (Right Column)

Outputs update in REAL TIME as inputs change. Use requestAnimationFrame for smooth counter animations — numbers should smoothly animate between values, not jump. All outputs derive from the calculation engine in roiCalculations.js.

### Output Block A: "The Acceleration" — Three Headline Metrics

Three large metric cards in a row, each in a frosted glass card:

**Card 1: Delivery Acceleration**
- Large number: e.g., "3.2×" — JetBrains Mono, 48px, white
- Label: "faster delivery" — DM Sans, 14px, secondary
- Sublabel: "Your 25 engineers operate at the output of 33" — DM Sans, 12px, muted
- Accent: teal left border (4px)

**Card 2: Annual Value Reclaimed**
- Large number: e.g., "$2.4M" — JetBrains Mono, 48px, white
- Label: "reclaimed annually" — DM Sans, 14px, secondary
- Sublabel: "Redirected from maintenance to value creation" — DM Sans, 12px, muted
- Accent: teal left border

**Card 3: Timeline Compressed**
- Large number: e.g., "14 months" — JetBrains Mono, 48px, white
- Label: "compressed" — DM Sans, 14px, secondary
- Sublabel: "Across migration + platform build" — DM Sans, 12px, muted
- Only shows if migration toggle is ON. If off, show "Breakeven" instead:
  - Large number: e.g., "4.2 months"
  - Label: "to breakeven"
  - Sublabel: "Investment recovered in under 5 months"
- Accent: teal left border

Animate numbers with a smooth counting effect when they change.

### Output Block B: "Where the Value Comes From" — Five Value Levers

A vertical stack of five expandable lever cards. Each card has:
- Left: colored bar (pillar color) showing relative magnitude
- Center: lever name + annual savings in large text
- Right: expand arrow
- Expanded: ORIAN.Data components involved (as clickable pills), description, and calculation basis

**Lever 1: Engineer Productivity Reclaimed**
- Color: purple (AI-Led Engineering pillar)
- Annual savings: calculated from productivity formula
- Components: ORIAN.Data.Skills, ORIAN.Data.Agent
- Expanded text: "25-35% capacity gain through AI-augmented SDLC. Context substrates — ontologies, data contracts, SKILL.md files — make AI effective where generic tools fail. Equivalent to adding {X} engineers without hiring."
- Calculation basis shown in small monospace: "{engineers} × ${avgCost} × {productivityGainPct} × {maintenancePct}"

**Lever 2: Pipeline Deployment Acceleration**
- Color: blue (Data Foundation pillar)
- Annual savings: calculated from pipeline formula
- Components: ORIAN.Data.Transform, ORIAN.Data.Ingest
- Expanded text: "New pipeline deployment: {currentTime} → {acceleratedTime} ({accelFactor}× faster). {additionalPipelines} additional pipelines delivered per year at current team size."

**Lever 3: Data Quality Cost Avoidance**
- Color: amber (Trust pillar)
- Annual savings: 80% of input DQ cost
- Components: Sentinel-DQ, ORIAN.Data.Ontology
- Expanded text: "Automated profiling, semantic validation, anomaly detection, and trust scoring. 80% reduction in manual reconciliation effort. Proactive quality gates replace reactive firefighting."

**Lever 4: Compliance Automation**
- Color: amber (Trust pillar)
- Annual savings: based on regulatory count
- Components: ORIAN.Data.Comply, ORIAN.Data.Lineage
- Expanded text: "Audit evidence auto-generation for {selectedFrameworks}. Continuous compliance monitoring replaces annual audit scramble. Audit prep compressed from weeks to hours."
- ONLY shows if at least one regulatory framework is selected. Hidden otherwise.

**Lever 5: Migration Acceleration**
- Color: blue (Data Foundation pillar)
- ONE-TIME savings (labeled clearly as "one-time, not annual")
- Components: ORIAN.Data.Migrate, ORIAN.Data.Estimate, ORIAN.Data.Test
- Expanded text: "{migrationObjects} objects migrated at 3× speed. Scoping compressed from 3 weeks to 3 days. Timeline: {traditionalMonths} months → {acceleratedMonths} months."
- ONLY shows if migration toggle is ON. Hidden otherwise.

**Lever 6: AI Readiness** (conditional)
- Color: teal (Semantic pillar)
- Annual savings: based on data volume
- Components: ORIAN.Data.Context, ORIAN.Data.Ontology, ORIAN.Data.Semantic
- Expanded text: "Inference-ready data delivery — context-rich, trust-scored, freshness-certified. Closes the gap between 'we have data' and 'agents can consume it.'"
- ONLY shows if AI toggle is ON. Hidden otherwise.

The total bar at the bottom of the lever stack:
```
TOTAL FIRST-YEAR VALUE: $X.XM
(Annual: $X.XM + One-time: $X.XM)
```
Large, bold, teal accent.

### Output Block C: "The Timeline" — 24-Month Comparison Chart

Use Recharts AreaChart with these specs:

- X-axis: Months 0-24
- Y-axis: Cumulative cost ($)
- Two area series:

**Series 1: "Current trajectory"** (gray, dashed border, 10% fill opacity)
- Cumulative cost of: (engineers × avgCost × maintenancePct / 12) per month
- Plus: dqCost / 12 per month
- Plus: compliance costs / 12 per month
- Plus: migration cost spread across migrationTimelineMonths (if applicable)
- Trend: linear growth with slight upward curve (complexity increases over time, +2% per quarter)

**Series 2: "With ORIAN.Data"** (teal, solid border, 15% fill opacity)
- Month 0-1: Initial engagement cost (negative ROI)
- Month 1-3: Day 1 channels active (Specs, Prompts, Standards) — partial savings begin (30% of full rate)
- Month 3-6: Code channel active + first pillar deployed — savings ramp to 70%
- Month 6+: Full platform active — full savings rate
- Trend: flattens and diverges from gray curve

**Breakeven marker**: Amber vertical dashed line where teal cumulative savings = engagement cost. Label: "Breakeven: Month {X}"

**Shaded area between curves**: Light teal fill (5% opacity) with a large centered label: "Value captured: ${X.X}M over 24 months"

Chart styling:
- Dark background (match site bg)
- Grid lines at 5% opacity
- Axis labels in JetBrains Mono, 11px, muted color
- Smooth curves (type="monotone")
- Animated on scroll-into-view (draw left to right)
- Tooltip on hover showing both values at that month

### Output Block D: "The Day 1 Difference" — Delivery Channel Timeline

A vertical timeline visualization showing when value starts flowing. NOT a chart — a styled list with connecting lines.

```
─── DAY 1 ─────────────────────── No security clearance needed ───
│
├── 📐 Specs & Frameworks
│   Architecture blueprints in your Git repo
│
├── 🧠 Prompts & Skills  
│   Your engineers using ORIAN patterns in AI assistants today
│
├── 📋 Standards & Best Practices
│   ISO 25012 checklists, regulatory compliance frameworks
│
─── WEEK 2-4 ──────────────────── Minimal clearance ─────────────
│
├── 💻 Code Libraries
│   DQ validators, migration scripts, ontology models
│
─── MONTH 2+ ──────────────────── Full platform clearance ───────
│
└── ⚡ ORIAN.Data Platform
    Polymorphic AI agent, full automation, continuous learning
```

Each tier has a small colored indicator:
- Day 1 items: green dot (immediate)
- Week 2-4: yellow dot (quick)
- Month 2+: blue dot (full deployment)

Below the timeline:
Field note (italic amber, Instrument Serif, slightly smaller):
"We built five delivery channels because we've watched too many accelerators die in security review. The best tool in the world is worthless if it arrives after the engagement is half over."

### Output Block E: "The Compounding Effect" — Three-Year View

Three columns showing years 1-3 as an escalating visual. Each year is a card that grows taller than the previous.

**Year 1: ACCELERATE** (card height: base)
- "Immediate productivity gains"
- "Migration completed faster"
- "Quality baseline established"
- Bottom metric: "Baseline value: ${year1Value}"

**Year 2: COMPOUND** (card height: 1.4× base)
- "Every engagement enriches the skill library"
- "Ontology models deepen with validated extensions"
- "Quality rules grow with each regulatory engagement"
- Bottom metric: "40% more efficient than Year 1"
- Projected value: ${year2Value} (year 1 × 1.4)

**Year 3: DIFFERENTIATE** (card height: 1.8× base)
- "Your data estate carries business intent, not just schemas"
- "Agents consume trusted, context-rich data"
- "Competitors are still building pipelines. You're building outcomes."
- Bottom metric: "Cumulative 3-year value: ${threeYearValue}"
- threeYearValue = year1 + year1*1.4 + year1*1.8

The three cards animate in sequence (staggered entrance) when scrolled into view. A subtle growth line connects them showing the compounding trajectory.

Below: "ORIAN.Data doesn't just accelerate Year 1. It makes every subsequent year faster than the last." — DM Sans, 14px, muted.

---

## CALCULATION ENGINE (roiCalculations.js)

This file exports pure functions. No UI code. All calculations are deterministic based on inputs.

```javascript
// ─── INPUT INTERFACE ───
// {
//   industry: string,
//   dataVolumeTB: number,
//   sourceSystems: number,
//   engineers: number,
//   avgCost: number,
//   maintenancePct: number (0-1),
//   pipelineTime: string ("days" | "1-2 weeks" | "2-4 weeks" | "4+ weeks"),
//   dqCost: number,
//   hasMigration: boolean,
//   migrationObjects: number,
//   migrationSource: string,
//   regulations: string[],
//   buildingForAI: boolean
// }

// ─── CONSTANTS ───
const PRODUCTIVITY_GAIN_PCT = 0.30;          // 25-35% midpoint
const DQ_REDUCTION_PCT = 0.80;               // 80% reduction
const COMPLIANCE_COST_PER_FRAMEWORK = 120000; // annual per framework
const COMPLIANCE_REDUCTION_PCT = 0.65;        // 65% reduction
const MIGRATION_COST_PER_OBJECT = 120;        // $ avg
const MIGRATION_ACCELERATION = 0.65;          // 65% faster
const AI_READINESS_COST_PER_TB = 2000;        // $
const AI_READINESS_SAVING_PCT = 0.50;         // 50%
const COMPLEXITY_GROWTH_PER_QUARTER = 0.02;   // 2% quarterly growth

const PIPELINE_ACCELERATION = {
  "days": { factor: 1.5, acceleratedLabel: "1-2 days" },
  "1-2 weeks": { factor: 3, acceleratedLabel: "2-3 days" },
  "2-4 weeks": { factor: 5, acceleratedLabel: "3-5 days" },
  "4+ weeks": { factor: 7, acceleratedLabel: "4-7 days" }
};

// Average pipelines per engineer per year at current velocity
const AVG_PIPELINES_PER_ENGINEER = 12;

// ─── LEVER CALCULATIONS ───

export function calculateProductivity(engineers, avgCost, maintenancePct) {
  const annualSavings = engineers * avgCost * PRODUCTIVITY_GAIN_PCT * maintenancePct;
  const equivalentEngineers = Math.round(engineers * PRODUCTIVITY_GAIN_PCT);
  const effectiveTeamSize = engineers + equivalentEngineers;
  return {
    annualSavings: Math.round(annualSavings),
    equivalentEngineers,
    effectiveTeamSize,
    label: `Your ${engineers} engineers operate at the output of ${effectiveTeamSize}`,
    components: ["skills", "agent"]
  };
}

export function calculatePipelineAcceleration(engineers, avgCost, pipelineTime) {
  const { factor, acceleratedLabel } = PIPELINE_ACCELERATION[pipelineTime];
  const additionalPipelines = Math.round(
    engineers * AVG_PIPELINES_PER_ENGINEER * (1 - 1 / factor)
  );
  const annualSavings = Math.round(
    additionalPipelines * (avgCost / AVG_PIPELINES_PER_ENGINEER)
  );
  return {
    annualSavings,
    accelerationFactor: factor,
    currentTime: pipelineTime,
    acceleratedTime: acceleratedLabel,
    additionalPipelines,
    label: `${pipelineTime} → ${acceleratedLabel} (${factor}× faster)`,
    components: ["transform", "ingest"]
  };
}

export function calculateDQSavings(dqCost) {
  const annualSavings = Math.round(dqCost * DQ_REDUCTION_PCT);
  return {
    annualSavings,
    reductionPct: DQ_REDUCTION_PCT * 100,
    label: `${DQ_REDUCTION_PCT * 100}% reduction in manual reconciliation`,
    components: ["sentinel-dq", "ontology"]
  };
}

export function calculateComplianceSavings(regulations) {
  if (regulations.length === 0) return null;
  const annualSavings = Math.round(
    regulations.length * COMPLIANCE_COST_PER_FRAMEWORK * COMPLIANCE_REDUCTION_PCT
  );
  return {
    annualSavings,
    frameworkCount: regulations.length,
    frameworks: regulations,
    reductionPct: COMPLIANCE_REDUCTION_PCT * 100,
    label: `Automation across ${regulations.length} frameworks`,
    components: ["comply", "lineage"]
  };
}

export function calculateMigrationSavings(hasMigration, migrationObjects) {
  if (!hasMigration || migrationObjects === 0) return null;
  const oneTimeSavings = Math.round(
    migrationObjects * MIGRATION_COST_PER_OBJECT * MIGRATION_ACCELERATION
  );
  const traditionalMonths = Math.round(migrationObjects / 1000 * 3);
  const acceleratedMonths = Math.max(1, Math.round(traditionalMonths / 3));
  const timelineCompression = traditionalMonths - acceleratedMonths;
  return {
    oneTimeSavings,
    traditionalMonths,
    acceleratedMonths,
    timelineCompression,
    label: `${migrationObjects.toLocaleString()} objects: ${traditionalMonths}mo → ${acceleratedMonths}mo`,
    components: ["migrate", "estimate", "test"]
  };
}

export function calculateAIReadiness(buildingForAI, dataVolumeTB) {
  if (!buildingForAI) return null;
  const annualSavings = Math.round(
    dataVolumeTB * AI_READINESS_COST_PER_TB * AI_READINESS_SAVING_PCT
  );
  return {
    annualSavings,
    label: "Inference-ready data delivery",
    components: ["context", "ontology", "semantic-layer"]
  };
}

// ─── AGGREGATE CALCULATIONS ───

export function calculateTotals(levers) {
  const annual = Object.values(levers)
    .filter(l => l !== null && l.annualSavings)
    .reduce((sum, l) => sum + l.annualSavings, 0);

  const oneTime = levers.migration?.oneTimeSavings || 0;
  const firstYear = annual + oneTime;

  return { annual, oneTime, firstYear };
}

export function calculateAccelerationFactor(levers, pipelineTime) {
  const pipelineFactor = PIPELINE_ACCELERATION[pipelineTime]?.factor || 3;
  const weighted = (
    pipelineFactor * 0.30 +
    3.0 * 0.25 +                               // migration standard 3×
    (1 / (1 - PRODUCTIVITY_GAIN_PCT)) * 0.25 +  // productivity
    (1 / (1 - DQ_REDUCTION_PCT)) * 0.20          // quality
  );
  return Math.round(weighted * 10) / 10;
}

export function calculateBreakeven(engineers, annualSavings) {
  const engagementCost = engineers > 50 ? 800000 : engineers > 20 ? 400000 : 200000;
  const monthlySavings = annualSavings / 12;
  const months = monthlySavings > 0 ? Math.ceil(engagementCost / monthlySavings) : 99;
  return { months, engagementCost };
}

export function calculateTimelineData(inputs, totals, breakeven) {
  // Generate 24 monthly data points for the comparison chart
  const points = [];
  const monthlyTraditional = (
    inputs.engineers * inputs.avgCost * inputs.maintenancePct / 12
  ) + (inputs.dqCost / 12);

  const monthlySavings = totals.annual / 12;
  const engagementCost = breakeven.engagementCost;

  let cumulativeTraditional = 0;
  let cumulativeOrian = engagementCost; // starts negative (investment)

  for (let month = 0; month <= 24; month++) {
    const quarterGrowth = 1 + COMPLEXITY_GROWTH_PER_QUARTER * Math.floor(month / 3);

    // Traditional: steady cost with slight growth
    cumulativeTraditional += monthlyTraditional * quarterGrowth;

    // ORIAN: ramping savings
    let savingsRate = 0;
    if (month <= 1) savingsRate = 0;          // engagement setup
    else if (month <= 3) savingsRate = 0.30;   // Day 1 channels (30%)
    else if (month <= 6) savingsRate = 0.70;   // code + first pillar (70%)
    else savingsRate = 1.0;                     // full platform (100%)

    const monthCost = monthlyTraditional * quarterGrowth;
    const monthSaving = monthlySavings * savingsRate;
    cumulativeOrian += (monthCost - monthSaving);

    points.push({
      month,
      traditional: Math.round(cumulativeTraditional),
      withOrian: Math.round(cumulativeOrian),
      savings: Math.round(cumulativeTraditional - cumulativeOrian)
    });
  }

  return points;
}

export function calculateThreeYearValue(annualSavings, oneTimeSavings) {
  const year1 = annualSavings + oneTimeSavings;
  const year2 = Math.round(annualSavings * 1.4); // 40% more efficient
  const year3 = Math.round(annualSavings * 1.8); // compounding effect
  const total = year1 + year2 + year3;
  return { year1, year2, year3, total };
}
```

---

## SECTION CLOSING

Below all output blocks, centered:

**Evidence line** (DM Sans, 14px, muted):
"These aren't projections from a model. They're patterns from architectures we've built, migrations we've delivered, and audits we've survived."

**Field note** (Instrument Serif italic, 16px, amber):
"The most expensive data investment is the one that never reaches a decision."

**Transition CTA to Solution Planner** (centered, with downward arrow):
"Ready to go from numbers to a plan? →"
Button: "Build my solution plan" — scrolls to Section 6 (Solution Planner)

---

## ANIMATION BEHAVIOR

### On Scroll Enter (Intersection Observer at 20% visibility)
1. Section header fades up (0-0.5s)
2. Input panel slides in from left (0.3-0.8s)
3. Output panel fades in (0.5-1s)
4. Headline metrics count up from 0 to calculated values (1-2s, easing: easeOutExpo)
5. Value lever bars animate their widths from 0 to proportional size (1.5-2.5s, staggered 150ms each)
6. Timeline chart draws left to right (2-3s)

### On Input Change
- All output numbers animate smoothly to new values (300ms transition, no jumps)
- Use requestAnimationFrame for counter animations
- Value lever bar widths animate to new proportions
- Timeline chart redraws with smooth transition
- Debounce slider inputs (100ms) to prevent jitter

### Ambient
- Subtle teal glow behind the headline metrics (pulsing 3s cycle, 5% opacity variation)
- The three-year compounding cards have a very subtle upward float animation (2px, 4s cycle, staggered)

---

## RESPONSIVE BEHAVIOR

### Desktop (>1200px)
Two columns: 38% inputs, 62% outputs. Side by side.

### Tablet (768-1200px)
Two columns but 45% / 55% split. Slightly smaller fonts and metrics.

### Mobile (<768px)
Single column: inputs stacked on top, outputs below.
- Headline metrics become a vertical stack (not horizontal row)
- Value levers: expanded state is default on mobile (no collapse/expand)
- Timeline chart: reduce to 12 months, smaller height (200px)
- Three-year cards: horizontal scroll instead of side-by-side
- Delivery channel timeline: compact vertical list

---

## INTEGRATION NOTES

1. Component pills in the value breakdown (e.g., "ORIAN.Data.Skills", "Sentinel-DQ") should be clickable. On click, smooth-scroll to Section 3 (Architecture Explorer) and highlight that component in the knowledge graph. This requires a shared state or event bus between sections — use React context or a simple custom event.

2. The "Build my solution plan" CTA at the bottom should scroll to Section 6 AND pre-fill the Solution Planner with context from the calculator inputs. For example, if the visitor selected BFSI + BCBS 239 + migration of 5000 objects, the planner should pre-populate with: "We're a BFSI organization with BCBS 239 compliance requirements, planning to migrate 5,000 objects, with a team of 25 data engineers." This requires passing calculator state to the planner section.

3. Load the component data from `orian-knowledge-graph.json` — use the same data source as Section 3 and Section 4. The component names, pillar colors, and IDs must match exactly.

4. The industry-regulatory auto-suggestion (BFSI → BCBS 239 + SOX) is a UX convenience, not a lock — visitors can always deselect and choose different frameworks.

5. All currency values should format with commas and appropriate abbreviation: values under $1M show full (e.g., "$380,000"), values $1M+ show abbreviated (e.g., "$2.4M"), values $1B+ show abbreviated (e.g., "$1.2B"). Use a shared formatCurrency utility.

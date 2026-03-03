# ORIAN.Data Knowledge Graph — Claude Code Build Prompt

## WHAT TO BUILD

Build an interactive D3.js knowledge graph visualization for ORIAN.Data's ontological architecture. This is the centerpiece of the ORIAN.Data experience website homepage — it shows how 17 platform components across 4 pillars connect, depend on each other, and flow intent through the system.

The data is in `orian-knowledge-graph.json` in this repo. Use it as the single source of truth. Do not hardcode data — load from the JSON.

## TECH STACK

- React + Vite
- D3.js (force-directed graph with manual pillar clustering)
- Tailwind CSS (dark theme)
- Framer Motion (for UI element animations, not the graph itself)
- Deploy target: Netlify

## DESIGN SYSTEM

```
Background: #060d1a (deep navy)
Surface: #0a1628 (navy)
Card: rgba(15, 30, 55, 0.8) with backdrop-blur
Border: rgba(0, 212, 170, 0.08)

Pillar colors:
  Foundation: #3b82f6 (blue)
  Semantic Intelligence: #00d4aa (teal)  
  AI-Led Engineering: #a78bfa (purple)
  Trust & Operations: #f5a623 (amber)

Text:
  Primary: #ffffff
  Secondary: #94a3b8
  Muted: #64748b

Typography:
  Display: 'Instrument Serif' from Google Fonts
  Body: 'DM Sans' from Google Fonts
  Code/raw: 'JetBrains Mono' or 'Fira Code' from Google Fonts
```

## GRAPH LAYOUT STRUCTURE

The graph has a CENTER NODE and FOUR QUADRANTS:

```
  ┌─────────────────┬─────────────────┐
  │                  │                  │
  │   FOUNDATION     │   SEMANTIC       │
  │   (blue)         │   (teal)         │
  │   4 components   │   4 components   │
  │                  │                  │
  ├────────── ORIAN.Data ──────────────┤
  │           (center node)            │
  │                  │                  │
  │   AI-LED         │   TRUST &        │
  │   (purple)       │   OPS (amber)    │
  │   4 components   │   5 components   │
  │                  │                  │
  └─────────────────┴─────────────────┘
```

### Center Node
- Largest node (radius ~40px)
- Label: "ORIAN.Data" with subtitle "Data with Intent"
- Pulsing teal glow
- All component nodes connect to center with faint lines

### Component Nodes
- Medium nodes (radius ~18-22px based on maturity: production=22, field-tested=20, MVP=18, concept=16)
- Colored by pillar
- Label below/beside each node
- Glow on hover

### Edge Lines
- Cross-pillar edges (from edges array in JSON) shown as curved bezier lines
- Colored as gradient from source pillar color to target pillar color
- Thickness: 1px default, 2px on hover
- Edge labels shown on hover: "enriches", "validates", "feeds", etc.
- Animated data flow particles traveling along edges (small dots moving from source to target at varying speeds)

### Industry Ontology Nodes (OUTER RING)
- Smaller nodes (radius ~10px) positioned OUTSIDE the main quadrants
- BIAN, FHIR, RAMI 4.0, BCBS 239, etc. from industryOntologies in JSON
- Connected to their relevant components with dotted lines
- Grouped near relevant pillar (BIAN near semantic+trust, FHIR near semantic, etc.)

## INTERACTIONS

### Hover on Component Node
Show a tooltip card (backdrop-blur panel) with:
- Component full name (e.g., "ORIAN.Data.Migrate")
- Pillar badge (colored pill)
- Description (1-2 lines from JSON)
- Provenance line in italic amber (#f5a623) if it exists
- Delivery channel icons (show which of the 5 channels this component is available through)
- Industry tags as small pills
- Maturity badge (production ✓✓✓, field-tested ✓✓, MVP ✓, concept ○)

### Hover on Component Node — Graph Effect
- Highlight ALL edges connected to this node (brighten to full pillar color, increase thickness)
- Dim all non-connected nodes and edges to 20% opacity
- Connected nodes stay at full brightness
- Data flow particles on highlighted edges speed up

### Click on Component Node
- Pin the tooltip open
- Show the component's capabilities as an expanded list
- Show connected use cases from the useCases data (filter by component ID)
- "View use cases →" link for each industry

### Hover on Edge
- Show edge label ("enriches", "validates", "feeds", etc.)
- Highlight source and target nodes
- Show small description of the relationship

### Delivery Channel Filter Bar
- Fixed at bottom of the graph area
- 5 buttons with icons matching deliveryChannels in JSON
- Default: all channels active (all components visible)
- Click a channel: only show components that include that channel in their `channels` array
- Non-matching components fade to 15% opacity
- Edge lines adjust accordingly (hide edges where either end is faded)
- Show count: "12 of 17 components" next to active filter
- "Day 1 value" badge appears next to Specs, Prompts, Standards channels (securityClearance: "none")

### Pillar Zone Headers
- Each quadrant has a subtle label at its top: pillar name + purpose statement
- Faint background wash of the pillar color (5% opacity) behind each quadrant
- Clicking a pillar header highlights all components in that pillar

## ANIMATION

### On Load (staggered entrance)
1. Center ORIAN.Data node fades in and pulses (0-0.5s)
2. Pillar zone labels fade in (0.3-0.8s)
3. Component nodes appear one by one, starting from foundation → semantic → ai → trust (0.5-3s)
4. Edges draw themselves in sequentially (2-4s) using SVG stroke-dashoffset animation
5. Data flow particles begin moving along edges (3s+)
6. Industry ontology outer ring nodes fade in last (3.5-4.5s)
7. Delivery channel filter bar slides up from bottom (4s)

### Ambient Animation (continuous)
- Slow, subtle drift on all nodes (±2px oscillation, different speeds per node)
- Data flow particles traveling along edges (small 3px circles, pillar-colored, moving source→target)
- Center node: gentle pulsing glow (2s cycle)
- Faint grid lines in background (same as hero section)

### Value Chain Highlight Mode
- Add a toggle/button: "Show Value Chain"
- When activated, animate the outcomeToComponent path from the JSON:
  - Business outcome label appears at top
  - Light traces through the relevant components in sequence
  - Each component pulses as the trace reaches it
  - Final delivery channel lights up at the bottom
- This demonstrates the "Value-to-Data" philosophy as a live graph traversal

## RESPONSIVE BEHAVIOR

- Desktop (>1200px): Full graph with all labels, tooltips, and interactions
- Tablet (768-1200px): Slightly smaller nodes, tooltips above graph, delivery bar becomes horizontal scroll
- Mobile (<768px): Replace force graph with a structured pillar-accordion view. Each pillar expands to show its components as cards. Cross-pillar connections shown as "connects to: X, Y, Z" text.

## FILE STRUCTURE

```
src/
  components/
    KnowledgeGraph/
      KnowledgeGraph.jsx      — Main container, loads JSON, manages state
      GraphCanvas.jsx          — D3.js SVG graph rendering
      NodeTooltip.jsx          — Hover/click tooltip panel
      DeliveryChannelBar.jsx   — Bottom filter bar
      PillarZone.jsx           — Quadrant label and background
      EdgeParticles.jsx        — Animated data flow particles
      ValueChainOverlay.jsx    — Value chain highlight animation
      MobileAccordion.jsx      — Mobile fallback view
    data/
      orian-knowledge-graph.json
```

## CRITICAL DETAILS

1. The graph must feel ALIVE. Not a static diagram. The ambient particle flow, node drift, and edge animations should create the feeling of a living system where data and intent are constantly flowing.

2. The provenance lines are IMPORTANT. They carry the "earned trust" narrative. They should be visually distinct — italic, amber colored, slightly smaller font. They appear only when a component has a provenance field.

3. The delivery channel filter is a KEY DIFFERENTIATOR. When a user clicks "Prompts & Skills" and sees 12 of 17 components light up with a "Day 1 — No security clearance required" badge, that's the competitive weapon. Make this interaction feel significant — not just a filter, but a revelation.

4. Cross-pillar edges are what make this a KNOWLEDGE GRAPH, not a product catalog. The fact that Ontology enriches Sentinel-DQ, which certifies Context, which gets protected by Shield — this shows the system thinking. Highlight these cross-pillar connections visually (gradient-colored edges that blend source and target pillar colors).

5. The center ORIAN.Data node should feel gravitational — everything orbits and connects to it. It's the platform, the hub, the unifying force.

6. Performance: use requestAnimationFrame for particle animations, not setInterval. Keep SVG elements minimal — use <g> groups and transform for positioning. Debounce hover events. Consider Canvas 2D for particles if SVG becomes too heavy.

7. Accessibility: all interactive elements should be keyboard-navigable. Node descriptions should be available via aria-labels. Color alone should not be the only differentiator — use shape/size differences alongside color for pillar grouping.

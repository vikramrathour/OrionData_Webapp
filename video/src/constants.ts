// === Colors (Xoriant-matched light theme) ===
export const COLORS = {
  BG_WHITE: '#ffffff',
  BG_LIGHT: '#f8f9fa',
  BG_SURFACE: '#f1f3f5',
  GREEN: '#00b23b',
  BLUE: '#3b82f6',
  PURPLE: '#a78bfa',
  AMBER: '#f5a623',
  TEXT_PRIMARY: '#1a1a1a',
  TEXT_SECONDARY: '#4a5568',
  TEXT_MUTED: '#94a3b8',
} as const;

export const PILLAR_COLORS = {
  foundation: COLORS.BLUE,
  semantic: COLORS.GREEN,
  ai: COLORS.PURPLE,
  trust: COLORS.AMBER,
} as const;

// === Timing (frames at 30fps) ===
export const FPS = 30;
export const DURATION_SECONDS = 180;
export const TOTAL_FRAMES = FPS * DURATION_SECONDS; // 5400

export const SCENE_TIMING = {
  hero: { start: 0, duration: 900 },        // 0:00–0:30
  inversion: { start: 900, duration: 1200 }, // 0:30–1:10
  architecture: { start: 2100, duration: 1200 }, // 1:10–1:50
  proof: { start: 3300, duration: 900 },     // 1:50–2:20
  roi: { start: 4200, duration: 900 },       // 2:20–2:50
  close: { start: 5100, duration: 300 },     // 2:50–3:00
} as const;

// === Content ===
export const HERO_CONTENT = {
  phases: ['Observing raw data', 'Decoding intent...', 'Intent resolved'],
  headline: [
    'Every enterprise has data.',
    'Almost none of it',
    'knows why it exists.',
  ],
  description:
    'ORIAN.Data is a composable, AI-native platform accelerator that starts from the outcome you need — and works backward to the minimum data required to achieve it.',
  tagline: 'Earned in the field. Encoded in the platform.',
};

export const INVERSION_CONTENT = {
  eyebrow: 'THE PHILOSOPHY',
  headline: 'What if data started from the answer?',
  oldWay: ['Sources', 'Ingestion', 'Lake', 'Transform', 'Dashboards', 'Human squints'],
  newWay: ['Outcome', 'Intent', 'Data', 'Quality', 'Agent'],
  metrics: [
    { value: '3.5×', label: 'faster' },
    { value: '84%', label: 'less cost' },
    { value: '97%', label: 'less data' },
    { value: '100%', label: 'aligned' },
  ],
  quote: 'Infrastructure disciplined by demand, not justified by supply.',
};

export const ARCHITECTURE_CONTENT = {
  eyebrow: 'THE ARCHITECTURE',
  headline: '17 components. 4 pillars. One composable system.',
  pillars: [
    {
      name: 'Data Foundation',
      color: COLORS.BLUE,
      components: ['Ingest', 'Migrate', 'Transform', 'Catalog'],
    },
    {
      name: 'Semantic Intelligence',
      color: COLORS.GREEN,
      components: ['Ontology', 'Context', 'Lineage', 'Quality'],
    },
    {
      name: 'AI-Led Engineering',
      color: COLORS.PURPLE,
      components: ['Codegen', 'Testing', 'Deploy', 'Monitor'],
    },
    {
      name: 'Trust & Operations',
      color: COLORS.AMBER,
      components: ['Govern', 'Secure', 'Observe', 'Cost', 'Comply'],
    },
  ],
  channels: ['Tool', 'Specs', 'Prompts', 'Standards', 'Code'],
};

export const PROOF_CONTENT = {
  eyebrow: 'THE PROOF',
  headline: '35 use cases. 5 industries. Every outcome earned, not promised.',
  industries: ['BFSI', 'Healthcare', 'Manufacturing', 'Tech', 'Retail'],
  stats: [
    { value: 49.65, suffix: ' TB', label: 'migrated' },
    { value: 11748, suffix: '', label: 'tables' },
    { value: 145, prefix: '$', suffix: 'K/mo', label: 'saved' },
    { value: 99.5, suffix: '%', label: 'accuracy' },
  ],
  fieldNote:
    "We've sat across from the OCC examiner. We know what they actually ask for.",
  closing: "These aren't projections. They're receipts.",
};

export const ROI_CONTENT = {
  eyebrow: 'THE MATH',
  headline: "Don't take our word for it. Run your own numbers.",
  topMetrics: [
    { value: '3.2×', label: 'faster delivery' },
    { value: '$1.2M', label: 'reclaimed' },
    { value: '5 months', label: 'to breakeven' },
  ],
  levers: [
    { label: 'Migration Acceleration', amount: 420000, color: COLORS.BLUE },
    { label: 'Pipeline Automation', amount: 310000, color: COLORS.BLUE },
    { label: 'Semantic Reuse', amount: 280000, color: COLORS.GREEN },
    { label: 'AI Code Generation', amount: 195000, color: COLORS.PURPLE },
    { label: 'Quality Automation', amount: 165000, color: COLORS.AMBER },
    { label: 'Governance Efficiency', amount: 130000, color: COLORS.AMBER },
  ],
  years: [
    { year: 1, label: 'ACCELERATE', value: '$1.2M' },
    { year: 2, label: 'COMPOUND', value: '$2.8M' },
    { year: 3, label: 'DIFFERENTIATE', value: '$5.1M' },
  ],
};

export const CLOSE_CONTENT = {
  eyebrow: 'YOUR TURN',
  headline: "Tell us the outcome. We'll decode the intent.",
  engagements: [
    { name: 'Discovery Sprint', duration: '2 weeks' },
    { name: 'Single Pillar', duration: '8–12 weeks' },
    { name: 'Enterprise Foundation', duration: '16–24 weeks' },
  ],
  url: 'orian.data',
};

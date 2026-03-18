export interface AccelerationMetric {
  label: string
  value: string
}

export interface OrianIntervention {
  entryPoint: string
  investment: string
  duration: string
  primaryPillar: string
  components: string[]
  channels: string[]
  accelerationMetrics: AccelerationMetric[]
}

export interface MaturityLevelData {
  level: number
  name: string
  tagline: string
  color: string
  diagnosticSignals: string[]
  orianIntervention: OrianIntervention
  pathForward: string
  competitorContext: string
  isNorthStar?: boolean
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: { text: string; levelSignal: number }[]
}

export const maturityLevels: MaturityLevelData[] = [
  {
    level: 1,
    name: 'Data as Liability',
    tagline: 'We have data. It costs us money and creates risk.',
    color: '#ef4444',
    diagnosticSignals: [
      'Legacy warehouses running on license-renewal inertia',
      'No one trusts the reports — shadow spreadsheets everywhere',
      'Engineers spend 70%+ time on maintenance',
      'Compliance is manual and always behind',
      'Data conversations are about costs, never outcomes',
      'CDO reports to IT, not the C-suite',
    ],
    orianIntervention: {
      entryPoint: 'Intent Discovery Sprint',
      investment: '$80K–$150K',
      duration: '2 weeks',
      primaryPillar: 'Data Foundation',
      components: ['Catalyst', 'Catalog', 'Migrate'],
      channels: ['Specs', 'Standards'],
      accelerationMetrics: [
        { label: 'Migration cost reduction', value: '65%' },
        { label: 'Migration speed', value: '3×' },
        { label: 'Scoping acceleration', value: '7×' },
      ],
    },
    pathForward:
      'The Discovery Sprint generates the business case. Here\'s what you have. Here\'s what it costs. Here\'s the path out.',
    competitorContext:
      'Cognizant and TCS will offer to run your legacy systems. We show you how to leave them.',
  },
  {
    level: 2,
    name: 'Data as Infrastructure',
    tagline: 'We\'ve modernized. Data flows. But nobody agrees on what the numbers mean.',
    color: '#3b82f6',
    diagnosticSignals: [
      'Cloud migration done but reports still don\'t match',
      '"Revenue" means three things in three systems',
      '200 dashboards, people still use spreadsheets',
      'Data engineering is productive but reactive',
      'Quality addressed per-incident, not systematically',
      'AI/ML experiments exist but don\'t reach production',
    ],
    orianIntervention: {
      entryPoint: 'Pillar Activation',
      investment: '$300K–$600K',
      duration: '8–12 weeks',
      primaryPillar: 'Semantic Intelligence + Trust',
      components: ['Ontology', 'Semantic', 'OrionDQ', 'Catalog'],
      channels: ['Specs', 'Prompts', 'Standards', 'Code'],
      accelerationMetrics: [
        { label: 'Engineer capacity gain', value: '25–35%' },
        { label: 'DQ cost reduction', value: '80%' },
        { label: 'Pipeline deployment', value: '5–7×' },
      ],
    },
    pathForward:
      'Your infrastructure works. Your semantics don\'t. We start with the semantic layer — one source of truth for business concepts.',
    competitorContext:
      'LTIMindtree and Wipro can modernize your stack. Neither has an ontology play for when the question becomes "what does the data mean?"',
  },
  {
    level: 3,
    name: 'Data as Governed Asset',
    tagline: 'We trust our data. We can trace it. Regulators are satisfied. But we\'re still reactive.',
    color: '#f5a623',
    diagnosticSignals: [
      'Strong foundation, semantic consistency in core domains',
      'Data quality measured and managed',
      'Lineage exists for critical paths',
      'Compliance works but takes 6,000+ person-hours annually',
      'Data team seen as service function, not strategic driver',
      'AI models work in lab, struggle in production',
      'Governance is solid but a bottleneck',
    ],
    orianIntervention: {
      entryPoint: 'Pillar Activation or Enterprise Foundation',
      investment: '$500K–$1.5M',
      duration: '12–20 weeks',
      primaryPillar: 'AI-Led Engineering + Trust (automation)',
      components: ['Context', 'Comply', 'Lineage', 'Assist', 'Skills', 'Observe'],
      channels: ['All 5'],
      accelerationMetrics: [
        { label: 'Compliance effort reduction', value: '65%/framework' },
        { label: 'Impact analysis', value: '50× faster' },
        { label: 'AI readiness cost', value: '50% reduction' },
      ],
    },
    pathForward:
      'Your governance works but it\'s manual. The gap between "trusted data" and "data AI agents can reason over" is context.',
    competitorContext:
      'Tredence and Tiger Analytics build analytics on top. We build the foundation underneath. Different layer, different value.',
  },
  {
    level: 4,
    name: 'Data as Intelligence',
    tagline: 'Our data carries meaning. AI agents consume it directly. Decisions are data-driven by default.',
    color: '#00b23b',
    diagnosticSignals: [
      'Enterprise ontology implemented (BIAN/FHIR/RAMI 4.0)',
      'Semantic layer is single source of truth',
      'Data quality runs autonomously',
      'AI agents operate on context-enriched data',
      'Data team is a strategic function',
      'Compliance is largely automated',
      'New sources onboarded in days, not weeks',
    ],
    orianIntervention: {
      entryPoint: 'Enterprise Foundation',
      investment: '$1M–$3M',
      duration: '16–24 weeks initial',
      primaryPillar: 'All four pillars',
      components: ['Full Semantic Intelligence', 'Assist', 'Skills', 'Full Trust automation'],
      channels: ['All 5 — Tool as primary'],
      accelerationMetrics: [
        { label: 'Year 2 efficiency gain', value: '40%' },
        { label: 'Year 3 compounding', value: '80%' },
        { label: '3-year ROI multiplier', value: '4.2×' },
      ],
    },
    pathForward:
      'Your data is intelligent. Now let\'s make it generative — anticipating needs before they\'re articulated.',
    competitorContext:
      'Persistent has horizontal accelerators. We have standards-grounded ontologies. When the question is "agent-ready data," we have the deepest answer.',
  },
  {
    level: 5,
    name: 'Data with Intent',
    tagline: 'Data anticipates decisions. The system reasons about what\'s needed before it\'s asked.',
    color: '#d946ef',
    diagnosticSignals: [
      'Data infrastructure anticipates regulatory changes',
      'Knowledge graphs update in real-time',
      'AI agents on living ontologies that evolve with business',
      'Compliance is continuous, not periodic',
      'System surfaces what you don\'t know you need',
      'Decision intelligence and data platform have merged',
    ],
    orianIntervention: {
      entryPoint: 'Strategic Partnership',
      investment: 'Multi-year, outcome-based',
      duration: 'Continuous evolution',
      primaryPillar: 'All four — full ecosystem',
      components: ['Full ORIAN.Data platform', 'Autonomous ontology evolution', 'Self-tuning quality', 'Generative context'],
      channels: ['All 5 — feedback loop operational'],
      accelerationMetrics: [
        { label: 'Status', value: 'North Star' },
        { label: 'Horizon', value: '2027–2028' },
        { label: 'Position', value: 'Category-defining' },
      ],
    },
    pathForward:
      'This is where ORIAN.Data\'s "Data with Intent" philosophy is fully realized. Every investment at Levels 1–4 compounds toward this destination.',
    competitorContext:
      'No competitor has a credible story for this level. This is whitespace Xoriant defines.',
    isNorthStar: true,
  },
]

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'time-allocation',
    question: 'What does your data team spend most of its time on?',
    options: [
      { text: 'Keeping legacy systems alive', levelSignal: 1 },
      { text: 'Building pipelines and dashboards on request', levelSignal: 2 },
      { text: 'Managing governance and quality processes', levelSignal: 3 },
      { text: 'Enabling AI/ML with curated, semantic data', levelSignal: 4 },
    ],
  },
  {
    id: 'regulatory-response',
    question: 'A regulator asks "show me the lineage for this report." What happens?',
    options: [
      { text: 'Panic. Weeks of scrambling.', levelSignal: 1 },
      { text: 'We can trace it — with significant manual effort', levelSignal: 2.5 },
      { text: 'Automated lineage exists for critical paths', levelSignal: 3.5 },
      { text: 'Real-time lineage with auto-generated compliance evidence', levelSignal: 4.5 },
    ],
  },
  {
    id: 'ai-consumption',
    question: 'How do your AI/ML models consume data?',
    options: [
      { text: "We're not doing AI/ML yet", levelSignal: 1.5 },
      { text: 'Models pull from warehouses — raw tables', levelSignal: 2 },
      { text: 'Feature stores exist but quality is inconsistent', levelSignal: 3 },
      { text: 'Semantically enriched, quality-scored data with provenance', levelSignal: 4.5 },
    ],
  },
  {
    id: 'semantic-consistency',
    question: "What does 'revenue' mean in your organization?",
    options: [
      { text: 'Depends who you ask', levelSignal: 1.5 },
      { text: 'Defined, but different systems calculate it differently', levelSignal: 2 },
      { text: 'Consistent definition in a governed semantic layer', levelSignal: 3.5 },
      { text: 'One definition, one source — consumed by humans and agents alike', levelSignal: 4.5 },
    ],
  },
  {
    id: 'source-onboarding',
    question: 'How long to onboard a new data source?',
    options: [
      { text: 'Weeks to months', levelSignal: 1 },
      { text: '2–4 weeks with dedicated engineering', levelSignal: 2 },
      { text: 'Days with automated ingestion', levelSignal: 3.5 },
      { text: 'Hours with self-service schema inference', levelSignal: 4.5 },
    ],
  },
]

export interface MaturityScore {
  score: number
  level: number
  isTransitional: boolean
}

export function calculateMaturityLevel(answers: number[]): MaturityScore {
  const avg = answers.reduce((sum, a) => sum + a, 0) / answers.length
  const rounded = Math.round(avg * 2) / 2
  return {
    score: rounded,
    level: Math.min(5, Math.max(1, Math.round(rounded))),
    isTransitional: rounded % 1 !== 0,
  }
}

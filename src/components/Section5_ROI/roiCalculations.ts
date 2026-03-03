// ─── INPUT INTERFACE ───
export interface ROIInputs {
  industry: string
  dataVolumeTB: number
  sourceSystems: number
  engineers: number
  avgCost: number
  maintenancePct: number
  pipelineTime: string
  dqCost: number
  hasMigration: boolean
  migrationObjects: number
  migrationSource: string
  regulations: string[]
  buildingForAI: boolean
}

export interface LeverResult {
  annualSavings: number
  label: string
  components: string[]
}

export interface ProductivityResult extends LeverResult {
  equivalentEngineers: number
  effectiveTeamSize: number
}

export interface PipelineResult extends LeverResult {
  accelerationFactor: number
  currentTime: string
  acceleratedTime: string
  additionalPipelines: number
}

export interface DQResult extends LeverResult {
  reductionPct: number
}

export interface ComplianceResult extends LeverResult {
  frameworkCount: number
  frameworks: string[]
  reductionPct: number
}

export interface MigrationResult {
  oneTimeSavings: number
  traditionalMonths: number
  acceleratedMonths: number
  timelineCompression: number
  label: string
  components: string[]
}

export interface AIReadinessResult extends LeverResult {}

export interface Levers {
  productivity: ProductivityResult
  pipeline: PipelineResult
  dq: DQResult
  compliance: ComplianceResult | null
  migration: MigrationResult | null
  aiReadiness: AIReadinessResult | null
}

export interface Totals {
  annual: number
  oneTime: number
  firstYear: number
}

export interface BreakevenResult {
  months: number
  engagementCost: number
}

export interface TimelinePoint {
  month: number
  traditional: number
  withOrian: number
  savings: number
}

export interface ThreeYearValue {
  year1: number
  year2: number
  year3: number
  total: number
}

// ─── CONSTANTS ───
const PRODUCTIVITY_GAIN_PCT = 0.30
const DQ_REDUCTION_PCT = 0.80
const COMPLIANCE_COST_PER_FRAMEWORK = 120000
const COMPLIANCE_REDUCTION_PCT = 0.65
const MIGRATION_COST_PER_OBJECT = 120
const MIGRATION_ACCELERATION = 0.65
const AI_READINESS_COST_PER_TB = 2000
const AI_READINESS_SAVING_PCT = 0.50
const COMPLEXITY_GROWTH_PER_QUARTER = 0.02

const PIPELINE_ACCELERATION: Record<string, { factor: number; acceleratedLabel: string }> = {
  'days': { factor: 1.5, acceleratedLabel: '1-2 days' },
  '1-2 weeks': { factor: 3, acceleratedLabel: '2-3 days' },
  '2-4 weeks': { factor: 5, acceleratedLabel: '3-5 days' },
  '4+ weeks': { factor: 7, acceleratedLabel: '4-7 days' },
}

const AVG_PIPELINES_PER_ENGINEER = 12

// ─── LEVER CALCULATIONS ───

export function calculateProductivity(engineers: number, avgCost: number, maintenancePct: number): ProductivityResult {
  const annualSavings = engineers * avgCost * PRODUCTIVITY_GAIN_PCT * maintenancePct
  const equivalentEngineers = Math.round(engineers * PRODUCTIVITY_GAIN_PCT)
  const effectiveTeamSize = engineers + equivalentEngineers
  return {
    annualSavings: Math.round(annualSavings),
    equivalentEngineers,
    effectiveTeamSize,
    label: `Your ${engineers} engineers operate at the output of ${effectiveTeamSize}`,
    components: ['skills', 'agent'],
  }
}

export function calculatePipelineAcceleration(engineers: number, avgCost: number, pipelineTime: string): PipelineResult {
  const accel = PIPELINE_ACCELERATION[pipelineTime] || PIPELINE_ACCELERATION['2-4 weeks']
  const { factor, acceleratedLabel } = accel
  const additionalPipelines = Math.round(engineers * AVG_PIPELINES_PER_ENGINEER * (1 - 1 / factor))
  const annualSavings = Math.round(additionalPipelines * (avgCost / AVG_PIPELINES_PER_ENGINEER))
  return {
    annualSavings,
    accelerationFactor: factor,
    currentTime: pipelineTime,
    acceleratedTime: acceleratedLabel,
    additionalPipelines,
    label: `${pipelineTime} → ${acceleratedLabel} (${factor}× faster)`,
    components: ['transform', 'ingest'],
  }
}

export function calculateDQSavings(dqCost: number): DQResult {
  const annualSavings = Math.round(dqCost * DQ_REDUCTION_PCT)
  return {
    annualSavings,
    reductionPct: DQ_REDUCTION_PCT * 100,
    label: `${DQ_REDUCTION_PCT * 100}% reduction in manual reconciliation`,
    components: ['sentinel-dq', 'ontology'],
  }
}

export function calculateComplianceSavings(regulations: string[]): ComplianceResult | null {
  if (regulations.length === 0) return null
  const annualSavings = Math.round(regulations.length * COMPLIANCE_COST_PER_FRAMEWORK * COMPLIANCE_REDUCTION_PCT)
  return {
    annualSavings,
    frameworkCount: regulations.length,
    frameworks: regulations,
    reductionPct: COMPLIANCE_REDUCTION_PCT * 100,
    label: `Automation across ${regulations.length} frameworks`,
    components: ['comply', 'lineage'],
  }
}

export function calculateMigrationSavings(hasMigration: boolean, migrationObjects: number): MigrationResult | null {
  if (!hasMigration || migrationObjects === 0) return null
  const oneTimeSavings = Math.round(migrationObjects * MIGRATION_COST_PER_OBJECT * MIGRATION_ACCELERATION)
  const traditionalMonths = Math.round((migrationObjects / 1000) * 3)
  const acceleratedMonths = Math.max(1, Math.round(traditionalMonths / 3))
  const timelineCompression = traditionalMonths - acceleratedMonths
  return {
    oneTimeSavings,
    traditionalMonths,
    acceleratedMonths,
    timelineCompression,
    label: `${migrationObjects.toLocaleString()} objects: ${traditionalMonths}mo → ${acceleratedMonths}mo`,
    components: ['migrate', 'estimate', 'test'],
  }
}

export function calculateAIReadiness(buildingForAI: boolean, dataVolumeTB: number): AIReadinessResult | null {
  if (!buildingForAI) return null
  const annualSavings = Math.round(dataVolumeTB * AI_READINESS_COST_PER_TB * AI_READINESS_SAVING_PCT)
  return {
    annualSavings,
    label: 'Inference-ready data delivery',
    components: ['context', 'ontology', 'semantic-layer'],
  }
}

// ─── AGGREGATE CALCULATIONS ───

export function calculateTotals(levers: Levers): Totals {
  let annual = 0
  annual += levers.productivity.annualSavings
  annual += levers.pipeline.annualSavings
  annual += levers.dq.annualSavings
  if (levers.compliance) annual += levers.compliance.annualSavings
  if (levers.aiReadiness) annual += levers.aiReadiness.annualSavings

  const oneTime = levers.migration?.oneTimeSavings || 0
  const firstYear = annual + oneTime

  return { annual, oneTime, firstYear }
}

export function calculateAccelerationFactor(pipelineTime: string): number {
  const pipelineFactor = PIPELINE_ACCELERATION[pipelineTime]?.factor || 3
  const weighted =
    pipelineFactor * 0.30 +
    3.0 * 0.25 +
    (1 / (1 - PRODUCTIVITY_GAIN_PCT)) * 0.25 +
    (1 / (1 - DQ_REDUCTION_PCT)) * 0.20
  return Math.round(weighted * 10) / 10
}

export function calculateBreakeven(engineers: number, annualSavings: number): BreakevenResult {
  const engagementCost = engineers > 50 ? 800000 : engineers > 20 ? 400000 : 200000
  const monthlySavings = annualSavings / 12
  const months = monthlySavings > 0 ? Math.ceil(engagementCost / monthlySavings) : 99
  return { months, engagementCost }
}

export function calculateTimelineData(inputs: ROIInputs, totals: Totals, breakeven: BreakevenResult): TimelinePoint[] {
  const points: TimelinePoint[] = []
  const monthlyTraditional = (inputs.engineers * inputs.avgCost * inputs.maintenancePct / 12) + (inputs.dqCost / 12)
  const monthlySavings = totals.annual / 12
  const engagementCost = breakeven.engagementCost

  let cumulativeTraditional = 0
  let cumulativeOrian = engagementCost

  for (let month = 0; month <= 24; month++) {
    const quarterGrowth = 1 + COMPLEXITY_GROWTH_PER_QUARTER * Math.floor(month / 3)
    cumulativeTraditional += monthlyTraditional * quarterGrowth

    let savingsRate = 0
    if (month <= 1) savingsRate = 0
    else if (month <= 3) savingsRate = 0.30
    else if (month <= 6) savingsRate = 0.70
    else savingsRate = 1.0

    const monthCost = monthlyTraditional * quarterGrowth
    const monthSaving = monthlySavings * savingsRate
    cumulativeOrian += (monthCost - monthSaving)

    points.push({
      month,
      traditional: Math.round(cumulativeTraditional),
      withOrian: Math.round(cumulativeOrian),
      savings: Math.round(cumulativeTraditional - cumulativeOrian),
    })
  }

  return points
}

export function calculateThreeYearValue(annualSavings: number, oneTimeSavings: number): ThreeYearValue {
  const year1 = annualSavings + oneTimeSavings
  const year2 = Math.round(annualSavings * 1.4)
  const year3 = Math.round(annualSavings * 1.8)
  const total = year1 + year2 + year3
  return { year1, year2, year3, total }
}

// ─── UTILITIES ───

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

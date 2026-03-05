export const productivityGap = {
  webDev: 55.8,
  dataEng: 12.5,
  source: 'Internal research benchmarking GitHub Copilot studies against data engineering field measurements',
}

export interface Metric {
  label: string
  before?: string
  after?: string
  multiplier?: string
  value?: string
  detail?: string
}

export interface RootCause {
  id: string
  title: string
  icon: 'database' | 'git-branch' | 'file-text' | 'shield-check' | 'brain'
  problem: string
  whyAiFails: string
  orianFix: {
    components: string[]
    description: string
  }
  metric: Metric
  accentColor: string
  isClimax?: boolean
}

export const rootCauses: RootCause[] = [
  {
    id: 'schema-opacity',
    title: 'Schema Opacity',
    icon: 'database',
    problem: "Data schemas are inferred, implicit, or buried in legacy DDL scripts. AI doesn't know what col_47_adj_v3 means.",
    whyAiFails: 'Without schema context, AI generates syntactically correct but semantically wrong transformations.',
    orianFix: {
      components: ['Catalog', 'Ontology'],
      description: 'Automated schema inference and semantic mapping — AI sees business meaning, not just column names.',
    },
    metric: { label: 'Source onboarding', before: '2-4 weeks', after: '2-4 days' },
    accentColor: '#00b23b',
  },
  {
    id: 'stateful-pipelines',
    title: 'Stateful Pipeline Complexity',
    icon: 'git-branch',
    problem: 'Data pipelines chain across dozens of stateful transformations with ordering constraints and failure modes.',
    whyAiFails: 'AI generates steps that work in isolation but break the dependency chain.',
    orianFix: {
      components: ['Transform', 'Lineage'],
      description: 'Pipeline-aware code generation respecting the full dependency graph.',
    },
    metric: { label: 'Pipeline deployment', before: '2-4 weeks', after: '2-4 days', multiplier: '5-7×' },
    accentColor: '#3b82f6',
  },
  {
    id: 'business-rules',
    title: 'Business Rule Complexity',
    icon: 'file-text',
    problem: 'Business rules scattered across SQL procedures, spreadsheets, email chains, and tribal knowledge.',
    whyAiFails: "AI produces transformations that violate rules nobody documented — passes QA, fails in production.",
    orianFix: {
      components: ['Ontology', 'Semantic'],
      description: 'Business rules encoded as semantic specs. AI generates from intent, not reverse-engineering.',
    },
    metric: { label: 'Ontology-grounded generation', value: '3× faster', detail: 'vs starting from scratch' },
    accentColor: '#00b23b',
  },
  {
    id: 'testing-gap',
    title: 'Testing Culture Gap',
    icon: 'shield-check',
    problem: "Web dev has mature TDD culture. In data eng, 'the pipeline ran' IS the test. Nobody validates semantic correctness.",
    whyAiFails: 'AI mirrors its training data — generates pipelines without tests because the training corpus lacks them.',
    orianFix: {
      components: ['Test', 'Sentinel-DQ'],
      description: 'Auto-generated validation: schema conformance, drift detection, reconciliation, and quality assertions.',
    },
    metric: { label: 'DQ incident cost', value: '80% reduction', detail: 'when testing is generated alongside code' },
    accentColor: '#f5a623',
  },
  {
    id: 'context-starvation',
    title: 'Semantic Context Starvation',
    icon: 'brain',
    problem: "The root cause underneath all others. Data ecosystems are context-deserts — schemas don't describe meaning, pipelines don't describe intent.",
    whyAiFails: 'Without semantic context, AI is just a fast typist producing code with the same quality problems as a junior engineer.',
    orianFix: {
      components: ['Context', 'Agent', 'Skills'],
      description: 'The full AI-Led Engineering pillar. Context enriches assets with meaning. Agent understands your ontology. Skills encode 19+ battle-tested patterns.',
    },
    metric: { label: 'Engineer capacity', value: '1.3×', detail: 'equivalent to adding 3 engineers per team of 10' },
    accentColor: '#a78bfa',
    isClimax: true,
  },
]

export const accelerationFormulas = {
  capacityGainPct: 0.30,
  maintenancePctBefore: 0.558,
  maintenancePctAfter: 0.35,
  defaultEngineerCost: 150000,
  dqIncidentsPerEngineerBefore: 0.96,
  dqIncidentsPerEngineerAfter: 0.20,
  pipelineDeployBefore: '2-4 weeks',
  pipelineDeployAfter: '2-4 days',

  calculate(teamSize: number) {
    const equivalentEngineers = Math.round(teamSize * this.capacityGainPct)
    const effectiveTeamSize = teamSize + equivalentEngineers
    const annualValue = equivalentEngineers * this.defaultEngineerCost
    const dqIncidentsBefore = Math.round(teamSize * this.dqIncidentsPerEngineerBefore)
    const dqIncidentsAfter = Math.round(teamSize * this.dqIncidentsPerEngineerAfter)
    return {
      teamSize,
      equivalentEngineers,
      effectiveTeamSize,
      annualValue,
      maintenanceBefore: `${(this.maintenancePctBefore * 100).toFixed(1)}%`,
      maintenanceAfter: `${(this.maintenancePctAfter * 100).toFixed(0)}%`,
      dqIncidentsBefore,
      dqIncidentsAfter,
      pipelineDeployBefore: this.pipelineDeployBefore,
      pipelineDeployAfter: this.pipelineDeployAfter,
    }
  },
}

export interface CodeLine {
  text: string
  type: 'comment' | 'comment-error' | 'comment-success' | 'error' | 'success' | 'code' | 'empty'
}

export const codeExamples = {
  withoutOrian: {
    label: 'Generic AI Output',
    lines: [
      { text: '# AI-generated transformation (no context)', type: 'comment' },
      { text: 'df_joined = df_customers.join(', type: 'code' },
      { text: '    df_transactions,', type: 'code' },
      { text: '    df_customers.customer_id == df_transactions.cust_id,  # ← Wrong key', type: 'error' },
      { text: '    "left"', type: 'code' },
      { text: ')', type: 'code' },
      { text: 'df_result = df_joined.groupBy("region").agg(', type: 'code' },
      { text: '    sum("amount").alias("total_revenue")  # ← Gross? Net? Adjusted?', type: 'error' },
      { text: ')', type: 'code' },
      { text: '# No tests. No validation. No quality checks.', type: 'comment' },
      { text: '# "The pipeline ran successfully." ← This IS the test.', type: 'comment-error' },
    ] as CodeLine[],
    issues: [
      'customer_id ≠ cust_id (different entity definitions)',
      '"amount" is ambiguous — gross vs net vs adjusted',
      'No data quality validation',
      'Passes CI/CD. Fails in production 3 days later.',
    ],
  },
  withOrian: {
    label: 'ORIAN.Data-Augmented Output',
    lines: [
      { text: '# AI-generated with ORIAN.Data context', type: 'comment' },
      { text: '# Catalog: customer_id → cust_ref_id (semantic mapping)', type: 'comment-success' },
      { text: '# Ontology: "revenue" = net_adjusted_amount per BIAN', type: 'comment-success' },
      { text: '# Sentinel-DQ: join completeness assertion > 99.5%', type: 'comment-success' },
      { text: '', type: 'empty' },
      { text: 'df_joined = df_customers.join(', type: 'code' },
      { text: '    df_transactions,', type: 'code' },
      { text: '    df_customers.customer_id == df_transactions.cust_ref_id,  # ✓ Semantic', type: 'success' },
      { text: '    "left"', type: 'code' },
      { text: ')', type: 'code' },
      { text: 'df_result = df_joined.groupBy("region").agg(', type: 'code' },
      { text: '    sum("net_adjusted_amount").alias("total_revenue")  # ✓ BIAN metric', type: 'success' },
      { text: ')', type: 'code' },
      { text: '', type: 'empty' },
      { text: '# Auto-generated assertions (ORIAN.Data.Test)', type: 'comment-success' },
      { text: 'assert_join_completeness(df_joined, threshold=0.995)', type: 'success' },
      { text: 'assert_no_null_keys(df_result, ["region"])', type: 'success' },
      { text: 'assert_reconciles_with_source(df_result, "total_revenue", 0.001)', type: 'success' },
    ] as CodeLine[],
    fixes: [
      'Correct key mapping from Catalog semantic resolution',
      '"revenue" resolved to net_adjusted_amount via BIAN ontology',
      'Quality assertions auto-generated by ORIAN.Data.Test',
      'Sentinel-DQ monitors production — catches drift before business impact',
    ],
  },
}

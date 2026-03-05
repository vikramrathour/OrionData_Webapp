export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SolutionPlan {
  challengeAnalysis: {
    summary: string
    painPoints: string[]
  }
  recommendedComponents: {
    id: string
    name: string
    role: string
    phase: number
    deliveryChannel: string
  }[]
  edges: {
    source: string
    target: string
    type: string
  }[]
  phases: {
    number: number
    title: string
    weeks: string
    components: string[]
    deliverables: string[]
  }[]
  acceleration: {
    traditional: { weeks: number; effort: string; cost: string }
    withOrian: { weeks: number; effort: string; cost: string }
  }
  deliveryStrategy: {
    channels: string[]
    dayOneValue: string
    securityNote: string
  }
}

function generateDemoPlan(message: string): SolutionPlan {
  const lowerMsg = message.toLowerCase()

  const isBanking = lowerMsg.includes('bank') || lowerMsg.includes('bfsi') || lowerMsg.includes('compliance') || lowerMsg.includes('regulatory')
  const isHealthcare = lowerMsg.includes('health') || lowerMsg.includes('clinical') || lowerMsg.includes('fhir') || lowerMsg.includes('patient')
  const isMigration = lowerMsg.includes('migrat') || lowerMsg.includes('oracle') || lowerMsg.includes('snowflake') || lowerMsg.includes('cloud')
  const isQuality = lowerMsg.includes('quality') || lowerMsg.includes('accuracy') || lowerMsg.includes('trust')

  if (isMigration) {
    return {
      challengeAnalysis: {
        summary: 'Large-scale data platform migration requiring automated workload analysis, schema translation, regression testing, and parallel validation to minimize risk and timeline.',
        painPoints: ['Legacy platform constraints', 'Migration complexity and risk', 'Business continuity during transition', 'Post-migration validation'],
      },
      recommendedComponents: [
        { id: 'estimate', name: 'ORIAN.Data.Estimate', role: 'AI-powered workload complexity scoring and effort estimation to compress assessment from weeks to days', phase: 1, deliveryChannel: 'As Prompts & Skills' },
        { id: 'migrate', name: 'ORIAN.Data.Migrate', role: 'Automated source code analysis, schema mapping, and migration pipeline generation', phase: 2, deliveryChannel: 'As a Tool' },
        { id: 'transform', name: 'ORIAN.Data.Transform', role: 'Cross-platform pipeline generation from business specs (Spark, SQL, dbt)', phase: 2, deliveryChannel: 'As a Tool' },
        { id: 'test', name: 'ORIAN.Data.Test', role: 'Automated regression test generation and parallel-run validation', phase: 2, deliveryChannel: 'As a Tool' },
        { id: 'sentinel-dq', name: 'OrionDQ', role: 'Data quality validation pre- and post-migration with trust scoring', phase: 3, deliveryChannel: 'As a Tool' },
        { id: 'lineage', name: 'ORIAN.Data.Lineage', role: 'End-to-end lineage mapping to ensure no downstream breakage', phase: 3, deliveryChannel: 'As Specs & Frameworks' },
      ],
      edges: [
        { source: 'estimate', target: 'migrate', type: 'references' },
        { source: 'migrate', target: 'transform', type: 'generates' },
        { source: 'test', target: 'migrate', type: 'validates' },
        { source: 'test', target: 'transform', type: 'validates' },
        { source: 'sentinel-dq', target: 'transform', type: 'validates' },
      ],
      phases: [
        { number: 1, title: 'Assessment & Planning', weeks: 'Weeks 1-3', components: ['estimate'], deliverables: ['Workload complexity report', 'Migration readiness assessment', 'Effort estimation with risk scoring'] },
        { number: 2, title: 'Migration Execution', weeks: 'Weeks 4-16', components: ['migrate', 'transform', 'test'], deliverables: ['Automated schema translation', 'Pipeline code generation', 'Regression test suites', 'Parallel-run orchestration'] },
        { number: 3, title: 'Validation & Cutover', weeks: 'Weeks 17-22', components: ['sentinel-dq', 'lineage'], deliverables: ['Data quality certification', 'Lineage verification', 'Production cutover with rollback plan'] },
      ],
      acceleration: {
        traditional: { weeks: 52, effort: '120 person-months', cost: '$3.2M' },
        withOrian: { weeks: 22, effort: '48 person-months', cost: '$1.1M' },
      },
      deliveryStrategy: {
        channels: ['As a Tool', 'As Prompts & Skills', 'As Specs & Frameworks'],
        dayOneValue: 'Estimation prompts and migration specs available immediately — start assessment while tool onboarding proceeds',
        securityNote: 'Tool channel requires platform access; Prompts and Specs channels available without security clearance',
      },
    }
  }

  if (isHealthcare) {
    return {
      challengeAnalysis: {
        summary: 'Healthcare data integration challenge requiring FHIR-compliant ontology mapping, multi-system patient data unification, and regulatory-grade quality assurance.',
        painPoints: ['Fragmented patient data across systems', 'FHIR interoperability gaps', 'PHI compliance requirements', 'Clinical data quality'],
      },
      recommendedComponents: [
        { id: 'ontology', name: 'ORIAN.Data.Ontology', role: 'HL7/FHIR ontology starter kit for healthcare concept modeling and resource mapping', phase: 1, deliveryChannel: 'As Specs & Frameworks' },
        { id: 'ingest', name: 'ORIAN.Data.Ingest', role: 'Multi-source clinical data ingestion with ontology-aware schema detection', phase: 1, deliveryChannel: 'As a Tool' },
        { id: 'sentinel-dq', name: 'OrionDQ', role: 'Clinical data quality validation with trust scoring for patient safety', phase: 2, deliveryChannel: 'As a Tool' },
        { id: 'context', name: 'ORIAN.Data.Context', role: 'Inference-ready clinical data packaging for AI consumption', phase: 2, deliveryChannel: 'As Prompts & Skills' },
        { id: 'comply', name: 'ORIAN.Data.Comply', role: 'HIPAA compliance automation with PHI tracking and audit evidence', phase: 2, deliveryChannel: 'As Standards & Best Practices' },
        { id: 'semantic-layer', name: 'ORIAN.Data.Semantic', role: 'Unified patient data products with business-meaningful clinical abstractions', phase: 3, deliveryChannel: 'As a Tool' },
      ],
      edges: [
        { source: 'ontology', target: 'sentinel-dq', type: 'enriches' },
        { source: 'ontology', target: 'context', type: 'contextualizes' },
        { source: 'ingest', target: 'sentinel-dq', type: 'feeds' },
        { source: 'sentinel-dq', target: 'context', type: 'certifies' },
        { source: 'semantic-layer', target: 'context', type: 'exposes' },
        { source: 'comply', target: 'sentinel-dq', type: 'evidences' },
      ],
      phases: [
        { number: 1, title: 'Ontology & Ingestion', weeks: 'Weeks 1-4', components: ['ontology', 'ingest'], deliverables: ['FHIR resource mapping', 'Multi-source ingestion pipeline', 'Clinical concept model'] },
        { number: 2, title: 'Quality & Compliance', weeks: 'Weeks 5-10', components: ['sentinel-dq', 'context', 'comply'], deliverables: ['Clinical data trust scoring', 'HIPAA compliance framework', 'AI-ready clinical data delivery'] },
        { number: 3, title: 'Semantic Unification', weeks: 'Weeks 11-16', components: ['semantic-layer'], deliverables: ['Unified patient data products', 'Clinical analytics marketplace', 'Self-service discovery layer'] },
      ],
      acceleration: {
        traditional: { weeks: 40, effort: '80 person-months', cost: '$2.4M' },
        withOrian: { weeks: 16, effort: '32 person-months', cost: '$960K' },
      },
      deliveryStrategy: {
        channels: ['As Specs & Frameworks', 'As a Tool', 'As Prompts & Skills', 'As Standards & Best Practices'],
        dayOneValue: 'FHIR ontology specs and HIPAA compliance standards available Day 1 — begin mapping while tooling onboards',
        securityNote: 'PHI-handling components require full security clearance; ontology specs and compliance standards available without clearance',
      },
    }
  }

  if (isBanking) {
    return {
      challengeAnalysis: {
        summary: 'Regulatory compliance modernization requiring automated audit evidence generation, data lineage tracking, and quality assurance across complex banking data estates.',
        painPoints: ['Manual regulatory reporting processes', 'Incomplete data lineage', 'Audit readiness gaps', 'Cross-system data quality inconsistencies'],
      },
      recommendedComponents: [
        { id: 'ontology', name: 'ORIAN.Data.Ontology', role: 'BIAN ontology starter kit for banking domain modeling and regulatory concept alignment', phase: 1, deliveryChannel: 'As Specs & Frameworks' },
        { id: 'sentinel-dq', name: 'OrionDQ', role: 'Automated data quality profiling with trust scoring aligned to BCBS 239 principles', phase: 1, deliveryChannel: 'As a Tool' },
        { id: 'lineage', name: 'ORIAN.Data.Lineage', role: 'End-to-end lineage from source to regulatory report with audit trail', phase: 2, deliveryChannel: 'As a Tool' },
        { id: 'comply', name: 'ORIAN.Data.Comply', role: 'Policy-as-code compliance rules with automated audit evidence generation', phase: 2, deliveryChannel: 'As Standards & Best Practices' },
        { id: 'catalog', name: 'ORIAN.Data.Catalog', role: 'Semantic discovery and classification of regulatory data assets', phase: 2, deliveryChannel: 'As Specs & Frameworks' },
        { id: 'observe', name: 'ORIAN.Data.Observe', role: 'Continuous compliance monitoring with real-time posture dashboard', phase: 3, deliveryChannel: 'As a Tool' },
      ],
      edges: [
        { source: 'ontology', target: 'sentinel-dq', type: 'enriches' },
        { source: 'sentinel-dq', target: 'comply', type: 'evidences' },
        { source: 'lineage', target: 'comply', type: 'traces' },
        { source: 'catalog', target: 'lineage', type: 'feeds' },
        { source: 'observe', target: 'sentinel-dq', type: 'monitors' },
        { source: 'observe', target: 'lineage', type: 'monitors' },
      ],
      phases: [
        { number: 1, title: 'Foundation & Quality', weeks: 'Weeks 1-4', components: ['ontology', 'sentinel-dq'], deliverables: ['BIAN ontology mapping', 'Data quality baseline assessment', 'Trust score framework'] },
        { number: 2, title: 'Lineage & Compliance', weeks: 'Weeks 5-12', components: ['lineage', 'comply', 'catalog'], deliverables: ['End-to-end regulatory lineage', 'BCBS 239 compliance rules as code', 'Automated audit evidence generation'] },
        { number: 3, title: 'Continuous Monitoring', weeks: 'Weeks 13-16', components: ['observe'], deliverables: ['Real-time compliance dashboard', 'Automated alerting for quality drift', 'Ongoing audit readiness reporting'] },
      ],
      acceleration: {
        traditional: { weeks: 36, effort: '90 person-months', cost: '$2.8M' },
        withOrian: { weeks: 16, effort: '36 person-months', cost: '$1.1M' },
      },
      deliveryStrategy: {
        channels: ['As Specs & Frameworks', 'As a Tool', 'As Standards & Best Practices'],
        dayOneValue: 'BIAN ontology specs and BCBS 239 compliance standards available Day 1 — begin regulatory mapping immediately',
        securityNote: 'Compliance standards and ontology specs require no security clearance; tool deployments follow standard enterprise onboarding',
      },
    }
  }

  // Default: Data quality / general
  return {
    challengeAnalysis: {
      summary: isQuality
        ? 'Enterprise-wide data quality challenge requiring automated profiling, anomaly detection, trust scoring, and remediation across diverse data sources.'
        : 'Enterprise data platform challenge requiring ontology-driven data organization, quality assurance, and AI-ready data delivery.',
      painPoints: ['Data quality inconsistencies', 'Lack of semantic context', 'Manual remediation processes', 'No trust scoring framework'],
    },
    recommendedComponents: [
      { id: 'sentinel-dq', name: 'OrionDQ', role: 'Automated data quality profiling, anomaly detection, and trust scoring with ML-driven baselines', phase: 1, deliveryChannel: 'As a Tool' },
      { id: 'ontology', name: 'ORIAN.Data.Ontology', role: 'Industry ontology engine for semantic context and business-meaningful validation rules', phase: 1, deliveryChannel: 'As Specs & Frameworks' },
      { id: 'ingest', name: 'ORIAN.Data.Ingest', role: 'Ontology-aware ingestion with quality-at-ingestion rule libraries', phase: 1, deliveryChannel: 'As Prompts & Skills' },
      { id: 'catalog', name: 'ORIAN.Data.Catalog', role: 'Semantic discovery and classification with automated documentation', phase: 2, deliveryChannel: 'As Specs & Frameworks' },
      { id: 'context', name: 'ORIAN.Data.Context', role: 'Trust-scored, freshness-certified data delivery for AI consumption', phase: 2, deliveryChannel: 'As Prompts & Skills' },
      { id: 'observe', name: 'ORIAN.Data.Observe', role: 'Decision-impact-driven observability — measuring data health by business outcome, not just pipeline uptime', phase: 3, deliveryChannel: 'As a Tool' },
    ],
    edges: [
      { source: 'ontology', target: 'sentinel-dq', type: 'enriches' },
      { source: 'ingest', target: 'catalog', type: 'feeds' },
      { source: 'sentinel-dq', target: 'context', type: 'certifies' },
      { source: 'catalog', target: 'ontology', type: 'informs' },
      { source: 'observe', target: 'sentinel-dq', type: 'monitors' },
    ],
    phases: [
      { number: 1, title: 'Quality Foundation', weeks: 'Weeks 1-4', components: ['sentinel-dq', 'ontology', 'ingest'], deliverables: ['Automated quality profiling across data estate', 'Data trust score framework', 'Ontology-aligned validation rules'] },
      { number: 2, title: 'Semantic Context', weeks: 'Weeks 5-10', components: ['catalog', 'context'], deliverables: ['Semantic data catalog with business glossary', 'AI-ready data packaging with trust scores', 'Self-service discovery layer'] },
      { number: 3, title: 'Observability', weeks: 'Weeks 11-14', components: ['observe'], deliverables: ['Quality health dashboards', 'Automated anomaly alerting', 'Decision-impact monitoring'] },
    ],
    acceleration: {
      traditional: { weeks: 32, effort: '64 person-months', cost: '$1.9M' },
      withOrian: { weeks: 14, effort: '24 person-months', cost: '$720K' },
    },
    deliveryStrategy: {
      channels: ['As a Tool', 'As Specs & Frameworks', 'As Prompts & Skills'],
      dayOneValue: 'Quality profiling prompts and ontology specs available immediately — start assessing data health while tooling onboards',
      securityNote: 'Prompts and specs channels require no security clearance for Day 1 value',
    },
  }
}

export async function submitChallenge(
  message: string,
  conversationHistory: ConversationMessage[],
): Promise<SolutionPlan> {
  try {
    const response = await fetch('/api/solution-planner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory }),
    })

    if (!response.ok) {
      // Check if we got HTML back (dev server fallback)
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('text/html') || response.status === 404) {
        console.info('API not available, using demo plan')
        return generateDemoPlan(message)
      }

      // Try to parse error from JSON response
      try {
        const errData = await response.json()
        if (errData.error?.includes('ANTHROPIC_API_KEY')) {
          console.info('API key not configured, using demo plan')
          return generateDemoPlan(message)
        }
      } catch {
        // ignore parse error
      }

      throw new Error('Failed to generate solution plan. Please try again.')
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      console.info('Non-JSON response, using demo plan')
      return generateDemoPlan(message)
    }

    return response.json()
  } catch (err) {
    // Network errors (CORS, connection refused, etc.) — use demo
    if (err instanceof TypeError && err.message.includes('fetch')) {
      console.info('Network error, using demo plan')
      return generateDemoPlan(message)
    }

    // For any other fetch failure in dev, fall back to demo
    console.info('API unavailable, using demo plan:', err)
    return generateDemoPlan(message)
  }
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatCurrency } from './roiCalculations'
import type { Levers, Totals } from './roiCalculations'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

interface LeverConfig {
  key: string
  name: string
  pillar: string
  getValue: (levers: Levers) => number
  isOneTime?: boolean
  getDescription: (levers: Levers) => string
  getFormula: (levers: Levers) => string
  getComponents: (levers: Levers) => string[]
  condition?: (levers: Levers) => boolean
}

const COMPONENT_LABELS: Record<string, string> = {
  'skills': 'ORIAN.Data.Skills',
  'agent': 'ORIAN.Data.Agent',
  'transform': 'ORIAN.Data.Transform',
  'ingest': 'ORIAN.Data.Ingest',
  'sentinel-dq': 'Sentinel-DQ',
  'ontology': 'ORIAN.Data.Ontology',
  'comply': 'ORIAN.Data.Comply',
  'lineage': 'ORIAN.Data.Lineage',
  'migrate': 'ORIAN.Data.Migrate',
  'estimate': 'ORIAN.Data.Estimate',
  'test': 'ORIAN.Data.Test',
  'context': 'ORIAN.Data.Context',
  'semantic-layer': 'ORIAN.Data.Semantic',
}

const COMPONENT_PILLARS: Record<string, string> = {
  'skills': 'ai',
  'agent': 'ai',
  'transform': 'foundation',
  'ingest': 'foundation',
  'sentinel-dq': 'trust',
  'ontology': 'semantic',
  'comply': 'trust',
  'lineage': 'trust',
  'migrate': 'foundation',
  'estimate': 'foundation',
  'test': 'foundation',
  'context': 'semantic',
  'semantic-layer': 'semantic',
}

const LEVER_CONFIGS: LeverConfig[] = [
  {
    key: 'productivity',
    name: 'Engineer Productivity Reclaimed',
    pillar: 'ai',
    getValue: (l) => l.productivity.annualSavings,
    getDescription: (l) => `25-35% capacity gain through AI-augmented SDLC. Context substrates — ontologies, data contracts, SKILL.md files — make AI effective where generic tools fail. Equivalent to adding ${l.productivity.equivalentEngineers} engineers without hiring.`,
    getFormula: (l) => `${l.productivity.effectiveTeamSize - l.productivity.equivalentEngineers} engineers × $${(l.productivity.annualSavings / ((l.productivity.effectiveTeamSize - l.productivity.equivalentEngineers) * 0.30)).toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr × 30% × maintenance%`,
    getComponents: (l) => l.productivity.components,
  },
  {
    key: 'pipeline',
    name: 'Pipeline Deployment Acceleration',
    pillar: 'foundation',
    getValue: (l) => l.pipeline.annualSavings,
    getDescription: (l) => `New pipeline deployment: ${l.pipeline.currentTime} → ${l.pipeline.acceleratedTime} (${l.pipeline.accelerationFactor}× faster). ${l.pipeline.additionalPipelines} additional pipelines delivered per year at current team size.`,
    getFormula: () => 'additionalPipelines × (avgCost / pipelinesPerEngineer)',
    getComponents: (l) => l.pipeline.components,
  },
  {
    key: 'dq',
    name: 'Data Quality Cost Avoidance',
    pillar: 'trust',
    getValue: (l) => l.dq.annualSavings,
    getDescription: () => 'Automated profiling, semantic validation, anomaly detection, and trust scoring. 80% reduction in manual reconciliation effort. Proactive quality gates replace reactive firefighting.',
    getFormula: () => 'dqCost × 80% reduction',
    getComponents: (l) => l.dq.components,
  },
  {
    key: 'compliance',
    name: 'Compliance Automation',
    pillar: 'trust',
    getValue: (l) => l.compliance?.annualSavings ?? 0,
    getDescription: (l) => `Audit evidence auto-generation for ${l.compliance?.frameworks.join(', ')}. Continuous compliance monitoring replaces annual audit scramble. Audit prep compressed from weeks to hours.`,
    getFormula: (l) => `${l.compliance?.frameworkCount} frameworks × $120K/yr × 65% reduction`,
    getComponents: (l) => l.compliance?.components ?? [],
    condition: (l) => l.compliance !== null,
  },
  {
    key: 'migration',
    name: 'Migration Acceleration',
    pillar: 'foundation',
    getValue: (l) => l.migration?.oneTimeSavings ?? 0,
    isOneTime: true,
    getDescription: (l) => `${l.migration?.label}. Scoping compressed from 3 weeks to 3 days. Timeline: ${l.migration?.traditionalMonths} months → ${l.migration?.acceleratedMonths} months.`,
    getFormula: (l) => `${l.migration?.label} objects × $120/object × 65% faster`,
    getComponents: (l) => l.migration?.components ?? [],
    condition: (l) => l.migration !== null,
  },
  {
    key: 'aiReadiness',
    name: 'AI Readiness',
    pillar: 'semantic',
    getValue: (l) => l.aiReadiness?.annualSavings ?? 0,
    getDescription: () => "Inference-ready data delivery — context-rich, trust-scored, freshness-certified. Closes the gap between 'we have data' and 'agents can consume it.'",
    getFormula: () => 'dataVolumeTB × $2,000/TB × 50% saving',
    getComponents: (l) => l.aiReadiness?.components ?? [],
    condition: (l) => l.aiReadiness !== null,
  },
]

interface Props {
  levers: Levers
  totals: Totals
  onComponentClick?: (componentId: string) => void
}

function ComponentPill({ id, onClick }: { id: string; onClick?: (id: string) => void }) {
  const label = COMPONENT_LABELS[id] || id
  const pillar = COMPONENT_PILLARS[id] || 'semantic'
  const color = PILLAR_COLORS[pillar]

  return (
    <button
      onClick={() => onClick?.(id)}
      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-opacity hover:opacity-80"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {label}
    </button>
  )
}

export default function ValueBreakdown({ levers, totals, onComponentClick }: Props) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const maxValue = Math.max(...LEVER_CONFIGS.filter((c) => !c.condition || c.condition(levers)).map((c) => c.getValue(levers)), 1)

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-muted)]">
        Where the value comes from
      </h3>

      {LEVER_CONFIGS.filter((config) => !config.condition || config.condition(levers)).map((config) => {
        const value = config.getValue(levers)
        const expanded = expandedKey === config.key
        const barWidth = Math.max(5, (value / maxValue) * 100)
        const color = PILLAR_COLORS[config.pillar]

        return (
          <motion.div
            key={config.key}
            layout
            className="overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]"
            style={{ borderLeftColor: color, borderLeftWidth: 4 }}
          >
            <button
              onClick={() => setExpandedKey(expanded ? null : config.key)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{config.name}</span>
                  {config.isOneTime && (
                    <span className="rounded-full bg-[var(--bg-surface)] px-2 py-0.5 text-[9px] text-[var(--text-muted)]">
                      one-time
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--bg-surface)]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">{formatCurrency(value)}</span>
                </div>
              </div>
              <span className={`ml-3 text-xs text-[var(--text-muted)] transition-transform ${expanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--border-subtle)] px-4 pb-4 pt-3">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {config.getComponents(levers).map((cid) => (
                        <ComponentPill key={cid} id={cid} onClick={onComponentClick} />
                      ))}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {config.getDescription(levers)}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-[var(--text-muted)]">
                      {config.getFormula(levers)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Total bar */}
      <div className="rounded-lg border border-teal/30 bg-teal/5 p-4">
        <div className="font-mono text-xl font-bold text-teal">
          TOTAL FIRST-YEAR VALUE: {formatCurrency(totals.firstYear)}
        </div>
        <div className="mt-1 text-xs text-[var(--text-secondary)]">
          (Annual: {formatCurrency(totals.annual)} + One-time: {formatCurrency(totals.oneTime)})
        </div>
      </div>
    </div>
  )
}

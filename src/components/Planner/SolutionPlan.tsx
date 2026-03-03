import { motion } from 'framer-motion'
import type { SolutionPlan as SolutionPlanType } from './PlannerAPI'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

interface Props {
  plan: SolutionPlanType
  components: { id: string; pillar: string; shortName: string }[]
}

export default function SolutionPlan({ plan, components }: Props) {
  const getColor = (compId: string) => {
    const comp = components.find((c) => c.id === compId)
    return comp ? PILLAR_COLORS[comp.pillar] || '#00b23b' : '#00b23b'
  }

  const getName = (compId: string) => {
    const comp = components.find((c) => c.id === compId)
    return comp?.shortName || compId
  }

  return (
    <div className="space-y-6">
      {/* Block A: Challenge Analysis */}
      <motion.div
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal">
          Challenge Analysis
        </h4>
        <p className="text-sm text-[var(--text-secondary)]">{plan.challengeAnalysis.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {plan.challengeAnalysis.painPoints.map((pp, i) => (
            <span
              key={i}
              className="rounded-full bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] text-[var(--text-secondary)]"
            >
              {pp}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Block B: Recommended Components */}
      <motion.div
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal">
          Recommended Components
        </h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {plan.recommendedComponents.map((comp) => (
            <div
              key={comp.id}
              className="rounded-lg bg-[var(--bg-surface)] p-3"
              style={{ borderLeft: `3px solid ${getColor(comp.id)}` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">{getName(comp.id)}</span>
                <span className="text-[9px] text-[var(--text-muted)]">Phase {comp.phase}</span>
              </div>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">{comp.role}</p>
              <span className="mt-1 inline-block text-[9px] text-[var(--text-muted)]">
                via {comp.deliveryChannel}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Block C: Phased Approach */}
      <motion.div
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal">
          Phased Approach
        </h4>
        <div className="space-y-3">
          {plan.phases.map((phase) => (
            <div key={phase.number} className="rounded-lg bg-[var(--bg-surface)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Phase {phase.number}: {phase.title}
                </span>
                <span className="text-[10px] text-teal">{phase.weeks}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {phase.components.map((cid) => (
                  <span
                    key={cid}
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                    style={{
                      backgroundColor: `${getColor(cid)}15`,
                      color: getColor(cid),
                    }}
                  >
                    {getName(cid)}
                  </span>
                ))}
              </div>
              <ul className="mt-2 space-y-0.5">
                {phase.deliverables.map((d, i) => (
                  <li key={i} className="text-[11px] text-[var(--text-secondary)]">
                    • {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Block D: Acceleration Comparison */}
      <motion.div
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal">
          Acceleration
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-[var(--bg-surface)] p-3 text-center">
            <p className="text-[10px] text-[var(--text-muted)]">Traditional</p>
            <p className="font-serif text-xl text-[var(--text-secondary)]">
              {plan.acceleration.traditional.weeks} wks
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {plan.acceleration.traditional.effort} · {plan.acceleration.traditional.cost}
            </p>
          </div>
          <div className="rounded-lg bg-teal/5 p-3 text-center ring-1 ring-teal/20">
            <p className="text-[10px] text-teal">With ORIAN.Data</p>
            <p className="font-serif text-xl text-[var(--text-primary)]">
              {plan.acceleration.withOrian.weeks} wks
            </p>
            <p className="text-[10px] text-teal">
              {plan.acceleration.withOrian.effort} · {plan.acceleration.withOrian.cost}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Block E: Delivery Strategy */}
      <motion.div
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal">
          Delivery Strategy
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {plan.deliveryStrategy.channels.map((ch) => (
            <span key={ch} className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] text-teal">
              {ch}
            </span>
          ))}
        </div>
        {plan.deliveryStrategy.dayOneValue && (
          <p className="mt-2 text-xs text-trust">{plan.deliveryStrategy.dayOneValue}</p>
        )}
        {plan.deliveryStrategy.securityNote && (
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">{plan.deliveryStrategy.securityNote}</p>
        )}
      </motion.div>

      {/* Block F: Closing */}
      <motion.p
        className="text-center font-serif text-sm italic text-trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        This plan draws on patterns from real engagements — not generic
        frameworks, but decisions made by architects who were trusted
        with the outcome.
      </motion.p>
    </div>
  )
}

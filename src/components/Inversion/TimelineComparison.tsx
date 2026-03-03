import { motion } from 'framer-motion'
import MetricCounters from './MetricCounters'

const OLD_STAGES = [
  { icon: '🗄️', label: '400+ Sources' },
  { icon: '🔻', label: 'Ingestion' },
  { icon: '📦', label: 'Data Lake' },
  { icon: '⚙️', label: 'Transform' },
  { icon: '📊', label: 'Dashboards' },
  { icon: '🔍', label: 'Human squints' },
]

const NEW_STAGES = [
  { icon: '🎯', label: 'Business Outcome' },
  { icon: '🧠', label: 'Intent Decoded' },
  { icon: '🔗', label: 'Data Identified' },
  { icon: '🛡️', label: 'Quality Certified' },
  { icon: '🤖', label: 'Delivered to Agent' },
]

const OLD_METRICS = [
  { value: '14 weeks', label: 'timeline' },
  { value: '$2.4M', label: 'cost' },
  { value: '400 data sources', label: 'data processed' },
  { value: '12 dashboards', label: 'nobody uses' },
]

const NEW_METRICS = [
  { value: '4 weeks', label: 'timeline' },
  { value: '$380K', label: 'cost' },
  { value: '12 data assets', label: 'data identified' },
  { value: '1 outcome', label: 'delivered' },
]

function TimelineStage({
  icon,
  label,
  index,
  side,
}: {
  icon: string
  label: string
  index: number
  side: 'old' | 'new'
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: side === 'old' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
          side === 'old'
            ? 'bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)]'
            : 'bg-[rgba(0,178,59,0.08)] border border-[rgba(0,178,59,0.2)]'
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-center text-[11px] ${
          side === 'old' ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'
        }`}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function TimelineComparison() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Old Way */}
      <motion.div
        className="rounded-2xl border border-[rgba(148,163,184,0.15)] bg-[rgba(148,163,184,0.04)] p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Supply-Side Thinking
        </div>
        <h3 className="mb-6 font-serif text-xl text-[var(--text-secondary)]">
          The Old Way: Data → Decisions
        </h3>

        {/* Stages */}
        <div className="mb-6 flex items-start justify-between gap-2 overflow-x-auto">
          {OLD_STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center">
              <TimelineStage icon={stage.icon} label={stage.label} index={i} side="old" />
              {i < OLD_STAGES.length - 1 && (
                <span className="mx-1 text-[var(--text-muted)]">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <MetricCounters metrics={OLD_METRICS} className="border-t border-[rgba(148,163,184,0.15)] pt-4" />
      </motion.div>

      {/* ORIAN Way */}
      <motion.div
        className="rounded-2xl border border-[rgba(0,178,59,0.15)] bg-[rgba(0,178,59,0.03)] p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal">
          Demand-Side Thinking
        </div>
        <h3 className="mb-6 font-serif text-xl font-bold text-[var(--text-primary)]">
          The ORIAN Way: Outcome → Data
        </h3>

        {/* Stages (reversed flow) */}
        <div className="mb-6 flex items-start justify-between gap-2 overflow-x-auto">
          {NEW_STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center">
              <TimelineStage icon={stage.icon} label={stage.label} index={i} side="new" />
              {i < NEW_STAGES.length - 1 && (
                <span className="mx-1 text-teal">←</span>
              )}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <MetricCounters metrics={NEW_METRICS} className="border-t border-[rgba(0,178,59,0.15)] pt-4" />
      </motion.div>
    </div>
  )
}

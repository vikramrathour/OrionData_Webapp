import { motion } from 'framer-motion'

const ENGAGEMENTS = [
  {
    title: 'Start with Intent Discovery',
    duration: '2 weeks',
    bestFor: 'New relationships, proving the approach',
    deliverables: 'Data maturity assessment, accelerator fit analysis, 3 quick wins',
    cta: 'Book a Discovery Sprint',
  },
  {
    title: 'Activate a Single Pillar',
    duration: '8-12 weeks',
    bestFor: 'Specific high-priority need (migration, DQ, compliance)',
    deliverables: 'Full pillar activation against your use case',
    cta: 'Scope a Pillar',
  },
  {
    title: 'Enterprise Foundation',
    duration: '16-24 weeks',
    bestFor: 'Strategic multi-pillar transformation',
    deliverables: 'Full ORIAN.Data ecosystem deployment',
    cta: 'Design a Foundation',
  },
]

export default function EngagementCTA() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {ENGAGEMENTS.map((eng, i) => (
        <motion.div
          key={eng.title}
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-colors hover:bg-[var(--bg-card-hover)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <h4 className="font-serif text-lg text-white">{eng.title}</h4>
          <div className="mt-2 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
            {eng.duration}
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-muted)]">Best for:</strong> {eng.bestFor}
          </p>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-muted)]">Deliverables:</strong> {eng.deliverables}
          </p>
          <button className="mt-4 w-full rounded-lg bg-teal/10 py-2 text-sm font-medium text-teal transition-colors hover:bg-teal/20">
            {eng.cta}
          </button>
        </motion.div>
      ))}
    </div>
  )
}

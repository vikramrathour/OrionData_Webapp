import { motion } from 'framer-motion'
import { formatCurrency } from './roiCalculations'
import type { ThreeYearValue } from './roiCalculations'

interface Props {
  threeYear: ThreeYearValue
}

const YEARS = [
  {
    label: 'Year 1',
    phase: 'ACCELERATE',
    color: '#00b23b',
    heightMultiplier: 1,
    bullets: [
      'Immediate productivity gains',
      'Migration completed faster',
      'Quality baseline established',
    ],
    metric: (v: ThreeYearValue) => `Baseline value: ${formatCurrency(v.year1)}`,
  },
  {
    label: 'Year 2',
    phase: 'COMPOUND',
    color: '#3b82f6',
    heightMultiplier: 1.4,
    bullets: [
      'Every engagement enriches the skill library',
      'Ontology models deepen with validated extensions',
      'Quality rules grow with each regulatory engagement',
    ],
    metric: (v: ThreeYearValue) => `40% more efficient — ${formatCurrency(v.year2)}`,
  },
  {
    label: 'Year 3',
    phase: 'DIFFERENTIATE',
    color: '#a78bfa',
    heightMultiplier: 1.8,
    bullets: [
      'Your data estate carries business intent, not just schemas',
      'Agents consume trusted, context-rich data',
      "Competitors are still building pipelines. You're building outcomes.",
    ],
    metric: (v: ThreeYearValue) => `Cumulative 3-year: ${formatCurrency(v.total)}`,
  },
]

export default function CompoundingEffect({ threeYear }: Props) {
  const baseHeight = 160

  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-muted)]">
        The Compounding Effect
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {YEARS.map((year, i) => (
          <motion.div
            key={year.label}
            className="frosted-glass flex flex-col justify-end rounded-xl p-4"
            style={{
              minHeight: baseHeight * year.heightMultiplier,
              borderTop: `3px solid ${year.color}`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <div className="mb-auto">
              <span className="font-mono text-[10px] font-bold tracking-wider" style={{ color: year.color }}>
                {year.phase}
              </span>
              <h4 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{year.label}</h4>
            </div>
            <ul className="my-3 space-y-1.5">
              {year.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: year.color }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-[var(--border-subtle)] pt-2 font-mono text-xs font-semibold text-[var(--text-primary)]">
              {year.metric(threeYear)}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
        ORIAN.Data doesn't just accelerate Year 1. It makes every subsequent year faster than the last.
      </p>
    </div>
  )
}

import { motion } from 'framer-motion'
import TimelineComparison from './TimelineComparison'
import MetricCounters from './MetricCounters'

const COMPARISON_METRICS = [
  { value: '3.5x', label: 'faster' },
  { value: '84%', label: 'less cost' },
  { value: '97%', label: 'less data processed' },
  { value: '100%', label: 'outcome-aligned' },
]

export default function InversionSection() {
  return (
    <section id="inversion" className="relative flex min-h-screen items-center bg-[var(--bg-deep)]">
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-teal">
            The Philosophy
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            The industry builds data-up.{' '}
            <span className="text-gradient-teal-blue italic">We build outcomes-down.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-secondary)]">
            Every competitor operates on the same inherited model: Data → Decisions → Value.
            We invert it. Outcome → Intent → Data.
          </p>
        </motion.div>

        {/* Dual Timelines */}
        <TimelineComparison />

        {/* Comparison Math */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-[rgba(0,178,59,0.1)] bg-[rgba(0,178,59,0.03)] p-8">
            <MetricCounters metrics={COMPARISON_METRICS} />
          </div>
        </motion.div>

        {/* Closing Quote */}
        <motion.blockquote
          className="mt-16 text-center font-serif text-xl italic text-[var(--text-trust)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          "Infrastructure disciplined by demand, not justified by supply."
        </motion.blockquote>
      </div>
    </section>
  )
}

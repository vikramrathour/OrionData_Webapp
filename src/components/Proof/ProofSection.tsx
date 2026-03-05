import { useState } from 'react'
import { motion } from 'framer-motion'
import type { GraphData } from '../../hooks/useGraphData'
import IndustrySelector from './IndustrySelector'
import UseCaseCard from './UseCaseCard'

const FIELD_NOTES: Record<string, string> = {
  'bfsi-01': "We've sat across from the OCC examiner. We know what they actually ask for.",
  'bfsi-02': "Lineage in banking isn't documentation. It's audit evidence under oath.",
  'hc-01': "Mapped FHIR resources for systems where the patient record is the product, not the byproduct.",
  'hc-10': "Built by engineers who've traced PHI flows through 47 integration points.",
  'mfg-01': "Built from OT/IT convergence work where 'downtime' means millions per hour, not an incident ticket.",
  'mfg-02': "The EU mandate is 18 months away. The data architecture takes 12. Start now.",
  'tech-03': "Every data mesh we've seen fail had the same root cause: no semantic layer.",
  'ret-01': "15 touchpoints. 3 consent frameworks. 1 unified view. That's the real challenge.",
}

interface Props {
  graphData: GraphData
}

export default function ProofSection({ graphData }: Props) {
  const [activeIndustry, setActiveIndustry] = useState('bfsi')

  const counts: Record<string, number> = {}
  for (const key of Object.keys(graphData.useCases)) {
    counts[key] = 4
  }

  const currentCases = (graphData.useCases[activeIndustry] || []).slice(0, 4)

  return (
    <section id="proof" className="relative min-h-screen bg-[var(--bg-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--text-trust)]">
            The Proof
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            20 use cases. 5 industries.{' '}
            <br className="hidden md:inline" />
            Every outcome earned, not promised.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            Select an industry to see how ORIAN.Data components
            combine to solve specific business problems.
          </p>
        </motion.div>

        {/* Industry Selector */}
        <div className="mb-10">
          <IndustrySelector
            active={activeIndustry}
            onChange={setActiveIndustry}
            counts={counts}
          />
        </div>

        {/* Use Case Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentCases.map((uc) => (
            <UseCaseCard
              key={uc.id}
              useCase={uc}
              components={graphData.components}
              fieldNote={FIELD_NOTES[uc.id]}
            />
          ))}
        </div>

        {/* Closing Stat Bar */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-8 py-4 text-sm md:gap-8">
            <span className="text-[var(--text-primary)]">
              <strong className="font-serif text-lg">49.65 TB</strong>{' '}
              <span className="text-[var(--text-muted)]">migrated</span>
            </span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--text-primary)]">
              <strong className="font-serif text-lg">11,748</strong>{' '}
              <span className="text-[var(--text-muted)]">tables</span>
            </span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--text-primary)]">
              <strong className="font-serif text-lg">$145K/mo</strong>{' '}
              <span className="text-[var(--text-muted)]">saved</span>
            </span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--text-primary)]">
              <strong className="font-serif text-lg">99.5%</strong>{' '}
              <span className="text-[var(--text-muted)]">data accuracy</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            These aren't projections. They're receipts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

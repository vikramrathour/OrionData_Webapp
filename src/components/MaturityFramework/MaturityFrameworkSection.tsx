import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { maturityLevels, type MaturityScore } from './maturity-data'
import { useAppContext } from '../../context/AppContext'
import MaturityLevel from './MaturityLevel'
import MaturityAssessment from './MaturityAssessment'
import MaturityResult from './MaturityResult'

export default function MaturityFrameworkSection() {
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<MaturityScore | null>(null)
  const [selectedSignals, setSelectedSignals] = useState<string[]>([])
  const { setMaturityResult } = useAppContext()
  const resultRef = useRef<HTMLDivElement>(null)

  const handleResult = (result: MaturityScore, signals: string[]) => {
    setAssessmentResult(result)
    setSelectedSignals(signals)
    setShowAssessment(false)
    setMaturityResult({
      level: result.level,
      score: result.score,
      isTransitional: result.isTransitional,
      signals,
    })
    // Scroll to result after render
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <section id="maturity" className="relative min-h-screen bg-[var(--bg-deep)] py-24">
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
            Where Are You?
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            The Data Intent Maturity Framework
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            Five levels from liability to intelligence. Find where your
            organization stands — and see the specific path forward.
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="space-y-6">
          {maturityLevels.map((level) => (
            <MaturityLevel
              key={level.level}
              data={level}
              isActive={assessmentResult?.level === level.level}
            />
          ))}
        </div>

        {/* Assessment Result (inline) */}
        <div ref={resultRef}>
          {assessmentResult && (
            <MaturityResult result={assessmentResult} selectedSignals={selectedSignals} />
          )}
        </div>
      </div>

      {/* Floating CTA */}
      {!assessmentResult && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--accent-teal)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
          onClick={() => setShowAssessment(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Unlocking Insights
          <span aria-hidden="true">&rarr;</span>
        </motion.button>
      )}

      {/* Assessment Modal */}
      <AnimatePresence>
        {showAssessment && (
          <MaturityAssessment
            onClose={() => setShowAssessment(false)}
            onResult={handleResult}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

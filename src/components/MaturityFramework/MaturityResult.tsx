import { motion } from 'framer-motion'
import { maturityLevels, type MaturityScore } from './maturity-data'
import { useAppContext } from '../../context/AppContext'

interface Props {
  result: MaturityScore
  selectedSignals: string[]
}

export default function MaturityResult({ result, selectedSignals }: Props) {
  const { setMaturityResult } = useAppContext()
  const levelData = maturityLevels[result.level - 1]
  const nextLevel = result.level < 5 ? maturityLevels[result.level] : null

  const handlePlanCTA = () => {
    setMaturityResult({
      level: result.level,
      score: result.score,
      isTransitional: result.isTransitional,
      signals: selectedSignals,
    })
    document.querySelector('#planner')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      className="mt-10 overflow-hidden rounded-xl border-2 bg-[var(--bg-card)] p-6 shadow-lg md:p-8"
      style={{ borderColor: levelData.color }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <span
          className="mb-3 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-white"
          style={{ backgroundColor: levelData.color }}
        >
          {result.isTransitional
            ? `Between Level ${result.level} and Level ${result.level + 1}`
            : `Level ${result.level}`}
        </span>
        <h3 className="mt-3 font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          {result.isTransitional
            ? `${levelData.name} → ${nextLevel?.name}`
            : levelData.name}
        </h3>
        <p className="mt-2 text-base italic text-[var(--text-secondary)]">
          "{levelData.tagline}"
        </p>
        <p className="mt-1 font-mono text-sm text-[var(--text-muted)]">
          Score: {result.score} / 5
        </p>
      </div>

      {/* What this means */}
      <div className="mb-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          What This Means
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {levelData.pathForward}
        </p>
      </div>

      {/* Next level components */}
      {nextLevel && (
        <div className="mb-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            To Reach Level {nextLevel.level}: {nextLevel.name}
          </p>
          <div className="mb-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-[var(--text-muted)]">Investment</p>
              <p className="font-mono font-medium text-[var(--text-primary)]">
                {nextLevel.orianIntervention.investment}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Duration</p>
              <p className="font-medium text-[var(--text-primary)]">
                {nextLevel.orianIntervention.duration}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-muted)]">Entry</p>
              <p className="font-medium text-[var(--text-primary)]">
                {nextLevel.orianIntervention.entryPoint}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {nextLevel.orianIntervention.components.map((c) => (
              <span
                key={c}
                className="rounded-md px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${nextLevel.color}15`,
                  color: nextLevel.color,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={handlePlanCTA}
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: levelData.color }}
        >
          See Your Custom Plan
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </motion.div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assessmentQuestions, calculateMaturityLevel, type MaturityScore } from './maturity-data'

interface Props {
  onClose: () => void
  onResult: (result: MaturityScore, signals: string[]) => void
}

export default function MaturityAssessment({ onClose, onResult }: Props) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedSignals, setSelectedSignals] = useState<string[]>([])
  const [selected, setSelected] = useState<number | null>(null)

  const question = assessmentQuestions[currentQ]
  const total = assessmentQuestions.length

  const handleSelect = (optionIndex: number) => {
    setSelected(optionIndex)
  }

  const handleNext = () => {
    if (selected === null) return

    const option = question.options[selected]
    const newAnswers = [...answers, option.levelSignal]
    const newSignals = [...selectedSignals, option.text]

    if (currentQ < total - 1) {
      setAnswers(newAnswers)
      setSelectedSignals(newSignals)
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      const result = calculateMaturityLevel(newAnswers)
      onResult(result, newSignals)
    }
  }

  // Level-matching color for selected option
  const getAccentColor = (levelSignal: number): string => {
    const colors: Record<number, string> = {
      1: '#ef4444', 1.5: '#ef4444',
      2: '#3b82f6', 2.5: '#3b82f6',
      3: '#f5a623', 3.5: '#f5a623',
      4: '#00b23b', 4.5: '#00b23b',
    }
    const rounded = Math.round(levelSignal)
    return colors[rounded] || '#94a3b8'
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-2xl md:p-8"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Progress dots */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentQ ? 'w-6 bg-[var(--accent-teal)]' : i < currentQ ? 'w-2 bg-[var(--accent-teal)]' : 'w-2 bg-[var(--border-subtle)]'
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Question {currentQ + 1} of {total}
            </p>
            <h3 className="mb-6 font-serif text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              {question.question}
            </h3>

            {/* Option cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {question.options.map((opt, i) => {
                const isSelected = selected === i
                const accentColor = getAccentColor(opt.levelSignal)
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`rounded-xl border-2 p-4 text-left text-sm transition-all ${
                      isSelected
                        ? 'shadow-md'
                        : 'border-[var(--border-subtle)] hover:border-[var(--text-muted)]'
                    }`}
                    style={isSelected ? { borderColor: accentColor, backgroundColor: `${accentColor}08` } : {}}
                  >
                    <span className={`block ${isSelected ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {opt.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="rounded-lg bg-[var(--accent-teal)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentQ < total - 1 ? 'Next' : 'See My Level'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

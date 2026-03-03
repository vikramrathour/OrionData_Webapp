import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import SemanticGraph from './SemanticGraph'
import type { AnimationPhase } from '../../types/graph'

const PHASE_CONFIG: Record<AnimationPhase, { label: string; color: string; pulse: boolean }> = {
  observing: { label: 'Observing raw data', color: '#f5a623', pulse: false },
  decoding: { label: 'Decoding intent...', color: '#f5a623', pulse: true },
  resolved: { label: 'Intent resolved', color: '#00d4aa', pulse: false },
}

export default function Hero() {
  const [phase, setPhase] = useState<AnimationPhase>('observing')
  const onPhaseChange = useCallback((p: AnimationPhase) => setPhase(p), [])

  const phaseInfo = PHASE_CONFIG[phase]

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[55%_45%]">
        {/* Text — left side */}
        <div className="py-20 text-center lg:text-left">
          {/* Phase indicator pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-1.5"
          >
            <span
              className={`h-2 w-2 rounded-full ${phaseInfo.pulse ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: phaseInfo.color }}
            />
            <span className="text-xs text-[var(--text-secondary)]">{phaseInfo.label}</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Every enterprise has data.
            </motion.span>
            <motion.span
              className="block text-gradient-teal-blue italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              Almost none of it
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              knows why it exists.
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            className="mx-auto mt-6 max-w-[460px] text-[17px] leading-relaxed text-[var(--text-secondary)] lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            ORIAN.Data is the AI-native accelerator that encodes business
            intent into your data — so agents inherit context, not just columns.
          </motion.p>

          {/* Trust anchor — appears AFTER graph transformation completes */}
          <AnimatePresence>
            {phase === 'resolved' && (
              <motion.p
                className="mt-4 font-serif text-[13px] italic text-trust"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Earned in the field. Encoded in the platform.
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.7 }}
          >
            <Button variant="primary" href="#planner">
              Tell me your outcome →
            </Button>
            <Button variant="secondary" href="#architecture">
              Explore the architecture
            </Button>
          </motion.div>

          {/* Builder trust line */}
          <motion.p
            className="mt-12 text-xs text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Built by architects who've earned trust inside the
            enterprises they now serve together.
          </motion.p>
        </div>

        {/* D3 graph — right side */}
        <div className="relative hidden h-[600px] lg:block">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--bg-deep)_90%)]" />
          <SemanticGraph onPhaseChange={onPhaseChange} />
        </div>
      </div>

      {/* Mobile: graph as subtle background */}
      <div className="absolute inset-0 opacity-20 lg:hidden">
        <SemanticGraph minimal />
      </div>
    </section>
  )
}

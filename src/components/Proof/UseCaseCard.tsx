import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { UseCase, Component } from '../../hooks/useGraphData'
import FieldNote from './FieldNote'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

interface Props {
  useCase: UseCase
  components: Component[]
  fieldNote?: string
}

export default function UseCaseCard({ useCase, components, fieldNote }: Props) {
  const [expanded, setExpanded] = useState(false)

  const usedComponents = useCase.components
    .map((cid) => components.find((c) => c.id === cid))
    .filter(Boolean) as Component[]

  return (
    <div className="relative">
      <motion.div
        layout
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-colors hover:bg-[var(--bg-card-hover)]"
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start justify-between text-left"
        >
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{useCase.name}</h4>
            <span className="mt-1 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
              {useCase.outcome}
            </span>
            <div className="mt-2 flex flex-wrap gap-1">
              {usedComponents.map((comp) => (
                <span
                  key={comp.id}
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${PILLAR_COLORS[comp.pillar]}15`,
                    color: PILLAR_COLORS[comp.pillar],
                  }}
                >
                  {comp.shortName}
                </span>
              ))}
            </div>
          </div>
          <span
            className={`ml-2 mt-1 text-[var(--text-muted)] transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-[var(--border-subtle)] pt-4">
                {usedComponents.map((comp) => (
                  <div key={comp.id} className="rounded-lg bg-[var(--bg-surface)] p-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: PILLAR_COLORS[comp.pillar] }}
                      >
                        {comp.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">{comp.maturity}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                      {comp.description}
                    </p>
                  </div>
                ))}
                <a
                  href="#architecture"
                  className="inline-block text-xs text-teal hover:underline"
                >
                  View in Architecture Explorer →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Field note */}
      {fieldNote && <FieldNote note={fieldNote} />}
    </div>
  )
}

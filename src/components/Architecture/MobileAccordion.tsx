import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Component, Pillar, Edge } from '../../hooks/useGraphData'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

interface Props {
  pillars: Pillar[]
  components: Component[]
  edges: Edge[]
}

export default function MobileAccordion({ pillars, components, edges }: Props) {
  const [openPillar, setOpenPillar] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {pillars.map((pillar) => {
        const isOpen = openPillar === pillar.id
        const pillarComponents = components.filter((c) => c.pillar === pillar.id)
        const color = PILLAR_COLORS[pillar.id]

        return (
          <div key={pillar.id} className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
            <button
              onClick={() => setOpenPillar(isOpen ? null : pillar.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{pillar.name}</span>
                <span className="ml-2 text-xs text-[var(--text-muted)]">
                  {pillarComponents.length} components
                </span>
              </div>
              <span className={`text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 px-4 pb-4">
                    {pillarComponents.map((comp) => {
                      const connections = edges
                        .filter((e) => e.source === comp.id || e.target === comp.id)
                        .map((e) => (e.source === comp.id ? e.target : e.source))
                      const connectedNames = connections.map(
                        (cid) => components.find((c) => c.id === cid)?.shortName || cid,
                      )

                      return (
                        <div
                          key={comp.id}
                          className="rounded-lg bg-[var(--bg-surface)] p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--text-primary)]">{comp.shortName}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{comp.maturity}</span>
                          </div>
                          <p className="mt-1 text-xs text-[var(--text-secondary)]">{comp.description}</p>
                          {comp.provenance && (
                            <p className="mt-1 text-[11px] italic text-trust">{comp.provenance}</p>
                          )}
                          {connectedNames.length > 0 && (
                            <p className="mt-2 text-[10px] text-[var(--text-muted)]">
                              Connects to: {connectedNames.join(', ')}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

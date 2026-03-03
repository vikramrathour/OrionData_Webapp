import { motion, AnimatePresence } from 'framer-motion'
import type { Component } from '../../hooks/useGraphData'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

const PILLAR_NAMES: Record<string, string> = {
  foundation: 'Data Foundation',
  semantic: 'Semantic Intelligence',
  ai: 'AI-Led Engineering',
  trust: 'Trust & Operations',
}

const MATURITY_BADGES: Record<string, string> = {
  production: '✓✓✓ Production',
  'field-tested': '✓✓ Field-Tested',
  MVP: '✓ MVP',
  concept: '○ Concept',
}

const CHANNEL_ICONS: Record<string, string> = {
  tool: '⚡',
  specs: '📐',
  prompts: '🧠',
  standards: '📋',
  code: '💻',
}

interface Props {
  component: Component | null
  position: { x: number; y: number }
  pinned: boolean
  onClose: () => void
}

export default function NodeTooltip({ component, position, pinned, onClose }: Props) {
  if (!component) return null

  const pillarColor = PILLAR_COLORS[component.pillar] || '#00b23b'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-auto absolute z-30 w-80 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 backdrop-blur-xl"
        style={{
          left: Math.min(position.x, window.innerWidth - 340),
          top: position.y + 10,
        }}
      >
        {/* Header */}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{component.name}</h4>
            <span
              className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${pillarColor}20`, color: pillarColor }}
            >
              {PILLAR_NAMES[component.pillar]}
            </span>
          </div>
          {pinned && (
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Close tooltip"
            >
              ×
            </button>
          )}
        </div>

        {/* Description */}
        <p className="mb-2 text-xs leading-relaxed text-[var(--text-secondary)]">
          {component.description}
        </p>

        {/* Provenance */}
        {component.provenance && (
          <p className="mb-2 text-[11px] italic text-trust">
            {component.provenance}
          </p>
        )}

        {/* Channels */}
        <div className="mb-2 flex items-center gap-1">
          {component.channels.map((ch) => (
            <span
              key={ch}
              className="rounded-md bg-[var(--bg-surface)] px-1.5 py-0.5 text-[10px]"
              title={ch}
            >
              {CHANNEL_ICONS[ch] || ch}
            </span>
          ))}
          <span className="ml-1 text-[10px] text-[var(--text-muted)]">
            {MATURITY_BADGES[component.maturity] || component.maturity}
          </span>
        </div>

        {/* Industry tags */}
        <div className="flex flex-wrap gap-1">
          {component.industries.map((ind) => (
            <span
              key={ind}
              className="rounded-full bg-[var(--bg-surface)] px-2 py-0.5 text-[9px] uppercase text-[var(--text-muted)]"
            >
              {ind}
            </span>
          ))}
        </div>

        {/* Capabilities (when pinned) */}
        {pinned && component.capabilities.length > 0 && (
          <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Capabilities
            </p>
            <ul className="space-y-1">
              {component.capabilities.map((cap, i) => (
                <li key={i} className="text-[11px] text-[var(--text-secondary)]">
                  • {cap}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

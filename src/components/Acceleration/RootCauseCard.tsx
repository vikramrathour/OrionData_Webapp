import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RootCause } from './acceleration-data'

function Icon({ type, color }: { type: RootCause['icon']; color: string }) {
  const style = { color, width: 20, height: 20 }
  switch (type) {
    case 'database':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={style}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9" />
          <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" />
        </svg>
      )
    case 'git-branch':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={style}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="9" r="2.5" />
          <path d="M6 8.5v7" />
          <path d="M6 8.5C6 12 18 12 18 11.5" />
        </svg>
      )
    case 'file-text':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={style}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      )
    case 'shield-check':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={style}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    case 'brain':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={style}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
      )
  }
}

function MetricDisplay({ metric }: { metric: RootCause['metric'] }) {
  if (metric.before && metric.after) {
    return (
      <div className="flex items-center gap-3 text-xs">
        <span className="text-[var(--text-muted)] line-through">{metric.before}</span>
        <span className="text-[var(--text-muted)]">→</span>
        <span className="font-semibold text-[var(--text-primary)]">{metric.after}</span>
        {metric.multiplier && (
          <span className="rounded-full bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]">
            {metric.multiplier}
          </span>
        )}
      </div>
    )
  }
  return (
    <div className="text-xs">
      <span className="font-semibold text-[var(--text-primary)]">{metric.value}</span>
      {metric.detail && (
        <span className="ml-1 text-[var(--text-muted)]">{metric.detail}</span>
      )}
    </div>
  )
}

export default function RootCauseCard({ cause }: { cause: RootCause }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer rounded-xl border bg-[var(--bg-card)] p-5 transition-all duration-200"
      style={{
        borderColor: expanded ? `${cause.accentColor}40` : 'var(--border-subtle)',
        boxShadow: expanded ? `0 0 20px ${cause.accentColor}15` : 'none',
      }}
      whileHover={{
        boxShadow: `0 0 16px ${cause.accentColor}20`,
        borderColor: `${cause.accentColor}35`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${cause.accentColor}15` }}
          >
            <Icon type={cause.icon} color={cause.accentColor} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{cause.title}</p>
            <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{cause.metric.label}</p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 shrink-0 text-[var(--text-muted)]"
        >
          ▾
        </motion.span>
      </div>

      {/* Metric preview (always visible) */}
      <div className="mt-3 pl-12">
        <MetricDisplay metric={cause.metric} />
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 border-t border-[var(--border-subtle)] pt-4">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  The Problem
                </p>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{cause.problem}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Why AI Fails
                </p>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{cause.whyAiFails}</p>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  ORIAN.Data Fix
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {cause.orianFix.components.map((c) => (
                    <span
                      key={c}
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: `${cause.accentColor}15`,
                        color: cause.accentColor,
                        border: `1px solid ${cause.accentColor}30`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{cause.orianFix.description}</p>
              </div>

              {cause.isClimax && (
                <div
                  className="rounded-lg p-3 text-xs text-center font-medium"
                  style={{ backgroundColor: `${cause.accentColor}10`, color: cause.accentColor }}
                >
                  This is the root cause underneath all the others.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

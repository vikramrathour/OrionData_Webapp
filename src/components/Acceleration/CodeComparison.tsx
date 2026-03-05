import { useState } from 'react'
import { codeExamples } from './acceleration-data'
import type { CodeLine } from './acceleration-data'

const LINE_STYLES: Record<CodeLine['type'], string> = {
  comment: 'text-[#6b7280]',
  'comment-error': 'text-[#9ca3af] bg-red-900/20',
  'comment-success': 'text-[#4ade80]/80',
  error: 'text-[#fca5a5] bg-red-900/25 border-l-2 border-red-400/50',
  success: 'text-[#4ade80] bg-green-900/15 border-l-2 border-[#00b23b]/50',
  code: 'text-[#e2e8f0]',
  empty: 'text-transparent select-none',
}

function CodePanel({
  label,
  lines,
  variant,
  footer,
}: {
  label: string
  lines: CodeLine[]
  variant: 'error' | 'success'
  footer: { items: string[]; marker: string; color: string }
}) {
  const borderColor = variant === 'error' ? 'border-red-800/40' : 'border-[#00b23b]/30'
  const headerBg = variant === 'error' ? 'bg-red-950/30 border-red-800/40' : 'bg-[#00b23b]/5 border-[#00b23b]/20'
  const dotColor = variant === 'error' ? 'bg-red-400' : 'bg-[#00b23b]'
  const labelColor = variant === 'error' ? 'text-red-400' : 'text-[#00b23b]'

  return (
    <div className={`flex flex-col rounded-xl border ${borderColor} bg-[#0f172a] overflow-hidden`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${headerBg}`}>
        <span className={`h-2 w-2 rounded-full ${dotColor}`} />
        <span className={`font-mono text-xs font-medium ${labelColor}`}>{label}</span>
      </div>

      <pre className="flex-1 overflow-x-auto p-4 text-xs leading-6">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`px-1 rounded-[2px] ${LINE_STYLES[line.type]}`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
      </pre>

      <div className={`border-t ${headerBg} p-4 space-y-1.5`}>
        {footer.items.map((item, i) => (
          <div key={i} className={`flex items-start gap-2 text-xs ${footer.color}`}>
            <span className="mt-0.5 shrink-0 font-mono">{footer.marker}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CodeComparison() {
  const [tab, setTab] = useState<'without' | 'with'>('without')

  return (
    <div>
      {/* Mobile tab toggle */}
      <div className="flex md:hidden mb-3 rounded-lg border border-[var(--border-subtle)] overflow-hidden">
        {(['without', 'with'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
              tab === t
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {t === 'without' ? '✗ Generic AI' : '✓ ORIAN.Data'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className={tab === 'with' ? 'hidden md:block' : ''}>
          <CodePanel
            label={codeExamples.withoutOrian.label}
            lines={codeExamples.withoutOrian.lines}
            variant="error"
            footer={{
              items: codeExamples.withoutOrian.issues,
              marker: '✗',
              color: 'text-red-400/80',
            }}
          />
        </div>
        <div className={tab === 'without' ? 'hidden md:block' : ''}>
          <CodePanel
            label={codeExamples.withOrian.label}
            lines={codeExamples.withOrian.lines}
            variant="success"
            footer={{
              items: codeExamples.withOrian.fixes,
              marker: '✓',
              color: 'text-[#00b23b]/80',
            }}
          />
        </div>
      </div>
    </div>
  )
}

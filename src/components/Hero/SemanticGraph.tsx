import { useRef } from 'react'
import { useSemanticGraph } from '../../hooks/useSemanticGraph'
import type { AnimationPhase } from '../../types/graph'

interface Props {
  onPhaseChange?: (phase: AnimationPhase) => void
  minimal?: boolean
}

export default function SemanticGraph({ onPhaseChange, minimal }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  useSemanticGraph(svgRef, onPhaseChange)

  if (minimal) {
    return <svg ref={svgRef} className="h-full w-full" aria-hidden="true" />
  }

  return (
    <div className="relative h-full w-full rounded-2xl border border-[var(--border-subtle)] bg-[rgba(248,249,250,0.6)] backdrop-blur-sm">
      {/* Pillar legend */}
      <div className="absolute bottom-3 left-3 z-20 flex gap-3">
        {[
          { label: 'Foundation', color: '#3b82f6' },
          { label: 'Semantic', color: '#00b23b' },
          { label: 'AI', color: '#a78bfa' },
          { label: 'Trust', color: '#f5a623' },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-[10px] text-[var(--text-muted)]">{p.label}</span>
          </div>
        ))}
      </div>
      <svg ref={svgRef} className="h-full w-full" aria-hidden="true" />
    </div>
  )
}

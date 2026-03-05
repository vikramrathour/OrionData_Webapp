import { rootCauses } from './acceleration-data'
import RootCauseCard from './RootCauseCard'

export default function RootCauseExplorer() {
  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
          Root Cause Analysis
        </p>
        <h3 className="mt-2 font-serif text-xl font-bold text-[var(--text-primary)] md:text-2xl">
          Five reasons AI underperforms in data engineering
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Click each card to see the problem, the failure mode, and the fix.
        </p>
      </div>

      {/* Desktop: 3 + 2 grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 mb-4">
        {rootCauses.slice(0, 3).map((cause) => (
          <RootCauseCard key={cause.id} cause={cause} />
        ))}
      </div>
      <div className="hidden md:grid md:grid-cols-2 gap-4 md:max-w-2xl md:mx-auto">
        {rootCauses.slice(3).map((cause) => (
          <RootCauseCard key={cause.id} cause={cause} />
        ))}
      </div>

      {/* Mobile: vertical accordion */}
      <div className="flex flex-col gap-3 md:hidden">
        {rootCauses.map((cause) => (
          <RootCauseCard key={cause.id} cause={cause} />
        ))}
      </div>
    </div>
  )
}

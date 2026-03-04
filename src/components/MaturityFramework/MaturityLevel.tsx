import { motion } from 'framer-motion'
import type { MaturityLevelData } from './maturity-data'
import MiniConstellation from './MiniConstellation'

interface Props {
  data: MaturityLevelData
  isActive?: boolean
}

// Edge maps per level — indices into the components array
const LEVEL_EDGES: Record<number, [number, number][]> = {
  1: [[0, 1], [1, 2]],
  2: [[0, 1], [1, 2], [2, 3], [0, 2]],
  3: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 3]],
  4: [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]],
  5: [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [0, 3]],
}

export default function MaturityLevel({ data, isActive }: Props) {
  const edges = LEVEL_EDGES[data.level] || []

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border bg-[var(--bg-card)] ${
        isActive
          ? 'border-2 shadow-lg'
          : 'border-[var(--border-subtle)]'
      } ${data.isNorthStar ? 'border-dashed' : ''}`}
      style={{
        borderLeftWidth: 6,
        borderLeftColor: data.color,
        ...(isActive ? { borderColor: data.color } : {}),
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_200px] md:p-8">
        {/* Left: Content */}
        <div className="space-y-5">
          {/* Level badge + name */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: data.color }}
            >
              Level {data.level}
            </span>
            <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              {data.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-base italic text-[var(--text-secondary)]">
            "{data.tagline}"
          </p>

          {/* Diagnostic signals */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Diagnostic Signals
            </p>
            <ul className="space-y-1.5">
              {data.diagnosticSignals.map((signal, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: data.color }}
                  />
                  {signal}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Intervention card */}
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              ORIAN.Data Intervention
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-[var(--text-muted)]">Entry</p>
                <p className="font-medium text-[var(--text-primary)]">{data.orianIntervention.entryPoint}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Investment</p>
                <p className="font-mono font-medium text-[var(--text-primary)]">{data.orianIntervention.investment}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Duration</p>
                <p className="font-medium text-[var(--text-primary)]">{data.orianIntervention.duration}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {data.orianIntervention.components.map((c) => (
                <span
                  key={c}
                  className="rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${data.color}15`,
                    color: data.color,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {data.orianIntervention.accelerationMetrics.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="font-mono text-lg font-bold" style={{ color: data.color }}>
                    {m.value}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Path forward */}
          <div
            className="border-l-2 pl-4 text-sm italic text-[var(--text-secondary)]"
            style={{ borderLeftColor: data.color }}
          >
            {data.pathForward}
          </div>

          {/* North star note */}
          {data.isNorthStar && (
            <p className="rounded-lg border border-dashed border-[var(--text-muted)] p-3 text-xs text-[var(--text-muted)]">
              No enterprise is fully here yet. This is the 2027–2028 horizon. But naming the destination
              gives the journey meaning — and positions every investment along the way.
            </p>
          )}
        </div>

        {/* Right: Mini constellation */}
        <div className="hidden items-center justify-center md:flex">
          <MiniConstellation
            components={data.orianIntervention.components}
            color={data.color}
            edges={edges}
            isNorthStar={data.isNorthStar}
          />
        </div>
      </div>
    </motion.div>
  )
}

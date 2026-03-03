import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { TimelinePoint, BreakevenResult } from './roiCalculations'
import { formatCurrency } from './roiCalculations'

interface Props {
  data: TimelinePoint[]
  breakeven: BreakevenResult
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div className="frosted-glass rounded-lg p-3 shadow-xl">
      <p className="mb-1.5 text-xs font-semibold text-[var(--text-primary)]">Month {label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-[11px]" style={{ color: entry.dataKey === 'traditional' ? '#94a3b8' : '#00b23b' }}>
          {entry.dataKey === 'traditional' ? 'Current trajectory' : 'With ORIAN.Data'}:{' '}
          <span className="font-mono font-semibold">{formatCurrency(entry.value)}</span>
        </p>
      ))}
    </div>
  )
}

export default function TimelineChart({ data, breakeven }: Props) {
  const breakevenMonth = Math.min(breakeven.months, 24)
  const last = data[data.length - 1]
  const valueCaptured = last ? last.savings : 0

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-muted)]">
        The Timeline — 24-Month Comparison
      </h3>
      <div className="frosted-glass rounded-xl p-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTraditional" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradOrian" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00b23b" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#00b23b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              label={{ value: 'Months', position: 'insideBottomRight', offset: -5, fill: '#94a3b8', fontSize: 10 }}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
              tickFormatter={(v: number) => formatCurrency(v)}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="traditional"
              stroke="#94a3b8"
              strokeDasharray="5 5"
              fill="url(#gradTraditional)"
              strokeWidth={2}
              name="Current trajectory"
            />
            <Area
              type="monotone"
              dataKey="withOrian"
              stroke="#00b23b"
              fill="url(#gradOrian)"
              strokeWidth={2}
              name="With ORIAN.Data"
            />
            {breakevenMonth <= 24 && (
              <ReferenceLine
                x={breakevenMonth}
                stroke="#f5a623"
                strokeDasharray="5 5"
                strokeWidth={1.5}
                label={{ value: `Breakeven: Month ${breakevenMonth}`, position: 'top', fill: '#c77d10', fontSize: 10 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
        {valueCaptured > 0 && (
          <div className="mt-2 text-center text-xs text-teal">
            Value captured: <span className="font-mono font-semibold">{formatCurrency(valueCaptured)}</span> over 24 months
          </div>
        )}
      </div>
    </div>
  )
}

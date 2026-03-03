import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from './roiCalculations'
import type { MigrationResult, BreakevenResult } from './roiCalculations'

interface Props {
  accelerationFactor: number
  annualValue: number
  engineers: number
  effectiveTeamSize: number
  migration: MigrationResult | null
  breakeven: BreakevenResult
  inView: boolean
}

function useAnimatedNumber(target: number, inView: boolean, decimals = 1): number {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    const from = current

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = from + (target - from) * eased
      setCurrent(parseFloat(val.toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, inView, decimals])

  return current
}

function MetricCard({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="frosted-glass relative rounded-xl border-l-4 border-l-teal p-5">
      <div className="font-mono text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">{label}</div>
      <div className="mt-0.5 text-xs text-[var(--text-muted)]">{sublabel}</div>
    </div>
  )
}

export default function AccelerationMetrics({ accelerationFactor, annualValue, engineers, effectiveTeamSize, migration, breakeven, inView }: Props) {
  const animAccel = useAnimatedNumber(accelerationFactor, inView)
  const animValue = useAnimatedNumber(annualValue, inView, 0)

  const showMigration = migration !== null
  const card3Value = showMigration ? migration.timelineCompression : breakeven.months
  const animCard3 = useAnimatedNumber(card3Value, inView, 0)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard
        value={`${animAccel.toFixed(1)}×`}
        label="faster delivery"
        sublabel={`Your ${engineers} engineers operate at the output of ${effectiveTeamSize}`}
      />
      <MetricCard
        value={formatCurrency(Math.round(animValue))}
        label="reclaimed annually"
        sublabel="Redirected from maintenance to value creation"
      />
      {showMigration ? (
        <MetricCard
          value={`${Math.round(animCard3)} months`}
          label="compressed"
          sublabel="Across migration + platform build"
        />
      ) : (
        <MetricCard
          value={`${Math.round(animCard3)} months`}
          label="to breakeven"
          sublabel={`Investment recovered in under ${Math.round(animCard3) + 1} months`}
        />
      )}
    </div>
  )
}

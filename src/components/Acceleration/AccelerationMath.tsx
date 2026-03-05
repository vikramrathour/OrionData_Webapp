import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { accelerationFormulas } from './acceleration-data'

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

interface Row {
  label: string
  before: string
  after: string
  highlight?: boolean
}

export default function AccelerationMath() {
  const [teamSize, setTeamSize] = useState(25)

  const result = useMemo(() => accelerationFormulas.calculate(teamSize), [teamSize])

  const rows: Row[] = [
    { label: 'Effective output', before: `${result.teamSize} engineers`, after: `${result.effectiveTeamSize} engineers`, highlight: true },
    { label: 'Maintenance time', before: result.maintenanceBefore, after: result.maintenanceAfter },
    { label: 'Pipeline deploy', before: result.pipelineDeployBefore, after: result.pipelineDeployAfter },
    { label: 'DQ incidents / yr', before: `~${result.dqIncidentsBefore}`, after: `~${result.dqIncidentsAfter}` },
  ]

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSize(Number(e.target.value))
  }, [])

  const sliderPct = ((teamSize - 5) / (200 - 5)) * 100

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 md:p-8">
      {/* Slider */}
      <div className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <label className="text-sm font-semibold text-[var(--text-primary)]">
            Your data engineering team
          </label>
          <span className="font-serif text-2xl font-bold text-ai">{teamSize}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={5}
            max={200}
            step={5}
            value={teamSize}
            onChange={handleSlider}
            className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #a78bfa ${sliderPct}%, var(--border-subtle) ${sliderPct}%)`,
            }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[var(--text-muted)]">
          <span>5</span>
          <span>200</span>
        </div>
      </div>

      {/* Comparison table */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div /> {/* empty label column header */}
        <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
          Without ORIAN.Data
        </div>
        <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-ai pb-2 border-b border-ai/20">
          With ORIAN.Data
        </div>

        {rows.map((row) => (
          <>
            <div key={`${row.label}-label`} className="text-xs text-[var(--text-muted)] py-3 flex items-center">
              {row.label}
            </div>
            <div
              key={`${row.label}-before`}
              className={`text-center text-xs py-3 flex items-center justify-center rounded-lg ${
                row.highlight ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              {row.before}
            </div>
            <div
              key={`${row.label}-after`}
              className={`text-center text-xs py-3 flex items-center justify-center rounded-lg ${
                row.highlight
                  ? 'bg-ai/8 font-bold text-ai'
                  : 'bg-ai/5 text-ai/80'
              }`}
            >
              {row.after}
            </div>
          </>
        ))}
      </div>

      {/* Annual value callout */}
      <motion.div
        className="rounded-xl border border-ai/20 bg-ai/5 p-5 text-center"
        animate={result.annualValue >= 1_000_000 ? { scale: [1, 1.01, 1] } : {}}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <p className="text-xs text-[var(--text-muted)] mb-1">Annual value of the gap</p>
        <p className="font-serif text-3xl font-bold text-ai">{formatCurrency(result.annualValue)}</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Equivalent to hiring {result.equivalentEngineers} engineers — without the headcount
        </p>
      </motion.div>

      {/* CTA */}
      <div className="mt-5 text-center">
        <a
          href="#planner"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#planner')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-2 rounded-full bg-ai px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          See My Custom Acceleration Plan
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

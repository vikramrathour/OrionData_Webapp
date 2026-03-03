import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ROIInputs } from './roiCalculations'
import { formatCurrency } from './roiCalculations'

const INDUSTRIES = [
  { value: 'BFSI', label: 'BFSI', icon: '🏦' },
  { value: 'Healthcare & Life Sciences', label: 'Healthcare & Life Sciences', icon: '🏥' },
  { value: 'Manufacturing', label: 'Manufacturing', icon: '🏭' },
  { value: 'Technology', label: 'Technology', icon: '💻' },
  { value: 'Retail', label: 'Retail', icon: '🛍️' },
  { value: 'Other', label: 'Other', icon: '🏢' },
]

const PIPELINE_OPTIONS = ['days', '1-2 weeks', '2-4 weeks', '4+ weeks']
const MIGRATION_SOURCES = ['Oracle', 'SQL Server', 'Teradata', 'Netezza', 'Hadoop', 'Other']
const REGULATIONS = ['BCBS 239', 'GDPR', 'HIPAA', 'SOX', 'EU AI Act', 'DORA', 'MiFID II']

const INDUSTRY_REGULATIONS: Record<string, string[]> = {
  'BFSI': ['BCBS 239', 'SOX'],
  'Healthcare & Life Sciences': ['HIPAA'],
  'Manufacturing': ['GDPR'],
}

const DEFAULTS: ROIInputs = {
  industry: 'BFSI',
  dataVolumeTB: 50,
  sourceSystems: 40,
  engineers: 25,
  avgCost: 150000,
  maintenancePct: 0.55,
  pipelineTime: '2-4 weeks',
  dqCost: 500000,
  hasMigration: false,
  migrationObjects: 5000,
  migrationSource: 'Oracle',
  regulations: ['BCBS 239', 'SOX'],
  buildingForAI: false,
}

interface Props {
  inputs: ROIInputs
  onChange: (inputs: ROIInputs) => void
}

// Logarithmic slider helpers (1-1000 TB)
function logToLinear(value: number): number {
  return (Math.log(value) - Math.log(1)) / (Math.log(1000) - Math.log(1)) * 100
}
function linearToLog(position: number): number {
  const v = Math.exp(Math.log(1) + (position / 100) * (Math.log(1000) - Math.log(1)))
  return Math.round(v)
}

function getVolumeLabel(tb: number): string {
  if (tb <= 10) return 'Department'
  if (tb <= 100) return 'Enterprise'
  return 'Complex Enterprise'
}

function CustomSlider({
  value, min, max, step, onChange, format, logarithmic, tooltip,
}: {
  value: number; min: number; max: number; step?: number; onChange: (v: number) => void
  format?: (v: number) => string; logarithmic?: boolean; tooltip?: string
}) {
  const timerRef = useRef<number>(0)
  const [showTooltip, setShowTooltip] = useState(false)

  const displayValue = format ? format(value) : value.toString()

  const sliderValue = logarithmic ? logToLinear(value) : value
  const sliderMin = logarithmic ? 0 : min
  const sliderMax = logarithmic ? 100 : max

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value)
    const newVal = logarithmic ? linearToLog(raw) : raw
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => onChange(newVal), 100)
    onChange(newVal)
  }, [logarithmic, onChange])

  const pct = ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100

  return (
    <div className="relative" onMouseEnter={() => tooltip && setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <div className="mb-1 font-mono text-lg font-semibold text-[var(--text-primary)]">{displayValue}</div>
      <input
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={step || (logarithmic ? 0.1 : 1)}
        value={sliderValue}
        onChange={handleChange}
        className="roi-slider w-full"
        style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
      />
      {tooltip && showTooltip && (
        <div className="absolute -top-12 left-0 right-0 z-10 rounded-lg bg-[var(--bg-surface)] p-2 text-[10px] text-[var(--text-secondary)] shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  )
}

function PillSelector({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            value === opt
              ? 'bg-teal text-[var(--bg-deep)]'
              : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-teal hover:text-teal'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function MultiPillSelector({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => onChange(selected ? value.filter((v) => v !== opt) : [...value, opt])}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              selected
                ? 'bg-teal text-[var(--bg-deep)]'
                : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-teal hover:text-teal'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!value)} className="flex items-center gap-3">
      <div className={`relative h-6 w-11 rounded-full transition-colors ${value ? 'bg-teal' : 'bg-gray-300'}`}>
        <motion.div
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
          animate={{ left: value ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
    </button>
  )
}

export default function InputPanel({ inputs, onChange }: Props) {
  const [industryOpen, setIndustryOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const update = useCallback((patch: Partial<ROIInputs>) => {
    const next = { ...inputs, ...patch }
    onChange(next)
  }, [inputs, onChange])

  const handleIndustryChange = useCallback((industry: string) => {
    const regs = INDUSTRY_REGULATIONS[industry] || []
    update({ industry, regulations: regs })
    setIndustryOpen(false)
  }, [update])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIndustryOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedIndustry = INDUSTRIES.find((i) => i.value === inputs.industry)

  return (
    <div className="space-y-6">
      {/* Block 1: Your Data Estate */}
      <div className="frosted-glass rounded-xl p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-teal">
          What we're working with
        </p>
        <h3 className="mb-5 text-sm font-semibold text-[var(--text-primary)]">Your Data Estate</h3>

        {/* Industry dropdown */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Industry</label>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIndustryOpen(!industryOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2.5 text-sm text-[var(--text-primary)] transition-colors hover:border-teal"
            >
              <span>{selectedIndustry?.icon} {selectedIndustry?.label}</span>
              <span className={`text-[var(--text-muted)] transition-transform ${industryOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <AnimatePresence>
              {industryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute z-20 mt-1 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-1 shadow-xl"
                >
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.value}
                      onClick={() => handleIndustryChange(ind.value)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-teal/10 hover:text-[var(--text-primary)]"
                    >
                      {ind.icon} {ind.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Data volume */}
        <div className="mb-5">
          <label className="mb-1.5 flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Data volume under management</span>
            <span className="text-[10px] text-[var(--text-muted)]">{getVolumeLabel(inputs.dataVolumeTB)}</span>
          </label>
          <CustomSlider
            value={inputs.dataVolumeTB}
            min={1} max={1000}
            logarithmic
            format={(v) => `${v} TB`}
            onChange={(v) => update({ dataVolumeTB: v })}
          />
        </div>

        {/* Source systems */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Number of source systems</label>
          <CustomSlider
            value={inputs.sourceSystems}
            min={5} max={500} step={5}
            onChange={(v) => update({ sourceSystems: v })}
            tooltip="ERP, CRM, data warehouses, SaaS platforms, legacy databases, flat files, APIs — count them all."
          />
        </div>

        {/* Engineers */}
        <div>
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Active data engineers</label>
          <CustomSlider
            value={inputs.engineers}
            min={5} max={200} step={1}
            format={(v) => `${v} engineers`}
            onChange={(v) => update({ engineers: v })}
          />
        </div>
      </div>

      {/* Block 2: Your Current Reality */}
      <div className="frosted-glass rounded-xl p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-[var(--accent-amber)]">
          What you're living with
        </p>
        <h3 className="mb-5 text-sm font-semibold text-[var(--text-primary)]">Your Current Reality</h3>

        {/* Avg cost */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Average fully-loaded engineer cost</label>
          <CustomSlider
            value={inputs.avgCost}
            min={80000} max={250000} step={5000}
            format={(v) => `${formatCurrency(v)}/yr`}
            onChange={(v) => update({ avgCost: v })}
            tooltip="Salary + benefits + tools + overhead. If using contractors, use blended rate × 2080 hours."
          />
        </div>

        {/* Maintenance split */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Time spent on maintenance vs. new value</label>
          <CustomSlider
            value={Math.round(inputs.maintenancePct * 100)}
            min={20} max={80} step={1}
            format={(v) => `${v}% maintenance`}
            onChange={(v) => update({ maintenancePct: v / 100 })}
          />
          <div className="mt-1.5 flex justify-between text-[10px]">
            <span className="text-[var(--text-muted)]">{Math.round(inputs.maintenancePct * 100)}% maintenance</span>
            <span className="text-teal">{Math.round((1 - inputs.maintenancePct) * 100)}% value creation</span>
          </div>
          <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full">
            <div className="bg-[var(--text-muted)]" style={{ width: `${inputs.maintenancePct * 100}%` }} />
            <div className="bg-teal" style={{ width: `${(1 - inputs.maintenancePct) * 100}%` }} />
          </div>
          <p className="mt-1 text-[10px] text-[var(--text-muted)]">Industry average: 40-60% maintenance</p>
        </div>

        {/* Pipeline time */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Average time to deploy a new data pipeline</label>
          <PillSelector options={PIPELINE_OPTIONS} value={inputs.pipelineTime} onChange={(v) => update({ pipelineTime: v })} />
        </div>

        {/* DQ cost */}
        <div>
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Annual data quality incident cost</label>
          <CustomSlider
            value={inputs.dqCost}
            min={0} max={10000000} step={50000}
            format={(v) => formatCurrency(v)}
            onChange={(v) => update({ dqCost: v })}
            tooltip="Include: regulatory fines, manual reconciliation hours, downstream decision errors, customer impact. Most enterprises underestimate this 3-5×."
          />
        </div>
      </div>

      {/* Block 3: Your Ambitions */}
      <div className="frosted-glass rounded-xl p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[1.5px] text-teal">
          Where you need to go
        </p>
        <h3 className="mb-5 text-sm font-semibold text-[var(--text-primary)]">Your Ambitions</h3>

        {/* Migration toggle */}
        <div className="mb-4">
          <Toggle
            value={inputs.hasMigration}
            onChange={(v) => update({ hasMigration: v })}
            label="Active or planned cloud migration?"
          />
          <AnimatePresence>
            {inputs.hasMigration && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-4 pl-4 border-l-2 border-teal/20">
                  <div>
                    <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Objects to migrate</label>
                    <CustomSlider
                      value={inputs.migrationObjects}
                      min={500} max={50000} step={500}
                      format={(v) => v.toLocaleString()}
                      onChange={(v) => update({ migrationObjects: v })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">Source platform</label>
                    <PillSelector options={MIGRATION_SOURCES} value={inputs.migrationSource} onChange={(v) => update({ migrationSource: v })} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Regulations */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs text-[var(--text-secondary)]">
            Regulatory compliance requirements
            {inputs.regulations.length > 0 && (
              <span className="ml-2 text-teal">{inputs.regulations.length} selected</span>
            )}
          </label>
          <MultiPillSelector options={REGULATIONS} value={inputs.regulations} onChange={(v) => update({ regulations: v })} />
        </div>

        {/* AI toggle */}
        <div>
          <Toggle
            value={inputs.buildingForAI}
            onChange={(v) => update({ buildingForAI: v })}
            label="Building for AI/agent consumption?"
          />
          <AnimatePresence>
            {inputs.buildingForAI && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-2 pl-14 text-[11px] text-[var(--text-muted)]">
                  Adds inference readiness gap calculation — the cost of data that exists but isn't consumable by AI systems.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Reset link */}
      <button
        onClick={() => onChange({ ...DEFAULTS })}
        className="text-xs text-[var(--text-muted)] transition-colors hover:text-teal"
      >
        Reset to defaults
      </button>
    </div>
  )
}

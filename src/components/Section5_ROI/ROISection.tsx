import { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'
import {
  calculateProductivity,
  calculatePipelineAcceleration,
  calculateDQSavings,
  calculateComplianceSavings,
  calculateMigrationSavings,
  calculateAIReadiness,
  calculateTotals,
  calculateAccelerationFactor,
  calculateBreakeven,
  calculateTimelineData,
  calculateThreeYearValue,
} from './roiCalculations'
import type { ROIInputs } from './roiCalculations'

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

export default function ROISection() {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULTS)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const results = useMemo(() => {
    const productivity = calculateProductivity(inputs.engineers, inputs.avgCost, inputs.maintenancePct)
    const pipeline = calculatePipelineAcceleration(inputs.engineers, inputs.avgCost, inputs.pipelineTime)
    const dq = calculateDQSavings(inputs.dqCost)
    const compliance = calculateComplianceSavings(inputs.regulations)
    const migration = calculateMigrationSavings(inputs.hasMigration, inputs.migrationObjects)
    const aiReadiness = calculateAIReadiness(inputs.buildingForAI, inputs.dataVolumeTB)

    const levers = { productivity, pipeline, dq, compliance, migration, aiReadiness }
    const totals = calculateTotals(levers)
    const accelerationFactor = calculateAccelerationFactor(inputs.pipelineTime)
    const breakeven = calculateBreakeven(inputs.engineers, totals.annual)
    const timelineData = calculateTimelineData(inputs, totals, breakeven)
    const threeYear = calculateThreeYearValue(totals.annual, totals.oneTime)

    return { levers, totals, accelerationFactor, breakeven, timelineData, threeYear }
  }, [inputs])

  return (
    <section id="roi" ref={sectionRef} className="relative min-h-screen bg-[var(--bg-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-teal">
            The Math
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-[40px] md:leading-tight">
            Don't take our word for it.{' '}
            <span className="text-gradient-teal-blue italic">Run your own numbers.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-base text-[var(--text-secondary)]">
            Every enterprise data initiative has a cost of delay, a cost of rework, and a cost of context lost.
            This calculator quantifies what changes when data carries intent.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[38%_62%]">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <InputPanel inputs={inputs} onChange={setInputs} />
          </motion.div>

          {/* Right: Outputs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <OutputPanel
              inputs={inputs}
              levers={results.levers}
              totals={results.totals}
              accelerationFactor={results.accelerationFactor}
              breakeven={results.breakeven}
              timelineData={results.timelineData}
              threeYear={results.threeYear}
              inView={inView}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

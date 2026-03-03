import AccelerationMetrics from './AccelerationMetrics'
import ValueBreakdown from './ValueBreakdown'
import TimelineChart from './TimelineChart'
import DayOneTimeline from './DayOneTimeline'
import CompoundingEffect from './CompoundingEffect'
import type { Levers, Totals, BreakevenResult, TimelinePoint, ThreeYearValue } from './roiCalculations'
import { useAppContext } from '../../context/AppContext'
import type { ROIInputs } from '../../context/AppContext'

interface Props {
  inputs: ROIInputs
  levers: Levers
  totals: Totals
  accelerationFactor: number
  breakeven: BreakevenResult
  timelineData: TimelinePoint[]
  threeYear: ThreeYearValue
  inView: boolean
}

export default function OutputPanel({ inputs, levers, totals, accelerationFactor, breakeven, timelineData, threeYear, inView }: Props) {
  const { setRoiInputs, setHighlightComponent } = useAppContext()

  const handleComponentClick = (componentId: string) => {
    setHighlightComponent(componentId)
    document.querySelector('#architecture')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => setHighlightComponent(null), 3000)
  }

  const handleBuildPlan = () => {
    setRoiInputs(inputs)
    document.querySelector('#planner')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="space-y-8">
      <AccelerationMetrics
        accelerationFactor={accelerationFactor}
        annualValue={totals.annual}
        engineers={inputs.engineers}
        effectiveTeamSize={levers.productivity.effectiveTeamSize}
        migration={levers.migration}
        breakeven={breakeven}
        inView={inView}
      />

      <ValueBreakdown
        levers={levers}
        totals={totals}
        onComponentClick={handleComponentClick}
      />

      <TimelineChart data={timelineData} breakeven={breakeven} />

      <DayOneTimeline />

      <CompoundingEffect threeYear={threeYear} />

      {/* Section closing */}
      <div className="space-y-4 pt-4 text-center">
        <p className="text-sm text-[var(--text-muted)]">
          These aren't projections from a model. They're patterns from architectures we've built, migrations we've delivered, and audits we've survived.
        </p>
        <p className="font-serif text-base italic text-[var(--accent-amber)]">
          "The most expensive data investment is the one that never reaches a decision."
        </p>
        <div className="pt-4">
          <p className="mb-3 text-sm text-[var(--text-secondary)]">
            Ready to go from numbers to a plan? →
          </p>
          <button
            onClick={handleBuildPlan}
            className="rounded-lg bg-teal px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,178,59,0.3)]"
          >
            Build my solution plan
          </button>
        </div>
      </div>
    </div>
  )
}

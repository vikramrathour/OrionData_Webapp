import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { GraphData } from '../../hooks/useGraphData'
import { useAppContext } from '../../context/AppContext'
import type { MaturityResult } from '../../context/AppContext'
import { maturityLevels } from '../MaturityFramework/maturity-data'
import ChatInterface from './ChatInterface'
import SolutionPlan from './SolutionPlan'
import EngagementCTA from './EngagementCTA'
import { submitChallenge, type ConversationMessage, type SolutionPlan as PlanType } from './PlannerAPI'

interface Props {
  graphData: GraphData
}

function buildPrefillMessage(inputs: import('../../context/AppContext').ROIInputs): string {
  const parts = [`We're a ${inputs.industry} organization`]
  if (inputs.regulations.length > 0) {
    parts.push(`with ${inputs.regulations.join(', ')} compliance requirements`)
  }
  if (inputs.hasMigration) {
    parts.push(`planning to migrate ${inputs.migrationObjects.toLocaleString()} objects from ${inputs.migrationSource}`)
  }
  parts.push(`with a team of ${inputs.engineers} data engineers`)
  if (inputs.buildingForAI) {
    parts.push('building for AI/agent consumption')
  }
  return parts.join(', ') + '.'
}

function buildMaturityPrefillMessage(result: MaturityResult): string {
  const levelData = maturityLevels[result.level - 1]
  return `Our organization is at Level ${result.level} (${levelData.name}). ` +
    `We recognize: ${result.signals.slice(0, 3).join('; ')}. ` +
    `We want to move toward Level ${Math.min(5, result.level + 1)}.`
}

export default function PlannerSection({ graphData }: Props) {
  const { roiInputs, maturityResult } = useAppContext()
  const initialMessage = useMemo(() => {
    if (maturityResult) return buildMaturityPrefillMessage(maturityResult)
    if (roiInputs) return buildPrefillMessage(roiInputs)
    return undefined
  }, [roiInputs, maturityResult])
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<PlanType | null>(null)
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (message: string) => {
    setLoading(true)
    setError(null)

    const newHistory: ConversationMessage[] = [
      ...conversation,
      { role: 'user' as const, content: message },
    ]
    setConversation(newHistory)

    try {
      const [result] = await Promise.all([
        submitChallenge(message, conversation),
        new Promise((r) => setTimeout(r, 4500)), // min delay for loading animation
      ])
      setPlan(result)
      setConversation([
        ...newHistory,
        { role: 'assistant' as const, content: 'Solution plan generated.' },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [conversation])

  return (
    <section id="planner" className="relative min-h-screen bg-[var(--bg-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-teal">
            Your Turn
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Tell us the outcome.{' '}
            <span className="text-gradient-teal-blue italic">We'll decode the intent.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            Describe your data challenge. ORIAN.Data will design
            a tailored solution plan — components, phasing,
            delivery channels, and estimated acceleration.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[40%_60%]">
          {/* Left: Chat */}
          <div>
            <ChatInterface
              onSubmit={handleSubmit}
              loading={loading}
              conversation={conversation}
              initialMessage={initialMessage}
            />
            {error && (
              <p className="mt-3 text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* Right: Plan output */}
          <div>
            {plan ? (
              <SolutionPlan plan={plan} components={graphData.components} />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)]">
                <p className="text-sm text-[var(--text-muted)]">
                  Your solution plan will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Engagement CTAs */}
        <div className="mt-20">
          <EngagementCTA />
        </div>
      </div>
    </section>
  )
}

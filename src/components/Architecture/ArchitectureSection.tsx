import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { GraphData } from '../../hooks/useGraphData'
import KnowledgeGraph from './KnowledgeGraph'
import DeliveryChannelBar from './DeliveryChannelBar'
import MobileAccordion from './MobileAccordion'

interface Props {
  graphData: GraphData
}

export default function ArchitectureSection({ graphData }: Props) {
  const [activeChannels, setActiveChannels] = useState<Set<string>>(new Set())

  const toggleChannel = useCallback((channelId: string) => {
    setActiveChannels((prev) => {
      const next = new Set(prev)
      if (next.has(channelId)) {
        next.delete(channelId)
      } else {
        next.add(channelId)
      }
      return next
    })
  }, [])

  const visibleCount = activeChannels.size === 0
    ? graphData.components.length
    : graphData.components.filter((c) =>
        c.channels.some((ch) => activeChannels.has(ch)),
      ).length

  return (
    <section id="architecture" className="relative min-h-screen bg-[var(--bg-deep)]">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-teal">
            The Architecture
          </p>
          <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">
            17 components. 4 pillars. One composable system.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)]">
            Every component works independently or as part of the whole.
            Hover to explore. Click to go deep. Filter by delivery channel.
          </p>
        </motion.div>
      </div>

      {/* Desktop: Knowledge Graph */}
      <div className="hidden md:block">
        <div className="relative mx-auto" style={{ height: '75vh', maxWidth: '1400px' }}>
          <KnowledgeGraph graphData={graphData} activeChannels={activeChannels} />
        </div>
        <div className="mx-auto mt-4 max-w-4xl px-6">
          <DeliveryChannelBar
            channels={graphData.deliveryChannels}
            activeChannels={activeChannels}
            onToggle={toggleChannel}
            visibleCount={visibleCount}
            totalCount={graphData.components.length}
          />
        </div>
      </div>

      {/* Mobile: Accordion fallback */}
      <div className="block px-6 pb-12 md:hidden">
        <MobileAccordion
          pillars={graphData.pillars}
          components={graphData.components}
          edges={graphData.edges}
        />
      </div>
    </section>
  )
}

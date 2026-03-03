import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3'

export interface GraphNode extends SimulationNodeDatum {
  id: string
  rawLabel: string
  intentLabel: string
  tier: 'hub' | 'primary' | 'secondary'
  pillar?: 'foundation' | 'semantic' | 'ai' | 'trust'
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode
  target: string | GraphNode
}

export type AnimationPhase = 'observing' | 'decoding' | 'resolved'

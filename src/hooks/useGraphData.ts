import graphData from '../data/orian-knowledge-graph.json'

export interface Pillar {
  id: string
  name: string
  purpose: string
  color: string
  glowColor: string
  position: string
}

export interface Component {
  id: string
  name: string
  shortName: string
  pillar: string
  description: string
  provenance: string
  maturity: string
  channels: string[]
  industries: string[]
  capabilities: string[]
}

export interface Edge {
  source: string
  target: string
  type: string
  label: string
  description: string
}

export interface DeliveryChannel {
  id: string
  name: string
  icon: string
  description: string
  securityClearance: string
  timeToValue: string
  richness: number
}

export interface IndustryOntology {
  id: string
  name: string
  fullName: string
  industry: string
  components: string[]
}

export interface UseCase {
  id: string
  name: string
  components: string[]
  outcome: string
}

export interface GraphData {
  meta: { name: string; version: string; tagline: string; philosophy: string; description: string }
  pillars: Pillar[]
  components: Component[]
  edges: Edge[]
  deliveryChannels: DeliveryChannel[]
  industryOntologies: IndustryOntology[]
  useCases: Record<string, UseCase[]>
  valueChainPaths: Record<string, { description: string; example: string }>
  layout: {
    pillarZones: Record<string, { cx: number; cy: number; label: string }>
    centerNode: { id: string; name: string; description: string; position: { cx: number; cy: number } }
  }
}

export function useGraphData(): GraphData {
  return graphData as unknown as GraphData
}

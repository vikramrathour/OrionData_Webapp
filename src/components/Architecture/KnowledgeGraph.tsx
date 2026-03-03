import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import type { GraphData, Component } from '../../hooks/useGraphData'
import NodeTooltip from './NodeTooltip'

const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00b23b',
  ai: '#a78bfa',
  trust: '#f5a623',
}

const MATURITY_RADIUS: Record<string, number> = {
  production: 22,
  'field-tested': 20,
  MVP: 18,
  concept: 16,
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string
  component?: Component
  isCenter?: boolean
  isOntology?: boolean
  pillar: string
  label: string
  radius: number
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | SimNode
  target: string | SimNode
  label?: string
  type?: string
  isDotted?: boolean
}

interface Props {
  graphData: GraphData
  activeChannels: Set<string>
}

export default function KnowledgeGraph({ graphData, activeChannels }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{
    component: Component | null
    position: { x: number; y: number }
    pinned: boolean
  }>({ component: null, position: { x: 0, y: 0 }, pinned: false })

  const closeTooltip = useCallback(() => {
    setTooltip({ component: null, position: { x: 0, y: 0 }, pinned: false })
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const sel = d3.select(svg)
    sel.selectAll('*').remove()
    sel.attr('width', width).attr('height', height)

    // Build node data
    const nodes: SimNode[] = []
    const links: SimLink[] = []

    // Center node
    nodes.push({
      id: 'orian-core',
      isCenter: true,
      pillar: 'semantic',
      label: 'ORIAN.Data',
      radius: 40,
      fx: width / 2,
      fy: height / 2,
    })

    // Pillar zone targets
    const zones: Record<string, { cx: number; cy: number }> = {
      foundation: { cx: width * 0.25, cy: height * 0.28 },
      semantic: { cx: width * 0.75, cy: height * 0.28 },
      ai: { cx: width * 0.25, cy: height * 0.72 },
      trust: { cx: width * 0.75, cy: height * 0.72 },
    }

    // Component nodes
    const pillarIndices: Record<string, number> = {}
    for (const comp of graphData.components) {
      const idx = pillarIndices[comp.pillar] || 0
      pillarIndices[comp.pillar] = idx + 1
      const zone = zones[comp.pillar]
      const angle = (idx / 5) * Math.PI * 2 - Math.PI / 2
      const spread = 80

      nodes.push({
        id: comp.id,
        component: comp,
        pillar: comp.pillar,
        label: comp.shortName,
        radius: MATURITY_RADIUS[comp.maturity] || 18,
        x: zone.cx + Math.cos(angle) * spread + (Math.random() - 0.5) * 40,
        y: zone.cy + Math.sin(angle) * spread + (Math.random() - 0.5) * 40,
      })

      // Faint link to center
      links.push({
        source: 'orian-core',
        target: comp.id,
        isDotted: true,
      })
    }

    // Cross-pillar edges
    for (const edge of graphData.edges) {
      links.push({
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: edge.type,
      })
    }

    // Industry ontology outer ring nodes
    const ontologyNodes: SimNode[] = []
    for (let i = 0; i < graphData.industryOntologies.length; i++) {
      const ont = graphData.industryOntologies[i]
      const angle = (i / graphData.industryOntologies.length) * Math.PI * 2 - Math.PI / 2
      const rx = width * 0.46
      const ry = height * 0.46
      ontologyNodes.push({
        id: `ont-${ont.id}`,
        isOntology: true,
        pillar: ont.industry === 'bfsi' ? 'foundation' :
                ont.industry === 'healthcare' ? 'semantic' :
                ont.industry === 'manufacturing' ? 'trust' : 'ai',
        label: ont.name,
        radius: 10,
        x: width / 2 + Math.cos(angle) * rx,
        y: height / 2 + Math.sin(angle) * ry,
      })

      // Link ontology to its components
      for (const compId of ont.components) {
        if (nodes.some((n) => n.id === compId)) {
          links.push({
            source: `ont-${ont.id}`,
            target: compId,
            isDotted: true,
          })
        }
      }
    }
    nodes.push(...ontologyNodes)

    // Determine visibility by channel filter
    const visibleIds = new Set<string>()
    visibleIds.add('orian-core')
    if (activeChannels.size === 0) {
      nodes.forEach((n) => visibleIds.add(n.id))
    } else {
      for (const comp of graphData.components) {
        if (comp.channels.some((ch) => activeChannels.has(ch))) {
          visibleIds.add(comp.id)
        }
      }
      ontologyNodes.forEach((n) => visibleIds.add(n.id))
    }

    // Defs
    const defs = sel.append('defs')
    for (const [pid, color] of Object.entries(PILLAR_COLORS)) {
      const f = defs.append('filter')
        .attr('id', `arch-glow-${pid}`)
        .attr('x', '-50%').attr('y', '-50%')
        .attr('width', '200%').attr('height', '200%')
      f.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur')
      const merge = f.append('feMerge')
      merge.append('feMergeNode').attr('in', 'blur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')

      // Gradient for center
      const grad = defs.append('radialGradient').attr('id', `grad-${pid}`)
      grad.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.3)
      grad.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0)
    }

    // Pillar zone backgrounds
    const zoneGroup = sel.append('g').attr('class', 'zones')
    for (const [pid, zone] of Object.entries(zones)) {
      const color = PILLAR_COLORS[pid]
      zoneGroup.append('rect')
        .attr('x', zone.cx - width * 0.22)
        .attr('y', zone.cy - height * 0.22)
        .attr('width', width * 0.44)
        .attr('height', height * 0.44)
        .attr('rx', 16)
        .attr('fill', color)
        .attr('opacity', 0.03)

      const pillar = graphData.pillars.find((p) => p.id === pid)
      if (pillar) {
        zoneGroup.append('text')
          .attr('x', zone.cx)
          .attr('y', zone.cy - height * 0.18)
          .attr('text-anchor', 'middle')
          .attr('fill', color)
          .attr('opacity', 0.5)
          .attr('font-size', 11)
          .attr('font-family', "'Roboto', sans-serif")
          .attr('font-weight', 600)
          .text(pillar.name)
      }
    }

    // Links layer
    const linkGroup = sel.append('g')
    const linkSel = linkGroup
      .selectAll<SVGLineElement, SimLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => {
        if (d.isDotted) return 'rgba(0,178,59,0.06)'
        const src = typeof d.source === 'string' ? d.source : d.source.id
        const srcNode = nodes.find((n) => n.id === src)
        return srcNode ? PILLAR_COLORS[srcNode.pillar] || '#d1d5db' : '#d1d5db'
      })
      .attr('stroke-width', (d) => d.isDotted ? 0.5 : 1)
      .attr('stroke-dasharray', (d) => d.isDotted ? '3,3' : 'none')
      .attr('opacity', 0)

    // Nodes layer
    const nodeGroup = sel.append('g')
    const nodeSel = nodeGroup
      .selectAll<SVGGElement, SimNode>('g')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('opacity', 0)
      .attr('cursor', 'pointer')

    // Node circles
    nodeSel.append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => {
        if (d.isCenter) return 'rgba(0,178,59,0.15)'
        if (d.isOntology) return 'rgba(148,163,184,0.1)'
        return `${PILLAR_COLORS[d.pillar]}15`
      })
      .attr('stroke', (d) => {
        if (d.isCenter) return '#00b23b'
        if (d.isOntology) return 'rgba(148,163,184,0.3)'
        return PILLAR_COLORS[d.pillar] || '#d1d5db'
      })
      .attr('stroke-width', (d) => d.isCenter ? 2 : 1)

    // Node labels
    nodeSel.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.isCenter ? -4 : d.radius + 14)
      .attr('fill', (d) => {
        if (d.isCenter) return '#1a1a1a'
        if (d.isOntology) return '#94a3b8'
        return '#4a5568'
      })
      .attr('font-size', (d) => {
        if (d.isCenter) return 14
        if (d.isOntology) return 9
        return 11
      })
      .attr('font-family', (d) => d.isOntology ? "'JetBrains Mono', monospace" : "'Roboto', sans-serif")
      .attr('font-weight', (d) => d.isCenter ? 700 : 500)
      .text((d) => d.label)

    // Center subtitle
    nodeSel.filter((d) => !!d.isCenter)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 12)
      .attr('fill', '#00b23b')
      .attr('font-size', 10)
      .attr('font-family', "'Roboto', sans-serif")
      .attr('font-style', 'italic')
      .text('Data with Intent')

    // Force simulation
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links)
        .id((d) => d.id)
        .distance((l) => {
          const s = l.source as SimNode
          const t = l.target as SimNode
          if (s.isCenter || t.isCenter) return 180
          if (s.isOntology || t.isOntology) return 150
          return 100
        })
        .strength((l) => {
          const s = l.source as SimNode
          const t = l.target as SimNode
          if (s.isCenter || t.isCenter) return 0.03
          if (l.isDotted) return 0.02
          return 0.08
        })
      )
      .force('charge', d3.forceManyBody().strength((d) => {
        const n = d as SimNode
        if (n.isCenter) return -600
        if (n.isOntology) return -100
        return -250
      }))
      .force('collide', d3.forceCollide<SimNode>((d) => d.radius + 20))
      // Pillar clustering force
      .force('x', d3.forceX<SimNode>((d) => {
        if (d.isCenter) return width / 2
        if (d.isOntology) return d.x || width / 2
        return zones[d.pillar]?.cx || width / 2
      }).strength(0.12))
      .force('y', d3.forceY<SimNode>((d) => {
        if (d.isCenter) return height / 2
        if (d.isOntology) return d.y || height / 2
        return zones[d.pillar]?.cy || height / 2
      }).strength(0.12))
      .on('tick', () => {
        nodes.forEach((d) => {
          if (!d.isCenter) {
            d.x = Math.max(d.radius + 10, Math.min(width - d.radius - 10, d.x!))
            d.y = Math.max(d.radius + 30, Math.min(height - d.radius - 30, d.y!))
          }
        })

        linkSel
          .attr('x1', (d) => (d.source as SimNode).x!)
          .attr('y1', (d) => (d.source as SimNode).y!)
          .attr('x2', (d) => (d.target as SimNode).x!)
          .attr('y2', (d) => (d.target as SimNode).y!)

        nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`)
      })

    // --- Entrance animations ---

    // Center node first
    nodeSel.filter((d) => !!d.isCenter)
      .transition().duration(600)
      .attr('opacity', 1)

    // Zone labels
    zoneGroup.selectAll('text')
      .attr('opacity', 0)
      .transition().delay(300).duration(500)
      .attr('opacity', 0.5)

    // Component nodes staggered by pillar
    const pillarOrder = ['foundation', 'semantic', 'ai', 'trust']
    let nodeDelay = 500
    for (const pid of pillarOrder) {
      nodeSel
        .filter((d) => !d.isCenter && !d.isOntology && d.pillar === pid)
        .transition()
        .delay(() => { nodeDelay += 120; return nodeDelay })
        .duration(500)
        .attr('opacity', (d) => visibleIds.has(d.id) ? 1 : 0.15)
    }

    // Edges
    linkSel
      .transition()
      .delay((_, i) => 2000 + i * 40)
      .duration(600)
      .attr('opacity', (d) => {
        if (d.isDotted) return 0.15
        const s = (d.source as SimNode).id || d.source
        const t = (d.target as SimNode).id || d.target
        if (visibleIds.has(s as string) && visibleIds.has(t as string)) return 0.35
        return 0.08
      })

    // Ontology nodes last
    nodeSel.filter((d) => !!d.isOntology)
      .transition().delay(3500).duration(500)
      .attr('opacity', 0.6)

    // Ambient drift after settling
    setTimeout(() => {
      simulation.alphaDecay(0).alphaTarget(0.008).alpha(0.008).velocityDecay(0.6).restart()
    }, 6000)

    // --- Particle animation on edges ---
    const particleCanvas = document.createElement('canvas')
    particleCanvas.width = width
    particleCanvas.height = height
    particleCanvas.style.position = 'absolute'
    particleCanvas.style.top = '0'
    particleCanvas.style.left = '0'
    particleCanvas.style.pointerEvents = 'none'
    container.appendChild(particleCanvas)
    const pCtx = particleCanvas.getContext('2d')!

    interface Particle { edge: SimLink; t: number; speed: number }
    const crossEdges = links.filter((l) => !l.isDotted)
    const particles: Particle[] = crossEdges.slice(0, 30).map((edge) => ({
      edge,
      t: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    }))

    let particleAnimId: number
    function animateParticles() {
      pCtx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.t += p.speed
        if (p.t > 1) p.t = 0
        const src = p.edge.source as SimNode
        const tgt = p.edge.target as SimNode
        if (!src.x || !tgt.x) continue
        const x = src.x + (tgt.x - src.x) * p.t
        const y = src.y! + (tgt.y! - src.y!) * p.t
        const color = PILLAR_COLORS[src.pillar] || '#00b23b'
        pCtx.beginPath()
        pCtx.arc(x, y, 2, 0, Math.PI * 2)
        pCtx.fillStyle = color
        pCtx.globalAlpha = 0.5
        pCtx.fill()
      }
      pCtx.globalAlpha = 1
      particleAnimId = requestAnimationFrame(animateParticles)
    }
    // Start particles after edges appear
    setTimeout(() => animateParticles(), 3000)

    // --- Hover interactions ---
    nodeSel.on('mouseenter', function (event, d) {
      if (d.isCenter || d.isOntology || !d.component) return
      if (tooltip.pinned) return

      // Highlight connected
      const connectedIds = new Set<string>([d.id])
      links.forEach((l) => {
        const sId = typeof l.source === 'string' ? l.source : l.source.id
        const tId = typeof l.target === 'string' ? l.target : l.target.id
        if (sId === d.id) connectedIds.add(tId)
        if (tId === d.id) connectedIds.add(sId)
      })

      nodeSel.transition().duration(200)
        .attr('opacity', (n) => connectedIds.has(n.id) || n.isCenter ? 1 : 0.2)
      linkSel.transition().duration(200)
        .attr('opacity', (l) => {
          const sId = (l.source as SimNode).id
          const tId = (l.target as SimNode).id
          return (sId === d.id || tId === d.id) ? 0.7 : 0.05
        })
        .attr('stroke-width', (l) => {
          const sId = (l.source as SimNode).id
          const tId = (l.target as SimNode).id
          return (sId === d.id || tId === d.id) ? 2 : 1
        })

      const rect = svg.getBoundingClientRect()
      setTooltip({
        component: d.component,
        position: { x: event.clientX - rect.left, y: event.clientY - rect.top },
        pinned: false,
      })
    })

    nodeSel.on('mouseleave', function (_, d) {
      if (d.isCenter || d.isOntology) return
      if (tooltip.pinned) return

      nodeSel.transition().duration(200)
        .attr('opacity', (n) => visibleIds.has(n.id) ? (n.isOntology ? 0.6 : 1) : 0.15)
      linkSel.transition().duration(200)
        .attr('opacity', (l) => l.isDotted ? 0.15 : 0.35)
        .attr('stroke-width', (l) => l.isDotted ? 0.5 : 1)

      setTooltip((prev) => (prev.pinned ? prev : { component: null, position: { x: 0, y: 0 }, pinned: false }))
    })

    nodeSel.on('click', function (event, d) {
      if (d.isCenter || d.isOntology || !d.component) return
      const rect = svg.getBoundingClientRect()
      setTooltip({
        component: d.component,
        position: { x: event.clientX - rect.left, y: event.clientY - rect.top },
        pinned: true,
      })
    })

    return () => {
      simulation.stop()
      cancelAnimationFrame(particleAnimId)
      if (particleCanvas.parentNode) {
        particleCanvas.parentNode.removeChild(particleCanvas)
      }
    }
  }, [graphData, activeChannels])

  return (
    <div ref={containerRef} className="relative h-full w-full" onClick={(e) => {
      if ((e.target as HTMLElement).tagName === 'DIV') closeTooltip()
    }}>
      <svg ref={svgRef} className="h-full w-full" />
      <NodeTooltip
        component={tooltip.component}
        position={tooltip.position}
        pinned={tooltip.pinned}
        onClose={closeTooltip}
      />
    </div>
  )
}

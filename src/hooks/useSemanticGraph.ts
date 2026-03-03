import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import type { GraphNode, GraphLink, AnimationPhase } from '../types/graph'
import {
  nodes as allNodes,
  links as allLinks,
  mobileNodeIds,
  PILLAR_COLORS,
} from '../components/Hero/graphData'

export function useSemanticGraph(
  containerRef: React.RefObject<SVGSVGElement | null>,
  onPhaseChange?: (phase: AnimationPhase) => void,
) {
  const simRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null)

  useEffect(() => {
    const svg = containerRef.current
    if (!svg) return

    const parent = svg.parentElement!
    let width = parent.clientWidth
    let height = parent.clientHeight

    const isMobile = width < 768
    const activeNodeIds = isMobile
      ? mobileNodeIds
      : new Set(allNodes.map((n) => n.id))

    const nodes: GraphNode[] = allNodes
      .filter((n) => activeNodeIds.has(n.id))
      .map((n) => ({ ...n }))
    const links: GraphLink[] = allLinks
      .filter(
        (l) =>
          activeNodeIds.has(l.source as string) &&
          activeNodeIds.has(l.target as string),
      )
      .map((l) => ({ ...l }))

    const sel = d3.select(svg)
    sel.selectAll('*').remove()
    sel.attr('width', width).attr('height', height)

    // Defs: glow filters
    const defs = sel.append('defs')

    // Per-pillar glow filters
    const pillarIds = ['foundation', 'semantic', 'ai', 'trust']
    for (const pid of pillarIds) {
      const f = defs
        .append('filter')
        .attr('id', `glow-${pid}`)
        .attr('x', '-50%').attr('y', '-50%')
        .attr('width', '200%').attr('height', '200%')
      f.append('feGaussianBlur').attr('stdDeviation', '5').attr('result', 'blur')
      const merge = f.append('feMerge')
      merge.append('feMergeNode').attr('in', 'blur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')
    }

    // Links
    const linkGroup = sel.append('g')
    const linkSel = linkGroup
      .selectAll<SVGLineElement, GraphLink>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#1e3a5f')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0)

    // Node groups
    const nodeGroup = sel.append('g')
    const nodeSel = nodeGroup
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('opacity', 0)

    // Background rect per node
    nodeSel
      .append('rect')
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('fill', '#0f2240')
      .attr('stroke', '#1e3a5f')
      .attr('stroke-width', 1)

    // Text label (starts as raw monospace)
    nodeSel
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#64748b')
      .attr('font-family', "'JetBrains Mono', monospace")
      .attr('font-size', (d) => {
        if (isMobile) return d.tier === 'primary' ? 11 : 9
        return d.tier === 'primary' ? 13 : 11
      })
      .text((d) => d.rawLabel)

    // Size rects to fit text
    function sizeRects() {
      nodeSel.each(function () {
        const g = d3.select(this)
        const text = g.select('text')
        const bbox = (text.node() as SVGTextElement).getBBox()
        g.select('rect')
          .attr('x', bbox.x - 14)
          .attr('y', bbox.y - 8)
          .attr('width', bbox.width + 28)
          .attr('height', bbox.height + 16)
      })
    }
    sizeRects()

    // Force simulation
    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(120),
      )
      .force('charge', d3.forceManyBody().strength(-450))
      .force('collide', d3.forceCollide(60))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        nodes.forEach((d) => {
          d.x = Math.max(80, Math.min(width - 80, d.x!))
          d.y = Math.max(40, Math.min(height - 40, d.y!))
        })

        linkSel
          .attr('x1', (d) => (d.source as GraphNode).x!)
          .attr('y1', (d) => (d.source as GraphNode).y!)
          .attr('x2', (d) => (d.target as GraphNode).x!)
          .attr('y2', (d) => (d.target as GraphNode).y!)

        nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`)
      })

    simRef.current = simulation

    // --- Animation timeline ---

    // Phase: Observing
    onPhaseChange?.('observing')

    // Phase 1: Nodes fade in staggered (120ms each)
    nodeSel
      .transition()
      .delay((_, i) => i * 120)
      .duration(600)
      .attr('opacity', 1)

    // Phase 2: Links draw in staggered
    linkSel
      .transition()
      .delay((_, i) => 1500 + i * 80)
      .duration(800)
      .attr('opacity', 0.5)

    // Phase: Decoding (at ~4.5s)
    setTimeout(() => onPhaseChange?.('decoding'), 4500)

    // Phase 3: Morph labels — transformation cascade (4.5s-8s)
    nodeSel.each(function (d, i) {
      const g = d3.select(this)
      const text = g.select('text')
      const rect = g.select('rect')
      const delay = 4500 + i * 350
      const pillarColor = d.pillar ? PILLAR_COLORS[d.pillar] : '#00d4aa'

      text
        .transition()
        .delay(delay)
        .duration(250)
        .attr('opacity', 0)
        .on('end', function () {
          const thisText = d3.select(this)
          const fontSize = isMobile ? (d.tier === 'primary' ? 11 : 9) : (d.tier === 'primary' ? 13 : 11)

          thisText
            .text(d.intentLabel)
            .attr('font-family', "'DM Sans', sans-serif")
            .attr('font-size', fontSize)
            .attr('fill', '#e2e8f0')
            .attr('font-weight', '500')

          const bbox = (thisText.node() as SVGTextElement).getBBox()
          rect
            .transition()
            .duration(300)
            .attr('x', bbox.x - 14)
            .attr('y', bbox.y - 8)
            .attr('width', bbox.width + 28)
            .attr('height', bbox.height + 16)
            .attr('stroke', pillarColor)
            .attr('fill', `${pillarColor}15`)

          thisText.transition().duration(300).attr('opacity', 1)

          g.transition()
            .delay(300)
            .attr('filter', `url(#glow-${d.pillar || 'semantic'})`)
        })
    })

    // Update link colors after transformation
    setTimeout(() => {
      linkSel
        .transition()
        .duration(500)
        .attr('stroke', (d) => {
          const src = d.source as GraphNode
          const srcColor = src.pillar ? PILLAR_COLORS[src.pillar] : '#00d4aa'
          return srcColor
        })
        .attr('opacity', 0.4)
    }, 4500 + nodes.length * 350)

    // Phase: Resolved (after all nodes transformed)
    const resolvedTime = 4500 + nodes.length * 350 + 600
    setTimeout(() => onPhaseChange?.('resolved'), resolvedTime)

    // Phase 4: Continuous ambient drift
    setTimeout(() => {
      simulation.alphaDecay(0).alphaTarget(0.03).alpha(0.03).velocityDecay(0.4).restart()
    }, 8000)

    // Resize handler
    let resizeTimer: number
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        width = parent.clientWidth
        height = parent.clientHeight
        sel.attr('width', width).attr('height', height)
        simulation
          .force('center', d3.forceCenter(width / 2, height / 2))
          .alpha(0.3)
          .restart()
      }, 250)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      simulation.stop()
    }
  }, [containerRef, onPhaseChange])
}

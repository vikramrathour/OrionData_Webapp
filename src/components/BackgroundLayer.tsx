import { useEffect, useRef } from 'react'

const SQL_FRAGMENTS = [
  'SELECT intent FROM data_estate',
  'WHERE trust_score > 0.95',
  'JOIN ontology ON semantic.id',
  'GROUP BY business_outcome',
  'ORDER BY value DESC',
  'CREATE VIEW customer_360 AS',
  'INSERT INTO knowledge_graph',
  'ALTER TABLE raw_to_intent',
  'MERGE INTO semantic_layer',
  'UPDATE lineage SET verified',
  'GRANT SELECT ON compliance',
  'EXPLAIN ANALYZE decision_path',
]

interface Particle {
  x: number
  y: number
  speed: number
  opacity: number
  size: number
}

export default function BackgroundLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let scrollY = 0

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * document.documentElement.scrollHeight,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.05 + Math.random() * 0.25,
      size: 1 + Math.random() * 2,
    }))

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()

    function onScroll() {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const w = canvas!.width
      const h = canvas!.height

      // Grid lines
      ctx!.strokeStyle = 'rgba(0, 212, 170, 0.03)'
      ctx!.lineWidth = 1
      const gridOffset = (scrollY * 0.1) % 80
      for (let x = -gridOffset; x < w; x += 80) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, h)
        ctx!.stroke()
      }
      for (let y = -gridOffset; y < h; y += 80) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(w, y)
        ctx!.stroke()
      }

      // Particles
      for (const p of particles) {
        const screenY = p.y - scrollY * 0.3
        // Wrap particles
        if (screenY < -10) {
          p.y += document.documentElement.scrollHeight + 100
        }
        p.y -= p.speed

        const drawY = p.y - scrollY * 0.3
        if (drawY > -10 && drawY < h + 10) {
          ctx!.beginPath()
          ctx!.arc(p.x, drawY, p.size, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(0, 212, 170, ${p.opacity})`
          ctx!.fill()
        }
      }

      // Depth-layer SQL text
      ctx!.font = '12px "JetBrains Mono", monospace'
      const textParallax = scrollY * 0.3
      for (let i = 0; i < SQL_FRAGMENTS.length; i++) {
        const x = (i * 317 + 100) % (w - 200)
        const baseY = i * 280 + 150
        const y = baseY - textParallax
        const screenY2 = ((y % (h + 400)) + h + 400) % (h + 400) - 200
        if (screenY2 > -50 && screenY2 < h + 50) {
          ctx!.fillStyle = 'rgba(0, 212, 170, 0.025)'
          ctx!.fillText(SQL_FRAGMENTS[i], x, screenY2)
        }
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}

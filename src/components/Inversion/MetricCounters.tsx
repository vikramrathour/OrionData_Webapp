import { useEffect, useRef, useState } from 'react'

interface Metric {
  value: string
  label: string
}

interface Props {
  metrics: Metric[]
  className?: string
}

function useCountUp(target: string, inView: boolean): string {
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (!inView) return

    // Extract number from string like "14 weeks" or "$2.4M" or "400"
    const match = target.match(/([\d.]+)/)
    if (!match) {
      setDisplay(target)
      return
    }

    const numTarget = parseFloat(match[1])
    const prefix = target.slice(0, target.indexOf(match[1]))
    const suffix = target.slice(target.indexOf(match[1]) + match[1].length)
    const isDecimal = match[1].includes('.')
    const duration = 1200
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = numTarget * eased

      if (isDecimal) {
        setDisplay(`${prefix}${current.toFixed(1)}${suffix}`)
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, target])

  return display
}

function Counter({ metric, inView }: { metric: Metric; inView: boolean }) {
  const display = useCountUp(metric.value, inView)
  return (
    <div className="text-center">
      <div className="font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">{display}</div>
      <div className="mt-1 text-xs text-[var(--text-muted)]">{metric.label}</div>
    </div>
  )
}

export default function MetricCounters({ metrics, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`flex items-start justify-around gap-4 ${className || ''}`}>
      {metrics.map((m) => (
        <Counter key={m.label} metric={m} inView={inView} />
      ))}
    </div>
  )
}

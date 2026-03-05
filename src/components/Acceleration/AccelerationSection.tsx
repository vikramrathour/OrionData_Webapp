import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { productivityGap } from './acceleration-data'
import CodeComparison from './CodeComparison'
import RootCauseExplorer from './RootCauseExplorer'
import AccelerationMath from './AccelerationMath'

function AnimatedCounter({
  target,
  decimals = 1,
  suffix = '%',
  duration = 1400,
}: {
  target: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, decimals, duration])

  return (
    <span ref={ref}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function AccelerationSection() {
  return (
    <section id="acceleration" className="relative bg-[var(--bg-primary)] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[2px] text-ai">
            The Acceleration
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--text-primary)] md:text-4xl lg:text-5xl">
            AI made web developers{' '}
            <span className="text-[#22c55e]">
              <AnimatedCounter target={productivityGap.webDev} />
            </span>{' '}
            more productive.
            <br className="hidden md:inline" />
            Data engineers?{' '}
            <span className="text-[#f87171]">
              <AnimatedCounter target={productivityGap.dataEng} duration={2200} />
            </span>
            <span className="text-[var(--text-muted)] text-2xl md:text-3xl"> Here's why — and how we fixed it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--text-secondary)]">
            The gap isn't the AI. The gap is the context. ORIAN.Data gives AI the semantic
            foundation it needs to generate data engineering code that's actually correct.
          </p>

          {/* Stat source */}
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            {productivityGap.source}
          </p>
        </motion.div>

        {/* Productivity gap visual */}
        <motion.div
          className="mb-20 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] text-center">
              AI Productivity Gain
            </p>
            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Web / App Development</span>
                  <span className="font-semibold text-[#22c55e]">{productivityGap.webDev}%</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#22c55e]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${productivityGap.webDev}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Data Engineering (without ORIAN.Data)</span>
                  <span className="font-semibold text-[#f87171]">{productivityGap.dataEng}%</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#f87171]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${productivityGap.dataEng}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium text-ai">Data Engineering (with ORIAN.Data)</span>
                  <span className="font-semibold text-ai">25-35%</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-ai"
                    initial={{ width: 0 }}
                    whileInView={{ width: '30%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Comparison */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              The Difference
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              Same AI assistant. Completely different output.
            </h3>
          </div>
          <CodeComparison />
        </motion.div>

        {/* Root Cause Explorer */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <RootCauseExplorer />
        </motion.div>

        {/* Acceleration Math */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">
              The Math
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold text-[var(--text-primary)] md:text-2xl">
              Calculate your acceleration
            </h3>
          </div>
          <div className="mx-auto max-w-3xl">
            <AccelerationMath />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

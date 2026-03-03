import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'inversion', label: 'Philosophy' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'proof', label: 'Industries' },
  { id: 'planner', label: 'Solution Planner' },
]

interface NavigationProps {
  activeSection: number
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(6,13,26,0.85)] backdrop-blur-xl border-b border-[rgba(0,212,170,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal to-foundation text-sm font-bold text-white">
              O
            </div>
            <span className="font-serif text-xl text-white">
              ORIAN<span className="text-teal">.</span>Data
            </span>
          </a>

          {/* Section links */}
          <div className="hidden items-center gap-8 md:flex">
            {SECTIONS.slice(2).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
              >
                {s.label}
              </a>
            ))}
            <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--text-muted)]">
              Xoriant
            </span>
          </div>
        </div>
      </nav>

      {/* Section indicator dots */}
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => { e.preventDefault(); document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeSection === i
                ? 'scale-125 bg-teal shadow-[0_0_8px_rgba(0,212,170,0.5)]'
                : 'bg-[var(--text-muted)] opacity-40 hover:opacity-70'
            }`}
            title={s.label}
            aria-label={`Navigate to ${s.label}`}
          />
        ))}
      </div>
    </>
  )
}

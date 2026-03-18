import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'inversion', label: 'Philosophy' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'proof', label: 'Industries' },
  { id: 'acceleration', label: 'AI Gap' },
  { id: 'maturity', label: 'Where Are You?' },
  { id: 'roi', label: 'ROI Calculator' },
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
            ? 'bg-[rgba(255,255,255,0.92)] backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo — links to xoriant.com per brand guidelines */}
          <a
            href="https://www.xoriant.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            aria-label="Xoriant homepage"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: '#14BB30' }}
            >
              X
            </div>
            <span className="font-serif text-xl font-bold text-[var(--text-primary)]">
              ORIAN<span style={{ color: '#14BB30' }}>.</span>Data
            </span>
          </a>

          {/* Section links + Contact Us CTA */}
          <div className="hidden items-center gap-6 md:flex">
            {SECTIONS.slice(2).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {s.label}
              </a>
            ))}
            <a
              href="https://www.xoriant.com/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: '#14BB30' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0fa328')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#14BB30')}
            >
              Contact Us
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
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
                ? 'scale-125 bg-teal shadow-[0_0_8px_rgba(20,187,48,0.4)]'
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

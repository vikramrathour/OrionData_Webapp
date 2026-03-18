import { useEffect, useState } from 'react'

type ConsentState = 'pending' | 'accepted' | 'rejected'

const STORAGE_KEY = 'xoriant_cookie_consent'

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [visible, setVisible] = useState(false)

  // On mount, read stored preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
      if (stored === 'accepted') fireAnalytics()
    } else {
      // Small delay so the banner doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function fireAnalytics() {
    if (typeof window.__initAnalytics === 'function') {
      window.__initAnalytics()
    }
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
    fireAnalytics()
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setConsent('rejected')
    setVisible(false)
  }

  if (!visible || consent !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] px-5 pb-5 md:px-10"
    >
      <div
        className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-4 rounded-xl p-5 shadow-xl md:flex-row md:items-center"
        style={{ backgroundColor: '#2D2A2B', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* Message */}
        <div className="flex-1">
          <p className="text-sm text-white">
            We use cookies to analyse site usage and improve your experience.{' '}
            <a
              href="https://www.xoriant.com/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors"
              style={{ color: '#14BB30' }}
            >
              Cookie Policy
            </a>{' '}
            ·{' '}
            <a
              href="https://www.xoriant.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors"
              style={{ color: '#14BB30' }}
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={reject}
            className="rounded-full border px-4 py-2 text-sm transition-colors hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#B4B0B1' }}
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#14BB30' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0fa328')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#14BB30')}
          >
            Accept All
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Extend Window type for the analytics init function
declare global {
  interface Window {
    __initAnalytics?: () => void
    __analyticsReady?: boolean
  }
}

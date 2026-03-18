export default function Footer() {
  const services = [
    { label: 'Digital Engineering', href: 'https://www.xoriant.com/digital-engineering-services' },
    { label: 'Cloud & Infrastructure', href: 'https://www.xoriant.com/cloud-infrastructure-services' },
    { label: 'Data & AI', href: 'https://www.xoriant.com/data-and-artificial-intelligence' },
    { label: 'Security & Privacy', href: 'https://www.xoriant.com/cyber-security-services' },
  ]

  const quickLinks = [
    { label: 'Industries', href: 'https://www.xoriant.com/industries' },
    { label: 'Company', href: 'https://www.xoriant.com/about-xoriant' },
    { label: 'Careers', href: 'https://www.xoriant.com/about-xoriant/careers' },
    { label: 'Contact Us', href: 'https://www.xoriant.com/contact-us' },
  ]

  const legal = [
    { label: 'Terms of Use', href: 'https://www.xoriant.com/terms-use' },
    { label: 'Cookie Policy', href: 'https://www.xoriant.com/cookie-policy' },
    { label: 'Privacy Policy', href: 'https://www.xoriant.com/privacy-policy' },
    { label: 'Sitemap', href: 'https://www.xoriant.com/sitemap' },
    { label: 'Ethics', href: 'https://www.xoriant.com/whistleblower-policy' },
  ]

  const social = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/xoriant',
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/xoriant_life/',
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/Xoriant',
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com/xoriant',
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/c/xoriant',
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ]

  const certifications = [
    { label: 'ISO 27001' },
    { label: 'PCI DSS' },
    { label: 'SOC 2' },
    { label: 'CDP Rated' },
  ]

  return (
    <footer role="contentinfo">
      {/* Green accent bar */}
      <div style={{ height: '4px', backgroundColor: '#14BB30' }} />

      {/* Main footer body */}
      <div style={{ backgroundColor: '#2D2A2B' }}>
        <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

            {/* Column 1 — Brand */}
            <div className="flex flex-col gap-4">
              <a href="https://www.xoriant.com" target="_blank" rel="noopener noreferrer" aria-label="Xoriant homepage">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded font-bold text-white"
                    style={{ backgroundColor: '#14BB30', fontSize: '18px' }}
                  >
                    X
                  </div>
                  <span className="text-xl font-bold tracking-wide text-white">XORIANT</span>
                </div>
              </a>
              <p style={{ color: '#B4B0B1' }} className="text-sm italic">Imagination Realized</p>
              <address className="not-italic text-sm" style={{ color: '#B4B0B1' }}>
                1248 Reamwood Avenue<br />
                Sunnyvale, CA 94089<br />
                <a href="tel:4087434400" className="hover:text-white transition-colors">408 743 4400</a>
              </address>

              {/* Social icons */}
              <div className="flex gap-3 pt-1">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="transition-colors hover:text-white"
                    style={{ color: '#B4B0B1' }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Services */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
                Services
              </h4>
              <ul className="flex flex-col gap-2">
                {services.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#B4B0B1' }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: '#B4B0B1' }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications row */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="text-xs uppercase tracking-widest" style={{ color: '#B4B0B1' }}>Certified:</span>
            {certifications.map((c) => (
              <span
                key={c.label}
                className="rounded border px-3 py-1 text-xs font-medium"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#B4B0B1' }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Legal bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-5 py-5 text-xs md:flex-row md:px-10 lg:px-20" style={{ color: '#B4B0B1' }}>
            <p>© 2026 Xoriant Corporation. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4">
              {legal.map((l, i) => (
                <span key={l.label} className="flex items-center gap-4">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                    style={{ color: '#B4B0B1' }}
                  >
                    {l.label}
                  </a>
                  {i < legal.length - 1 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface ButtonProps {
  variant: 'primary' | 'secondary'
  href: string
  children: React.ReactNode
}

export default function Button({ variant, href, children }: ButtonProps) {
  const base =
    'inline-block rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200'

  const styles =
    variant === 'primary'
      ? 'bg-teal text-[var(--bg-deep)] hover:brightness-110 hover:shadow-lg hover:shadow-teal/25 hover:-translate-y-0.5'
      : 'border border-white/20 text-white hover:border-teal hover:text-teal'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={`${base} ${styles}`}>
      {children}
    </a>
  )
}

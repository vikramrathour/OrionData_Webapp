const INDUSTRIES = [
  { id: 'bfsi', label: 'BFSI', ontology: 'BIAN', color: '#3b82f6' },
  { id: 'healthcare', label: 'Healthcare & Life Sciences', ontology: 'HL7/FHIR', color: '#00b23b' },
  { id: 'manufacturing', label: 'Manufacturing', ontology: 'RAMI 4.0', color: '#f5a623' },
  { id: 'technology', label: 'Technology', ontology: '', color: '#a78bfa' },
  { id: 'retail', label: 'Retail', ontology: '', color: '#f472b6' },
]

interface Props {
  active: string
  onChange: (id: string) => void
  counts: Record<string, number>
}

export default function IndustrySelector({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {INDUSTRIES.map((ind) => {
        const isActive = active === ind.id
        return (
          <button
            key={ind.id}
            onClick={() => onChange(ind.id)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
            style={isActive ? {
              backgroundColor: `${ind.color}15`,
              boxShadow: `0 0 20px ${ind.color}20`,
              border: `1px solid ${ind.color}30`,
            } : {
              border: '1px solid transparent',
            }}
          >
            <span>{ind.label}</span>
            <span className="text-xs opacity-60">({counts[ind.id] || 0})</span>
            {isActive && ind.ontology && (
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                style={{ backgroundColor: `${ind.color}20`, color: ind.color }}
              >
                Powered by {ind.ontology}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

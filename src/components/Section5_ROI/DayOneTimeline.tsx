import { motion } from 'framer-motion'

const TIERS = [
  {
    label: 'DAY 1',
    sublabel: 'No security clearance needed',
    color: '#22c55e',
    items: [
      { icon: '📐', name: 'Specs & Frameworks', desc: 'Architecture blueprints in your Git repo' },
      { icon: '🧠', name: 'Prompts & Skills', desc: 'Your engineers using ORIAN patterns in AI assistants today' },
      { icon: '📋', name: 'Standards & Best Practices', desc: 'ISO 25012 checklists, regulatory compliance frameworks' },
    ],
  },
  {
    label: 'WEEK 2-4',
    sublabel: 'Minimal clearance',
    color: '#f5a623',
    items: [
      { icon: '💻', name: 'Code Libraries', desc: 'DQ validators, migration scripts, ontology models' },
    ],
  },
  {
    label: 'MONTH 2+',
    sublabel: 'Full platform clearance',
    color: '#3b82f6',
    items: [
      { icon: '⚡', name: 'ORIAN.Data Platform', desc: 'Polymorphic AI agent, full automation, continuous learning' },
    ],
  },
]

export default function DayOneTimeline() {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--text-muted)]">
        The Day 1 Difference
      </h3>
      <div className="frosted-glass rounded-xl p-5">
        {TIERS.map((tier, ti) => (
          <motion.div
            key={tier.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ti * 0.15, duration: 0.4 }}
          >
            {/* Tier header */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-[var(--border-subtle)]" />
              <span className="font-mono text-[10px] font-bold tracking-wider" style={{ color: tier.color }}>
                {tier.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{tier.sublabel}</span>
              <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            </div>

            {/* Items */}
            <div className="ml-4 border-l-2 border-[var(--border-subtle)] pl-4">
              {tier.items.map((item, ii) => (
                <div key={item.name} className={`flex items-start gap-3 py-2.5 ${ii < tier.items.length - 1 ? '' : ti < TIERS.length - 1 ? 'mb-2' : ''}`}>
                  <div
                    className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                  <div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.icon} {item.name}</span>
                    <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Field note */}
        <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
          <p className="font-serif text-sm italic text-[var(--accent-amber)]">
            "We built five delivery channels because we've watched too many accelerators die in security review. The best tool in the world is worthless if it arrives after the engagement is half over."
          </p>
        </div>
      </div>
    </div>
  )
}

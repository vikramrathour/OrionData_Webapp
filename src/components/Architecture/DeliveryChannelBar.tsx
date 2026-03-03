import type { DeliveryChannel } from '../../hooks/useGraphData'

interface Props {
  channels: DeliveryChannel[]
  activeChannels: Set<string>
  onToggle: (channelId: string) => void
  visibleCount: number
  totalCount: number
}

export default function DeliveryChannelBar({
  channels,
  activeChannels,
  onToggle,
  visibleCount,
  totalCount,
}: Props) {
  const allActive = activeChannels.size === 0

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 backdrop-blur-xl">
      <button
        onClick={() => {
          // Clear all filters (show all)
          channels.forEach((c) => {
            if (activeChannels.has(c.id)) onToggle(c.id)
          })
        }}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
          allActive
            ? 'bg-teal/20 text-teal'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        All ({totalCount})
      </button>

      {channels.map((ch) => {
        const isActive = activeChannels.has(ch.id)
        const isDayOne = ch.securityClearance === 'none'
        return (
          <button
            key={ch.id}
            onClick={() => onToggle(ch.id)}
            className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isActive
                ? 'bg-teal/20 text-teal'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{ch.icon}</span>
            <span>{ch.name}</span>
            {isDayOne && isActive && (
              <span className="ml-1 rounded-full bg-trust/20 px-1.5 py-0.5 text-[9px] font-semibold text-trust">
                Day 1
              </span>
            )}
          </button>
        )
      })}

      {!allActive && (
        <span className="text-[11px] text-[var(--text-secondary)]">
          {visibleCount} of {totalCount} components
        </span>
      )}
    </div>
  )
}

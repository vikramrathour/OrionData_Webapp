import { motion } from 'framer-motion'

interface Props {
  components: string[]
  color: string
  edges: [number, number][]
  isNorthStar?: boolean
}

// Predefined positions for up to 6 nodes in a constellation layout
const NODE_POSITIONS: [number, number][] = [
  [80, 40],
  [160, 70],
  [50, 120],
  [140, 140],
  [100, 90],
  [190, 110],
]

export default function MiniConstellation({ components, color, edges, isNorthStar }: Props) {
  const nodes = components.slice(0, 6)

  return (
    <svg
      viewBox="0 0 240 180"
      className="h-full w-full"
      style={{ maxHeight: 180 }}
    >
      {/* Edges */}
      {edges.map(([from, to], i) => {
        const [x1, y1] = NODE_POSITIONS[from] || [0, 0]
        const [x2, y2] = NODE_POSITIONS[to] || [0, 0]
        return (
          <motion.line
            key={`edge-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeOpacity={0.3}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((label, i) => {
        const [cx, cy] = NODE_POSITIONS[i]
        return (
          <motion.g
            key={label}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.15 * i,
            }}
            style={{ originX: `${cx}px`, originY: `${cy}px` }}
          >
            {/* Ambient pulse for north star */}
            {isNorthStar && (
              <circle
                cx={cx}
                cy={cy}
                r={16}
                fill={color}
                opacity={0.15}
                className="animate-pulse"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={8}
              fill={color}
              fillOpacity={0.15}
              stroke={color}
              strokeWidth={1.5}
            />
            <circle cx={cx} cy={cy} r={3} fill={color} />
            <text
              x={cx}
              y={cy + 20}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize={9}
              fontFamily="Roboto, sans-serif"
            >
              {label}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

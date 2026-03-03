import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface ValueLeverBarProps {
  label: string;
  amount: number;
  color: string;
  maxAmount: number;
  startFrame: number;
  index: number;
}

export const ValueLeverBar: React.FC<ValueLeverBarProps> = ({
  label,
  amount,
  color,
  maxAmount,
  startFrame,
  index,
}) => {
  const frame = useCurrentFrame();
  const delay = startFrame + index * 8;
  const widthPct = interpolate(
    frame,
    [delay, delay + 30],
    [0, (amount / maxAmount) * 100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const countUp = interpolate(frame, [delay, delay + 30], [0, amount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 15,
        }}
      >
        <span style={{ color: COLORS.TEXT_PRIMARY, fontWeight: 500 }}>{label}</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            color,
          }}
        >
          ${Math.round(countUp / 1000)}K
        </span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 5,
          background: COLORS.BG_SURFACE,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${widthPct}%`,
            height: '100%',
            borderRadius: 5,
            background: color,
          }}
        />
      </div>
    </div>
  );
};

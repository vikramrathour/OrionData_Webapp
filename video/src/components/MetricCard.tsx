import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS } from '../constants';
import { cardStyle } from '../styles';

interface MetricCardProps {
  value: string;
  label: string;
  delay: number;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  delay,
  color = COLORS.GREEN,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, delay, config: { damping: 12 } });
  const opacity = interpolate(scale, [0, 1], [0, 1]);

  return (
    <div
      style={{
        ...cardStyle,
        opacity,
        transform: `scale(${scale})`,
        textAlign: 'center',
        minWidth: 220,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          color,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 18, color: COLORS.TEXT_SECONDARY }}>{label}</div>
    </div>
  );
};

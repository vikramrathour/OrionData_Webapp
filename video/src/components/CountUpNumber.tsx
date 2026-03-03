import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface CountUpNumberProps {
  value: number;
  startFrame: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  startFrame,
  duration = 45,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const current = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, value],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const formatted = decimals > 0
    ? current.toFixed(decimals)
    : Math.round(current).toLocaleString();

  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        color: COLORS.TEXT_PRIMARY,
        opacity,
        ...style,
      }}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
};

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface LogoProps {
  startFrame?: number;
  fadeInDuration?: number;
  size?: 'small' | 'large';
}

export const Logo: React.FC<LogoProps> = ({
  startFrame = 0,
  fadeInDuration = 20,
  size = 'large',
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeInDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fontSize = size === 'large' ? 42 : 28;

  return (
    <div style={{ opacity, textAlign: 'center' }}>
      <div
        style={{
          fontSize: fontSize * 0.6,
          fontWeight: 300,
          color: COLORS.TEXT_SECONDARY,
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Xoriant
      </div>
      <div
        style={{
          fontSize,
          fontWeight: 700,
          color: COLORS.TEXT_PRIMARY,
        }}
      >
        ORIAN
        <span style={{ color: COLORS.GREEN }}>.</span>
        Data
      </div>
    </div>
  );
};

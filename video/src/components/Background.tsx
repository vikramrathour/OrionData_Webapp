import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../constants';

export const Background: React.FC<{
  color?: string;
  showGrid?: boolean;
  showParticles?: boolean;
}> = ({
  color = COLORS.BG_WHITE,
  showGrid = true,
  showParticles = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color,
        overflow: 'hidden',
      }}
    >
      {showGrid && (
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.04 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 54}
              x2="1920"
              y2={i * 54}
              stroke={COLORS.TEXT_MUTED}
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 36 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 54}
              y1="0"
              x2={i * 54}
              y2="1080"
              stroke={COLORS.TEXT_MUTED}
              strokeWidth="1"
            />
          ))}
        </svg>
      )}
      {showParticles &&
        Array.from({ length: 12 }, (_, i) => {
          const x = (i * 173 + frame * (0.3 + i * 0.05)) % 1920;
          const y = (i * 97 + Math.sin(frame * 0.02 + i) * 40 + 540) % 1080;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: COLORS.GREEN,
                opacity: 0.15,
              }}
            />
          );
        })}
    </div>
  );
};

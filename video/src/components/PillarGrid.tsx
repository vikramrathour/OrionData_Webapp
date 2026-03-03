import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ARCHITECTURE_CONTENT, COLORS } from '../constants';

export const PillarGrid: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = frame - startFrame;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 24,
        width: 1400,
        height: 560,
      }}
    >
      {ARCHITECTURE_CONTENT.pillars.map((pillar, pi) => {
        const pillarDelay = pi * 12;
        const pillarOpacity = interpolate(
          elapsed,
          [pillarDelay, pillarDelay + 15],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={pillar.name}
            style={{
              background: COLORS.BG_LIGHT,
              borderRadius: 16,
              padding: '24px 28px',
              border: `2px solid ${pillar.color}20`,
              opacity: pillarOpacity,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: pillar.color,
                marginBottom: 16,
              }}
            >
              {pillar.name}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {pillar.components.map((comp, ci) => {
                const compDelay = pillarDelay + 15 + ci * 8;
                const s = spring({
                  frame: Math.max(0, elapsed),
                  fps,
                  delay: compDelay,
                  config: { damping: 12 },
                });
                return (
                  <div
                    key={comp}
                    style={{
                      background: `${pillar.color}15`,
                      border: `1px solid ${pillar.color}40`,
                      borderRadius: 8,
                      padding: '10px 16px',
                      fontSize: 15,
                      fontWeight: 500,
                      color: COLORS.TEXT_PRIMARY,
                      opacity: interpolate(s, [0, 1], [0, 1]),
                      transform: `scale(${s})`,
                    }}
                  >
                    {comp}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

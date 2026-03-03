import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface TimelineStagesProps {
  stages: string[];
  startFrame: number;
  color: string;
  label: string;
  direction?: 'ltr' | 'rtl';
}

export const TimelineStages: React.FC<TimelineStagesProps> = ({
  stages,
  startFrame,
  color,
  label,
  direction = 'ltr',
}) => {
  const frame = useCurrentFrame();
  const items = direction === 'rtl' ? [...stages].reverse() : stages;

  return (
    <div style={{ width: 800 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color,
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {items.map((stage, i) => {
          const delay = startFrame + i * 8;
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const translateX = interpolate(
            frame,
            [delay, delay + 10],
            [direction === 'ltr' ? -30 : 30, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <React.Fragment key={stage}>
              {i > 0 && (
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: `${color}40`,
                    opacity,
                  }}
                />
              )}
              <div
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontSize: 14,
                  fontWeight: 500,
                  color: COLORS.TEXT_PRIMARY,
                  whiteSpace: 'nowrap',
                  opacity,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {stage}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

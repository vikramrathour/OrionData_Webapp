import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { COLORS, ARCHITECTURE_CONTENT } from '../constants';
import { fullScreen, eyebrowStyle, headlineStyle } from '../styles';
import { Background } from '../components/Background';
import { FadeInText } from '../components/AnimatedText';
import { PillarGrid } from '../components/PillarGrid';

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background color={COLORS.BG_WHITE} showGrid />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + Headline: 0–150 frames (1:10–1:15) */}
        <FadeInText startFrame={0} style={{ position: 'absolute', top: 50 }}>
          <div style={eyebrowStyle}>{ARCHITECTURE_CONTENT.eyebrow}</div>
        </FadeInText>
        <FadeInText startFrame={15} style={{ position: 'absolute', top: 90 }}>
          <div style={{ ...headlineStyle, fontSize: 40 }}>
            {ARCHITECTURE_CONTENT.headline}
          </div>
        </FadeInText>

        {/* 4-quadrant grid: 150–750 frames (1:15–1:35) */}
        <div style={{ position: 'absolute', top: 180 }}>
          <PillarGrid startFrame={150} />
        </div>

        {/* Connection lines: 750–960 frames (1:35–1:42) */}
        <svg
          width="1400"
          height="560"
          style={{
            position: 'absolute',
            top: 180,
            pointerEvents: 'none',
            opacity: interpolate(frame, [750, 780], [0, 0.3], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {/* Cross-pillar connections */}
          <line x1="680" y1="140" x2="720" y2="140" stroke={COLORS.GREEN} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="680" y1="420" x2="720" y2="420" stroke={COLORS.PURPLE} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="350" y1="270" x2="350" y2="290" stroke={COLORS.BLUE} strokeWidth="2" strokeDasharray="4 4" />
          <line x1="1050" y1="270" x2="1050" y2="290" stroke={COLORS.AMBER} strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Channel badges: 960–1200 frames (1:42–1:50) */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {ARCHITECTURE_CONTENT.channels.map((ch, i) => {
            const s = spring({
              frame,
              fps,
              delay: 960 + i * 12,
              config: { damping: 12 },
            });
            return (
              <div
                key={ch}
                style={{
                  background: COLORS.BG_LIGHT,
                  border: `1px solid ${COLORS.BG_SURFACE}`,
                  borderRadius: 20,
                  padding: '8px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.TEXT_PRIMARY,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
                }}
              >
                {ch}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

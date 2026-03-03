import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { COLORS, ROI_CONTENT } from '../constants';
import { fullScreen, eyebrowStyle, headlineStyle } from '../styles';
import { Background } from '../components/Background';
import { FadeInText } from '../components/AnimatedText';
import { MetricCard } from '../components/MetricCard';
import { ValueLeverBar } from '../components/ValueLeverBar';

export const ROIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxAmount = Math.max(...ROI_CONTENT.levers.map((l) => l.amount));

  return (
    <AbsoluteFill>
      <Background color={COLORS.BG_WHITE} showGrid />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + Headline: 0–150 frames (2:20–2:25) */}
        <FadeInText startFrame={0} style={{ position: 'absolute', top: 50 }}>
          <div style={eyebrowStyle}>{ROI_CONTENT.eyebrow}</div>
        </FadeInText>
        <FadeInText startFrame={15} style={{ position: 'absolute', top: 90 }}>
          <div style={{ ...headlineStyle, fontSize: 40 }}>
            {ROI_CONTENT.headline}
          </div>
        </FadeInText>

        {/* Top metric cards: 150–450 frames (2:25–2:35) */}
        <div
          style={{
            position: 'absolute',
            top: 190,
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {ROI_CONTENT.topMetrics.map((m, i) => (
            <MetricCard
              key={m.label}
              value={m.value}
              label={m.label}
              delay={150 + i * 20}
              color={COLORS.GREEN}
            />
          ))}
        </div>

        {/* Value lever bars: 450–660 frames (2:35–2:42) */}
        <div
          style={{
            position: 'absolute',
            top: 400,
            left: 260,
            width: 700,
          }}
        >
          {ROI_CONTENT.levers.map((lever, i) => (
            <ValueLeverBar
              key={lever.label}
              label={lever.label}
              amount={lever.amount}
              color={lever.color}
              maxAmount={maxAmount}
              startFrame={450}
              index={i}
            />
          ))}
        </div>

        {/* 3-year compounding: 660–900 frames (2:42–2:50) */}
        <div
          style={{
            position: 'absolute',
            right: 120,
            top: 400,
            display: 'flex',
            gap: 24,
            alignItems: 'flex-end',
          }}
        >
          {ROI_CONTENT.years.map((yr, i) => {
            const s = spring({
              frame,
              fps,
              delay: 660 + i * 25,
              config: { damping: 12 },
            });
            const height = interpolate(s, [0, 1], [0, 120 + i * 80]);
            return (
              <div
                key={yr.year}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: interpolate(s, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.GREEN,
                    marginBottom: 8,
                  }}
                >
                  {yr.value}
                </div>
                <div
                  style={{
                    width: 100,
                    height,
                    borderRadius: 8,
                    background: `linear-gradient(to top, ${COLORS.GREEN}, ${COLORS.GREEN}80)`,
                  }}
                />
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: COLORS.TEXT_SECONDARY,
                    marginTop: 8,
                  }}
                >
                  {yr.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: COLORS.TEXT_MUTED,
                  }}
                >
                  Year {yr.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

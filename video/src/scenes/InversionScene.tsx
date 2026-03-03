import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { COLORS, INVERSION_CONTENT } from '../constants';
import { fullScreen, eyebrowStyle, headlineStyle } from '../styles';
import { Background } from '../components/Background';
import { FadeInText } from '../components/AnimatedText';
import { TimelineStages } from '../components/TimelineStages';
import { CountUpNumber } from '../components/CountUpNumber';

export const InversionScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background color={COLORS.BG_WHITE} showGrid />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + Headline: 0–150 frames (0:30–0:35) */}
        <FadeInText startFrame={0} style={{ position: 'absolute', top: 60 }}>
          <div style={eyebrowStyle}>{INVERSION_CONTENT.eyebrow}</div>
        </FadeInText>
        <FadeInText startFrame={15} style={{ position: 'absolute', top: 100 }}>
          <div style={{ ...headlineStyle, fontSize: 48 }}>
            {INVERSION_CONTENT.headline}
          </div>
        </FadeInText>

        {/* Split screen timelines: 150–600 frames (0:35–0:50) */}
        <div style={{ position: 'absolute', top: 240, left: 80 }}>
          <TimelineStages
            stages={INVERSION_CONTENT.oldWay}
            startFrame={150}
            color={COLORS.TEXT_MUTED}
            label="The Old Way"
            direction="ltr"
          />
        </div>
        <div style={{ position: 'absolute', top: 380, left: 80 }}>
          <TimelineStages
            stages={INVERSION_CONTENT.newWay}
            startFrame={200}
            color={COLORS.GREEN}
            label="The ORIAN Way"
            direction="rtl"
          />
        </div>

        {/* Metrics count up: 600–900 frames (0:50–1:00) */}
        <div
          style={{
            position: 'absolute',
            top: 560,
            display: 'flex',
            gap: 80,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {INVERSION_CONTENT.metrics.map((m, i) => {
            const startF = 600 + i * 20;
            const opacity = interpolate(frame, [startF, startF + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={m.label} style={{ textAlign: 'center', opacity }}>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.GREEN,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: 18, color: COLORS.TEXT_SECONDARY, marginTop: 8 }}>
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote: 900–1200 frames (1:00–1:10) */}
        <FadeInText startFrame={900} style={{ position: 'absolute', top: 780, maxWidth: 900, textAlign: 'center' }}>
          <div
            style={{
              fontSize: 22,
              fontStyle: 'italic',
              color: COLORS.TEXT_SECONDARY,
              lineHeight: 1.6,
              borderLeft: `3px solid ${COLORS.GREEN}`,
              paddingLeft: 24,
              textAlign: 'left',
            }}
          >
            "{INVERSION_CONTENT.quote}"
          </div>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

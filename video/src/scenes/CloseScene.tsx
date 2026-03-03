import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { COLORS, CLOSE_CONTENT } from '../constants';
import { fullScreen, eyebrowStyle, headlineStyle, cardStyle } from '../styles';
import { Background } from '../components/Background';
import { FadeInText } from '../components/AnimatedText';
import { Logo } from '../components/Logo';

export const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background color={COLORS.BG_WHITE} showGrid showParticles />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + Headline: 0–90 frames (2:50–2:53) */}
        <FadeInText startFrame={0} style={{ position: 'absolute', top: 180 }}>
          <div style={{ ...eyebrowStyle, fontSize: 18 }}>{CLOSE_CONTENT.eyebrow}</div>
        </FadeInText>
        <FadeInText startFrame={15} style={{ position: 'absolute', top: 230 }}>
          <div style={{ ...headlineStyle, fontSize: 48 }}>
            {CLOSE_CONTENT.headline}
          </div>
        </FadeInText>

        {/* Engagement cards: 90–210 frames (2:53–2:57) */}
        <div
          style={{
            position: 'absolute',
            top: 400,
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {CLOSE_CONTENT.engagements.map((eng, i) => {
            const s = spring({
              frame,
              fps,
              delay: 90 + i * 15,
              config: { damping: 12 },
            });
            return (
              <div
                key={eng.name}
                style={{
                  ...cardStyle,
                  textAlign: 'center',
                  minWidth: 260,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(s, [0, 1], [40 * (i - 1), 0])}px) scale(${s})`,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.TEXT_PRIMARY,
                    marginBottom: 8,
                  }}
                >
                  {eng.name}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.GREEN,
                    fontWeight: 600,
                  }}
                >
                  {eng.duration}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logo + URL: 210–300 frames (2:57–3:00) */}
        <div style={{ position: 'absolute', bottom: 120 }}>
          <Logo startFrame={210} fadeInDuration={20} size="large" />
          <FadeInText startFrame={240} style={{ textAlign: 'center', marginTop: 16 }}>
            <div
              style={{
                fontSize: 20,
                fontFamily: "'JetBrains Mono', monospace",
                color: COLORS.GREEN,
                fontWeight: 500,
              }}
            >
              {CLOSE_CONTENT.url}
            </div>
          </FadeInText>
        </div>
      </div>
    </AbsoluteFill>
  );
};

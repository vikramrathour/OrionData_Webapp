import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { COLORS, PROOF_CONTENT } from '../constants';
import { fullScreen, eyebrowStyle, headlineStyle, cardStyle } from '../styles';
import { Background } from '../components/Background';
import { FadeInText } from '../components/AnimatedText';
import { CountUpNumber } from '../components/CountUpNumber';

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Industry tab cycling: 150–450 frames (1:55–2:05), 2s = 60 frames each
  const industryIndex = Math.min(
    Math.floor(Math.max(0, frame - 150) / 60),
    PROOF_CONTENT.industries.length - 1
  );

  return (
    <AbsoluteFill>
      <Background color={COLORS.BG_WHITE} showGrid />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow + Headline: 0–150 frames (1:50–1:55) */}
        <FadeInText startFrame={0} style={{ position: 'absolute', top: 60 }}>
          <div style={eyebrowStyle}>{PROOF_CONTENT.eyebrow}</div>
        </FadeInText>
        <FadeInText startFrame={15} style={{ position: 'absolute', top: 100 }}>
          <div style={{ ...headlineStyle, fontSize: 40 }}>
            {PROOF_CONTENT.headline}
          </div>
        </FadeInText>

        {/* Industry tabs: 150–450 frames */}
        <div
          style={{
            position: 'absolute',
            top: 220,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {PROOF_CONTENT.industries.map((ind, i) => {
            const isActive = i === industryIndex;
            const tabOpacity = interpolate(frame, [150, 165], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={ind}
                style={{
                  padding: '10px 28px',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? COLORS.GREEN : COLORS.BG_LIGHT,
                  color: isActive ? '#ffffff' : COLORS.TEXT_SECONDARY,
                  opacity: tabOpacity,
                  transition: 'all 0.3s',
                }}
              >
                {ind}
              </div>
            );
          })}
        </div>

        {/* Stats bar: 450–660 frames (2:05–2:12) */}
        <div
          style={{
            position: 'absolute',
            top: 340,
            display: 'flex',
            gap: 48,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {PROOF_CONTENT.stats.map((stat, i) => {
            const startF = 450 + i * 15;
            const opacity = interpolate(frame, [startF, startF + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={stat.label} style={{ textAlign: 'center', opacity }}>
                <div style={{ fontSize: 44, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: COLORS.GREEN }}>
                  <CountUpNumber
                    value={stat.value}
                    startFrame={startF}
                    duration={40}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 2 : 0}
                    style={{ fontSize: 44, color: COLORS.GREEN }}
                  />
                </div>
                <div style={{ fontSize: 16, color: COLORS.TEXT_SECONDARY, marginTop: 8 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Field note: 660–810 frames (2:12–2:17) */}
        <FadeInText startFrame={660} style={{ position: 'absolute', top: 540, maxWidth: 900, textAlign: 'center' }}>
          <div
            style={{
              ...cardStyle,
              fontSize: 20,
              fontStyle: 'italic',
              color: COLORS.TEXT_SECONDARY,
              lineHeight: 1.6,
              borderLeft: `3px solid ${COLORS.AMBER}`,
            }}
          >
            "{PROOF_CONTENT.fieldNote}"
          </div>
        </FadeInText>

        {/* Closing: 810–900 frames (2:17–2:20) */}
        <FadeInText startFrame={810} style={{ position: 'absolute', top: 720 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.TEXT_PRIMARY,
            }}
          >
            {PROOF_CONTENT.closing}
          </div>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

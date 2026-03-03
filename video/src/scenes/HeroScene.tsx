import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { COLORS, HERO_CONTENT, FPS } from '../constants';
import { fullScreen } from '../styles';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { Typewriter, FadeInText } from '../components/AnimatedText';

const PhasePill: React.FC = () => {
  const frame = useCurrentFrame();
  // Phase 0: frames 90–150, Phase 1: 150–210, Phase 2: 210–240
  const phases = HERO_CONTENT.phases;
  let phaseIndex = 0;
  if (frame >= 210) phaseIndex = 2;
  else if (frame >= 150) phaseIndex = 1;

  const opacity = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isResolved = phaseIndex === 2;

  return (
    <div
      style={{
        opacity,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: isResolved ? `${COLORS.GREEN}15` : COLORS.BG_LIGHT,
        border: `1px solid ${isResolved ? COLORS.GREEN : COLORS.BG_SURFACE}`,
        borderRadius: 24,
        padding: '8px 20px',
        fontSize: 15,
        fontWeight: 500,
        color: isResolved ? COLORS.GREEN : COLORS.TEXT_SECONDARY,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isResolved ? COLORS.GREEN : COLORS.TEXT_MUTED,
        }}
      />
      {phases[phaseIndex]}
    </div>
  );
};

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background showGrid showParticles />
      <div style={{ ...fullScreen, position: 'relative', zIndex: 1 }}>
        {/* Logo: 0:00–0:03 (frames 0–90) */}
        <Sequence from={0} durationInFrames={900}>
          <div style={{ position: 'absolute', top: 120 }}>
            <Logo startFrame={0} fadeInDuration={30} />
          </div>
        </Sequence>

        {/* Phase pill: 0:03–0:08 */}
        <Sequence from={90} durationInFrames={810}>
          <div style={{ position: 'absolute', top: 300 }}>
            <PhasePill />
          </div>
        </Sequence>

        {/* Headline typewriter: 0:08–0:20 */}
        <div
          style={{
            position: 'absolute',
            top: 380,
            textAlign: 'center',
            maxWidth: 1100,
          }}
        >
          {HERO_CONTENT.headline.map((line, i) => {
            const lineStart = 240 + i * 90; // ~3s per line
            const isGreen = i === 1;
            return (
              <div
                key={i}
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: isGreen ? COLORS.GREEN : COLORS.TEXT_PRIMARY,
                }}
              >
                <Typewriter text={line} startFrame={lineStart} framesPerChar={3} />
              </div>
            );
          })}
        </div>

        {/* Description: 0:20–0:25 */}
        <FadeInText startFrame={600} style={{ position: 'absolute', top: 640, maxWidth: 800, textAlign: 'center' }}>
          <p style={{ fontSize: 20, color: COLORS.TEXT_SECONDARY, lineHeight: 1.6 }}>
            {HERO_CONTENT.description}
          </p>
        </FadeInText>

        {/* Tagline: 0:25–0:30 */}
        <FadeInText startFrame={750} style={{ position: 'absolute', top: 780 }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontStyle: 'italic',
              color: COLORS.TEXT_SECONDARY,
            }}
          >
            {HERO_CONTENT.tagline}
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

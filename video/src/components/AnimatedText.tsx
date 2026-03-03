import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface TypewriterProps {
  text: string;
  startFrame: number;
  framesPerChar?: number;
  style?: React.CSSProperties;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  startFrame,
  framesPerChar = 2,
  style,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  if (elapsed < 0) return null;
  const charsToShow = Math.min(Math.floor(elapsed / framesPerChar), text.length);
  return <span style={style}>{text.slice(0, charsToShow)}</span>;
};

interface FadeInTextProps {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const FadeInText: React.FC<FadeInTextProps> = ({
  children,
  startFrame,
  duration = 20,
  style,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [startFrame, startFrame + duration], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{ ...style, opacity, transform: `translateY(${translateY}px)` }}>
      {children}
    </div>
  );
};

interface SpringInProps {
  children: React.ReactNode;
  delay: number;
  style?: React.CSSProperties;
}

export const SpringIn: React.FC<SpringInProps> = ({ children, delay, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, delay, config: { damping: 12, stiffness: 100 } });
  const opacity = interpolate(scale, [0, 1], [0, 1]);
  return (
    <div style={{ ...style, opacity, transform: `scale(${scale})` }}>
      {children}
    </div>
  );
};

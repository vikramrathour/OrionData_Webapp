import { CSSProperties } from 'react';
import { COLORS } from './constants';

export const fullScreen: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif',
  color: COLORS.TEXT_PRIMARY,
  backgroundColor: COLORS.BG_WHITE,
  overflow: 'hidden',
};

export const eyebrowStyle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: 4,
  textTransform: 'uppercase',
  color: COLORS.GREEN,
  marginBottom: 16,
};

export const headlineStyle: CSSProperties = {
  fontSize: 56,
  fontWeight: 700,
  lineHeight: 1.15,
  textAlign: 'center',
  color: COLORS.TEXT_PRIMARY,
  maxWidth: 1200,
};

export const subheadStyle: CSSProperties = {
  fontSize: 24,
  fontWeight: 400,
  lineHeight: 1.5,
  textAlign: 'center',
  color: COLORS.TEXT_SECONDARY,
  maxWidth: 800,
  marginTop: 24,
};

export const cardStyle: CSSProperties = {
  background: COLORS.BG_LIGHT,
  borderRadius: 16,
  padding: '32px 40px',
  border: `1px solid ${COLORS.BG_SURFACE}`,
};

export const monoFont: CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
};

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        'bg-deep': '#060d1a',
        'bg-primary': '#0a1628',
        'bg-surface': '#0f1e37',
        foundation: '#3b82f6',
        semantic: '#00d4aa',
        ai: '#a78bfa',
        trust: '#f5a623',
        teal: '#00d4aa',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config

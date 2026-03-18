import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1a1a1a',
        'bg-deep': '#ffffff',
        'bg-primary': '#f8f9fa',
        'bg-surface': '#f1f3f5',
        foundation: '#3b82f6',
        semantic: '#14BB30',
        ai: '#a78bfa',
        trust: '#f5a623',
        teal: '#14BB30',
      },
      fontFamily: {
        serif: ['Roboto', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config

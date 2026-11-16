import type { Config } from 'tailwindcss';

// Tailwind v3 tokens → brand CSS variables. Vars hold plain hex, so no
// <alpha-value> wrapping is needed; translucent tints use color-mix() classes
// in globals.css instead of `/NN` modifiers on these colours.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        'primary-deep': 'var(--brand-primary-deep)',
        'primary-tint': 'var(--brand-primary-tint)',
        'primary-contrast': 'var(--brand-primary-contrast)',
        spark: 'var(--brand-spark)',
        ink: 'var(--brand-ink)',
        paper: 'var(--brand-paper)',
        background: 'var(--brand-bg)',
        surface: 'var(--brand-surface)',
        foreground: 'var(--brand-text)',
        muted: 'var(--brand-text-muted)',
        border: 'var(--brand-border)',
        'on-ink': 'var(--on-ink)',
        'on-ink-muted': 'var(--on-ink-muted)',
      },
      borderRadius: {
        sm: 'var(--brand-radius-sm)',
        md: 'var(--brand-radius-md)',
        lg: 'var(--brand-radius-lg)',
        xl: 'var(--brand-radius-xl)',
        full: '999px',
      },
      fontFamily: {
        heading: ['var(--brand-heading-font)'],
        body: ['var(--brand-body-font)'],
        mono: ['var(--brand-mono-font)'],
      },
      maxWidth: { container: '74rem' },
    },
  },
  plugins: [],
} satisfies Config;

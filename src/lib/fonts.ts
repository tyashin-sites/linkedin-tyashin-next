import localFont from 'next/font/local';

// Self-hosted via next/font/local — no build-time dependency on
// fonts.googleapis.com. All faces are OFL (fontsource builds, latin subset).
//   Display — Instrument Serif 400 (+ italic for the emphasised word)
//   Body/UI — Figtree variable 400–600
//   Data    — JetBrains Mono variable 400–500 (prices, mock UI labels)

export const displayFont = localFont({
  src: [
    { path: '../fonts/instrument-serif-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

export const bodyFont = localFont({
  src: [{ path: '../fonts/figtree-latin.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const monoFont = localFont({
  src: [{ path: '../fonts/jetbrains-latin.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'monospace'],
});

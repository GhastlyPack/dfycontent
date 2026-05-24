// Design tokens — TaskGo-inspired direction (light, indigo, navy, soft).
// Mobile-first; values here are used inline + via CSS vars in globals.css.

export const palette = {
  bg: '#f0f0f3',           // warm light gray page background
  bgSubtle: '#e8e8eb',     // a hair darker, for section dividers
  surface: '#ffffff',      // cards
  surfaceMuted: '#f7f7fa', // alt card surface

  fg: '#1a1d3a',           // deep navy text (headings)
  fgMuted: '#5b6478',      // body text gray
  fgSubtle: '#9ca3af',     // muted / placeholder

  accent: '#6c5ce7',       // indigo/purple — primary CTAs, accents
  accentSoft: '#a5b4fc',   // lavender — secondary accent
  accentBg: '#eef0ff',     // very light purple background tint
  onAccent: '#ffffff',

  dark: '#1a1d3a',         // navy CTA fill ("Contact Us" pill style)
  onDark: '#ffffff',

  border: '#e5e7eb',
  borderSoft: 'rgba(26, 29, 58, 0.08)',
  borderAccent: 'rgba(108, 92, 231, 0.18)',

  success: '#10b981',
  shadow: 'rgba(26, 29, 58, 0.06)',
} as const;

export const fonts = {
  display: 'var(--font-display), "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  body: 'var(--font-body), "Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(26, 29, 58, 0.04)',
  md: '0 4px 12px rgba(26, 29, 58, 0.06)',
  lg: '0 12px 32px rgba(26, 29, 58, 0.08)',
  card: '0 1px 3px rgba(26, 29, 58, 0.04), 0 8px 24px rgba(108, 92, 231, 0.06)',
  cardHover: '0 1px 3px rgba(26, 29, 58, 0.04), 0 16px 40px rgba(108, 92, 231, 0.12)',
} as const;

export type Palette = typeof palette;
export type Fonts = typeof fonts;

export const theme = { palette, fonts, radius, shadow };
export type Theme = typeof theme;

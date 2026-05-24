// Locked production theme — Operator direction, Signal palette, Bricolage font pair, headline #1.
// Maps 1:1 to the design system in DFYContentDesign/theme.jsx so swapping variants later is trivial.

export const palette = {
  bg: '#0a0a0a',
  surface: '#161614',
  fg: '#f5f4ef',
  muted: '#8a8a82',
  accent: '#d9ff3d',
  onAccent: '#0a0a0a',
  border: 'rgba(245,244,239,0.12)',
} as const;

export const fonts = {
  display: 'var(--font-display), "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif',
  body: 'var(--font-body), "Geist", ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-mono), "Geist Mono", ui-monospace, monospace',
  weight: 700,
  tracking: '-0.04em',
  italic: false,
} as const;

export type Direction = 'operator' | 'studio';
export type HeroLayout = 'split' | 'stacked';

export const direction: Direction = 'operator';
export const heroLayout: HeroLayout = 'split';

export const headline = {
  eyebrow: 'Done-for-you content',
  big: 'Be everywhere.',
  accent: 'Film nothing.',
  sub: 'We clone your face and voice, then ship the content you should be posting — without you ever picking up a camera.',
} as const;

export type Theme = {
  palette: typeof palette;
  fonts: typeof fonts;
  direction: Direction;
  heroLayout: HeroLayout;
  headline: typeof headline;
};

export const theme: Theme = { palette, fonts, direction, heroLayout, headline };

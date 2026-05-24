// theme.jsx — design tokens for the 2 directions
// Exposed on window so other Babel scripts can read.

// ── Direction A: "Operator" — dark, bold, direct-response ──────────────
const OPERATOR_PALETTES = [
  // [accent, accent-ink, bg, surface, fg, fg-muted]
  { name: 'Signal',   accent: '#d9ff3d', onAccent: '#0a0a0a', bg: '#0a0a0a', surface: '#161614', fg: '#f5f4ef', muted: '#8a8a82', border: 'rgba(245,244,239,0.12)' },
  { name: 'Flare',    accent: '#ff5a1f', onAccent: '#0a0a0a', bg: '#0a0a0a', surface: '#161412', fg: '#f5f1ea', muted: '#8a857c', border: 'rgba(245,241,234,0.12)' },
  { name: 'Vapor',    accent: '#a78bfa', onAccent: '#0a0a0a', bg: '#0a0a0a', surface: '#15131c', fg: '#f3f0f7', muted: '#8a8694', border: 'rgba(243,240,247,0.12)' },
  { name: 'Steel',    accent: '#e8e8e8', onAccent: '#0a0a0a', bg: '#0a0a0a', surface: '#151515', fg: '#f5f4ef', muted: '#8a8a82', border: 'rgba(245,244,239,0.12)' },
];

// ── Direction B: "Studio" — warm, premium, agency ─────────────────────
const STUDIO_PALETTES = [
  { name: 'Terra',    accent: '#c9622a', onAccent: '#fbf6ec', bg: '#f4ede0', surface: '#ebe2d0', fg: '#1a1612', muted: '#6b5f4f', border: 'rgba(26,22,18,0.12)' },
  { name: 'Ink',      accent: '#1a1612', onAccent: '#f4ede0', bg: '#f4ede0', surface: '#ebe2d0', fg: '#1a1612', muted: '#6b5f4f', border: 'rgba(26,22,18,0.12)' },
  { name: 'Sage',     accent: '#5a6b4a', onAccent: '#f4ede0', bg: '#eee6d4', surface: '#e4dac4', fg: '#1c1c16', muted: '#6b6450', border: 'rgba(28,28,22,0.12)' },
  { name: 'Plum',     accent: '#7a3f5e', onAccent: '#f4ede0', bg: '#f3ebdd', surface: '#e9dec9', fg: '#1a1115', muted: '#6b5860', border: 'rgba(26,17,21,0.12)' },
];

// ── Font pairings: [display, body, mono] ───────────────────────────────
const OPERATOR_FONTS = [
  { name: 'Bricolage',     display: "'Bricolage Grotesque', sans-serif", body: "'Geist', sans-serif",        mono: "'Geist Mono', monospace", weight: 700, tracking: '-0.04em' },
  { name: 'Space',         display: "'Space Grotesk', sans-serif",       body: "'Geist', sans-serif",        mono: "'Geist Mono', monospace", weight: 700, tracking: '-0.035em' },
  { name: 'Geist',         display: "'Geist', sans-serif",               body: "'Geist', sans-serif",        mono: "'Geist Mono', monospace", weight: 700, tracking: '-0.045em' },
];

const STUDIO_FONTS = [
  { name: 'Instrument',    display: "'Instrument Serif', serif",          body: "'DM Sans', sans-serif",      mono: "'Geist Mono', monospace", weight: 400, tracking: '-0.02em', italic: true },
  { name: 'Bricolage',     display: "'Bricolage Grotesque', sans-serif",  body: "'DM Sans', sans-serif",      mono: "'Geist Mono', monospace", weight: 600, tracking: '-0.035em' },
  { name: 'Geist',         display: "'Geist', sans-serif",                body: "'DM Sans', sans-serif",      mono: "'Geist Mono', monospace", weight: 600, tracking: '-0.04em' },
];

// ── Headline copy options ──────────────────────────────────────────────
const HEADLINES = [
  { eyebrow: 'Done-for-you content',  big: 'Be everywhere.',          accent: 'Film nothing.',                 sub: 'We clone your face and voice, then ship the content you should be posting — without you ever picking up a camera.' },
  { eyebrow: 'Your face. Their feed.', big: 'Stay busy.',              accent: 'We post for you.',              sub: "You're too busy to be on camera. We built a system that puts you on camera anyway — 30+ pieces a month, in your voice, on autopilot." },
  { eyebrow: 'You\u2019re missing the algorithm', big: 'Post daily.',  accent: 'Touch grass.',                  sub: 'A clone of you, trained on your voice and your face, posting the content you wish you had time to make.' },
  { eyebrow: 'Built for operators',   big: 'Your audience',            accent: "doesn\u2019t care you\u2019re busy.", sub: "But they will notice when you stop showing up. We make sure you don't \u2014 with an AI clone trained on you." },
];

const THEME = { OPERATOR_PALETTES, STUDIO_PALETTES, OPERATOR_FONTS, STUDIO_FONTS, HEADLINES };

// helper: pick palette/fonts for current direction
function resolveTheme(direction, paletteIdx, fontIdx) {
  const palettes = direction === 'studio' ? STUDIO_PALETTES : OPERATOR_PALETTES;
  const fonts    = direction === 'studio' ? STUDIO_FONTS    : OPERATOR_FONTS;
  return {
    palette: palettes[Math.min(paletteIdx, palettes.length - 1)],
    fonts:   fonts[Math.min(fontIdx, fonts.length - 1)],
  };
}

Object.assign(window, { THEME, resolveTheme, HEADLINES });

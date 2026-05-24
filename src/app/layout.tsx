import type { Metadata } from 'next';
import {
  Plus_Jakarta_Sans,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
  DM_Serif_Display,
} from 'next/font/google';
import './globals.css';

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Variant-only fonts. tree-shaken per route by next/font.
const serifFont = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
});

const dmSerifFont = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
  weight: '400',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const groteskFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DFY Content — Build your audience without picking up the camera.',
  description:
    'We script, clone, and ship social content in your voice. Two hours of setup. Content forever.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${serifFont.variable} ${dmSerifFont.variable} ${monoFont.variable} ${groteskFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

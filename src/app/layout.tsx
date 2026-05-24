import type { Metadata } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const monoFont = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DFY Content — Done-for-you social, on your face.',
  description:
    'We clone your face and voice, then ship the content you should be posting — without you ever picking up a camera.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}

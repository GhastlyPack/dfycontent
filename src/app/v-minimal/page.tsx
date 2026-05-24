'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';

/**
 * /v-minimal — Brutalist minimalism.
 * Thesis: One sentence. One CTA. Mono type. Negative space carries the work.
 * Test: do sophisticated buyers convert better on stripped-down, confident landings?
 */

const BG = '#fafaf7';
const FG = '#0a0a0a';
const ACCENT = '#ff4d12';
const MUTED = '#737373';

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-minimal" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
        {/* Top bar — barely-there */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: `1px solid ${FG}` }}>
          <Link href="/" style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>
            DFY Content
          </Link>
          <Link href="/apply" style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: FG }}>
            Apply →
          </Link>
        </header>

        {/* Hero — asymmetric, brutally large */}
        <section style={{ padding: 'clamp(48px, 8vw, 120px) 32px', maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 48, color: MUTED }}>
            001 / Done-for-you content
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              fontSize: 'clamp(48px, 11vw, 168px)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Two hours.
            <br />
            Then content
            <br />
            <span style={{ color: ACCENT }}>forever.</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 80, maxWidth: 920 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: 0, fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
              We script, clone, and ship your social media — at scale, in your voice.
              Two hours of setup with our team. Then never film again.
            </p>
            <div style={{ alignSelf: 'end' }}>
              <Link
                href="/apply"
                style={{
                  display: 'inline-block',
                  padding: '20px 32px',
                  background: FG,
                  color: BG,
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  border: `2px solid ${FG}`,
                }}
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </section>

        {/* Three-point manifesto */}
        <section style={{ borderTop: `1px solid ${FG}`, padding: '64px 32px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: FG }}>
            {[
              ['01', 'We write the scripts.', 'Headline service. Most agencies charge $5k+/mo for this alone.'],
              ['02', 'Your AI clone delivers.', 'Trained on you. Indistinguishable from the real thing.'],
              ['03', 'We post. Everywhere.', 'IG, TikTok, YouTube, LinkedIn, X. You approve. We ship.'],
            ].map(([n, h, b]) => (
              <div key={n} style={{ background: BG, padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontSize: 13, letterSpacing: '0.16em', color: ACCENT }}>{n}</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, lineHeight: 1.15, letterSpacing: '-0.01em' }}>{h}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.55, margin: 0, fontFamily: 'var(--font-body), system-ui, sans-serif' }}>{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA — single sentence */}
        <section style={{ borderTop: `1px solid ${FG}`, padding: 'clamp(64px, 10vw, 160px) 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            If you can spare two hours, we&apos;ll handle the next year.
          </p>
          <div style={{ marginTop: 48 }}>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                padding: '24px 48px',
                background: ACCENT,
                color: BG,
                fontSize: 13,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              See if you qualify →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${FG}`, padding: '32px', textAlign: 'center', fontSize: 12, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} DFY Content
        </footer>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';

/**
 * /v-bento — Dashboard / Linear-Vercel aesthetic.
 * Thesis: Tech-forward audience responds to product-app-styled landings.
 * Dense bento grid throughout. Subtle gradients, tight type, data viz everywhere.
 */

const BG = '#0e0f12';
const SURFACE = '#16181c';
const SURFACE_2 = '#1c1f25';
const FG = '#f5f6f8';
const MUTED = '#9ba1ad';
const ACCENT = '#7c5cff';
const ACCENT_2 = '#42d4f5';
const BORDER = 'rgba(255,255,255,0.07)';

const GROTESK = 'var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';
const MONO = 'var(--font-mono), monospace';

function Cell({ children, span, style }: { children: React.ReactNode; span?: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        padding: 20,
        gridColumn: span ? `span ${span}` : undefined,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED }}>
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-bento" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        {/* Top bar */}
        <header style={{ borderBottom: `1px solid ${BORDER}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_2})` }} />
            <span style={{ fontFamily: GROTESK, fontWeight: 600, fontSize: 15 }}>DFY Content</span>
          </Link>
          <Link
            href="/apply"
            style={{
              padding: '8px 16px',
              background: FG,
              color: BG,
              fontFamily: BODY,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 8,
            }}
          >
            Apply →
          </Link>
        </header>

        {/* Hero — bento grid */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
            <MiniLabel>Done-for-you content · v2.5.0</MiniLabel>
            <h1
              style={{
                fontFamily: GROTESK,
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                margin: 0,
                maxWidth: 720,
              }}
            >
              Your content operation, <span style={{ color: ACCENT_2 }}>shipped as a product.</span>
            </h1>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.55, maxWidth: 580, margin: 0 }}>
              Two-hour setup. We script, your AI clone delivers, our editors polish, we publish. Built to be measurable from day one.
            </p>
          </div>

          {/* Bento grid — 12 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
            {/* Stat 1 — big */}
            <Cell span={5} style={{ minHeight: 220, background: `linear-gradient(135deg, ${SURFACE_2} 0%, ${SURFACE} 100%)` }}>
              <MiniLabel>This month · in your voice</MiniLabel>
              <div style={{ fontFamily: GROTESK, fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 8, color: FG }}>
                30+
              </div>
              <div style={{ fontSize: 14, color: MUTED, marginTop: 6 }}>pieces shipped / mo</div>
              {/* Decorative dot */}
              <div style={{ position: 'absolute', top: 18, right: 18, width: 10, height: 10, borderRadius: 999, background: ACCENT, boxShadow: `0 0 24px ${ACCENT}` }} />
            </Cell>

            {/* Stat 2 */}
            <Cell span={3} style={{ minHeight: 220 }}>
              <MiniLabel>your time</MiniLabel>
              <div style={{ fontFamily: GROTESK, fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 8 }}>2hrs</div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 6 }}>one-time setup. forever.</div>
            </Cell>

            {/* Quick CTA */}
            <Cell span={4} style={{ minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: `linear-gradient(135deg, ${ACCENT}40 0%, ${SURFACE} 100%)` }}>
              <div>
                <MiniLabel>cta · primary</MiniLabel>
                <div style={{ fontFamily: GROTESK, fontSize: 22, fontWeight: 600, marginTop: 8, letterSpacing: '-0.01em' }}>
                  Run a 60-second qualifier
                </div>
              </div>
              <Link
                href="/apply"
                style={{
                  display: 'inline-block',
                  padding: '12px 18px',
                  background: ACCENT,
                  color: FG,
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
              >
                Apply now  →
              </Link>
            </Cell>

            {/* Pipeline visualization */}
            <Cell span={7} style={{ minHeight: 180 }}>
              <MiniLabel>pipeline · weekly cadence</MiniLabel>
              <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
                {['Strategy', 'Script', 'Clone delivery', 'Edit', 'Publish'].map((step, i) => (
                  <>
                    <div
                      key={step}
                      style={{
                        flex: 1,
                        padding: '14px 12px',
                        background: SURFACE_2,
                        border: `1px solid ${BORDER}`,
                        borderRadius: 10,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <div style={{ fontFamily: MONO, fontSize: 10, color: MUTED, marginBottom: 4 }}>0{i + 1}</div>
                      {step}
                    </div>
                    {i < 4 && (
                      <span key={`a${i}`} style={{ color: ACCENT_2 }}>›</span>
                    )}
                  </>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: MUTED }}>
                Weekly review, you approve, we publish. Engagement → your account.
              </div>
            </Cell>

            {/* Platforms */}
            <Cell span={5} style={{ minHeight: 180 }}>
              <MiniLabel>platforms</MiniLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 16 }}>
                {[
                  { l: 'IG', c: '#e1306c' },
                  { l: 'TT', c: '#fff' },
                  { l: 'YT', c: '#ff0000' },
                  { l: 'LI', c: '#0a66c2' },
                  { l: 'X', c: '#1da1f2' },
                ].map((p) => (
                  <div key={p.l} style={{ aspectRatio: '1', borderRadius: 10, background: p.c, color: p.l === 'TT' ? BG : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: GROTESK, fontWeight: 700, fontSize: 16 }}>{p.l}</div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 13, color: MUTED }}>
                Wherever your audience scrolls.
              </div>
            </Cell>

            {/* Scripting card — wide */}
            <Cell span={12} style={{ minHeight: 180, background: `linear-gradient(135deg, ${ACCENT}20 0%, ${SURFACE} 60%)` }}>
              <MiniLabel>The headline service</MiniLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24, marginTop: 12, alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: GROTESK, fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    Scripting that <span style={{ color: ACCENT_2 }}>sounds like you</span>.
                  </h3>
                  <p style={{ marginTop: 8, fontSize: 14, color: MUTED, lineHeight: 1.55 }}>
                    Every hook, body, and CTA — written by our team, around your offer, in your voice. Most agencies charge $5k+/mo for this alone. Here it&apos;s the foundation.
                  </p>
                </div>
                <div style={{ background: SURFACE_2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16, fontFamily: MONO, fontSize: 13, color: MUTED }}>
                  <div style={{ color: ACCENT_2 }}>// script_apr_24.md</div>
                  <div style={{ marginTop: 10, color: '#c8cfdc' }}>HOOK — Stop trying to film daily.</div>
                  <div style={{ marginTop: 6, color: '#c8cfdc' }}>BODY — Two hours of setup with our team gets you 30 pieces a month, forever.</div>
                  <div style={{ marginTop: 6, color: ACCENT }}>CTA  — Apply →</div>
                </div>
              </div>
            </Cell>
          </div>

          {/* Bottom CTA bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, padding: 24, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <div>
              <MiniLabel>final step</MiniLabel>
              <div style={{ fontFamily: GROTESK, fontSize: 22, fontWeight: 600, marginTop: 4 }}>See if we&apos;re a fit.</div>
            </div>
            <Link
              href="/apply"
              style={{
                padding: '14px 22px',
                background: FG,
                color: BG,
                fontFamily: BODY,
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 10,
              }}
            >
              Run the qualifier  →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '24px', fontFamily: MONO, fontSize: 11, color: MUTED, textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          DFY Content · v-bento
        </footer>
      </div>
    </>
  );
}

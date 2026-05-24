'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';
import { MagneticHover, Marquee, Reveal, StaggerChild, StaggerGroup, WordReveal } from '@/components/motion-atoms';

/**
 * /v-dark — Premium tech dark mode.
 * Motion: word reveal hero, magnetic-tilt cards, ambient gradient drift, marquee customers.
 */

const BG = '#000000';
const PANEL = '#0a0a0a';
const FG = '#ededed';
const MUTED = '#888c93';
const SUBTLE = 'rgba(255,255,255,0.05)';
const BORDER = 'rgba(255,255,255,0.08)';

const DISPLAY = 'var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';
const MONO = 'var(--font-mono), monospace';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: 999, fontFamily: BODY, fontSize: 12, color: MUTED, fontWeight: 500 }}>
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-dark" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY, position: 'relative', overflow: 'hidden' }}>
        {/* Ambient gradient with slow drift */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: 720,
            background: 'radial-gradient(ellipse at center top, rgba(120, 119, 198, 0.22) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'dfyGradientDrift 14s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 200,
            right: '-10%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(66, 212, 245, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: 'dfyGradientDrift 18s ease-in-out infinite reverse',
          }}
        />

        {/* Nav */}
        <header style={{ position: 'relative', zIndex: 2, padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#fff' }} />
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em' }}>DFY Content</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href="#how" style={{ fontSize: 14, color: MUTED }}>How it works</Link>
            <Link href="#trust" style={{ fontSize: 14, color: MUTED }}>Customers</Link>
            <Link href="/apply" style={{ padding: '8px 16px', background: FG, color: BG, fontFamily: BODY, fontSize: 13, fontWeight: 600, borderRadius: 8 }}>Apply →</Link>
          </nav>
        </header>

        {/* Hero with word reveal */}
        <section style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', padding: 'clamp(80px, 12vw, 160px) 32px 80px', textAlign: 'center' }}>
          <Reveal>
            <Pill>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#34d399', boxShadow: '0 0 12px #34d399' }} />
              New: 14-day onboarding window opening
            </Pill>
          </Reveal>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(40px, 7vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.0,
              margin: '32px 0 0',
              background: `linear-gradient(180deg, ${FG} 0%, ${MUTED} 110%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <WordReveal text="Done-for-you content," delay={0.2} stagger={0.06} />
            <br />
            <WordReveal text="engineered." delay={0.55} stagger={0.06} />
          </h1>
          <Reveal delay={0.9}>
            <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.55, marginTop: 24, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
              We script. Your AI clone delivers. Our editors polish. We publish. Two hours of setup gets you a 12-month content operation.
            </p>
          </Reveal>
          <Reveal delay={1.05}>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/apply" style={{ padding: '14px 24px', background: FG, color: BG, fontFamily: BODY, fontSize: 15, fontWeight: 600, borderRadius: 10 }}>Start  →</Link>
              <Link href="#how" style={{ padding: '14px 24px', background: 'transparent', color: FG, fontFamily: BODY, fontSize: 15, fontWeight: 500, borderRadius: 10, border: `1px solid ${BORDER}` }}>How it works</Link>
            </div>
          </Reveal>
        </section>

        {/* Customer marquee */}
        <section id="trust" style={{ position: 'relative', zIndex: 1, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '28px 0', background: PANEL }}>
          <Marquee speed={40} style={{ gap: 48 }}>
            {['LIPSUM', 'LOREM', 'IPSUM', 'CIRCA', 'NEXTUS', 'AVERY', 'KAIROS', 'OPUS', 'NORTH', 'VANTA'].map((l) => (
              <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 48, paddingRight: 48, fontFamily: DISPLAY, fontWeight: 700, fontSize: 16, letterSpacing: '0.14em', color: FG, opacity: 0.5 }}>
                {l}
                <span style={{ width: 4, height: 4, borderRadius: 999, background: MUTED }} />
              </span>
            ))}
          </Marquee>
        </section>

        {/* How it works — magnetic cards */}
        <section id="how" style={{ position: 'relative', zIndex: 1, maxWidth: 1080, margin: '0 auto', padding: 'clamp(80px, 10vw, 128px) 32px' }}>
          <Reveal>
            <div style={{ marginBottom: 56, maxWidth: 640 }}>
              <Pill>How it works</Pill>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', margin: '20px 0 0', lineHeight: 1.1 }}>
                From kickoff to live in 14 days. No surprises.
              </h2>
            </div>
          </Reveal>
          <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} staggerDelay={0.1}>
            {[
              { i: '01', h: 'You spend 2 hours. Once.', b: 'In-person or remote studio session. We capture face, voice, cadence. That’s the whole time investment, forever.' },
              { i: '02', h: 'We script. Clone delivers.', b: 'Writers craft every piece. Your AI clone — trained on you — performs. Editors polish to broadcast quality.' },
              { i: '03', h: 'We publish. Everywhere.', b: 'You approve. We post — IG, TikTok, YouTube Shorts, LinkedIn, X. Engagement returns to your real account.' },
            ].map((s) => (
              <StaggerChild key={s.i}>
                <MagneticHover strength={6}>
                  <div
                    style={{
                      background: PANEL,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 16,
                      padding: 28,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* subtle hover glow */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.18) 0%, transparent 50%)',
                        opacity: 0.6,
                        pointerEvents: 'none',
                      }}
                    />
                    <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: '0.08em', position: 'relative' }}>{s.i}</span>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: '-0.015em', lineHeight: 1.3, position: 'relative' }}>
                      {s.h}
                    </h3>
                    <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0, position: 'relative' }}>{s.b}</p>
                  </div>
                </MagneticHover>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </section>

        {/* Final CTA */}
        <section style={{ position: 'relative', zIndex: 1, padding: '0 32px 128px' }}>
          <Reveal>
            <div
              style={{
                maxWidth: 1080,
                margin: '0 auto',
                borderRadius: 24,
                padding: '64px 32px',
                background: `linear-gradient(180deg, ${PANEL} 0%, #050505 100%)`,
                border: `1px solid ${BORDER}`,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, rgba(120, 119, 198, 0.18) 0%, transparent 60%)',
                  pointerEvents: 'none',
                  animation: 'dfyGradientDrift 10s ease-in-out infinite',
                }}
              />
              <div style={{ position: 'relative' }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: 0, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                  Engineer your content operation.
                </h3>
                <p style={{ fontSize: 16, color: MUTED, marginTop: 14, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                  60-second qualifier. We&apos;ll tell you straight if it&apos;s not a fit.
                </p>
                <div style={{ marginTop: 28 }}>
                  <Link href="/apply" style={{ padding: '16px 28px', background: FG, color: BG, fontFamily: BODY, fontSize: 15, fontWeight: 600, borderRadius: 10 }}>Apply  →</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: MUTED, fontFamily: MONO, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span>© {new Date().getFullYear()} DFY Content</span>
          <span>v-dark</span>
        </footer>
      </div>
    </>
  );
}

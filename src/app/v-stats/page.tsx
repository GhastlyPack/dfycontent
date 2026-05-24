'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';
import { CountUp, Reveal, SparklinePath, StaggerGroup, StaggerChild } from '@/components/motion-atoms';

/**
 * /v-stats — Numbers don't lie.
 * Thesis: Evidence-driven buyers. Motion: count-ups + sparklines drawing in.
 */

const BG = '#f5f5f0';
const FG = '#0c0c0c';
const ACCENT = '#16a34a';
const ACCENT_BG = '#dcfce7';
const MUTED = '#525252';
const RULE = 'rgba(12, 12, 12, 0.1)';
const DISPLAY = 'var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';
const MONO = 'var(--font-mono), monospace';

function Sparkline({ trend, color = ACCENT, delay = 0 }: { trend: 'up' | 'down'; color?: string; delay?: number }) {
  const path = trend === 'up' ? 'M2 18 L10 14 L18 16 L26 8 L34 10 L42 4' : 'M2 4 L10 6 L18 4 L26 10 L34 14 L42 18';
  return (
    <svg width="44" height="22" viewBox="0 0 44 22" fill="none" overflow="visible">
      <SparklinePath d={path} color={color} duration={1.2} delay={delay} />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-stats" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        <header style={{ borderBottom: `1px solid ${RULE}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17, color: FG, letterSpacing: '-0.01em' }}>DFY Content</Link>
          <Link href="/apply" style={{ padding: '10px 18px', background: FG, color: BG, fontFamily: BODY, fontSize: 13, fontWeight: 600, borderRadius: 8 }}>Apply</Link>
        </header>

        {/* Hero — count-up massive number */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) 24px', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', padding: '6px 14px', background: ACCENT_BG, color: ACCENT, borderRadius: 999, fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              By the numbers · 2026 cohort
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(120px, 22vw, 320px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.85, color: FG }}>
                <CountUp to={30} duration={1.8} />
                <span style={{ color: ACCENT }}>×</span>
              </div>
              <div style={{ marginTop: 16, fontFamily: DISPLAY, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: MUTED, letterSpacing: '-0.01em' }}>
                the content output, in your voice, on autopilot
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/apply" style={{ padding: '16px 28px', background: FG, color: BG, fontFamily: BODY, fontSize: 15, fontWeight: 700, borderRadius: 8 }}>
                See if I qualify  →
              </Link>
              <span style={{ alignSelf: 'center', fontFamily: BODY, fontSize: 13, color: MUTED }}>
                Honest 60-second check
              </span>
            </div>
          </Reveal>
        </section>

        {/* Stat grid */}
        <section style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, background: BG }}>
          <StaggerGroup
            style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: RULE }}
            staggerDelay={0.1}
          >
            {[
              { n: 30, suffix: '+', sub: 'pieces / month, every month', trend: 'up' as const },
              { n: 2, suffix: 'hrs', sub: 'one-time setup. Then never.', trend: 'down' as const },
              { n: 14, suffix: 'd', sub: 'from kickoff to first post live', trend: 'down' as const },
              { n: 5, prefix: '$', suffix: 'k+', sub: 'in scripting included (avg agency rate)', trend: 'up' as const },
              { n: 0, suffix: '', sub: 'hours of filming after the 2hr session', trend: 'down' as const },
              { n: 100, suffix: '%', sub: 'your face, your voice, your brand', trend: 'up' as const },
            ].map((s, i) => (
              <StaggerChild key={i} style={{ background: BG, padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(56px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                    <CountUp to={s.n} prefix={s.prefix} suffix={s.suffix} duration={1.4} />
                  </div>
                  <Sparkline trend={s.trend} delay={0.3} />
                </div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{s.sub}</div>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </section>

        {/* Breakdown */}
        <section style={{ maxWidth: 1040, margin: '0 auto', padding: 'clamp(64px, 8vw, 120px) 24px' }}>
          <Reveal style={{ maxWidth: 640 }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>
              The breakdown
            </span>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 0', lineHeight: 1.1 }}>
              What 30× actually looks like, week by week.
            </h2>
          </Reveal>

          <StaggerGroup
            style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 1, background: RULE, borderRadius: 14, overflow: 'hidden' }}
            staggerDelay={0.1}
          >
            {[
              { week: 'Week 1', pieces: '5-7 short-form (IG/TT/Shorts)', delivery: 'Scripts approved Mon · Cuts ready Wed · Published Thu-Fri' },
              { week: 'Week 2', pieces: '5-7 short + 1 LinkedIn long-form', delivery: 'Same cadence + Tuesday LinkedIn drop' },
              { week: 'Week 3', pieces: '7-10 across platforms', delivery: 'Cadence stable. We pull what is performing.' },
              { week: 'Week 4', pieces: '7-10 + monthly recap reel', delivery: 'Performance review. Direction confirmed for next month.' },
            ].map((row) => (
              <StaggerChild key={row.week} style={{ background: BG, padding: '24px 28px', display: 'grid', gridTemplateColumns: '160px 1.5fr 2fr', gap: 24, alignItems: 'baseline' }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>{row.week}</div>
                <div style={{ fontFamily: BODY, fontSize: 15, color: FG }}>{row.pieces}</div>
                <div style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.55 }}>{row.delivery}</div>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </section>

        {/* One more stat */}
        <section style={{ background: FG, color: BG, padding: 'clamp(64px, 10vw, 144px) 24px', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(255,255,255,0.1)', color: BG, borderRadius: 999, fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              One more
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(80px, 14vw, 200px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9 }}>
                <span style={{ color: '#86efac' }}>
                  <CountUp to={4} suffix="×" duration={1.4} />
                </span>
              </div>
              <p style={{ marginTop: 16, fontFamily: DISPLAY, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.3 }}>
                the posting consistency our average client hits within 30 days of launch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ marginTop: 40 }}>
              <Link href="/apply" style={{ padding: '16px 28px', background: '#86efac', color: FG, fontFamily: BODY, fontSize: 15, fontWeight: 700, borderRadius: 8 }}>
                Run the qualifier  →
              </Link>
            </div>
          </Reveal>
        </section>

        <footer style={{ background: BG, borderTop: `1px solid ${RULE}`, padding: '24px', fontSize: 12, color: MUTED, textAlign: 'center', fontFamily: MONO, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} DFY Content · v-stats
        </footer>
      </div>
    </>
  );
}

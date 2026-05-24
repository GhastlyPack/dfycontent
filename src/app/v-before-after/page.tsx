'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';
import { Reveal, StaggerChild, StaggerGroup } from '@/components/motion-atoms';

/**
 * /v-before-after — Comparison-driven.
 * Thesis: Pain-aware buyers convert on contrast — they see "their week" vs
 * "the after week" and the gap sells itself.
 */

const BG = '#fcfcfd';
const FG = '#0f172a';
const BAD = '#dc2626';
const BAD_BG = '#fef2f2';
const GOOD = '#15803d';
const GOOD_BG = '#f0fdf4';
const MUTED = '#475569';
const BORDER = 'rgba(15, 23, 42, 0.08)';
const DISPLAY = 'var(--font-display), var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';

function ColumnHead({ kind, label, sub }: { kind: 'bad' | 'good'; label: string; sub: string }) {
  const bg = kind === 'bad' ? BAD_BG : GOOD_BG;
  const fg = kind === 'bad' ? BAD : GOOD;
  return (
    <div style={{ padding: 20, background: bg, borderRadius: 14, marginBottom: 16 }}>
      <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: fg }}>
        {kind === 'bad' ? 'Before' : 'After'}
      </div>
      <h3 style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 700, margin: '6px 0 0', letterSpacing: '-0.015em', color: FG }}>{label}</h3>
      <p style={{ fontSize: 13, color: MUTED, marginTop: 4, margin: 0 }}>{sub}</p>
    </div>
  );
}

function Row({ left, right, num }: { left: string; right: string; num: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${BORDER}`, alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: MUTED, letterSpacing: '0.05em' }}>{num}</span>
      <div style={{ fontFamily: BODY, fontSize: 15, color: BAD, lineHeight: 1.55 }}>
        <span style={{ marginRight: 8 }}>✗</span>
        {left}
      </div>
      <div style={{ fontFamily: BODY, fontSize: 15, color: GOOD, lineHeight: 1.55 }}>
        <span style={{ marginRight: 8 }}>✓</span>
        {right}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-before-after" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        <header style={{ padding: '18px 24px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17, color: FG }}>
            DFY Content
          </Link>
          <Link
            href="/apply"
            style={{
              padding: '10px 18px',
              background: FG,
              color: BG,
              fontFamily: BODY,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 8,
            }}
          >
            Apply
          </Link>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px, 7vw, 96px) 24px 32px', textAlign: 'center' }}>
          <Reveal>
            <span style={{ display: 'inline-block', padding: '6px 14px', background: '#fff7ed', color: '#c2410c', borderRadius: 999, fontFamily: BODY, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              The honest comparison
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(40px, 6.5vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                margin: '24px 0 0',
                maxWidth: 880,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Your content week, <span style={{ color: BAD }}>before</span>{' '}
              <span style={{ color: MUTED, fontWeight: 500, fontSize: '0.7em' }}>vs.</span>{' '}
              <span style={{ color: GOOD }}>after</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.55, marginTop: 20, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
              Same week. Same goals. What changes is who&apos;s holding the camera.
            </p>
          </Reveal>
        </section>

        {/* Comparison table — rows reveal sequentially */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr', gap: 16, marginBottom: 8 }}>
              <div />
              <ColumnHead kind="bad" label="Without DFY" sub="What you do today" />
              <ColumnHead kind="good" label="With DFY" sub="The 2-hour exchange" />
            </div>
          </Reveal>

          <StaggerGroup staggerDelay={0.1} amount={0.1}>
            <StaggerChild>
              <Row num="01"
                left="Monday: stare at content calendar, feel guilt, set up tripod, get interrupted."
                right="Monday: review 5 scripts in your voice, approve 4, send notes on 1." />
            </StaggerChild>
            <StaggerChild>
              <Row num="02"
                left="Tuesday: try to film, hate every take, abandon."
                right="Tuesday: your face goes live on TikTok, Instagram, LinkedIn — without you." />
            </StaggerChild>
            <StaggerChild>
              <Row num="03"
                left="Wednesday: spend the day on actual business. Posting drops to zero."
                right="Wednesday: spend the day on actual business. Posting hits 4." />
            </StaggerChild>
            <StaggerChild>
              <Row num="04"
                left="Thursday: open Instagram, see competitors posting daily, feel worse."
                right="Thursday: see your face in 'For You' feeds. Engagement returns to your account." />
            </StaggerChild>
            <StaggerChild>
              <Row num="05"
                left="Friday: post one rushed thing because you 'have to'. Quality suffers."
                right="Friday: editors send next week's cut for review. Continuity built in." />
            </StaggerChild>
            <StaggerChild>
              <Row num="06"
                left="End of month: 2-3 pieces posted. Engagement flat. Burnout up."
                right="End of month: 30+ pieces posted. Engagement up. You haven't filmed once." />
            </StaggerChild>
          </StaggerGroup>
        </section>

        {/* What you actually trade */}
        <section style={{ borderTop: `1px solid ${BORDER}`, background: '#fafaf9', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                What you trade, plainly.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 16, alignItems: 'stretch' }}>
              <Reveal delay={0.0} style={{ background: BAD_BG, border: `1px solid ${BAD}30`, borderRadius: 18, padding: 28 }}>
                <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: BAD, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  You give up
                </span>
                <ul style={{ marginTop: 16, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    '2 hours of your time. Once.',
                    'A scheduled studio session.',
                    'Final say on every post (you approve before it goes live).',
                    'Starting at $2k/month.',
                  ].map((t) => (
                    <li key={t} style={{ fontSize: 15, color: FG, lineHeight: 1.55 }}>
                      <span style={{ color: BAD, marginRight: 8 }}>−</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 32, fontWeight: 700, color: MUTED }}>
                <span
                  style={{
                    animation: 'dfyArrowSlide 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
                <style>{`@keyframes dfyArrowSlide { 0%{transform:translateX(-8px);opacity:0.4;} 50%{transform:translateX(8px);opacity:1;} 100%{transform:translateX(-8px);opacity:0.4;} }`}</style>
              </div>

              <Reveal delay={0.2} style={{ background: GOOD_BG, border: `1px solid ${GOOD}30`, borderRadius: 18, padding: 28 }}>
                <span style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, color: GOOD, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  You get back
                </span>
                <ul style={{ marginTop: 16, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    '30+ pieces of content / month, in your voice.',
                    'Scripts written for you (worth $5k+/mo alone).',
                    'Daily posting cadence on every platform.',
                    '10+ hours back in your week, forever.',
                  ].map((t) => (
                    <li key={t} style={{ fontSize: 15, color: FG, lineHeight: 1.55 }}>
                      <span style={{ color: GOOD, marginRight: 8 }}>+</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(48px, 7vw, 96px) 24px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            See which side of the table you&apos;d rather sit on.
          </h3>
          <div style={{ marginTop: 28 }}>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                padding: '16px 28px',
                background: GOOD,
                color: '#fff',
                fontFamily: BODY,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 8,
              }}
            >
              Run the 60-second qualifier  →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '24px', fontSize: 12, color: MUTED, textAlign: 'center', fontFamily: BODY }}>
          © {new Date().getFullYear()} DFY Content · v-before-after
        </footer>
      </div>
    </>
  );
}

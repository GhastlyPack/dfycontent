'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';
import { Reveal, StaggerChild, StaggerGroup } from '@/components/motion-atoms';

/**
 * /v-editorial — Magazine / literary.
 * Motion: refined, slow fades. Chapter reveals as you scroll past them.
 * Pull quote slides in with stately timing.
 */

const PAPER = '#f4ede0';
const INK = '#1a1612';
const ACCENT = '#c9622a';
const MUTED = '#6b5f4f';
const RULE = 'rgba(26, 22, 18, 0.18)';
const SERIF = 'var(--font-serif), Georgia, serif';
const BODY = 'var(--font-body), system-ui, sans-serif';

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-editorial" />
      <div style={{ background: PAPER, color: INK, minHeight: '100vh' }}>
        <header style={{ borderBottom: `1px solid ${RULE}`, padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <Link href="/" style={{ fontFamily: SERIF, fontSize: 22, letterSpacing: '-0.02em' }}>DFY Content</Link>
            <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED }}>
              No. 01 · Vol. I
            </span>
          </div>
          <Link href="/apply" style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, padding: '10px 20px', border: `1px solid ${INK}`, borderRadius: 999, color: INK }}>Apply</Link>
        </header>

        <section style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(48px, 7vw, 96px) 32px' }}>
          <Reveal duration={0.8} y={20}>
            <div style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: 32 }}>
              Feature · The 2-hour exchange
            </div>
          </Reveal>
          <Reveal duration={0.9} delay={0.1} y={20}>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 7.5vw, 112px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0, maxWidth: 980 }}>
              On the strange new luxury of <em style={{ color: ACCENT }}>showing up everywhere</em>{' '}
              without ever showing up.
            </h1>
          </Reveal>
          <Reveal duration={0.7} delay={0.3} y={16}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginTop: 56, alignItems: 'start' }}>
              <div style={{ fontFamily: BODY, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED }}>
                By the DFY editorial desk
                <br />
                <span style={{ color: INK, marginTop: 6, display: 'inline-block' }}>10 min read</span>
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.45, margin: 0, color: INK, fontStyle: 'italic' }}>
                You sit for one studio session — two hours, one time — and our writers, editors, and AI clone do the next twelve months of work in your voice. The math is uncomfortable for the agencies you used to consider.
              </p>
            </div>
          </Reveal>
          <Reveal duration={0.7} delay={0.45}>
            <div style={{ marginTop: 56 }}>
              <Link href="/apply" style={{ display: 'inline-block', padding: '16px 32px', background: INK, color: PAPER, fontFamily: BODY, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', borderRadius: 999 }}>
                Begin the exchange  →
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Chapters — each reveals on scroll */}
        <section style={{ borderTop: `1px solid ${RULE}`, padding: '80px 32px' }}>
          <StaggerGroup
            style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}
            staggerDelay={0.18}
            amount={0.1}
          >
            {[
              ['I.', 'The capture', 'A two-hour session — in person or over video — gathers your face, your voice, your linguistic tics. The way you sigh before making a point. This becomes the corpus.'],
              ['II.', 'The script', 'Our writers compose every piece — for your audience, your offer, what is converting this week. Most agencies charge five figures monthly for this alone. Here it is the foundation.'],
              ['III.', 'The delivery', 'Your AI clone performs the work. Our human editors polish hooks, cuts, captions. You approve. We post — to every platform you intend to inhabit.'],
            ].map(([n, h, b]) => (
              <StaggerChild key={n}>
                <article style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 400, color: ACCENT, fontStyle: 'italic' }}>{n}</span>
                  <div>
                    <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, margin: 0, letterSpacing: '-0.015em', lineHeight: 1.1 }}>{h}</h2>
                    <p style={{ fontFamily: BODY, fontSize: 17, lineHeight: 1.65, color: MUTED, marginTop: 14, maxWidth: 640 }}>{b}</p>
                  </div>
                </article>
              </StaggerChild>
            ))}
          </StaggerGroup>
        </section>

        {/* Pull quote — slow fade + scale */}
        <section style={{ borderTop: `1px solid ${RULE}`, padding: '80px 32px', background: '#ebe2d0' }}>
          <Reveal duration={1.0} y={32} amount={0.4}>
            <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.25, letterSpacing: '-0.015em', maxWidth: 920, margin: '0 auto', textAlign: 'center', color: INK }}>
              &ldquo;I haven&apos;t touched a camera in 90 days. My DMs have never been fuller.&rdquo;
              <footer style={{ marginTop: 28, fontStyle: 'normal', fontSize: 14, fontFamily: BODY, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                — Jordan M., Founder
              </footer>
            </blockquote>
          </Reveal>
        </section>

        <section style={{ borderTop: `1px solid ${RULE}`, padding: 'clamp(64px, 8vw, 112px) 32px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Reveal duration={0.8}>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.15, margin: 0, letterSpacing: '-0.015em' }}>
              Two hours of your time. Inquire to see if our roster has space.
            </h3>
            <div style={{ marginTop: 40 }}>
              <Link href="/apply" style={{ display: 'inline-block', padding: '16px 32px', background: ACCENT, color: PAPER, fontFamily: BODY, fontSize: 14, fontWeight: 600, letterSpacing: '0.02em', borderRadius: 999 }}>
                Submit an inquiry
              </Link>
            </div>
          </Reveal>
        </section>

        <footer style={{ borderTop: `1px solid ${RULE}`, padding: '32px', textAlign: 'center', fontFamily: BODY, fontSize: 12, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} DFY Content · Published in the United States
        </footer>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';

/**
 * /v-testimonials — Wall of social proof.
 * Thesis: Trust-driven buyers want to hear from peers, not us.
 * Hero IS a testimonial. Every section is voices.
 */

const BG = '#fdfaf6';
const FG = '#1d1d1f';
const ACCENT = '#dc4a3b';
const MUTED = '#6e6e73';
const CARD = '#ffffff';
const BORDER = 'rgba(29, 29, 31, 0.08)';
const DISPLAY = 'var(--font-serif-display), Georgia, serif';
const BODY = 'var(--font-body), system-ui, sans-serif';

function Stars() {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.59L8 12.04l-4.12 2.16.79-4.59L1.33 6.36l4.61-.67L8 1.5z" fill={ACCENT} />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        background: color,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

const QUOTES = [
  { q: "Saved me 10 hours a week and grew my LinkedIn from 4k to 18k followers in 4 months.", n: 'Marcus T.', r: 'Agency owner', c: '#f59e0b', i: 'MT' },
  { q: "The clone is uncanny — friends thought I was actually filming TikToks. The team handles everything, including the scripts.", n: 'Priya S.', r: 'Consultant', c: '#8b5cf6', i: 'PS' },
  { q: "Honest, fair pricing. They told me upfront what I'd get. Showed up on day 14 with content live — and it sounded like me.", n: 'Sasha K.', r: 'Operator', c: '#10b981', i: 'SK' },
  { q: "I haven't picked up my phone for filming in 90 days. Best ROI of any service we've bought.", n: 'Diego F.', r: 'Founder', c: '#0a66c2', i: 'DF' },
  { q: "Going from monthly to daily posting without burning out feels like a cheat code. Worth every dollar.", n: 'Aaliyah K.', r: 'Creator · 280k', c: '#dc4a3b', i: 'AK' },
  { q: "The script quality alone justifies the price. I was paying a contractor $4k/mo just for that.", n: 'Tom R.', r: 'SaaS founder', c: '#0891b2', i: 'TR' },
];

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-testimonials" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        <header style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER}` }}>
          <Link href="/" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, color: FG }}>
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
              borderRadius: 999,
            }}
          >
            Apply
          </Link>
        </header>

        {/* Hero — testimonial as hero */}
        <section style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(64px, 8vw, 112px) 24px' }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', background: FG, color: BG, borderRadius: 999, fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            What they actually say
          </span>

          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr', gap: 32, alignItems: 'center' }}>
            <Stars />
            <blockquote
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(34px, 5vw, 60px)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                margin: 0,
                color: FG,
              }}
            >
              &ldquo;I went from posting once a month to <span style={{ color: ACCENT }}>four times a week</span>. My DMs are full. I haven&apos;t touched a camera in 90 days. The scripting alone was worth what we pay.&rdquo;
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar initials="JM" color="#7c3aed" />
              <div>
                <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17 }}>Jordan M.</div>
                <div style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginTop: 2 }}>Founder, B2B SaaS · client since Jan 2026</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                padding: '16px 28px',
                background: ACCENT,
                color: '#fff',
                fontFamily: BODY,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              See if I qualify  →
            </Link>
            <span style={{ marginLeft: 16, fontSize: 13, color: MUTED }}>50+ founders trust us</span>
          </div>
        </section>

        {/* Wall of voices */}
        <section style={{ borderTop: `1px solid ${BORDER}`, padding: 'clamp(48px, 6vw, 80px) 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, margin: 0, letterSpacing: '-0.015em' }}>
                More voices.
              </h2>
            </div>
            <div style={{ columnCount: 3, columnGap: 16 }}>
              {QUOTES.map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 18,
                    padding: 24,
                    breakInside: 'avoid',
                    marginBottom: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  <Stars />
                  <p style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 400, lineHeight: 1.4, color: FG, margin: 0, letterSpacing: '-0.005em' }}>
                    &ldquo;{t.q}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                    <Avatar initials={t.i} color={t.c} />
                    <div>
                      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14 }}>{t.n}</div>
                      <div style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginTop: 2 }}>{t.r}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ borderTop: `1px solid ${BORDER}`, padding: 'clamp(64px, 8vw, 112px) 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, margin: 0, letterSpacing: '-0.015em', lineHeight: 1.2, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            We could keep going. <span style={{ color: ACCENT, fontStyle: 'italic' }}>Or you could just talk to us.</span>
          </p>
          <div style={{ marginTop: 32 }}>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                padding: '18px 32px',
                background: FG,
                color: BG,
                fontFamily: BODY,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              Run the 60-second qualifier  →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '24px', fontSize: 12, color: MUTED, textAlign: 'center', fontFamily: BODY }}>
          © {new Date().getFullYear()} DFY Content · v-testimonials
        </footer>
      </div>
    </>
  );
}

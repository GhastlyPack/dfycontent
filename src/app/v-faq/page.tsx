'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TrackVariant } from '@/components/TrackVariant';

/**
 * /v-faq — Handle objections first.
 * Thesis: Skeptical / research-driven buyers want answers before pitch.
 * Hero asks the meta-question, FAQ accordion handles the real ones.
 */

const BG = '#f8f7f2';
const FG = '#1a1d2e';
const ACCENT = '#2d6cdf';
const ACCENT_BG = '#e6efff';
const MUTED = '#5f6478';
const RULE = 'rgba(26, 29, 46, 0.1)';

const DISPLAY = 'var(--font-display), var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';

const FAQS = [
  {
    q: "How can an AI clone sound like me when most AI sounds generic?",
    a: "We capture you for 1-2 hours: tone, cadence, vocabulary, the way you sigh before a punchline. The clone is trained on that — and humans review every piece. Friends and clients regularly can't tell the difference.",
  },
  {
    q: "What exactly is included? Scripting alone is $5k+/mo at most agencies.",
    a: "All of it. Strategy, scripting, clone production, editing (hooks/cuts/captions/B-roll/thumbnails), and posting across every platform you're on. Our pricing starts at $2k/mo because we're honest that below that, the work gets cheap.",
  },
  {
    q: "How is this different from hiring a content team or agency?",
    a: "A content team is $20-40k/mo to assemble and takes months to ramp. We replace strategist, scriptwriter, videographer, and editor — leaving only you (for two hours, once). Engagement comes back to your real account, in your real voice.",
  },
  {
    q: "What if I don't like the content you produce?",
    a: "You approve everything before it posts. That's the workflow. We send the cuts, you say yes or send notes, we revise, we post. No surprises, no losing control of your brand.",
  },
  {
    q: "Is my audience going to notice it's AI?",
    a: "Most don't. The training is on you, and editors polish for broadcast quality. If anything, your output gets MORE consistent — and engagement reflects that. We can show you side-by-side examples on the call.",
  },
  {
    q: "What's the actual time commitment after the 2-hour setup?",
    a: "30 minutes a week to review and approve. That's it. If you want to be more hands-on (script revisions, topic input), the door's open. Most clients trust the process by month 2.",
  },
  {
    q: "How long from kickoff to first post live?",
    a: "14 days. Day 1-2 is the studio session. Day 3-7 is clone training + initial scripts. Day 8-12 is production. Day 13-14 is your final approval. Day 14 we publish.",
  },
  {
    q: "What if I cancel? Do you own the clone?",
    a: "You do. We don't lock your likeness up. Cancel anytime, you keep the trained clone and the existing scripts. We just stop producing new content.",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${RULE}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          padding: '24px 0',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 600, color: FG, letterSpacing: '-0.01em' }}>
          {q}
        </span>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: open ? ACCENT : ACCENT_BG,
            color: open ? '#fff' : ACCENT,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background .2s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24, paddingRight: 60, fontFamily: BODY, fontSize: 16, lineHeight: 1.65, color: MUTED }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-faq" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        <header style={{ borderBottom: `1px solid ${RULE}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              borderRadius: 999,
            }}
          >
            Apply
          </Link>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 880, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) 24px 32px', textAlign: 'center' }}>
          <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, padding: '6px 14px', background: ACCENT_BG, borderRadius: 999 }}>
            Before we pitch you anything
          </span>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: 0,
              marginTop: 24,
            }}
          >
            Let&apos;s answer the questions <span style={{ color: ACCENT }}>you actually have.</span>
          </h1>
          <p style={{ fontFamily: BODY, fontSize: 18, color: MUTED, lineHeight: 1.55, marginTop: 20, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            We&apos;ve sold this enough times to know what every founder asks before they apply. Here they are, in order of skepticism.
          </p>
        </section>

        {/* FAQ list */}
        <section style={{ maxWidth: 880, margin: '0 auto', padding: '32px 24px' }}>
          {FAQS.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
          ))}
        </section>

        {/* CTA card */}
        <section style={{ maxWidth: 880, margin: '0 auto', padding: '64px 24px' }}>
          <div
            style={{
              background: FG,
              color: BG,
              borderRadius: 24,
              padding: 'clamp(36px, 5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 18,
            }}
          >
            <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: BG, opacity: 0.7 }}>
              No more questions?
            </span>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              See if we&apos;re a fit.
            </h3>
            <p style={{ fontFamily: BODY, fontSize: 16, lineHeight: 1.55, margin: 0, maxWidth: 480, color: BG, opacity: 0.85 }}>
              60-second qualifier. We&apos;ll tell you straight if we&apos;re not the right call.
            </p>
            <Link
              href="/apply"
              style={{
                marginTop: 12,
                padding: '16px 28px',
                background: ACCENT,
                color: '#fff',
                fontFamily: BODY,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              Start qualifying  →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: `1px solid ${RULE}`, padding: '24px', fontSize: 13, color: MUTED, textAlign: 'center' }}>
          © {new Date().getFullYear()} DFY Content
        </footer>
      </div>
    </>
  );
}

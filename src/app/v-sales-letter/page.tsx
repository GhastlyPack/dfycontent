'use client';

import Link from 'next/link';
import { TrackVariant } from '@/components/TrackVariant';

/**
 * /v-sales-letter — Long-form direct response.
 * Thesis: Storytelling sells. Single column ~720px, narrative flow,
 * subheads at scroll-pause points, multiple CTAs, P.S. at end.
 * Test: classic copywriting against modern aesthetics.
 */

const BG = '#fefefe';
const FG = '#181818';
const ACCENT = '#d33a00';
const MUTED = '#525252';

const BODY: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 19,
  lineHeight: 1.7,
  color: FG,
};

function CTAButton({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ margin: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Link
        href="/apply"
        style={{
          display: 'inline-block',
          padding: '20px 40px',
          background: ACCENT,
          color: '#fff',
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          fontSize: 17,
          fontWeight: 700,
          borderRadius: 8,
          boxShadow: '0 6px 16px rgba(211, 58, 0, 0.32)',
        }}
      >
        {children}
      </Link>
      {sub && (
        <span style={{ marginTop: 10, fontSize: 13, color: MUTED, fontFamily: 'var(--font-body)' }}>
          {sub}
        </span>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-sales-letter" />
      <div style={{ background: BG, minHeight: '100vh', paddingBottom: 80 }}>
        {/* Minimal header — direct response pages keep this small */}
        <header style={{ padding: '24px 32px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: FG,
            }}
          >
            DFY Content
          </Link>
        </header>

        <article style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px 0' }}>
          {/* Pre-head */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0, marginBottom: 16 }}>
            An open letter to founders who hate filming
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(34px, 5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: FG,
              margin: 0,
            }}
          >
            Why <span style={{ color: ACCENT, fontStyle: 'italic' }}>two hours</span> of your time is now worth a year of content.
          </h1>

          <p style={{ ...BODY, marginTop: 32 }}>
            Dear founder,
          </p>

          <p style={BODY}>
            If you&apos;ve made it to this page, I&apos;m going to assume something about you.
            You know you should be posting more. You know your audience is on TikTok, Instagram,
            and LinkedIn — and that they&apos;re finding{' '}
            <em>somebody else&apos;s</em> face instead of yours.
          </p>

          <p style={BODY}>
            And you&apos;ve probably tried. You&apos;ve set the iPhone up on a tripod, blocked off a
            morning, recorded 14 takes, hated all of them, edited one, posted it, watched it
            flop, and quietly retreated.
          </p>

          <p style={BODY}>
            I&apos;m writing to tell you there&apos;s a better way. And it takes <strong>two
            hours</strong>. Once.
          </p>

          <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 28, fontWeight: 400, color: FG, marginTop: 56, marginBottom: 20, letterSpacing: '-0.005em' }}>
            Here&apos;s what we actually do.
          </h2>

          <p style={BODY}>
            You sit down with our team — in person, or over a video call — for one 1-2 hour
            studio session. We capture your face, the way you actually talk, the linguistic
            tics that make you, you. This becomes the corpus.
          </p>

          <p style={BODY}>
            From that point on:
          </p>

          <ul style={{ ...BODY, paddingLeft: 24 }}>
            <li><strong>Our writers script every piece.</strong> Around your audience, your
              offer, what&apos;s converting this week. Most agencies charge $5,000+ a month for
              this service alone. Here, it&apos;s the foundation, not the upsell.</li>
            <li style={{ marginTop: 12 }}><strong>Your AI clone delivers.</strong> Trained on
              you. Indistinguishable from the real thing — even friends mistake it for actual
              filming.</li>
            <li style={{ marginTop: 12 }}><strong>Our editors polish.</strong> Hooks, cuts,
              captions, B-roll, thumbnails. Broadcast-quality output every time.</li>
            <li style={{ marginTop: 12 }}><strong>We publish.</strong> To every platform you
              live on. You approve. We post. Engagement comes back to your real account.</li>
          </ul>

          <p style={BODY}>
            Thirty pieces a month. In your voice. For the next twelve months. From a single
            two-hour session you&apos;ll do exactly once.
          </p>

          <CTAButton sub="60-second qualification. No commitment.">
            See if I qualify  →
          </CTAButton>

          <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 28, fontWeight: 400, color: FG, marginTop: 56, marginBottom: 20 }}>
            What this is worth, plainly.
          </h2>

          <p style={BODY}>
            A content team — strategist, scriptwriter, videographer, editor, social manager —
            costs $20,000–40,000 a month to assemble in 2026. We replace four of those five
            roles. The studio session is the only piece of you that&apos;s required.
          </p>

          <p style={BODY}>
            We&apos;re not the cheapest option. Our floor is $2k/mo because the work behind
            that price tag is real. Below that, we can&apos;t deliver something we&apos;d
            stand behind. We&apos;re honest about that — it&apos;s the first question we
            ask on the qualifier.
          </p>

          <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 28, fontWeight: 400, color: FG, marginTop: 56, marginBottom: 20 }}>
            Who this is for.
          </h2>

          <p style={BODY}>
            Founders, operators, coaches, consultants — anyone whose face <em>should</em> be
            on social, but whose calendar is already at capacity. If you&apos;d rather spend
            your hours on the business than on a tripod, we built this for you.
          </p>

          <p style={BODY}>
            If you can&apos;t carve out two hours of your time — even once — this is not for
            you, and I&apos;ll tell you that straight on the qualifier.
          </p>

          <CTAButton sub="Takes about 60 seconds. We&apos;re honest if it&apos;s not a fit.">
            Run the 60-second check  →
          </CTAButton>

          <p style={{ ...BODY, marginTop: 56, fontStyle: 'italic', color: MUTED }}>
            P.S. — If you read this far and you&apos;re still on the fence, here&apos;s the
            short version: <strong>two hours of your life, in exchange for the year of content
            you should have been making.</strong> If that math doesn&apos;t move you,
            it&apos;s probably not the right time.
          </p>
        </article>
      </div>
    </>
  );
}

import Link from 'next/link';

/**
 * /variants — Internal team review page.
 * Lists every variant we've shipped so reviewers can click through
 * each and shortlist the ones worth A/B testing.
 */

const VARIANTS = [
  {
    group: 'Audience copy variants (same architecture, audience-specific copy)',
    items: [
      { slug: '/', name: 'Default — Founders', desc: 'Current production lander. Long-form, indigo, friendly SaaS.' },
      { slug: '/business-owner', name: 'Business Owners', desc: 'Same layout, "Your customers are on social. Now you are too."' },
      { slug: '/creator', name: 'Creators', desc: '"Post every day. Without filming every day."' },
      { slug: '/coach', name: 'Coaches & Consultants', desc: '"Build authority. Attract clients. Without the camera."' },
    ],
  },
  {
    group: 'Architectural variants (different layout + design language)',
    items: [
      { slug: '/v-minimal', name: 'Brutalist Minimal', desc: 'Mono type, black/white, one sentence, one CTA. Thesis: less converts the sophisticated.' },
      { slug: '/v-editorial', name: 'Editorial / Magazine', desc: 'Serif, cream paper, numbered articles, pull quote. Thesis: premium positioning.' },
      { slug: '/v-sales-letter', name: 'Long-form Sales Letter', desc: 'Single column, "Dear founder", classic direct response. Thesis: storytelling sells.' },
      { slug: '/v-bento', name: 'Bento Dashboard', desc: 'Linear / Vercel aesthetic, dense panel grid. Thesis: tech-forward feels like product.' },
      { slug: '/v-video', name: 'Video-first', desc: 'Big video placeholder hero + video testimonials. Thesis: show, don\'t tell.' },
      { slug: '/v-faq', name: 'FAQ-led', desc: 'Hero is a question. Big FAQ accordion handles objections. Thesis: skeptics convert when answered.' },
      { slug: '/v-stats', name: 'Stats-first', desc: 'Massive "30×" as hero. Numbers everywhere. Thesis: evidence-driven buyers.' },
      { slug: '/v-testimonials', name: 'Testimonial Wall', desc: 'Hero is a testimonial. Wall of quotes. Thesis: peers > us.' },
      { slug: '/v-before-after', name: 'Before / After', desc: 'Side-by-side comparison table. Thesis: pain-aware buyers see the gap.' },
      { slug: '/v-dark', name: 'Premium Dark Tech', desc: 'Linear / Vercel-style polished dark. Thesis: restraint signals quality.' },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#f5f5f5', minHeight: '100vh', fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
      <header style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: 0 }}>
            Internal · team review
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-grotesk), system-ui, sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              margin: '12px 0 0',
              lineHeight: 1.05,
            }}
          >
            14 lander variants. Pick the ones worth testing.
          </h1>
          <p style={{ marginTop: 12, color: '#aaa', fontSize: 15, maxWidth: 640, lineHeight: 1.55 }}>
            All 14 use the same funnel underneath (Customer.io attribution by{' '}
            <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>
              lead.variant
            </code>
            ), so we can A/B them and segment conversion by ad angle. Click any card to view live.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 32px 96px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        {VARIANTS.map((group) => (
          <section key={group.group}>
            <h2
              style={{
                fontFamily: 'var(--font-grotesk), system-ui, sans-serif',
                fontSize: 18,
                fontWeight: 600,
                margin: 0,
                marginBottom: 20,
                color: '#fff',
                paddingBottom: 12,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {group.group}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {group.items.map((v) => (
                <Link
                  key={v.slug}
                  href={v.slug}
                  style={{
                    background: '#15171b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    transition: 'border-color .15s, background .15s',
                  }}
                  className="variant-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <code
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 12,
                        color: '#7c5cff',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {v.slug}
                    </code>
                    <span style={{ color: '#666', fontSize: 13 }}>↗</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-grotesk), system-ui, sans-serif',
                      fontSize: 17,
                      fontWeight: 600,
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {v.name}
                  </h3>
                  <p style={{ fontSize: 13, color: '#9aa0aa', lineHeight: 1.55, margin: 0 }}>{v.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section
          style={{
            background: 'linear-gradient(135deg, #1f1235 0%, #0a0a0a 100%)',
            borderRadius: 16,
            padding: 32,
            border: '1px solid rgba(124, 92, 255, 0.2)',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-grotesk)', fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.015em' }}>
            What to look for when reviewing
          </h3>
          <ul style={{ marginTop: 16, color: '#bbb', fontSize: 14, lineHeight: 1.7 }}>
            <li>
              <strong style={{ color: '#fff' }}>First 3 seconds:</strong> can you tell what we do?
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Above the fold CTA:</strong> are you tempted to click?
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Believability:</strong> does it feel real, or templated?
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Match to your customer:</strong> which one would YOUR ideal lead actually open?
            </li>
          </ul>
          <p style={{ marginTop: 16, color: '#aaa', fontSize: 13 }}>
            Pick 2-3 to ship as paid traffic variants. We&apos;ll segment by{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>
              lead.variant
            </code>{' '}
            in Customer.io to compare qualified-rate, DQ-rate, and booking-rate.
          </p>
        </section>
      </main>
    </div>
  );
}

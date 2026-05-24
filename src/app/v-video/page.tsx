'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrackVariant } from '@/components/TrackVariant';
import { Reveal, StaggerChild, StaggerGroup } from '@/components/motion-atoms';

/**
 * /v-video — Show, don't tell.
 * Motion: pulsing play button halo, cinematic hover scales on thumbs,
 * "LIVE" timestamp pulse.
 */

const BG = '#0f0f10';
const PANEL = '#191a1c';
const FG = '#ffffff';
const MUTED = '#a0a3aa';
const ACCENT = '#ff3366';
const BORDER = 'rgba(255,255,255,0.08)';
const DISPLAY = 'var(--font-grotesk), system-ui, sans-serif';
const BODY = 'var(--font-body), system-ui, sans-serif';

function PlayBadge({ size = 56, pulse = false }: { size?: number; pulse?: boolean }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {pulse && (
        <>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: '#fff',
              animation: 'dfyPulseHalo 2s ease-out infinite',
            }}
          />
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: '#fff',
              animation: 'dfyPulseHalo 2s ease-out 0.6s infinite',
            }}
          />
        </>
      )}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.96)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 12 12" fill="none">
          <path d="M3 2l6 4-6 4V2z" fill="#0f0f10" />
        </svg>
      </div>
    </div>
  );
}

function VideoThumb({ ratio = '9/16', label, runtime, name, role, hueShift = 0 }: { ratio?: string; label: string; runtime: string; name: string; role: string; hueShift?: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div
        style={{
          aspectRatio: ratio,
          borderRadius: 14,
          background: `linear-gradient(135deg, #2a1f4a 0%, ${ACCENT}33 60%, #1a1a2e 100%)`,
          filter: `hue-rotate(${hueShift}deg)`,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <PlayBadge size={48} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: FG, opacity: 0.9 }}>{label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: FG, background: 'rgba(0,0,0,0.6)', padding: '3px 6px', borderRadius: 4 }}>{runtime}</div>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, color: FG }}>{name}</div>
        <div style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginTop: 2 }}>{role}</div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      <TrackVariant slug="v-video" />
      <div style={{ background: BG, color: FG, minHeight: '100vh', fontFamily: BODY }}>
        <header style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', color: FG }}>DFY Content</Link>
          <Link href="/apply" style={{ padding: '10px 18px', background: ACCENT, color: FG, fontFamily: BODY, fontSize: 13, fontWeight: 600, borderRadius: 999 }}>Apply</Link>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 64px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: ACCENT,
                    boxShadow: `0 0 12px ${ACCENT}`,
                    animation: 'dfyBlink 1.6s steps(2) infinite',
                  }}
                />
                90-second overview · live
              </span>
              <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, maxWidth: 900 }}>
                Watch what 30+ pieces a month <span style={{ color: ACCENT }}>looks like.</span>
              </h1>
              <p style={{ fontSize: 17, color: MUTED, maxWidth: 600, lineHeight: 1.55, margin: 0 }}>
                We talk about it. The video shows it. Two-hour setup, then your face on every platform — without you ever filming again.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              style={{
                aspectRatio: '16/9',
                maxHeight: 640,
                borderRadius: 20,
                background: `linear-gradient(135deg, #1f1235 0%, ${ACCENT}33 50%, #0a1a2e 100%)`,
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${BORDER}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
              }}
            >
              <PlayBadge size={88} pulse />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 18, color: FG }}>
                    DFY Content — how it actually works
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>From kickoff to 14-day live launch</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: FG, background: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: 6 }}>
                  01:34
                </div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.35}>
            <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/apply" style={{ padding: '16px 28px', background: FG, color: BG, fontFamily: BODY, fontSize: 15, fontWeight: 600, borderRadius: 999 }}>
                Apply  →
              </Link>
              <span style={{ alignSelf: 'center', fontSize: 13, color: MUTED }}>60-second qualification</span>
            </div>
          </Reveal>
        </section>

        {/* Video testimonials with stagger */}
        <section style={{ borderTop: `1px solid ${BORDER}`, padding: '64px 24px', background: PANEL }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>
                  Watch the testimonials
                </span>
                <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: 0, marginTop: 12, letterSpacing: '-0.02em' }}>
                  Founders, in their own faces.
                </h2>
              </div>
            </Reveal>

            <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} staggerDelay={0.1}>
              <StaggerChild><VideoThumb label="“DMs are full.”" runtime="0:42" name="Jordan M." role="Founder, B2B SaaS" hueShift={0} /></StaggerChild>
              <StaggerChild><VideoThumb label="“Friends thought I filmed it.”" runtime="0:31" name="Priya S." role="Consultant" hueShift={40} /></StaggerChild>
              <StaggerChild><VideoThumb label="“4k → 18k followers.”" runtime="0:55" name="Marcus T." role="Agency owner" hueShift={80} /></StaggerChild>
              <StaggerChild><VideoThumb label="“Two-hour setup. Paid off forever.”" runtime="0:38" name="Sasha K." role="Operator" hueShift={120} /></StaggerChild>
            </StaggerGroup>
          </div>
        </section>

        <section style={{ padding: '80px 24px', textAlign: 'center' }}>
          <Reveal>
            <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
              See if we&apos;re a fit. <span style={{ color: ACCENT }}>60 seconds.</span>
            </h3>
            <div style={{ marginTop: 28 }}>
              <Link href="/apply" style={{ padding: '18px 32px', background: ACCENT, color: FG, fontFamily: BODY, fontSize: 15, fontWeight: 700, borderRadius: 999 }}>
                Apply  →
              </Link>
            </div>
          </Reveal>
        </section>

        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '20px', fontSize: 12, color: MUTED, textAlign: 'center' }}>
          © {new Date().getFullYear()} DFY Content
        </footer>
      </div>
    </>
  );
}

'use client';

import { motion } from 'framer-motion';
import { theme } from '@/lib/theme';
import {
  Button,
  Container,
  Eyebrow,
  PillTag,
  Section,
} from '@/components/atoms';

export function Hero() {
  return (
    <Section style={{ paddingTop: 32, position: 'relative', overflow: 'hidden' }}>
      <BackdropBlobs />
      <Container>
        <div className="dfy-hero-grid" style={{ display: 'grid', gap: 56, alignItems: 'center' }}>
          {/* Text column — CSS-animated so it renders immediately on first paint */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="dfy-fade-up dfy-fade-up-1">
              <Eyebrow>Done-for-you content for busy founders</Eyebrow>
            </div>
            <h1 className="h-hero dfy-fade-up dfy-fade-up-2" style={{ margin: 0 }}>
              Grow Your Brand With Content That{' '}
              <span style={{ color: theme.palette.accent }}>Sounds Like You.</span>
            </h1>
            <p className="t-lead dfy-fade-up dfy-fade-up-3" style={{ margin: 0, maxWidth: 540 }}>
              We clone your face and voice with AI, then ship the social content
              you should be posting — at scale, on autopilot, in your voice.
            </p>
            <div
              className="dfy-fade-up dfy-fade-up-4"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}
            >
              <Button href="/apply" variant="primary" size="lg">
                Get Started  →
              </Button>
              <Button href="#how-it-works" variant="ghost" size="lg">
                See how it works
              </Button>
            </div>
            <div
              className="dfy-fade-up dfy-fade-up-5"
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: theme.palette.fgMuted,
                fontSize: 13,
                fontFamily: theme.fonts.body,
              }}
            >
              <AvatarStack />
              <span>
                <strong style={{ color: theme.palette.fg, fontWeight: 700 }}>50+</strong>{' '}
                founders trust us with their content
              </span>
            </div>
          </div>

          {/* Visual column */}
          <HeroVisual />
        </div>
      </Container>
    </Section>
  );
}

function HeroVisual() {
  return (
    <div
      className="dfy-hero-visual dfy-fade-scale"
      style={{
        position: 'relative',
        minHeight: 480,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Central content card */}
      <div
        style={{
          position: 'relative',
          width: 'min(320px, 80%)',
          aspectRatio: '3 / 4',
          borderRadius: theme.radius.xxl,
          background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`,
          boxShadow: '0 24px 60px rgba(108, 92, 231, 0.32), 0 8px 20px rgba(108, 92, 231, 0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Soft circle highlight */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.18)',
            filter: 'blur(24px)',
          }}
        />
        {/* "Your face" placeholder mark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            color: '#fff',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2" />
              <path
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontFamily: theme.fonts.display, fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>
            Your face. Your voice.
          </div>
          <div
            style={{
              fontSize: 13,
              opacity: 0.85,
              fontFamily: theme.fonts.body,
              maxWidth: 200,
              lineHeight: 1.5,
            }}
          >
            Cloned once, multiplied across every platform — by us.
          </div>
        </div>
      </div>

      {/* Floating platform tags — JS-animated bobbing (cosmetic, ok to be JS-dependent) */}
      <FloatingTag label="Instagram" color="#e1306c" position={{ top: '10%', left: '-2%' }} bobDur={4} />
      <FloatingTag label="TikTok" color="#000000" position={{ top: '24%', right: '0%' }} bobDur={5} />
      <FloatingTag label="LinkedIn" color="#0a66c2" position={{ bottom: '24%', left: '-4%' }} bobDur={4.5} />
      <FloatingTag label="YouTube Shorts" color="#ff0000" position={{ bottom: '8%', right: '-2%' }} bobDur={5.5} />
    </div>
  );
}

function FloatingTag({
  label,
  color,
  position,
  bobDur,
}: {
  label: string;
  color: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  bobDur: number;
}) {
  return (
    <div
      style={{ position: 'absolute', ...position, zIndex: 2 }}
      className="dfy-fade-up dfy-fade-up-3"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: bobDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PillTag label={label} dotColor={color} />
      </motion.div>
    </div>
  );
}

function BackdropBlobs() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          left: '-10%',
          width: 480,
          height: 480,
          borderRadius: 999,
          background: `radial-gradient(circle at center, ${theme.palette.accentSoft}55 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -120,
          right: '-8%',
          width: 520,
          height: 520,
          borderRadius: 999,
          background: `radial-gradient(circle at center, ${theme.palette.accent}33 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}

function AvatarStack() {
  const colors = [
    [theme.palette.accent, theme.palette.accentSoft],
    ['#f59e0b', '#fcd34d'],
    ['#10b981', '#6ee7b7'],
    ['#ef4444', '#fca5a5'],
  ] as const;
  return (
    <div style={{ display: 'inline-flex' }}>
      {colors.map(([a, b], i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
            border: `2px solid ${theme.palette.bg}`,
            marginLeft: i === 0 ? 0 : -8,
          }}
        />
      ))}
    </div>
  );
}

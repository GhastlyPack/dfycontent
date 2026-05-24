'use client';

import type { ReactNode } from 'react';
import { theme } from '@/lib/theme';
import {
  Container,
  ScrollStagger,
  Section,
  SectionTitle,
  StaggerItem,
} from '@/components/atoms';

export function BentoFeatures() {
  return (
    <Section id="features" style={{ background: theme.palette.bg }}>
      <Container>
        <SectionTitle
          eyebrow="What we do"
          title="Everything you'd hire a 4-person content team to do, in one place."
          subtitle="Strategy, capture, production, and posting — handled end-to-end so you can stay focused on the business."
        />

        <ScrollStagger
          className="dfy-bento"
          style={{ display: 'grid', gap: 16, marginTop: 56, gridTemplateColumns: '1fr' }}
        >
          <StaggerItem className="dfy-bento-cell">
            <FeatureCard
              title="AI Clone Setup"
              description="One 1-2 hour session captures your face, voice, and the way you actually talk. Done forever."
              visual={<CloneVisual />}
            />
          </StaggerItem>
          <StaggerItem className="dfy-bento-cell">
            <FeatureCard
              title="Content Strategy"
              description="We plan a 30-day calendar around your audience, your goals, and what's working right now."
              visual={<CalendarVisual />}
            />
          </StaggerItem>
          <StaggerItem className="dfy-bento-cell">
            <FeatureCard
              title="Multi-Platform Publishing"
              description="TikTok, Instagram, YouTube Shorts, LinkedIn, X. Wherever your audience scrolls."
              visual={<PlatformsVisual />}
            />
          </StaggerItem>
          <StaggerItem className="dfy-bento-cell dfy-bento-wide">
            <FeatureCard
              wide
              title="End-To-End Editing & Posting"
              description="Hooks, cuts, captions, B-roll, thumbnails. Our editors handle the polish. You handle the approval — one tap to post."
              visual={<EditingVisual />}
            />
          </StaggerItem>
        </ScrollStagger>
      </Container>
    </Section>
  );
}

function FeatureCard({
  title,
  description,
  visual,
  wide,
}: {
  title: string;
  description: string;
  visual: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      style={{
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xl,
        padding: 28,
        height: '100%',
        display: 'flex',
        flexDirection: wide ? 'row' : 'column',
        gap: 20,
        boxShadow: theme.shadow.card,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft accent corner */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: 999,
          background: `radial-gradient(circle at center, ${theme.palette.accentSoft}30 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 className="h-card" style={{ margin: 0 }}>
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            color: theme.palette.fgMuted,
            fontSize: 15,
            lineHeight: 1.55,
            fontFamily: theme.fonts.body,
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ flex: wide ? '0 0 50%' : '1', position: 'relative', display: 'flex' }}>
        {visual}
      </div>
    </div>
  );
}

// ───────── Placeholder visuals (abstract, designerly) ─────────

function CloneVisual() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 140,
        borderRadius: theme.radius.lg,
        background: `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`,
        border: `1px solid ${theme.palette.borderSoft}`,
        padding: 16,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.accentSoft})`,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 8, borderRadius: 4, background: theme.palette.bgSubtle, width: '70%' }} />
        <div style={{ height: 6, borderRadius: 4, background: theme.palette.bgSubtle, width: '50%' }} />
        <div style={{ height: 6, borderRadius: 4, background: theme.palette.bgSubtle, width: '85%' }} />
      </div>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: theme.palette.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l4 4 6-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function CalendarVisual() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 140,
        borderRadius: theme.radius.lg,
        background: theme.palette.surfaceMuted,
        border: `1px solid ${theme.palette.borderSoft}`,
        padding: 14,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 6,
      }}
    >
      {Array.from({ length: 21 }).map((_, i) => {
        const filled = [2, 4, 7, 9, 12, 14, 17, 19].includes(i);
        return (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 6,
              background: filled ? theme.palette.accent : theme.palette.bg,
              opacity: filled ? 1 : 0.7,
            }}
          />
        );
      })}
    </div>
  );
}

function PlatformsVisual() {
  const items = [
    { label: 'IG', color: '#e1306c' },
    { label: 'TT', color: '#000' },
    { label: 'LI', color: '#0a66c2' },
    { label: 'YT', color: '#ff0000' },
  ];
  return (
    <div
      style={{
        width: '100%',
        minHeight: 140,
        borderRadius: theme.radius.lg,
        background: theme.palette.surfaceMuted,
        border: `1px solid ${theme.palette.borderSoft}`,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      {items.map((p) => (
        <div
          key={p.label}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: p.color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontFamily: theme.fonts.display,
            fontSize: 14,
            letterSpacing: '-0.02em',
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
  );
}

function EditingVisual() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 180,
        borderRadius: theme.radius.lg,
        background: theme.palette.surfaceMuted,
        border: `1px solid ${theme.palette.borderSoft}`,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Video timeline mock */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            flex: 1,
            height: 32,
            borderRadius: 6,
            background: `linear-gradient(90deg, ${theme.palette.accent} 0%, ${theme.palette.accent} 35%, ${theme.palette.bg} 35%, ${theme.palette.bg} 100%)`,
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, height: 14, borderRadius: 4, background: theme.palette.bg }} />
        <div style={{ flex: 2, height: 14, borderRadius: 4, background: theme.palette.accentSoft }} />
        <div style={{ flex: 1, height: 14, borderRadius: 4, background: theme.palette.bg }} />
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 3, height: 14, borderRadius: 4, background: theme.palette.bg }} />
        <div style={{ flex: 1, height: 14, borderRadius: 4, background: theme.palette.accent }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: theme.palette.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 2l6 4-6 4V2z" fill="#fff" />
          </svg>
        </div>
        <div style={{ flex: 1, height: 4, borderRadius: 999, background: theme.palette.bg, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, width: '40%', background: theme.palette.accent, borderRadius: 999 }} />
        </div>
        <span style={{ fontFamily: theme.fonts.body, fontSize: 12, color: theme.palette.fgMuted, fontWeight: 600 }}>
          0:24 / 1:02
        </span>
      </div>
    </div>
  );
}

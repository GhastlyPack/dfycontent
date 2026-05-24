'use client';

import { theme } from '@/lib/theme';
import {
  Container,
  ScrollStagger,
  Section,
  SectionTitle,
  StaggerItem,
} from '@/components/atoms';

export function StatCards() {
  const stats = [
    { n: '30+', l: 'pieces of content / month, every month', offset: 0 },
    { n: '0', l: 'hours you spend filming or editing', offset: 24 },
    { n: '14d', l: 'from setup to your first post going live', offset: 0 },
    { n: '100%', l: 'your face, voice, and personal brand', offset: 24 },
  ];

  return (
    <Section id="why-us" style={{ background: theme.palette.bgSubtle }}>
      <Container>
        <SectionTitle
          eyebrow="Why teams choose us"
          title="Built for founders who don't have time, but need the reach."
          subtitle="We designed the entire system around your calendar — not the other way around."
        />

        <ScrollStagger
          className="dfy-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 16,
            marginTop: 56,
          }}
        >
          {stats.map((s) => (
            <StaggerItem key={s.n} style={{ paddingTop: 0 }} className="dfy-stat-cell">
              <StatCard n={s.n} l={s.l} />
            </StaggerItem>
          ))}
        </ScrollStagger>
      </Container>
    </Section>
  );
}

function StatCard({ n, l }: { n: string; l: string }) {
  return (
    <div
      style={{
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xl,
        padding: 28,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.shadow.card,
        minHeight: 200,
      }}
    >
      {/* Top: big number + accent dot */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          className="h-section"
          style={{
            margin: 0,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1,
          }}
        >
          {n}
        </span>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: theme.palette.accent,
            boxShadow: `0 0 0 5px ${theme.palette.accentBg}`,
            flexShrink: 0,
          }}
        />
      </div>
      {/* Bottom: label */}
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 15,
          color: theme.palette.fgMuted,
          lineHeight: 1.5,
        }}
      >
        {l}
      </span>
    </div>
  );
}

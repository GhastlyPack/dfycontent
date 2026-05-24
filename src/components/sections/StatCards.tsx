'use client';

import { theme } from '@/lib/theme';
import {
  Container,
  ScrollStagger,
  Section,
  SectionTitle,
  StaggerItem,
} from '@/components/atoms';
import type { Variant } from '@/lib/variants';

export function StatCards({ variant }: { variant: Variant }) {
  const stats = [
    { n: '30+', l: 'pieces of content / month, every month' },
    { n: '2hrs', l: 'your one-time setup. Then never again.' },
    { n: '14d', l: 'from kickoff to first post going live' },
    { n: '100%', l: 'your face, voice, and scripts in your tone' },
  ];

  return (
    <Section id="why-us" style={{ background: theme.palette.bgSubtle }}>
      <Container>
        <SectionTitle
          eyebrow="Why teams choose us"
          title={variant.stats.title}
          subtitle={variant.stats.sub}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          className="h-section"
          style={{
            margin: 0,
            fontSize: 'clamp(36px, 5vw, 60px)',
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

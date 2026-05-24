'use client';

import { theme } from '@/lib/theme';
import {
  Container,
  ScrollStagger,
  Section,
  SectionTitle,
  StaggerItem,
  StepCircle,
} from '@/components/atoms';
import type { Variant } from '@/lib/variants';

export function Steps({ variant }: { variant: Variant }) {
  const steps = [
    {
      n: 1,
      title: 'You spend 2 hours with us. Once.',
      body: "Studio session — in person or remote — captures your face, voice, and the way you actually talk. That's the only time investment you'll ever make on this.",
    },
    {
      n: 2,
      title: 'We script. Your clone delivers.',
      body: "Our writers craft every piece around your audience and goals. Your AI clone — trained on you — performs them. Scripting alone is the headline service most agencies charge for separately. With us, it's included.",
    },
    {
      n: 3,
      title: 'We edit, publish, and stay in your voice.',
      body: "Our editors polish the cuts, captions, and hooks. We post to every platform you're on. Engagement, comments, DMs all come back to your real account — in your real voice.",
    },
  ];

  return (
    <Section id="how-it-works">
      <Container>
        <SectionTitle
          eyebrow="How it works"
          title={variant.steps.title}
          subtitle={variant.steps.sub}
        />

        <ScrollStagger
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 56,
            maxWidth: 760,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {steps.map((s) => (
            <StaggerItem key={s.n}>
              <StepRow {...s} />
            </StaggerItem>
          ))}
        </ScrollStagger>
      </Container>
    </Section>
  );
}

function StepRow({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div
      style={{
        background: theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xl,
        padding: 24,
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        boxShadow: theme.shadow.sm,
      }}
    >
      <StepCircle n={n} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <h3 className="h-card" style={{ margin: 0 }}>
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: theme.fonts.body,
            fontSize: 15,
            lineHeight: 1.55,
            color: theme.palette.fgMuted,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

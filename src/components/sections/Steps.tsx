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

export function Steps() {
  const steps = [
    {
      n: 1,
      title: 'We Capture You',
      body: 'One studio session — in person or remote, 1-2 hours. We capture your face, your voice, and the way you actually talk. Done forever.',
    },
    {
      n: 2,
      title: 'We Produce Your Content',
      body: 'Your AI clone generates new pieces every week, reviewed and polished by our human editors. You see them before they go live.',
    },
    {
      n: 3,
      title: 'We Publish For You',
      body: "You approve. We post — to every platform you're on. Engagement, comments, DMs come back to your real account, in your real voice.",
    },
  ];

  return (
    <Section id="how-it-works">
      <Container>
        <SectionTitle
          eyebrow="How it works"
          title="Get started in 3 simple steps."
          subtitle="From kickoff to your first post going live in 14 days. No surprises, no scope creep."
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

'use client';

import { theme } from '@/lib/theme';
import {
  Container,
  ScrollStagger,
  Section,
  SectionTitle,
  Star,
  StaggerItem,
} from '@/components/atoms';
import type { Variant } from '@/lib/variants';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating?: number;
  big?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I went from posting once a month to 4x a week. My DMs are full. I haven't touched a camera in 90 days. The scripting alone was worth what we pay.",
    name: 'Jordan M.',
    role: 'Founder, B2B SaaS',
    initials: 'JM',
    rating: 5,
    big: true,
  },
  {
    quote:
      'The clone is uncanny — friends thought I was actually filming TikToks. The team handles literally everything, including the scripts.',
    name: 'Priya S.',
    role: 'Consultant',
    initials: 'PS',
    rating: 5,
  },
  {
    quote:
      'Saved me 10 hours a week and grew my LinkedIn from 4k to 18k followers in 4 months. Two-hour setup, paid back forever.',
    name: 'Marcus T.',
    role: 'Agency owner',
    initials: 'MT',
    rating: 5,
  },
  {
    quote:
      "Honest, fair pricing. They told me upfront what I'd get. Showed up on day 14 with the content live — and it sounded like me.",
    name: 'Sasha K.',
    role: 'Operator',
    initials: 'SK',
    rating: 5,
  },
];

export function Testimonials({ variant }: { variant: Variant }) {
  return (
    <Section id="testimonials">
      <Container>
        <SectionTitle
          eyebrow="Real founders, real results"
          title={variant.testimonials.title}
          subtitle={variant.testimonials.sub}
        />

        <ScrollStagger
          className="dfy-testimonial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 16,
            marginTop: 56,
          }}
        >
          {testimonials.map((t, i) => (
            <StaggerItem
              key={t.name}
              className={t.big ? 'dfy-testimonial-cell dfy-testimonial-big' : 'dfy-testimonial-cell'}
              style={{ gridRow: 'auto' }}
            >
              <TestimonialCard t={t} index={i} />
            </StaggerItem>
          ))}
        </ScrollStagger>
      </Container>
    </Section>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const accentRotate = [0, -1.5, 1, -0.5][index % 4];
  return (
    <div
      style={{
        background: t.big
          ? `linear-gradient(135deg, ${theme.palette.accentBg} 0%, ${theme.palette.surface} 100%)`
          : theme.palette.surface,
        border: `1px solid ${theme.palette.borderSoft}`,
        borderRadius: theme.radius.xl,
        padding: 28,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
        boxShadow: theme.shadow.card,
        transform: `rotate(${accentRotate}deg)`,
      }}
    >
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
          <Star key={i} filled size={16} />
        ))}
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: theme.fonts.display,
          fontSize: t.big ? 22 : 17,
          fontWeight: 500,
          lineHeight: 1.4,
          color: theme.palette.fg,
          letterSpacing: '-0.01em',
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.accentSoft})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: theme.fonts.display,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          {t.initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 14,
              fontWeight: 700,
              color: theme.palette.fg,
            }}
          >
            {t.name}
          </span>
          <span
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 12,
              color: theme.palette.fgMuted,
            }}
          >
            {t.role}
          </span>
        </div>
      </div>
    </div>
  );
}

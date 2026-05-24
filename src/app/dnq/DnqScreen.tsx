'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { theme } from '@/lib/theme';
import {
  Button,
  Container,
  Eyebrow,
  ScrollReveal,
  Section,
} from '@/components/atoms';

export function DnqScreen() {
  const search = useSearchParams();
  const reasonParam = search.get('reason');
  const reason =
    reasonParam === 'setup'
      ? {
          title: 'We need 1-2 hours from you.',
          body:
            "Just once. Without your face on camera and your voice in our training set, there's literally nothing for us to clone. Come back when you can carve out the time.",
          cta: 'Save this for later',
        }
      : {
          title: "Budget isn't there yet.",
          body:
            'Our floor is $2k/mo because cloning, scripting, editing and posting takes real production hours. Anything less and the work gets cheap — for you and for us.',
          cta: 'Get our free playbook',
        };

  return (
    <Section>
      <Container>
        <ScrollReveal style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Eyebrow>Not a fit — yet.</Eyebrow>
          <h1 className="h-section" style={{ margin: 0 }}>
            We don&apos;t think this is going to{' '}
            <span style={{ color: theme.palette.accent }}>work right now.</span>
          </h1>
          <p className="t-lead" style={{ margin: 0 }}>
            {reason.body}
          </p>

          <div
            style={{
              marginTop: 16,
              padding: 28,
              background: theme.palette.surface,
              border: `1px solid ${theme.palette.borderSoft}`,
              borderRadius: theme.radius.xl,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              boxShadow: theme.shadow.card,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <h3 className="h-card" style={{ margin: 0 }}>
                {reason.title}
              </h3>
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: theme.palette.fgSubtle,
                }}
              >
                Why this is a no
              </span>
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {[
                "We won't take your money if we can't deliver.",
                "We've watched too many agencies overpromise. We're not joining them.",
                "When the numbers change, come back. We'll still be here.",
              ].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: 11,
                      fontWeight: 700,
                      color: theme.palette.accent,
                      paddingTop: 4,
                      letterSpacing: '0.04em',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: theme.palette.fg,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <Button>{reason.cta}  →</Button>
            <Link href="/" style={{ display: 'inline-flex' }}>
              <Button variant="ghost">← Back to home</Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

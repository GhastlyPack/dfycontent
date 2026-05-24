'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { theme } from '@/lib/theme';
import { Btn, Eyebrow, TopBar } from '@/components/atoms';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div
        className="dfy-page-section"
        style={{
          flex: 1,
          padding: '88px 48px',
          maxWidth: 920,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        }}
      >
        <Eyebrow>Not a fit — yet.</Eyebrow>
        <h1
          className="dfy-page-h1"
          style={{
            margin: 0,
            fontFamily: theme.fonts.display,
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: theme.fonts.weight,
            letterSpacing: theme.fonts.tracking,
            lineHeight: 0.96,
            color: theme.palette.fg,
          }}
        >
          We don&apos;t think this
          <br />
          <span
            style={{
              color: theme.palette.accent,
              fontStyle: theme.fonts.italic ? 'italic' : 'normal',
            }}
          >
            is going to work.
          </span>
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 20,
            lineHeight: 1.5,
            color: theme.palette.muted,
            maxWidth: 640,
          }}
        >
          {reason.body}
        </p>

        <div
          className="dfy-reason-card"
          style={{
            marginTop: 24,
            padding: 32,
            background: theme.palette.surface,
            border: `1px solid ${theme.palette.border}`,
            borderRadius: theme.direction === 'studio' ? 16 : 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: theme.fonts.display,
                fontSize: 24,
                letterSpacing: theme.fonts.tracking,
              }}
            >
              {reason.title}
            </h3>
            <span
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.palette.muted,
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
              <li
                key={i}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    fontFamily: theme.fonts.mono,
                    fontSize: 11,
                    color: theme.palette.accent,
                    paddingTop: 4,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{ fontSize: 16, lineHeight: 1.55, color: theme.palette.fg }}
                >
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn>{reason.cta}  →</Btn>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Btn variant="ghost">← Start over</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
}

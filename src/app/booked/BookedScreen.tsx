'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { theme } from '@/lib/theme';
import { Btn, Eyebrow, TopBar } from '@/components/atoms';

export function BookedScreen() {
  const [email, setEmail] = useState<string>('your email');

  useEffect(() => {
    const e = sessionStorage.getItem('lead.email');
    if (e) setEmail(e);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <div
        style={{
          flex: 1,
          padding: '88px 48px',
          maxWidth: 920,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
        }}
      >
        <Eyebrow>Booking confirmed</Eyebrow>

        <h1
          style={{
            margin: 0,
            fontFamily: theme.fonts.display,
            fontSize: 'clamp(56px, 8vw, 112px)',
            fontWeight: theme.fonts.weight,
            letterSpacing: theme.fonts.tracking,
            lineHeight: 0.92,
            color: theme.palette.fg,
          }}
        >
          You&apos;re on the
          <br />
          <span
            style={{
              color: theme.palette.accent,
              fontStyle: theme.fonts.italic ? 'italic' : 'normal',
            }}
          >
            calendar.
          </span>
        </h1>

        <div
          style={{
            background: theme.palette.surface,
            border: `1px solid ${theme.palette.border}`,
            borderRadius: theme.direction === 'studio' ? 20 : 8,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.palette.muted,
                marginBottom: 8,
              }}
            >
              Confirmation sent
            </div>
            <div
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 24,
                fontWeight: theme.fonts.weight,
                letterSpacing: theme.fonts.tracking,
                lineHeight: 1.05,
              }}
            >
              Check {email}
            </div>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 15,
                marginTop: 6,
                color: theme.palette.muted,
              }}
            >
              Calendar invite + Google Meet link are on their way.
            </div>
          </div>

          <div style={{ height: 1, background: theme.palette.border }} />

          <div>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.palette.muted,
                marginBottom: 16,
              }}
            >
              Before the call
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
                'Find 2-3 creators in your space whose content you actually like.',
                "Think about the topics you'd never run out of opinions on.",
                "Bring your audience: who you'd want watching, not who watches now.",
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
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Btn variant="ghost">← Back to home</Btn>
          </Link>
        </div>
      </div>
    </div>
  );
}

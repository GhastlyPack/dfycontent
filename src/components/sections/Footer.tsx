'use client';

import Link from 'next/link';
import { theme } from '@/lib/theme';
import { Container } from '@/components/atoms';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${theme.palette.borderSoft}`,
        paddingTop: 64,
        paddingBottom: 48,
        background: theme.palette.bg,
      }}
    >
      <Container>
        <div
          className="dfy-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Brand + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: `linear-gradient(135deg, ${theme.palette.accent}, ${theme.palette.accentSoft})`,
                }}
              />
              <span
                style={{
                  fontFamily: theme.fonts.display,
                  fontWeight: 700,
                  fontSize: 16,
                  color: theme.palette.fg,
                  letterSpacing: '-0.02em',
                }}
              >
                DFY Content
              </span>
            </Link>
            <p
              style={{
                margin: 0,
                color: theme.palette.fgMuted,
                fontSize: 14,
                lineHeight: 1.55,
                maxWidth: 280,
              }}
            >
              Done-for-you social content. We script, your AI clone delivers, our team publishes.
            </p>
            <Link
              href="/apply"
              style={{
                display: 'inline-block',
                marginTop: 6,
                padding: '10px 18px',
                background: theme.palette.fg,
                color: theme.palette.bg,
                fontFamily: theme.fonts.body,
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 999,
                alignSelf: 'flex-start',
              }}
            >
              Start qualifying  →
            </Link>
          </div>

          <FooterCol heading="Product">
            <FooterLink href="/how-it-works">How it works</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/apply">Apply</FooterLink>
          </FooterCol>

          <FooterCol heading="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/customers">Customers</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol heading="Compare">
            <FooterLink href="/vs/heygen">vs HeyGen</FooterLink>
            <FooterLink href="/vs/synthesia">vs Synthesia</FooterLink>
            <FooterLink href="/vs/hiring-an-agency">vs Hiring an agency</FooterLink>
            <FooterLink href="/vs/doing-it-yourself">vs DIY</FooterLink>
          </FooterCol>

          <FooterCol heading="Legal">
            <FooterLink href="/legal/privacy">Privacy</FooterLink>
            <FooterLink href="/legal/terms">Terms</FooterLink>
            <FooterLink href="mailto:hello@dfycontent.io">hello@dfycontent.io</FooterLink>
          </FooterCol>
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${theme.palette.borderSoft}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: theme.palette.fgMuted }}>
            © {new Date().getFullYear()} DFY Content. All rights reserved.
          </span>
          <span style={{ fontSize: 13, color: theme.palette.fgMuted }}>Made with care.</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: theme.palette.fgSubtle,
        }}
      >
        {heading}
      </span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: theme.fonts.body,
        fontSize: 14,
        color: theme.palette.fgMuted,
        transition: 'color .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = theme.palette.fg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = theme.palette.fgMuted;
      }}
    >
      {children}
    </Link>
  );
}

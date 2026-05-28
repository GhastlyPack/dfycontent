'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { theme } from '@/lib/theme';
import { Button, Container } from '@/components/atoms';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled
          ? `${theme.palette.bg}d8`
          : `${theme.palette.bg}00`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.palette.borderSoft}` : '1px solid transparent',
        transition: 'background .2s, border-color .2s',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 14,
            paddingBottom: 14,
          }}
        >
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span
              style={{
                fontFamily: theme.fonts.display,
                fontWeight: 700,
                fontSize: 17,
                color: theme.palette.fg,
                letterSpacing: '-0.02em',
              }}
            >
              DFY Content
            </span>
          </Link>

          <nav className="dfy-nav-links" style={{ display: 'none', gap: 4 }}>
            <NavLink href="/how-it-works">How it works</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button href="/apply" variant="dark" size="md">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 14px',
        fontFamily: theme.fonts.body,
        fontSize: 14,
        fontWeight: 500,
        color: theme.palette.fgMuted,
        borderRadius: theme.radius.pill,
        transition: 'color .15s, background .15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = theme.palette.fg;
        e.currentTarget.style.background = theme.palette.surfaceMuted;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = theme.palette.fgMuted;
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 9,
        background: `linear-gradient(135deg, ${theme.palette.accent} 0%, ${theme.palette.accentSoft} 100%)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(108, 92, 231, 0.32)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 4l5 8 5-8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

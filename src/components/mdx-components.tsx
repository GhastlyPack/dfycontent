/**
 * MDX element overrides — styles rendered markdown to match our design system.
 * Used by next-mdx-remote/rsc via the `components` option.
 */
import Link from 'next/link';
import type { ReactNode, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { theme } from '@/lib/theme';

const FG = theme.palette.fg;
const MUTED = theme.palette.fgMuted;
const ACCENT = theme.palette.accent;
const ACCENT_BG = theme.palette.accentBg;
const BORDER = theme.palette.borderSoft;
const SURFACE = theme.palette.surface;
const SUBTLE = theme.palette.bgSubtle;

export const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      style={{
        fontFamily: theme.fonts.display,
        fontSize: 'clamp(32px, 4.5vw, 44px)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
        marginTop: 40,
        marginBottom: 20,
        color: FG,
      }}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontFamily: theme.fonts.display,
        fontSize: 'clamp(24px, 3vw, 32px)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginTop: 48,
        marginBottom: 16,
        color: FG,
        scrollMarginTop: 84,
      }}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      style={{
        fontFamily: theme.fonts.display,
        fontSize: 'clamp(20px, 2.5vw, 24px)',
        fontWeight: 700,
        letterSpacing: '-0.015em',
        lineHeight: 1.25,
        marginTop: 32,
        marginBottom: 12,
        color: FG,
        scrollMarginTop: 84,
      }}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      style={{
        margin: '0 0 18px',
        fontSize: 17,
        lineHeight: 1.7,
        color: FG,
        fontFamily: theme.fonts.body,
      }}
    />
  ),
  a: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = !!href && /^https?:\/\//.test(href);
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: 3 }}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <Link
        href={href ?? '#'}
        style={{ color: ACCENT, textDecoration: 'underline', textUnderlineOffset: 3 }}
      >
        {children as ReactNode}
      </Link>
    );
  },
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      style={{
        margin: '0 0 24px',
        padding: 0,
        paddingLeft: 24,
        fontSize: 17,
        lineHeight: 1.7,
        color: FG,
        fontFamily: theme.fonts.body,
      }}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      style={{
        margin: '0 0 24px',
        padding: 0,
        paddingLeft: 24,
        fontSize: 17,
        lineHeight: 1.7,
        color: FG,
        fontFamily: theme.fonts.body,
      }}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ marginBottom: 8 }} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      style={{
        margin: '32px 0',
        padding: '20px 24px',
        background: ACCENT_BG,
        borderLeft: `3px solid ${ACCENT}`,
        borderRadius: 8,
        fontFamily: theme.fonts.display,
        fontSize: 19,
        lineHeight: 1.55,
        color: FG,
        fontStyle: 'italic',
      }}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: 0,
        borderTop: `1px solid ${BORDER}`,
        margin: '48px 0',
      }}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      style={{
        background: SUBTLE,
        padding: '2px 6px',
        borderRadius: 4,
        fontFamily: theme.fonts.body,
        fontSize: '0.92em',
        color: ACCENT,
      }}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      style={{
        background: SUBTLE,
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: 20,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 24,
      }}
    />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table
        {...props}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 15,
          color: FG,
          fontFamily: theme.fonts.body,
        }}
      />
    </div>
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      style={{
        textAlign: 'left',
        padding: '12px 16px',
        background: SUBTLE,
        borderBottom: `2px solid ${BORDER}`,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: MUTED,
      }}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${BORDER}`,
      }}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ fontWeight: 700, color: FG }} />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em {...props} style={{ fontStyle: 'italic' }} />
  ),
};

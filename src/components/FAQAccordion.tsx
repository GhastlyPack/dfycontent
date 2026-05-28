'use client';

import { useState } from 'react';
import { theme } from '@/lib/theme';

export type FAQItem = {
  q: string;
  a: string;
  category?: string;
};

export function FAQAccordion({ items, defaultOpenIndex = -1 }: { items: FAQItem[]; defaultOpenIndex?: number }) {
  return (
    <div style={{ borderTop: `1px solid ${theme.palette.borderSoft}` }}>
      {items.map((item, i) => (
        <FAQRow key={i} {...item} defaultOpen={i === defaultOpenIndex} />
      ))}
    </div>
  );
}

function FAQRow({ q, a, defaultOpen }: FAQItem & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${theme.palette.borderSoft}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '22px 0',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <span
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 'clamp(17px, 2vw, 20px)',
            fontWeight: 600,
            color: theme.palette.fg,
            letterSpacing: '-0.01em',
            lineHeight: 1.35,
          }}
        >
          {q}
        </span>
        <span
          style={{
            width: 32,
            height: 32,
            minWidth: 32,
            borderRadius: 999,
            background: open ? theme.palette.accent : theme.palette.accentBg,
            color: open ? '#fff' : theme.palette.accent,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background .2s',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s' }}
          >
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: 22,
            paddingRight: 60,
            fontFamily: theme.fonts.body,
            fontSize: 16,
            lineHeight: 1.65,
            color: theme.palette.fgMuted,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

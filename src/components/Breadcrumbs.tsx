'use client';

import Link from 'next/link';
import { theme } from '@/lib/theme';

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontFamily: theme.fonts.body,
          fontSize: 13,
          color: theme.palette.fgMuted,
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {item.href && !isLast ? (
                <Link href={item.href} style={{ color: theme.palette.fgMuted }}>
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: isLast ? theme.palette.fg : theme.palette.fgMuted, fontWeight: isLast ? 600 : 400 }}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden style={{ color: theme.palette.fgSubtle }}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

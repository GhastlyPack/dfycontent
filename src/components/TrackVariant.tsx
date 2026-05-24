'use client';

import { useEffect } from 'react';

/**
 * Writes the lander variant slug to sessionStorage so the /apply funnel
 * can attribute the lead to the right ad angle in Customer.io.
 * Renders nothing.
 */
export function TrackVariant({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      sessionStorage.setItem('lead.variant', slug);
    } catch {
      // ignore (private browsing, etc.)
    }
  }, [slug]);
  return null;
}

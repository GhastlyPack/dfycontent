'use client';

import { useEffect } from 'react';
import type { Variant } from '@/lib/variants';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { BentoFeatures } from '@/components/sections/BentoFeatures';
import { StatCards } from '@/components/sections/StatCards';
import { Steps } from '@/components/sections/Steps';
import { Testimonials } from '@/components/sections/Testimonials';
import { BigCTA } from '@/components/sections/BigCTA';
import { Footer } from '@/components/sections/Footer';

export function Lander({ variant }: { variant: Variant }) {
  // Store variant slug so /apply can attribute the lead in Customer.io
  useEffect(() => {
    try {
      sessionStorage.setItem('lead.variant', variant.slug);
    } catch {
      // ignore
    }
  }, [variant.slug]);

  return (
    <>
      <Nav />
      <main>
        <Hero variant={variant} />
        <TrustStrip variant={variant} />
        <BentoFeatures variant={variant} />
        <StatCards variant={variant} />
        <Steps variant={variant} />
        <Testimonials variant={variant} />
        <BigCTA variant={variant} />
      </main>
      <Footer />
    </>
  );
}

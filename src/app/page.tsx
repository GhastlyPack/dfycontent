import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { BentoFeatures } from '@/components/sections/BentoFeatures';
import { StatCards } from '@/components/sections/StatCards';
import { Steps } from '@/components/sections/Steps';
import { Testimonials } from '@/components/sections/Testimonials';
import { BigCTA } from '@/components/sections/BigCTA';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <BentoFeatures />
        <StatCards />
        <Steps />
        <Testimonials />
        <BigCTA />
      </main>
      <Footer />
    </>
  );
}

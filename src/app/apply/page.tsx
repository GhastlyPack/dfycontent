import { Suspense } from 'react';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { Flow } from '@/components/Flow';

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <Suspense fallback={null}>
          <Flow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

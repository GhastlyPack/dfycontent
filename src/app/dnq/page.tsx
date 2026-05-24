import { Suspense } from 'react';
import { DnqScreen } from './DnqScreen';

export default function DnqPage() {
  return (
    <Suspense fallback={null}>
      <DnqScreen />
    </Suspense>
  );
}

import { Lander } from '@/components/Lander';
import { getVariant } from '@/lib/variants';

export default function HomePage() {
  return <Lander variant={getVariant('founder')} />;
}

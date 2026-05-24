import { notFound } from 'next/navigation';
import { Lander } from '@/components/Lander';
import { getVariant, isValidVariantSlug, variantSlugs } from '@/lib/variants';

export async function generateStaticParams() {
  // Pre-build every non-default variant. The default ('founder') is at /
  return variantSlugs
    .filter((slug) => slug !== 'founder')
    .map((slug) => ({ variant: slug }));
}

export const dynamicParams = false; // 404 anything not in the static list

export default async function VariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!isValidVariantSlug(variant)) {
    notFound();
  }
  return <Lander variant={getVariant(variant)} />;
}

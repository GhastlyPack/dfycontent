// Audience-specific copy for landing-page variants.
// Default ("founder") lives at /. Others live at /[slug].
// Add new variants here + they auto-generate at build time via the
// dynamic route's generateStaticParams.

export type VariantSlug = 'founder' | 'business-owner' | 'creator' | 'coach';

export type Variant = {
  slug: VariantSlug;
  audienceLabel: string;

  hero: {
    eyebrow: string;
    h1Pre: string;       // text before the accent-colored phrase
    h1Accent: string;    // accent-colored phrase
    h1Post?: string;     // optional text after the accent
    sub: string;
  };

  trust: string;

  bento: {
    title: string;
    sub: string;
  };

  stats: {
    title: string;
    sub: string;
  };

  steps: {
    title: string;
    sub: string;
  };

  testimonials: {
    title: string;
    sub: string;
  };

  bigCta: {
    title: string;
    sub: string;
  };
};

const founder: Variant = {
  slug: 'founder',
  audienceLabel: 'founders',
  hero: {
    eyebrow: 'Done-for-you content for busy founders',
    h1Pre: 'Grow Your Brand With Content That ',
    h1Accent: 'Sounds Like You.',
    sub: 'We write the scripts, your AI clone delivers them, our team publishes — at scale, in your voice. Two hours of your time. Content forever.',
  },
  trust: 'Trusted by founders, consultants, and operators building public-facing brands.',
  bento: {
    title: "Everything you'd hire a 4-person content team to do, in one place.",
    sub: 'Scripting, capture, production, and posting — handled end-to-end so you can stay focused on the business.',
  },
  stats: {
    title: "Built for founders who don't have time, but need the reach.",
    sub: 'We designed the entire system around your calendar — not the other way around.',
  },
  steps: {
    title: 'Get started in 3 simple steps.',
    sub: 'Two hours of your time, then we run the playbook. First post live in 14 days.',
  },
  testimonials: {
    title: 'What our clients say.',
    sub: "Real-world stories from founders, consultants, and operators we've cloned.",
  },
  bigCta: {
    title: 'Ready to be everywhere?',
    sub: "See if we're a fit in 60 seconds. No spam, no commitment — just a quick check before we hop on a call.",
  },
};

const businessOwner: Variant = {
  slug: 'business-owner',
  audienceLabel: 'business owners',
  hero: {
    eyebrow: 'Done-for-you content for business owners',
    h1Pre: 'Your Customers Are On Social. ',
    h1Accent: "Now You Are Too.",
    sub: 'We script every post, your AI clone delivers it, our team publishes — to every platform your customers scroll. Two hours of setup. Then never again.',
  },
  trust: 'Trusted by business owners growing through personal brand.',
  bento: {
    title: 'Everything a marketing team does — without hiring one.',
    sub: 'Scripting, capture, production, and posting — handled end-to-end so you can stay focused on running the business.',
  },
  stats: {
    title: "Built for owners who'd rather spend their hours on the business than on a camera.",
    sub: 'We designed the whole operation around your actual schedule.',
  },
  steps: {
    title: 'From kickoff to your face everywhere — in 3 steps.',
    sub: 'Two hours of your time. We run the playbook. First post live in 14 days.',
  },
  testimonials: {
    title: 'Real owners. Real growth.',
    sub: 'Stories from business owners who handed us the content side of the business.',
  },
  bigCta: {
    title: 'Stop being invisible to your customers.',
    sub: "60 seconds to see if we're a fit. No commitment.",
  },
};

const creator: Variant = {
  slug: 'creator',
  audienceLabel: 'creators',
  hero: {
    eyebrow: 'Scale your content output 10x',
    h1Pre: 'Post Every Day. Without Filming Every Day. ',
    h1Accent: 'Or At All.',
    sub: 'We script, clone, and ship 30+ pieces a month in your voice — so you can stop being a slave to the camera and start scaling. Two hours of setup. Then never film again.',
  },
  trust: 'Trusted by creators going from monthly to daily without burning out.',
  bento: {
    title: 'Your content team — without the headcount.',
    sub: 'Scripting, clone production, editing, multi-platform posting. We run the operation.',
  },
  stats: {
    title: 'Built for creators who want to scale without losing their voice.',
    sub: "Every piece sounds like you — because it's you. Just multiplied.",
  },
  steps: {
    title: 'From "I should post more" to posting every day.',
    sub: 'Three steps. Two hours of your time. Zero burnout.',
  },
  testimonials: {
    title: 'Creators who let go of the camera.',
    sub: 'And got their week back.',
  },
  bigCta: {
    title: 'Ready to post daily without ever filming?',
    sub: 'See if we can scale you. 60 seconds.',
  },
};

const coach: Variant = {
  slug: 'coach',
  audienceLabel: 'coaches & consultants',
  hero: {
    eyebrow: 'Done-for-you content for coaches & consultants',
    h1Pre: 'Build Authority. Attract Clients. ',
    h1Accent: 'Without The Camera.',
    sub: 'We script every piece around your methodology and your audience. Your AI clone delivers it. You stay focused on your clients. Two hours of setup, then it runs itself.',
  },
  trust: 'Trusted by coaches, consultants, and advisors building inbound pipelines.',
  bento: {
    title: 'Inbound marketing on autopilot.',
    sub: 'Scripting, clone production, editing, posting — all in your voice, all around your offer.',
  },
  stats: {
    title: "Built for experts who'd rather coach than film.",
    sub: 'We handle the content side of your authority play.',
  },
  steps: {
    title: 'From obscurity to authority — in 3 steps.',
    sub: 'Two hours of your time. Then we run the system.',
  },
  testimonials: {
    title: 'Coaches who stopped filming and started growing.',
    sub: 'Their pipelines did too.',
  },
  bigCta: {
    title: 'Be the expert your prospects find first.',
    sub: "60 seconds to see if we're a fit.",
  },
};

const variantsMap = {
  founder,
  'business-owner': businessOwner,
  creator,
  coach,
} satisfies Record<VariantSlug, Variant>;

export const variants: Record<VariantSlug, Variant> = variantsMap;
export const variantSlugs = Object.keys(variantsMap) as VariantSlug[];

export function getVariant(slug?: string): Variant {
  if (slug && (slug in variantsMap)) {
    return variantsMap[slug as VariantSlug];
  }
  return founder;
}

export function isValidVariantSlug(slug: string): slug is VariantSlug {
  return slug in variantsMap;
}

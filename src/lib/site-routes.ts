import { personas } from '@/data/personas';

/**
 * ONE source of truth for every indexable route. Drives /sitemap-pages.xml,
 * /llms.txt and generateStaticParams for /use-cases/[slug]. The coverage gate
 * in scripts/check-site.mjs fails if a page.tsx exists that is missing here.
 * /blog/[slug] is data-driven and deliberately absent (see sitemap route).
 */
export interface SiteRoute {
  path: string;
  title: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

export function personaRoutes(): SiteRoute[] {
  return personas.map((p) => ({
    path: `/use-cases/${p.slug}`,
    title: `Use case: ${p.label}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));
}

/** Params for /use-cases/[slug] — literally the sitemap's list. */
export function personaStaticParams(): { slug: string }[] {
  return personaRoutes().map((r) => ({ slug: r.path.replace('/use-cases/', '') }));
}

export function getSiteRoutes(): SiteRoute[] {
  return [
    { path: '/', title: 'Home', priority: 1, changeFrequency: 'weekly' },
    { path: '/how-it-works', title: 'How it works', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/features', title: 'Features', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', title: 'Pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/safety', title: 'Safety', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/use-cases', title: 'Use cases', priority: 0.8, changeFrequency: 'monthly' },
    ...personaRoutes(),
    { path: '/roadmap', title: 'Roadmap', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', title: 'FAQ', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', title: 'Blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/about', title: 'About', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/contact', title: 'Contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/privacy-policy', title: 'Privacy policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', title: 'Terms and conditions', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/sales-terms', title: 'Sales referral programme terms', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/grievance', title: 'Grievance officer', priority: 0.3, changeFrequency: 'yearly' },
  ];
}

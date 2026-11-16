import { siteConfig } from '@/config/site';
import { SITE, siteUrl } from '@/lib/seo';
import { PLAN } from '@/lib/pricing';

/**
 * ONE interlinked schema.org @graph per page. Organization + WebSite +
 * SoftwareApplication (with the real Offer price) on every page; WebPage,
 * BreadcrumbList, FAQPage questions, BlogPosting and ItemList as the page
 * needs. The platform edge only adds @types this graph does not declare.
 * No ratings, reviews or address: none are published.
 */

const ORIGIN = SITE.url;
const ORG_ID = `${ORIGIN}/#organization`;
const SITE_ID = `${ORIGIN}/#website`;
const APP_ID = `${ORIGIN}/#software`;

type Node = Record<string, unknown>;

function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    url: siteUrl('/'),
    logo: siteUrl('/brand/logo-icon.png'),
    email: siteConfig.contact.email,
    description: siteConfig.description,
    parentOrganization: { '@type': 'Organization', name: siteConfig.company.legalName, url: siteConfig.company.site },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.contact.email,
      availableLanguage: ['en'],
    },
    knowsAbout: [
      'LinkedIn content',
      'LinkedIn personal branding',
      'AI writing in a personal voice',
      'LinkedIn post scheduling',
      'publishing through the LinkedIn API',
      'editorial review of AI drafts',
    ],
    sameAs: [siteConfig.parentBrand.url],
  };
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteUrl('/'),
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

function software(): Node {
  return {
    '@type': 'SoftwareApplication',
    '@id': APP_ID,
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'LinkedIn content writing and publishing',
    operatingSystem: 'Web',
    url: siteUrl('/'),
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      name: PLAN.name,
      price: String(PLAN.usdMonthly), // major units — the one conversion-free boundary (price is authored in USD)
      priceCurrency: 'USD',
      description: `Per month for ${PLAN.profiles} LinkedIn profile. First ${PLAN.freePosts} posts free with no card, then a ${PLAN.trialDays}-day free trial (card required). Cancel anytime.`,
      url: siteUrl('/pricing'),
    },
  };
}

export interface GraphPage {
  path: string;
  title: string;
  description: string;
  /** Breadcrumb trail AFTER Home. */
  crumbs?: { name: string; path: string }[];
  faq?: { q: string; a: string }[];
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage';
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    keywords?: string[];
    section?: string;
  };
  items?: { name: string; path: string }[];
}

export function buildGraph(page?: GraphPage): { '@context': string; '@graph': Node[] } {
  const nodes: Node[] = [organization(), website(), software()];
  if (page) {
    const url = siteUrl(page.path);
    const isHome = page.path === '/';
    const webPage: Node = {
      '@type': page.type ?? 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': APP_ID },
      inLanguage: 'en',
    };
    nodes.push(webPage);
    if (!isHome) {
      const trail = [{ name: 'Home', path: '/' }, ...(page.crumbs ?? [{ name: page.title, path: page.path }])];
      webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
      nodes.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: siteUrl(c.path) })),
      });
    }
    if (page.article) {
      const a = page.article;
      const iso = (d?: string) => (d && !Number.isNaN(Date.parse(d)) ? new Date(d).toISOString() : undefined);
      webPage.mainEntity = { '@id': `${url}#article` };
      nodes.push({
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: a.headline.slice(0, 110),
        description: a.description,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        publisher: { '@id': ORG_ID },
        author: { '@id': ORG_ID },
        inLanguage: 'en',
        ...(a.image ? { image: [a.image] } : {}),
        ...(iso(a.datePublished) ? { datePublished: iso(a.datePublished) } : {}),
        ...(iso(a.dateModified ?? a.datePublished) ? { dateModified: iso(a.dateModified ?? a.datePublished) } : {}),
        ...(a.keywords?.length ? { keywords: a.keywords.join(', ') } : {}),
        ...(a.section ? { articleSection: a.section } : {}),
      });
    }
    if (page.items?.length) {
      webPage.mainEntity = { '@id': `${url}#itemlist` };
      nodes.push({
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        itemListElement: page.items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: siteUrl(it.path) })),
      });
    }
    if (page.faq?.length) {
      webPage.mainEntity = page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      }));
    }
  }
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialise safely for a <script> tag (escape < and >). */
export function graphJson(page?: GraphPage): string {
  return JSON.stringify(buildGraph(page)).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

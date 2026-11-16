import { LOGIN_URL, SIGNUP_URL } from '@/lib/app-links';

/**
 * ONE place for every brand string. Facts and where they came from:
 * docs/CONTENT-SOURCES.md.
 */
const domain = (process.env.NEXT_PUBLIC_SITE_DOMAIN || 'linkedinautomation.tyashin.com').replace(/^https?:\/\//, '').replace(/\/+$/, '');

export const siteConfig = {
  name: 'Tyashin for LinkedIn',
  shortName: 'Tyashin',
  tagline: 'Your voice. Amplified. Authentic.',
  description:
    'Tyashin for LinkedIn learns how you write, drafts LinkedIn posts in your voice, checks every draft before you see it, and publishes through LinkedIn’s official API once you approve.',
  domain,
  url: `https://${domain}`,
  company: {
    legalName: 'Aapastech Pvt Ltd',
    // No street address is published on this site — company name only.
    site: 'https://aapastech.com',
  },
  contact: {
    email: 'hello@tyashin.com',
    privacyEmail: 'privacy@aapastech.com',
    legalEmail: 'legal@aapastech.com',
  },
  cta: {
    primary: { label: 'Write 2 posts free', href: SIGNUP_URL },
    signIn: { label: 'Sign in', href: LOGIN_URL },
  },
  offerLine: '2 posts free, no card. Then a 3-day free trial, then monthly. Cancel anytime.',
  parentBrand: { name: 'Tyashin', url: 'https://tyashin.com' },
} as const;

export interface NavLink {
  label: string;
  href: string;
  note?: string;
}

export const productNav: NavLink[] = [
  { label: 'How it works', href: '/how-it-works', note: 'From sign-in to your first published post' },
  { label: 'Features', href: '/features', note: 'Everything that is live today' },
  { label: 'Safety', href: '/safety', note: 'How we stay inside LinkedIn’s rules' },
];

export const mainNav: NavLink[] = [
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Features', href: '/features' },
      { label: 'Safety', href: '/safety' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms and conditions', href: '/terms-and-conditions' },
      { label: 'Sales referral terms', href: '/sales-terms' },
      { label: 'Grievance officer', href: '/grievance' },
    ],
  },
];

import { siteConfig } from '@/config/site';
import { siteUrl } from '@/lib/seo';
import { getSiteRoutes } from '@/lib/site-routes';
import { PLAN } from '@/lib/pricing';
import { featureGroups, formatThemes, neverList, strategyThemes } from '@/data/features';
import { roadmap } from '@/data/roadmap';
import { LOGIN_URL, SIGNUP_URL } from '@/lib/app-links';

/**
 * /llms.txt — a plain, machine-first summary for AI assistants and AI search.
 * Built from the same data files as the pages, so it cannot drift from them.
 * Nothing here that is not on the site. (If the platform's SEO Co-Pilot is set
 * to serve /llms.txt, the platform's copy wins at the edge.)
 */
export const dynamic = 'force-static';

export function GET() {
  const live = featureGroups
    .map((g) => {
      const rows = g.features.filter((f) => f.status === 'live').map((f) => `- ${f.title}: ${f.body}`);
      return `### ${g.eyebrow}\n${rows.join('\n')}`;
    })
    .join('\n\n');
  const soon = roadmap
    .flatMap((g) => g.items)
    .map((i) => `- ${i.title}. Today: ${i.today}`)
    .join('\n');
  const pages = getSiteRoutes()
    .map((r) => `- ${r.title}: ${siteUrl(r.path)}`)
    .join('\n');
  const never = neverList.map((n) => `- ${n.title}. ${n.body}`).join('\n');

  const body = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `${siteConfig.name} is a product of ${siteConfig.company.legalName}. Positioning: "${siteConfig.tagline}"`,
    'It is for people whose name is part of their work: founders, consultants and freelancers, executives, career changers, B2B sales professionals, coaches, and students building a job-seeking profile.',
    '',
    '## What is live today',
    '',
    live,
    '',
    `Content themes (17): ${[...strategyThemes, ...formatThemes].join(', ')}.`,
    '',
    '## What it never does',
    never,
    '',
    '## Coming soon (NOT live, cannot be bought)',
    soon,
    '',
    '## Pricing',
    `- One plan, ${PLAN.name}: US$${PLAN.usdMonthly} per month for ${PLAN.profiles} LinkedIn profile.`,
    `- Offer: the first ${PLAN.freePosts} posts are free with no card. Then a ${PLAN.trialDays}-day free trial (card required, not charged until it ends). Then billed monthly. Cancel anytime.`,
    '- The plan includes a monthly AI allowance; one-off top-ups of 20%, 50% or 100% are available.',
    '- Company page add-on: coming soon, not purchasable.',
    '- Currency: the pricing page shows the price in the currency for the country the visitor is in. Signed-in customers are billed in the currency for the country their account was created in. Checkout confirms the price before payment.',
    '',
    '## Pages',
    pages,
    '',
    '## Contact',
    `- Email: ${siteConfig.contact.email}`,
    `- Privacy requests: ${siteConfig.contact.privacyEmail}`,
    `- Sign up: ${SIGNUP_URL}`,
    `- Sign in: ${LOGIN_URL}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}

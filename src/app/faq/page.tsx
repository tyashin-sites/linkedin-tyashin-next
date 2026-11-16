import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { allFaqs, faqGroups } from '@/data/faq';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';
import { FaqList } from '@/components/FaqList';

const TITLE = 'FAQ';
const DESCRIPTION =
  'Answers about Tyashin for LinkedIn: how the voice matching works, what checks a draft goes through, account safety, the free offer, pricing and billing.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/faq' });

const id = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function FaqPage() {
  return (
    <>
      <JsonLd
        page={{
          path: '/faq',
          title: 'Frequently asked questions',
          description: DESCRIPTION,
          type: 'FAQPage',
          crumbs: [{ name: TITLE, path: '/faq' }],
          faq: allFaqs.map((f) => ({ q: f.q, a: f.a })),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly"
        lead="If your question is not here, ask us. A person replies."
        trail={[{ name: TITLE, path: '/faq' }]}
      />
      <section className="container-y pb-24">
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.heading}>
                  <a href={`#${id(g.heading)}`} className="nav-link inline-block">
                    {g.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {faqGroups.map((g) => (
              <section key={g.heading} id={id(g.heading)} aria-labelledby={`${id(g.heading)}-h`}>
                <h2 id={`${id(g.heading)}-h`} className="tt-h2 mb-6">
                  {g.heading}
                </h2>
                <FaqList items={g.items} />
              </section>
            ))}
            <p className="flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/contact" className="link-arrow">
                Ask a question
              </Link>
              <Link href="/safety" className="link-arrow">
                Read the safety page
              </Link>
              <Link href="/pricing" className="link-arrow">
                See pricing
              </Link>
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

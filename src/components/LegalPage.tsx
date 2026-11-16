import Link from 'next/link';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/PageHero';
import { siteConfig } from '@/config/site';
import { LEGAL_SLUGS, getLegalDoc, type LegalSlug } from '@/lib/legal';
import { JsonLd } from '@/components/JsonLd';

const LABELS: Record<LegalSlug, string> = {
  'privacy-policy': 'Privacy policy',
  'terms-and-conditions': 'Terms and conditions',
  'sales-terms': 'Sales referral terms',
};

/** Shared chrome for long-form legal text. */
export function LegalShell({ title, path, updated, children }: { title: string; path: string; updated?: string; children: ReactNode }) {
  return (
    <div className="container-y pb-24 pt-10 sm:pt-14">
      <Breadcrumbs trail={[{ name: title, path }]} />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <article className="max-w-3xl">
          <h1 className="tt-h1">{title}</h1>
          {updated ? <p className="mt-4 text-[0.92rem] text-muted" dangerouslySetInnerHTML={{ __html: updated }} /> : null}
          <div className="prose-y mt-10">{children}</div>
        </article>
        <aside aria-label="Legal documents" className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">Legal documents</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {LEGAL_SLUGS.map((s) => (
              <li key={s}>
                <Link href={`/${s}`} aria-current={path === `/${s}` ? 'page' : undefined} className="hover:underline aria-[current=page]:font-semibold">
                  {LABELS[s]}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/grievance" aria-current={path === '/grievance' ? 'page' : undefined} className="hover:underline aria-[current=page]:font-semibold">
                Grievance officer
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-[0.9rem] text-muted">
            {siteConfig.company.legalName}
            <br />
            <a href={`mailto:${siteConfig.contact.legalEmail}`} className="underline">
              {siteConfig.contact.legalEmail}
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}

/**
 * One legal document: the platform's admin-edited HTML when it exists, the
 * local text migrated from the previous site otherwise (src/lib/legal.ts).
 */
export async function LegalPageRenderer({ slug, description }: { slug: LegalSlug; description: string }) {
  const doc = await getLegalDoc(slug);
  return (
    <>
      <JsonLd page={{ path: `/${slug}`, title: doc.title, description }} />
      <LegalShell title={doc.title} path={`/${slug}`} updated={doc.updated}>
        <div dangerouslySetInnerHTML={{ __html: doc.html }} />
      </LegalShell>
    </>
  );
}

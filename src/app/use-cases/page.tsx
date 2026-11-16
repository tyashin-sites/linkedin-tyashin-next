import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { personas } from '@/data/personas';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';

const TITLE = 'Use cases';
const DESCRIPTION =
  'How founders, consultants, executives, career changers, B2B sales people, coaches and students use Tyashin for LinkedIn, with example campaigns for each.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/use-cases' });

export default function UseCasesPage() {
  return (
    <>
      <JsonLd
        page={{
          path: '/use-cases',
          title: TITLE,
          description: DESCRIPTION,
          type: 'CollectionPage',
          items: personas.map((p) => ({ name: p.title, path: `/use-cases/${p.slug}` })),
        }}
      />
      <PageHero
        eyebrow="Use cases"
        title="Who it is for, and how they would set it up"
        lead="Seven kinds of people whose LinkedIn profile does real work for them. Each page has example campaigns you could copy on day one."
        trail={[{ name: TITLE, path: '/use-cases' }]}
      />
      <section className="container-y pb-24" aria-label="Use cases">
        <ul className="grid gap-5 md:grid-cols-2">
          {personas.map((p) => (
            <li key={p.slug} className="rv">
              <Link href={`/use-cases/${p.slug}`} className="card flex h-full flex-col p-7">
                <h2 className="font-heading text-[1.75rem] leading-tight">{p.label}</h2>
                <p className="mt-3 text-muted">{p.lead}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.campaigns.map((c) => (
                    <li key={c.name} className="rounded-full border border-border px-3 py-1 text-[0.84rem] text-muted">
                      {c.name}
                    </li>
                  ))}
                </ul>
                <span className="link-arrow mt-auto pt-6 text-[0.95rem]">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}

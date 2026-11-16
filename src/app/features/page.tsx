import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { buyersChecklist, featureGroups, formatThemes, strategyThemes } from '@/data/features';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';
import { ComingSoonPanel } from '@/components/ComingSoon';

const TITLE = 'Features';
const DESCRIPTION =
  'What Tyashin for LinkedIn does today: voice settings, knowledge bank, campaigns with their own schedules, a four-step quality gate, approval and official LinkedIn publishing. What is not live is marked Coming soon.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/features' });

export default function FeaturesPage() {
  return (
    <>
      <JsonLd page={{ path: '/features', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Features"
        title="What it does today, and what it does not do yet"
        lead="Everything with a solid border is live in the product. Everything with a dashed border and a Coming soon badge is not, and you cannot buy it yet."
        trail={[{ name: TITLE, path: '/features' }]}
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {featureGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-block rounded-full border border-border px-3.5 py-1.5 text-[0.9rem] hover:border-primary hover:text-primary-deep">
                  {g.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {featureGroups.map((g, gi) => (
        <section key={g.id} id={g.id} className={gi % 2 === 1 ? 'tint-band' : ''} aria-labelledby={`${g.id}-h`}>
          <div className="container-y section-tight">
            <SectionHead id={`${g.id}-h`} eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.features.map((f) =>
                f.status === 'live' ? (
                  <li key={f.title} className="card rv p-6">
                    <h3 className="tt-h3">{f.title}</h3>
                    <p className="mt-2 text-[0.98rem] text-muted">{f.body}</p>
                  </li>
                ) : (
                  <li key={f.title} className="rv">
                    <ComingSoonPanel title={f.title}>{f.body}</ComingSoonPanel>
                  </li>
                ),
              )}
            </ul>
            {g.id === 'campaigns' ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {[
                  ['Nine strategy themes', strategyThemes],
                  ['Eight post formats', formatThemes],
                ].map(([label, list]) => (
                  <div key={label as string}>
                    <h3 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">{label as string}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {(list as string[]).map((t) => (
                        <li key={t} className="rounded-full border border-border bg-paper px-3 py-1 text-[0.9rem]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="container-y section" aria-labelledby="checklist-h">
        <SectionHead
          id="checklist-h"
          eyebrow="Before you choose"
          title="Three questions to ask before you pick a LinkedIn tool"
          lead="We would rather you judge us on these than on a comparison table we wrote ourselves."
        />
        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {buyersChecklist.map((c, i) => (
            <li key={c.q} className="card rv flex flex-col p-7">
              <span className="tt-num text-[0.82rem] text-primary">Question {i + 1}</span>
              <h3 className="mt-3 font-heading text-[1.6rem] leading-tight">{c.q}</h3>
              <p className="mt-3 text-[0.97rem] text-muted">{c.why}</p>
              <p className="mt-auto border-t border-border pt-4 text-[0.95rem]">
                <span className="font-semibold">Our answer:</span> {c.ours}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/how-it-works" className="link-arrow">
            See it in order
          </Link>
          <Link href="/roadmap" className="link-arrow">
            Everything that is coming soon
          </Link>
        </p>
      </section>

      <CtaBand />
    </>
  );
}

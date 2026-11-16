import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { personaStaticParams } from '@/lib/site-routes';
import { getPersona, personas } from '@/data/personas';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand, OfferLine, PrimaryCta } from '@/components/Cta';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;
export function generateStaticParams() {
  return personaStaticParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = getPersona((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title.replace(/^For /, 'LinkedIn posts for '), description: `${p.lead} ${p.helps[0].body}`, path: `/use-cases/${p.slug}` });
}

export default async function PersonaPage({ params }: { params: Params }) {
  const p = getPersona((await params).slug);
  if (!p) notFound();
  const others = personas.filter((o) => o.slug !== p.slug);
  const trail = [
    { name: 'Use cases', path: '/use-cases' },
    { name: p.label, path: `/use-cases/${p.slug}` },
  ];
  return (
    <>
      <JsonLd page={{ path: `/use-cases/${p.slug}`, title: p.title, description: p.lead, crumbs: trail }} />
      <PageHero eyebrow="Use case" title={p.title} lead={p.lead} trail={trail}>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryCta />
          <OfferLine />
        </div>
      </PageHero>

      <section className="container-y section-tight" aria-labelledby="situation-h">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead id="situation-h" eyebrow="The situation" title="Where this usually goes wrong" />
            <p className="mt-6 text-[1.08rem] leading-relaxed">{p.situation}</p>
          </div>
          <ul className="space-y-4">
            {p.helps.map((h) => (
              <li key={h.title} className="card rv p-6">
                <h3 className="tt-h3">{h.title}</h3>
                <p className="mt-1.5 text-[0.98rem] text-muted">{h.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tint-band" aria-labelledby="campaigns-h">
        <div className="container-y section-tight">
          <SectionHead
            id="campaigns-h"
            eyebrow="Example setup"
            title="Campaigns you could start with"
            lead="Suggestions, using the product’s own theme names. Change the names, days and themes to suit you."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.98rem]">
              <caption className="sr-only">Example campaigns</caption>
              <thead>
                <tr className="border-b border-border text-[0.76rem] uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="py-3 pr-6 font-semibold">Campaign</th>
                  <th scope="col" className="py-3 pr-6 font-semibold">Themes</th>
                  <th scope="col" className="py-3 font-semibold">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {p.campaigns.map((c) => (
                  <tr key={c.name} className="border-b border-border">
                    <th scope="row" className="py-4 pr-6 font-semibold">{c.name}</th>
                    <td className="py-4 pr-6 text-muted">{c.themes}</td>
                    <td className="py-4 text-muted">{c.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="tt-h3">What to put in your knowledge bank</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.98rem] text-muted">
                {p.knowledge.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="tt-h3">A word of caution</h3>
              <p className="mt-3 text-[0.98rem] text-muted">{p.caution}</p>
              <p className="mt-4">
                <Link href="/safety" className="link-arrow">
                  How we keep your account safe
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-y section-tight" aria-labelledby="others-h">
        <h2 id="others-h" className="tt-h3">
          Other use cases
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/use-cases/${o.slug}`} className="inline-block rounded-full border border-border px-4 py-2 text-[0.94rem] hover:border-primary hover:text-primary-deep">
                {o.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/how-it-works" className="inline-block rounded-full border border-border px-4 py-2 text-[0.94rem] hover:border-primary hover:text-primary-deep">
              How it works
            </Link>
          </li>
        </ul>
      </section>

      <CtaBand />
    </>
  );
}

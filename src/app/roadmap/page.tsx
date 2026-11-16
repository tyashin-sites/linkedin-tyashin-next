import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { roadmap } from '@/data/roadmap';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';
import { ComingSoonPanel } from '@/components/ComingSoon';

const TITLE = 'Roadmap';
const DESCRIPTION =
  'What is not live yet in Tyashin for LinkedIn: company pages, carousels, visual cards and photos, AI images, video, analytics and more. Listed honestly, with what you can do today instead.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/roadmap' });

export default function RoadmapPage() {
  return (
    <>
      <JsonLd page={{ path: '/roadmap', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Roadmap"
        title="What is coming soon, and what you can do today"
        lead="Everything on this page is not live. You cannot use it or buy it yet, and we do not give dates we might miss. Each item says what the product does today instead."
        trail={[{ name: TITLE, path: '/roadmap' }]}
      />

      {roadmap.map((g, gi) => (
        <section key={g.group} className={gi % 2 === 1 ? 'tint-band' : ''} aria-labelledby={`rm-${gi}`}>
          <div className="container-y section-tight">
            <SectionHead id={`rm-${gi}`} title={g.group} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <li key={it.title} className="rv">
                  <ComingSoonPanel title={it.title} today={it.today} showRoadmapLink={false}>
                    {it.body}
                  </ComingSoonPanel>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="container-y section-tight" aria-labelledby="live-h">
        <div className="max-w-3xl">
          <SectionHead
            id="live-h"
            eyebrow="Live today"
            title="You do not need to wait for any of this"
            lead="Voice settings, the knowledge bank, campaigns, the four-step quality gate, approval and publishing through LinkedIn’s official API are all live."
          />
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/features" className="link-arrow">
              See what is live
            </Link>
            <Link href="/contact" className="link-arrow">
              Tell us what you need most
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

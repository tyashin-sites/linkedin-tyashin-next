import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';

const TITLE = 'About';
const DESCRIPTION =
  'Tyashin for LinkedIn is built by Aapastech Pvt Ltd. Why we built it, the rules we hold ourselves to, and how to reach us.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/about' });

const PRINCIPLES = [
  {
    title: 'It has to sound like the person',
    body: 'A post that could have been written by anyone is worth nothing to the person whose name is on it. Voice comes first, and the product is built to be corrected.',
  },
  {
    title: 'The safe route, or no route',
    body: 'We publish through LinkedIn’s official API and build nothing that depends on breaking LinkedIn’s rules. If a feature needs a workaround, we do not ship it.',
  },
  {
    title: 'You approve by default',
    body: 'Automation is a choice the user makes, per campaign, after seeing the drafts. A draft that fails review is never published automatically.',
  },
  {
    title: 'Say what is live',
    body: 'If something is not in the product today, this site marks it Coming soon and you cannot buy it. We would rather undersell than explain later.',
  },
];

export default function AboutPage() {
  const { company, contact, parentBrand } = siteConfig;
  return (
    <>
      <JsonLd page={{ path: '/about', title: TITLE, description: DESCRIPTION, type: 'AboutPage' }} />
      <PageHero
        eyebrow="About"
        title="Built for people who have something to say and no time to write it"
        lead={`Tyashin for LinkedIn is made by ${company.legalName}, a small software company. It is one of the products in the Tyashin family.`}
        trail={[{ name: TITLE, path: '/about' }]}
      />

      <section className="container-y section-tight" aria-labelledby="why-h">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead id="why-h" eyebrow="Why it exists" title="The problem was never ideas" />
          <div className="prose-y">
            <p>
              Most professionals we know have plenty to say about their work. What they lack is a spare hour, three times
              a week, to turn a note into a post. So they post in bursts and go quiet when work gets busy, which is
              exactly when they have the most worth saying.
            </p>
            <p>
              General AI writing tools looked like the answer and mostly were not. They start from a blank prompt, so the
              result reads like everyone else’s, and they leave the checking, scheduling and publishing to you.
            </p>
            <p>
              We built Tyashin for LinkedIn to do the whole job properly: learn one person’s voice and work, research
              before writing, have a second model review the draft, and publish through the official API only after the
              person has approved it.
            </p>
          </div>
        </div>
      </section>

      <section className="tint-band" aria-labelledby="rules-h">
        <div className="container-y section-tight">
          <SectionHead id="rules-h" eyebrow="How we work" title="Four rules we hold ourselves to" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="card rv p-7">
                <span className="tt-num text-[0.82rem] text-primary">0{i + 1}</span>
                <h3 className="tt-h3 mt-3">{p.title}</h3>
                <p className="mt-2 text-[0.98rem] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-y section-tight" aria-labelledby="company-h">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead id="company-h" eyebrow="The company" title="Who is behind it" />
          <dl className="rule-top">
            <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold">Company</dt>
              <dd className="text-muted">
                {company.legalName} ·{' '}
                <a href={company.site} target="_blank" rel="noopener" className="underline">
                  aapastech.com
                </a>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold">Product family</dt>
              <dd className="text-muted">
                <a href={parentBrand.url} target="_blank" rel="noopener" className="underline">
                  Tyashin
                </a>
                , the website and commerce platform this site runs on, and Tyashin for LinkedIn.
              </dd>
            </div>
            <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold">Contact</dt>
              <dd className="text-muted">
                <a href={`mailto:${contact.email}`} className="underline">
                  {contact.email}
                </a>{' '}
                or the <Link href="/contact" className="underline">contact form</Link>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold">Legal</dt>
              <dd className="text-muted">
                <Link href="/privacy-policy" className="underline">Privacy policy</Link>,{' '}
                <Link href="/terms-and-conditions" className="underline">terms and conditions</Link>,{' '}
                <Link href="/sales-terms" className="underline">sales referral terms</Link>,{' '}
                <Link href="/grievance" className="underline">grievance officer</Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PLAN, REGIONAL_PRICES, TOP_UP_LABELS } from '@/lib/pricing';
import { faqGroups } from '@/data/faq';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand, PrimaryCta } from '@/components/Cta';
import { ComingSoonPanel } from '@/components/ComingSoon';
import { FaqList } from '@/components/FaqList';
import { PriceHint } from '@/components/PriceHint';

const TITLE = 'Pricing';
const DESCRIPTION = `One plan: Personal, US$${PLAN.usdMonthly} a month for one LinkedIn profile. Write ${PLAN.freePosts} posts free with no card, then a ${PLAN.trialDays}-day free trial, then monthly. Regional prices listed.`;
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/pricing' });

const INCLUDED = [
  'One personal LinkedIn profile',
  'Voice settings, knowledge bank and brand kit',
  'Campaigns with their own schedules, and all 17 content themes',
  'AI Studio chat',
  'Research, second-model review and humanizer pass on every draft',
  'Review and approve, or opt-in auto-publish per campaign',
  'Publishing through LinkedIn’s official API',
  'Email notifications',
  'A monthly AI allowance, with top-ups if you need more',
];

const billingFaq = faqGroups.find((g) => g.heading === 'Pricing and billing')!.items;

export default function PricingPage() {
  return (
    <>
      <JsonLd page={{ path: '/pricing', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Pricing"
        title="One plan, and you try it before you pay"
        lead="There is nothing to compare and nothing held back for a higher tier. Start with two free posts and decide from the drafts."
        trail={[{ name: TITLE, path: '/pricing' }]}
      />

      <section className="container-y pb-20" aria-label="Plan">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="card p-7 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-heading text-[2rem] leading-none">{PLAN.name}</h2>
              <span className="text-muted">For {PLAN.profiles} LinkedIn profile</span>
            </div>
            <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="tt-num text-[clamp(3rem,9vw,4.6rem)] leading-none">US${PLAN.usdMonthly}</span>
              <span className="text-[1.05rem] text-muted">per month</span>
            </p>
            <PriceHint />
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryCta />
              <span className="text-[0.92rem] text-muted">No card for your first {PLAN.freePosts} posts.</span>
            </div>
            <div className="hairline my-8" />
            <h3 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">Included</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-[0.98rem] sm:grid-cols-2">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" className="mt-1.5 flex-none text-primary">
                    <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card p-7">
              <h2 className="tt-h3">How the offer works</h2>
              <ol className="mt-5 space-y-5">
                {[
                  [`${PLAN.freePosts} posts free`, 'No card. Set up your voice, create a campaign and read real drafts.'],
                  [`${PLAN.trialDays}-day free trial`, 'A card is required to start it. You are not charged until the trial ends, and you can cancel before then.'],
                  ['Monthly', 'Billed monthly after the trial. No contract. Cancel anytime from the Billing page.'],
                ].map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="tt-num flex h-8 w-8 items-center justify-center rounded-full bg-primary-tint text-[0.85rem] text-primary-deep">{i + 1}</span>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="mt-0.5 text-[0.95rem] text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <ComingSoonPanel
              title="Company page add-on"
              as="h2"
              today="A subscription covers one personal profile. The add-on cannot be bought yet."
            >
              Posting to a LinkedIn company page alongside your personal profile. No price is confirmed until it launches.
            </ComingSoonPanel>
          </div>
        </div>
      </section>

      <section className="tint-band" aria-labelledby="regional-h">
        <div className="container-y section-tight">
          <SectionHead
            id="regional-h"
            eyebrow="Regional prices"
            title="What you pay where you are"
            lead="The same plan, priced in your currency. The price at checkout is the one that counts; if this table and checkout ever disagree, checkout is right."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.98rem]">
              <caption className="sr-only">Personal plan price and allowance top-ups by region</caption>
              <thead>
                <tr className="border-b border-border text-[0.74rem] uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="py-3 pr-5 font-semibold">Region</th>
                  <th scope="col" className="py-3 pr-5 font-semibold">Personal / month</th>
                  {TOP_UP_LABELS.map((l) => (
                    <th key={l} scope="col" className="py-3 pr-5 font-semibold">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REGIONAL_PRICES.map((r) => (
                  <tr key={r.currency} className="border-b border-border">
                    <th scope="row" className="py-4 pr-5 font-medium">
                      {r.region} <span className="text-muted">({r.code})</span>
                    </th>
                    <td className="tt-num py-4 pr-5 text-[1.05rem]">{r.personal}</td>
                    {r.topUps.map((t, i) => (
                      <td key={i} className="tt-num py-4 pr-5 text-muted">{t}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="tt-h3">The monthly AI allowance</h3>
              <p className="mt-2 text-muted">
                Your plan includes a monthly AI allowance that covers drafting, research and review. The app shows how
                much of it you have used as a percentage. If you need more in a given month, buy a one-off top-up of
                20%, 50% or 100% of the allowance.
              </p>
            </div>
            <div>
              <h3 className="tt-h3">How you pay</h3>
              <p className="mt-2 text-muted">
                Customers in India pay in rupees through Razorpay. Everyone else pays by card through Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-y section" aria-labelledby="pfaq-h">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead id="pfaq-h" eyebrow="Billing questions" title="Before you start the trial" />
            <p className="mt-8 flex flex-col gap-2">
              <Link href="/faq" className="link-arrow">
                All questions and answers
              </Link>
              <Link href="/contact" className="link-arrow">
                Ask us something else
              </Link>
            </p>
          </div>
          <FaqList items={billingFaq} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

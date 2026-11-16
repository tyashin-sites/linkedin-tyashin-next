import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { PLAN } from '@/lib/pricing';
import { personas } from '@/data/personas';
import { homeFaqs } from '@/data/faq';
import { buyersChecklist, neverList } from '@/data/features';
import { JsonLd } from '@/components/JsonLd';
import { HeroFlow } from '@/components/HeroFlow';
import { CtaBand, GhostLink, PrimaryCta } from '@/components/Cta';
import { SectionHead } from '@/components/PageHero';
import { FaqList } from '@/components/FaqList';
import { ComingSoonBadge } from '@/components/ComingSoon';
import { PriceHint } from '@/components/PriceHint';

const DESCRIPTION =
  'Sound like yourself on LinkedIn every week without writing every post. Tyashin drafts in your voice, checks each draft, and publishes through LinkedIn’s official API once you approve. Write 2 posts free, no card.';

export const metadata: Metadata = pageMetadata({ description: DESCRIPTION, path: '/' });

const STEPS = [
  {
    n: '01',
    title: 'Sign in with LinkedIn',
    body: 'One click on LinkedIn’s own sign-in screen. It also pre-fills what it can of your profile. Email and password works too.',
    time: 'About a minute',
  },
  {
    n: '02',
    title: 'Tell it who you are',
    body: 'A short setup: your business, who you write for, your tone, the things you never say, and a few notes for your knowledge bank.',
    time: 'A few minutes',
  },
  {
    n: '03',
    title: 'Create your first campaign',
    body: 'Pick a topic, choose from 17 content themes, and set the days and time it should post.',
    time: 'A couple of minutes',
  },
  {
    n: '04',
    title: 'Read your first draft',
    body: 'Edit it, approve it or reject it with a reason. Your first two posts are free, with no card.',
    time: 'Yours to judge',
  },
];

const VOICE = [
  {
    title: 'Your voice settings',
    body: 'A base tone, the words that describe how you sound, and a list of things you would never say. Every draft is written against them.',
  },
  {
    title: 'Your knowledge bank',
    body: 'Notes, links and text files about your actual work. Drafts draw on them, so a post is about what you did, not about “leadership”.',
  },
  {
    title: 'Your corrections',
    body: 'Edit a draft or reject one with a reason and that becomes a quality rule for the drafts that follow.',
  },
];

const GATE = [
  { k: 'Research', v: 'Before writing, the agent looks up recent developments on the topic.' },
  { k: 'Draft', v: 'A post is written from your voice settings and knowledge bank.' },
  { k: 'Judge', v: 'A second model scores it on novelty, groundedness, human voice and timeliness. It has to pass all four.' },
  { k: 'Humanizer', v: 'A final pass removes the tells of machine writing.' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd page={{ path: '/', title: `${siteConfig.name}: ${siteConfig.tagline}`, description: DESCRIPTION }} />

      {/* HERO */}
      <section className="container-y pb-16 pt-10 sm:pt-14 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-14">
          <div>
            <p className="eyebrow">AI writing for your LinkedIn profile</p>
            <h1 className="tt-display mt-6">
              Your voice.
              <br />
              Amplified.
              <br />
              <span className="accent-word">Authentic.</span>
            </h1>
            <p className="tt-lead mt-7 max-w-xl">
              Sound like yourself on LinkedIn every week without writing every post. Tyashin drafts in your voice,
              checks each draft before you see it, and publishes once you approve.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PrimaryCta>Write 2 posts free — no card</PrimaryCta>
              <GhostLink href="/how-it-works">See how it works</GhostLink>
            </div>
            <ol className="mt-6 flex flex-col gap-2 text-[0.94rem] text-muted sm:flex-row sm:gap-6">
              <li className="flex items-start gap-2">
                <span className="tt-num mt-0.5 text-primary">1</span>
                <span>
                  <strong className="font-semibold text-foreground">2 posts free.</strong> No card.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="tt-num mt-0.5 text-primary">2</span>
                <span>
                  <strong className="font-semibold text-foreground">Then a {PLAN.trialDays}-day free trial.</strong> Card
                  required, cancel anytime.
                </span>
              </li>
            </ol>
          </div>
          <HeroFlow />
        </div>
      </section>

      <div className="hairline" />

      {/* FIRST 10 MINUTES */}
      <section className="container-y section" aria-labelledby="first-h">
        <SectionHead
          id="first-h"
          eyebrow="Getting started"
          title="How your first 10 minutes go"
          lead="Four steps, and they are the same four steps you will see in the app."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="card rv flex flex-col p-6">
              <span className="tt-num text-[0.82rem] text-primary">{s.n}</span>
              <h3 className="tt-h3 mt-3">{s.title}</h3>
              <p className="mt-2 text-[0.98rem] text-muted">{s.body}</p>
              <p className="mt-auto pt-5 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-muted">{s.time}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link href="/how-it-works" className="link-arrow">
            The whole flow, step by step
          </Link>
        </p>
      </section>

      {/* WHY IT SOUNDS LIKE YOU */}
      <section className="tint-band" aria-labelledby="voice-h">
        <div className="container-y section grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              id="voice-h"
              eyebrow="Voice"
              title={
                <>
                  Why it sounds like <span className="accent-word">you</span>
                </>
              }
              lead="A general writing tool starts from a blank prompt, which is why its posts read like everyone else’s. Tyashin starts from three things only you can supply."
            />
            <p className="mt-8">
              <Link href="/features#voice" className="link-arrow">
                Everything it learns from
              </Link>
            </p>
          </div>
          <ul className="space-y-4">
            {VOICE.map((v, i) => (
              <li key={v.title} className="card rv flex gap-5 p-6">
                <span className="tt-num mt-1 text-[0.82rem] text-primary">0{i + 1}</span>
                <div>
                  <h3 className="tt-h3">{v.title}</h3>
                  <p className="mt-1.5 text-[0.98rem] text-muted">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUALITY GATE */}
      <section className="container-y section" aria-labelledby="gate-h">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              id="gate-h"
              eyebrow="The quality gate"
              title="A draft is checked before it reaches you"
              lead="Writing is one step of four. The other three exist to catch the post you would have been embarrassed by."
            />
            <blockquote className="mt-10 border-l-2 border-primary pl-6 font-heading text-[1.7rem] leading-snug">
              A draft that fails review never auto-posts.
              <footer className="mt-3 font-body text-[0.95rem] text-muted">
                It is held for you, and you get an email. That is true even with auto-publish switched on.
              </footer>
            </blockquote>
          </div>
          <ol className="rule-top">
            {GATE.map((g, i) => (
              <li key={g.k} className="rv grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-6">
                <span className="tt-num pt-1 text-[0.82rem] text-primary">0{i + 1}</span>
                <div>
                  <h3 className="tt-h3">{g.k}</h3>
                  <p className="mt-1 text-[0.98rem] text-muted">{g.v}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SAFETY */}
      <section className="ink-band" aria-labelledby="safety-h">
        <div className="container-y section">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <SectionHead
                id="safety-h"
                eyebrow="Safety"
                title="The official LinkedIn API. No automation that risks your account."
                lead="You connect on LinkedIn’s own permission screen and posts go out through LinkedIn’s official API. We never have your LinkedIn password."
              />
              <div className="mt-9">
                <GhostLink href="/safety">How we stay inside LinkedIn’s rules</GhostLink>
              </div>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2">
              {neverList.map((n) => (
                <li key={n.title} className="bg-ink p-6">
                  <h3 className="tt-h3 text-white">{n.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-on-ink-muted">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="container-y section" aria-labelledby="who-h">
        <SectionHead
          id="who-h"
          eyebrow="Who it is for"
          title="People whose name is part of their work"
          lead="If people look you up before they hire you, fund you or buy from you, your LinkedIn profile is doing a job. These are the people we built for."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p) => (
            <li key={p.slug} className="rv">
              <Link href={`/use-cases/${p.slug}`} className="card flex h-full flex-col p-6">
                <h3 className="tt-h3">{p.label}</h3>
                <p className="mt-2 text-[0.97rem] text-muted">{p.lead}</p>
                <span className="link-arrow mt-auto pt-5 text-[0.92rem]">Read more</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* BUYER'S CHECKLIST */}
      <section className="tint-band" aria-labelledby="checklist-h">
        <div className="container-y section">
          <SectionHead
            id="checklist-h"
            eyebrow="Before you choose"
            title="Three questions to ask before you pick a LinkedIn tool"
            lead="Ask them of any tool, including this one. Our answers are underneath so you can check them."
          />
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
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
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container-y section" aria-labelledby="price-h">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              id="price-h"
              eyebrow="Pricing"
              title="One plan. The price is on the page."
              lead="Personal covers one LinkedIn profile, with a monthly AI allowance and everything that is live today. No tiers to compare."
            />
            <p className="mt-8">
              <Link href="/pricing" className="link-arrow">
                Full pricing and regional prices
              </Link>
            </p>
          </div>
          <div className="card rv p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="tt-h3">{PLAN.name}</h3>
              <span className="text-[0.86rem] text-muted">{PLAN.profiles} LinkedIn profile</span>
            </div>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="tt-num text-[3.4rem] leading-none">US${PLAN.usdMonthly}</span>
              <span className="text-muted">/ month</span>
            </p>
            <PriceHint />
            <ul className="mt-6 space-y-2 text-[0.97rem]">
              <li>First {PLAN.freePosts} posts free, no card</li>
              <li>Then a {PLAN.trialDays}-day free trial (card required)</li>
              <li>Then monthly. Cancel anytime.</li>
            </ul>
            <div className="mt-7">
              <PrimaryCta className="w-full" />
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-[0.92rem] text-muted">
              Company page add-on <ComingSoonBadge />
            </p>
          </div>
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="tint-band" aria-labelledby="faq-h">
        <div className="container-y section grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead id="faq-h" eyebrow="Questions" title="What people ask first" />
            <p className="mt-8">
              <Link href="/faq" className="link-arrow">
                All questions and answers
              </Link>
            </p>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

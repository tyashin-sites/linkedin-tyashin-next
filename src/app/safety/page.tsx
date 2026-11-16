import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { neverList } from '@/data/features';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';

const TITLE = 'Safety';
const DESCRIPTION =
  'How Tyashin for LinkedIn stays inside LinkedIn’s rules: official OAuth API only, no browser automation, no auto-DMs, no engagement pods, encrypted tokens and a review gate before anything is published.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/safety' });

export default function SafetyPage() {
  return (
    <>
      <JsonLd page={{ path: '/safety', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="Safety"
        title="How we stay inside LinkedIn’s rules"
        lead="Your LinkedIn account is worth more than any tool. This page says exactly how Tyashin connects to it, what it will never do with it, and what remains your responsibility."
        trail={[{ name: TITLE, path: '/safety' }]}
      />

      <section className="container-y section-tight" aria-labelledby="api-h">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            id="api-h"
            eyebrow="The connection"
            title="LinkedIn’s official API, and nothing else"
            lead="LinkedIn offers approved applications an official way to publish on a member’s behalf, with the member’s permission. That is the only route Tyashin uses."
          />
          <dl className="rule-top">
            {[
              ['You grant access on LinkedIn', 'You sign in on LinkedIn’s own screen and approve the permissions there. We never see your LinkedIn password.'],
              ['Posts go through the API', 'An approved post is sent to LinkedIn through its official posting API, the same way any approved app publishes.'],
              ['No browser automation', 'Nothing logs in as you, holds your session cookies or clicks through LinkedIn’s website pretending to be you. An earlier version of the product did work through a browser session; that was removed, and every account now connects through OAuth.'],
              ['You can revoke it', 'Disconnect LinkedIn from the Connect page in the app, or remove the app from your LinkedIn settings. Either one ends our access.'],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border py-5">
                <dt className="font-semibold">{k}</dt>
                <dd className="mt-1 text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ink-band" aria-labelledby="never-h">
        <div className="container-y section">
          <SectionHead
            id="never-h"
            eyebrow="What it never does"
            title="The automation that gets accounts restricted is not in the product"
            lead="LinkedIn’s user agreement prohibits bots and automated activity on its website. We do not build features that depend on breaking it."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {neverList.map((n) => (
              <li key={n.title} className="bg-ink p-6">
                <h3 className="tt-h3 text-white">{n.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-on-ink-muted">{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-y section-tight" aria-labelledby="gate-h">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            id="gate-h"
            eyebrow="What gets published"
            title="A review gate between a draft and your profile"
            lead="Account safety is also about what goes out under your name."
          />
          <ul className="space-y-4">
            {[
              ['Approval is the default', 'Nothing is published until you approve it. Auto-publish is something you switch on, per campaign.'],
              ['Failed drafts never auto-post', 'Every draft is reviewed by a second model. One that fails is held for you, with an email, even when auto-publish is on.'],
              ['Sources are shown', 'When a post draws on research, the links are prepared as a first comment under your own post. You can edit or remove it.'],
              ['Your edits become rules', 'Reject a draft with a reason, and that reason is applied to future drafts.'],
            ].map(([k, v]) => (
              <li key={k} className="card rv p-6">
                <h3 className="tt-h3">{k}</h3>
                <p className="mt-1.5 text-[0.98rem] text-muted">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tint-band" aria-labelledby="data-h">
        <div className="container-y section-tight">
          <SectionHead id="data-h" eyebrow="Your data" title="What we hold, and how" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="card p-6">
              <h3 className="tt-h3">Tokens are encrypted</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                The access tokens LinkedIn issues when you connect are encrypted at rest with AES-256-GCM.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="tt-h3">Your content is yours</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                Your profile, knowledge bank and drafts are private to your account. As between you and us, you own what is
                published to your profile. The{' '}
                <Link href="/terms-and-conditions" className="underline">
                  terms
                </Link>{' '}
                say so.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="tt-h3">Deleting your data</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                Email{' '}
                <a href={`mailto:${siteConfig.contact.privacyEmail}`} className="underline">
                  {siteConfig.contact.privacyEmail}
                </a>{' '}
                to have your account and data deleted. There is no self-serve delete button in the app yet. Details are in the{' '}
                <Link href="/privacy-policy" className="underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-y section-tight" aria-labelledby="yours-h">
        <div className="max-w-3xl">
          <SectionHead id="yours-h" eyebrow="Plain dealing" title="What we cannot promise" />
          <div className="prose-y mt-6">
            <p>
              We are not LinkedIn, and no tool can guarantee how LinkedIn treats any account. What we can say is that
              Tyashin uses only the route LinkedIn provides for this purpose and none of the automation its rules prohibit.
            </p>
            <p>
              You remain responsible for what you publish. Read your drafts, especially on anything involving customers,
              employers, money or the law. Research can be wrong and a model can misread a source; that is why the sources
              are attached and why approval is the default.
            </p>
            <p>
              If something looks wrong with your account or a post, write to{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or use the{' '}
              <Link href="/contact">contact form</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

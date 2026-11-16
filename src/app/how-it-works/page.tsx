import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, SectionHead } from '@/components/PageHero';
import { CtaBand, PrimaryCta, OfferLine } from '@/components/Cta';
import { ComingSoonBadge } from '@/components/ComingSoon';

const TITLE = 'How it works';
const DESCRIPTION =
  'From signing in with LinkedIn to your first published post: setup, campaigns, the four-step quality gate, approval and publishing through LinkedIn’s official API.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/how-it-works' });

const SETUP = [
  ['Business info', 'What you do, your industry and your website.'],
  ['Brand kit', 'Your logo and brand colours.'],
  ['Social handles', 'Your LinkedIn and other handles.'],
  ['Knowledge bank', 'Notes, links and text files about your work.'],
  ['Voice and tone', 'A base tone, how you describe your voice, and the things you never say.'],
  ['Content strategy', 'What you want posting to do for you, and how bold you are comfortable being.'],
  ['Audience', 'Who you are writing for and what they struggle with.'],
];

const PIPELINE = [
  {
    k: 'Research',
    v: 'The agent searches for recent developments on the campaign’s topic. A post about your field can refer to something that happened this week instead of repeating old advice.',
  },
  {
    k: 'Draft',
    v: 'It writes a post from your voice settings, your knowledge bank, the campaign’s topic guidance and the quality rules learned from your earlier edits.',
  },
  {
    k: 'Judge',
    v: 'A second, separate model scores the draft from 0 to 10 on novelty, groundedness, human voice and timeliness. The draft passes only if all four clear the bar. If it falls short, it is revised once with the judge’s notes.',
  },
  {
    k: 'Humanizer',
    v: 'A final pass removes the phrases and rhythms that give machine writing away, and strips formatting that LinkedIn would show as literal symbols.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd page={{ path: '/how-it-works', title: TITLE, description: DESCRIPTION }} />
      <PageHero
        eyebrow="How it works"
        title="From sign-in to a post you are happy to put your name on"
        lead="This page follows the product in the order you will meet it. Nothing here is a plan for later: anything not live yet is on the roadmap and marked as such."
        trail={[{ name: TITLE, path: '/how-it-works' }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryCta />
          <OfferLine />
        </div>
      </PageHero>

      {/* 1 */}
      <section className="container-y section-tight" aria-labelledby="s1">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            id="s1"
            eyebrow="Step 1"
            title="Sign in with LinkedIn"
            lead="You approve the connection on LinkedIn’s own screen. That one step creates your account, pre-fills what it can of your profile, and gives Tyashin permission to publish for you later."
          />
          <div className="card p-7">
            <h3 className="tt-h3">What we get, and what we do not</h3>
            <ul className="mt-4 space-y-3 text-[0.98rem] text-muted">
              <li>
                <strong className="font-semibold text-foreground">We get</strong> your name, photo, headline, email and an access
                token that lets us publish posts you have approved.
              </li>
              <li>
                <strong className="font-semibold text-foreground">We never get</strong> your LinkedIn password. Tokens are
                encrypted at rest, and you can disconnect from the app at any time.
              </li>
              <li>
                Prefer not to start with LinkedIn? Sign up with email and a password and connect LinkedIn when you are
                ready to publish.
              </li>
            </ul>
            <p className="mt-5">
              <Link href="/safety" className="link-arrow">
                More on safety
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className="tint-band" aria-labelledby="s2">
        <div className="container-y section-tight">
          <SectionHead
            id="s2"
            eyebrow="Step 2"
            title="Tell it who you are"
            lead="Setup is seven short screens. You can skip ahead and come back, but the more you give it here, the closer the first draft lands."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SETUP.map(([t, d], i) => (
              <li key={t} className="card rv p-5">
                <span className="tt-num text-[0.8rem] text-primary">{i + 1} / 7</span>
                <h3 className="tt-h3 mt-2">{t}</h3>
                <p className="mt-1.5 text-[0.95rem] text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 */}
      <section className="container-y section-tight" aria-labelledby="s3">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            id="s3"
            eyebrow="Step 3"
            title="Create your first campaign"
            lead="A campaign is one track of content with its own topic, themes and schedule. Most people start with one and add a second when the first feels right."
          />
          <dl className="rule-top">
            {[
              ['Topic guidance', 'What this track covers, and what it should stay away from.'],
              ['Themes', 'Choose from 17: nine strategy themes such as Founder Story and Educational Series, and eight formats such as Myth Buster and Behind the Scenes.'],
              ['Schedule', 'Daily, weekly, chosen weekdays or monthly, at a time you set, in your own time zone.'],
              ['Tone', 'Use your default tone or override it for this campaign.'],
              ['Publishing mode', 'Review and approve (the default) or auto-publish, per campaign.'],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
            <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="flex flex-wrap items-center gap-2 font-semibold">Smart timing</dt>
              <dd className="text-muted">
                <ComingSoonBadge className="mr-2" />
                Slots chosen from when your audience is active. Today you set them.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 4 */}
      <section className="ink-band" aria-labelledby="s4">
        <div className="container-y section">
          <SectionHead
            id="s4"
            eyebrow="Step 4"
            title="The draft goes through four steps before you see it"
            lead="This is the part that separates a post from a paragraph a chatbot produced."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((p, i) => (
              <li key={p.k} className="bg-ink p-6">
                <span className="tt-num text-[0.8rem] text-[#7fd4c1]">0{i + 1}</span>
                <h3 className="tt-h3 mt-3 text-white">{p.k}</h3>
                <p className="mt-2 text-[0.95rem] text-on-ink-muted">{p.v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl font-heading text-[1.6rem] leading-snug">
            A draft that still fails review is never auto-published. It is held for you, you get an email, and the
            reason it failed becomes a rule for next time.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="container-y section-tight" aria-labelledby="s5">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            id="s5"
            eyebrow="Step 5"
            title="You review, edit and approve"
            lead="Read the draft. Change a line, move the time, approve it, or reject it and say why. Nothing is published until you approve it, unless you have chosen otherwise."
          />
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="tt-h3">Review and approve (default)</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                You create drafts when you want them, in a campaign or in AI Studio chat, and each one waits for your
                approval. Approved posts go out at the time you set.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="tt-h3">Auto-publish (opt-in, per campaign)</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                Tyashin drafts ahead of each scheduled slot (you choose how far ahead, from 1 to 72 hours) and publishes
                the drafts that pass review. You still get an email before a post is due, and failed drafts are held.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="tt-h3">Every correction teaches it</h3>
              <p className="mt-2 text-[0.98rem] text-muted">
                Edits and rejections with a reason become quality rules that are applied to your future drafts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 */}
      <section className="tint-band" aria-labelledby="s6">
        <div className="container-y section-tight">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <SectionHead
              id="s6"
              eyebrow="Step 6"
              title="Published on LinkedIn, the official way"
              lead="The post goes to your profile through LinkedIn’s official API. If the post drew on research, its source links follow as a first comment, which you can edit or remove beforehand."
            />
            <ul className="space-y-3 self-center text-[1.02rem]">
              <li className="flex gap-3">
                <span className="live-dot mt-2.5 flex-none" /> An email tells you when a post is live, and if one fails to publish.
              </li>
              <li className="flex gap-3">
                <span className="live-dot mt-2.5 flex-none" /> One image you upload can be attached to a post.
              </li>
              <li className="flex gap-3">
                <span className="live-dot mt-2.5 flex-none" /> No browser automation, no auto-DMs, no engagement pods.
              </li>
              <li className="pt-3">
                <Link href="/features" className="link-arrow">
                  The full feature list
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

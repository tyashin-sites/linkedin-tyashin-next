import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';

/** The primary conversion CTA: always the app's signup, always this label by default. */
export function PrimaryCta({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <a href={siteConfig.cta.primary.href} className={`btn btn-primary ${className}`}>
      {children ?? siteConfig.cta.primary.label}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function GhostLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`btn btn-ghost ${className}`}>
      {children}
    </Link>
  );
}

/** The honest two-step offer, in one line under a CTA. */
export function OfferLine({ className = '' }: { className?: string }) {
  return <p className={`text-[0.92rem] text-muted ${className}`}>{siteConfig.offerLine}</p>;
}

/** Closing band used at the foot of every marketing page. */
export function CtaBand({
  title = 'Write your first two posts free.',
  lead = 'Sign in with LinkedIn, tell it who you are, and read a draft in your own voice. No card until you decide to continue.',
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="ink-band" aria-labelledby="cta-band-h">
      <div className="container-y section-tight flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-band-h" className="tt-h2">
            {title}
          </h2>
          <p className="tt-lead mt-4">{lead}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <PrimaryCta />
            <GhostLink href="/pricing">See pricing</GhostLink>
          </div>
          <p className="text-[0.9rem] text-on-ink-muted">{siteConfig.offerLine}</p>
        </div>
      </div>
    </section>
  );
}

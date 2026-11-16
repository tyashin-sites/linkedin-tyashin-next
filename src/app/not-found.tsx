import type { Metadata } from 'next';
import Link from 'next/link';
import { PrimaryCta } from '@/components/Cta';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } };

const LINKS = [
  ['How it works', '/how-it-works'],
  ['Features', '/features'],
  ['Use cases', '/use-cases'],
  ['Pricing', '/pricing'],
  ['FAQ', '/faq'],
  ['Contact', '/contact'],
];

export default function NotFound() {
  return (
    <section className="container-y section">
      <div className="max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="tt-h1 mt-5">
          This page was never <span className="accent-word">drafted</span>.
        </h1>
        <p className="tt-lead mt-6">
          The address may be old or mistyped. Nothing is broken on your side. Here is where most people were heading.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="inline-block rounded-full border border-border px-4 py-2 text-[0.95rem] hover:border-primary hover:text-primary-deep">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/blog" className="inline-block rounded-full border border-border px-4 py-2 text-[0.95rem] hover:border-primary hover:text-primary-deep">
              Blog
            </a>
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ghost">
            Back to the home page
          </Link>
          <PrimaryCta />
        </div>
      </div>
    </section>
  );
}

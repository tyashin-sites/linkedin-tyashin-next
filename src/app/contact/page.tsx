import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';

const TITLE = 'Contact';
const DESCRIPTION = 'Ask a question about Tyashin for LinkedIn, get help with your account, or send a privacy or billing request. A person replies.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/contact' });

export default function ContactPage() {
  const { contact, company } = siteConfig;
  const rows: [string, string, string][] = [
    ['General and support', contact.email, 'Questions before signing up, and help with your account.'],
    ['Privacy', contact.privacyEmail, 'Access, correction or deletion of your data.'],
    ['Legal', contact.legalEmail, 'Terms, notices and the sales referral programme.'],
  ];
  return (
    <>
      <JsonLd page={{ path: '/contact', title: TITLE, description: DESCRIPTION, type: 'ContactPage' }} />
      <PageHero
        eyebrow="Contact"
        title="Write to us"
        lead="Use the form or email us directly. Either way a person reads it and replies by email."
        trail={[{ name: TITLE, path: '/contact' }]}
      />
      <section className="container-y pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <ContactForm />
          <aside aria-label="Other ways to reach us" className="space-y-8">
            <dl className="rule-top">
              {rows.map(([k, mail, note]) => (
                <div key={k} className="border-b border-border py-5">
                  <dt className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${mail}`} className="link-arrow break-all">
                      {mail}
                    </a>
                    <span className="mt-1 block text-[0.94rem] text-muted">{note}</span>
                  </dd>
                </div>
              ))}
              <div className="border-b border-border py-5">
                <dt className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-muted">Company</dt>
                <dd className="mt-1.5">{company.legalName}</dd>
              </div>
            </dl>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="link-arrow">
                  Check the FAQ first
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="link-arrow">
                  Make a formal complaint
                </Link>
              </li>
              <li>
                <a href={siteConfig.cta.signIn.href} className="link-arrow">
                  Sign in to your account
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

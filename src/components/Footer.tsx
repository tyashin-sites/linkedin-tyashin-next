import Link from 'next/link';
import { footerNav, siteConfig } from '@/config/site';
import { personas } from '@/data/personas';
import { Logo } from '@/components/Logo';
import { NewsletterForm } from '@/components/NewsletterForm';
import type { BlogPost } from '@/lib/blog';

/**
 * The footer is the internal-link safety net: every page on the site is
 * reachable from here (all use cases, all legal pages, recent posts).
 * Section anchors in shared chrome are always absolute.
 */
export function Footer({ recentPosts }: { recentPosts: Pick<BlogPost, 'slug' | 'title'>[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="ink-band">
      <div className="container-y pb-8 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-md">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block rounded-lg">
              <Logo onInk />
            </Link>
            <p className="mt-5 font-heading text-[1.55rem] leading-tight">{siteConfig.tagline}</p>
            <p className="mt-3 text-[0.95rem] text-on-ink-muted">
              Posts in your own voice, checked before you see them, published through LinkedIn’s official API.
            </p>
            <div className="mt-8">
              <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-on-ink-muted">Newsletter</h2>
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-on-ink-muted">{col.heading}</h2>
                <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith('/blog') ? (
                        <a href={l.href} className="hover:underline">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="hover:underline">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-on-ink-muted">Use cases</h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                <li>
                  <Link href="/use-cases" className="hover:underline">
                    All use cases
                  </Link>
                </li>
                {personas.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/use-cases/${p.slug}`} className="hover:underline">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {recentPosts.length ? (
          <div className="mt-14 border-t border-white/15 pt-8">
            <h2 className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-on-ink-muted">From the blog</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-[0.86rem] text-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.company.legalName}. {siteConfig.name} is a product of {siteConfig.company.legalName}.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={siteConfig.cta.signIn.href} className="hover:text-white hover:underline">
              Sign in
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white hover:underline">
              {siteConfig.contact.email}
            </a>
            <a href="/llms.txt" className="hover:text-white hover:underline">
              llms.txt
            </a>
          </p>
        </div>
        <p className="mt-6 text-center text-[0.82rem] text-on-ink-muted">
          Powered by{' '}
          <a href="https://tyashin.com" target="_blank" rel="noopener" className="underline hover:text-white">
            Tyashin
          </a>
        </p>
      </div>
    </footer>
  );
}

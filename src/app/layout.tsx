import type { Metadata, Viewport } from 'next';
import { bodyFont, displayFont, monoFont } from '@/lib/fonts';
import { SITE, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { listPosts } from '@/lib/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MotionFX } from '@/components/MotionFX';
import './globals.css';

/*
 * ROBOTS_NOINDEX canary. Baked at BUILD time for prerendered pages — export it
 * in the build env and rebuild at cutover (README, cutover checklist).
 */
const NOINDEX = process.env.ROBOTS_NOINDEX === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl('/')),
  title: { default: `${SITE.name}: ${siteConfig.tagline}`, template: `%s · ${SITE.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl('/'),
    title: `${SITE.name}: ${siteConfig.tagline}`,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
  ...(NOINDEX ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
};

export const viewport: Viewport = { themeColor: '#FAFAF6' };

/*
 * Canonical palette at html:root (specificity 0,1,1): beats any plain `:root{}`
 * brand kit the platform edge may inject, whatever the order. Plain hex only.
 * Primary = the teal of the existing logo family; spark = its amber, darkened
 * to clear AA as text.
 */
const CANONICAL_BRAND_CSS = `
html,body{background-color:var(--brand-bg)}
html:root{--brand-bg:#FAFAF6;--brand-surface:#F0F4EF;--brand-paper:#FFFFFF;--brand-ink:#0C2622;--brand-text:#10201D;--brand-text-muted:#4E605B;--brand-primary:#0F766E;--brand-primary-deep:#0B5750;--brand-primary-tint:#E3F1EE;--brand-primary-contrast:#FFFFFF;--brand-spark:#8F5206;--brand-border:rgba(12,38,34,.14);--brand-radius-sm:6px;--brand-radius-md:10px;--brand-radius-lg:16px;--brand-radius-xl:22px}
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Recent posts for the footer mesh. Short revalidate (not no-store), so
  // static pages stay static.
  const recent = (await listPosts({ limit: 6 })).posts.map((p) => ({ slug: p.slug, title: p.title }));
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CANONICAL_BRAND_CSS }} />
      </head>
      <body className="bg-background font-body text-foreground antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="min-h-[60vh] overflow-x-clip outline-none">
          {children}
        </main>
        <Footer recentPosts={recent} />
        <MotionFX />
      </body>
    </html>
  );
}

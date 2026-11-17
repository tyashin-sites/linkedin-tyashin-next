import { getSiteRoutes } from '@/lib/site-routes';
import { SITE } from '@/lib/seo';
import { listPosts } from '@/lib/blog';

/**
 * /sitemap-pages.xml — this site's own route sitemap. The platform's
 * /sitemap.xml is an index that references this file plus its own
 * /sitemap-content.xml (platform blog posts). Never app/sitemap.ts: the
 * platform owns /sitemap.xml.
 *
 * Every <loc> uses the canonical origin (SITE.url), never the request host:
 * behind the platform the Worker sees its workers.dev host, and a sitemap
 * must list canonical URLs only.
 *
 * Blog posts: platform posts live in the platform's content sitemap. The
 * local fallback posts are in no platform sitemap, so they are listed here,
 * but only while they are what /blog is serving.
 */
export const dynamic = 'force-dynamic';

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET(): Promise<Response> {
  const origin = SITE.url.replace(/\/+$/, '');
  const abs = (path: string) => `${origin}${path === '/' ? '' : path}`;
  const entries = getSiteRoutes().map((r) => ({ loc: abs(r.path), freq: r.changeFrequency as string, pri: r.priority }));

  const blog = await listPosts({ limit: 50 });
  if (blog.source === 'local') {
    for (const p of blog.posts) entries.push({ loc: abs(`/blog/${p.slug}`), freq: 'yearly', pri: 0.5 });
  }

  const urls = entries
    .map((e) => `  <url>\n    <loc>${esc(e.loc)}</loc>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.pri.toFixed(1)}</priority>\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600, s-maxage=86400' },
  });
}

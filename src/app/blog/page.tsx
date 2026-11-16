import type { Metadata } from 'next';
import { cache } from 'react';
import { pageMetadata } from '@/lib/seo';
import { listPosts } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';
import { PostCards } from '@/components/PostList';

/*
 * /blog — native index. Platform Blog API first; the posts migrated from the
 * previous site while the platform has none (src/lib/blog.ts). Rendered per
 * request (data cached 5 minutes). The platform's own /blog must be set to
 * `storefront` ownership for this route to serve (README, cutover checklist).
 */
export const dynamic = 'force-dynamic';

const TITLE = 'Blog';
const DESCRIPTION =
  'Practical notes on writing for LinkedIn: finding your voice, posting on a schedule you can keep, and using AI without sounding like it.';

type Search = Promise<{ page?: string }>;
const pageOf = (sp: { page?: string }) => Math.max(1, parseInt(sp.page || '1', 10) || 1);
const load = cache((page: number) => listPosts({ page }));

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const page = pageOf(await searchParams);
  const meta = pageMetadata({
    title: page > 1 ? `${TITLE}, page ${page}` : TITLE,
    description: DESCRIPTION,
    path: page > 1 ? `/blog?page=${page}` : '/blog',
  });
  return { ...meta, alternates: { ...meta.alternates, types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: 'Tyashin for LinkedIn blog' }] } } };
}

export default async function BlogIndex({ searchParams }: { searchParams: Search }) {
  const page = pageOf(await searchParams);
  const { posts, totalPages } = await load(page);
  const href = (p: number) => (p > 1 ? `/blog?page=${p}` : '/blog');

  return (
    <>
      <JsonLd
        page={{
          path: '/blog',
          title: TITLE,
          description: DESCRIPTION,
          type: 'CollectionPage',
          crumbs: [{ name: TITLE, path: '/blog' }],
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        }}
      />
      <PageHero
        eyebrow="Blog"
        title="Notes on writing for LinkedIn"
        lead="Finding your voice, keeping a schedule, and using AI without sounding like it. Opinion and practice from the team that builds Tyashin."
        trail={[{ name: TITLE, path: '/blog' }]}
      />
      <section className="container-y pb-24" aria-label="Articles">
        {posts.length ? (
          <PostCards posts={posts} />
        ) : (
          <div className="card max-w-2xl p-8">
            <h2 className="tt-h3">There is nothing on this page.</h2>
            <p className="mt-2 text-muted">
              <a href="/blog" className="link-arrow">
                Back to the first page of articles
              </a>
            </p>
          </div>
        )}
        {totalPages > 1 ? (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-4 text-[0.95rem]">
            {page > 1 ? (
              <a href={href(page - 1)} rel="prev" className="link-arrow">
                ← Newer
              </a>
            ) : (
              <span />
            )}
            <span className="tt-num text-muted">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <a href={href(page + 1)} rel="next" className="link-arrow">
                Older →
              </a>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </section>
      <CtaBand />
    </>
  );
}

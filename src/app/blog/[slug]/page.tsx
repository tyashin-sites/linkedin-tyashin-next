import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { formatPostDate, getPost, listPosts, pickRelated, postBodyHtml, postSeo } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/PageHero';
import { CtaBand } from '@/components/Cta';
import { PostCards } from '@/components/PostList';

/* /blog/[slug] — one post. Rendered per request; 404 when the slug is unknown. */
export const dynamic = 'force-dynamic';

type Params = Promise<{ slug: string }>;

const load = cache(async (slug: string) => {
  const [post, recent] = await Promise.all([getPost(slug), listPosts({ limit: 24 })]);
  return post ? { post, recent: recent.posts } : null;
});

function absolute(src?: string): string | undefined {
  if (!src) return undefined;
  return /^https?:\/\//.test(src) ? src : siteUrl(src);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = (await load((await params).slug))?.post;
  if (!post) return { title: 'Article not found', robots: { index: false, follow: true } };
  const { title, description } = postSeo(post);
  const meta = pageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    image: absolute(post.seo?.ogImage || post.featuredImage),
    type: 'article',
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(post.tags.length ? { tags: post.tags } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const loaded = await load((await params).slug);
  if (!loaded) notFound();
  const { post, recent } = loaded;
  const related = pickRelated(post, recent);
  const { description } = postSeo(post);
  const body = postBodyHtml(post);
  const hero = post.featuredImage && !(post.content || '').includes(post.featuredImage) ? post.featuredImage : undefined;
  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  const meta = [post.authorName, post.readTime ? `${post.readTime} min read` : undefined].filter(Boolean).join(' · ');

  return (
    <>
      <JsonLd
        page={{
          path: `/blog/${post.slug}`,
          title: post.title,
          description,
          crumbs: trail,
          article: {
            headline: post.title,
            description,
            image: absolute(post.seo?.ogImage || post.featuredImage),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            authorName: post.authorName,
            keywords: post.tags,
            section: post.category,
          },
        }}
      />
      <article>
        <header className="container-y pb-8 pt-10 sm:pt-14">
          <Breadcrumbs trail={trail} />
          <div className="mt-10 max-w-3xl">
            {post.category ? <p className="eyebrow">{post.category}</p> : null}
            <h1 className="tt-h1 mt-5">{post.title}</h1>
            {post.excerpt ? <p className="tt-lead mt-6">{post.excerpt}</p> : null}
            <p className="mt-6 text-[0.88rem] text-muted">
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {meta ? ` · ${meta}` : ''}
            </p>
          </div>
        </header>
        {hero ? (
          <div className="container-y">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="aspect-[16/9] w-full max-w-4xl rounded-xl border border-border object-cover" fetchPriority="high" decoding="async" />
          </div>
        ) : null}
        <div className="container-y pb-16 pt-8">
          <div className="prose-y max-w-3xl" dangerouslySetInnerHTML={{ __html: body }} />
          {post.tags.length ? (
            <ul aria-label="Tags" className="mt-10 flex max-w-3xl flex-wrap gap-2 border-t border-border pt-6">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-[0.8rem] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-10">
            <a href="/blog" className="link-arrow">
              ← All articles
            </a>
          </p>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-h" className="tint-band">
          <div className="container-y section-tight">
            <h2 id="related-h" className="tt-h2 mb-10">
              Keep reading
            </h2>
            <PostCards posts={related} headingLevel="h3" />
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}

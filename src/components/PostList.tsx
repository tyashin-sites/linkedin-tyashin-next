import type { BlogPost } from '@/lib/blog';
import { formatPostDate } from '@/lib/blog';

function Meta({ post }: { post: BlogPost }) {
  const parts = [post.category, post.readTime ? `${post.readTime} min read` : undefined].filter(Boolean);
  return parts.length ? <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-primary">{parts.join(' · ')}</p> : null;
}

/** Plain <a> links: every blog page is a fresh server render. */
export function PostCards({ posts, headingLevel = 'h2' }: { posts: BlogPost[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <a href={`/blog/${post.slug}`} className="card flex h-full flex-col overflow-hidden">
            {post.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.featuredImage} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
            ) : null}
            <div className="flex flex-1 flex-col p-6">
              <Meta post={post} />
              <H className="mt-3 font-heading text-[1.5rem] leading-[1.18]">
                {post.pinned ? <span className="mr-2 align-middle text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-spark">Featured</span> : null}
                {post.title}
              </H>
              {post.excerpt ? <p className="mt-3 line-clamp-3 text-[0.96rem] text-muted">{post.excerpt}</p> : null}
              <p className="mt-auto pt-5 text-[0.84rem] text-muted">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

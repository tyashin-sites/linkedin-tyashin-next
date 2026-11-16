import { apiGet } from '@/lib/api';
import { LOCAL_POSTS } from '@/data/blog-posts';

/**
 * Native blog data, with a fallback chain:
 *
 *   1. The platform's public Blog API (cross-origin, server-side, X-API-Key).
 *      Posts are written in Tyashin (Blog plugin) and read here per request,
 *      with a 5-minute data cache.
 *   2. When the platform has ZERO published posts — or no API key is set, or
 *      the API does not answer in time — the posts migrated from the previous
 *      site (src/data/blog-posts.ts).
 *
 * The moment the platform has one published post, the local posts stop being
 * listed (a local post's URL keeps resolving so old links never 404).
 * Never the same-origin /_tyashin/blog endpoint: a dispatched Worker fetching
 * its own hostname re-enters the platform dispatcher.
 */

export const BLOG_REVALIDATE = 300;
export const POSTS_PER_PAGE = 12;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  contentFormat?: 'html' | 'markdown';
  featuredImage?: string;
  authorName?: string;
  category?: string;
  tags: string[];
  pinned?: boolean;
  readTime?: number;
  publishedAt?: string;
  updatedAt?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  source: 'platform' | 'local';
}

function normalise(p: Record<string, unknown>): BlogPost | null {
  if (typeof p?.slug !== 'string' || typeof p?.title !== 'string') return null;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: (p.excerpt as string) || undefined,
    content: (p.content as string) || undefined,
    contentFormat: p.contentFormat === 'markdown' ? 'markdown' : 'html',
    featuredImage: (p.featuredImage as string) || undefined,
    authorName: (p.authorName as string) || undefined,
    category: (p.categoryName as string) || undefined,
    tags: Array.isArray(p.tags) ? (p.tags as unknown[]).filter((t): t is string => typeof t === 'string') : [],
    pinned: Boolean(p.pinned),
    readTime: typeof p.readTime === 'number' ? p.readTime : undefined,
    publishedAt: (p.publishedAt as string) || undefined,
    updatedAt: (p.updatedAt as string) || undefined,
    seo: (p.seo as BlogPost['seo']) || undefined,
    source: 'platform',
  };
}

/** The migrated posts, newest first, in the shared shape. */
export function localPosts(): BlogPost[] {
  return LOCAL_POSTS.map(
    (p): BlogPost => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      contentFormat: 'html',
      authorName: p.author,
      category: p.category,
      tags: p.tags,
      readTime: parseInt(p.readingTime, 10) || undefined,
      publishedAt: p.publishedAt,
      seo: { metaDescription: p.metaDescription },
      source: 'local',
    }),
  ).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
}

export interface PostList {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  page: number;
  source: 'platform' | 'local';
}

export async function listPosts(opts: { page?: number; limit?: number } = {}): Promise<PostList> {
  const page = Math.max(1, Math.floor(opts.page || 1));
  const limit = opts.limit || POSTS_PER_PAGE;
  const q = new URLSearchParams({ page: String(page), limit: String(limit) });
  const json = await apiGet<{ data?: Record<string, unknown>[]; meta?: { total?: number; totalPages?: number } }>(
    `/public/blog/posts?${q}`,
    { revalidate: BLOG_REVALIDATE },
  );
  const platform = (json?.data || []).map(normalise).filter((p): p is BlogPost => p !== null);
  const platformTotal = json?.meta?.total ?? platform.length;
  if (platformTotal > 0) {
    return { posts: platform, total: platformTotal, totalPages: Math.max(1, json?.meta?.totalPages ?? 1), page, source: 'platform' };
  }
  const all = localPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / limit));
  return { posts: all.slice((page - 1) * limit, page * limit), total: all.length, totalPages, page, source: 'local' };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9][a-z0-9-]{0,190}$/i.test(slug)) return null;
  const json = await apiGet<{ data?: Record<string, unknown> }>(`/public/blog/posts/${slug}`, { revalidate: BLOG_REVALIDATE });
  if (json?.data) {
    const post = normalise(json.data);
    if (post) return post;
  }
  return localPosts().find((p) => p.slug === slug) ?? null;
}

/** Up to `count` other posts, most shared tags first, then newest. */
export function pickRelated(current: BlogPost, candidates: BlogPost[], count = 3): BlogPost[] {
  const mine = new Set(current.tags.map((t) => t.toLowerCase()));
  return candidates
    .filter((p) => p.slug !== current.slug)
    .map((p, i) => ({ p, i, overlap: p.tags.filter((t) => mine.has(t.toLowerCase())).length }))
    .sort((a, b) => b.overlap - a.overlap || a.i - b.i)
    .slice(0, count)
    .map((x) => x.p);
}

function clampAtWord(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.-]+$/, '')}…`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Title + description resolved once so <title>, OG and JSON-LD agree. */
export function postSeo(post: BlogPost): { title: string; description: string } {
  const title = (post.seo?.metaTitle || '').trim() || post.title.trim() || 'Article';
  const description =
    (post.seo?.metaDescription || '').trim() || (post.excerpt || '').trim() || clampAtWord(stripHtml(post.content || ''), 155);
  return { title, description: clampAtWord(description, 300) };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Small Markdown subset for platform posts stored as markdown. */
export function markdownToHtml(md: string): string {
  const inline = (s: string) =>
    esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  const out: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const raw of md.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (!line.trim()) {
      flush();
      close();
    } else if (h) {
      flush();
      close();
      const level = Math.min(4, h[1].length + 1); // the page owns the h1
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
    } else if (ul || ol) {
      flush();
      const kind = ul ? 'ul' : 'ol';
      if (list !== kind) {
        close();
        out.push(`<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline((ul || ol)![1])}</li>`);
    } else if (line.startsWith('>')) {
      flush();
      close();
      out.push(`<blockquote><p>${inline(line.replace(/^>\s?/, ''))}</p></blockquote>`);
    } else {
      close();
      para.push(line.trim());
    }
  }
  flush();
  close();
  return out.join('\n');
}

/** Strip anything executable from CMS HTML; demote a body <h1>. */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed|form|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(script|style|iframe|object|embed|form|link|meta|base)\b[^>]*\/?>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src|xlink:href|action)\s*=\s*(["']?)\s*(?:javascript|vbscript|data:text\/html)[^"'\s>]*\2/gi, '$1="/"')
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>');
}

export function postBodyHtml(post: BlogPost): string {
  const raw = post.content || '';
  return sanitizeHtml(post.contentFormat === 'markdown' ? markdownToHtml(raw) : raw);
}

export function formatPostDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

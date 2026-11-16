import { apiGet } from '@/lib/api';
import { sanitizeHtml } from '@/lib/blog';
import { legalFallback } from '@/data/legal-fallback';

/**
 * Legal pages. Source of truth = the platform legal API (admin-edited HTML,
 * GET /api/v1/public/legal/:slug?format=json). When the platform has no page
 * for the slug, or no key is configured, the local text migrated from the
 * previous site is rendered instead (src/data/legal-fallback.ts).
 */
export const LEGAL_SLUGS = ['privacy-policy', 'terms-and-conditions', 'sales-terms'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalDoc {
  title: string;
  updated?: string;
  html: string;
  source: 'platform' | 'local';
}

export async function getLegalDoc(slug: LegalSlug): Promise<LegalDoc> {
  const json = await apiGet<{ data?: { title?: string; html?: string; content?: string } }>(
    `/public/legal/${encodeURIComponent(slug)}?format=json`,
    { revalidate: 300, deadlineMs: 3000 },
  );
  const html = json?.data?.html || json?.data?.content || '';
  const local = legalFallback[slug];
  if (html.trim()) return { title: json?.data?.title || local.title, html: sanitizeHtml(html), source: 'platform' };
  return { ...local, source: 'local' };
}

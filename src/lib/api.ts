import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * src/lib/api.ts — the single point of change for every Tyashin platform call.
 * SERVER-ONLY: the API key is a Worker secret and never reaches the browser
 * (forms post to this site's own /api/* routes, which forward from here).
 *
 * Everything degrades gracefully: with no key the helpers report
 * `configured: false` and callers render their local fallback.
 */

export interface TyashinEnv {
  apiUrl: string;
  apiKey: string;
  projectId: string;
  configured: boolean;
}

export function tyashinEnv(): TyashinEnv {
  let e: Record<string, unknown> = {};
  try {
    e = getCloudflareContext().env as Record<string, unknown>;
  } catch {
    /* next build / next start: no Cloudflare context */
  }
  const pick = (k: string): string => {
    const v = process.env[k] ?? e[k];
    return typeof v === 'string' ? v.trim() : '';
  };
  const apiUrl = (pick('TYASHIN_API_URL') || 'https://website-api.tyashin.com').replace(/\/+$/, '');
  const apiKey = pick('TYASHIN_API_KEY');
  return { apiUrl, apiKey, projectId: pick('PROJECT_ID'), configured: apiKey.length > 0 };
}

/** Absolute URL for a platform path under /api/v1 (e.g. '/public/blog/posts'). */
export function apiUrl(path: string): string {
  return `${tyashinEnv().apiUrl}/api/v1/${path.replace(/^\/+/, '')}`;
}

/** Keep a promise alive past the response on Workers; a no-op under Node. */
export function keepAlive(p: Promise<unknown>): void {
  try {
    getCloudflareContext().ctx.waitUntil(p);
  } catch {
    /* Node keeps the promise alive itself */
  }
}

const DEADLINE_MS = 4000;

/**
 * GET JSON from the platform with the project key. Returns null on any error,
 * non-2xx, missing key or timeout — never throws. Raced against a deadline
 * (not aborted) so a slow cold call still warms Next's data cache.
 */
export async function apiGet<T>(
  path: string,
  opts: { revalidate?: number | false; deadlineMs?: number } = {},
): Promise<T | null> {
  const { apiKey, configured } = tyashinEnv();
  if (!configured) return null;
  const run = (async () => {
    try {
      const res = await fetch(apiUrl(path), {
        headers: { accept: 'application/json', 'X-API-Key': apiKey },
        ...(opts.revalidate === false ? { cache: 'no-store' as const } : { next: { revalidate: opts.revalidate ?? 300 } }),
      });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch {
      return null;
    }
  })();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), opts.deadlineMs ?? DEADLINE_MS);
  });
  try {
    const out = await Promise.race([run.then((v) => ({ v })), deadline]);
    if (out) return out.v;
    keepAlive(run);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** POST JSON to the platform with the project key. Returns the upstream status + body. */
export async function apiPost(
  path: string,
  body: unknown,
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  const { apiKey, configured } = tyashinEnv();
  if (!configured) return { ok: false, status: 0, data: {} };
  try {
    const res = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 502, data: {} };
  }
}

#!/usr/bin/env node
/**
 * Site gate. Run against a running build:
 *
 *   npx next build && npx next start -p 3311 &
 *   node scripts/check-site.mjs http://localhost:3311
 *
 * 1. Coverage: every src/app/**\/page.tsx is in /sitemap-pages.xml (which is
 *    getSiteRoutes()), except /blog/[slug] (data-driven).
 * 2. Every sitemap URL answers 200.
 * 3. Crawl: every internal href found on any fetched page answers 200
 *    (redirects are followed and must land on a 200).
 * 4. Copy rules: no other product named in src/, no street address anywhere.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const base = (process.argv[2] || 'http://localhost:3311').replace(/\/+$/, '');
const root = new URL('..', import.meta.url).pathname;
let failed = 0;
const fail = (msg) => {
  failed++;
  console.log(`FAIL  ${msg}`);
};

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// 1. Coverage
const sitemap = await (await fetch(`${base}/sitemap-pages.xml`)).text();
const origin = new URL(base).origin;
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const canonicalOrigin = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'linkedinautomation.tyashin.com'}`;
const locOrigins = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).origin));
if (locOrigins.size !== 1 || !locOrigins.has(canonicalOrigin)) fail(`sitemap origin is not the canonical origin ${canonicalOrigin}: ${[...locOrigins].join(', ')}`);
const appDir = join(root, 'src/app');
const pageRoutes = walk(appDir)
  .filter((f) => f.endsWith('/page.tsx'))
  .map((f) => '/' + relative(appDir, f).replace(/\/?page\.tsx$/, ''))
  .map((r) => (r === '/' ? '/' : r.replace(/\/$/, '')));
for (const r of pageRoutes) {
  if (r === '/blog/[slug]') continue;
  if (r.includes('[slug]')) {
    const prefix = r.replace('[slug]', '');
    if (!sitemapPaths.some((p) => p.startsWith(prefix) && p.length > prefix.length)) fail(`no sitemap entries for dynamic route ${r}`);
  } else if (!sitemapPaths.includes(r)) fail(`page ${r} is missing from getSiteRoutes()`);
}
console.log(`coverage: ${pageRoutes.length} page.tsx files, ${sitemapPaths.length} sitemap URLs`);

// 2 + 3. Fetch + crawl
const seen = new Map();
const queue = [...new Set([...sitemapPaths, '/llms.txt', '/privacy', '/terms'])];
const sources = new Map();
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const res = await fetch(base + path, { redirect: 'follow' });
  seen.set(path, res.status);
  if (res.status !== 200) {
    fail(`${res.status} ${path}${sources.has(path) ? `  (linked from ${sources.get(path)})` : ''}`);
    continue;
  }
  if (!(res.headers.get('content-type') || '').includes('text/html')) continue;
  const html = await res.text();
  if (/href="#"|lorem ipsum/i.test(html)) fail(`placeholder link or lorem text on ${path}`);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('#') || /^(mailto:|tel:|https?:\/\/|\/\/)/.test(href)) continue;
    if (href.startsWith('/_next/') || /\.(css|js|woff2|png|svg|ico)(\?|$)/.test(href)) continue;
    href = href.split('#')[0];
    if (!href || seen.has(href) || queue.includes(href)) continue;
    sources.set(href, path);
    queue.push(href);
  }
}
const notFound = await fetch(`${base}/this-page-does-not-exist`);
if (notFound.status !== 404) fail(`unknown URL answered ${notFound.status}, expected 404`);
console.log(`crawl: ${seen.size} internal URLs fetched, ${[...seen.values()].filter((s) => s === 200).length} answered 200; unknown URL → ${notFound.status}`);

// 4. Copy rules
const NAMES = ['Taplio', 'Supergrow', 'Buffer', 'Hootsuite', 'ChatGPT', 'AuthoredUp', 'Kleo', 'Typefully', 'Jasper', 'Copy.ai'];
const ADDRESS = ['Melanie Court', 'Burlington', 'L7P 2W8'];
for (const f of walk(join(root, 'src'))) {
  if (!/\.(ts|tsx|css|json)$/.test(f)) continue;
  const text = readFileSync(f, 'utf8');
  for (const n of NAMES) if (new RegExp(`\\b${n.replace('.', '\\.')}\\b`, 'i').test(text)) fail(`other product named (${n}) in ${relative(root, f)}`);
}
for (const f of walk(root)) {
  if (!/\.(ts|tsx|css|json|jsonc|md|mjs|py|txt)$/.test(f) || f.endsWith('scripts/check-site.mjs')) continue;
  const text = readFileSync(f, 'utf8');
  for (const a of ADDRESS) if (text.includes(a)) fail(`street address fragment (${a}) in ${relative(root, f)}`);
}

console.log(failed ? `\n${failed} problem(s)` : '\nall checks passed');
process.exit(failed ? 1 : 0);

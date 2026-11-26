import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

/*
 * The project's Tyashin slug host (https://<slug>.sites.tyashin.com) — where the
 * platform serves the paths it owns. Through Tyashin dispatch these rewrites are
 * no-ops (dispatch intercepts first); they only matter for direct *.workers.dev
 * access. Unset until the platform project exists → no rewrites are emitted.
 */
const SLUG_HOST = (process.env.TYASHIN_SLUG_HOST || '').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'linkedinautomation.tyashin.com',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://linkedin.tyashin.com',
  },
  async redirects() {
    return [
      // Short legal slugs and the old marketing site's URLs.
      // Browsers and crawlers still ask for /favicon.ico; the real icon is the PNG mark.
      { source: '/favicon.ico', destination: '/brand/logo-icon.png', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/whats-coming', destination: '/roadmap', permanent: true },
      { source: '/automation', destination: '/how-it-works', permanent: true },
      { source: '/compare', destination: '/features', permanent: true },
      { source: '/blog/ai-linkedin-content-tools-comparison', destination: '/blog', permanent: true },
    ];
  },
  async rewrites() {
    if (!SLUG_HOST) return [];
    return ['/brand-kit.css', '/tyashin-runtime.js', '/sitemap.xml', '/robots.txt', '/blog/rss.xml', '/rss.xml', '/feed', '/feed.xml'].map(
      (source) => ({ source, destination: `${SLUG_HOST}${source}` }),
    );
  },
};

export default nextConfig;

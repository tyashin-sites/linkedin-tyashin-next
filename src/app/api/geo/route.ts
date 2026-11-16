import { NextResponse } from 'next/server';
import { currencyForCountry } from '@/lib/pricing';

/**
 * GET /api/geo → { country, currency }. Same-origin replacement for the old
 * site's cross-origin call to the product API (no CORS to configure). The
 * country comes from Cloudflare's `cf-ipcountry` request header; nothing is
 * stored and no IP is read. Off Cloudflare the header is absent → USD.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const raw = (request.headers.get('cf-ipcountry') || '').toUpperCase();
  const country = /^[A-Z]{2}$/.test(raw) && raw !== 'XX' && raw !== 'T1' ? raw : null;
  return NextResponse.json(
    { country, currency: currencyForCountry(country) },
    { headers: { 'cache-control': 'private, no-store' } },
  );
}

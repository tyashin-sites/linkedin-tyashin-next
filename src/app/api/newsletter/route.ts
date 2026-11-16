import { NextResponse } from 'next/server';
import { apiPost, tyashinEnv } from '@/lib/api';

/**
 * POST /api/newsletter → the platform Newsletter plugin
 * (`/api/v1/newsletter/public/subscribe`). Server-side so the key never
 * reaches the browser. With no key: NOT_CONFIGURED, and the footer form says
 * signup is not available yet.
 */
export async function POST(request: Request) {
  let body: { email?: string; website?: string; source?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ success: false, error: { code: 'BAD_JSON', message: 'Invalid request.' } }, { status: 400 });
  }

  // Honeypot — accept silently so bots do not retry.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ success: true, data: { discarded: true } });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || email.length > 254 || !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_EMAIL', message: 'Please enter a valid email address.' } },
      { status: 400 },
    );
  }

  if (!tyashinEnv().configured) {
    return NextResponse.json(
      { success: false, error: { code: 'NOT_CONFIGURED', message: 'Newsletter signup is not available yet.' } },
      { status: 503 },
    );
  }

  const res = await apiPost('/newsletter/public/subscribe', {
    email,
    source: (typeof body.source === 'string' ? body.source : 'linkedin-site-footer').slice(0, 80),
    tags: ['linkedin-site'],
    metadata: { referer: request.headers.get('referer') || undefined },
  });
  if (!res.ok) {
    const upstream = res.data.error as { message?: string } | undefined;
    return NextResponse.json(
      { success: false, error: { code: 'UPSTREAM', message: upstream?.message || 'We could not subscribe you. Please try again.' } },
      { status: res.status >= 400 ? res.status : 502 },
    );
  }
  return NextResponse.json({ success: true });
}

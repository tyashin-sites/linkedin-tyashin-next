import { NextResponse } from 'next/server';
import { apiPost, tyashinEnv } from '@/lib/api';

/**
 * POST /api/contact → the platform Contact Form & Lead Capture plugin
 * (`/api/v1/contact/public/submit`, X-API-Key, server-side).
 *
 * The response is honest about delivery: the visitor is told the message was
 * sent only when the platform accepted it. With no API key configured the
 * route answers NOT_CONFIGURED and the form shows a "not available yet" state
 * with the email address instead. Log lines carry the topic only, never the
 * visitor's details.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ['Question before signing up', 'Help with my account', 'Billing', 'Privacy or data request', 'Partnership or press', 'Other'];

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (str(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const topicRaw = str(body.topic, 60);
  const topic = TOPICS.includes(topicRaw) ? topicRaw : 'Other';
  const message = str(body.message, 5000);
  const renderedAt = Number(body.renderedAt);

  if (!name) return NextResponse.json({ ok: false, error: 'Please add your name.' }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: 'Please add a valid email address.' }, { status: 400 });
  if (!message) return NextResponse.json({ ok: false, error: 'Please write a message.' }, { status: 400 });

  if (!tyashinEnv().configured) {
    console.log('CONTACT: no TYASHIN_API_KEY; form reported as not available');
    return NextResponse.json({ ok: false, code: 'NOT_CONFIGURED', error: 'The contact form is not available yet.' }, { status: 503 });
  }

  const res = await apiPost('/contact/public/submit', {
    name,
    email,
    category: topic,
    subject: `Tyashin for LinkedIn website: ${topic}`,
    message,
    source: 'linkedin-site-contact',
    renderedAt: Number.isFinite(renderedAt) && renderedAt > 0 ? renderedAt : undefined,
    pageUrl: request.headers.get('referer') || undefined,
    metadata: { topic },
  });
  if (!res.ok) {
    console.log(`CONTACT: platform rejected the submission (${res.status}); topic=${topic}`);
    return NextResponse.json({ ok: false, code: 'UPSTREAM', error: 'We could not send your message.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

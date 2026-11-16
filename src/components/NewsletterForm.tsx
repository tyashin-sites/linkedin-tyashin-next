'use client';

import { useState } from 'react';

/**
 * Footer newsletter signup → POST /api/newsletter → the platform Newsletter
 * plugin (server-side; the key never reaches the browser). When the plugin is
 * not configured the form says so plainly instead of pretending to subscribe.
 */
type Status = 'idle' | 'saving' | 'done' | 'error' | 'unavailable';

export function NewsletterForm({ source = 'linkedin-site-footer' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'saving') return;
    setStatus('saving');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: { code?: string; message?: string } };
      if (res.ok && data.success) {
        setStatus('done');
        setEmail('');
      } else if (data.error?.code === 'NOT_CONFIGURED') {
        setStatus('unavailable');
      } else {
        setStatus('error');
        setMessage(data.error?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <p className="mt-4 text-[0.95rem] text-white" role="status">
        You are on the list. Thank you.
      </p>
    );
  }
  if (status === 'unavailable') {
    return (
      <p className="mt-4 text-[0.95rem] text-on-ink-muted" role="status">
        Newsletter signup is not available yet. Nothing was saved. The blog is the place to follow along for now.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          aria-describedby={status === 'error' ? 'newsletter-error' : 'newsletter-note'}
          aria-invalid={status === 'error' || undefined}
          className="min-h-[2.9rem] w-full rounded-full border border-white/25 bg-white/10 px-4 text-[0.95rem] text-white placeholder:text-white/50 focus:border-white"
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <button type="submit" disabled={status === 'saving'} className="btn btn-primary flex-none disabled:opacity-60">
          {status === 'saving' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' ? (
        <p id="newsletter-error" className="mt-2 text-[0.85rem] text-[#ffc9b8]" role="alert">
          {message}
        </p>
      ) : null}
      <p id="newsletter-note" className="mt-2 text-[0.82rem] text-on-ink-muted">
        Occasional notes on writing for LinkedIn and product updates. Unsubscribe anytime.
      </p>
    </form>
  );
}

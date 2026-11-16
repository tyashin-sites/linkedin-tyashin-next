'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

const TOPICS = ['Question before signing up', 'Help with my account', 'Billing', 'Privacy or data request', 'Partnership or press', 'Other'];

type Status = 'idle' | 'sending' | 'done' | 'error' | 'unavailable';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  // Time-trap for the Contact Form plugin: set at first client render.
  const [renderedAt] = useState(() => Date.now());
  const mail = siteConfig.contact.email;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), renderedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; error?: string };
      if (res.ok && data.ok) return setStatus('done');
      if (data.code === 'NOT_CONFIGURED') return setStatus('unavailable');
      throw new Error(data.error || 'Something went wrong.');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'done') {
    return (
      <div className="card p-8" role="status" aria-live="polite">
        <p className="eyebrow">Received</p>
        <h2 className="tt-h2 mt-3">Thanks. A person will read this.</h2>
        <p className="mt-4 text-muted">We reply by email from {mail}.</p>
      </div>
    );
  }

  if (status === 'unavailable') {
    return (
      <div className="card p-8" role="status" aria-live="polite">
        <p className="eyebrow">Not available yet</p>
        <h2 className="tt-h2 mt-3">This form is not switched on yet.</h2>
        <p className="mt-4 text-muted">
          Your message was not sent and nothing was saved. Please email{' '}
          <a className="link-arrow" href={`mailto:${mail}`}>
            {mail}
          </a>{' '}
          instead.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card relative grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="c-name" className="text-sm font-semibold">
          Name
        </label>
        <input id="c-name" name="name" required maxLength={100} autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm font-semibold">
          Email
        </label>
        <input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-topic" className="text-sm font-semibold">
          What is this about?
        </label>
        <select id="c-topic" name="topic" defaultValue={TOPICS[0]} className="field">
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="text-sm font-semibold">
          Message
        </label>
        <textarea id="c-message" name="message" required maxLength={5000} rows={6} className="field" />
      </div>
      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We use these details only to reply. See the{' '}
          <a href="/privacy-policy" className="underline">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary flex-none disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-sm font-semibold text-[#9b2c16] sm:col-span-2">
          {error} Your message was not sent. You can email{' '}
          <a href={`mailto:${mail}`} className="underline">
            {mail}
          </a>{' '}
          instead.
        </p>
      ) : null}
    </form>
  );
}

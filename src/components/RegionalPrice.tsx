'use client';

import { useEffect, useState } from 'react';
import { PLAN, TOP_UP_LABELS, priceFor } from '@/lib/pricing';
import { mayStore, onConsentChange } from '@/lib/consent';

/**
 * Regional price display: one price, in the visitor's currency.
 *
 * Owns: asking this site's own /api/geo (Cloudflare country header →
 * currency) once per page, remembering the answer, and rendering the plan
 * price, a short currency note and the top-up prices for that currency only.
 * Does not own: the price table itself (src/lib/pricing.ts) or the signed-in
 * case — the app (linkedin.tyashin.com) prices an account by the region it
 * was created in; this site only ever sees anonymous visitors.
 *
 * Pages are statically cached, so the server HTML carries the USD price and
 * the client swaps it. To avoid showing a wrong price for a moment, the
 * price stays hidden (space reserved) until the currency is known, for at
 * most FALLBACK_MS; without JavaScript a <noscript> rule shows the USD price.
 *
 * The answer is remembered in localStorage only when the visitor's consent
 * choice allows preference storage (src/lib/consent.ts).
 */
const KEY = 'tyl_currency';
const FALLBACK_MS = 1500;

let resolved: string | null = null;
let pending: Promise<string> | null = null;

function resolveCurrency(): Promise<string> {
  if (resolved) return Promise.resolve(resolved);
  if (pending) return pending;
  pending = new Promise<string>((done) => {
    const finish = (c: string) => {
      if (resolved) return;
      resolved = c;
      done(c);
    };
    const timer = setTimeout(() => finish('usd'), FALLBACK_MS);
    fetch('/api/geo')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { currency?: string } | null) => {
        clearTimeout(timer);
        const c = d?.currency || 'usd';
        try {
          if (mayStore('preferences')) localStorage.setItem(KEY, c);
        } catch {
          /* storage blocked */
        }
        finish(c);
      })
      .catch(() => {
        clearTimeout(timer);
        finish('usd');
      });
  });
  return pending;
}

/** The visitor's currency, or null until it is known. */
function useCurrency(): string | null {
  const [currency, setCurrency] = useState<string | null>(resolved);

  useEffect(() => {
    let alive = true;
    if (!resolved) {
      try {
        const saved = mayStore('preferences') ? localStorage.getItem(KEY) : null;
        if (saved) setCurrency(saved); // shown at once; the geo answer below corrects it if the visitor moved
      } catch {
        /* storage blocked */
      }
    }
    resolveCurrency().then((c) => {
      if (alive) setCurrency(c);
    });
    // If the visitor withdraws consent, forget the remembered currency.
    const off = onConsentChange(() => {
      try {
        if (!mayStore('preferences')) localStorage.removeItem(KEY);
      } catch {
        /* storage blocked */
      }
    });
    return () => {
      alive = false;
      off();
    };
  }, []);

  return currency;
}

function planPrice(currency: string | null): string {
  return !currency || currency === 'usd' ? `US$${PLAN.usdMonthly}` : priceFor(currency).personal;
}

const hidden = (currency: string | null) => (currency ? undefined : ({ visibility: 'hidden' } as const));

const NoScriptReveal = () => (
  <noscript>
    <style>{'[data-regional-price]{visibility:visible!important}'}</style>
  </noscript>
);

/** The plan's monthly price in the visitor's currency. Style it with className. */
export function PlanPrice({ className = '' }: { className?: string }) {
  const currency = useCurrency();
  return (
    <>
      <span data-regional-price className={className} style={hidden(currency)}>
        {planPrice(currency)}
      </span>
      <NoScriptReveal />
    </>
  );
}

/** One line saying which currency the price is in. */
export function PriceNote({ className = '' }: { className?: string }) {
  const currency = useCurrency();
  const code = priceFor(currency || 'usd').code;
  return (
    <p data-regional-price className={`mt-3 min-h-[1.6rem] text-[0.92rem] text-muted ${className}`} style={hidden(currency)}>
      Priced in {code} for where you are. Checkout confirms the price before you pay.
    </p>
  );
}

/** Top-up prices for the visitor's currency only. */
export function TopUpPrices() {
  const currency = useCurrency();
  const price = priceFor(currency || 'usd');
  return (
    <>
      <dl data-regional-price className="mt-5 grid grid-cols-3 gap-3" style={hidden(currency)}>
        {TOP_UP_LABELS.map((label, i) => (
          <div key={label} className="rounded-xl border border-border bg-background px-4 py-3">
            <dt className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-muted">{label}</dt>
            <dd className="tt-num mt-1 text-[1.2rem]">{price.topUps[i]}</dd>
          </div>
        ))}
      </dl>
      <NoScriptReveal />
    </>
  );
}

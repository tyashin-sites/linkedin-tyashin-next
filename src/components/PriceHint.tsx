'use client';

import { useEffect, useState } from 'react';
import { priceFor } from '@/lib/pricing';
import { mayStore, onConsentChange } from '@/lib/consent';

/**
 * Regional price hint. Asks this site's own /api/geo (Cloudflare country
 * header → currency) and, when the visitor is somewhere with a regional
 * price, shows it under the USD price. The USD price is server-rendered and
 * never replaced, so nothing shifts or flashes; with no answer the hint says
 * regional prices are shown at signup.
 *
 * The answer is remembered in localStorage only when the visitor's consent
 * choice allows preference storage (src/lib/consent.ts).
 */
const KEY = 'tyl_currency';

export function PriceHint({ className = '' }: { className?: string }) {
  const [currency, setCurrency] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    try {
      const saved = mayStore('preferences') ? localStorage.getItem(KEY) : null;
      if (saved) setCurrency(saved);
    } catch {
      /* storage blocked */
    }
    fetch('/api/geo')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { currency?: string } | null) => {
        if (!alive || !d?.currency) return;
        setCurrency(d.currency);
        try {
          if (mayStore('preferences')) localStorage.setItem(KEY, d.currency);
        } catch {
          /* storage blocked */
        }
      })
      .catch(() => {});
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

  const regional = currency && currency !== 'usd' ? priceFor(currency) : null;
  return (
    <p className={`mt-3 min-h-[1.6rem] text-[0.92rem] text-muted ${className}`} aria-live="polite">
      {regional ? (
        <>
          In your region: <strong className="tt-num font-medium text-foreground">{regional.personal}</strong> / month ({regional.code}).
        </>
      ) : (
        <>Regional pricing is shown at signup.</>
      )}
    </p>
  );
}

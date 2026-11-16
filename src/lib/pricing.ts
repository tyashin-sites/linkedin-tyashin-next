/**
 * Static mirror of the product's pricing source of truth
 * (linkedin-leader apps/api/src/config/pricing.ts, read 2026-11-16).
 * When prices change there, change them here. Checkout always shows the
 * authoritative price; this table is display-only.
 */

export type Currency = 'usd' | 'inr' | 'eur' | 'aud' | 'jpy' | 'cad' | 'aed' | 'kwd';

export interface RegionalPrice {
  currency: Currency;
  code: string;
  region: string;
  personal: string;
  /** Monthly AI allowance top-ups: +20%, +50%, +100%. */
  topUps: [string, string, string];
}

export const PLAN = {
  name: 'Personal',
  usdMonthly: 145,
  profiles: 1,
  freePosts: 2,
  trialDays: 3,
} as const;

export const REGIONAL_PRICES: RegionalPrice[] = [
  { currency: 'usd', code: 'USD', region: 'United States and everywhere not listed', personal: '$145', topUps: ['$6', '$14', '$24'] },
  { currency: 'inr', code: 'INR', region: 'India', personal: '₹14,999', topUps: ['₹599', '₹1,399', '₹2,399'] },
  { currency: 'eur', code: 'EUR', region: 'Eurozone', personal: '€145', topUps: ['€6', '€14', '€24'] },
  { currency: 'cad', code: 'CAD', region: 'Canada', personal: 'C$225', topUps: ['C$10', 'C$22', 'C$36'] },
  { currency: 'aud', code: 'AUD', region: 'Australia and New Zealand', personal: 'A$245', topUps: ['A$10', 'A$24', 'A$40'] },
  { currency: 'jpy', code: 'JPY', region: 'Japan', personal: '¥24,500', topUps: ['¥1,000', '¥2,400', '¥4,000'] },
  { currency: 'aed', code: 'AED', region: 'UAE, Saudi Arabia, Qatar, Bahrain, Oman', personal: 'AED 645', topUps: ['AED 25', 'AED 59', 'AED 99'] },
  { currency: 'kwd', code: 'KWD', region: 'Kuwait', personal: 'KWD 50', topUps: ['KWD 2', 'KWD 5', 'KWD 8'] },
];

export const TOP_UP_LABELS = ['+20% allowance', '+50% allowance', '+100% allowance'] as const;

/** Country → currency, same map the product uses. Unlisted countries pay in USD. */
const CURRENCY_BY_COUNTRY: Record<string, Currency> = {
  US: 'usd', IN: 'inr', DE: 'eur', FR: 'eur', ES: 'eur', IT: 'eur', NL: 'eur',
  BE: 'eur', AT: 'eur', PT: 'eur', IE: 'eur', FI: 'eur', GR: 'eur', LU: 'eur',
  AU: 'aud', NZ: 'aud', JP: 'jpy', CA: 'cad',
  AE: 'aed', SA: 'aed', QA: 'aed', BH: 'aed', OM: 'aed',
  KW: 'kwd', GB: 'usd',
};

export function currencyForCountry(country: string | null | undefined): Currency {
  if (!country) return 'usd';
  return CURRENCY_BY_COUNTRY[country.toUpperCase()] || 'usd';
}

export function priceFor(currency: string): RegionalPrice {
  return REGIONAL_PRICES.find((p) => p.currency === currency) || REGIONAL_PRICES[0];
}

import type { BillingPeriod } from '../types';

export interface FormattedPrice {
  readonly main: string;
  readonly caption: string;
}

export function formatPrice(price: number, currency: 'EUR' | 'TOKENS', billing: BillingPeriod): FormattedPrice {
  const suffix = billing === 'month' ? ' / MES' : '';

  if (currency === 'TOKENS') {
    return { main: price.toLocaleString('en-US'), caption: `TOKENS${suffix}` };
  }

  return { main: `€${price.toFixed(2)}`, caption: `EUR${suffix}` };
}

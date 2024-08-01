import { Product } from './definitions';

export const CURRENCY_SYMBOL_MAP: Record<Product['price']['currency'], string> = {
  usd: '$',
} as const;

import { VariantConfig } from '@/types';

export const variants: Record<string, VariantConfig> = {
  a: {
    id: 'a',
    headline: 'Find your next city break deal — stop overpaying',
    subheadline:
      'Holiday Portfolio learns how you travel, finds deals you\'d actually love, and tells you if the price is right.',
  },
  b: {
    id: 'b',
    headline: 'Plan your whole travel year in one place',
    subheadline:
      'Set your budget. Tell us how you travel. Get a personalised feed of deals scored just for you.',
  },
  c: {
    id: 'c',
    headline: 'A deal feed that actually knows how you travel',
    subheadline:
      'Not another search engine. A personalisation engine that finds city breaks you\'ll love — at prices you\'ll feel good about.',
  },
};

export const defaultVariant: VariantConfig = variants.a;

export function getVariant(param: string | null): VariantConfig {
  if (param && variants[param]) {
    return variants[param];
  }
  return defaultVariant;
}

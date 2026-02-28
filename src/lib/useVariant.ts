'use client';

import { useSearchParams } from 'next/navigation';
import { getVariant } from './variants';
import { VariantConfig } from '@/types';

export function useVariant(): VariantConfig {
  const searchParams = useSearchParams();
  const v = searchParams.get('v');
  return getVariant(v);
}

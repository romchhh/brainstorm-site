import type { Locale } from '@/i18n/locale';
import { headers } from 'next/headers';

export async function getServerLocale(): Promise<Locale> {
  const headerStore = await headers();
  const value = headerStore.get('x-brainstorm-locale');
  return value === 'en' ? 'en' : 'uk';
}

export function pagePathForLocale(path: string, locale: Locale): string {
  const base = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') return base === '/' ? '/en' : `/en${base}`;
  return base;
}

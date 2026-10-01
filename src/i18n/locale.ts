export type Locale = 'uk' | 'en';

export const DEFAULT_LOCALE: Locale = 'uk';
export const LOCALES: Locale[] = ['uk', 'en'];

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  return 'uk';
}

/** Public path without locale prefix (always leading slash, keeps trailing slash except root). */
export function stripLocalePrefix(pathname: string): string {
  let path = pathname || '/';
  if (path === '/en' || path === '/en/') return '/';
  if (path.startsWith('/en/')) path = path.slice(3) || '/';
  return path;
}

function ensureTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function localizedPath(path: string, locale: Locale): string {
  const stripped = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`);
  const base = ensureTrailingSlash(stripped === '/' ? '/' : stripped);
  if (locale === 'uk') return base;
  return base === '/' ? '/en/' : `/en${base}`;
}

export function alternateLanguagePath(pathname: string): { uk: string; en: string } {
  const base = stripLocalePrefix(pathname);
  return {
    uk: localizedPath(base, 'uk'),
    en: localizedPath(base, 'en'),
  };
}

export const LOCALE_LABELS: Record<Locale, { short: string; name: string; nameAlt: string }> = {
  uk: { short: 'UA', name: 'Українська', nameAlt: 'Ukrainian' },
  en: { short: 'EN', name: 'English', nameAlt: 'English' },
};

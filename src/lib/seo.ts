const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function toCanonical(urlPath: string) {
  const origin = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  const path = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  return `${origin}${path}`;
}

export { SITE_URL };


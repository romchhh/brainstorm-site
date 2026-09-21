import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brainstorm.org.ua').replace(/\/$/, '');

export const SITE_NAME = 'Brainstorm';
export const SITE_TAGLINE = 'Думаємо критично. Діємо разом.';
export const SITE_DEFAULT_TITLE = `${SITE_NAME} — молодіжна організація дебатів, екології та STEM в Україні`;
export const SITE_DEFAULT_DESCRIPTION =
  'Brainstorm — молодіжна громадська організація, що розвиває критичне мислення і лідерство через дебати, публічні виступи, екологічні ініціативи та науку з робототехнікою.';

/** Prefer a real photo for social previews (SVG is poorly supported by crawlers). */
export const DEFAULT_OG_IMAGE = '/hero-kite.jpg';

export const SOCIAL_LINKS = [
  'https://instagram.com/brainstorm.ngo',
  'https://www.facebook.com/BrainStormLutsk',
  'https://t.me/Brainstorm_ShDK',
  'https://www.tiktok.com/@brainstorm.ngo',
  'https://www.youtube.com/channel/UCyaXTpH7aE1tft_YDImmlkQ',
] as const;

export const DEFAULT_KEYWORDS = [
  'Brainstorm',
  'молодіжна організація',
  'громадська організація Україна',
  'дебати',
  'публічні виступи',
  'критичне мислення',
  'екологічні проєкти',
  'STEM',
  'робототехніка',
  'волонтерство',
  'молодіжні програми',
  'прозорість ГО',
] as const;

export const PROJECT_IDS = ['1', '2', '3', '4', '5', '6'] as const;

/** Canonical URL with trailing slash to match next.config trailingSlash. */
export function toCanonical(urlPath = '/') {
  const path = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  if (path === '/') return `${SITE_URL}/`;
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [...DEFAULT_KEYWORDS],
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_DEFAULT_TITLE,
  type = 'website',
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonical = toCanonical(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'education',
    applicationName: SITE_NAME,
    referrer: 'origin-when-cross-origin',
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    alternates: {
      canonical,
      languages: {
        'uk-UA': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type,
      locale: 'uk_UA',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'ГО Brainstorm',
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/icons/brainstorm-logo.svg'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DEFAULT_DESCRIPTION,
    email: 'info@brainstorm.org.ua',
    telephone: '+380441234567',
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    knowsLanguage: ['uk', 'en'],
    sameAs: [...SOCIAL_LINKS],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DEFAULT_DESCRIPTION,
    inLanguage: 'uk-UA',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toCanonical(item.path),
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

export { SITE_URL };

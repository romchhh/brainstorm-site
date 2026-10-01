import type { Metadata } from 'next';
import { pagePathForLocale } from '@/lib/localeServer';

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

/** Canonical URL with trailing slash to match next.config trailingSlash (except static files). */
export function toCanonical(urlPath = '/') {
  const path = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  if (path === '/') return `${SITE_URL}/`;
  if (/\.[a-z0-9]+$/i.test(path)) {
    return `${SITE_URL}${path}`;
  }
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${normalized}`;
}

export function sitemapUrl() {
  return `${SITE_URL}/sitemap.xml`;
}

export function robotsUrl() {
  return `${SITE_URL}/robots.txt`;
}

export function llmsUrl() {
  return `${SITE_URL}/llms.txt`;
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
  locale?: 'uk' | 'en';
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
  locale = 'uk',
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = pagePathForLocale(path, locale);
  const canonical = toCanonical(canonicalPath);
  const ukUrl = toCanonical(pagePathForLocale(path, 'uk'));
  const enUrl = toCanonical(pagePathForLocale(path, 'en'));
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
        'uk-UA': ukUrl,
        'en-US': enUrl,
        'x-default': ukUrl,
      },
    },
    openGraph: {
      type,
      locale: locale === 'en' ? 'en_US' : 'uk_UA',
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

export function organizationJsonLd(overrides?: {
  email?: string;
  telephone?: string;
  url?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'ГО Brainstorm',
    url: overrides?.url ?? `${SITE_URL}/`,
    logo: absoluteUrl('/favicon.webp'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: overrides?.description ?? SITE_DEFAULT_DESCRIPTION,
    email: overrides?.email ?? 'info@brainstorm.org.ua',
    telephone: overrides?.telephone ?? '+380441234567',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/projects/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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

export function webPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    name: input.name,
    description: input.description,
    url: toCanonical(input.path),
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };
}

export function projectArticleJsonLd(project: {
  id: string;
  title: string;
  body: string;
  image: string;
  period: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.body,
    image: absoluteUrl(project.image),
    url: toCanonical(`/projects/${project.id}`),
    datePublished: project.period,
    inLanguage: 'uk-UA',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: toCanonical(`/projects/${project.id}`),
  };
}

export function eventJsonLd(event: {
  title: string;
  date: string;
  startTime?: string;
  place: string;
  description?: string;
  format?: 'offline' | 'online' | 'hybrid';
  latitude?: number;
  longitude?: number;
  onlineUrl?: string;
}) {
  const format = event.format ?? 'offline';
  const startDate =
    event.startTime && /^\d{2}:\d{2}$/.test(event.startTime)
      ? `${event.date}T${event.startTime}:00+02:00`
      : event.date;

  let eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
  if (format === 'online') {
    eventAttendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
  } else if (format === 'hybrid') {
    eventAttendanceMode = 'https://schema.org/MixedEventAttendanceMode';
  }

  const location =
    format === 'online' && event.onlineUrl
      ? {
          '@type': 'VirtualLocation',
          url: event.onlineUrl,
        }
      : {
          '@type': 'Place',
          name: event.place,
          ...(typeof event.latitude === 'number' && typeof event.longitude === 'number'
            ? {
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: event.latitude,
                  longitude: event.longitude,
                },
              }
            : {}),
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'UA',
            addressLocality: event.place,
          },
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate,
    eventAttendanceMode,
    eventStatus: 'https://schema.org/EventScheduled',
    location,
    description: event.description ?? event.title,
    organizer: { '@id': `${SITE_URL}/#organization` },
    ...(format !== 'offline' && event.onlineUrl ? { url: event.onlineUrl } : {}),
  };
}

export function newsArticleJsonLd(item: {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  path?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.excerpt,
    image: absoluteUrl(item.image),
    url: item.path ? toCanonical(item.path) : toCanonical('/media'),
    datePublished: item.date,
    inLanguage: 'uk-UA',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.webp'),
      },
    },
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : toCanonical(item.url),
    })),
  };
}

export { SITE_URL };

import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import ScrollReveal from '@/components/ScrollReveal';
import SeoPageView from '@/components/SeoPageView';
import { cmsSettings } from '@/lib/cms/content';
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  DEFAULT_KEYWORDS,
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
  jsonLdScript,
  llmsUrl,
  sitemapUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
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
    canonical: `${SITE_URL}/`,
    languages: {
      'uk-UA': `${SITE_URL}/`,
      'en-US': `${SITE_URL}/en/`,
      'x-default': `${SITE_URL}/`,
    },
    types: {
      'text/plain': [{ url: llmsUrl(), title: 'llms.txt' }],
    },
  },
  icons: {
    icon: [{ url: '/favicon.webp', type: 'image/webp' }],
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  other: {
    'theme-color': '#111111',
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { 'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = cmsSettings();

  return (
    <html lang="uk">
      <head>
        <link rel="sitemap" type="application/xml" href={sitemapUrl()} />
        <link rel="author" type="text/plain" href={llmsUrl()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            organizationJsonLd({
              email: settings.email,
              telephone: settings.phone,
              description: settings.metaDescription,
              url: settings.siteUrl,
            }),
          )}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())} />
      </head>
      <body>
        <ScrollReveal />
        <SeoPageView />
        {children}
      </body>
    </html>
  );
}

import type { MetadataRoute } from 'next';
import { cmsSettings } from '@/lib/cms/content';
import { SITE_NAME, SITE_TAGLINE, absoluteUrl } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  const settings = cmsSettings();

  return {
    name: settings.brandName || SITE_NAME,
    short_name: SITE_NAME,
    description: settings.metaDescription || SITE_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#111111',
    lang: 'uk',
    icons: [
      {
        src: '/favicon.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any',
      },
    ],
    scope: '/',
    id: absoluteUrl('/'),
  };
}

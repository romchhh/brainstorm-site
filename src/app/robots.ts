import type { MetadataRoute } from 'next';
import { toCanonical } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: toCanonical('/sitemap.xml'),
    host: toCanonical('/').replace(/\/$/, ''),
  };
}

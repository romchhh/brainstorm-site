import type { MetadataRoute } from 'next';
import { toCanonical } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: toCanonical('/sitemap.xml'),
  };
}


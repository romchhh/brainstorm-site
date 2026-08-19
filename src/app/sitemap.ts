import type { MetadataRoute } from 'next';
import { toCanonical } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: toCanonical('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: toCanonical('/privacy-policy'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: toCanonical('/public-offer'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: toCanonical('/events'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: toCanonical('/projects'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}


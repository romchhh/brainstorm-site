import type { MetadataRoute } from 'next';
import { PROJECT_IDS, toCanonical } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: toCanonical('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: toCanonical('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: toCanonical('/projects'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: toCanonical('/media'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: toCanonical('/transparency'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: toCanonical('/contacts'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: toCanonical('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: toCanonical('/public-offer'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_IDS.map((id) => ({
    url: toCanonical(`/projects/${id}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}

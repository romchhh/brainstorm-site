import type { MetadataRoute } from 'next';
import { cmsEvents, cmsNews, cmsProjects } from '@/lib/cms/content';
import { pagePathForLocale } from '@/lib/localeServer';
import { toCanonical } from '@/lib/seo';

function lastModifiedFromDate(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ['/', '/about', '/projects', '/media', '/transparency', '/contacts', '/ecomonitoring', '/privacy-policy', '/public-offer'];

  const localized = (path: string, locale: 'uk' | 'en'): MetadataRoute.Sitemap[number] => ({
    url: toCanonical(pagePathForLocale(path, locale)),
    lastModified: now,
    changeFrequency: path === '/media' ? 'daily' : path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/media' ? 0.9 : 0.8,
  });

  const staticRoutes: MetadataRoute.Sitemap = paths.flatMap((path) => [
    localized(path, 'uk'),
    localized(path, 'en'),
  ]);

  const projectRoutes: MetadataRoute.Sitemap = cmsProjects('uk').flatMap((project) => [
    {
      url: toCanonical(pagePathForLocale(`/projects/${project.id}`, 'uk')),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: toCanonical(pagePathForLocale(`/projects/${project.id}`, 'en')),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
  ]);

  const newsRoutes: MetadataRoute.Sitemap = cmsNews('uk').flatMap((item) => {
    const lastModified = lastModifiedFromDate(item.date, now);
    return [
      {
        url: toCanonical(pagePathForLocale(`/media/${item.id}`, 'uk')),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: toCanonical(pagePathForLocale(`/media/${item.id}`, 'en')),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ];
  });

  const eventRoutes: MetadataRoute.Sitemap = cmsEvents('uk').flatMap((event) => {
    const lastModified = lastModifiedFromDate(event.date, now);
    return [
      {
        url: toCanonical(pagePathForLocale(`/events/${event.id}`, 'uk')),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.72,
      },
      {
        url: toCanonical(pagePathForLocale(`/events/${event.id}`, 'en')),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.72,
      },
    ];
  });

  return [...staticRoutes, ...projectRoutes, ...newsRoutes, ...eventRoutes];
}

export const revalidate = 3600;

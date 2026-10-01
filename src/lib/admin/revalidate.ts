import { revalidatePath } from 'next/cache';
import type { ContentCollection } from '@/data/cmsTypes';

const PATHS_BY_COLLECTION: Record<ContentCollection, string[]> = {
  projects: ['/', '/projects'],
  events: ['/', '/media'],
  news: ['/', '/media'],
  team: ['/', '/about'],
  reviews: ['/', '/about'],
  reports: ['/', '/transparency'],
  gallery: ['/', '/projects'],
  ticker: ['/', '/projects', '/media', '/transparency', '/about', '/contacts'],
};

export function revalidateCmsCollection(collection: ContentCollection) {
  for (const path of PATHS_BY_COLLECTION[collection]) {
    revalidatePath(path);
  }
}

export function revalidateSite() {
  revalidatePath('/');
}

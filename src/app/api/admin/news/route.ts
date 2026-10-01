import type { CmsNewsItem } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultNews(partial: Partial<CmsNewsItem> = {}): CmsNewsItem {
  return {
    id: partial.id || uid('news'),
    title: partial.title || 'Нова новина',
    date: partial.date || new Date().toLocaleDateString('uk-UA'),
    tag: partial.tag || 'Brainstorm',
    tagColor: partial.tagColor || 'var(--pink)',
    excerpt: partial.excerpt || '',
    image: partial.image || '/about-lecture.jpg',
    body: partial.body || '',
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsNewsItem>({
  key: 'news',
  responseKey: 'items',
  createDefault: defaultNews,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

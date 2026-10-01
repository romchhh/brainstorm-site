import type { CmsReview } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultReview(partial: Partial<CmsReview> = {}): CmsReview {
  return {
    id: partial.id || uid('rev'),
    author: partial.author || 'Автор',
    text: partial.text || '',
    tone: partial.tone || 'blue',
    size: partial.size || 'wide',
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsReview>({
  key: 'reviews',
  responseKey: 'items',
  createDefault: defaultReview,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

import type { CmsTickerItem } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultTicker(partial: Partial<CmsTickerItem> = {}): CmsTickerItem {
  return {
    id: partial.id || uid('t'),
    text: partial.text || 'BRAINSTORM',
  };
}

const handlers = createCollectionHandlers<CmsTickerItem>({
  key: 'ticker',
  responseKey: 'items',
  createDefault: defaultTicker,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

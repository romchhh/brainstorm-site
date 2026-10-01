import type { CmsEvent } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { enrichEventLocation } from '@/lib/admin/eventLocation';
import { uid } from '@/lib/cms/store';

function defaultEvent(partial: Partial<CmsEvent> = {}): CmsEvent {
  const direction = partial.direction || 'Дебати';
  const colorMap = {
    Дебати: 'var(--yellow)',
    Екологія: 'var(--green)',
    Наука: 'var(--blue)',
  } as const;
  return {
    id: partial.id || uid('ev'),
    date: partial.date || new Date().toISOString().slice(0, 10),
    title: partial.title || 'Нова подія',
    place: partial.place || '',
    direction,
    color: partial.color || colorMap[direction],
    registrationEnabled: partial.registrationEnabled ?? true,
    capacity: Number(partial.capacity) || 0,
    registrationNote: partial.registrationNote ?? '',
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsEvent>({
  key: 'events',
  responseKey: 'items',
  createDefault: defaultEvent,
  getId: (item) => item.id,
  prepareSave: enrichEventLocation,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

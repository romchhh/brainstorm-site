import type { CmsTeamMember } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultMember(partial: Partial<CmsTeamMember> = {}): CmsTeamMember {
  return {
    id: partial.id || uid('team'),
    role: partial.role || 'Роль',
    name: partial.name || 'Імʼя',
    text: partial.text || '',
    photo: partial.photo || '/about-desk.jpg',
    linkedin: partial.linkedin || '',
    tone: partial.tone || 'pink',
    sortOrder: partial.sortOrder ?? 1,
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsTeamMember>({
  key: 'team',
  responseKey: 'items',
  createDefault: defaultMember,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

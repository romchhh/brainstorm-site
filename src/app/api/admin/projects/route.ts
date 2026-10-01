import type { CmsProject } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultProject(partial: Partial<CmsProject> = {}): CmsProject {
  return {
    id: partial.id || uid('prj'),
    title: partial.title || 'Новий проєкт',
    desc: partial.desc || '',
    period: partial.period || '',
    partners: partial.partners || '',
    status: partial.status || 'current',
    theme: partial.theme || 'debates',
    image: partial.image || '/about-lecture.jpg',
    themeLabel: partial.themeLabel || 'Дебати',
    results: partial.results || [],
    body: partial.body || '',
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsProject>({
  key: 'projects',
  responseKey: 'items',
  createDefault: defaultProject,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

import type { CmsReport } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { uid } from '@/lib/cms/store';

function defaultReport(partial: Partial<CmsReport> = {}): CmsReport {
  return {
    id: partial.id || uid('rep'),
    year: partial.year || String(new Date().getFullYear()),
    title: partial.title || 'Новий звіт',
    file: partial.file || '/reports/placeholder-report.pdf',
    published: partial.published ?? true,
  };
}

const handlers = createCollectionHandlers<CmsReport>({
  key: 'reports',
  responseKey: 'items',
  createDefault: defaultReport,
  getId: (item) => item.id,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

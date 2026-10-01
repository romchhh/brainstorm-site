import type { CmsGalleryItem } from '@/data/cmsTypes';
import { createCollectionHandlers } from '@/lib/admin/collectionApi';
import { normalizeGalleryItem } from '@/lib/cms/normalize';
import { readDb, uid } from '@/lib/cms/store';
import { requireAdmin } from '@/lib/cms/session';
import { NextResponse } from 'next/server';

type GalleryPayload = Partial<CmsGalleryItem & { photoUrls?: string[] | string; cover?: string }>;

function urlsFromPayload(payload: GalleryPayload): string[] {
  if (Array.isArray(payload.photoUrls)) {
    return payload.photoUrls.map((line) => String(line).trim()).filter(Boolean);
  }
  if (typeof payload.photoUrls === 'string') {
    return payload.photoUrls
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
  if (payload.photos?.length) {
    return payload.photos.map((p) => p.src);
  }
  return [];
}

function fromPayload(partial: GalleryPayload = {}): CmsGalleryItem {
  return normalizeGalleryItem({
    id: partial.id || uid('gal'),
    title: partial.title || 'Альбом',
    titleEn: partial.titleEn,
    date: partial.date || new Date().toLocaleDateString('uk-UA'),
    cover: partial.cover || partial.photos?.[0]?.src || '/hero-kite.jpg',
    photoUrls: urlsFromPayload(partial),
    published: partial.published ?? true,
  });
}

function forAdmin(item: CmsGalleryItem) {
  return {
    ...item,
    photoUrls: item.photos.map((p) => p.src),
  };
}

const handlers = createCollectionHandlers<CmsGalleryItem>({
  key: 'gallery',
  responseKey: 'items',
  createDefault: (partial) => fromPayload(partial as GalleryPayload),
  getId: (item) => item.id,
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const items = readDb().gallery.map((item) => forAdmin(normalizeGalleryItem(item)));
  return NextResponse.json({ ok: true, items });
}

async function forwardPutPost(request: Request, method: 'POST' | 'PUT') {
  const body = (await request.json().catch(() => null)) as GalleryPayload | null;
  const item = fromPayload(body || {});
  return handlers[method](
    new Request(request.url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }),
  );
}

export async function POST(request: Request) {
  return forwardPutPost(request, 'POST');
}

export async function PUT(request: Request) {
  return forwardPutPost(request, 'PUT');
}

export const DELETE = handlers.DELETE;
export const PATCH = handlers.PATCH;

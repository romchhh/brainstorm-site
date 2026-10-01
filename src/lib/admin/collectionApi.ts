import { NextResponse } from 'next/server';
import type { ContentCollection, CmsDb } from '@/data/cmsTypes';
import { requireAdmin } from '@/lib/cms/session';
import { readDb, updateDb, uid, setCollectionItems, maintainCmsDatabase } from '@/lib/cms/store';
import { revalidateCmsCollection } from '@/lib/admin/revalidate';

type CollectionConfig<T extends Record<string, unknown>> = {
  key: ContentCollection;
  responseKey: string;
  createDefault: (partial?: Partial<T>) => T;
  getId: (item: T) => string;
  prepareSave?: (item: T, ctx: { mode: 'create' | 'update'; previous?: T }) => Promise<T> | T;
};

export function createCollectionHandlers<T extends Record<string, unknown>>(config: CollectionConfig<T>) {
  const { key, responseKey, createDefault, getId, prepareSave } = config;

  async function GET() {
    const { error } = await requireAdmin();
    if (error) return error;
    const db = readDb();
    return NextResponse.json({ ok: true, [responseKey]: db[key] });
  }

  async function POST(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    const body = (await request.json().catch(() => null)) as Partial<T> | null;
    let item = createDefault(body || {});
    if (prepareSave) {
      item = await prepareSave(item, { mode: 'create' });
    }
    const id = getId(item);

    updateDb((db) => {
      const list = db[key] as unknown as T[];
      if (list.some((entry) => getId(entry) === id)) {
        (item as Record<string, unknown>).id = uid(key.slice(0, 3));
      }
      list.unshift(item);
    });

    maintainCmsDatabase();

    revalidateCmsCollection(key);
    return NextResponse.json({ ok: true, item });
  }

  async function PUT(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    const body = (await request.json().catch(() => null)) as (T & { id?: string }) | null;
    if (!body?.id) {
      return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
    }

    let previous: T | undefined;
    updateDb((db) => {
      const list = db[key] as unknown as T[];
      previous = list.find((entry) => getId(entry) === String(body.id));
    });

    if (!previous) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
    }

    let merged = { ...previous, ...body, id: getId(previous) } as T;
    if (prepareSave) {
      merged = await prepareSave(merged, { mode: 'update', previous });
    }

    let updated: T | null = null;
    updateDb((db) => {
      const list = db[key] as unknown as T[];
      const index = list.findIndex((entry) => getId(entry) === String(body.id));
      if (index === -1) return;
      list[index] = merged;
      updated = merged;
    });

    if (!updated) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
    }

    revalidateCmsCollection(key);
    return NextResponse.json({ ok: true, item: updated });
  }

  async function DELETE(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
    }

    updateDb((db) => {
      const list = (db[key] as unknown as T[]).filter((entry) => getId(entry) !== id);
      setCollectionItems(db, key, list as unknown as CmsDb[typeof key]);
    });

    revalidateCmsCollection(key);
    return NextResponse.json({ ok: true });
  }

  async function PATCH(request: Request) {
    const { error } = await requireAdmin();
    if (error) return error;

    const body = (await request.json().catch(() => null)) as { order?: string[] } | null;
    const order = body?.order?.map(String).filter(Boolean);
    if (!order?.length) {
      return NextResponse.json({ ok: false, error: 'missing_order' }, { status: 400 });
    }

    updateDb((db) => {
      const list = db[key] as unknown as T[];
      const byId = new Map(list.map((item) => [getId(item), item]));
      const ordered: T[] = [];
      for (const id of order) {
        const item = byId.get(id);
        if (item) {
          ordered.push(item);
          byId.delete(id);
        }
      }
      setCollectionItems(db, key, [...ordered, ...Array.from(byId.values())] as unknown as CmsDb[typeof key]);
    });

    revalidateCmsCollection(key);
    return NextResponse.json({ ok: true });
  }

  return { GET, POST, PUT, DELETE, PATCH };
}

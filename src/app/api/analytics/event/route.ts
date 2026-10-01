import { updateDb, uid } from '@/lib/cms/store';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { path?: string; type?: 'pageview' | 'lead' } | null;
  const path = body?.path || '/';
  const type = body?.type || 'pageview';
  const now = new Date().toISOString();

  updateDb((db) => {
    db.analytics.unshift({
      id: uid('evt'),
      type,
      path,
      createdAt: now,
    });
    if (db.analytics.length > 5000) {
      db.analytics = db.analytics.slice(0, 5000);
    }
  });

  return Response.json({ ok: true });
}

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/session';
import { readDb, updateDb, uid, type Lead } from '@/lib/cms/store';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json({ ok: true, leads: readDb().leads });
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: Lead['status'];
    notes?: string;
  } | null;

  if (!body?.id) {
    return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
  }

  let updated: Lead | null = null;
  updateDb((db) => {
    const index = db.leads.findIndex((l) => l.id === body.id);
    if (index === -1) return;
    db.leads[index] = {
      ...db.leads[index],
      status: body.status ?? db.leads[index].status,
      notes: body.notes ?? db.leads[index].notes,
      updatedAt: new Date().toISOString(),
    };
    updated = db.leads[index];
  });

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead: updated });
}

export async function DELETE(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
  }

  updateDb((db) => {
    db.leads = db.leads.filter((l) => l.id !== id);
  });

  return NextResponse.json({ ok: true });
}

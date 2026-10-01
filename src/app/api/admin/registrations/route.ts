import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/session';
import { readDb, updateDb, type EventRegistration, type RegistrationStatus } from '@/lib/cms/store';

export async function GET(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const eventId = new URL(request.url).searchParams.get('eventId');
  const all = readDb().registrations;
  let list = all;
  if (eventId) {
    list = list.filter((r) => r.eventId === eventId);
  }

  const events = readDb().events.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    count: all.filter((r) => r.eventId === e.id && r.status !== 'cancelled').length,
  }));

  return NextResponse.json({ ok: true, registrations: list, events });
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: RegistrationStatus;
    comment?: string;
  } | null;

  if (!body?.id) {
    return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
  }

  let updated: EventRegistration | null = null;
  updateDb((db) => {
    const index = db.registrations.findIndex((r) => r.id === body.id);
    if (index === -1) return;
    db.registrations[index] = {
      ...db.registrations[index],
      status: body.status ?? db.registrations[index].status,
      comment: body.comment ?? db.registrations[index].comment,
      updatedAt: new Date().toISOString(),
    };
    updated = db.registrations[index];
  });

  if (!updated) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, registration: updated });
}

export async function DELETE(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const id = new URL(request.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
  }

  updateDb((db) => {
    db.registrations = db.registrations.filter((r) => r.id !== id);
  });

  return NextResponse.json({ ok: true });
}

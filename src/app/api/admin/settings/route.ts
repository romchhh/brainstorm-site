import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/cms/session';
import { readDb, updateDb } from '@/lib/cms/store';
import type { SiteSettings } from '@/data/cmsTypes';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json({ ok: true, settings: readDb().settings });
}

export async function PUT(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as Partial<SiteSettings> | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  let settings: SiteSettings | null = null;
  updateDb((db) => {
    db.settings = { ...db.settings, ...body };
    settings = db.settings;
  });

  revalidatePath('/');
  return NextResponse.json({ ok: true, settings });
}

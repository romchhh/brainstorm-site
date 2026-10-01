import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/session';
import { readDb, updateDb, uid } from '@/lib/cms/store';
import type { AdminRole, AdminUser } from '@/data/cmsTypes';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const db = readDb();
  return NextResponse.json({ ok: true, roles: db.roles, users: db.users });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as {
    type?: 'role' | 'user';
    payload?: Partial<AdminRole & AdminUser>;
  } | null;

  if (body?.type === 'role') {
    const role: AdminRole = {
      id: body.payload?.id || uid('role'),
      name: body.payload?.name || 'Нова роль',
      description: body.payload?.description || '',
      permissions: body.payload?.permissions || [],
    };
    updateDb((db) => {
      db.roles.push(role);
    });
    return NextResponse.json({ ok: true, role });
  }

  if (body?.type === 'user') {
    const user: AdminUser = {
      id: uid('user'),
      login: body.payload?.login || 'user',
      password: body.payload?.password || 'changeme',
      name: body.payload?.name || 'Користувач',
      roleId: body.payload?.roleId || 'editor',
      active: body.payload?.active ?? true,
    };
    updateDb((db) => {
      db.users.push(user);
    });
    return NextResponse.json({ ok: true, user: { ...user, password: undefined } });
  }

  return NextResponse.json({ ok: false, error: 'invalid_type' }, { status: 400 });
}

export async function PUT(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = (await request.json().catch(() => null)) as {
    type?: 'role' | 'user';
    payload?: AdminRole | AdminUser;
  } | null;

  if (!body?.payload?.id) {
    return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });
  }

  if (body.type === 'role') {
    updateDb((db) => {
      const index = db.roles.findIndex((r) => r.id === body.payload!.id);
      if (index >= 0) db.roles[index] = { ...db.roles[index], ...body.payload } as AdminRole;
    });
    return NextResponse.json({ ok: true });
  }

  if (body.type === 'user') {
    updateDb((db) => {
      const index = db.users.findIndex((u) => u.id === body.payload!.id);
      if (index >= 0) db.users[index] = { ...db.users[index], ...body.payload } as AdminUser;
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: 'invalid_type' }, { status: 400 });
}

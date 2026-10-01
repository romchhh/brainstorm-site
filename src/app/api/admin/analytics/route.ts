import { requireAdmin } from '@/lib/cms/session';
import { readDb } from '@/lib/cms/store';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  return Response.json({ ok: true, events: readDb().analytics });
}

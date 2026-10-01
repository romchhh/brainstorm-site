import { updateDb, uid, type Lead } from '@/lib/cms/store';
import { readDb } from '@/lib/cms/store';

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  page?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null;
  const name = body?.name?.trim() ?? '';
  const email = body?.email?.trim() ?? '';
  const message = body?.message?.trim() ?? '';

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const lead: Lead = {
    id: uid('LD'),
    name,
    email,
    phone: body?.phone?.trim() || '—',
    message,
    source: 'contacts',
    status: 'new',
    page: body?.page || '/contacts/',
    notes: '',
    createdAt: now,
    updatedAt: now,
  };

  updateDb((db) => {
    db.leads.unshift(lead);
    db.analytics.push({
      id: uid('evt'),
      type: 'lead',
      path: lead.page || '/contacts/',
      leadSource: lead.source,
      createdAt: now,
    });
  });

  const settings = readDb().settings;
  const webhook = settings.crmWebhookUrl || process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch {
      // keep lead saved
    }
  }

  return Response.json({ ok: true, id: lead.id });
}

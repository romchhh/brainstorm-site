'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { AdminCard, AdminPageHeader, GhostButton, StatusBadge } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { Lead } from '@/lib/cms/store';
import { formatKyivTime } from '@/lib/datetime';

const statuses: Lead['status'][] = ['new', 'in_progress', 'done', 'archived'];

export default function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ leads: Lead[] }>('/api/admin/leads');
      setLeads(data.leads);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: Lead['status']) {
    await adminFetch('/api/admin/leads', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm('Видалити заявку?')) return;
    await adminFetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Заявки з сайту"
        description="Повідомлення з форми контактів. Оновлюйте статуси та ведіть нотатки в CRM."
      />

      <AdminCard>
        {loading ? (
          <p className={ui.loading}>Завантаження…</p>
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Кontakt</th>
                  <th>Повідомлення</th>
                  <th>Статус</th>
                  <th>Час</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={ui.empty}>
                      Заявок поки немає.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                        <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{lead.email}</div>
                        <div style={{ fontSize: 12 }}>{lead.phone}</div>
                      </td>
                      <td style={{ maxWidth: 320 }}>{lead.message}</td>
                      <td>
                        <StatusBadge status={lead.status} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                          {statuses.map((status) => (
                            <GhostButton key={status} onClick={() => void updateStatus(lead.id, status)}>
                              {status}
                            </GhostButton>
                          ))}
                        </div>
                      </td>
                      <td>{formatKyivTime(lead.createdAt)}</td>
                      <td>
                        <GhostButton onClick={() => void remove(lead.id)}>Видалити</GhostButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}

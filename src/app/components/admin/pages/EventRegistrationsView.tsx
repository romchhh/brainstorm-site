'use client';

import { useEffect, useMemo, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { AdminCard, AdminPageHeader, GhostButton, StatusBadge } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { EventRegistration, RegistrationStatus } from '@/data/cmsTypes';
import { formatEventDate, formatKyivTime } from '@/lib/datetime';

type EventSummary = {
  id: string;
  title: string;
  date: string;
  count: number;
};

const STATUS_ACTIONS: { status: RegistrationStatus; label: string }[] = [
  { status: 'new', label: 'Нова' },
  { status: 'confirmed', label: 'Підтвердити' },
  { status: 'waitlist', label: 'Очікування' },
  { status: 'cancelled', label: 'Скасувати' },
];

export default function EventRegistrationsView() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [eventFilter, setEventFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  async function load(filter: string) {
    setLoading(true);
    try {
      const query = filter ? `?eventId=${encodeURIComponent(filter)}` : '';
      const data = await adminFetch<{
        registrations: EventRegistration[];
        events: EventSummary[];
      }>(`/api/admin/registrations${query}`);
      setRegistrations(data.registrations);
      setEvents(data.events);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(eventFilter);
  }, [eventFilter]);

  const newCount = useMemo(
    () => registrations.filter((r) => r.status === 'new').length,
    [registrations],
  );

  async function updateStatus(id: string, status: RegistrationStatus) {
    await adminFetch('/api/admin/registrations', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
    await load(eventFilter);
  }

  async function remove(id: string) {
    if (!window.confirm('Видалити реєстрацію?')) return;
    await adminFetch(`/api/admin/registrations?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    await load(eventFilter);
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Реєстрації на події"
        description="Учасники, які записалися через календар на сторінці «Актуальні події». Фільтруйте за подією та змінюйте статуси."
      />

      <AdminCard title="Події" subtitle="Кількість активних реєстрацій (без скасованих)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <GhostButton onClick={() => setEventFilter('')}>
            {eventFilter === '' ? '· Усі ·' : 'Усі події'}
          </GhostButton>
          {events.map((event) => (
            <GhostButton key={event.id} onClick={() => setEventFilter(event.id)}>
              {eventFilter === event.id ? '· ' : ''}
              {event.title} ({event.count})
            </GhostButton>
          ))}
        </div>
        {!eventFilter && newCount > 0 ? (
          <p style={{ fontSize: 13, color: 'var(--admin-muted)', margin: 0 }}>
            Нових заявок у поточному списку: <strong>{newCount}</strong>
          </p>
        ) : null}
      </AdminCard>

      <AdminCard>
        {loading ? (
          <p className={ui.loading}>Завантаження…</p>
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Учасник</th>
                  <th>Подія</th>
                  <th>Коментар</th>
                  <th>Статус</th>
                  <th>Час</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={ui.empty}>
                      Реєстрацій поки немає.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id}>
                      <td>
                        <strong>{reg.name}</strong>
                        <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{reg.email}</div>
                        <div style={{ fontSize: 12 }}>{reg.phone}</div>
                        {reg.age ? (
                          <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>Вік: {reg.age}</div>
                        ) : null}
                      </td>
                      <td>
                        <strong>{reg.eventTitle}</strong>
                        <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>
                          {formatEventDate(reg.eventDate, 'uk', 'medium')}
                        </div>
                      </td>
                      <td style={{ maxWidth: 240, fontSize: 13 }}>{reg.comment || '—'}</td>
                      <td>
                        <StatusBadge status={reg.status} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                          {STATUS_ACTIONS.filter((a) => a.status !== reg.status).map((action) => (
                            <GhostButton
                              key={action.status}
                              onClick={() => void updateStatus(reg.id, action.status)}
                            >
                              {action.label}
                            </GhostButton>
                          ))}
                        </div>
                      </td>
                      <td>{formatKyivTime(reg.createdAt)}</td>
                      <td>
                        <GhostButton onClick={() => void remove(reg.id)}>Видалити</GhostButton>
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

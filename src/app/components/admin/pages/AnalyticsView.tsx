'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { AdminCard, AdminPageHeader } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { AnalyticsEvent } from '@/data/cmsTypes';
import { formatKyivTime } from '@/lib/datetime';

export default function AnalyticsView() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    void adminFetch<{ events: AnalyticsEvent[] }>('/api/admin/analytics')
      .then((data) => setEvents(data.events))
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Аналітика"
        description="Події pageview та заявки, збережені в локальній базі CMS."
      />
      <AdminCard>
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Тип</th>
                <th>Шлях</th>
                <th>Час</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={3} className={ui.empty}>
                    Подій поки немає.
                  </td>
                </tr>
              ) : (
                events.slice(0, 100).map((event) => (
                  <tr key={event.id}>
                    <td>{event.type}</td>
                    <td>{event.path}</td>
                    <td>{formatKyivTime(event.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}

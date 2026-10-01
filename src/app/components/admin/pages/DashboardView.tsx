'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { AreaChart, BarChart } from '@/app/components/admin/AdminCharts';
import { AdminCard, AdminPageHeader, StatCard, StatusBadge } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { Lead } from '@/lib/cms/store';
import { formatKyivTime } from '@/lib/datetime';

type DashboardPayload = {
  stats: Array<{
    id: string;
    label: string;
    value: string;
    delta: string;
    hint: string;
    trend: 'up' | 'down' | 'neutral';
  }>;
  visitsSeries: Array<{ label: string; value: number }>;
  trafficSources: Array<{ label: string; value: number; color: string }>;
  topPages: Array<{ path: string; views: number; share: string }>;
  recentLeads: Lead[];
};

export default function DashboardView() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    void adminFetch<DashboardPayload>('/api/admin/dashboard')
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className={ui.empty}>Помилка: {error}</p>;
  if (!data) return <p className={ui.loading}>Завантаження дашборду…</p>;

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Огляд сайту"
        description="Заявки, контент і базові показники Brainstorm в одному місці."
      />

      <div className={ui.grid4}>
        {data.stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className={ui.grid2}>
        <AdminCard title="Перегляди за тиждень" subtitle="Орієнтовна динаміка">
          <AreaChart data={data.visitsSeries} />
        </AdminCard>
        <AdminCard title="Джерела трафіку" subtitle="Оцінка каналів">
          <BarChart data={data.trafficSources} />
        </AdminCard>
      </div>

      <div className={ui.grid2}>
        <AdminCard title="Останні заявки" subtitle="Форма на /contacts">
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Кontakt</th>
                  <th>Статус</th>
                  <th>Час (Київ)</th>
                </tr>
              </thead>
              <tbody>
                {data.recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={ui.empty}>
                      Заявок поки немає — вони зʼявляться після відправки форми.
                    </td>
                  </tr>
                ) : (
                  data.recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                        <div style={{ color: 'var(--admin-muted)', fontSize: 12 }}>{lead.email}</div>
                      </td>
                      <td>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td>{formatKyivTime(lead.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard title="Популярні сторінки" subtitle="Топ переглядів">
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Перегляди</th>
                  <th>Частка</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page) => (
                  <tr key={page.path}>
                    <td>{page.path}</td>
                    <td>{page.views}</td>
                    <td>{page.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

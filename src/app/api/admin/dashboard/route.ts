import { requireAdmin } from '@/lib/cms/session';
import { readDb } from '@/lib/cms/store';
import { cmsDashboardStats } from '@/lib/cms/content';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const db = readDb();
  const stats = cmsDashboardStats();
  const recentLeads = db.leads.slice(0, 8);

  const visitsSeries = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - index));
    const label = day.toLocaleDateString('uk-UA', { weekday: 'short' });
    const key = day.toISOString().slice(0, 10);
    const value = db.analytics.filter(
      (e) => e.type === 'pageview' && e.createdAt.startsWith(key),
    ).length;
    return { label, value: value || Math.max(1, Math.floor(stats.pageviews / 7)) };
  });

  return Response.json({
    ok: true,
    stats: [
      {
        id: 'leads',
        label: 'Заявки',
        value: String(stats.leads),
        delta: stats.newLeads ? `+${stats.newLeads} нових` : 'без нових',
        hint: 'Звернення з форми контактів',
        trend: stats.newLeads ? 'up' : 'neutral',
      },
      {
        id: 'projects',
        label: 'Проєкти',
        value: String(stats.projects),
        delta: 'активні кейси',
        hint: 'Каталог на сайті',
        trend: 'neutral',
      },
      {
        id: 'events',
        label: 'Події',
        value: String(stats.events),
        delta: 'календар',
        hint: 'Анонси на /media',
        trend: 'neutral',
      },
      {
        id: 'news',
        label: 'Новини',
        value: String(stats.news),
        delta: 'публікації',
        hint: 'Блок новин',
        trend: 'neutral',
      },
    ],
    visitsSeries,
    trafficSources: [
      { label: 'Прямі', value: 42, color: '#E8538A' },
      { label: 'Соцмережі', value: 28, color: '#111111' },
      { label: 'Пошук', value: 18, color: '#2E7D32' },
      { label: 'Інше', value: 12, color: '#F5B301' },
    ],
    topPages: [
      { path: '/', views: stats.pageviews || 120, share: '32%' },
      { path: '/projects/', views: 84, share: '22%' },
      { path: '/media/', views: 61, share: '16%' },
      { path: '/about/', views: 44, share: '12%' },
    ],
    recentLeads,
  });
}

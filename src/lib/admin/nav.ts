export type AdminNavIcon =
  | 'dashboard'
  | 'leads'
  | 'properties'
  | 'blog'
  | 'analytics'
  | 'reviews'
  | 'team'
  | 'settings'
  | 'roles'
  | 'districts'
  | 'landings';

export type AdminNavItem = {
  href: string;
  label: string;
  icon: AdminNavIcon;
  permission: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: '/admin/dashboard', label: 'Дашборд', icon: 'dashboard', permission: 'dashboard' },
  { href: '/admin/leads', label: 'Заявки', icon: 'leads', permission: 'leads' },
  { href: '/admin/projects', label: 'Проєкти', icon: 'properties', permission: 'projects' },
  { href: '/admin/events', label: 'Події', icon: 'districts', permission: 'events' },
  { href: '/admin/registrations', label: 'Реєстрації', icon: 'leads', permission: 'registrations' },
  { href: '/admin/news', label: 'Новини', icon: 'blog', permission: 'news' },
  { href: '/admin/team', label: 'Команда', icon: 'team', permission: 'team' },
  { href: '/admin/reviews', label: 'Відгуки', icon: 'reviews', permission: 'reviews' },
  { href: '/admin/reports', label: 'Звіти', icon: 'landings', permission: 'reports' },
  { href: '/admin/gallery', label: 'Галерея', icon: 'properties', permission: 'gallery' },
  { href: '/admin/media', label: 'Медіатека', icon: 'landings', permission: 'gallery' },
  { href: '/admin/ticker', label: 'Бігучий рядок', icon: 'blog', permission: 'ticker' },
  { href: '/admin/analytics', label: 'Аналітика', icon: 'analytics', permission: 'analytics' },
  { href: '/admin/roles', label: 'Ролі', icon: 'roles', permission: 'roles' },
  { href: '/admin/settings', label: 'Налаштування', icon: 'settings', permission: 'settings' },
];

export function getAdminPageTitle(pathname: string) {
  const item = ADMIN_NAV.find((entry) => pathname === entry.href || pathname.startsWith(`${entry.href}/`));
  return item?.label ?? 'Адмін-панель';
}

export function navForPermissions(permissions: string[]) {
  const set = new Set(permissions);
  return ADMIN_NAV.filter((item) => set.has(item.permission));
}

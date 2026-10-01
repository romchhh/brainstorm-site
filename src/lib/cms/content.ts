import { readDb } from './store';
import type { CmsEvent, CmsGalleryItem, CmsNewsItem, CmsProject, CmsReport, CmsReview, CmsTeamMember } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import {
  localizeEvent,
  localizeGallery,
  localizeNews,
  localizeProject,
  localizeReport,
  localizeReview,
  localizeSettings,
  localizeTeamMember,
} from './localize';
import { normalizeEvent } from './registrations';
import { normalizeGalleryItem } from './normalize';

function published<T extends { published?: boolean }>(items: T[]) {
  return items.filter((item) => item.published !== false);
}

export function cmsProjects(locale: Locale = 'uk'): CmsProject[] {
  return published(readDb().projects).map((item) => localizeProject(item, locale));
}

export function cmsProjectById(id: string, locale: Locale = 'uk'): CmsProject | undefined {
  return cmsProjects(locale).find((p) => p.id === id);
}

export function cmsEvents(locale: Locale = 'uk'): CmsEvent[] {
  return published(readDb().events)
    .map((event) => normalizeEvent(event))
    .map((event) => localizeEvent(event, locale))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function cmsEventById(id: string, locale: Locale = 'uk'): CmsEvent | undefined {
  return cmsEvents(locale).find((event) => event.id === id);
}

export function cmsNews(locale: Locale = 'uk'): CmsNewsItem[] {
  return published(readDb().news)
    .map((item) => localizeNews(item, locale))
    .sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date));
}

export function cmsNewsById(id: string, locale: Locale = 'uk'): CmsNewsItem | undefined {
  return cmsNews(locale).find((item) => item.id === id);
}

function parseNewsDate(value: string) {
  const parts = value.split(/[./-]/).map(Number);
  if (parts.length >= 3) {
    const [d, m, y] = parts[0] > 31 ? [parts[2], parts[1], parts[0]] : parts;
    return new Date(y, (m || 1) - 1, d || 1).getTime();
  }
  return Date.parse(value) || 0;
}

export function cmsTeam(locale: Locale = 'uk'): CmsTeamMember[] {
  return published(readDb().team)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => localizeTeamMember(item, locale));
}

export function cmsReviews(locale: Locale = 'uk'): CmsReview[] {
  return published(readDb().reviews).map((item) => localizeReview(item, locale));
}

export function cmsReports(locale: Locale = 'uk'): CmsReport[] {
  return published(readDb().reports).map((item) => localizeReport(item, locale));
}

export function cmsReportsByYear(locale: Locale = 'uk') {
  const map = new Map<string, CmsReport[]>();
  for (const report of cmsReports(locale)) {
    const list = map.get(report.year) ?? [];
    list.push(report);
    map.set(report.year, list);
  }
  return Array.from(map.entries())
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, reports]) => ({ year, reports }));
}

export function cmsGallery(locale: Locale = 'uk'): CmsGalleryItem[] {
  return published(readDb().gallery.map((item) => normalizeGalleryItem(item))).map((item) =>
    localizeGallery(item, locale),
  );
}

export function cmsTicker(locale: Locale = 'uk'): string[] {
  return readDb()
    .ticker.map((item) => (locale === 'en' && item.textEn?.trim() ? item.textEn : item.text))
    .filter(Boolean);
}

export function cmsSettings(locale: Locale = 'uk') {
  return localizeSettings(readDb().settings, locale);
}

export function cmsDashboardStats() {
  const db = readDb();
  const newLeads = db.leads.filter((l) => l.status === 'new').length;
  const pageviews = db.analytics.filter((e) => e.type === 'pageview').length;
  return {
    projects: db.projects.length,
    events: db.events.length,
    news: db.news.length,
    leads: db.leads.length,
    newLeads,
    pageviews,
  };
}

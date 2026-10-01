import type { Locale } from '@/i18n/locale';

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parse CMS date key (YYYY-MM-DD) as local calendar date. */
export function parseIsoDateKey(iso: string): Date | null {
  const trimmed = iso.trim();
  const match = trimmed.match(ISO_DATE);
  if (match) {
    const y = Number(match[1]);
    const m = Number(match[2]) - 1;
    const d = Number(match[3]);
    return new Date(y, m, d);
  }
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export type EventDateFormat = 'long' | 'medium' | 'short';

export function formatEventDate(
  iso: string,
  locale: Locale = 'uk',
  format: EventDateFormat = 'medium',
): string {
  const date = parseIsoDateKey(iso);
  if (!date) return iso;

  const localeTag = locale === 'en' ? 'en-GB' : 'uk-UA';

  if (format === 'long') {
    return date.toLocaleDateString(localeTag, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (format === 'short') {
    return date.toLocaleDateString(localeTag, {
      day: 'numeric',
      month: 'short',
    });
  }

  return date.toLocaleDateString(localeTag, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatEventDateTime(
  iso: string,
  locale: Locale = 'uk',
  startTime?: string,
  format: EventDateFormat = 'medium',
): string {
  const datePart = formatEventDate(iso, locale, format);
  const time = startTime?.trim();
  return time ? `${datePart} · ${time}` : datePart;
}

export function formatKyivTime(iso: string) {
  try {
    return new Intl.DateTimeFormat('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

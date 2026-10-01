import type { CmsEvent, EventRegistration } from '@/data/cmsTypes';
import { readDb } from './store';

function parseCoord(value: unknown): number | undefined {
  if (value == null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function normalizeEvent(event: CmsEvent): CmsEvent {
  const format: CmsEvent['format'] =
    event.format === 'online' || event.format === 'hybrid' ? event.format : 'offline';

  return {
    ...event,
    format,
    registrationEnabled: event.registrationEnabled !== false,
    capacity: Number(event.capacity) || 0,
    registrationNote: event.registrationNote ?? '',
    image: event.image || '/about-lecture.jpg',
    excerpt: event.excerpt ?? '',
    body: event.body ?? event.excerpt ?? '',
    latitude: parseCoord(event.latitude as unknown),
    longitude: parseCoord(event.longitude as unknown),
    onlineUrl: event.onlineUrl?.trim() || undefined,
  };
}

export function cmsEventById(id: string): CmsEvent | undefined {
  const event = readDb().events.find((entry) => entry.id === id);
  return event ? normalizeEvent(event) : undefined;
}

export function countActiveRegistrations(eventId: string): number {
  const db = readDb();
  return db.registrations.filter(
    (r) => r.eventId === eventId && r.status !== 'cancelled',
  ).length;
}

export function eventRegistrationAvailability(event: CmsEvent) {
  const normalized = normalizeEvent(event);
  const taken = countActiveRegistrations(normalized.id);
  const capacity = normalized.capacity ?? 0;
  const unlimited = capacity <= 0;
  const full = !unlimited && taken >= capacity;
  const waitlist = full;
  const open = normalized.registrationEnabled !== false && normalized.published !== false;

  return {
    open,
    full,
    waitlist,
    taken,
    capacity,
    spotsLeft: unlimited ? null : Math.max(0, capacity - taken),
  };
}

export function listRegistrationsForEvent(eventId: string): EventRegistration[] {
  return readDb()
    .registrations.filter((r) => r.eventId === eventId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

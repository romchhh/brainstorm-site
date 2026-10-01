import type { CmsEvent } from '@/data/cmsTypes';
import { geocodeAddress } from '@/lib/geocode';

function eventFormat(event: Partial<CmsEvent>): CmsEvent['format'] {
  return event.format === 'online' || event.format === 'hybrid' ? event.format : 'offline';
}

function placeChanged(current: Partial<CmsEvent>, previous?: CmsEvent): boolean {
  if (!previous) return true;
  return normalizePlace(current.place) !== normalizePlace(previous.place);
}

function normalizePlace(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

export async function enrichEventLocation(
  event: CmsEvent,
  ctx: { mode: 'create' | 'update'; previous?: CmsEvent },
): Promise<CmsEvent> {
  const format = eventFormat(event);

  if (format === 'online') {
    return { ...event, latitude: undefined, longitude: undefined };
  }

  const address = normalizePlace(event.place);
  if (!address) {
    return { ...event, latitude: undefined, longitude: undefined };
  }

  const shouldGeocode = ctx.mode === 'create' || placeChanged(event, ctx.previous);
  if (!shouldGeocode) {
    return event;
  }

  const coords = await geocodeAddress(address);
  if (!coords) {
    return event;
  }

  return {
    ...event,
    latitude: coords.lat,
    longitude: coords.lng,
  };
}

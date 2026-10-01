/** Brainstorm offline events are in Lutsk — appended to admin addresses for geocoding. */
export const EVENT_GEO_CITY_UK = 'Луцьк';
export const EVENT_GEO_COUNTRY_UK = 'Україна';

const LUTSK_PATTERN = /\b(луцьк|lutsk)\b/i;
const COUNTRY_PATTERN = /\b(україн|ukraine)\b/i;

export function buildEventGeocodeQuery(place: string): string {
  const normalized = place.trim().replace(/\s+/g, ' ');
  if (!normalized) return '';

  let query = normalized;
  if (!LUTSK_PATTERN.test(query)) {
    query = `${query}, ${EVENT_GEO_CITY_UK}`;
  }
  if (!COUNTRY_PATTERN.test(query)) {
    query = `${query}, ${EVENT_GEO_COUNTRY_UK}`;
  }
  return query;
}

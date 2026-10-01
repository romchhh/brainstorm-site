import { buildEventGeocodeQuery } from '@/lib/eventGeo';

type Coords = { lat: number; lng: number };

function normalizeAddress(address: string): string {
  return address.trim().replace(/\s+/g, ' ');
}

async function geocodeWithGoogle(address: string, apiKey: string): Promise<Coords | null> {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', address);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('region', 'ua');
  url.searchParams.set('language', 'uk');

  const response = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!response.ok) return null;

  const data = (await response.json()) as {
    status?: string;
    results?: { geometry?: { location?: { lat?: number; lng?: number } } }[];
  };

  if (data.status !== 'OK' || !data.results?.[0]?.geometry?.location) return null;

  const { lat, lng } = data.results[0].geometry.location;
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;
  return { lat, lng };
}

/** Fallback when Google key is not configured (OpenStreetMap Nominatim). */
async function geocodeWithNominatim(address: string): Promise<Coords | null> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', address);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  url.searchParams.set('countrycodes', 'ua');

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'BrainstormCMS/1.0 (brainstorm.org.ua)',
      Accept: 'application/json',
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) return null;

  const data = (await response.json()) as { lat?: string; lon?: string }[];
  const hit = data[0];
  if (!hit?.lat || !hit.lon) return null;

  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

export async function geocodeAddress(address: string): Promise<Coords | null> {
  const normalized = normalizeAddress(address);
  if (!normalized) return null;

  const query = buildEventGeocodeQuery(normalized);
  if (!query) return null;

  const googleKey = process.env.GOOGLE_MAPS_API_KEY;
  if (googleKey) {
    const fromGoogle = await geocodeWithGoogle(query, googleKey);
    if (fromGoogle) return fromGoogle;
  }

  return geocodeWithNominatim(query);
}

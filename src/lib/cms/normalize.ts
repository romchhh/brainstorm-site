import type { CmsGalleryItem, CmsGalleryPhoto } from '@/data/cmsTypes';

function photoFromUnknown(entry: unknown): CmsGalleryPhoto | null {
  if (typeof entry === 'string' && entry.trim()) {
    return { src: entry.trim() };
  }
  if (entry && typeof entry === 'object' && 'src' in entry) {
    const row = entry as CmsGalleryPhoto;
    if (row.src?.trim()) return { src: row.src.trim(), caption: row.caption, captionEn: row.captionEn };
  }
  return null;
}

export function normalizeGalleryItem(
  raw: Partial<CmsGalleryItem> & { image?: string; photoUrls?: string[] },
): CmsGalleryItem {
  const legacyImage = raw.cover || raw.image || '';
  let photos: CmsGalleryPhoto[] = [];

  if (Array.isArray(raw.photos)) {
    photos = raw.photos.map(photoFromUnknown).filter(Boolean) as CmsGalleryPhoto[];
  }
  if (Array.isArray(raw.photoUrls)) {
    photos = raw.photoUrls.map((src) => ({ src: String(src).trim() })).filter((p) => p.src);
  }
  if (!photos.length && legacyImage) {
    photos = [{ src: legacyImage }];
  }

  const cover = legacyImage || photos[0]?.src || '/hero-kite.jpg';

  return {
    id: raw.id || 'gal-unknown',
    title: raw.title || 'Альбом',
    titleEn: raw.titleEn,
    date: raw.date || '',
    cover,
    photos,
    published: raw.published !== false,
  };
}

export function galleryPhotoUrlsForAdmin(item: CmsGalleryItem): string {
  return item.photos.map((p) => p.src).join('\n');
}

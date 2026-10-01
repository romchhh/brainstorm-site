'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { CmsGalleryItem } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import ModalShell from '@/components/ModalShell';
import styles from './ProjectsGallery.module.css';

type Props = {
  albums: CmsGalleryItem[];
  locale?: Locale;
};

export default function ProjectsGallery({ albums, locale = 'uk' }: Props) {
  const m = getMessages(locale);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<CmsGalleryItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return albums;
    return albums.filter(
      (album) => album.title.toLowerCase().includes(q) || album.date.toLowerCase().includes(q),
    );
  }, [albums, query]);

  return (
    <>
      <section className={styles.section} id="gallery">
        <div className={styles.container}>
          <h2 className={styles.title}>{m.gallery.title}</h2>
          <p className={styles.lead}>{m.gallery.lead}</p>

          <label className={styles.searchWrap}>
            <span className="sr-only">{m.gallery.search}</span>
            <input
              className={styles.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={m.gallery.search}
            />
          </label>

          <div className={styles.grid}>
            {filtered.map((album) => (
              <figure key={album.id} className={styles.card}>
                <button type="button" className={styles.mediaBtn} onClick={() => setActive(album)}>
                  <div className={`${styles.media} ui-card-photo`}>
                    <Image
                      src={album.cover}
                      alt={`${album.title}, ${album.date}`}
                      fill
                      className={styles.photo}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className={styles.caption}>
                    <span className={styles.captionTitle}>{album.title}</span>
                    <time className={styles.captionDate}>{album.date}</time>
                    <span className={styles.count}>
                      {album.photos.length} {m.gallery.photos}
                    </span>
                  </figcaption>
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ModalShell
        open={Boolean(active)}
        onClose={() => setActive(null)}
        closeLabel={locale === 'en' ? 'Close' : 'Закрити'}
        panelClassName={styles.lightboxPanel}
        maxWidth={920}
      >
        {active ? (
          <>
            <button
              type="button"
              className={styles.close}
              onClick={() => setActive(null)}
              aria-label={locale === 'en' ? 'Close' : 'Закрити'}
            >
              ×
            </button>
            <h3 className={styles.albumTitle}>
              {active.title} · {active.date}
            </h3>
            <div className={styles.albumGrid}>
              {active.photos.map((photo, index) => (
                <figure key={`${photo.src}-${index}`} className={styles.albumPhoto}>
                  <Image src={photo.src} alt={photo.caption || active.title} fill className={styles.photo} sizes="400px" />
                  {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </>
        ) : null}
      </ModalShell>
    </>
  );
}

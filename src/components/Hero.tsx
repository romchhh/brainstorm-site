'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { formatEventDateTime } from '@/lib/datetime';
import { CtaArrow } from '@/components/CtaPanel';
import styles from './Hero.module.css';

const FALLBACK_IMAGE = '/hero-kite.jpg';
const AUTO_INTERVAL_MS = 5500;

type Slide = {
  id: string;
  title: string;
  meta?: string;
  image: string;
  href: string;
};

type Props = {
  locale?: Locale;
  events?: CmsEvent[];
};

function buildSlides(events: CmsEvent[], locale: Locale, fallbackTitle: string): Slide[] {
  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.published !== false && e.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? '').localeCompare(b.startTime ?? ''))
    .slice(0, 6);

  if (upcoming.length === 0) {
    return [
      {
        id: 'fallback',
        title: fallbackTitle,
        image: FALLBACK_IMAGE,
        href: localizedPath('/media', locale),
      },
    ];
  }

  return upcoming.map((event) => ({
    id: event.id,
    title: event.title,
    meta: `${formatEventDateTime(event.date, locale, event.startTime)} · ${event.place}`,
    image: event.image?.trim() || FALLBACK_IMAGE,
    href: localizedPath(`/events/${event.id}`, locale),
  }));
}

export default function Hero({ locale = 'uk', events = [] }: Props) {
  const m = getMessages(locale);
  const slides = useMemo(
    () => buildSlides(events, locale, m.cta.events),
    [events, locale, m.cta.events],
  );
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent((c) => (c >= slides.length ? 0 : c));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current] ?? slides[0];

  return (
    <section className={styles.hero} data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.left} data-reveal="left" style={{ '--reveal-delay': '40ms' } as React.CSSProperties}>
          <Image src="/icons/wave-pink.svg" alt="" width={100} height={23} className={styles.waveTop} aria-hidden />
          <h1 className={styles.headline}>
            <span className={styles.line1}>{m.hero.line1}</span>
            <span className={styles.line2}>
              {m.hero.line2}
              <span className={styles.underlineYellow} />
            </span>
            <span className={styles.line3}>
              {m.hero.line3Prefix} <em className={styles.together}>{m.hero.line3Em}</em>
            </span>
          </h1>

          <Image
            src="/icons/sticker-critical.svg"
            alt=""
            width={121}
            height={104}
            className={styles.stickerCritical}
            aria-hidden
          />

          <p className={styles.desc}>
            {m.hero.desc}
            <br />
            {m.hero.tagline}
          </p>

          <Image
            src="/icons/sticker-argument.svg"
            alt=""
            width={123}
            height={93}
            className={styles.stickerArgument}
            aria-hidden
          />
        </div>

        <div className={styles.actions} data-reveal="up" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <a href={localizedPath('/media', locale)} className="ui-btn ui-btn--primary">
            {m.cta.events}
            <CtaArrow />
          </a>
          <a href="#directions" className="ui-btn ui-btn--outline">
            {m.hero.directions}
          </a>
        </div>

        <div className={styles.right} data-reveal="right" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <div className={styles.slider}>
            <Link href={slide.href} className={styles.slideLink} aria-label={slide.title}>
              <div className={styles.slideImg}>
                {slides.map((item, index) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={index === current ? item.title : ''}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`${styles.slidePhoto} ${index === current ? styles.slidePhotoActive : ''}`}
                    aria-hidden={index !== current}
                  />
                ))}
                <div className={styles.slideCaption} aria-live="polite">
                  <span className={styles.slideTitle}>{slide.title}</span>
                  {slide.meta ? <span className={styles.slideMeta}>{slide.meta}</span> : null}
                </div>
                <Image src="/icons/wave-pink.svg" alt="" width={100} height={23} className={styles.waveBottom} aria-hidden />
              </div>
            </Link>

            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Prev"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13 4L7 10L13 16" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4L13 10L7 16" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                <div className={styles.dots}>
                  {slides.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrent(i);
                      }}
                      aria-label={`${i + 1} / ${slides.length}`}
                      aria-current={i === current ? 'true' : undefined}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

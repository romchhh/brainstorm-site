import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventDetailActions from '@/components/EventDetailActions';
import EventMap from '@/components/EventMap';
import type { EventFormat } from '@/data/cmsTypes';
import { cmsEventById, cmsEvents } from '@/lib/cms/content';
import { getMessages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/locale';
import { getServerLocale, pagePathForLocale } from '@/lib/localeServer';
import { formatEventDate } from '@/lib/datetime';
import { buildPageMetadata, breadcrumbJsonLd, eventJsonLd, jsonLdScript } from '@/lib/seo';
import styles from './page.module.css';

function eventFormatLabel(format: EventFormat | undefined, ep: ReturnType<typeof getMessages>['eventPage']) {
  switch (format) {
    case 'online':
      return ep.formatOnline;
    case 'hybrid':
      return ep.formatHybrid;
    default:
      return ep.formatOffline;
  }
}

function formatPillClass(format: EventFormat | undefined) {
  if (format === 'online') return styles.pillFormatOnline;
  if (format === 'hybrid') return styles.pillFormatHybrid;
  return styles.pillFormat;
}

export function generateStaticParams() {
  return cmsEvents('uk').map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const event = cmsEventById(id, locale);
  if (!event) {
    return buildPageMetadata({
      title: locale === 'en' ? 'Event not found' : 'Подію не знайдено',
      description: '',
      path: `/events/${id}`,
      noIndex: true,
      locale,
    });
  }

  return buildPageMetadata({
    title: `${event.title} — Brainstorm`,
    description: event.excerpt || event.title,
    path: `/events/${event.id}`,
    image: event.image,
    imageAlt: event.title,
    type: 'website',
    locale,
  });
}

export const revalidate = 300;

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getServerLocale();
  const event = cmsEventById(id, locale);
  if (!event) notFound();

  const m = getMessages(locale);
  const ep = m.eventPage;
  const isEn = locale === 'en';
  const format = event.format ?? 'offline';
  const body = event.body || event.excerpt || '';
  const paragraphs = body.split('\n').filter(Boolean);
  const dateLabel = formatEventDate(event.date, locale, 'long');
  const mediaPath = localizedPath('/media', locale);
  const calendarHash = `${mediaPath}#schedule`;
  const showMap =
    (format === 'offline' || format === 'hybrid') &&
    typeof event.latitude === 'number' &&
    typeof event.longitude === 'number';
  const showOnline = (format === 'online' || format === 'hybrid') && Boolean(event.onlineUrl);
  const coverSrc = event.image || '/about-lecture.jpg';

  const breadcrumbs = breadcrumbJsonLd([
    { name: isEn ? 'Home' : 'Головна', path: pagePathForLocale('/', locale) },
    { name: isEn ? 'News & events' : 'Актуальні події', path: pagePathForLocale('/media', locale) },
    { name: event.title, path: pagePathForLocale(`/events/${event.id}`, locale) },
  ]);

  const structuredEvent = eventJsonLd({
    title: event.title,
    date: event.date,
    startTime: event.startTime,
    place: event.place,
    description: event.excerpt || event.body,
    format,
    latitude: event.latitude,
    longitude: event.longitude,
    onlineUrl: event.onlineUrl,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(structuredEvent)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <div className={styles.page}>
          <Link href={calendarHash} className={styles.back}>
            ← {ep.back}
          </Link>

          <div className={styles.badges}>
            <span className={styles.pillDirection} style={{ ['--accent' as string]: event.color }}>
              {event.direction}
            </span>
            <span className={formatPillClass(format)}>{eventFormatLabel(format, ep)}</span>
          </div>

          <h1 className={styles.title}>{event.title}</h1>
          {event.excerpt ? <p className={styles.lead}>{event.excerpt}</p> : null}

          <div className={styles.cover}>
            <Image src={coverSrc} alt={event.title} fill className={styles.photo} priority sizes="(max-width: 900px) 100vw, 960px" />
          </div>

          <div className={styles.layout}>
            <article>
              <h2 className={styles.sectionTitle}>{ep.about}</h2>
              <div className={styles.body}>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              {event.registrationNote ? (
                <div className={styles.noteBlock}>
                  <p className={styles.noteTitle}>{ep.note}</p>
                  <p className={styles.noteText}>{event.registrationNote}</p>
                </div>
              ) : null}

              {showMap ? (
                <section className={styles.mapBlock} aria-labelledby="event-map-title">
                  <h2 id="event-map-title" className={styles.sectionTitle}>
                    {ep.mapTitle}
                  </h2>
                  <p className={styles.mapAddress}>{event.place}</p>
                  <EventMap
                    lat={event.latitude!}
                    lng={event.longitude!}
                    label={event.place}
                    openLabel={ep.openMap}
                  />
                </section>
              ) : null}

              {showOnline ? (
                <section className={styles.onlineBlock} aria-labelledby="event-online-title">
                  <h2 id="event-online-title" className={styles.sectionTitle}>
                    {ep.onlineTitle}
                  </h2>
                  <p className={styles.onlineLead}>{ep.onlineLead}</p>
                  <a href={event.onlineUrl!} target="_blank" rel="noreferrer" className="ui-btn ui-btn--primary">
                    {ep.onlineLink}
                    <span className="ui-btn__arrow" aria-hidden>→</span>
                  </a>
                </section>
              ) : null}
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.infoCard} style={{ ['--accent' as string]: event.color }}>
                <p className={styles.infoHead}>{ep.info}</p>
                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>{ep.date}</span>
                    <span className={styles.infoValue}>{dateLabel}</span>
                  </li>
                  {event.startTime ? (
                    <li className={styles.infoItem}>
                      <span className={styles.infoLabel}>{ep.time}</span>
                      <span className={styles.infoValue}>{event.startTime}</span>
                    </li>
                  ) : null}
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>{ep.format}</span>
                    <span className={styles.infoValue}>{eventFormatLabel(format, ep)}</span>
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>{ep.place}</span>
                    <span className={styles.infoValue}>{event.place}</span>
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoLabel}>{ep.direction}</span>
                    <span className={styles.infoValue}>{event.direction}</span>
                  </li>
                </ul>
                <div className={styles.infoActions}>
                  <EventDetailActions
                    event={event}
                    registerLabel={ep.register}
                    closedLabel={ep.closed}
                    variant="sidebar"
                    locale={locale}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

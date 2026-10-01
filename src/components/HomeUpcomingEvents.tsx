import Image from 'next/image';
import Link from 'next/link';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { formatEventDateTime } from '@/lib/datetime';
import { CtaArrow } from '@/components/CtaPanel';
import styles from './HomeUpcomingEvents.module.css';

type Props = {
  events: CmsEvent[];
  locale: Locale;
};

const EVENT_IMAGE_FALLBACK = '/about-lecture.jpg';

function eventCover(event: CmsEvent) {
  return event.image?.trim() || EVENT_IMAGE_FALLBACK;
}

export default function HomeUpcomingEvents({ events, locale }: Props) {
  const m = getMessages(locale);
  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= todayKey).slice(0, 4);

  return (
    <section className={styles.section} id="upcoming-events" data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.head} data-reveal="up">
          <h2 className={styles.title}>
            {m.home.eventsTitle} <em className={styles.accent}>{m.home.eventsAccent}</em>
          </h2>
          <p className={styles.lead}>{m.home.eventsLead}</p>
        </div>

        <div className={styles.list}>
          {upcoming.map((event) => (
            <article key={event.id} className={styles.row} data-reveal="up">
              <div className={styles.media}>
                <Image
                  src={eventCover(event)}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 280px, 96px"
                  className={styles.photo}
                />
                <span className={styles.colorTag} style={{ background: event.color }} aria-hidden />
              </div>
              <div className={styles.main}>
                <span className={styles.direction}>{event.direction}</span>
                <h3 className={styles.eventTitle}>
                  <Link href={localizedPath(`/events/${event.id}`, locale)} className={styles.eventLink}>
                    {event.title}
                  </Link>
                </h3>
                <p className={styles.place}>
                  {formatEventDateTime(event.date, locale, event.startTime)} · {event.place}
                </p>
                {event.excerpt ? <p className={styles.excerpt}>{event.excerpt}</p> : null}
              </div>
              <Link href={localizedPath(`/events/${event.id}`, locale)} className="ui-btn ui-btn--primary">
                {m.eventPage.details}
                <CtaArrow />
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.footerCta}>
          <Link href={`${localizedPath('/media', locale)}#schedule`} className="ui-btn ui-btn--outline">
            {m.home.allEvents}
            <CtaArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

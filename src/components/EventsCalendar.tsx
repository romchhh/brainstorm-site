'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { formatEventDate } from '@/lib/datetime';
import { CtaArrow } from '@/components/CtaPanel';
import EventRegistrationPanel from '@/components/EventRegistrationPanel';
import styles from './EventsCalendar.module.css';

export type CalendarEvent = CmsEvent;

const MONTHS_UK = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

const LEGEND = [
  { label: 'Дебати', color: 'var(--yellow)' },
  { label: 'Екологія', color: 'var(--green)' },
  { label: 'Наука', color: 'var(--blue)' },
] as const;

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const EVENT_IMAGE_FALLBACK = '/about-lecture.jpg';

function eventCover(event: CalendarEvent) {
  return event.image?.trim() || EVENT_IMAGE_FALLBACK;
}

type Props = {
  events: CalendarEvent[];
  locale?: Locale;
};

export default function EventsCalendar({ events, locale = 'uk' }: Props) {
  const m = getMessages(locale);
  const firstEventDate = events[0] ? parseKey(events[0].date) : new Date();
  const [viewYear, setViewYear] = useState(firstEventDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstEventDate.getMonth());
  const [selectedKey, setSelectedKey] = useState(events[0]?.date ?? toKey(viewYear, viewMonth, 1));
  const [registerEvent, setRegisterEvent] = useState<CmsEvent | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) =>
          a.date.localeCompare(b.date) || (a.startTime ?? '').localeCompare(b.startTime ?? ''),
      ),
    [events],
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startOffset = (first.getDay() + 6) % 7;
    const total = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const result: Array<{ key: string | null; day: number | null; inMonth: boolean }> = [];

    for (let i = 0; i < total; i += 1) {
      const dayNum = i - startOffset + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        result.push({ key: null, day: null, inMonth: false });
      } else {
        result.push({
          key: toKey(viewYear, viewMonth, dayNum),
          day: dayNum,
          inMonth: true,
        });
      }
    }
    return result;
  }, [viewYear, viewMonth]);

  const selectedEvents = eventsByDay.get(selectedKey) ?? [];
  const todayKey = toKey(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(`[data-date="${selectedKey}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedKey]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const goToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedKey(toKey(now.getFullYear(), now.getMonth(), now.getDate()));
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.calendarCard}>
          <div className={styles.toolbar}>
            <button type="button" className={styles.navBtn} onClick={goPrev} aria-label="Попередній місяць">
              ←
            </button>
            <div className={styles.monthTitle}>
              {MONTHS_UK[viewMonth]} {viewYear}
            </div>
            <button type="button" className={styles.navBtn} onClick={goNext} aria-label="Наступний місяць">
              →
            </button>
            <button type="button" className={styles.todayBtn} onClick={goToday}>
              Сьогодні
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <div key={d} className={styles.weekday}>
                {d}
              </div>
            ))}
          </div>

          <div className={styles.grid}>
            {cells.map((cell, idx) => {
              if (!cell.inMonth || !cell.key) {
                return <div key={`empty-${idx}`} className={styles.dayEmpty} />;
              }

              const dayEvents = eventsByDay.get(cell.key) ?? [];
              const isSelected = cell.key === selectedKey;
              const isToday = cell.key === todayKey;

              return (
                <button
                  key={cell.key}
                  type="button"
                  className={`${styles.day} ${isSelected ? styles.daySelected : ''} ${isToday ? styles.dayToday : ''}`}
                  onClick={() => setSelectedKey(cell.key!)}
                  aria-label={`${cell.day} ${MONTHS_UK[viewMonth]}${dayEvents.length ? `, подій: ${dayEvents.length}` : ''}`}
                >
                  <span className={styles.dayNum}>{cell.day}</span>
                  {dayEvents.length > 0 ? (
                    <span className={styles.dayThumb} style={{ ['--accent' as string]: dayEvents[0].color }}>
                      <Image
                        src={eventCover(dayEvents[0])}
                        alt=""
                        fill
                        sizes="72px"
                        className={styles.dayThumbImg}
                      />
                      {dayEvents.length > 1 ? (
                        <span className={styles.dayThumbCount}>+{dayEvents.length - 1}</span>
                      ) : null}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className={styles.legend}>
            {LEGEND.map((item) => (
              <span key={item.label} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <aside className={styles.details}>
          <h3 className={styles.detailsTitle}>Усі події</h3>
          <p className={styles.detailsMeta}>
            Обрано: <strong>{formatEventDate(selectedKey, locale, 'medium')}</strong>
            {selectedEvents.length === 0 ? ' · цього дня подій немає' : ` · ${selectedEvents.length} подій`}
          </p>

          {sortedEvents.length === 0 ? (
            <p className={styles.empty}>Подій поки немає. Загляньте пізніше або підпишіться на новини.</p>
          ) : (
            <div className={styles.eventListScroll} ref={listRef}>
              {sortedEvents.map((event) => {
                const regOpen = event.registrationEnabled !== false;
                const isOnSelectedDay = event.date === selectedKey;
                return (
                  <article
                    key={event.id}
                    data-date={event.date}
                    className={`${styles.eventCard} ${isOnSelectedDay ? styles.eventCardActive : ''}`}
                  >
                    <div className={styles.eventMedia}>
                      <Image
                        src={eventCover(event)}
                        alt={event.title}
                        fill
                        sizes="96px"
                        className={styles.eventPhoto}
                      />
                      <span className={styles.eventColorTag} style={{ background: event.color }} aria-hidden />
                    </div>
                    <div className={styles.eventBody}>
                      <time className={styles.eventDate} dateTime={event.date}>
                        {formatEventDate(event.date, locale, 'medium')}
                        {event.startTime ? ` · ${event.startTime}` : ''}
                      </time>
                      <span className={styles.eventDirection}>{event.direction}</span>
                      <h4 className={styles.eventTitle}>
                        <Link href={localizedPath(`/events/${event.id}`, locale)} className={styles.eventTitleLink}>
                          {event.title}
                        </Link>
                      </h4>
                      {event.excerpt ? <p className={styles.eventExcerpt}>{event.excerpt}</p> : null}
                      <p className={styles.eventPlace}>{event.place}</p>
                      <div className={styles.eventActions}>
                        <Link href={localizedPath(`/events/${event.id}`, locale)} className="ui-btn ui-btn--outline">
                          {m.eventPage.details}
                        </Link>
                        {regOpen ? (
                          <button type="button" className="ui-btn ui-btn--primary" onClick={() => setRegisterEvent(event)}>
                            {m.eventPage.register}
                            <CtaArrow />
                          </button>
                        ) : (
                          <span className={styles.eventClosed}>{m.eventPage.closed}</span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </aside>
      </div>

      {registerEvent ? (
        <EventRegistrationPanel event={registerEvent} onClose={() => setRegisterEvent(null)} locale={locale} />
      ) : null}
    </>
  );
}

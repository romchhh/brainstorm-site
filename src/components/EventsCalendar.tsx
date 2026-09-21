'use client';

import { useMemo, useState } from 'react';
import styles from './EventsCalendar.module.css';

export type CalendarEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  place: string;
  direction: 'Дебати' | 'Екологія' | 'Наука';
  color: string;
};

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

function formatUkDate(key: string) {
  const date = parseKey(key);
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

type Props = {
  events: CalendarEvent[];
};

export default function EventsCalendar({ events }: Props) {
  const firstEventDate = events[0] ? parseKey(events[0].date) : new Date();
  const [viewYear, setViewYear] = useState(firstEventDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstEventDate.getMonth());
  const [selectedKey, setSelectedKey] = useState(events[0]?.date ?? toKey(viewYear, viewMonth, 1));

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
    // Monday-first: JS getDay() Sunday=0 → convert
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
                  <span className={styles.dots}>
                    {dayEvents.slice(0, 3).map((ev) => (
                      <span key={`${ev.title}-${ev.date}`} className={styles.dot} style={{ background: ev.color }} />
                    ))}
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
        <h3 className={styles.detailsTitle}>{formatUkDate(selectedKey)}</h3>

        {selectedEvents.length === 0 ? (
          <p className={styles.empty}>Цього дня подій немає. Оберіть дату з кольоровою позначкою.</p>
        ) : (
          <div className={styles.eventList}>
            {selectedEvents.map((event) => (
              <article key={`${event.title}-${event.date}`} className={styles.eventCard}>
                <span className={styles.eventDot} style={{ background: event.color }} />
                <div className={styles.eventBody}>
                  <span className={styles.eventDirection}>{event.direction}</span>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <p className={styles.eventPlace}>{event.place}</p>
                  <a href="/contacts" className={styles.eventBtn}>
                    Реєстрація
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

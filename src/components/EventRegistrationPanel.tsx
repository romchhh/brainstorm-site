'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import ModalShell from '@/components/ModalShell';
import { formatEventDateTime } from '@/lib/datetime';
import styles from './EventRegistrationPanel.module.css';

type Availability = {
  open: boolean;
  spotsLeft: number | null;
  taken: number;
  capacity: number;
  note: string;
};

type Props = {
  event: CmsEvent;
  onClose: () => void;
  locale?: Locale;
};

export default function EventRegistrationPanel({ event, onClose, locale = 'uk' }: Props) {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    void fetch(`/api/event-registrations?eventId=${encodeURIComponent(event.id)}`)
      .then((r) => r.json())
      .then((data: Availability & { ok?: boolean; note?: string }) => {
        if (data.ok !== false) {
          setAvailability({
            open: data.open,
            spotsLeft: data.spotsLeft,
            taken: data.taken,
            capacity: data.capacity,
            note: data.note ?? event.registrationNote ?? '',
          });
        }
      })
      .catch(() => setAvailability(null));
  }, [event.id, event.registrationNote]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/event-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          phone,
          age,
          comment,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        waitlist?: boolean;
      };

      if (!response.ok) {
        if (data.error === 'already_registered') {
          setError('Ви вже зареєстровані на цю подію з цим email.');
        } else if (data.error === 'registration_closed') {
          setError('Реєстрація на цю подію закрита.');
        } else {
          setError('Не вдалося надіслати заявку. Спробуйте ще раз.');
        }
        return;
      }

      setSuccess(
        data.waitlist
          ? 'Дякуємо! Місць уже немає — ми додали вас у лист очікування.'
          : 'Дякуємо! Ваша реєстрація прийнята. Ми надішлемо деталі на email.',
      );
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setComment('');
    } finally {
      setLoading(false);
    }
  }

  const closed = availability && !availability.open;

  return (
    <ModalShell
      open
      onClose={onClose}
      labelledBy="reg-title"
      closeLabel="Закрити"
      panelClassName={styles.panel}
      maxWidth={440}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
        ×
      </button>

      <p className={styles.eyebrow}>{event.direction}</p>
      <h3 id="reg-title" className={styles.title}>
        {event.title}
      </h3>
      <p className={styles.meta}>
        {formatEventDateTime(event.date, locale, event.startTime)} · {event.place}
      </p>

      {event.excerpt ? <p className={styles.description}>{event.excerpt}</p> : null}

      {availability && availability.spotsLeft !== null && availability.capacity > 0 ? (
        <p className={styles.slots}>
          Вільних місць: <strong>{availability.spotsLeft}</strong> з {availability.capacity}
        </p>
      ) : null}

      {availability?.note ? <p className={styles.note}>{availability.note}</p> : null}

      {success ? (
        <p className={styles.success}>{success}</p>
      ) : closed ? (
        <p className={styles.error}>Реєстрація на цю подію зараз недоступна.</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Імʼя та прізвище *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Email *</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className={styles.field}>
            <span>Телефон *</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+380…" />
          </label>
          <label className={styles.field}>
            <span>Вік (необовʼязково)</span>
            <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="16–25" />
          </label>
          <label className={styles.field}>
            <span>Коментар</span>
            <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Алергії, досвід, питання…" />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

            <button type="submit" className="ui-btn ui-btn--primary ui-btn--block" disabled={loading}>
              {loading ? 'Надсилання…' : 'Зареєструватися'}
              {!loading ? <span className="ui-btn__arrow" aria-hidden>→</span> : null}
            </button>
        </form>
      )}
    </ModalShell>
  );
}

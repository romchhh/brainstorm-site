'use client';

import { FormEvent, useState } from 'react';
import type { Locale } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import styles from '@/app/contacts/page.module.css';

export default function ContactForm({ locale = 'uk' }: { locale?: Locale }) {
  const m = getMessages(locale);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          page: '/contacts/',
        }),
      });
      if (!response.ok) throw new Error('failed');
      form.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-reveal="up">
      <h2 className={styles.sectionTitle}>{m.contact.formTitle}</h2>
      <label className={styles.field}>
        <span>{m.contact.name}</span>
        <input type="text" name="name" placeholder={m.contact.namePh} required />
      </label>
      <label className={styles.field}>
        <span>{m.contact.email}</span>
        <input type="email" name="email" placeholder="you@email.com" required />
      </label>
      <label className={styles.field}>
        <span>{m.contact.message}</span>
        <textarea name="message" rows={5} placeholder={m.contact.messagePh} required />
      </label>
      <button type="submit" className="ui-btn ui-btn--primary ui-btn--block" disabled={status === 'loading'}>
        {status === 'loading' ? m.contact.submitting : m.contact.submit}
        {status !== 'loading' ? <span className="ui-btn__arrow" aria-hidden>→</span> : null}
      </button>
      {status === 'ok' ? (
        <p className={styles.formNote}>{m.contact.ok}</p>
      ) : status === 'error' ? (
        <p className={styles.formNote}>{m.contact.error}</p>
      ) : (
        <p className={styles.formNote}>{m.contact.hint}</p>
      )}
    </form>
  );
}

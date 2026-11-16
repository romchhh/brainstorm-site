'use client';

import { useState } from 'react';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import EventRegistrationPanel from '@/components/EventRegistrationPanel';
import { CtaArrow } from '@/components/CtaArrow';
import styles from './EventDetailActions.module.css';

type Props = {
  event: CmsEvent;
  registerLabel: string;
  closedLabel: string;
  variant?: 'primary' | 'sidebar';
  locale?: Locale;
};

export default function EventDetailActions({
  event,
  registerLabel,
  closedLabel,
  variant = 'primary',
  locale = 'uk',
}: Props) {
  const [open, setOpen] = useState(false);
  const canRegister = event.registrationEnabled !== false;
  const externalUrl = event.registrationUrl?.trim();
  const btnClass = `ui-btn ui-btn--primary ${variant === 'sidebar' ? 'ui-btn--block' : ''}`;

  if (!canRegister) {
    return <p className={styles.closed}>{closedLabel}</p>;
  }

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noreferrer" className={btnClass}>
        {registerLabel}
        <CtaArrow />
      </a>
    );
  }

  return (
    <>
      <button type="button" className={btnClass} onClick={() => setOpen(true)}>
        {registerLabel}
        <CtaArrow />
      </button>
      {open ? <EventRegistrationPanel event={event} onClose={() => setOpen(false)} locale={locale} /> : null}
    </>
  );
}

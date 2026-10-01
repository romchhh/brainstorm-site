'use client';

import { useState } from 'react';
import type { CmsEvent } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import EventRegistrationPanel from '@/components/EventRegistrationPanel';
import { CtaArrow } from '@/components/CtaPanel';
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

  if (!canRegister) {
    return <p className={styles.closed}>{closedLabel}</p>;
  }

  return (
    <>
      <button
        type="button"
        className={`ui-btn ui-btn--primary ${variant === 'sidebar' ? 'ui-btn--block' : ''}`}
        onClick={() => setOpen(true)}
      >
        {registerLabel}
        <CtaArrow />
      </button>
      {open ? <EventRegistrationPanel event={event} onClose={() => setOpen(false)} locale={locale} /> : null}
    </>
  );
}

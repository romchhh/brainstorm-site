'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  alternateLanguagePath,
  getLocaleFromPathname,
  LOCALE_LABELS,
  localizedPath,
  type Locale,
} from '@/i18n/locale';
import { usePublicPathname } from '@/hooks/usePublicPathname';
import styles from './LanguageSwitch.module.css';

type Props = {
  /** From layout/page when server knows locale (middleware). */
  locale?: Locale;
};

export default function LanguageSwitch({ locale: localeProp }: Props) {
  const publicPath = usePublicPathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const locale = localeProp ?? getLocaleFromPathname(publicPath);
  const { uk, en } = alternateLanguagePath(publicPath);

  const options: { code: Locale; href: string }[] = [
    { code: 'uk', href: uk },
    { code: 'en', href: en },
  ];

  const current = LOCALE_LABELS[locale];

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={locale === 'uk' ? 'Вибір мови' : 'Choose language'}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
        }}
      >
        <GlobeIcon />
        <span className={styles.triggerCode}>{current.short}</span>
      </button>

      {open ? (
        <ul id={listId} className={styles.menu} role="listbox" aria-label={locale === 'uk' ? 'Мова' : 'Language'}>
          {options.map((option) => {
            const labels = LOCALE_LABELS[option.code];
            const selected = option.code === locale;
            return (
              <li key={option.code} role="option" aria-selected={selected}>
                <a
                  href={option.href}
                  className={`${styles.option} ${selected ? styles.optionActive : ''}`}
                  onClick={() => setOpen(false)}
                  hrefLang={option.code === 'en' ? 'en' : 'uk'}
                >
                  <span className={styles.optionCode}>{labels.short}</span>
                  <span className={styles.optionName}>{labels.name}</span>
                  {selected ? <CheckIcon /> : null}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function localePrefix(locale: Locale, path: string) {
  return localizedPath(path, locale);
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6-4 9s1.5 6.2 4 9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.check} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

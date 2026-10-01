'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import LanguageSwitch, { localePrefix } from '@/components/LanguageSwitch';
import type { Locale } from '@/i18n/locale';
import { getLocaleFromPathname } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { usePublicPathname } from '@/hooks/usePublicPathname';
import styles from './Header.module.css';

export default function Header({ locale: localeProp }: { locale?: Locale }) {
  const publicPath = usePublicPathname();
  const locale = localeProp ?? getLocaleFromPathname(publicPath);
  const m = getMessages(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: m.nav.home, href: localePrefix(locale, '/') },
    { label: m.nav.about, href: localePrefix(locale, '/about') },
    { label: m.nav.projects, href: localePrefix(locale, '/projects') },
    { label: m.nav.media, href: localePrefix(locale, '/media') },
    { label: m.nav.transparency, href: localePrefix(locale, '/transparency') },
    { label: m.nav.contacts, href: localePrefix(locale, '/contacts') },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) => {
    const path = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;
    const target = href.endsWith('/') ? href : `${href}/`;
    if (target === '/' || target === localePrefix(locale, '/')) {
      return path === '/' || path === '/en/';
    }
    return path === target || path.startsWith(target);
  };

  return (
    <header className={styles.header}>
      <div className={styles.panel}>
        <div className={styles.bar}>
        <a href={localePrefix(locale, '/')} className={styles.logo} onClick={closeMenu}>
          <Image
            src="/icons/brainstorm-logo.svg"
            alt="Brainstorm"
            width={220}
            height={54}
            className={styles.logoImg}
            priority
          />
        </a>

        <div className={styles.barActions}>
          <div className={styles.desktopLang}>
            <LanguageSwitch locale={locale} />
          </div>
          <a href={localePrefix(locale, '/contacts')} className={styles.cta}>
            {m.cta.join}
            <span className={styles.arrowCircle}>
              <svg className={styles.arrowIcon} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerBracket}>[</span>
          <span className={styles.burgerText}>menu</span>
          <span className={styles.burgerArrowCircle}>
            <svg className={styles.burgerArrow} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.burgerBracket}>]</span>
        </button>
      </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a href={localePrefix(locale, '/contacts')} className={styles.mobileCta} onClick={closeMenu}>
          {m.cta.join}
          <span className={styles.arrowCircle}>
            <svg className={styles.arrowIcon} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <div className={styles.mobileSocials} aria-label="Social">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={styles.mobileSocialLink}
              aria-label={s.label}
              onClick={closeMenu}
            >
              <SocialIcon name={s.name} size={18} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

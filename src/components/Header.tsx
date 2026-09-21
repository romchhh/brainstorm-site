'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import styles from './Header.module.css';

const navLinks = [
  { label: 'ГОЛОВНА', href: '/' },
  { label: 'ПРО НАС', href: '/about' },
  { label: 'ПРОЄКТИ', href: '/projects' },
  { label: 'АКТУАЛЬНІ ПОДІЇ', href: '/media' },
  { label: 'ПРОЗОРІСТЬ', href: '/transparency' },
  { label: 'КОНТАКТИ', href: '/contacts' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/icons/brainstorm-logo.svg"
            alt="Brainstorm"
            width={220}
            height={54}
            className={styles.logoImg}
            priority
          />
        </a>

        <a href="#join" className={styles.cta}>
          ПРИЄДНАТИСЯ
          <span className={styles.arrowCircle}>
            <svg className={styles.arrowIcon} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerBracket}>[</span>
          <span className={styles.burgerText}>menu</span>
          <span className={styles.burgerArrowCircle}>
            <svg className={styles.burgerArrow} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className={styles.burgerBracket}>]</span>
        </button>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`${styles.navLink} ${
              (pathname === '/' && link.href === '/') || (pathname === '/about' && link.href === '/about')
                ? styles.navLinkActive
                : ''
            }`}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a href="#join" className={styles.mobileCta} onClick={closeMenu}>
          ПРИЄДНАТИСЯ
          <span className={styles.arrowCircle}>
            <svg className={styles.arrowIcon} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>

        <div className={styles.mobileSocials} aria-label="Соцмережі">
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

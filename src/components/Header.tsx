'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navLinks = [
  { label: 'ГОЛОВНА', href: '/' },
  { label: 'ПРО НАС', href: '/about' },
  { label: 'ПРОЄКТИ', href: '/projects' },
  { label: 'АКТУАЛЬНІ ПОДІЇ', href: '/events' },
  { label: 'ПРОЗОРІСТЬ', href: '/#transparency' },
];

const mobileSocialLinks = [
  {
    name: 'instagram',
    href: 'https://instagram.com/brainstorm.ngo?igsh=MXVmazV2NGJkMzUxcA==',
  },
  { name: 'facebook', href: 'https://www.facebook.com/BrainStormLutsk' },
  { name: 'telegram', href: 'https://t.me/Brainstorm_ShDK' },
  { name: 'tiktok', href: 'https://www.tiktok.com/@brainstorm.ngo?_t=zm-90gl6jeuehp&_r=1' },
  { name: 'youtube', href: 'https://www.youtube.com/channel/UCyaXTpH7aE1tft_YDImmlkQ' },
] as const;

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
          {mobileSocialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={styles.mobileSocialLink}
              aria-label={s.name}
              onClick={closeMenu}
            >
              <MobileSocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function MobileSocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
    facebook: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    telegram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>,
    tiktok: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 9v8a3 3 0 1 0 3 3v-9" />
        <path d="M12 6c1.5 2 3.5 3 6 3" />
      </svg>
    ),
    youtube: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>,
  };
  return icons[name] || null;
}

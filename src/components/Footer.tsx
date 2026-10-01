import Image from 'next/image';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { cmsSettings } from '@/lib/cms/content';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import styles from './Footer.module.css';

type Props = {
  locale?: Locale;
};

export default function Footer({ locale = 'uk' }: Props) {
  const settings = cmsSettings(locale);
  const isEn = locale === 'en';

  const footerLinks = {
    [isEn ? 'FOCUS' : 'НАПРЯМКИ']: [
      { label: isEn ? 'Debates' : 'Дебати', href: localizedPath('/projects', locale) },
      { label: isEn ? 'Ecology' : 'Екологія', href: localizedPath('/projects', locale) },
      { label: isEn ? 'Robotics' : 'Робототехніка', href: localizedPath('/projects', locale) },
      { label: isEn ? 'Events' : 'Події', href: localizedPath('/media', locale) },
    ],
    [isEn ? 'ORGANIZATION' : 'ОРГАНІЗАЦІЯ']: [
      { label: isEn ? 'About' : 'Про нас', href: localizedPath('/about', locale) },
      { label: isEn ? 'Projects' : 'Проєкти', href: localizedPath('/projects', locale) },
      { label: isEn ? 'Team' : 'Команда', href: `${localizedPath('/about', locale)}#community` },
      { label: isEn ? 'Transparency' : 'Прозорість', href: localizedPath('/transparency', locale) },
      { label: isEn ? 'Ecomonitoring' : 'Екомоніторинг', href: localizedPath('/ecomonitoring', locale) },
      { label: isEn ? 'Contact' : 'Контакти', href: localizedPath('/contacts', locale) },
    ],
    [isEn ? 'CONTACT' : 'КОНТАКТИ']: [
      { label: settings.email, href: `mailto:${settings.email}` },
      { label: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
      { label: settings.location, href: localizedPath('/contacts', locale) },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <Image src="/icons/brainstorm-logo.svg" alt="Brainstorm" width={186} height={46} />
          </div>
          <p className={styles.brandDesc}>{settings.metaDescription}</p>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
                aria-label={s.label}
              >
                <SocialIcon name={s.name} size={18} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className={styles.col}>
            <h4 className={styles.colHead}>{heading}</h4>
            {links.map((link) => (
              <a key={link.label} href={link.href} className={styles.colLink}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottomLine}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>
            © 2026 {settings.brandName}. {isEn ? 'All rights reserved.' : 'Усі права захищено.'}
          </span>
          <div className={styles.legal}>
            <a href={localizedPath('/privacy-policy', locale)} className={styles.legalLink}>
              {isEn ? 'Privacy policy' : 'Політика конфіденційності'}
            </a>
            <a href={localizedPath('/public-offer', locale)} className={styles.legalLink}>
              {isEn ? 'Public offer' : 'Публічна оферта'}
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

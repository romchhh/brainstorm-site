import Image from 'next/image';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import styles from './Footer.module.css';

const footerLinks = {
  НАПРЯМКИ: [
    { label: 'Дебати', href: '/projects' },
    { label: 'Екологія', href: '/projects' },
    { label: 'Робототехніка', href: '/projects' },
    { label: 'Події', href: '/media' },
  ],
  ОРГАНІЗАЦІЯ: [
    { label: 'Про нас', href: '/about' },
    { label: 'Проєкти', href: '/projects' },
    { label: 'Команда', href: '/about#community' },
    { label: 'Прозорість', href: '/transparency' },
    { label: 'Контакти', href: '/contacts' },
  ],
  КОНТАКТИ: [
    { label: 'info@brainstorm.org.ua', href: 'mailto:info@brainstorm.org.ua' },
    { label: '+380 44 123 4567', href: 'tel:+380441234567' },
    { label: 'Україна', href: '/contacts' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer} data-reveal="fade">
      <div className={styles.container} data-reveal="up">
        <div className={styles.brand} data-reveal="up">
          <div className={styles.logoWrap}>
            <Image
              src="/icons/brainstorm-logo-white.svg"
              alt="Brainstorm"
              width={186}
              height={46}
            />
          </div>
          <p className={styles.brandDesc}>
            Молодіжна некомерційна організація, що створює простори для дискусій, екологічних та наукових ініціатив, а також громадської діяльності по всій Україні.
          </p>
          <div className={styles.socials} data-reveal="up">
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
          <div key={heading} className={styles.col} data-reveal="up">
            <h4 className={styles.colHead}>{heading}</h4>
            {links.map((link) => (
              <a key={link.label} href={link.href} className={styles.colLink}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottomLine} data-reveal="fade">
        <div className={styles.bottomInner} data-reveal="up">
          <span className={styles.copy}>© 2026 Brainstorm. Усі права захищено.</span>
          <div className={styles.legal}>
            <a href="/privacy-policy" className={styles.legalLink}>Політика конфіденційності</a>
            <a href="/public-offer" className={styles.legalLink}>Публічна оферта</a>
            <a
              href="https://telebots.site/uk"
              target="_blank"
              rel="noreferrer"
              className={styles.telebotsPill}
            >
              Сайт розроблено <span className={styles.telebotsBrand}>TeleBots</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

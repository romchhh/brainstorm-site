import styles from './Footer.module.css';
import Image from 'next/image';

const footerLinks = {
  'НАПРЯМКИ': ['Дебати', 'Екологія', 'Робототехніка', 'Події'],
  'ОРГАНІЗАЦІЯ': ['Про нас', 'Проєкти', 'Команда', 'Прозорість'],
  'КОНТАКТИ': ['info@brainstorm.org.ua', '+380 44 123 4567', 'Kyiv, Ukraine'],
};

export default function Footer() {
  const socialLinks = [
    {
      name: 'instagram',
      href: 'https://instagram.com/brainstorm.ngo?igsh=MXVmazV2NGJkMzUxcA==',
    },
    { name: 'facebook', href: 'https://www.facebook.com/BrainStormLutsk' },
    { name: 'telegram', href: 'https://t.me/Brainstorm_ShDK' },
    { name: 'tiktok', href: 'https://www.tiktok.com/@brainstorm.ngo?_t=zm-90gl6jeuehp&_r=1' },
    { name: 'youtube', href: 'https://www.youtube.com/channel/UCyaXTpH7aE1tft_YDImmlkQ' },
  ] as const;

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
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.social}
                aria-label={s.name}
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className={styles.col} data-reveal="up">
            <h4 className={styles.colHead}>{heading}</h4>
            {links.map((link) => (
              <a key={link} href="#" className={styles.colLink}>{link}</a>
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

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
    facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    telegram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>,
    tiktok: (
      <svg
        width="16"
        height="16"
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
    youtube: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>,
  };
  return icons[name] || null;
}

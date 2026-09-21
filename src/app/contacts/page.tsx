import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Контакти — Brainstorm | Звʼязок із командою';
const pageDescription =
  'Контакти громадської організації Brainstorm: email, телефон, соцмережі та форма звернення для партнерів, донорів і учасників.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/contacts',
  image: '/26d199e4c2adfb0b0885677156726a723c55e0b9.jpg',
  imageAlt: 'Контакти команди Brainstorm',
  keywords: [
    'контакти Brainstorm',
    'звʼязок з ГО',
    'партнерство',
    'донори',
    'волонтерство контакти',
  ],
});

const contacts = [
  { label: 'Email', value: 'info@brainstorm.org.ua', href: 'mailto:info@brainstorm.org.ua' },
  { label: 'Телефон', value: '+380 44 123 4567', href: 'tel:+380441234567' },
  { label: 'Локація', value: 'Україна', href: null },
];

export default function ContactsPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/contacts/`,
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Контакти', path: '/contacts' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(contactJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main className={styles.main}>
        <section className={styles.hero} data-reveal="up">
          <div className={`${styles.container} ${styles.heroInner}`}>
            <h1 className={styles.heroTitle}>
              Давайте <span className={styles.heroAccent}>познайомимось</span>
            </h1>
            <p className={styles.heroDesc}>
              Партнери, донори, медіа, волонтери — пишіть нам. Відповідаємо протягом 1–2 робочих днів.
            </p>
          </div>
        </section>

        <Ticker />

        <section className={styles.section} data-reveal="up">
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.info}>
                <h2 className={styles.sectionTitle}>Контакти</h2>
                <ul className={styles.contactList}>
                  {contacts.map((item) => (
                    <li key={item.label} className={styles.contactItem}>
                      <span className={styles.contactLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className={styles.contactValue}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.contactValue}>{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <h3 className={styles.socialTitle}>Соцмережі</h3>
                <div className={styles.socials}>
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                    >
                      <span className={styles.socialIcon}>
                        <SocialIcon name={s.name} size={16} />
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <form className={styles.form} action="#" method="post" data-reveal="up">
                <h2 className={styles.sectionTitle}>Написати нам</h2>
                <label className={styles.field}>
                  <span>Імʼя</span>
                  <input type="text" name="name" placeholder="Ваше імʼя" required />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@email.com" required />
                </label>
                <label className={styles.field}>
                  <span>Повідомлення</span>
                  <textarea name="message" rows={5} placeholder="Чим можемо допомогти?" required />
                </label>
                <button type="submit" className={styles.submit}>
                  НАДІСЛАТИ
                </button>
                <p className={styles.formNote}>
                  Форма поки демонстраційна. Після підключення бекенду/CRM листи надходитимуть на email команди.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

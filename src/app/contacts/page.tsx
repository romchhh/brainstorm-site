import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import TickerFromCms from '@/components/TickerFromCms';
import SocialIcon, { SOCIAL_LINKS } from '@/components/SocialIcon';
import { cmsSettings } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL, toCanonical } from '@/lib/seo';
import { pagePathForLocale } from '@/lib/localeServer';
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

export const revalidate = 300;

export default async function ContactsPage() {
  const locale = await getServerLocale();
  const settings = cmsSettings(locale);
  const contacts = [
    { label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { label: locale === 'en' ? 'Phone' : 'Телефон', value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
    { label: locale === 'en' ? 'Location' : 'Локація', value: settings.location, href: null },
  ];

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: pageTitle,
    description: pageDescription,
    url: toCanonical(pagePathForLocale('/contacts', locale)),
    inLanguage: locale === 'en' ? 'en-US' : 'uk-UA',
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
      <Header locale={locale} />
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

        <TickerFromCms locale={locale} />

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

              <ContactForm locale={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

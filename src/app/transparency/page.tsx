import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cmsReportsByYear } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import TickerFromCms from '@/components/TickerFromCms';
import PageHero, { HeroMark } from '@/components/PageHero';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Прозорість — Brainstorm | Публічні звіти ГО';
const pageDescription =
  'Публічні фінансові та творчі звіти громадської організації Brainstorm. Завантажуйте PDF або переглядайте в браузері.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/transparency',
  image: '/about-photos.jpg',
  imageAlt: 'Публічні звіти Brainstorm',
  keywords: [
    'прозорість ГО',
    'звіти Brainstorm',
    'фінансовий звіт',
    'публічна звітність',
    'PDF звіти організації',
  ],
});

export const revalidate = 300;

export default async function TransparencyPage() {
  const locale = await getServerLocale();
  const reportsByYear = cmsReportsByYear(locale);
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/transparency/`,
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Прозорість', path: '/transparency' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(webPageJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <PageHero
          title={
            <>
              Відкритість
              <br />
              <HeroMark tone="green">і довіра</HeroMark>
            </>
          }
          description="Публікуємо звіти про діяльність і фінанси. Кожен документ можна переглянути в браузері або завантажити у форматі PDF."
          primary={{ href: '#reports', label: 'ПЕРЕГЛЯНУТИ ЗВІТИ' }}
          secondary={{ href: '/contacts', label: 'ЗВʼЯЗАТИСЯ' }}
          leftImage="/about-photos.jpg"
          leftAlt="Спільнота Brainstorm"
          rightImage="/about/values/photos/value-achievement.jpg"
          rightAlt="Учасник із сертифікатом"
          accent="green"
        />

        <TickerFromCms locale={locale} />

        <section className={styles.section} id="reports" data-reveal="up">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Публічні звіти</h2>
            <p className={styles.sectionLead}>
              Документи згруповані за роками. Нові PDF додавайте в адмін-панелі в розділі «Звіти».
            </p>

            <div className={styles.years}>
              {reportsByYear.map((group) => (
                <div key={group.year} className={styles.yearBlock} data-reveal="up">
                  <h3 className={styles.yearTitle}>{group.year}</h3>
                  <div className={styles.reportList}>
                    {group.reports.map((report) => (
                      <article key={report.id} className={styles.reportCard}>
                        <div className={styles.reportIcon} aria-hidden>
                          <PdfIcon />
                        </div>
                        <div className={styles.reportBody}>
                          <h4 className={styles.reportTitle}>{report.title}</h4>
                          <p className={styles.reportFormat}>PDF · відкритий доступ</p>
                        </div>
                        <div className={styles.reportActions}>
                          <a
                            href={report.file}
                            target="_blank"
                            rel="noreferrer"
                            className="ui-btn ui-btn--outline"
                          >
                            Переглянути
                          </a>
                          <a href={report.file} download className="ui-btn ui-btn--primary">
                            Завантажити
                            <span className="ui-btn__arrow" aria-hidden>→</span>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function PdfIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        stroke="#111"
        strokeWidth="1.6"
      />
      <path d="M14 2v5h5" stroke="#111" strokeWidth="1.6" />
      <path d="M8.5 15.5h7M8.5 12h7M8.5 18h4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

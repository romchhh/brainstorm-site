import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
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

const reportsByYear = [
  {
    year: '2026',
    reports: [
      {
        title: 'Фінансово-творчий звіт ГО за I півріччя 2026',
        file: '/reports/placeholder-report.pdf',
      },
    ],
  },
  {
    year: '2025',
    reports: [
      {
        title: 'Фінансово-творчий звіт ГО за 2025 рік',
        file: '/reports/placeholder-report.pdf',
      },
      {
        title: 'Звіт про реалізовані проєкти 2025',
        file: '/reports/placeholder-report.pdf',
      },
    ],
  },
  {
    year: '2024',
    reports: [
      {
        title: 'Річний звіт ГО Brainstorm за 2024 рік',
        file: '/reports/placeholder-report.pdf',
      },
    ],
  },
];

export default function TransparencyPage() {
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
      <Header />
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

        <Ticker />

        <section className={styles.section} id="reports" data-reveal="up">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Публічні звіти</h2>
            <p className={styles.sectionLead}>
              Документи згруповані за роками. Після підключення адмін-панелі менеджер ГО зможе самостійно додавати нові PDF.
            </p>

            <div className={styles.years}>
              {reportsByYear.map((group) => (
                <div key={group.year} className={styles.yearBlock} data-reveal="up">
                  <h3 className={styles.yearTitle}>{group.year}</h3>
                  <div className={styles.reportList}>
                    {group.reports.map((report) => (
                      <article key={report.title} className={styles.reportCard}>
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
                            className={styles.btnOutline}
                          >
                            Переглянути
                          </a>
                          <a href={report.file} download className={styles.btnPrimary}>
                            Завантажити
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
      <Footer />
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

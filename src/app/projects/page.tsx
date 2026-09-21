import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import PageHero, { HeroMark } from '@/components/PageHero';
import ProjectsCatalog from '@/components/ProjectsCatalog';
import ProjectsGallery from '@/components/ProjectsGallery';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Проєкти — Brainstorm | Реалізовані та поточні ініціативи';
const pageDescription =
  'Каталог проєктів Brainstorm: дебати, екологія, STEM. Фільтри за статусом і тематикою, фотогалерея подій і детальні кейси.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/projects',
  image: '/about-desk.jpg',
  imageAlt: 'Проєкти та ініціативи Brainstorm',
  keywords: [
    'проєкти Brainstorm',
    'молодіжні ініціативи',
    'дебатні проєкти',
    'екологічні проєкти',
    'STEM проєкти',
    'фотогалерея подій',
  ],
});

export default function ProjectsPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/projects/`,
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Проєкти', path: '/projects' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main className={styles.main}>
        <PageHero
          title={
            <>
              Не просто спостерігайте
              <br />
              <HeroMark tone="pink">— долучайтеся.</HeroMark>
            </>
          }
          description="Майстер-класи, турніри, екскурсії, табори. Обирайте нові враження та приєднуйтеся до ініціатив спільноти."
          primary={{ href: '#projects-catalog', label: 'ПЕРЕГЛЯНУТИ ПРОЄКТИ' }}
          secondary={{ href: '/contacts', label: 'ПІДТРИМАТИ' }}
          leftImage="/about-outdoor.jpg"
          leftAlt="Учасники екологічної ініціативи"
          rightImage="/about-desk.jpg"
          rightAlt="Учасники STEM-проєкту"
          accent="pink"
        />

        <Ticker />

        <section className={styles.previewSection} id="directions-block">
          <div className={styles.container}>
            <h2 className={styles.previewTitle} data-reveal="up">
              Напрями, в яких ми діємо
            </h2>

            <div className={styles.previewGrid} data-reveal="up">
              <div className={`${styles.previewCard} ${styles.cardPink}`}>
                <h3 className={styles.directionTitle}>Дебати та публічні виступи</h3>
                <p className={styles.directionText}>Клуби, турніри, тренінги з аргументації та впевненого голосу.</p>
              </div>
              <div className={`${styles.previewCard} ${styles.cardGreen}`}>
                <h3 className={styles.directionTitle}>Екологія та довкілля</h3>
                <p className={styles.directionText}>Прибирання, моніторинг і просвітницькі ініціативи зі сталого розвитку.</p>
              </div>
              <div className={`${styles.previewCard} ${styles.cardBlue}`}>
                <h3 className={styles.directionTitle}>Наука та робототехніка</h3>
                <p className={styles.directionText}>STEM-майстерні, мейкер-лабораторії та змагання з робототехніки.</p>
              </div>
            </div>
          </div>
        </section>

        <ProjectsCatalog />
        <ProjectsGallery />
      </main>
      <Footer />
    </>
  );
}

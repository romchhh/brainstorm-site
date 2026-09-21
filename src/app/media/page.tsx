import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import PageHero, { HeroMark } from '@/components/PageHero';
import EventsCalendar from '@/components/EventsCalendar';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Актуальні події — Brainstorm | Новини, анонси та календар';
const pageDescription =
  'Новини та анонси Brainstorm, найближчі події за напрямками: дебати, екологія, наука та робототехніка.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/media',
  image: '/about-outdoor.jpg',
  imageAlt: 'Події та новини спільноти Brainstorm',
  keywords: [
    'новини Brainstorm',
    'анонси подій',
    'календар подій',
    'дебатні турніри',
    'екоакції',
    'STEM заходи',
  ],
});

const news = [
  {
    title: 'Національний фінал дебатів: підсумки сезону',
    date: '12.09.2026',
    tag: 'Дебати',
    tagColor: 'var(--yellow)',
    excerpt:
      'Понад 80 учасників з 12 міст зібралися на фіналі. Ділимося враженнями, переможцями та планами на наступний сезон.',
    image: '/about-lecture.jpg',
  },
  {
    title: 'Екодесант на річці: 1,2 тонни сміття зібрано',
    date: '28.08.2026',
    tag: 'Екологія',
    tagColor: 'var(--green)',
    excerpt:
      'Волонтери Brainstorm провели прибирання берегової зони разом із місцевою громадою. Фотозвіт і результати моніторингу.',
    image: '/about-outdoor.jpg',
  },
  {
    title: 'STEM Demo Day: роботи, експерименти, ідеї',
    date: '15.08.2026',
    tag: 'Наука',
    tagColor: 'var(--blue)',
    excerpt:
      'Молоді інженери презентували свої проєкти. Найкращі команди отримали менторську підтримку для розвитку ідей.',
    image: '/about-desk.jpg',
  },
];

const schedule = [
  {
    date: '2026-09-22',
    title: 'Національний фінал дебатів',
    place: 'Київ',
    direction: 'Дебати' as const,
    color: 'var(--yellow)',
  },
  {
    date: '2026-10-02',
    title: 'Екодесант: прибирання річки',
    place: 'Черкаси',
    direction: 'Екологія' as const,
    color: 'var(--green)',
  },
  {
    date: '2026-10-14',
    title: 'STEM-майстерня та Demo Day',
    place: 'Львів',
    direction: 'Наука' as const,
    color: 'var(--blue)',
  },
  {
    date: '2026-10-25',
    title: 'Відкритий турнір з публічних виступів',
    place: 'Онлайн + Київ',
    direction: 'Дебати' as const,
    color: 'var(--yellow)',
  },
];

export default function MediaPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/media/`,
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Актуальні події', path: '/media' },
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
              Новини, анонси
              <br />
              <HeroMark tone="yellow">і події</HeroMark>
            </>
          }
          description="Слідкуйте за тим, що відбувається в спільноті: свіжі публікації, найближчі заходи та можливості долучитися."
          primary={{ href: '#news', label: 'ЧИТАТИ НОВИНИ' }}
          secondary={{ href: '#schedule', label: 'КАЛЕНДАР ПОДІЙ' }}
          leftImage="/about-lecture.jpg"
          leftAlt="Учасники дебатного заходу"
          rightImage="/about-outdoor.jpg"
          rightAlt="Екологічна акція спільноти"
          accent="yellow"
        />

        <Ticker />

        <section className={styles.section} id="news" data-reveal="up">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Новини та анонси</h2>
            <p className={styles.sectionLead}>
              Останні публікації зі спільноти. Повноцінний блог з адмін-панеллю підключається на наступному етапі.
            </p>

            <div className={styles.newsGrid}>
              {news.map((item) => (
                <article key={item.title} className={styles.newsCard} data-reveal="up">
                  <div className={styles.newsMedia}>
                    <Image src={item.image} alt={item.title} fill className={styles.newsPhoto} sizes="(max-width: 900px) 100vw, 33vw" />
                  </div>
                  <div className={styles.newsBody}>
                    <div className={styles.newsMeta}>
                      <span className={styles.newsTag} style={{ ['--tag' as string]: item.tagColor }}>
                        {item.tag}
                      </span>
                      <time className={styles.newsDate}>{item.date}</time>
                    </div>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <a href="#" className={styles.newsLink}>
                      Читати далі
                      <span className={styles.newsLinkIcon}>
                        <ArrowIcon />
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.scheduleSection} id="schedule" data-reveal="up">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Календар подій</h2>
            <p className={styles.sectionLead}>
              Оберіть день у календарі. Колір позначки відповідає напрямку діяльності.
            </p>

            <EventsCalendar events={schedule} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

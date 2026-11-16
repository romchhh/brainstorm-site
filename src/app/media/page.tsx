import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import Link from 'next/link';
import { cmsEvents, cmsNews, cmsSettings } from '@/lib/cms/content';
import { getServerLocale, pagePathForLocale } from '@/lib/localeServer';
import PageHero, { HeroMark } from '@/components/PageHero';
import EventsCalendar from '@/components/EventsCalendar';
import HomeJoinBanner from '@/components/HomeJoinBanner';
import { CtaArrow } from '@/components/CtaArrow';
import { getMessages } from '@/i18n/messages';
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  eventJsonLd,
  itemListJsonLd,
  jsonLdScript,
  newsArticleJsonLd,
  SITE_URL,
  toCanonical,
} from '@/lib/seo';
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

export const revalidate = 300;

export default async function MediaPage() {
  const locale = await getServerLocale();
  const news = cmsNews(locale);
  const schedule = cmsEvents(locale);
  const settings = cmsSettings(locale);
  const m = getMessages(locale);
  const previewNews = news.slice(0, 3);

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

  const newsListJsonLd = itemListJsonLd(
    news.map((item) => ({
      name: item.title,
      url: toCanonical(`/media/${item.id}`),
    })),
  );

  const eventsJsonLd = schedule.slice(0, 10).map((event) =>
    eventJsonLd({
      title: event.title,
      date: event.date,
      place: event.place,
      description: `${event.direction} · ${event.place}`,
    }),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(newsListJsonLd)} />
      {previewNews.map((item) => (
        <script
          key={item.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            newsArticleJsonLd({
              title: item.title,
              excerpt: item.excerpt,
              date: item.date,
              image: item.image,
              path: `/media/${item.id}`,
            }),
          )}
        />
      ))}
      {eventsJsonLd.map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />
      ))}
      <Header locale={locale} donateUrl={settings.donateUrl} />
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
          primary={{ href: '#schedule', label: 'КАЛЕНДАР ПОДІЙ' }}
          secondary={{ href: '#news', label: 'ЧИТАТИ НОВИНИ' }}
          leftImage="/about-lecture.jpg"
          leftAlt="Учасники дебатного заходу"
          rightImage="/about-outdoor.jpg"
          rightAlt="Екологічна акція спільноти"
          accent="yellow"
        />

        <TickerFromCms locale={locale} />

        <section className={styles.scheduleSection} id="schedule" data-reveal="up">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Календар подій</h2>
            <p className={styles.sectionLead}>
              Оберіть день у календарі. Колір позначки відповідає напрямку діяльності.
            </p>

            <EventsCalendar events={schedule} locale={locale} />
          </div>
        </section>

        <section className={styles.section} id="news" data-reveal="up">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2 className={styles.sectionTitle}>Новини та анонси</h2>
                <p className={styles.sectionLead}>
                  {locale === 'en'
                    ? 'Latest posts from the community. Open any article for the full story.'
                    : 'Останні публікації зі спільноти. Відкрийте статтю для повного тексту.'}
                </p>
              </div>
              <Link href={pagePathForLocale('/news', locale)} className="ui-btn ui-btn--outline">
                {m.cta.allNews}
                <CtaArrow />
              </Link>
            </div>

            <div className={styles.newsGrid}>
              {previewNews.map((item) => (
                <article key={item.title} className={styles.newsCard} data-reveal="up">
                  <div className={`${styles.newsMedia} ui-card-photo`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.newsPhoto}
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
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
                    <Link href={pagePathForLocale(`/media/${item.id}`, locale)} className={styles.newsLink}>
                      {locale === 'en' ? 'Read more' : 'Читати далі'}
                      <span className={styles.newsLinkIcon}>
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HomeJoinBanner locale={locale} variant="support" donateUrl={settings.donateUrl} />
      </main>
      <Footer locale={locale} />
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

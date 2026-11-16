import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import { cmsNews, cmsSettings } from '@/lib/cms/content';
import { getServerLocale, pagePathForLocale } from '@/lib/localeServer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';
import styles from '../media/page.module.css';

const pageTitle = 'Усі новини — Brainstorm';
const pageDescription = 'Архів усіх публікацій спільноти Brainstorm: новини, анонси та історії з програм.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/news',
  image: '/about-lecture.jpg',
  imageAlt: 'Новини Brainstorm',
  keywords: ['новини Brainstorm', 'архів публікацій', 'анонси'],
});

export const revalidate = 300;

export default async function NewsArchivePage() {
  const locale = await getServerLocale();
  const news = cmsNews(locale);
  const settings = cmsSettings(locale);
  const isEn = locale === 'en';

  const breadcrumbs = breadcrumbJsonLd([
    { name: isEn ? 'Home' : 'Головна', path: '/' },
    { name: isEn ? 'News & events' : 'Актуальні події', path: '/media' },
    { name: isEn ? 'All news' : 'Усі новини', path: '/news' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header locale={locale} donateUrl={settings.donateUrl} />
      <main className={styles.main}>
        <section className={styles.section} data-reveal="up">
          <div className={styles.container}>
            <Link href={pagePathForLocale('/media', locale)} className={styles.newsLink}>
              ← {isEn ? 'Back to events' : 'До актуальних подій'}
            </Link>
            <h1 className={styles.sectionTitle} style={{ marginTop: 16 }}>
              {isEn ? 'All news' : 'Усі новини'}
            </h1>
            <p className={styles.sectionLead}>
              {isEn
                ? 'Full archive of community publications.'
                : 'Повний архів публікацій спільноти.'}
            </p>

            <div className={styles.newsGrid}>
              {news.map((item) => (
                <article key={item.id} className={styles.newsCard} data-reveal="up">
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
                    <h2 className={styles.newsTitle}>{item.title}</h2>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <Link href={pagePathForLocale(`/media/${item.id}`, locale)} className={styles.newsLink}>
                      {isEn ? 'Read more' : 'Читати далі'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <TickerFromCms locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

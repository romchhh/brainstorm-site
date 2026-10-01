import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import { cmsNews, cmsNewsById } from '@/lib/cms/content';
import { getServerLocale, pagePathForLocale } from '@/lib/localeServer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, newsArticleJsonLd } from '@/lib/seo';
import styles from './page.module.css';

export function generateStaticParams() {
  return cmsNews('uk').map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const article = cmsNewsById(id, locale);
  if (!article) {
    return buildPageMetadata({
      title: locale === 'en' ? 'Article not found' : 'Публікацію не знайдено',
      description: '',
      path: `/media/${id}`,
      noIndex: true,
      locale,
    });
  }

  return buildPageMetadata({
    title: `${article.title} — Brainstorm`,
    description: article.excerpt,
    path: `/media/${id}`,
    image: article.image,
    imageAlt: article.title,
    type: 'article',
    locale,
  });
}

export const revalidate = 300;

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getServerLocale();
  const article = cmsNewsById(id, locale);
  if (!article) notFound();

  const isEn = locale === 'en';
  const body = article.body || article.excerpt;
  const paragraphs = body.split('\n').filter(Boolean);

  const breadcrumbs = breadcrumbJsonLd([
    { name: isEn ? 'Home' : 'Головна', path: pagePathForLocale('/', locale) },
    { name: isEn ? 'News & events' : 'Актуальні події', path: pagePathForLocale('/media', locale) },
    { name: article.title, path: pagePathForLocale(`/media/${article.id}`, locale) },
  ]);

  const articleJsonLd = newsArticleJsonLd({
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    image: article.image,
    path: pagePathForLocale(`/media/${article.id}`, locale),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.container}>
            <Link href={pagePathForLocale('/media', locale)} className={styles.back}>
              ← {isEn ? 'All news' : 'Усі новини'}
            </Link>
            <div className={styles.meta}>
              <span className={styles.tag} style={{ ['--tag' as string]: article.tagColor }}>
                {article.tag}
              </span>
              <time>{article.date}</time>
            </div>
            <h1 className={styles.title}>{article.title}</h1>
          </div>
          <div className={styles.heroImage}>
            <Image src={article.image} alt={article.title} fill className={styles.photo} priority />
          </div>
          <div className={styles.container}>
            <div className={styles.body}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
        <TickerFromCms locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

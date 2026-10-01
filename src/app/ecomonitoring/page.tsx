import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import PageHero, { HeroMark } from '@/components/PageHero';
import { cmsSettings } from '@/lib/cms/content';
import { getServerLocale, pagePathForLocale } from '@/lib/localeServer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const settings = cmsSettings(locale);
  return buildPageMetadata({
    title: `${settings.ecomonitoringTitle} — Brainstorm`,
    description: settings.ecomonitoringLead,
    path: '/ecomonitoring',
    image: '/about-outdoor.jpg',
    locale,
  });
}

export const revalidate = 300;

export default async function EcomonitoringPage() {
  const locale = await getServerLocale();
  const settings = cmsSettings(locale);
  const isEn = locale === 'en';
  const paragraphs = settings.ecomonitoringBody.split('\n').filter(Boolean);

  const breadcrumbs = breadcrumbJsonLd([
    { name: isEn ? 'Home' : 'Головна', path: pagePathForLocale('/', locale) },
    { name: settings.ecomonitoringTitle, path: pagePathForLocale('/ecomonitoring', locale) },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <PageHero
          title={
            isEn ? (
              <>
                Water
                <br />
                <HeroMark tone="green">ecomonitoring</HeroMark>
              </>
            ) : (
              <>
                Еко
                <br />
                <HeroMark tone="green">моніторинг</HeroMark>
              </>
            )
          }
          description={settings.ecomonitoringLead}
          primary={{ href: `${pagePathForLocale('/media', locale)}#schedule`, label: isEn ? 'EVENTS' : 'ПОДІЇ' }}
          secondary={{ href: pagePathForLocale('/contacts', locale), label: isEn ? 'CONTACT' : 'КОНТАКТИ' }}
          leftImage="/about-outdoor.jpg"
          leftAlt="Eco monitoring"
          rightImage="/about/values/photos/value-lab.jpg"
          rightAlt="Field work"
          accent="green"
        />
        <TickerFromCms locale={locale} />

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.title}>{settings.ecomonitoringTitle}</h2>
            <div className={styles.body}>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>

            <div className={styles.panel}>
              <h3>{isEn ? 'What we measure' : 'Що фіксуємо'}</h3>
              <ul>
                <li>{isEn ? 'Shoreline waste types and volume' : 'Типи та обсяг сміття на берегах'}</li>
                <li>{isEn ? 'Water clarity and basic quality indicators' : 'Прозорість води та базові показники якості'}</li>
                <li>{isEn ? 'Photo documentation with geotags' : 'Фото-фіксація з привʼязкою до локації'}</li>
              </ul>
              <Link href={pagePathForLocale('/projects', locale)} className={styles.link}>
                {isEn ? 'See ecology projects →' : 'Екологічні проєкти →'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

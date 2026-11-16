import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import PageHero, { HeroMark } from '@/components/PageHero';
import ProjectsCatalog from '@/components/ProjectsCatalog';
import HomeJoinBanner from '@/components/HomeJoinBanner';
import { cmsProjects, cmsSettings } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Проєкти — Brainstorm | Реалізовані та поточні ініціативи';
const pageDescription =
  'Каталог проєктів Brainstorm: дебати, екологія, STEM. Фільтри за статусом і тематикою, детальні кейси з фото.';

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
  ],
});

export const revalidate = 300;

export default async function ProjectsPage() {
  const locale = await getServerLocale();
  const projects = cmsProjects(locale);
  const settings = cmsSettings(locale);
  const m = getMessages(locale);
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
      <Header locale={locale} donateUrl={settings.donateUrl} />
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
          secondary={{
            href: `${localizedPath('/media', locale)}#schedule`,
            label: m.cta.upcomingEvents,
          }}
          leftImage="/about-outdoor.jpg"
          leftAlt="Учасники екологічної ініціативи"
          rightImage="/about-desk.jpg"
          rightAlt="Учасники STEM-проєкту"
          accent="pink"
        />

        <TickerFromCms locale={locale} />
        <ProjectsCatalog projects={projects} />
        <HomeJoinBanner locale={locale} variant="upcoming" />
      </main>
      <Footer locale={locale} />
    </>
  );
}

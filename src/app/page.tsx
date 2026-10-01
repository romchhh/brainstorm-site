import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TickerFromCms from '@/components/TickerFromCms';
import About from '@/components/About';
import Directions from '@/components/Directions';
import HomeNewsFromCms from '@/components/HomeNewsFromCms';
import HomeUpcomingEvents from '@/components/HomeUpcomingEvents';
import HomeJoinBanner from '@/components/HomeJoinBanner';
import Footer from '@/components/Footer';
import { cmsEvents, cmsNews } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  DEFAULT_OG_IMAGE,
  buildPageMetadata,
  breadcrumbJsonLd,
  jsonLdScript,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  path: '/',
  image: DEFAULT_OG_IMAGE,
  imageAlt: 'Учасники Brainstorm на фестивалі повітряних зміїв',
  keywords: [
    'Brainstorm',
    'молодіжна організація Україна',
    'дебати для молоді',
    'екологічні ініціативи',
    'STEM робототехніка',
    'громадська організація',
    'волонтерство',
    'критичне мислення',
  ],
});

export const revalidate = 300;

export default async function Home() {
  const locale = await getServerLocale();
  const news = cmsNews(locale);
  const events = cmsEvents(locale);
  const breadcrumbs = breadcrumbJsonLd([{ name: 'Головна', path: '/' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header locale={locale} />
      <main>
        <Hero locale={locale} events={events} />
        <TickerFromCms locale={locale} />
        <About locale={locale} />
        <Directions locale={locale} />
        <HomeNewsFromCms items={news} locale={locale} />
        <HomeUpcomingEvents events={events} locale={locale} />
        <HomeJoinBanner locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Directions from '@/components/Directions';
import News from '@/components/News';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
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

export default function Home() {
  const breadcrumbs = breadcrumbJsonLd([{ name: 'Головна', path: '/' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Directions />
        <Events />
        <News />
      </main>
      <Footer />
    </>
  );
}

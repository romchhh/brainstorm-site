import type { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Directions from '@/components/Directions';
import News from '@/components/News';
import Events from '@/components/Events';
import Footer from '@/components/Footer';
import { SITE_URL, toCanonical } from '@/lib/seo';

const pageTitle = 'Brainstorm — молодіжна організація дебатів, екології та STEM в Україні';
const pageDescription =
  'Brainstorm — молодіжна громадська організація, що розвиває критичне мислення і лідерство через дебати, публічні виступи, екологічні ініціативи та науку з робототехнікою.';
const ogImage = '/icons/brainstorm-logo.svg';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'Brainstorm',
    'молодіжна організація',
    'громадська організація Україна',
    'дебати',
    'публічні виступи',
    'критичне мислення',
    'екологічні проєкти',
    'STEM',
    'робототехніка',
    'волонтерство',
    'молодіжні програми',
  ],
  alternates: {
    canonical: toCanonical('/'),
  },
  openGraph: {
    type: 'website',
    url: toCanonical('/'),
    siteName: 'Brainstorm',
    locale: 'uk_UA',
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Brainstorm — молодіжна організація в Україні',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
  category: 'education',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Brainstorm',
  url: SITE_URL,
  logo: `${SITE_URL}/icons/brainstorm-logo.svg`,
  description: pageDescription,
  areaServed: 'UA',
  sameAs: [],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brainstorm',
  url: SITE_URL,
  inLanguage: 'uk-UA',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
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

import type { Metadata } from 'next';
import '../styles/globals.css';
import { SITE_URL } from '@/lib/seo';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Brainstorm — Думаємо критично. Діємо разом.',
  description: 'Brainstorm розвиває молодь віком 16–25 років через дебати, публічні виступи, екологію, науку, робототехніку та громадські ініціативи.',
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
    apple: '/favicon.webp',
  },
  openGraph: {
    title: 'Brainstorm — Думаємо критично. Діємо разом.',
    description:
      'Brainstorm розвиває молодь віком 16–25 років через дебати, публічні виступи, екологію, науку, робототехніку та громадські ініціативи.',
    url: SITE_URL,
    type: 'website',
    images: [{ url: '/icons/brainstorm-logo.svg' }],
  },
  twitter: {
    card: 'summary',
    title: 'Brainstorm — Думаємо критично. Діємо разом.',
    description:
      'Brainstorm розвиває молодь віком 16–25 років через дебати, публічні виступи, екологію, науку, робототехніку та громадські ініціативи.',
    images: ['/icons/brainstorm-logo.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Календар подій — Brainstorm',
    description: 'Актуальні події Brainstorm: дебати, екологія, STEM. Перейдіть до календаря та реєстрації.',
    path: '/media',
    keywords: ['календар подій Brainstorm', 'анонси подій', 'реєстрація на події'],
  }),
  robots: { index: false, follow: true },
};

export default function EventsRedirectPage() {
  redirect('/media/');
}

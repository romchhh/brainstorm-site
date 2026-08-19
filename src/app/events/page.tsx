import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Events from '@/components/Events';
import { toCanonical } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Події — Brainstorm | Майстер-класи, турніри та зустрічі';
const pageDescription =
  'Актуальні події Brainstorm: майстер-класи, турніри, екскурсії та збори. Обирайте нові враження та пригоди.';

const pageUrl = toCanonical('/events');

const filters = ['ДЕБАТИ', 'ЕКОЛОГІЯ', 'НАУКА', 'ПУБЛІЧНІ ВИСТУПИ'] as const;

const previewCards = [
  { bg: '#F8CBE0' },
  { bg: '#B3D7FF' },
  { bg: '#BFF5D7' },
  { bg: '#A8D7F5' },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: true, follow: true },
  alternates: { canonical: pageUrl },
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero} data-reveal="up">
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              Не просто спостерігайте <span className={styles.heroAccent}>— долучайтеся.</span>
            </h1>

            <p className={styles.heroDesc}>
              Майстер-класи, турніри, екскурсії, збори. Обирайте нові враження та пригоди.
            </p>

            <div className={styles.actions}>
              <a href="#events-list" className={styles.btnPrimary} aria-label="Перейти до подій">
                Переглянути проєкти
                <span className={styles.btnArrowCircle} aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13L13 3M13 3H5M13 3V11"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <a href="/about" className={styles.btnOutline} aria-label="Підтримати Brainstorm">
                Підтримати
                <span className={styles.btnArrowCircleDark} aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 13L13 3M13 3H5M13 3V11"
                      stroke="#111"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <div className={styles.filtersStrip} data-reveal="fade">
          <div className={styles.filtersInner}>
            {filters.map((f) => (
              <div key={f} className={styles.filterItem}>
                <Image src="/icons/wave-pink.svg" alt="" width={24} height={12} aria-hidden />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <section className={styles.previewSection}>
          <div className={styles.container}>
            <h2 className={styles.previewTitle} data-reveal="up">
              Напрями, в яких ми діємо
            </h2>

            <div className={styles.previewGrid} data-reveal="up">
              {previewCards.map((card, idx) => (
                <div
                  key={idx}
                  className={styles.previewCard}
                  style={{ background: card.bg }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </section>

        <Events />
      </main>
      <Footer />
    </>
  );
}


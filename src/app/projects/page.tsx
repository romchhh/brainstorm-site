import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import { toCanonical } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Проєкти — Brainstorm | Майстер-класи, турніри та програми';
const pageDescription =
  'Проєкти Brainstorm: майстер-класи, турніри, екскурсії та збори. Обирайте нові враження та пригоди.';

const pageUrl = toCanonical('/projects');

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: true, follow: true },
  alternates: { canonical: pageUrl },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero} data-reveal="up">
          <div className={`${styles.container} ${styles.heroInner}`}>
            <h1 className={styles.heroTitle}>
              Не просто спостерігайте <span className={styles.heroAccent}>— долучайтеся.</span>
            </h1>

            <p className={styles.heroDesc}>
              Майстер-класи, турніри, екскурсії, збори. Обирайте нові враження та пригоди.
            </p>

            <div className={styles.actions}>
              <a href="#directions-block" className={styles.btnPrimary} aria-label="Перейти до проєктів">
                ПЕРЕГЛЯНУТИ ПРОЄКТИ
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
                ПІДТРИМАТИ
              </a>
            </div>
          </div>
        </section>

        <Ticker />

        <section className={styles.previewSection} id="directions-block">
          <div className={styles.container}>
            <h2 className={styles.previewTitle} data-reveal="up">
              Напрями, в яких ми діємо
            </h2>

            <div className={styles.previewGrid} data-reveal="up">
              <div className={`${styles.previewCard} ${styles.cardPink}`} aria-hidden />
              <div className={`${styles.previewCard} ${styles.cardGreen}`} aria-hidden />
              <div className={`${styles.previewCard} ${styles.cardBlue}`} aria-hidden />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


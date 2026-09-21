import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: {
    absolute: 'Сторінку не знайдено — Brainstorm',
  },
  description: 'Запитувана сторінка відсутня або була переміщена.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Сторінку не знайдено</h1>
          <p className={styles.text}>
            Можливо, вона перемістилась або ще не опублікована.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryBtn}>
              Повернутись на головну
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              Перейти до розділів сайту
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

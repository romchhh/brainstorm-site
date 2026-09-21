import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';
import styles from './privacy-policy.module.css';

const pageTitle = 'Політика конфіденційності — Brainstorm';
const pageDescription =
  'Як ГО «Brainstorm» збирає, зберігає та використовує персональні дані відвідувачів сайту.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/privacy-policy',
  keywords: ['політика конфіденційності', 'персональні дані', 'Brainstorm'],
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Політика конфіденційності', path: '/privacy-policy' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Політика конфіденційності</h1>
          <p className={styles.lead}>
            Ми поважаємо вашу приватність і пояснюємо, як ГО «Brainstorm» збирає та використовує персональні
            дані під час взаємодії із сайтом.
          </p>

          <section className={styles.section}>
            <h2 className={styles.h2}>1. Які дані ми можемо збирати</h2>
            <p>
              Дані, які ви надаєте добровільно (ім’я, контакти, інформація з форм), а також технічні дані
              (наприклад, IP-адреса, тип пристрою, інформація про перегляди сторінок).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>2. Навіщо ми їх використовуємо</h2>
            <p>
              Щоб обробляти ваші заявки та звернення, підтримувати зв’язок щодо програм/подій, покращувати роботу
              сайту та забезпечувати безпеку.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>3. З ким ми ділимося даними</h2>
            <p>
              Ми не продаємо персональні дані. За потреби можемо залучати технічних підрядників (хостинг/аналітика)
              для роботи сайту, діючи за нашими інструкціями.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>4. Ваші права</h2>
            <p>
              Ви можете запитувати доступ до своїх даних, їх уточнення чи видалення, а також звертатися зі скаргами
              до відповідного органу.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>5. Контакти</h2>
            <p>
              Якщо у вас є запитання щодо конфіденційності — пишіть на <a href="mailto:info@brainstorm.org.ua">info@brainstorm.org.ua</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

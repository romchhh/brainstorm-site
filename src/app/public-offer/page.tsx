import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildPageMetadata, breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';
import styles from './public-offer.module.css';

const pageTitle = 'Публічна оферта — Brainstorm';
const pageDescription =
  'Базові умови участі в програмах і заходах ГО «Brainstorm», а також принципи співпраці з організацією.';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/public-offer',
  keywords: ['публічна оферта', 'умови участі', 'Brainstorm'],
});

export default function PublicOfferPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Публічна оферта', path: '/public-offer' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Публічна оферта</h1>
          <p className={styles.lead}>
            Ця оферта визначає базові умови участі у програмах, заходах та співпраці з ГО «Brainstorm».
            Конкретні деталі можуть уточнюватися в описі відповідної програми на сайті.
          </p>

          <section className={styles.section}>
            <h2 className={styles.h2}>1. Хто ми</h2>
            <p>
              ГО «Brainstorm» організовує молодіжні програми та заходи, а також надає інформаційну підтримку
              у сфері дебатів, екології, науки та робототехніки.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>2. Як формується участь</h2>
            <p>
              Участь підтверджується через реєстрацію/заявку на сайті або іншим способом, передбаченим описом
              конкретного заходу/програми.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>3. Права та обов’язки</h2>
            <p>
              Організація залишає за собою право змінювати формат/дату/місце проведення заходу. Учасники
              зобов’язуються дотримуватися правил безпеки та поведінки, визначених для конкретної програми.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>4. Відповідальність</h2>
            <p>
              У межах чинного законодавства. У разі форс-мажорних обставин Організація не несе відповідальності
              за неможливість виконання умов.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>5. Контакти</h2>
            <p>
              Питання щодо оферти надсилайте на <a href="mailto:info@brainstorm.org.ua">info@brainstorm.org.ua</a>.
            </p>
          </section>

          <p className={styles.note}>
            Примітка: це короткий базовий текст для наповнення сторінки. Для юридичної точності його варто
            адаптувати під ваші реальні програми та умови.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

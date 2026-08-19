import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import { SITE_URL, toCanonical } from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Про нас — Brainstorm | Молодіжна спільнота дебатів, екології та STEM';
const pageDescription =
  'Дізнайтесь про місію Brainstorm, наші цінності, команду та програми для молоді: дебати, екологічні ініціативи, наука й робототехніка.';
const pageUrl = toCanonical('/about');
const ogImage = '/26d199e4c2adfb0b0885677156726a723c55e0b9.jpg';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'Про нас Brainstorm',
    'молодіжна організація Україна',
    'дебати для молоді',
    'екологічні ініціативи',
    'STEM та робототехніка',
    'молодіжна спільнота',
    'громадські проєкти',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: 'Brainstorm',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Команда та спільнота Brainstorm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
};

export default function AboutPage() {
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Про нас — Brainstorm',
    url: pageUrl,
    description: pageDescription,
    inLanguage: 'uk-UA',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Brainstorm',
      url: SITE_URL,
    },
    about: {
      '@type': 'NGO',
      name: 'Brainstorm',
      url: SITE_URL,
      areaServed: 'UA',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: toCanonical('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Про нас',
        item: pageUrl,
      },
    ],
  };

  const values = [
    {
      title: 'Спільнота',
      text: 'Люди завжди важливіші за процеси. Ми будуємо середовище, де кожен може знайти підтримку та друзів.',
      icon: '/about/values/icons/value-community.svg',
      tone: styles.cardYellow,
    },
    {
      title: 'Ініціативність',
      text: 'Бачите проблему? Почніть її вирішувати. Ми даємо молоді можливість діяти, не чекаючи дозволу чи бюджету.',
      icon: '/about/values/icons/value-initiative.svg',
      tone: styles.cardMint,
    },
    {
      title: 'Критичне мислення',
      text: 'Ставте під сумнів, перевіряйте докази. Дебати та аналіз є основою нашого підходу до світу.',
      icon: '/about/values/icons/value-critical.svg',
      tone: styles.cardPink,
    },
    {
      title: 'Інновації',
      text: 'Від лабораторії робототехніки до нових методів навчання, ми завжди експериментуємо з кращими способами створення впливу.',
      icon: '/about/values/icons/value-innovation.svg',
      tone: styles.cardBlue,
    },
  ] as const;
  const activities = [
    {
      idx: '01',
      title: 'Дебати та публічні виступи',
      text: 'Допомагаємо молоді впевнено висловлювати власні думки, аргументувати позицію та брати участь у суспільних дискусіях.',
      tone: styles.activityYellow,
    },
    {
      idx: '02',
      title: 'Екологічні ініціативи',
      text: 'Організовуємо екопроєкти, просвітницькі кампанії та заходи, що формують відповідальне ставлення до довкілля.',
      tone: styles.activityGreen,
    },
    {
      idx: '03',
      title: 'Наука та робототехніка',
      text: 'Популяризуємо STEM, сучасні технології та практичне навчання через воркшопи, лабораторії й освітні проєкти.',
      tone: styles.activityBlue,
    },
    {
      idx: '04',
      title: 'Молодіжна спільнота',
      text: 'Створюємо безпечний простір для знайомств, спільних ідей, волонтерства та розвитку.',
      tone: styles.activityPink,
    },
  ] as const;
  const teamCards = [
    { role: 'ПОСАДА', name: "Ім'я Прізвище", tone: styles.rolePink },
    { role: 'ПОСАДА', name: "Ім'я Прізвище", tone: styles.roleBlue },
    { role: 'ПОСАДА', name: "Ім'я Прізвище", tone: styles.roleGreen },
  ] as const;
  const reviews = [
    { tone: styles.reviewBlue, size: styles.reviewWide },
    { tone: styles.reviewPink, size: styles.reviewWide },
    { tone: styles.reviewPink, size: styles.reviewSmall },
    { tone: styles.reviewYellow, size: styles.reviewSmall },
    { tone: styles.reviewGreen, size: styles.reviewWide },
  ] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        <section className={styles.hero} data-reveal="fade">
          <div className={styles.container}>
            <Image
              src="/icons/sticker-critical.svg"
              alt=""
              width={121}
              height={104}
              className={styles.stickerCritical}
              aria-hidden
            />

            <Image
              src="/icons/wave-pink.svg"
              alt=""
              width={74}
              height={16}
              className={styles.waveLeft}
              aria-hidden
            />

            <div className={styles.bottomPhoto}>
              <Image
                src="/3b37fbb2cd5ee728c011eb3a632de4b1cca395c5.jpg"
                alt="Учасниця Brainstorm з повітряним змієм"
                fill
                className={styles.photo}
                sizes="(max-width: 900px) 80vw, 300px"
              />
            </div>

            <div className={styles.center}>
              <h1 className={styles.title}>
                Ми допомагаємо <em className={styles.pink}>молоді</em>
                <br />
                бути <em className={styles.blue}>лідерами</em>, творити
                <br />
                й розвиватися
              </h1>

              <p className={styles.desc}>
                Brainstorm — це молодіжна спільнота, що об&apos;єднує понад 2500 учасників з усієї України.
                Ми реалізуємо програми у сферах дебатів, екології та робототехніки, адже переконані:
                наступне покоління не повинно чекати на зміни.
              </p>

              <div className={styles.actions}>
                <a href="/#join" className={styles.btnPrimary}>
                  ПІДТРИМАТИ
                  <span className={styles.btnIcon}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a href="/#directions" className={styles.btnOutline}>
                  НАШІ НАПРЯМКИ
                </a>
              </div>
            </div>

            <div className={styles.topPhoto}>
              <Image
                src="/26d199e4c2adfb0b0885677156726a723c55e0b9.jpg"
                alt="Учасниця Brainstorm на полі"
                fill
                priority
                className={styles.photo}
                sizes="(max-width: 900px) 80vw, 340px"
              />
            </div>

            <Image
              src="/icons/sticker-argument.svg"
              alt=""
              width={123}
              height={93}
              className={styles.stickerArgument}
              aria-hidden
            />

            <Image
              src="/icons/wave-pink.svg"
              alt=""
              width={74}
              height={16}
              className={styles.waveRight}
              aria-hidden
            />
          </div>
        </section>
        <Ticker />

        <section className={styles.valuesSection} data-reveal="up">
          <div className={styles.valuesContainer}>
            <h2 className={styles.valuesTitle}>Наші цінності</h2>

            <div className={styles.valuesGrid}>
              <article className={`${styles.valueCard} ${values[0].tone}`}>
                <span className={styles.valueIconWrap}>
                  <Image src={values[0].icon} alt="" width={28} height={28} className={styles.valueIcon} aria-hidden />
                </span>
                <h3 className={styles.valueHeading}>{values[0].title}</h3>
                <p className={styles.valueText}>{values[0].text}</p>
              </article>

              <div className={`${styles.valuePhotoCard} ${styles.valuePhotoWide}`}>
                <Image
                  src="/about/values/photos/value-lab.jpg"
                  alt="Учасники експериментального заняття"
                  fill
                  className={styles.valuePhoto}
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              </div>

              <article className={`${styles.valueCard} ${values[1].tone}`}>
                <span className={styles.valueIconWrap}>
                  <Image src={values[1].icon} alt="" width={26} height={26} className={styles.valueIcon} aria-hidden />
                </span>
                <h3 className={styles.valueHeading}>{values[1].title}</h3>
                <p className={styles.valueText}>{values[1].text}</p>
              </article>

              <article className={`${styles.valueCard} ${values[2].tone}`}>
                <span className={styles.valueIconWrap}>
                  <Image src={values[2].icon} alt="" width={24} height={32} className={styles.valueIcon} aria-hidden />
                </span>
                <h3 className={styles.valueHeading}>{values[2].title}</h3>
                <p className={styles.valueText}>{values[2].text}</p>
              </article>

              <div className={styles.valuePhotoCard}>
                <Image
                  src="/about/values/photos/value-achievement.jpg"
                  alt="Учасник із сертифікатом"
                  fill
                  className={styles.valuePhoto}
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </div>

              <article className={`${styles.valueCard} ${values[3].tone}`}>
                <span className={styles.valueIconWrap}>
                  <Image src={values[3].icon} alt="" width={28} height={27} className={styles.valueIcon} aria-hidden />
                </span>
                <h3 className={styles.valueHeading}>{values[3].title}</h3>
                <p className={styles.valueText}>{values[3].text}</p>
              </article>

              <div className={styles.valuePhotoCard}>
                <Image
                  src="/about/values/photos/value-innovation.jpg"
                  alt="Кубки переможців"
                  fill
                  className={styles.valuePhoto}
                  sizes="(max-width: 900px) 100vw, 30vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.activitiesSection} data-reveal="up">
          <div className={styles.activitiesContainer}>
            <div className={styles.activitiesTop}>
              <h2 className={styles.activitiesTitle}>Чим ми займаємося</h2>
              <a href="/#join" className={styles.activitiesBtn}>
                ДОЛУЧИТИСЯ
                <span className={styles.activitiesBtnIcon}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

            <div className={styles.activitiesList}>
              {activities.map((item) => (
                <article key={item.idx} className={styles.activityRow}>
                  <span className={styles.activityIndex}>{item.idx}</span>
                  <div className={styles.activityContent}>
                    <h3 className={`${styles.activityHeading} ${item.tone}`}>
                      <span className={styles.activityDot} />
                      {item.title}
                    </h3>
                    <p className={styles.activityText}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.communitySection} data-reveal="right">
          <div className={styles.communityContainer}>
            <div className={styles.communityHead}>
              <h2 className={styles.communityTitle}>
                Знайомтесь зі <span className={styles.communityAccent}>спільнотою</span>
              </h2>
              <Image src="/icons/wave-pink.svg" alt="" width={74} height={16} className={styles.communityWave} aria-hidden />
              <Image src="/icons/sticker-never-argue.svg" alt="" width={183} height={84} className={styles.communitySticker} aria-hidden />
            </div>
            <p className={styles.communityDesc}>
              Не сторінка команди. Сторінка спільноти. Це люди, які з&apos;являються, створюють речі та роблять Brainstorm таким, яким він є.
            </p>

            <div className={styles.memberSlider}>
              <button className={styles.slideArrow} aria-label="Назад">←</button>
              <div className={styles.memberGrid}>
                {teamCards.map((card, i) => (
                  <article key={i} className={styles.memberCard}>
                    <div className={styles.memberMedia} />
                    <div className={styles.memberBody}>
                      <span className={`${styles.roleBadge} ${card.tone}`}>{card.role}</span>
                      <h3 className={styles.memberName}>{card.name}</h3>
                      <p className={styles.memberText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  </article>
                ))}
              </div>
              <button className={styles.slideArrow} aria-label="Далі">→</button>
            </div>
          </div>
        </section>

        <section className={styles.reviewsSection} data-reveal="up">
          <div className={styles.reviewsContainer}>
            <div className={styles.reviewsHead}>
              <h2 className={styles.reviewsTitle}>
                Відгуки людей, які <br />
                <span className={styles.reviewsAccent}>з нами давно</span>
              </h2>
              <Image src="/icons/sticker-argument.svg" alt="" width={123} height={93} className={styles.reviewsSticker} aria-hidden />
            </div>

            <div className={styles.reviewsGrid}>
              {reviews.map((review, i) => (
                <article key={i} className={`${styles.reviewCard} ${review.size}`}>
                  <p className={styles.reviewText}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>
                  <div className={styles.reviewAuthor}>
                    <span className={`${styles.reviewDot} ${review.tone}`} />
                    <div>
                      <div className={styles.reviewName}>Ім&apos;я, вік</div>
                      <div className={styles.reviewRole}>Програма</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.joinSection} data-reveal="scale">
          <div className={styles.joinCard}>
            <Image src="/icons/wave-pink.svg" alt="" width={74} height={16} className={styles.joinWaveLeft} aria-hidden />
            <Image src="/icons/wave-pink.svg" alt="" width={74} height={16} className={styles.joinWaveRight} aria-hidden />
            <h2 className={styles.joinTitle}>
              Приєднуйся до <br />
              <span>Brainstorm</span>
            </h2>
            <p className={styles.joinText}>
              Найкращі проєкти починаються з однієї людини, яка вирішила діяти. Якщо це хочеш навчатися, знайти однодумців, створювати корисні проєкти або просто бути частиною активної молодіжної спільноти — ми будемо раді познайомитися.
            </p>
            <a href="/#join" className={styles.joinBtn}>
              Стати частиною спільноти
              <span className={styles.joinBtnIcon}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

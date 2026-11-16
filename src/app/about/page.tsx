import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerFromCms from '@/components/TickerFromCms';
import AboutFeaturedProjects from '@/components/AboutFeaturedProjects';
import DecorMark from '@/components/DecorMark';
import CtaPanel from '@/components/CtaPanel';
import { cmsFeaturedProjects, cmsReviews, cmsSettings, cmsTeam } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import {
  SITE_URL,
  toCanonical,
  buildPageMetadata,
  breadcrumbJsonLd,
  jsonLdScript,
} from '@/lib/seo';
import styles from './page.module.css';

const pageTitle = 'Про нас — Brainstorm | Місія, цінності та команда';
const pageDescription =
  'Дізнайтесь про місію Brainstorm, наші цінності, команду та програми для молоді: дебати, екологічні ініціативи, наука й робототехніка.';
const pageUrl = toCanonical('/about');
const ogImage = '/26d199e4c2adfb0b0885677156726a723c55e0b9.jpg';

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/about',
  image: ogImage,
  imageAlt: 'Команда та спільнота Brainstorm',
  keywords: [
    'Про нас Brainstorm',
    'місія молодіжної організації',
    'цінності ГО',
    'команда Brainstorm',
    'дебати для молоді',
    'екологічні ініціативи',
    'STEM та робототехніка',
  ],
});

export const revalidate = 300;

export default async function AboutPage() {
  const locale = await getServerLocale();
  const settings = cmsSettings(locale);
  const m = getMessages(locale);
  const featured = cmsFeaturedProjects(locale, 6);
  const donateUrl = settings.donateUrl?.trim() || '';

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    inLanguage: 'uk-UA',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Про нас', path: '/about' },
  ]);

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

  const teamMembers = cmsTeam(locale);
  const reviewItems = cmsReviews(locale);

  const teamToneMap = {
    pink: styles.rolePink,
    blue: styles.roleBlue,
    green: styles.roleGreen,
    yellow: styles.rolePink,
  } as const;

  const reviewToneMap = {
    blue: styles.reviewBlue,
    pink: styles.reviewPink,
    yellow: styles.reviewYellow,
    green: styles.reviewGreen,
  } as const;

  const reviewSizeMap = {
    wide: styles.reviewWide,
    small: styles.reviewSmall,
  } as const;

  const teamCards = teamMembers.map((member) => ({
    role: member.role,
    name: member.name,
    text: member.text,
    linkedin: member.linkedin,
    photo: member.photo,
    tone: teamToneMap[member.tone] ?? styles.rolePink,
  }));

  const reviews = reviewItems.map((review) => ({
    tone: reviewToneMap[review.tone] ?? styles.reviewBlue,
    size: reviewSizeMap[review.size] ?? styles.reviewWide,
    text: review.text,
    author: review.author,
  }));

  const contactsWrite = `${localizedPath('/contacts', locale)}#write`;
  const transparencyHref = localizedPath('/transparency', locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(aboutPageJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
      <Header locale={locale} donateUrl={donateUrl} />
      <main>
        <section className={styles.hero} data-reveal="fade">
          <div className={styles.container}>
            <DecorMark tone="yellow" variant="arc" className={styles.stickerCritical} width={72} height={40} />
            <DecorMark tone="pink" className={styles.waveLeft} width={74} height={16} />

            <div className={styles.bottomPhoto}>
              <Image
                src="/3b37fbb2cd5ee728c011eb3a632de4b1cca395c5.jpg"
                alt="Учасниця Brainstorm з повітряним змієм"
                fill
                className={styles.photo}
                sizes="(max-width: 900px) 80vw, 300px"
              />
            </div>

            <div className={styles.centerColumn}>
              <div className={styles.center}>
                <h1 className={styles.title}>
                  <span className={styles.titleLine}>
                    Ми допомагаємо <em className={styles.pink}>молоді</em>
                  </span>
                  <span className={styles.titleLine}>
                    бути <em className={styles.blue}>лідерами</em>, творити й розвиватися
                  </span>
                </h1>

                <p className={styles.desc}>
                  Brainstorm — це молодіжна спільнота, що об&apos;єднує понад 2500 учасників з усієї України.
                  Ми реалізуємо програми у сферах дебатів, екології та робототехніки, адже переконані:
                  наступне покоління не повинно чекати на зміни.
                </p>

                <p className={styles.mission}>
                  <span className={styles.missionLabel}>{m.aboutPage.missionLabel}</span>
                  {locale === 'en'
                    ? 'Empower young people to think critically and act together for their communities.'
                    : 'Давати молоді силу критично мислити і діяти разом заради своїх спільнот.'}
                </p>
              </div>

              <div className={styles.actions}>
                <a href={contactsWrite} className="ui-btn ui-btn--primary">
                  {m.cta.collaborate}
                  <span className="ui-btn__arrow" aria-hidden>
                    →
                  </span>
                </a>
                <a href={transparencyHref} className="ui-btn ui-btn--outline">
                  {m.cta.transparency}
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

            <DecorMark tone="blue" className={styles.stickerArgument} width={88} height={20} />
            <DecorMark tone="pink" className={styles.waveRight} width={74} height={16} />
          </div>
        </section>

        <AboutFeaturedProjects projects={featured} locale={locale} />
        <TickerFromCms locale={locale} />

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

        <section className={styles.communitySection} id="community" data-reveal="right">
          <div className={styles.communityContainer}>
            <div className={styles.communityHead}>
              <h2 className={styles.communityTitle}>
                Наша <span className={styles.communityAccent}>команда</span>
              </h2>
              <DecorMark tone="pink" className={styles.communityWave} width={74} height={16} />
              <DecorMark tone="yellow" variant="arc" className={styles.communitySticker} width={88} height={48} />
            </div>
            <p className={styles.communityDesc}>
              Люди, які запускають програми, менторять учасників і тримають спільноту живою. Фото однакові за форматом — їх легко оновлювати після підключення CMS.
            </p>

            <div className={styles.memberSlider}>
              <button className={styles.slideArrow} aria-label="Назад">
                ←
              </button>
              <div className={styles.memberGrid}>
                {teamCards.map((card) => (
                  <article key={card.name} className={styles.memberCard}>
                    <div className={`${styles.memberMedia} ui-card-photo`}>
                      {card.photo ? (
                        <Image src={card.photo} alt={card.name} fill className={styles.memberPhoto} sizes="280px" />
                      ) : null}
                    </div>
                    <div className={styles.memberBody}>
                      <span className={`${styles.roleBadge} ${card.tone}`}>{card.role}</span>
                      <h3 className={styles.memberName}>{card.name}</h3>
                      <p className={styles.memberText}>{card.text}</p>
                      <a href={card.linkedin} target="_blank" rel="noreferrer" className={styles.memberLink}>
                        LinkedIn
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <button className={styles.slideArrow} aria-label="Далі">
                →
              </button>
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
              <DecorMark tone="blue" className={styles.reviewsSticker} width={88} height={20} />
            </div>

            <div className={styles.reviewsGrid}>
              {reviews.map((review, i) => (
                <article key={i} className={`${styles.reviewCard} ${review.size}`}>
                  <p className={styles.reviewText}>{review.text}</p>
                  <div className={styles.reviewAuthor}>
                    <span className={`${styles.reviewDot} ${review.tone}`} />
                    <div>
                      <div className={styles.reviewName}>{review.author}</div>
                      <div className={styles.reviewRole}>Спільнота Brainstorm</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaPanel
          id="join"
          title={
            locale === 'en' ? (
              <>
                Join <span>Brainstorm</span>
              </>
            ) : (
              <>
                Приєднуйся до <br />
                <span>Brainstorm</span>
              </>
            )
          }
          text={
            locale === 'en'
              ? 'The best projects start with one person who decided to act. Write to us — or support the programs that keep the community going.'
              : 'Найкращі проєкти починаються з однієї людини, яка вирішила діяти. Напишіть нам — або підтримайте програми, що тримають спільноту живою.'
          }
          href={contactsWrite}
          ctaLabel={locale === 'en' ? 'Write to us' : 'Написати нам'}
          secondary={
            donateUrl
              ? { href: donateUrl, label: m.cta.support, external: true, outline: true }
              : { href: localizedPath('/contacts', locale), label: m.cta.support, outline: true }
          }
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}

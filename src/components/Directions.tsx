import Image from 'next/image';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { CtaArrow } from '@/components/CtaPanel';
import ImpactStats from '@/components/ImpactStats';
import { cmsSettings } from '@/lib/cms/content';
import styles from './Directions.module.css';

const directionsUk = [
  {
    color: '#F5C842',
    emoji: '💬',
    title: 'Дебати та публічні виступи',
    desc: 'Дебатні клуби, семінари з аргументації та турніри з публічних виступів, які дають молодим людям можливість голосу та впевненість у його використанні.',
    decor: 'debates' as const,
  },
  {
    color: '#7DC86E',
    emoji: '🌱',
    title: 'Екологія та довкілля',
    desc: 'Прибирання річок, моніторинг біорізноманіття та просвітницька діяльність у сфері сталого розвитку. Справжня польова робота, що поєднує молодь із природою та наукою.',
    decor: 'wave' as const,
  },
  {
    color: '#6BB8D4',
    emoji: '🤖',
    title: 'Наука та робототехніка',
    desc: 'Практичні STEM-майстерні, змагання з робототехніки та мейкер-лабораторії, де допитливість перетворюється на інженерні навички.',
    decor: 'argue' as const,
  },
];

const directionsEn = [
  {
    color: '#F5C842',
    emoji: '💬',
    title: 'Debates & public speaking',
    desc: 'Debate clubs, argumentation workshops, and public-speaking tournaments that give young people a voice and confidence to use it.',
    decor: 'debates' as const,
  },
  {
    color: '#7DC86E',
    emoji: '🌱',
    title: 'Ecology & environment',
    desc: 'River clean-ups, biodiversity monitoring, and sustainability education — hands-on field work connecting youth with nature and science.',
    decor: 'wave' as const,
  },
  {
    color: '#6BB8D4',
    emoji: '🤖',
    title: 'Science & robotics',
    desc: 'STEM workshops, robotics competitions, and maker labs where curiosity turns into engineering skills.',
    decor: 'argue' as const,
  },
];

function CardDecor({ type }: { type: 'debates' | 'wave' | 'argue' }) {
  if (type === 'debates') {
    return (
      <Image
        src="/icons/sticker-critical.svg"
        alt=""
        width={121}
        height={104}
        className={styles.decorDebates}
        aria-hidden
      />
    );
  }

  if (type === 'wave') {
    return (
      <Image
        src="/icons/wave-pink.svg"
        alt=""
        width={72}
        height={16}
        className={styles.decorWave}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src="/icons/sticker-debates.svg"
      alt=""
      width={117}
      height={116}
      className={styles.decorArgue}
      aria-hidden
    />
  );
}

export default function Directions({ locale = 'uk' }: { locale?: Locale }) {
  const m = getMessages(locale);
  const settings = cmsSettings(locale);
  const directions = locale === 'en' ? directionsEn : directionsUk;

  return (
    <section className={styles.section} id="directions" data-reveal="up">
      <div className={styles.container}>
        <h2 className={styles.title}>
          {m.directions.title} <em className={styles.accent}>{m.directions.accent}</em>
        </h2>

        <div className={styles.cards} data-reveal="up">
          {directions.map((direction) => (
            <div key={direction.title} className={styles.cardWrap} data-reveal="up">
              <CardDecor type={direction.decor} />
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEmoji} aria-hidden>
                    {direction.emoji}
                  </span>
                  <div className={styles.dot} style={{ background: direction.color }} />
                </div>
                <h3 className={styles.cardTitle}>{direction.title}</h3>
                <p className={styles.cardDesc}>{direction.desc}</p>
                <a href={localizedPath('/projects', locale)} className="ui-btn ui-btn--primary">
                  {m.directions.viewProjects}
                  <CtaArrow />
                </a>
              </article>
            </div>
          ))}
        </div>

        <ImpactStats
          settings={settings}
          locale={locale}
          variant="embedded"
          bannerHeadline={m.directions.statsHeadline}
        />
      </div>
    </section>
  );
}

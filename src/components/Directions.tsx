import Image from 'next/image';
import styles from './Directions.module.css';

const directions = [
  {
    color: '#F5C842',
    title: 'Дебати та публічні виступи',
    desc: 'Дебатні клуби, семінари з аргументації та турніри з публічних виступів, які дають молодим людям можливість голосу та впевненість у його використанні.',
    decor: 'debates' as const,
  },
  {
    color: '#7DC86E',
    title: 'Екологія та довкілля',
    desc: 'Прибирання річок, моніторинг біорізноманіття та просвітницька діяльність у сфері сталого розвитку. Справжня польова робота, що поєднує молодь із природою та наукою.',
    decor: 'wave' as const,
  },
  {
    color: '#6BB8D4',
    title: 'Наука та робототехніка',
    desc: 'Практичні STEM-майстерні, змагання з робототехніки та мейкер-лабораторії, де допитливість перетворюється на інженерні навички.',
    decor: 'argue' as const,
  },
];

const stats = [
  { value: '12 400', label: 'Молодих людей у наших програмах' },
  { value: '860', label: 'Волонтерів та менторів' },
  { value: '240', label: 'Реалізованих громадських проєктів' },
  { value: '38', label: 'Міст на мапі' },
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

export default function Directions() {
  return (
    <section className={styles.section} id="directions" data-reveal="up">
      <div className={styles.container}>
        <h2 className={styles.title}>
          3 напрямки, <em className={styles.accent}>1 місія</em>
        </h2>

        <div className={styles.cards} data-reveal="up">
          {directions.map((direction) => (
            <div key={direction.title} className={styles.cardWrap} data-reveal="up">
              <CardDecor type={direction.decor} />
              <article className={styles.card}>
                <div className={styles.dot} style={{ background: direction.color }} />
                <h3 className={styles.cardTitle}>{direction.title}</h3>
                <p className={styles.cardDesc}>{direction.desc}</p>
                <a href="#projects" className={styles.cardLink}>
                  Переглянути проєкти
                  <span className={styles.linkIcon}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </article>
            </div>
          ))}
        </div>

        <div className={styles.statsBanner} data-reveal="fade">
          <Image
            src="/icons/wave-pink.svg"
            alt=""
            width={88}
            height={20}
            className={styles.statsWaveLeft}
            aria-hidden
          />
          <Image
            src="/icons/wave-pink.svg"
            alt=""
            width={88}
            height={20}
            className={styles.statsWaveRight}
            aria-hidden
          />

          <div className={styles.statsInner}>
            <h3 className={styles.statsHeading}>
              Маленькі ідеї, масштабовані дуже гучною спільнотою.
            </h3>

            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

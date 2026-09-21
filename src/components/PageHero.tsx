import Image from 'next/image';
import styles from './PageHero.module.css';

type Accent = 'pink' | 'yellow' | 'blue' | 'green';

type Cta = {
  href: string;
  label: string;
  withArrow?: boolean;
};

type Props = {
  title: React.ReactNode;
  description: string;
  primary: Cta;
  secondary?: Cta;
  leftImage: string;
  leftAlt: string;
  rightImage: string;
  rightAlt: string;
  accent?: Accent;
};

export default function PageHero({
  title,
  description,
  primary,
  secondary,
  leftImage,
  leftAlt,
  rightImage,
  rightAlt,
  accent = 'pink',
}: Props) {
  return (
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
            src={leftImage}
            alt={leftAlt}
            fill
            className={styles.photo}
            sizes="(max-width: 900px) 80vw, 300px"
          />
        </div>

        <div className={styles.center}>
          <h1 className={styles.title}>{title}</h1>

          <p className={styles.desc}>{description}</p>

          <div className={styles.actions}>
            <a href={primary.href} className="ui-btn ui-btn--primary">
              {primary.label}
              {primary.withArrow !== false ? (
                <span className="ui-btn__icon">
                  <ArrowIcon />
                </span>
              ) : null}
            </a>
            {secondary ? (
              <a href={secondary.href} className="ui-btn ui-btn--outline">
                {secondary.label}
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.topPhoto}>
          <Image
            src={rightImage}
            alt={rightAlt}
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

        <span className={`${styles.accentBlob} ${styles[accent]}`} aria-hidden />
      </div>
    </section>
  );
}

export function HeroMark({ children, tone = 'pink' }: { children: React.ReactNode; tone?: Accent }) {
  return <em className={`${styles.mark} ${styles[`mark_${tone}`]}`}>{children}</em>;
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 13L13 3M13 3H5M13 3V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

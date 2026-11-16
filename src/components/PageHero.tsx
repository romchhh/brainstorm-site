import Image from 'next/image';
import { CtaArrow } from '@/components/CtaArrow';
import DecorMark from '@/components/DecorMark';
import styles from './PageHero.module.css';

type Accent = 'pink' | 'yellow' | 'blue' | 'green';

type Cta = {
  href: string;
  label: string;
  withArrow?: boolean;
  external?: boolean;
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
        <DecorMark tone="yellow" variant="arc" className={styles.stickerCritical} width={72} height={40} />
        <DecorMark tone="pink" className={styles.waveLeft} width={74} height={16} />

        <div className={styles.bottomPhoto}>
          <Image
            src={leftImage}
            alt={leftAlt}
            fill
            className={styles.photo}
            sizes="(max-width: 900px) 80vw, 300px"
          />
        </div>

        <div className={styles.centerColumn}>
          <div className={styles.center}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.desc}>{description}</p>
          </div>

          <div className={styles.actions}>
            <a
              href={primary.href}
              className="ui-btn ui-btn--primary"
              {...(primary.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {primary.label}
              {primary.withArrow !== false ? <CtaArrow /> : null}
            </a>
            {secondary ? (
              <a
                href={secondary.href}
                className="ui-btn ui-btn--outline"
                {...(secondary.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
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

        <DecorMark tone="blue" className={styles.stickerArgument} width={88} height={20} />
        <DecorMark tone="pink" className={styles.waveRight} width={74} height={16} />

        <span className={`${styles.accentBlob} ${styles[accent]}`} aria-hidden />
      </div>
    </section>
  );
}

export function HeroMark({ children, tone = 'pink' }: { children: React.ReactNode; tone?: Accent }) {
  return <em className={`${styles.mark} ${styles[`mark_${tone}`]}`}>{children}</em>;
}

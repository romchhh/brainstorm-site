import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { CtaArrow } from '@/components/CtaArrow';
import DecorMark from '@/components/DecorMark';
import styles from './Hero.module.css';

const collage = [
  { src: '/about-outdoor.jpg', alt: 'Молодіжна активність на вулиці', className: styles.photo0 },
  { src: '/about-desk.jpg', alt: 'Учасниці за робочим столом', className: styles.photo2 },
  { src: '/about-photos.jpg', alt: 'Виставка фотографій', className: styles.photo1 },
  { src: '/about-lecture.jpg', alt: 'Лекція в аудиторії', className: styles.photo3 },
] as const;

type Props = {
  locale?: Locale;
  donateUrl?: string;
};

function PhotoCard({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${styles.photo} ${className}`} data-reveal="scale">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 45vw, 320px"
        className={styles.photoImg}
        priority={className === styles.photo0 || className === styles.photo1}
      />
    </div>
  );
}

export default function Hero({ locale = 'uk', donateUrl }: Props) {
  const m = getMessages(locale);
  const supportHref = donateUrl?.trim() || localizedPath('/contacts', locale);

  return (
    <section className={styles.hero} data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.left} data-reveal="left" style={{ '--reveal-delay': '40ms' } as CSSProperties}>
          <DecorMark tone="pink" className={styles.waveTop} width={100} height={23} />
          <h1 className={styles.headline}>
            <span className={styles.line1}>{m.hero.line1}</span>
            <span className={styles.line2}>
              {m.hero.line2}
              <span className={styles.underlineYellow} />
            </span>
            <span className={styles.line3}>
              {m.hero.line3Prefix} <em className={styles.together}>{m.hero.line3Em}</em>
            </span>
          </h1>

          <DecorMark tone="yellow" variant="arc" className={styles.curveAccent} width={72} height={40} />

          <p className={styles.desc}>
            {m.hero.desc}
            <br />
            {m.hero.tagline}
          </p>

          <DecorMark tone="blue" className={styles.waveAccent} width={88} height={20} />
        </div>

        <div className={styles.actions} data-reveal="up" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
          <a
            href={supportHref}
            className="ui-btn ui-btn--primary"
            {...(donateUrl?.trim()
              ? { target: '_blank', rel: 'noreferrer' }
              : {})}
          >
            {m.cta.support}
            <CtaArrow />
          </a>
          <a href="#directions" className="ui-btn ui-btn--outline">
            {m.hero.directions}
          </a>
        </div>

        <div className={styles.right} data-reveal="right" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
          <div className={styles.collage}>
            <div className={styles.col}>
              <PhotoCard {...collage[0]} />
              <PhotoCard {...collage[1]} />
            </div>
            <div className={styles.col}>
              <PhotoCard {...collage[2]} />
              <PhotoCard {...collage[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

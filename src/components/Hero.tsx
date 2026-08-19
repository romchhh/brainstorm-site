'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const slides = [
  { label: 'Фестиваль повітряних зміїв' },
  { label: 'Дебатний турнір 2024' },
  { label: 'Екологічна акція' },
  { label: 'STEM майстерня' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className={styles.hero} data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.left} data-reveal="left" style={{ '--reveal-delay': '40ms' } as React.CSSProperties}>
          <Image
            src="/icons/wave-pink.svg"
            alt=""
            width={100}
            height={23}
            className={styles.waveTop}
            aria-hidden
          />
          <h1 className={styles.headline}>
            <span className={styles.line1}>Думаємо</span>
            <span className={styles.line2}>
              критично
              <span className={styles.underlineYellow} />
            </span>
            <span className={styles.line3}>
              Діємо <em className={styles.together}>разом</em>
            </span>
          </h1>

          <Image
            src="/icons/sticker-critical.svg"
            alt=""
            width={121}
            height={104}
            className={styles.stickerCritical}
            aria-hidden
          />

          <p className={styles.desc}>
            Brainstorm розвиває молодь віком 16–25 років через дебати,
            публічні виступи, екологію, науку, робототехніку та громадські
            ініціативи.
            <br />
            Цікавість на вході — зміни на виході.
          </p>

          <Image
            src="/icons/sticker-argument.svg"
            alt=""
            width={123}
            height={93}
            className={styles.stickerArgument}
            aria-hidden
          />
        </div>

        <div className={styles.actions} data-reveal="up" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <a href="#join" className={styles.btnPrimary}>
            ДОЛУЧИТИСЯ
            <span className={styles.btnArrowCircle}>
              <ArrowIcon />
            </span>
          </a>
          <a href="#directions" className={styles.btnOutline}>НАШІ НАПРЯМКИ</a>
        </div>

        <div className={styles.right} data-reveal="right" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <div className={styles.slider}>
            <div className={styles.slideImg}>
              <Image
                src="/hero-kite.jpg"
                alt="Фестиваль повітряних зміїв"
                fill
                priority
                className={styles.slidePhoto}
              />
              <div className={styles.slideCaption}>{slides[current].label}</div>
              <Image
                src="/icons/wave-pink.svg"
                alt=""
                width={100}
                height={23}
                className={styles.waveBottom}
                aria-hidden
              />
            </div>

            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Назад">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Далі">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className={styles.dots}>
              {slides.map((_, i) => (
                <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => setCurrent(i)} aria-label={`Слайд ${i+1}`}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

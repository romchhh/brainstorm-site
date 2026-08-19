import Image from 'next/image';
import styles from './About.module.css';

const leftPhotos = [
  { src: '/about-outdoor.jpg', alt: 'Молодіжна активність на вулиці', className: styles.photo0 },
  { src: '/about-desk.jpg', alt: 'Учасниці за робочим столом', className: styles.photo2 },
];

const rightPhotos = [
  { src: '/about-photos.jpg', alt: 'Виставка фотографій', className: styles.photo1 },
  { src: '/about-lecture.jpg', alt: 'Лекція в аудиторії', className: styles.photo3 },
];

function PhotoCard({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${styles.photo} ${className}`} data-reveal="scale">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 45vw, 320px"
        className={styles.photoImg}
      />
    </div>
  );
}

export default function About() {
  return (
    <section className={styles.about} id="about" data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.content} data-reveal="up">
          <Image
            src="/icons/wave-pink.svg"
            alt=""
            width={100}
            height={23}
            className={styles.wave}
            aria-hidden
          />
          <h2 className={styles.heading}>
            Простір для <em className={styles.accent}>молодих розумів,</em> які не
            звикли сидіти на місці.
          </h2>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              Ми — команда, яка вірить, що молодь здатна змінювати світ уже зараз.
              Наші програми поєднують критичне мислення, командну роботу та реальну
              дію.
            </p>
            <p className={styles.text}>
              Від дебатів до робототехніки, від прибирання берегів до публічних
              виступів — кожен знайде своє місце у Brainstorm.
            </p>
          </div>
          <a href="/about" className={styles.btnDesktop}>
            ЧИТАТИ БІЛЬШЕ
            <span className={styles.btnIcon}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        <div className={styles.grid} data-reveal="scale">
          <div className={styles.col}>
            {leftPhotos.map((photo) => (
              <PhotoCard key={photo.src} {...photo} />
            ))}
          </div>
          <div className={styles.col}>
            {rightPhotos.map((photo) => (
              <PhotoCard key={photo.src} {...photo} />
            ))}
          </div>
        </div>

        <a href="/about" className={styles.btnMobile}>
          ЧИТАТИ БІЛЬШЕ
          <span className={styles.btnIcon}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}

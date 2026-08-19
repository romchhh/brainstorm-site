import Image from 'next/image';
import styles from './Events.module.css';

const events = [
  {
    title: 'Назва події',
    desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    desc2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/about-desk.jpg',
    imageAlt: 'Подія Brainstorm у приміщенні',
    variant: 'wide',
  },
  {
    title: 'Назва події',
    desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    desc2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/about-outdoor.jpg',
    imageAlt: 'Учасники події Brainstorm',
    variant: 'tall',
  },
  {
    title: 'Назва події',
    desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    desc2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/about-photos.jpg',
    imageAlt: 'Дитячий майстер-клас',
    variant: 'small',
  },
  {
    title: 'Назва події',
    desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    desc2: '',
    image: '/about-lecture.jpg',
    imageAlt: 'Учасник з кубком',
    variant: 'wideBottom',
  },
] as const;

export default function Events() {
  return (
    <section className={styles.section} id="events-list" data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.titleWrap} data-reveal="up">
          <h2 className={styles.title}>Свіже зі спільноти</h2>
          <Image
            src="/icons/sticker-argument.svg"
            alt=""
            width={123}
            height={93}
            className={styles.titleSticker}
            aria-hidden
          />
        </div>

        <div className={styles.grid} data-reveal="up">
          {events.map((event, i) => (
            <article key={i} className={`${styles.card} ${styles[event.variant]}`} data-reveal="up">
              <div className={styles.media}>
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.photo}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.headingRow}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <a href="#events-list" className={styles.eventLink} aria-label="Переглянути подію">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className={styles.eventText}>{event.desc1}</p>
                {event.desc2 ? <p className={styles.eventText}>{event.desc2}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

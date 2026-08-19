import Image from 'next/image';
import styles from './News.module.css';

const events = [
  {
    color: '#F5C842',
    category: 'Дебати',
    title: 'Національний фінал дебатів',
    place: 'Київ, Україна',
    date: '22.09.2026',
  },
  {
    color: '#7DC86E',
    category: 'Екологія',
    title: 'Екодесант: прибирання річки',
    place: 'Черкаси, Україна',
    date: '02.10.2026',
  },
  {
    color: '#6BB8D4',
    category: 'Наука та робототехніка',
    title: 'STEM-майстерня та Demo Day',
    place: 'Львів, Україна',
    date: '14.10.2026',
  },
  {
    color: '#F5C842',
    category: 'Дебати',
    title: 'Відкритий турнір з публічних виступів',
    place: 'Онлайн + Київ',
    date: '25.10.2026',
  },
];

export default function News() {
  return (
    <section className={styles.section} id="upcoming-events" data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.titleRow} data-reveal="up">
          <h2 className={styles.title}>
            Де ви зустрінете <em className={styles.accent}>нас</em> наступного разу.
          </h2>
          <Image
            src="/icons/sticker-critical.svg"
            alt=""
            width={121}
            height={104}
            className={styles.titleSticker}
            aria-hidden
          />
        </div>

        <div className={styles.list} data-reveal="up">
          {events.map((event) => (
            <article key={event.title} className={styles.row} data-reveal="up">
              <div className={styles.left}>
                <span className={styles.dot} style={{ background: event.color }} />
                <div className={styles.meta}>
                  <span className={styles.category}>{event.category}</span>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                </div>
              </div>

              <div className={styles.right}>
                <span className={styles.place}>{event.place}</span>
                <span className={styles.date}>{event.date}</span>
                <a href="#register" className={styles.btn}>
                  Реєстрація
                  <span className={styles.iconWrap}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

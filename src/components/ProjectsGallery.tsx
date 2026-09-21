import Image from 'next/image';
import styles from './ProjectsGallery.module.css';

const albums = [
  {
    title: 'Фестиваль повітряних зміїв',
    date: '12.06.2026',
    image: '/hero-kite.jpg',
  },
  {
    title: 'Дебатний турнір',
    date: '22.09.2025',
    image: '/about-lecture.jpg',
  },
  {
    title: 'Екодесант',
    date: '02.10.2025',
    image: '/about-outdoor.jpg',
  },
  {
    title: 'STEM-майстерня',
    date: '14.08.2026',
    image: '/about-desk.jpg',
  },
  {
    title: 'Спільнота Brainstorm',
    date: '18.05.2026',
    image: '/about-photos.jpg',
  },
  {
    title: 'Demo Day',
    date: '30.08.2026',
    image: '/about/values/photos/value-lab.jpg',
  },
];

export default function ProjectsGallery() {
  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>
        <h2 className={styles.title}>Події у фото</h2>
        <p className={styles.lead}>
          Альбоми з підписами «назва події + дата». Пошук і повноцінна альбомна структура — після підключення CMS.
        </p>

        <div className={styles.grid}>
          {albums.map((album) => (
            <figure key={`${album.title}-${album.date}`} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={album.image}
                  alt={`${album.title}, ${album.date}`}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.captionTitle}>{album.title}</span>
                <time className={styles.captionDate}>{album.date}</time>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

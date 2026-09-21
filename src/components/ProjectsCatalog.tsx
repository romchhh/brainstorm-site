'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './ProjectsCatalog.module.css';

type Status = 'all' | 'current' | 'done';
type Theme = 'all' | 'ecology' | 'stem' | 'debates';

type Project = {
  id: string;
  title: string;
  desc: string;
  period: string;
  partners: string;
  status: Exclude<Status, 'all'>;
  theme: Exclude<Theme, 'all'>;
  image: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Дебатний клуб «Голос»',
    desc: 'Регулярні тренування з аргументації та публічних виступів для молоді 16–25.',
    period: '2024 — дотепер',
    partners: 'Місцеві освітні партнери',
    status: 'current',
    theme: 'debates',
    image: '/about-lecture.jpg',
  },
  {
    id: '2',
    title: 'Екомоніторинг водойм',
    desc: 'Польові дослідження, заміри якості води та просвітницькі акції з громадами.',
    period: '2025 — дотепер',
    partners: 'Екологічні ініціативи регіону',
    status: 'current',
    theme: 'ecology',
    image: '/about-outdoor.jpg',
  },
  {
    id: '3',
    title: 'STEM Demo Day',
    desc: 'Відкрита виставка учнівських інженерних рішень і робототехнічних проєктів.',
    period: 'Серпень 2026',
    partners: 'Школи та STEM-хаби',
    status: 'done',
    theme: 'stem',
    image: '/about-desk.jpg',
  },
  {
    id: '4',
    title: 'Турнір публічних виступів',
    desc: 'Відкритий турнір з публічних виступів для новачків і досвідчених спікерів.',
    period: 'Жовтень 2025',
    partners: 'Молодіжні центри',
    status: 'done',
    theme: 'debates',
    image: '/about-photos.jpg',
  },
  {
    id: '5',
    title: 'Прибирання берегів',
    desc: 'Серія волонтерських акцій із сортуванням відходів і фіксацією результатів.',
    period: '2024 — 2025',
    partners: 'Громадські організації',
    status: 'done',
    theme: 'ecology',
    image: '/hero-kite.jpg',
  },
  {
    id: '6',
    title: 'Мейкер-лабораторія',
    desc: 'Практичні STEM-майстерні, де допитливість перетворюється на інженерні навички.',
    period: '2026 — дотепер',
    partners: 'Партнери з освіти',
    status: 'current',
    theme: 'stem',
    image: '/about/values/photos/value-lab.jpg',
  },
];

const statusFilters: { id: Status; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'current', label: 'Поточні' },
  { id: 'done', label: 'Реалізовані' },
];

const themeFilters: { id: Theme; label: string }[] = [
  { id: 'all', label: 'Усі теми' },
  { id: 'debates', label: 'Дебати' },
  { id: 'ecology', label: 'Екологія' },
  { id: 'stem', label: 'Наука і робототехніка' },
];

const themeLabel: Record<Exclude<Theme, 'all'>, string> = {
  debates: 'Дебати',
  ecology: 'Екологія',
  stem: 'Наука',
};

const statusLabel: Record<Exclude<Status, 'all'>, string> = {
  current: 'Поточний',
  done: 'Реалізований',
};

export default function ProjectsCatalog() {
  const [status, setStatus] = useState<Status>('all');
  const [theme, setTheme] = useState<Theme>('all');

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const byStatus = status === 'all' || p.status === status;
        const byTheme = theme === 'all' || p.theme === theme;
        return byStatus && byTheme;
      }),
    [status, theme]
  );

  return (
    <section className={styles.section} id="projects-catalog">
      <div className={styles.container}>
        <h2 className={styles.title}>Каталог проєктів</h2>
        <p className={styles.lead}>
          Фільтруйте за статусом і тематикою. Клік по картці відкриє детальний кейс (окремі сторінки — наступний етап).
        </p>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            {statusFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.chip} ${status === f.id ? styles.chipActive : ''}`}
                onClick={() => setStatus(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            {themeFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`${styles.chip} ${theme === f.id ? styles.chipActive : ''}`}
                onClick={() => setTheme(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.photo}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.badges}>
                  <span className={styles.badge}>{statusLabel[project.status]}</span>
                  <span className={styles.badgeMuted}>{themeLabel[project.theme]}</span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.desc}</p>
                <p className={styles.meta}>
                  <strong>Термін:</strong> {project.period}
                </p>
                <p className={styles.meta}>
                  <strong>Партнери:</strong> {project.partners}
                </p>
                <a href={`/projects/${project.id}`} className={styles.link}>
                  Детальніше
                </a>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className={styles.empty}>За обраними фільтрами проєктів не знайдено.</p>
        ) : null}
      </div>
    </section>
  );
}

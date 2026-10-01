'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { CmsProject } from '@/data/cmsTypes';
import styles from './ProjectsCatalog.module.css';

type Status = 'all' | 'current' | 'done';
type Theme = 'all' | 'ecology' | 'stem' | 'debates';

type Project = CmsProject;

type Props = {
  projects: Project[];
};

const projectsDefault: Project[] = [];

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

export default function ProjectsCatalog({ projects = projectsDefault }: Props) {
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
              <div className={`${styles.media} ui-card-photo`}>
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

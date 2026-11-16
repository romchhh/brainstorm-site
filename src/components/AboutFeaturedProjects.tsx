import Link from 'next/link';
import type { CmsProject } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { CtaArrow } from '@/components/CtaArrow';
import styles from './AboutFeaturedProjects.module.css';

type Props = {
  projects: CmsProject[];
  locale: Locale;
};

export default function AboutFeaturedProjects({ projects, locale }: Props) {
  const m = getMessages(locale);
  if (!projects.length) return null;

  return (
    <section className={styles.section} id="featured-projects" data-reveal="up">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>{m.aboutPage.featuredTitle}</h2>
          <p className={styles.lead}>{m.aboutPage.featuredLead}</p>
          <Link href={localizedPath('/projects', locale)} className="ui-btn ui-btn--outline">
            {m.aboutPage.featuredAll}
            <CtaArrow />
          </Link>
        </div>

        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={localizedPath(`/projects/${project.id}`, locale)} className={styles.row}>
                <span className={styles.theme}>{project.themeLabel}</span>
                <span className={styles.name}>{project.title}</span>
                <span className={styles.meta}>{project.period}</span>
                <span className={styles.arrow} aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cmsProjectById, cmsProjects } from '@/lib/cms/content';
import { getServerLocale } from '@/lib/localeServer';
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  jsonLdScript,
  projectArticleJsonLd,
  SITE_URL,
} from '@/lib/seo';
import styles from './page.module.css';

export function generateStaticParams() {
  return cmsProjects().map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = cmsProjectById(id);
  if (!project) {
    return buildPageMetadata({
      title: 'Проєкт не знайдено — Brainstorm',
      description: 'Запитуваний проєкт відсутній у каталозі Brainstorm.',
      path: `/projects/${id}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${project.title} — Проєкти Brainstorm`,
    description: project.body,
    path: `/projects/${project.id}`,
    image: project.image,
    imageAlt: project.title,
    type: 'article',
  });
}

export const revalidate = 300;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const locale = await getServerLocale();
  const project = cmsProjectById(id, locale);
  if (!project) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Проєкти', path: '/projects' },
    { name: project.title, path: `/projects/${project.id}` },
  ]);

  const articleJsonLd = projectArticleJsonLd({
    id: project.id,
    title: project.title,
    body: project.body,
    image: project.image,
    period: project.period,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <Link href="/projects/" className={styles.back}>
              ← Усі проєкти
            </Link>
            <p className={styles.theme}>{project.themeLabel}</p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.meta}>
              {project.period} · {project.partners}
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image src={project.image} alt={project.title} fill className={styles.photo} priority />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Про проєкт</h2>
                <p className={styles.body}>{project.body}</p>
              </div>
              <aside className={styles.aside}>
                <h3 className={styles.asideTitle}>Результати</h3>
                <ul className={styles.results}>
                  {project.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

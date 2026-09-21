import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  buildPageMetadata,
  breadcrumbJsonLd,
  jsonLdScript,
  SITE_URL,
  toCanonical,
} from '@/lib/seo';
import styles from './page.module.css';

const projects = {
  '1': {
    title: 'Дебатний клуб «Голос»',
    period: '2024 — дотепер',
    partners: 'Місцеві освітні партнери',
    theme: 'Дебати та публічні виступи',
    image: '/about-lecture.jpg',
    results: [
      'Регулярні тренування для молоді 16–25 років',
      'Участь команд у регіональних і національних турнірах',
      'Розвиток навичок аргументації та публічних виступів',
    ],
    body: 'Клуб «Голос» — це простір, де молодь вчиться формулювати позицію, слухати опонента і виступати впевнено. Формат поєднує тренування, менторство та відкриті івенти.',
  },
  '2': {
    title: 'Екомоніторинг водойм',
    period: '2025 — дотепер',
    partners: 'Екологічні ініціативи регіону',
    theme: 'Екологія',
    image: '/about-outdoor.jpg',
    results: [
      'Польові заміри якості води',
      'Спільні акції з громадами',
      'Публічні звіти для партнерів і медіа',
    ],
    body: 'Проєкт поєднує науковий підхід і громадську дію: учасники збирають дані, аналізують результати та залучають місцеві спільноти до турботи про довкілля.',
  },
  '3': {
    title: 'STEM Demo Day',
    period: 'Серпень 2026',
    partners: 'Школи та STEM-хаби',
    theme: 'Наука та робототехніка',
    image: '/about-desk.jpg',
    results: [
      'Відкрита виставка інженерних рішень',
      'Менторська підтримка найсильніших команд',
      'Нові партнерства зі школами та хабами',
    ],
    body: 'Demo Day дав молодим інженерам сцену для презентації ідей. Учасники показали прототипи, отримали зворотний звʼязок і можливості для подальшого розвитку.',
  },
  '4': {
    title: 'Турнір публічних виступів',
    period: 'Жовтень 2025',
    partners: 'Молодіжні центри',
    theme: 'Дебати та публічні виступи',
    image: '/about-photos.jpg',
    results: [
      'Відкритий формат для новачків і досвідчених спікерів',
      'Фідбек від журі та менторів',
      'Зростання спільноти навколо публічних виступів',
    ],
    body: 'Турнір став майданчиком для практики публічних виступів у безпечному та підтримуючому середовищі.',
  },
  '5': {
    title: 'Прибирання берегів',
    period: '2024 — 2025',
    partners: 'Громадські організації',
    theme: 'Екологія',
    image: '/hero-kite.jpg',
    results: [
      'Серія волонтерських акцій',
      'Сортування та облік відходів',
      'Підвищення видимості екологічних ініціатив',
    ],
    body: 'Серія акцій з прибирання берегів обʼєднала волонтерів і місцеві організації навколо практичної турботи про довкілля.',
  },
  '6': {
    title: 'Мейкер-лабораторія',
    period: '2026 — дотепер',
    partners: 'Партнери з освіти',
    theme: 'Наука та робототехніка',
    image: '/about/values/photos/value-lab.jpg',
    results: [
      'Практичні STEM-майстерні',
      'Розвиток інженерних навичок',
      'Спільні прототипи учасників',
    ],
    body: 'Мейкер-лабораторія дає молоді інструменти, щоб перетворювати ідеї на працюючі рішення через експерименти та командну роботу.',
  },
} as const;

type ProjectId = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = projects[params.id as ProjectId];
  if (!project) {
    return buildPageMetadata({
      title: 'Проєкт не знайдено — Brainstorm',
      description: 'Запитуваний проєкт відсутній у каталозі Brainstorm.',
      path: `/projects/${params.id}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${project.title} — Проєкти Brainstorm`,
    description: project.body,
    path: `/projects/${params.id}`,
    image: project.image,
    imageAlt: project.title,
    type: 'article',
    keywords: [project.title, project.theme, 'проєкти Brainstorm', 'молодіжні ініціативи'],
  });
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects[params.id as ProjectId];
  if (!project) notFound();

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.body,
    image: `${SITE_URL}${project.image}`,
    url: toCanonical(`/projects/${params.id}`),
    inLanguage: 'uk-UA',
    about: project.theme,
    creator: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Головна', path: '/' },
    { name: 'Проєкти', path: '/projects' },
    { name: project.title, path: `/projects/${params.id}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(projectJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)} />
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <Link href="/projects" className={styles.back}>
              ← До каталогу проєктів
            </Link>
            <p className={styles.theme}>{project.theme}</p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.meta}>
              {project.period} · Партнери: {project.partners}
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.cover}>
              <Image src={project.image} alt={project.title} fill className={styles.coverPhoto} sizes="100vw" />
            </div>
            <p className={styles.body}>{project.body}</p>
            <h2 className={styles.resultsTitle}>Результати</h2>
            <ul className={styles.results}>
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

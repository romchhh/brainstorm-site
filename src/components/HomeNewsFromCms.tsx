import Image from 'next/image';
import Link from 'next/link';
import type { CmsNewsItem } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import { CtaArrow } from '@/components/CtaPanel';
import styles from './HomeNewsFromCms.module.css';

type Props = {
  items: CmsNewsItem[];
  locale: Locale;
};

export default function HomeNewsFromCms({ items, locale }: Props) {
  const m = getMessages(locale);
  const news = items.slice(0, 3);

  return (
    <section className={styles.section} id="news" data-reveal="fade">
      <div className={styles.container}>
        <div className={styles.head} data-reveal="up">
          <h2 className={styles.title}>
            {m.home.newsTitle} <em className={styles.accent}>{m.home.newsAccent}</em>
          </h2>
          <p className={styles.lead}>{m.home.newsLead}</p>
          <Link href={localizedPath('/media', locale)} className={`ui-btn ui-btn--primary ${styles.headCta}`}>
            {m.cta.allNews}
            <CtaArrow />
          </Link>
        </div>

        <div className={styles.grid}>
          {news.map((item) => (
            <article key={item.id} className={styles.card} data-reveal="up">
              <div className={`${styles.media} ui-card-photo`}>
                <Image src={item.image} alt={item.title} fill className={styles.photo} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.tag} style={{ ['--tag' as string]: item.tagColor }}>
                    {item.tag}
                  </span>
                  <time>{item.date}</time>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.excerpt}>{item.excerpt}</p>
                <Link href={localizedPath(`/media/${item.id}`, locale)} className="ui-btn ui-btn--outline">
                  {m.home.readArticle}
                  <CtaArrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

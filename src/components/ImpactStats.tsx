import Image from 'next/image';
import type { SiteSettings } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import CountUpStat from '@/components/CountUpStat';
import styles from './ImpactStats.module.css';

type Props = {
  settings: SiteSettings;
  locale: Locale;
  /** Повна секція з заголовком (about) або лише банер (home / directions) */
  variant?: 'section' | 'embedded';
  bannerHeadline?: string;
};

function buildItems(settings: SiteSettings) {
  return [
    { value: settings.impactParticipants, label: settings.impactParticipantsLabel },
    { value: settings.impactCommunities, label: settings.impactCommunitiesLabel },
    { value: settings.impactProjects, label: settings.impactProjectsLabel },
  ].filter((item) => item.value && item.label);
}

export default function ImpactStats({
  settings,
  locale,
  variant = 'section',
  bannerHeadline,
}: Props) {
  const m = getMessages(locale);
  const items = buildItems(settings);

  const banner = (
    <div className={styles.banner} data-reveal="fade">
      <Image
        src="/icons/wave-pink.svg"
        alt=""
        width={88}
        height={20}
        className={styles.waveLeft}
        aria-hidden
      />
      <Image
        src="/icons/wave-pink.svg"
        alt=""
        width={88}
        height={20}
        className={styles.waveRight}
        aria-hidden
      />

      <div className={styles.inner}>
        {bannerHeadline ? <h3 className={styles.bannerHeadline}>{bannerHeadline}</h3> : null}

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.label} className={styles.stat}>
              <CountUpStat value={item.value} className={styles.statValue} />
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (variant === 'embedded') {
    return <div className={styles.embedded}>{banner}</div>;
  }

  return (
    <section className={styles.section} data-reveal="up">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{m.impact.title}</h2>
          <p className={styles.lead}>{m.impact.lead}</p>
        </header>
        {banner}
      </div>
    </section>
  );
}

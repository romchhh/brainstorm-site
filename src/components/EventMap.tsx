import { osmEmbedUrl, osmExternalUrl } from '@/lib/eventMap';
import styles from './EventMap.module.css';

type Props = {
  lat: number;
  lng: number;
  label: string;
  openLabel: string;
};

export default function EventMap({ lat, lng, label, openLabel }: Props) {
  const embed = osmEmbedUrl(lat, lng);
  const external = osmExternalUrl(lat, lng);

  return (
    <div className={styles.wrap}>
      <iframe
        title={label}
        className={styles.frame}
        src={embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={external} target="_blank" rel="noreferrer" className={styles.link}>
        {openLabel} ↗
      </a>
    </div>
  );
}

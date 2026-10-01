import type { SiteSettings } from '@/data/cmsTypes';
import type { Locale } from '@/i18n/locale';
import ImpactStats from '@/components/ImpactStats';

type Props = {
  settings: SiteSettings;
  locale: Locale;
};

/** @deprecated Use ImpactStats — kept for existing imports */
export default function ImpactCharts({ settings, locale }: Props) {
  return <ImpactStats settings={settings} locale={locale} variant="section" />;
}

import type { Locale } from '@/i18n/locale';
import { cmsTicker } from '@/lib/cms/content';
import Ticker from './Ticker';

export default function TickerFromCms({ locale = 'uk' }: { locale?: Locale }) {
  return <Ticker items={cmsTicker(locale)} />;
}

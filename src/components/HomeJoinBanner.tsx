import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import CtaPanel from '@/components/CtaPanel';

export default function HomeJoinBanner({ locale }: { locale: Locale }) {
  const m = getMessages(locale);

  return (
    <CtaPanel
      id="join"
      title={m.joinBanner.title}
      text={m.joinBanner.text}
      href={localizedPath('/contacts', locale)}
      ctaLabel={m.joinBanner.cta}
    />
  );
}

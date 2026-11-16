import type { Locale } from '@/i18n/locale';
import { localizedPath } from '@/i18n/locale';
import { getMessages } from '@/i18n/messages';
import CtaPanel from '@/components/CtaPanel';

type Variant = 'contact' | 'pickEvent' | 'support' | 'upcoming';

type Props = {
  locale: Locale;
  variant?: Variant;
  donateUrl?: string;
  id?: string;
};

export default function HomeJoinBanner({
  locale,
  variant = 'contact',
  donateUrl,
  id = 'join',
}: Props) {
  const m = getMessages(locale);
  const calendarHref = `${localizedPath('/media', locale)}#schedule`;
  const supportHref = donateUrl?.trim() || localizedPath('/contacts', locale);

  if (variant === 'pickEvent') {
    return (
      <CtaPanel
        id={id}
        title={m.joinBanner.pickEventTitle}
        text={m.joinBanner.pickEventText}
        href={calendarHref}
        ctaLabel={m.joinBanner.pickEventCta}
      />
    );
  }

  if (variant === 'support') {
    return (
      <CtaPanel
        id={id}
        title={m.joinBanner.supportTitle}
        text={m.joinBanner.supportText}
        href={supportHref}
        ctaLabel={m.joinBanner.supportCta}
        external={Boolean(donateUrl?.trim())}
      />
    );
  }

  if (variant === 'upcoming') {
    return (
      <CtaPanel
        id={id}
        title={m.joinBanner.upcomingTitle}
        text={m.joinBanner.upcomingText}
        href={calendarHref}
        ctaLabel={m.joinBanner.upcomingCta}
      />
    );
  }

  return (
    <CtaPanel
      id={id}
      title={m.joinBanner.title}
      text={m.joinBanner.text}
      href={localizedPath('/contacts', locale)}
      ctaLabel={m.joinBanner.cta}
    />
  );
}

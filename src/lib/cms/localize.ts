import type { Locale } from '@/i18n/locale';
import type {
  CmsEvent,
  CmsGalleryItem,
  CmsNewsItem,
  CmsProject,
  CmsReport,
  CmsReview,
  CmsTeamMember,
  SiteSettings,
} from '@/data/cmsTypes';

export function tField(locale: Locale, uk: string, en?: string): string {
  if (locale === 'en' && en?.trim()) return en.trim();
  return uk;
}

export function localizeNews(item: CmsNewsItem, locale: Locale): CmsNewsItem {
  return {
    ...item,
    title: tField(locale, item.title, item.titleEn),
    excerpt: tField(locale, item.excerpt, item.excerptEn),
    tag: tField(locale, item.tag, item.tagEn),
    body: item.body ? tField(locale, item.body, item.bodyEn) : item.bodyEn && locale === 'en' ? item.bodyEn : item.body,
  };
}

export function localizeProject(item: CmsProject, locale: Locale): CmsProject {
  return {
    ...item,
    title: tField(locale, item.title, item.titleEn),
    desc: tField(locale, item.desc, item.descEn),
    body: tField(locale, item.body, item.bodyEn),
    period: tField(locale, item.period, item.periodEn),
    partners: tField(locale, item.partners, item.partnersEn),
    themeLabel: tField(locale, item.themeLabel, item.themeLabelEn),
    results: locale === 'en' && item.resultsEn?.length ? item.resultsEn : item.results,
  };
}

export function localizeEvent(item: CmsEvent, locale: Locale): CmsEvent {
  return {
    ...item,
    title: tField(locale, item.title, item.titleEn),
    place: tField(locale, item.place, item.placeEn),
    direction: tField(locale, item.direction, item.directionEn) as CmsEvent['direction'],
    excerpt: item.excerpt ? tField(locale, item.excerpt, item.excerptEn) : item.excerpt,
    body: item.body
      ? tField(locale, item.body, item.bodyEn)
      : item.bodyEn && locale === 'en'
        ? item.bodyEn
        : item.body,
    startTime: item.startTime ? tField(locale, item.startTime, item.startTimeEn) : item.startTime,
    registrationNote: item.registrationNote
      ? tField(locale, item.registrationNote, item.registrationNoteEn)
      : item.registrationNote,
  };
}

export function localizeTeamMember(item: CmsTeamMember, locale: Locale): CmsTeamMember {
  return {
    ...item,
    name: tField(locale, item.name, item.nameEn),
    role: tField(locale, item.role, item.roleEn),
    text: tField(locale, item.text, item.textEn),
  };
}

export function localizeGallery(item: CmsGalleryItem, locale: Locale): CmsGalleryItem {
  return {
    ...item,
    title: tField(locale, item.title, item.titleEn),
    photos: item.photos.map((photo) => ({
      ...photo,
      caption: photo.caption ? tField(locale, photo.caption, photo.captionEn) : photo.caption,
    })),
  };
}

export function localizeReview(item: CmsReview, locale: Locale): CmsReview {
  return {
    ...item,
    author: tField(locale, item.author, item.authorEn),
    text: tField(locale, item.text, item.textEn),
  };
}

export function localizeReport(item: CmsReport, locale: Locale): CmsReport {
  return {
    ...item,
    title: tField(locale, item.title, item.titleEn),
  };
}

export function localizeSettings(settings: SiteSettings, locale: Locale): SiteSettings {
  return {
    ...settings,
    brandName: tField(locale, settings.brandName, settings.brandNameEn),
    location: tField(locale, settings.location, settings.locationEn),
    metaTitle: tField(locale, settings.metaTitle, settings.metaTitleEn),
    metaDescription: tField(locale, settings.metaDescription, settings.metaDescriptionEn),
    impactParticipantsLabel: tField(
      locale,
      settings.impactParticipantsLabel,
      settings.impactParticipantsLabelEn,
    ),
    impactCommunitiesLabel: tField(locale, settings.impactCommunitiesLabel, settings.impactCommunitiesLabelEn),
    impactProjectsLabel: tField(locale, settings.impactProjectsLabel, settings.impactProjectsLabelEn),
    ecomonitoringTitle: tField(locale, settings.ecomonitoringTitle, settings.ecomonitoringTitleEn),
    ecomonitoringLead: tField(locale, settings.ecomonitoringLead, settings.ecomonitoringLeadEn),
    ecomonitoringBody: tField(locale, settings.ecomonitoringBody, settings.ecomonitoringBodyEn),
  };
}

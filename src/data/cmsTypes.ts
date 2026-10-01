export type ProjectStatus = 'current' | 'done';
export type ProjectTheme = 'debates' | 'ecology' | 'stem';

export type CmsProject = {
  id: string;
  title: string;
  titleEn?: string;
  desc: string;
  descEn?: string;
  period: string;
  periodEn?: string;
  partners: string;
  partnersEn?: string;
  status: ProjectStatus;
  theme: ProjectTheme;
  image: string;
  themeLabel: string;
  themeLabelEn?: string;
  results: string[];
  resultsEn?: string[];
  body: string;
  bodyEn?: string;
  published: boolean;
};

export type EventDirection = 'Дебати' | 'Екологія' | 'Наука';

export type EventFormat = 'offline' | 'online' | 'hybrid';

export type CmsEvent = {
  id: string;
  date: string;
  startTime?: string;
  startTimeEn?: string;
  title: string;
  titleEn?: string;
  place: string;
  placeEn?: string;
  direction: EventDirection;
  directionEn?: string;
  format?: EventFormat;
  latitude?: number;
  longitude?: number;
  onlineUrl?: string;
  color: string;
  image?: string;
  excerpt?: string;
  excerptEn?: string;
  body?: string;
  bodyEn?: string;
  published: boolean;
  registrationEnabled?: boolean;
  capacity?: number;
  registrationNote?: string;
  registrationNoteEn?: string;
};

export type RegistrationStatus = 'new' | 'confirmed' | 'cancelled' | 'waitlist';

export type EventRegistration = {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  comment: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
};

export type CmsNewsItem = {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  tag: string;
  tagEn?: string;
  tagColor: string;
  excerpt: string;
  excerptEn?: string;
  image: string;
  body?: string;
  bodyEn?: string;
  published: boolean;
};

export type CmsTeamMember = {
  id: string;
  role: string;
  roleEn?: string;
  name: string;
  nameEn?: string;
  text: string;
  textEn?: string;
  photo: string;
  linkedin: string;
  tone: 'pink' | 'blue' | 'green' | 'yellow';
  sortOrder: number;
  published: boolean;
};

export type CmsReview = {
  id: string;
  author: string;
  authorEn?: string;
  text: string;
  textEn?: string;
  tone: 'blue' | 'pink' | 'yellow' | 'green';
  size: 'wide' | 'small';
  published: boolean;
};

export type CmsReport = {
  id: string;
  year: string;
  title: string;
  titleEn?: string;
  file: string;
  published: boolean;
};

export type CmsGalleryPhoto = {
  src: string;
  caption?: string;
  captionEn?: string;
};

export type CmsGalleryItem = {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  cover: string;
  photos: CmsGalleryPhoto[];
  published: boolean;
};

export type CmsTickerItem = {
  id: string;
  text: string;
  textEn?: string;
};

export type LeadStatus = 'new' | 'in_progress' | 'done' | 'archived';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: LeadStatus;
  page?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminRole = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

export type AdminUser = {
  id: string;
  login: string;
  password: string;
  name: string;
  roleId: string;
  active: boolean;
};

export type SiteSettings = {
  brandName: string;
  brandNameEn?: string;
  siteUrl: string;
  email: string;
  phone: string;
  location: string;
  locationEn?: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTelegram: string;
  socialTiktok: string;
  socialYoutube: string;
  metaTitle: string;
  metaTitleEn?: string;
  metaDescription: string;
  metaDescriptionEn?: string;
  crmWebhookUrl: string;
  telegramNotify: boolean;
  impactParticipants: string;
  impactCommunities: string;
  impactProjects: string;
  impactParticipantsLabel: string;
  impactCommunitiesLabel: string;
  impactProjectsLabel: string;
  impactParticipantsLabelEn?: string;
  impactCommunitiesLabelEn?: string;
  impactProjectsLabelEn?: string;
  ecomonitoringTitle: string;
  ecomonitoringTitleEn?: string;
  ecomonitoringLead: string;
  ecomonitoringLeadEn?: string;
  ecomonitoringBody: string;
  ecomonitoringBodyEn?: string;
};

export type AnalyticsEvent = {
  id: string;
  type: 'pageview' | 'lead';
  path: string;
  leadSource?: string;
  createdAt: string;
};

export type CmsDb = {
  projects: CmsProject[];
  events: CmsEvent[];
  news: CmsNewsItem[];
  team: CmsTeamMember[];
  reviews: CmsReview[];
  reports: CmsReport[];
  gallery: CmsGalleryItem[];
  ticker: CmsTickerItem[];
  leads: Lead[];
  registrations: EventRegistration[];
  roles: AdminRole[];
  users: AdminUser[];
  settings: SiteSettings;
  analytics: AnalyticsEvent[];
};

export type ContentCollection =
  | 'projects'
  | 'events'
  | 'news'
  | 'team'
  | 'reviews'
  | 'reports'
  | 'gallery'
  | 'ticker';

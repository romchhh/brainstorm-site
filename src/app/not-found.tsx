import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMessages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/locale';
import { getServerLocale } from '@/lib/localeServer';
import { CtaArrow } from '@/components/CtaPanel';
import { jsonLdScript, toCanonical, webPageJsonLd } from '@/lib/seo';
import styles from './not-found.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = getMessages(locale);
  return {
    title: { absolute: m.notFound.metaTitle },
    description: m.notFound.metaDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: toCanonical('/404') },
  };
}

export default async function NotFound() {
  const locale = await getServerLocale();
  const m = getMessages(locale);

  const helpfulLinks = [
    { href: localizedPath('/', locale), label: m.notFound.linkHome },
    { href: localizedPath('/about/', locale), label: m.notFound.linkAbout },
    { href: localizedPath('/projects/', locale), label: m.notFound.linkProjects },
    { href: localizedPath('/media/', locale), label: m.notFound.linkMedia },
    { href: localizedPath('/contacts/', locale), label: m.notFound.linkContacts },
  ];

  const pageJsonLd = webPageJsonLd({
    name: m.notFound.title,
    description: m.notFound.metaDescription,
    path: '/404',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(pageJsonLd)} />
      <Header locale={locale} />
      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.code}>404</p>
          <h1 className={`ui-title-page ${styles.title}`}>{m.notFound.title}</h1>
          <p className={`ui-section-lead ${styles.text}`}>{m.notFound.text}</p>

          <nav className={styles.links} aria-label={m.notFound.navLabel}>
            {helpfulLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.linkChip}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href={localizedPath('/', locale)} className="ui-btn ui-btn--primary">
              {m.notFound.backHome}
              <CtaArrow />
            </Link>
            <Link href={localizedPath('/projects/', locale)} className="ui-btn ui-btn--outline">
              {m.notFound.viewProjects}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

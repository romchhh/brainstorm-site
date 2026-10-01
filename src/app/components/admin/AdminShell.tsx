'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import AdminIcon from './AdminIcon'
import { useAdminAuth } from './AdminAuthProvider'
import { adminFetch } from './adminApi'
import { ADMIN_NAV, getAdminPageTitle, navForPermissions } from '@/lib/admin/nav'
import type { Lead } from '@/lib/cms/store'
import type { EventRegistration } from '@/data/cmsTypes'
import styles from './AdminShell.module.css'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { session, logout } = useAdminAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [newLeadsCount, setNewLeadsCount] = useState(0)
  const [newRegistrationsCount, setNewRegistrationsCount] = useState(0)

  const refreshLeadsBadge = useCallback(() => {
    void adminFetch<{ leads: Lead[] }>('/api/admin/leads')
      .then((data) => {
        const count = data.leads.filter((lead) => lead.status === 'new').length
        setNewLeadsCount(count)
      })
      .catch(() => {
        // Ignore while session boots / offline
      })
  }, [])

  const refreshRegistrationsBadge = useCallback(() => {
    void adminFetch<{ registrations: EventRegistration[] }>('/api/admin/registrations')
      .then((data) => {
        const count = data.registrations.filter((entry) => entry.status === 'new').length
        setNewRegistrationsCount(count)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    refreshLeadsBadge()
    refreshRegistrationsBadge()
    const timer = window.setInterval(() => {
      refreshLeadsBadge()
      refreshRegistrationsBadge()
    }, 15000)
    return () => window.clearInterval(timer)
  }, [refreshLeadsBadge, refreshRegistrationsBadge, pathname])

  async function handleLogout() {
    await logout()
    router.replace('/admin')
  }

  const navItems = session ? navForPermissions(session.permissions) : ADMIN_NAV

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarTop}>
          <Link href="/admin/dashboard" className={styles.brand}>
            <span className={styles.brandMark}>Brainstorm</span>
            <span className={styles.brandBadge}>Admin</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const badge =
              item.href === '/admin/leads' && newLeadsCount > 0
                ? String(newLeadsCount)
                : item.href === '/admin/registrations' && newRegistrationsCount > 0
                  ? String(newRegistrationsCount)
                  : undefined;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              >
                <AdminIcon name={item.icon} />
                <span>{item.label}</span>
                {badge ? <span className={styles.navBadge}>{badge}</span> : null}
              </Link>
            )
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>{session?.login.slice(0, 1).toUpperCase()}</div>
            <div>
              <strong>{session?.login}</strong>
              <span>{session?.name || 'Адміністратор'}</span>
            </div>
          </div>
          <button type="button" className={styles.logout} onClick={handleLogout}>
            Вийти
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Відкрити меню"
          >
            <span />
            <span />
            <span />
          </button>

          <div className={styles.topbarCopy}>
            <p className={styles.eyebrow}>Brainstorm CMS</p>
            <h1 className={styles.pageTitle}>{getAdminPageTitle(pathname)}</h1>
          </div>

          <div className={styles.topbarActions}>
            <Link href="/" className={styles.siteLink} target="_blank">
              Відкрити сайт
            </Link>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

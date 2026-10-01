'use client'

import ModalShell from '@/components/ModalShell'
import styles from './AdminUi.module.css'

export function Field({
  label,
  children,
  hint,
  full,
}: {
  label: string
  children: React.ReactNode
  hint?: string
  full?: boolean
}) {
  return (
    <label className={`${styles.field} ${full ? styles.fieldFull : ''}`.trim()}>
      <span>{label}</span>
      {children}
      {hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  )
}

export function Modal({
  title,
  onClose,
  children,
  wide,
  footer,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
  footer?: React.ReactNode
}) {
  return (
    <ModalShell
      open
      onClose={onClose}
      closeLabel="Закрити"
      rootClassName="admin-modal-root"
      panelClassName={`${styles.modal} ${wide ? styles.modalWide : ''}`}
    >
      <div className={styles.modalHead}>
        <h3 id="admin-modal-title">{title}</h3>
        <button type="button" className={styles.ghostBtn} onClick={onClose}>
          Закрити
        </button>
      </div>
      <div className={styles.modalScroll}>{children}</div>
      {footer ? <div className={styles.modalFoot}>{footer}</div> : null}
    </ModalShell>
  )
}

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import styles from './ModalShell.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
  closeLabel?: string;
  panelClassName?: string;
  rootClassName?: string;
  /** Max width token for default panel sizing (overridden by panelClassName) */
  maxWidth?: number;
};

export default function ModalShell({
  open,
  onClose,
  children,
  labelledBy,
  describedBy,
  closeLabel = 'Close',
  panelClassName,
  rootClassName,
  maxWidth,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className={`${styles.root} ${styles.rootOpen} ${rootClassName ?? ''}`.trim()} role="presentation">
      <button type="button" className={styles.backdrop} aria-label={closeLabel} onClick={onClose} />
      <div
        className={`${styles.panel} ${styles.panelOpen} ${panelClassName ?? ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        style={maxWidth ? { maxWidth } : undefined}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
}

function getSnapshot() {
  return window.location.pathname;
}

function getServerSnapshot() {
  return '/';
}

/** Browser URL path (includes `/en/…`), not the rewritten App Router pathname. */
export function usePublicPathname(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

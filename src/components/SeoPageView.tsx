'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SeoPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;
    void fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, type: 'pageview' }),
      keepalive: true,
    }).catch(() => {
      // ignore
    });
  }, [pathname]);

  return null;
}

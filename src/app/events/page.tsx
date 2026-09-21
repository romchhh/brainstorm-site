'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/media/');
  }, [router]);

  return (
    <main style={{ padding: '48px 24px', textAlign: 'center' }}>
      <p>Переходимо до розділу «Актуальні події»…</p>
      <a href="/media/">Відкрити /media</a>
    </main>
  );
}

import { Suspense } from 'react';
import AdminLoginForm from '@/app/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>Завантаження…</div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

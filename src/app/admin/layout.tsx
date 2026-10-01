import type { Metadata } from 'next';
import './admin.css';
import { AdminAuthProvider } from '@/app/components/admin/AdminAuthProvider';

export const metadata: Metadata = {
  title: 'Brainstorm Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="brainstorm-admin">{children}</div>
    </AdminAuthProvider>
  );
}

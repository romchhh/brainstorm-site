'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { AdminCard, AdminPageHeader, PrimaryButton } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';

type MediaFile = { name: string; url: string; size: number };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibraryView() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ files: MediaFile[] }>('/api/admin/uploads');
      setFiles(data.files);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onUpload(list: FileList | null) {
    if (!list?.length) return;
    setUploading(true);
    try {
      const form = new FormData();
      Array.from(list).forEach((file) => form.append('files', file));
      await fetch('/api/admin/uploads', { method: 'POST', body: form });
      await load();
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Медіатека"
        description="Завантаження з оптимізацією (WebP до 1920px). Файли зберігаються в SQLite CMS і доступні через /api/media/…"
        action={
          <label className={ui.primaryBtn} style={{ cursor: 'pointer' }}>
            {uploading ? 'Завантаження…' : 'Додати файли'}
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              hidden
              onChange={(e) => void onUpload(e.target.files)}
            />
          </label>
        }
      />

      <AdminCard>
        {loading ? (
          <p className={ui.loading}>Завантаження…</p>
        ) : files.length === 0 ? (
          <p className={ui.empty}>Файлів ще немає — завантажте перше зображення або PDF.</p>
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Превʼю</th>
                  <th>URL</th>
                  <th>Розмір</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.name}>
                    <td>
                      {file.url.endsWith('.pdf') ? (
                        'PDF'
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={file.url} alt="" style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                      )}
                    </td>
                    <td>
                      <code style={{ fontSize: 12 }}>{file.url}</code>
                    </td>
                    <td>{formatSize(file.size)}</td>
                    <td>
                      <PrimaryButton
                        onClick={() => {
                          void navigator.clipboard.writeText(file.url);
                        }}
                      >
                        Копіювати URL
                      </PrimaryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}

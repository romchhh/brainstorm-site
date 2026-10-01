'use client';

import { useRef, useState } from 'react';
import ui from './AdminUi.module.css';

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUploadField({ value, onChange, label = 'Зображення' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/admin/uploads', { method: 'POST', body: form });
      const data = (await response.json()) as { ok?: boolean; url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'upload_failed');
      }
      onChange(data.url);
    } catch {
      setError('Не вдалося завантажити файл');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={ui.field}>
      <span>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/hero-kite.jpg або /api/media/..."
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" className={ui.ghostBtn} disabled={uploading} onClick={() => inputRef.current?.click()}>
            {uploading ? 'Завантаження…' : 'Завантажити файл'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            hidden
            onChange={(e) => void onFileChange(e.target.files?.[0])}
          />
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" style={{ width: 72, height: 48, objectFit: 'cover', borderRadius: 8 }} />
          ) : null}
        </div>
        {error ? <span style={{ color: '#b91c1c', fontSize: 12 }}>{error}</span> : null}
      </div>
    </div>
  );
}

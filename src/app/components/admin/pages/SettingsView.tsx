'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { Field } from '@/app/components/admin/AdminForm';
import { AdminCard, AdminPageHeader, PrimaryButton } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { SiteSettings } from '@/data/cmsTypes';

export default function SettingsView() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void adminFetch<{ settings: SiteSettings }>('/api/admin/settings')
      .then((data) => setForm(data.settings))
      .catch(() => setMessage('Не вдалося завантажити налаштування'));
  }, []);

  async function save() {
    if (!form) return;
    setSaving(true);
    setMessage('');
    try {
      await adminFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(form) });
      setMessage('Збережено');
    } catch {
      setMessage('Помилка збереження');
    } finally {
      setSaving(false);
    }
  }

  if (!form) return <p className={ui.loading}>Завантаження…</p>;

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Налаштування сайту"
        description="Контакти, соцмережі, SEO та інтеграції (CRM webhook, Telegram)."
        action={
          <PrimaryButton onClick={() => void save()} disabled={saving}>
            {saving ? 'Збереження…' : 'Зберегти'}
          </PrimaryButton>
        }
      />

      {message ? <p className={ui.empty}>{message}</p> : null}

      <AdminCard title="Контакти">
        <div className={ui.formGrid}>
          <Field label="Назва бренду">
            <input value={form.brandName} onChange={(e) => set('brandName', e.target.value)} />
          </Field>
          <Field label="Email">
            <input value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <Field label="Телефон">
            <input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </Field>
          <Field label="Локація">
            <input value={form.location} onChange={(e) => set('location', e.target.value)} />
          </Field>
          <Field label="URL сайту">
            <input value={form.siteUrl} onChange={(e) => set('siteUrl', e.target.value)} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Соцмережі">
        <div className={ui.formGrid}>
          {(
            [
              ['socialInstagram', 'Instagram'],
              ['socialFacebook', 'Facebook'],
              ['socialTelegram', 'Telegram'],
              ['socialTiktok', 'TikTok'],
              ['socialYoutube', 'YouTube'],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={label}>
              <input value={form[key]} onChange={(e) => set(key, e.target.value)} />
            </Field>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="SEO">
        <div className={ui.formGrid}>
          <Field label="Meta title">
            <input value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
          </Field>
          <Field label="Meta title (EN)">
            <input value={form.metaTitleEn ?? ''} onChange={(e) => set('metaTitleEn', e.target.value)} />
          </Field>
          <Field label="Meta description">
            <textarea rows={3} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} />
          </Field>
          <Field label="Meta description (EN)">
            <textarea rows={3} value={form.metaDescriptionEn ?? ''} onChange={(e) => set('metaDescriptionEn', e.target.value)} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Показники «Про нас»">
        <div className={ui.formGrid}>
          <Field label="Учасники (число)">
            <input value={form.impactParticipants} onChange={(e) => set('impactParticipants', e.target.value)} />
          </Field>
          <Field label="Підпис учасників">
            <input
              value={form.impactParticipantsLabel}
              onChange={(e) => set('impactParticipantsLabel', e.target.value)}
            />
          </Field>
          <Field label="Громади (число)">
            <input value={form.impactCommunities} onChange={(e) => set('impactCommunities', e.target.value)} />
          </Field>
          <Field label="Підпис громад">
            <input
              value={form.impactCommunitiesLabel}
              onChange={(e) => set('impactCommunitiesLabel', e.target.value)}
            />
          </Field>
          <Field label="Проєкти (число)">
            <input value={form.impactProjects} onChange={(e) => set('impactProjects', e.target.value)} />
          </Field>
          <Field label="Підпис проєктів">
            <input value={form.impactProjectsLabel} onChange={(e) => set('impactProjectsLabel', e.target.value)} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Екомоніторинг">
        <div className={ui.formGrid}>
          <Field label="Заголовок">
            <input value={form.ecomonitoringTitle} onChange={(e) => set('ecomonitoringTitle', e.target.value)} />
          </Field>
          <Field label="Короткий опис">
            <textarea rows={2} value={form.ecomonitoringLead} onChange={(e) => set('ecomonitoringLead', e.target.value)} />
          </Field>
          <Field label="Текст сторінки">
            <textarea rows={5} value={form.ecomonitoringBody} onChange={(e) => set('ecomonitoringBody', e.target.value)} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Інтеграції">
        <div className={ui.formGrid}>
          <Field label="CRM Webhook URL">
            <input value={form.crmWebhookUrl} onChange={(e) => set('crmWebhookUrl', e.target.value)} />
          </Field>
          <Field label="Telegram сповіщення">
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={form.telegramNotify}
                onChange={(e) => set('telegramNotify', e.target.checked)}
              />
              <span>Надсилати нові заявки (потрібні TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID)</span>
            </label>
          </Field>
        </div>
      </AdminCard>
    </div>
  );
}

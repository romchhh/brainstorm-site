'use client';

import { useEffect, useMemo, useState } from 'react';
import { adminFetch } from './adminApi';
import { Field, Modal } from './AdminForm';
import {
  AdminCard,
  AdminPageHeader,
  DeleteIconButton,
  EditIconButton,
  PrimaryButton,
} from './AdminUi';
import ImageUploadField from './ImageUploadField';
import ui from './AdminUi.module.css';

export type CrudField = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'date' | 'checkbox' | 'lines' | 'image';
  placeholder?: string;
  options?: { value: string; label: string }[];
  table?: boolean;
  /** Span both columns in the edit modal */
  fullWidth?: boolean;
};

type Props = {
  title: string;
  description: string;
  apiPath: string;
  idKey?: string;
  fields: CrudField[];
  createLabel?: string;
};

type Row = Record<string, unknown>;

function linesToArray(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function arrayToLines(value: unknown) {
  if (Array.isArray(value)) return value.join('\n');
  return '';
}

function fieldClass(field: CrudField) {
  const full =
    field.fullWidth ||
    field.type === 'textarea' ||
    field.type === 'lines' ||
    field.type === 'image';
  return full ? ui.fieldFull : '';
}

export default function CollectionCrudView({
  title,
  description,
  apiPath,
  idKey = 'id',
  fields,
  createLabel = 'Додати',
}: Props) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const tableFields = useMemo(() => fields.filter((f) => f.table !== false).slice(0, 4), [fields]);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ items: Row[] }>(apiPath);
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка завантаження');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [apiPath]);

  function openCreate() {
    setEditing(null);
    const empty: Row = {};
    for (const field of fields) {
      if (field.type === 'checkbox') empty[field.key] = true;
      else if (field.type === 'lines') empty[field.key] = '';
      else empty[field.key] = '';
    }
    setForm(empty);
    setModalOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    const next: Row = { ...row };
    for (const field of fields) {
      if (field.type === 'lines') next[field.key] = arrayToLines(row[field.key]);
    }
    setForm(next);
    setModalOpen(true);
  }

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildPayload(): Row {
    const payload: Row = { ...form };
    for (const field of fields) {
      if (field.type === 'lines') {
        payload[field.key] = linesToArray(String(form[field.key] ?? ''));
      }
      if (field.type === 'checkbox') {
        payload[field.key] = Boolean(form[field.key]);
      }
    }
    if (editing) payload[idKey] = editing[idKey];
    return payload;
  }

  async function save() {
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      if (editing) {
        await adminFetch(apiPath, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await adminFetch(apiPath, { method: 'POST', body: JSON.stringify(payload) });
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося зберегти');
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    const id = String(row[idKey]);
    if (!window.confirm('Видалити запис?')) return;
    await adminFetch(`${apiPath}?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    await load();
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <PrimaryButton onClick={openCreate}>{createLabel}</PrimaryButton>
        }
      />

      {error ? <p className={ui.empty}>{error}</p> : null}

      <AdminCard>
        {loading ? (
          <p className={ui.loading}>Завантаження…</p>
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  {tableFields.map((field) => (
                    <th key={field.key}>{field.label}</th>
                  ))}
                  <th aria-label="Дії" />
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={tableFields.length + 1} className={ui.empty}>
                      Записів поки немає — додайте перший.
                    </td>
                  </tr>
                ) : (
                  items.map((row) => (
                    <tr key={String(row[idKey])}>
                      {tableFields.map((field) => (
                        <td key={field.key}>
                          {field.type === 'checkbox'
                            ? row[field.key]
                              ? 'Так'
                              : 'Ні'
                            : String(row[field.key] ?? '')}
                        </td>
                      ))}
                      <td className={ui.rowActions}>
                        <EditIconButton label="Редагувати" onClick={() => openEdit(row)} />
                        <DeleteIconButton label="Видалити" onClick={() => void remove(row)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {modalOpen ? (
        <Modal
          title={editing ? 'Редагування' : 'Новий запис'}
          onClose={() => setModalOpen(false)}
          wide
          footer={
            <PrimaryButton onClick={() => void save()} disabled={saving}>
              {saving ? 'Збереження…' : 'Зберегти'}
            </PrimaryButton>
          }
        >
          <div className={ui.formGrid}>
            {fields.map((field) => {
              const fullClass = fieldClass(field);
              if (field.type === 'textarea' || field.type === 'lines') {
                return (
                  <Field key={field.key} label={field.label} full={Boolean(fullClass)}>
                    <textarea
                      className={fullClass}
                      rows={field.type === 'lines' ? 5 : 4}
                      value={String(form[field.key] ?? '')}
                      onChange={(e) => setField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  </Field>
                );
              }
              if (field.type === 'select' && field.options) {
                return (
                  <Field key={field.key} label={field.label} full={Boolean(fullClass)}>
                    <select
                      className={fullClass}
                      value={String(form[field.key] ?? '')}
                      onChange={(e) => setField(field.key, e.target.value)}
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                );
              }
              if (field.type === 'image') {
                return (
                  <div key={field.key} className={ui.fieldFull}>
                    <ImageUploadField
                      label={field.label}
                      value={String(form[field.key] ?? '')}
                      onChange={(url) => setField(field.key, url)}
                    />
                  </div>
                );
              }
              if (field.type === 'checkbox') {
                return (
                  <div key={field.key} className={`${ui.field} ${ui.fieldFull}`.trim()}>
                    <label className={ui.checkboxRow}>
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.key])}
                        onChange={(e) => setField(field.key, e.target.checked)}
                      />
                      <span>{field.label}</span>
                    </label>
                  </div>
                );
              }
              return (
                <Field key={field.key} label={field.label} full={Boolean(fullClass)}>
                  <input
                    className={fullClass}
                    type={field.type === 'date' ? 'date' : 'text'}
                    value={String(form[field.key] ?? '')}
                    onChange={(e) => setField(field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                </Field>
              );
            })}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

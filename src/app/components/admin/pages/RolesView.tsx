'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/app/components/admin/adminApi';
import { Field } from '@/app/components/admin/AdminForm';
import { AdminCard, AdminPageHeader, PrimaryButton } from '@/app/components/admin/AdminUi';
import ui from '@/app/components/admin/AdminUi.module.css';
import type { AdminRole, AdminUser } from '@/data/cmsTypes';
import { ALL_PERMISSIONS } from '@/data/cmsSeed';

export default function RolesView() {
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);

  async function load() {
    const data = await adminFetch<{ roles: AdminRole[]; users: AdminUser[] }>('/api/admin/roles');
    setRoles(data.roles);
    setUsers(data.users);
  }

  useEffect(() => {
    void load();
  }, []);

  async function saveRole(role: AdminRole) {
    await adminFetch('/api/admin/roles', {
      method: 'PUT',
      body: JSON.stringify({ type: 'role', payload: role }),
    });
    await load();
  }

  return (
    <div className={ui.stack}>
      <AdminPageHeader
        title="Ролі та доступ"
        description="Хто може редагувати контент, заявки та налаштування."
      />

      {roles.map((role) => (
        <AdminCard key={role.id} title={role.name} subtitle={role.description}>
          <div className={ui.formGrid}>
            <Field label="Назва">
              <input
                value={role.name}
                onChange={(e) => setRoles((prev) => prev.map((r) => (r.id === role.id ? { ...r, name: e.target.value } : r)))}
              />
            </Field>
            <Field label="Опис">
              <input
                value={role.description}
                onChange={(e) =>
                  setRoles((prev) =>
                    prev.map((r) => (r.id === role.id ? { ...r, description: e.target.value } : r)),
                  )
                }
              />
            </Field>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {ALL_PERMISSIONS.map((perm) => {
              const active = role.permissions.includes(perm);
              return (
                <button
                  key={perm}
                  type="button"
                  className={ui.ghostBtn}
                  style={{
                    background: active ? 'var(--admin-orange-soft)' : 'transparent',
                    border: '1px solid var(--admin-border)',
                    borderRadius: 999,
                    padding: '6px 12px',
                  }}
                  onClick={() => {
                    const permissions = active
                      ? role.permissions.filter((p) => p !== perm)
                      : [...role.permissions, perm];
                    const next = { ...role, permissions };
                    setRoles((prev) => prev.map((r) => (r.id === role.id ? next : r)));
                  }}
                >
                  {perm}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 12 }}>
            <PrimaryButton onClick={() => void saveRole(role)}>Зберегти роль</PrimaryButton>
          </div>
        </AdminCard>
      ))}

      <AdminCard title="Користувачі">
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th>Логін</th>
                <th>Імʼя</th>
                <th>Роль</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.login}</td>
                  <td>{user.name}</td>
                  <td>{user.roleId}</td>
                  <td>{user.active ? 'Активний' : 'Вимкнено'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={ui.empty} style={{ marginTop: 12 }}>
          Нових користувачів додавайте через змінні ADMIN_LOGIN / ADMIN_PASSWORD або розширте API.
        </p>
      </AdminCard>
    </div>
  );
}

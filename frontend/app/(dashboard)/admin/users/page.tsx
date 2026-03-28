"use client";

import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import AdminGate from '@/components/features/admin/users/AdminGate';
import UsersTable from '@/components/features/admin/users/UsersTable';
import UserFormModal from '@/components/features/admin/users/UserFormModal';
import { roleLabel, type UserRole, type UserRow } from '@/components/features/admin/users/types';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminCard from '@/components/shared/admin/AdminCard';
import AdminSection from '@/components/shared/admin/AdminSection';
import { API_BASE_URL } from '@/lib/api-config';

const toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1600,
  timerProgressBar: true,
  customClass: { container: 'z-[999999]' },
  didOpen: () => {
    const el = document.querySelector('.swal2-container') as HTMLElement | null;
    if (el) el.style.zIndex = '999999';
  },
});

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<UserRow[]>([]);
  const [q, setQ] = useState('');

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createRole, setCreateRole] = useState<UserRole>('USER');

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string>('');
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('USER');
  const [editPassword, setEditPassword] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((u) => {
      const hay = `${u.id} ${u.name ?? ''} ${u.role ?? ''}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [items, q]);

  const load = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users`, { 
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Impossible de charger les utilisateurs');
      setItems((json ?? []) as UserRow[]);
    } catch (e: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: e?.message || 'Erreur inconnue',
        confirmButtonColor: '#465fff',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const r = String(localStorage.getItem('role') || '').toUpperCase();
      setIsAdmin(r === 'ADMIN');
    } catch (e) {
      setIsAdmin(false);
    }
    load();
  }, []);

  const openEdit = (u: UserRow) => {
    setEditId(u.id);
    setEditName(u.name || '');
    setEditRole(roleLabel(u.role) as any);
    setEditPassword('');
    setEditOpen(true);
  };

  const onEdit = async () => {
    setSubmitting(true);
    try {
      const payload: any = {
        name: editName,
        role: editRole,
      };
      if (editPassword.trim()) payload.password = editPassword;

      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(editId)}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de modifier');

      toast.fire({ icon: 'success', title: 'Utilisateur modifié' });

      setEditOpen(false);
      setEditId('');
      setEditName('');
      setEditRole('USER');
      setEditPassword('');
      await load();
    } catch (e: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: e?.message || 'Erreur inconnue',
        confirmButtonColor: '#465fff',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onCreate = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: createName,
          password: createPassword,
          role: createRole,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de créer');

      toast.fire({ icon: 'success', title: 'Utilisateur créé' });

      setCreateOpen(false);
      setCreateName('');
      setCreatePassword('');
      setCreateRole('USER');
      await load();
    } catch (e: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: e?.message || 'Erreur inconnue',
        confirmButtonColor: '#465fff',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Supprimer cet utilisateur ?',
      text: 'Action irréversible.',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#111827',
    });
    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(id)}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de supprimer');

      toast.fire({ icon: 'success', title: 'Utilisateur supprimé' });
      await load();
    } catch (e: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: e?.message || 'Erreur inconnue',
        confirmButtonColor: '#465fff',
      });
    }
  };

  return (
    <AdminGate isAdmin={isAdmin}>
      <AdminSection>
        <AdminPageHeader
          title="Utilisateurs"
          description="Créer, modifier et supprimer des comptes."
          actions={
            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Créer un utilisateur
            </button>
          }
        />

        <AdminCard>
          <div className="flex flex-col gap-3 border-b border-zinc-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-zinc-900">Liste</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher (login, rôle, id)"
              className="w-full sm:w-[360px] rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <UsersTable users={filtered} onEdit={openEdit} onDelete={onDelete} />

          {loading ? (
            <div className="px-6 py-10 text-sm text-zinc-600">Chargement…</div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-10 text-sm text-zinc-600">Aucun utilisateur.</div>
          ) : null}
        </AdminCard>

        <UserFormModal
          title="Créer un utilisateur"
          isOpen={createOpen}
          onClose={() => setCreateOpen(false)}
          onSubmit={onCreate}
          submitLabel="Créer"
          name={createName}
          setName={setCreateName}
          role={createRole}
          setRole={setCreateRole}
          password={createPassword}
          setPassword={setCreatePassword}
          passwordPlaceholder="Mot de passe (min 8)"
          isLoading={submitting}
        />

        <UserFormModal
          title="Modifier un utilisateur"
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={onEdit}
          submitLabel="Enregistrer"
          name={editName}
          setName={setEditName}
          role={editRole}
          setRole={setEditRole}
          password={editPassword}
          setPassword={setEditPassword}
          passwordPlaceholder="Nouveau mot de passe (optionnel)"
          passwordHint="Laissez le mot de passe vide pour ne pas le changer."
          isLoading={submitting}
        />
      </AdminSection>
    </AdminGate>
  );
}

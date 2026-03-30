"use client";

import { useEffect, useMemo, useState } from 'react';
import AdminGate from '@/components/features/admin/users/AdminGate';
import EmployeesTable from '@/components/features/admin/employees/EmployeeTable';
import EmployeeFormModal from '@/components/features/admin/employees/EmployeeFormModal';
import { sexeLabel, type EmployeeSexe } from '@/components/features/admin/employees/types';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminCard from '@/components/shared/admin/AdminCard';
import AdminSection from '@/components/shared/admin/AdminSection';
import { EmployeeRow } from '@/components/features/admin/employees/types';
import { API_BASE_URL } from '@/lib/api-config';
import { toast, confirmDialog } from '@/lib/toast';

export default function AdminEmployeesPage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [items, setItems] = useState<EmployeeRow[]>([]);
    const [q, setQ] = useState('');

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [createNom, setCreateNom] = useState('');
    const [createPrenom, setCreatePrenom] = useState('');
    const [createSexe, setCreateSexe] = useState<EmployeeSexe>('HOMME');
    const [createDateNaissance, setCreateDateNaissance] = useState('');
    const [createContact, setCreateContact] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createFonction, setCreateFonction] = useState('');

    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState<string>('');
    const [editNom, setEditNom] = useState('');
    const [editPrenom, setEditPrenom] = useState('');
    const [editSexe, setEditSexe] = useState<EmployeeSexe>('HOMME');
    const [editDateNaissance, setEditDateNaissance] = useState('');
    const [editContact, setContact] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editFonction, setEditFonction] = useState('');

    const filtered = useMemo(() => {
        const needle = q.trim().toLowerCase();
        if (!needle) return items;
        return items.filter((u) => {
            const hay = `${u.id} ${u.nom ?? ''} ${u.prenom ?? ''} ${u.fonction ?? ''}`.toLowerCase();
            return hay.includes(needle);
        });
    }, [items, q]);

    const load = async () => {
        setLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const res = await fetch(`${API_BASE_URL}/employee`, {
                cache: 'no-store',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || 'Impossible de charger les employés');
            setItems((json ?? []) as EmployeeRow[]);
        } catch (e: any) {
            toast.error({ title: 'Erreur', text: e?.message || 'Erreur inconnue' });
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

    const openEdit = (u: EmployeeRow) => {
        setEditId(u.id);
        setEditNom(u.nom || '');
        setEditPrenom(u.prenom || '');
        setEditSexe(sexeLabel(u.sexe));
        setEditDateNaissance(u.date_naissance || '');
        setContact(u.contact || '');
        setEditEmail(u.email || '');
        setEditFonction(u.fonction || '');
        setEditOpen(true);
    };

    const onEdit = async () => {
        if (!editDateNaissance) {
            toast.warning({ title: 'Attention', text: 'La date de naissance est obligatoire' });
            return;
        }

        setSubmitting(true);
        try {
            const payload: any = {
                nom: editNom,
                prenom: editPrenom,
                sexe: editSexe,
                date_naissance: editDateNaissance,
                contact: editContact,
                email: editEmail,
                fonction: editFonction,
            };

            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/employee/${encodeURIComponent(editId)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de modifier');

            toast.success({ title: 'Employé modifié' });

            setEditOpen(false);
            setEditId('');
            setEditNom('');
            setEditPrenom('');
            setEditSexe('HOMME');
            setEditDateNaissance('');
            setContact('');
            setEditEmail('');
            setEditFonction('');
            await load();
        } catch (e: any) {
            toast.error({ title: 'Erreur', text: e?.message || 'Erreur inconnue' });
        } finally {
            setSubmitting(false);
        }
    };

    const onCreate = async () => {
        if (!createDateNaissance) {
            toast.warning({ title: 'Attention', text: 'La date de naissance est obligatoire' });
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nom: createNom,
                    prenom: createPrenom,
                    sexe: createSexe,
                    date_naissance: createDateNaissance,
                    contact: createContact,
                    email: createEmail,
                    fonction: createFonction,
                }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de créer');

            toast.success({ title: 'Employé créé' });

            setCreateOpen(false);
            setCreateNom('');
            setCreatePrenom('');
            setCreateSexe('HOMME');
            setCreateDateNaissance('');
            setCreateContact('');
            setCreateEmail('');
            setCreateFonction('');
            await load();
        } catch (e: any) {
            toast.error({ title: 'Erreur', text: e?.message || 'Erreur inconnue' });
        } finally {
            setSubmitting(false);
        }
    };

    const onDelete = async (id: string) => {
        const confirm = await confirmDialog({
            icon: 'warning',
            title: 'Supprimer cet employé ?',
            text: 'Action irréversible.',
            confirmButtonText: 'Supprimer',
            confirmButtonColor: '#111827',
        });
        if (!confirm.isConfirmed) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/employee/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.error || json?.message || 'Impossible de supprimer');

            toast.success({ title: 'Employé supprimé' });
            await load();
        } catch (e: any) {
            toast.error({ title: 'Erreur', text: e?.message || 'Erreur inconnue' });
        }
    };

    return (
        <AdminGate isAdmin={isAdmin}>
            <AdminSection>
                <AdminPageHeader
                    title="Employés"
                    description="Créer, modifier et supprimer des employés."
                    actions={
                        <button
                            type="button"
                            onClick={() => setCreateOpen(true)}
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                        >
                            Créer un employé
                        </button>
                    }
                />

                <AdminCard>
                    <div className="flex flex-col gap-3 border-b border-zinc-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm font-semibold text-zinc-900">Liste</div>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Rechercher ( nom, prenom, email, fonction, id)"
                            className="w-full sm:w-[360px] rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
                        />
                    </div>

                    <EmployeesTable employees={filtered} onEdit={openEdit} onDelete={onDelete} />

                    {loading ? (
                        <div className="px-6 py-10 text-sm text-zinc-600">Chargement…</div>
                    ) : filtered.length === 0 ? (
                        <div className="px-6 py-10 text-sm text-zinc-600">Aucun employé.</div>
                    ) : null}
                </AdminCard>

                <EmployeeFormModal
                    title="Créer un employé"
                    isOpen={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={onCreate}
                    submitLabel="Créer"
                    nom={createNom}
                    setNom={setCreateNom}
                    prenom={createPrenom}
                    setPrenom={setCreatePrenom}
                    sexe={createSexe}
                    setSexe={setCreateSexe}
                    date_naissance={createDateNaissance}
                    setDate_naissance={setCreateDateNaissance}
                    contact={createContact}
                    setContact={setCreateContact}
                    email={createEmail}
                    setEmail={setCreateEmail}
                    fonction={createFonction}
                    setFonction={setCreateFonction}
                    isLoading={submitting}
                />

                <EmployeeFormModal
                    title="Modifier un employé"
                    isOpen={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSubmit={onEdit}
                    submitLabel="Enregistrer"
                    nom={editNom}
                    setNom={setEditNom}
                    prenom={editPrenom}
                    setPrenom={setEditPrenom}
                    sexe={editSexe}
                    setSexe={setEditSexe}
                    date_naissance={editDateNaissance}
                    setDate_naissance={setEditDateNaissance}
                    contact={editContact}
                    setContact={setContact}
                    email={editEmail}
                    setEmail={setEditEmail}
                    fonction={editFonction}
                    setFonction={setEditFonction}
                    isLoading={submitting}
                />
            </AdminSection>
        </AdminGate>
    );
}

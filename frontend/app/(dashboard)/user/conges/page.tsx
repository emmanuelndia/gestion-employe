"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminCard from '@/components/shared/admin/AdminCard';
import AdminSection from '@/components/shared/admin/AdminSection';
import UserCongeTable from '@/components/features/user/conges/UserCongeTable';
import CongeFormModal from '@/components/features/user/conges/CongeFormModal';
import { CongeRow } from '@/components/features/admin/conges/types';

const toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1600,
    timerProgressBar: true,
    customClass: { container: 'z-[999999]' },
});

export default function UserCongesPage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [items, setItems] = useState<CongeRow[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch('http://localhost:4000/api/conge/my-requests', { 
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json?.message || 'Erreur lors du chargement');
          setItems(json || []);
        } catch (e: any) {
          Swal.fire({ icon: 'error', title: 'Erreur', text: e?.message });
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:4000/api/conge', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || 'Impossible de soumettre la demande');

            toast.fire({ icon: 'success', title: 'Demande envoyée' });
            setIsModalOpen(false);
            load();
        } catch (e: any) {
            Swal.fire({ icon: 'error', title: 'Erreur', text: e.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AdminSection>
            <AdminPageHeader
                title="Mes Congés"
                description="Consultez l'état de vos demandes de congés ou faites-en une nouvelle."
                actions={
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                        Nouvelle demande
                    </button>
                }
            />

            <AdminCard>
                <div className="px-6 py-5 border-b border-zinc-200">
                    <h3 className="text-sm font-semibold text-zinc-900">Historique des demandes</h3>
                </div>

                <UserCongeTable conges={items} />

                {loading ? (
                    <div className="px-6 py-10 text-sm text-zinc-600">Chargement…</div>
                ) : items.length === 0 ? (
                    <div className="px-6 py-10 text-sm text-zinc-600">Vous n'avez aucune demande de congé.</div>
                ) : null}
            </AdminCard>

            <CongeFormModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={onSubmit} 
                isLoading={submitting} 
            />
        </AdminSection>
    );
}

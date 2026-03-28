"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdminGate from '@/components/features/admin/users/AdminGate';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminCard from '@/components/shared/admin/AdminCard';
import AdminSection from '@/components/shared/admin/AdminSection';
import CongeTable from '@/components/features/admin/conges/CongeTable';
import { CongeRow } from '@/components/features/admin/conges/types';

const toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1600,
    timerProgressBar: true,
    customClass: { container: 'z-[999999]' },
});

export default function AdminCongesPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<CongeRow[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const load = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch('http://localhost:4000/api/conge', { 
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
        const r = String(localStorage.getItem('role') || '').toUpperCase();
        setIsAdmin(r === 'ADMIN');
        load();
    }, []);

    const onUpdateStatus = async (id: number, status: 'accepte' | 'refuse') => {
        const result = await Swal.fire({
            title: status === 'accepte' ? 'Accepter la demande ?' : 'Refuser la demande ?',
            text: "Cette action sera immédiatement enregistrée.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: status === 'accepte' ? '#10b981' : '#ef4444',
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:4000/api/conge/${id}/status`, {
                    method: 'PATCH',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({ status }),
                });
                if (!res.ok) throw new Error('Erreur lors de la mise à jour');
                toast.fire({ icon: 'success', title: 'Statut mis à jour' });
                load();
            } catch (e: any) {
                Swal.fire({ icon: 'error', title: 'Erreur', text: e.message });
            }
        }
    };

    return (
        <AdminGate isAdmin={isAdmin}>
            <AdminSection>
                <AdminPageHeader
                    title="Gestion des Congés"
                    description="Consultez et validez les demandes de congés des employés."
                />

                <AdminCard>
                    <div className="px-6 py-5 border-b border-zinc-200">
                        <h3 className="text-sm font-semibold text-zinc-900">Demandes en cours</h3>
                    </div>

                    <CongeTable conges={items} onUpdateStatus={onUpdateStatus} />

                    {loading ? (
                        <div className="px-6 py-10 text-sm text-zinc-600">Chargement…</div>
                    ) : items.length === 0 ? (
                        <div className="px-6 py-10 text-sm text-zinc-600">Aucune demande de congé.</div>
                    ) : null}
                </AdminCard>
            </AdminSection>
        </AdminGate>
    );
}

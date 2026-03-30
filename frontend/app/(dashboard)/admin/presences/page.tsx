"use client";

import { useEffect, useState } from 'react';
import AdminGate from '@/components/features/admin/users/AdminGate';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminCard from '@/components/shared/admin/AdminCard';
import AdminSection from '@/components/shared/admin/AdminSection';
import PresenceTable from '@/components/features/admin/presences/PresenceTable';
import PresenceFormModal from '@/components/features/admin/presences/PresenceFormModal';
import PresenceStats from '@/components/features/admin/presences/PresenceStats';
import { PresenceRow } from '@/components/features/admin/presences/types';
import { EmployeeRow } from '@/components/features/admin/employees/types';
import { API_BASE_URL } from '@/lib/api-config';
import { toast, confirmDialog } from '@/lib/toast';

export default function AdminPresencesPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<PresenceRow[]>([]);
    const [employees, setEmployees] = useState<EmployeeRow[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [stats, setStats] = useState({ total: 0, present: 0, absent: 0, retard: 0 });

    // Filters
    const [statusFilter, setStatusFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const query = new URLSearchParams();
            if (statusFilter) query.append('status', statusFilter);
            if (startDate) query.append('startDate', startDate);
            if (endDate) query.append('endDate', endDate);

            const f = async (url: string) => {
                const r = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
                if (!r.ok) {
                    const text = await r.text();
                    console.error(`Fetch error ${url}: ${r.status} ${text}`);
                    throw new Error(`Erreur ${r.status} sur ${url}`);
                }
                return r.json();
            };

            const [jsonP, jsonE, jsonS] = await Promise.all([
                f(`${API_BASE_URL}/presence?${query.toString()}`),
                f(`${API_BASE_URL}/employee`),
                f(`${API_BASE_URL}/presence/stats?${query.toString()}`)
            ]);

            setItems(jsonP || []);
            setEmployees(jsonE || []);
            setStats(jsonS);

        } catch (e: any) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const r = String(localStorage.getItem('role') || '').toUpperCase();
        setIsAdmin(r === 'ADMIN');
        loadData();
    }, [statusFilter, startDate, endDate]);

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/presence`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
            toast.success({ title: 'Présence enregistrée' });
            setIsModalOpen(false);
            loadData();
        } catch (e: any) {
            toast.error({ title: 'Erreur', text: e.message });
        } finally {
            setSubmitting(false);
        }
    };

    const setPeriod = (period: 'week' | 'month') => {
        const end = new Date();
        const start = new Date();
        if (period === 'week') start.setDate(start.getDate() - 7);
        else start.setMonth(start.getMonth() - 1);

        setStartDate(start.toISOString().slice(0, 10));
        setEndDate(end.toISOString().slice(0, 10));
    };

    const onDelete = async (id: number) => {
        const result = await confirmDialog({
            title: 'Supprimer ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            confirmButtonText: 'Supprimer',
            confirmButtonColor: '#ef4444',
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await fetch(`${API_BASE_URL}/presence/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                toast.success({ title: 'Supprimé' });
                loadData();
            } catch (e: any) {
                toast.error({ title: 'Erreur', text: e.message });
            }
        }
    };

    return (
        <AdminGate isAdmin={isAdmin}>
            <AdminSection>
                <AdminPageHeader
                    title="Gestion des Présences"
                    description="Suivez l'assiduité des employés et analysez les statistiques de présence."
                    actions={
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20 transition-all hover:-translate-y-0.5"
                        >
                            Noter une présence
                        </button>
                    }
                />

                <PresenceStats stats={stats} />

                <AdminCard>
                    <div className="px-6 py-5 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-zinc-900">Filtres</h3>
                            <div className="h-4 w-[1px] bg-zinc-200 mx-2" />
                            <button onClick={() => setPeriod('week')} className="text-xs font-medium text-zinc-500 hover:text-zinc-900">Cette semaine</button>
                            <button onClick={() => setPeriod('month')} className="text-xs font-medium text-zinc-500 hover:text-zinc-900">Ce mois</button>
                            <button onClick={() => { setStartDate(''); setEndDate(''); setStatusFilter(''); }} className="text-xs font-medium text-rose-500">Effacer</button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-accent-500/20"
                            />
                            <span className="text-zinc-400 text-xs">à</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-accent-500/20"
                            />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-accent-500/20"
                            >
                                <option value="">Tous les statuts</option>
                                <option value="present">Présent</option>
                                <option value="absent">Absent</option>
                                <option value="retard">Retard</option>
                            </select>
                        </div>
                    </div>

                    <PresenceTable presences={items} onDelete={onDelete} />

                    {loading ? (
                        <div className="px-6 py-10 text-sm text-zinc-600 animate-pulse">Chargement des données…</div>
                    ) : items.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <p className="text-sm text-zinc-500 font-medium italic">Aucun enregistrement trouvé pour ces critères.</p>
                        </div>
                    ) : null}
                </AdminCard>

                <PresenceFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={onSubmit}
                    employees={employees}
                    isLoading={submitting}
                />
            </AdminSection>
        </AdminGate>
    );
}

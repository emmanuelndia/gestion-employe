"use client";

import { useEffect, useState } from 'react';
import AdminSection from '@/components/shared/admin/AdminSection';
import AdminCard from '@/components/shared/admin/AdminCard';
import { CongeRow } from '@/components/features/admin/conges/types';
import { CalenderIcon, CheckCircleIcon, TimeIcon, XCircleIcon } from '@/icons';
import { API_BASE_URL } from '@/lib/api-config';

export default function UserDashboard() {
    const [user, setUser] = useState<any>(null);
    const [conges, setConges] = useState<CongeRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));

        const loadStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/conge/my-requests`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setConges(data || []);
                }
            } catch (e) {
                console.error("Erreur stats:", e);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    const stats = {
        total: conges.length,
        pending: conges.filter(c => c.status === 'en_attente').length,
        approved: conges.filter(c => c.status === 'accepte').length,
        rejected: conges.filter(c => c.status === 'refuse').length,
    };

    return (
        <AdminSection>
            <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Espace Employé
                </div>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
                    Bienvenue, {user?.name || 'Employé'} !
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Consultez vos statistiques et gérez vos demandes de congés.
                </p>
            </div>

            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Total demandes" 
                    value={stats.total} 
                    icon={<CalenderIcon className="w-5 h-5" />} 
                    color="bg-zinc-100 text-zinc-600" 
                />
                <StatCard 
                    title="En attente" 
                    value={stats.pending} 
                    icon={<TimeIcon className="w-5 h-5 text-amber-600" />} 
                    color="bg-amber-50 text-amber-600" 
                />
                <StatCard 
                    title="Acceptés" 
                    value={stats.approved} 
                    icon={<CheckCircleIcon className="w-5 h-5 text-emerald-600" />} 
                    color="bg-emerald-50 text-emerald-600" 
                />
                <StatCard 
                    title="Refusés" 
                    value={stats.rejected} 
                    icon={<XCircleIcon className="w-5 h-5 text-rose-600" />} 
                    color="bg-rose-50 text-rose-600" 
                />
            </div> */}

            <div className="mt-8">
                <AdminCard>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Dernière activité</h3>
                        {loading ? (
                            <p className="text-sm text-zinc-500 font-medium">Chargement...</p>
                        ) : conges.length > 0 ? (
                            <div className="space-y-4">
                                {conges.slice(0, 3).map(c => (
                                    <div key={c.id} className="flex items-center justify-between rounded-2xl border border-zinc-100 p-4">
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-900">{c.motif}</p>
                                            <p className="text-xs text-zinc-500">
                                                Du {new Date(c.date_debut).toLocaleDateString()} au {new Date(c.date_fin).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                                            c.status === 'en_attente' ? 'bg-amber-100 text-amber-700' :
                                            c.status === 'accepte' ? 'bg-emerald-100 text-emerald-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                            {c.status.replace('_', ' ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-zinc-500 font-medium italic">Aucune demande de congé enregistrée.</p>
                            </div>
                        )}
                    </div>
                </AdminCard>
            </div>
        </AdminSection>
    );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: any, color: string }) {
    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                    {icon}
                </div>
                <div>
                    <div className="text-sm font-medium text-zinc-500">{title}</div>
                    <div className="text-2xl font-bold text-zinc-900">{value}</div>
                </div>
            </div>
        </div>
    );
}

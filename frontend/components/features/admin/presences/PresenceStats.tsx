import React from 'react';

type PresenceStatsProps = {
    stats: {
        total: number;
        present: number;
        absent: number;
        retard: number;
    };
};

export default function PresenceStats({ stats }: PresenceStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard title="Total" value={stats.total} color="bg-zinc-100 text-zinc-900" />
            <StatCard title="Présents" value={stats.present} color="bg-emerald-100 text-emerald-700" />
            <StatCard title="Absents" value={stats.absent} color="bg-rose-100 text-rose-700" />
            <StatCard title="En retard" value={stats.retard} color="bg-amber-100 text-amber-700" />
        </div>
    );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
    return (
        <div className={`rounded-2xl p-4 border border-zinc-200 bg-white shadow-sm flex items-center justify-between`}>
            <div>
                <p className="text-xs font-semibold uppercase text-zinc-500 tracking-wider font-mono">{title}</p>
                <p className="text-2xl font-bold text-zinc-900">{value}</p>
            </div>
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}>
                 <span className="font-bold text-lg">{value}</span>
            </div>
        </div>
    );
}

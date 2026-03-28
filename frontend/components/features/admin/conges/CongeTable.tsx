import React from "react";
import { CongeRow } from "./types";
import CongeStatusBadge from "./CongeStatusBadge";

type CongeTableProps = {
  conges: CongeRow[];
  onUpdateStatus: (id: number, status: 'accepte' | 'refuse') => void;
};

export default function CongeTable({ conges, onUpdateStatus }: CongeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Employé</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Période</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Motif</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Statut</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {conges.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900">
                    {c.employee?.nom} {c.employee?.prenom}
                  </span>
                  <span className="text-xs text-zinc-500">{c.employee?.fonction}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col text-sm text-zinc-600">
                  <span>Du: {new Date(c.date_debut).toLocaleDateString("fr-FR")}</span>
                  <span>Au: {new Date(c.date_fin).toLocaleDateString("fr-FR")}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600 max-w-xs truncate" title={c.motif}>
                {c.motif}
              </td>
              <td className="px-6 py-4">
                <CongeStatusBadge status={c.status} />
              </td>
              <td className="px-6 py-4">
                {c.status === 'en_attente' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateStatus(c.id, 'accepte')}
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 transition-colors"
                      title="Accepter"
                    >
                      <i className="fa-solid fa-check" />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(c.id, 'refuse')}
                      className="inline-flex items-center justify-center rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Refuser"
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import { PresenceRow } from "./types";
import PresenceStatusBadge from "./PresenceStatusBadge";

type PresenceTableProps = {
  presences: PresenceRow[];
  onDelete: (id: number) => void;
};

export default function PresenceTable({ presences, onDelete }: PresenceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Employé</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Arrivée</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Départ</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Statut</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {presences.map((p) => (
            <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
              <td className="px-6 py-4 font-semibold text-zinc-900 border-l-4 border-l-transparent hover:border-l-accent-500">
                <div className="flex flex-col">
                    <span>{p.employee?.nom} {p.employee?.prenom}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Date: {new Date(p.date).toLocaleDateString("fr-FR")}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {p.date_arrivee ? new Date(p.date_arrivee).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : '—'}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {p.date_depart ? new Date(p.date_depart).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : '—'}
              </td>
              <td className="px-6 py-4">
                <PresenceStatusBadge status={p.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Supprimer"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

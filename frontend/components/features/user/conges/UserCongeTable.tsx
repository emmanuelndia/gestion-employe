import React from "react";
import { CongeRow } from "../../admin/conges/types";
import CongeStatusBadge from "../../admin/conges/CongeStatusBadge";

type UserCongeTableProps = {
  conges: CongeRow[];
};

export default function UserCongeTable({ conges }: UserCongeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Période</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Motif</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Statut</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Demandé le</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {conges.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col text-sm text-zinc-600">
                  <span>Du: {new Date(c.date_debut).toLocaleDateString("fr-FR")}</span>
                  <span>Au: {new Date(c.date_fin).toLocaleDateString("fr-FR")}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">
                {c.motif}
              </td>
              <td className="px-6 py-4">
                <CongeStatusBadge status={c.status} />
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 italic">
                {new Date(c.createdAt).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

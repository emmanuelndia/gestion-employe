import React from "react";
import type { EmployeeRow } from "./types";
import { sexeLabel } from "./types";
import SexeBadge from "./SexeBadge";

type EmployeesTableProps = {
  employees: EmployeeRow[];
  onEdit: (employee: EmployeeRow) => void;
  onDelete: (employeeId: string) => void;
};

export default function EmployeesTable({ employees, onEdit, onDelete }: EmployeesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-zinc-50">
          <tr className="border-b border-zinc-200">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Nom</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Prenom</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Sexe</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Date de naissance</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Contact</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Fonction</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {employees.map((e) => (
            <tr key={e.id} className="hover:bg-zinc-50/60">
              <td className="px-6 py-4 text-sm font-semibold text-zinc-900">{e.nom || "—"}</td>
              <td className="px-6 py-4 text-sm font-semibold text-zinc-900">{e.prenom || "—"}</td>
              <td className="px-6 py-4">
                <SexeBadge sexe={sexeLabel(e.sexe)} />
              </td>
              <td className="px-6 py-4 text-sm text-zinc-600">{e.date_naissance ? new Date(e.date_naissance).toLocaleDateString("fr-FR") : "—"}</td>
              <td className="px-6 py-4 text-sm text-zinc-600">{e.contact || "—"}</td>
              <td className="px-6 py-4 text-sm text-zinc-600">{e.fonction || "—"}</td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(e)}
                  title="Modifier"
                  className="mr-2 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(e.id)}
                  title="Supprimer"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors"
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
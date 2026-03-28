import React from "react";
import type { EmployeeSexe } from "./types";

type EmployeeFormModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
  nom: string;
  setNom: (v: string) => void;
  prenom: string;
  setPrenom: (v: string) => void;
  sexe: EmployeeSexe;
  setSexe: (v: EmployeeSexe) => void;
  date_naissance: string;
  setDate_naissance: (v: string) => void;
  contact: string;
  setContact: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  fonction: string;
  setFonction: (v: string) => void;
  isLoading?: boolean;
};

export default function EmployeeFormModal({
  title,
  isOpen,
  onClose,
  onSubmit,
  submitLabel,
  nom,
  setNom,
  prenom,
  setPrenom,
  sexe,
  setSexe,
  date_naissance,
  setDate_naissance,
  contact,
  setContact,
  email,
  setEmail,
  fonction,
  setFonction,
  isLoading = false,
}: EmployeeFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="text-lg font-semibold text-zinc-900">{title}</div>
        <fieldset disabled={isLoading} className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2 border-none p-0">
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          />
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prenom"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          />
          <select
            value={sexe}
            onChange={(e) => setSexe(e.target.value as EmployeeSexe)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          >
            <option value="HOMME">HOMME</option>
            <option value="FEMME">FEMME</option>
          </select>
          <input
            value={date_naissance}
            onChange={(e) => setDate_naissance(e.target.value)}
            placeholder="Date de naissance"
            type="date"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
          />
          <input
            value={fonction}
            onChange={(e) => setFonction(e.target.value)}
            placeholder="Fonction"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500 disabled:opacity-50"
          />
        </fieldset>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin" />
                Chargement...
              </>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

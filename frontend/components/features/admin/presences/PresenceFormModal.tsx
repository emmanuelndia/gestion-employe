import React, { useEffect, useState } from "react";
import { EmployeeRow } from "../employees/types";
import { PresenceStatus } from "./types";

type PresenceFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { employeeId: number; date: string; date_arrivee?: string; date_depart?: string; status: PresenceStatus }) => void;
  employees: EmployeeRow[];
  isLoading?: boolean;
};

const PresenceFormModal: React.FC<PresenceFormModalProps> = ({ isOpen, onClose, onSubmit, employees, isLoading }) => {
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [date, setDate] = useState('');
  const [dateArrivee, setDateArrivee] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [status, setStatus] = useState<PresenceStatus>('present');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const formatDateTime = (date: Date) => date.toISOString().slice(0, 16);
      const formatDate = (date: Date) => date.toISOString().slice(0, 10);
      
      setDate(formatDate(now));
      setDateArrivee(formatDateTime(now));
      
      const later = new Date(now);
      later.setHours(later.getHours() + 8);
      setDateDepart(formatDateTime(later));
      
      if (employees.length > 0) setEmployeeId(Number(employees[0].id));
    }
  }, [isOpen, employees]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
        employeeId: Number(employeeId),
        date: new Date(date).toISOString(),
        status
    };

    if (status !== 'absent') {
        payload.date_arrivee = new Date(dateArrivee).toISOString();
        payload.date_depart = new Date(dateDepart).toISOString();
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-zinc-100">
        <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">Noter une présence</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Employé</label>
            <select
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(Number(e.target.value))}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
            >
              <option value="">Sélectionner un employé</option>
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.nom} {e.prenom}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Jour</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Statut</label>
            <select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value as PresenceStatus)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
            >
              <option value="present">Présent</option>
              <option value="absent">Absent</option>
              <option value="retard">En retard</option>
            </select>
          </div>

          {status !== 'absent' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Arrivée</label>
                <input
                  type="datetime-local"
                  required
                  value={dateArrivee}
                  onChange={(e) => setDateArrivee(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 ml-1">Départ</label>
                <input
                  type="datetime-local"
                  required
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition-all focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10"
                />
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-zinc-200 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-2xl bg-zinc-900 py-2.5 text-sm font-bold text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {isLoading ? 'Enregistrement...' : 'Valider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PresenceFormModal;

import React from "react";

type CongeFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date_debut: string; date_fin: string; motif: string }) => void;
  isLoading?: boolean;
};

const CongeFormModal: React.FC<CongeFormModalProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [dateDebut, setDateDebut] = React.useState('');
  const [dateFin, setDateFin] = React.useState('');
  const [motif, setMotif] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date_debut: dateDebut, date_fin: dateFin, motif });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h3 className="text-xl font-bold text-zinc-900 mb-4">Demander un congé</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Date de début</label>
            <input
              type="date"
              required
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Date de fin</label>
            <input
              type="date"
              required
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Motif</label>
            <textarea
              required
              rows={3}
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Raison de votre demande..."
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 outline-none ring-offset-2 focus:ring-2 focus:ring-accent-500 resize-none"
            />
          </div>
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
              {isLoading ? 'Envoi...' : 'Soumettre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CongeFormModal;

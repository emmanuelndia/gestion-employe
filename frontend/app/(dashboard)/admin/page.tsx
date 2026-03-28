// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Administration
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Bienvenue dans l'espace d'administration.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-medium text-zinc-800">C'est ici que s'afficheront vos statistiques d'employés</h2>
        <p className="mt-2 text-zinc-500">Sélectionnez une option dans la barre latérale pour commencer.</p>
      </div>
    </div>
  );
}
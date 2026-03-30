"use client";

import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const Swal = (await import('sweetalert2')).default;

      const result = await Swal.fire({
        title: 'Déconnexion',
        text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, me déconnecter',
        cancelButtonText: 'Annuler',
      });

      if (result.isConfirmed) {
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        await Swal.fire({
          icon: 'success',
          title: 'Déconnecté',
          text: 'Vous avez été déconnecté avec succès',
          timer: 2000,
          showConfirmButton: false,
        });

        router.push('/login');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la déconnexion',
      });
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
    >
      Se déconnecter
    </button>
  );
}

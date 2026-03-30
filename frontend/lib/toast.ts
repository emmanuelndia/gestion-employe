// Import dynamique pour éviter le crash SSR/prerendering de Next.js
// (sweetalert2 utilise des APIs browser non disponibles côté serveur)

type ToastIcon = "success" | "error" | "warning" | "info" | "question";

type ToastOptions = {
  title: string;
  text?: string;
  timer?: number;
};

const fireToast = async (icon: ToastIcon, { title, text, timer = 3000 }: ToastOptions) => {
  const Swal = (await import("sweetalert2")).default;
  return Swal.fire({
    icon,
    title,
    text,
    position: "top",
    timer,
    showConfirmButton: false,
    toast: true,
    customClass: { container: "z-[999999]" },
  });
};

export const toast = {
  success: (options: ToastOptions) => fireToast("success", options),
  error: (options: ToastOptions) => fireToast("error", options),
  warning: (options: ToastOptions) => fireToast("warning", options),
  info: (options: ToastOptions) => fireToast("info", options),
};

// Helper pour les confirmations Swal (aussi en import dynamique)
export const confirmDialog = async (options: {
  title: string;
  text?: string;
  icon?: "warning" | "question" | "error";
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
}) => {
  const Swal = (await import("sweetalert2")).default;
  return Swal.fire({
    showCancelButton: true,
    cancelButtonText: "Annuler",
    ...options,
  });
};

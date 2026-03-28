export type EmployeeSexe = "HOMME" | "FEMME";

export type EmployeeRow = {
  id: string;
  nom: string | null;
  prenom: string | null;
  sexe: string | null;
  date_naissance: string | null;
  contact: string | null;
  email: string | null;
  fonction: string | null;
  createdAt: string;
  updatedAt: string;
};

export const sexeLabel = (sexe: string | null): EmployeeSexe => {
  const r = String(sexe || "").toUpperCase();
  if (r === "HOMME") return "HOMME";
  return "FEMME";
};

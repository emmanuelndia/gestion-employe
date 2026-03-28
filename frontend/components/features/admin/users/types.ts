export type UserRole = "USER" | "ADMIN";

export type UserRow = {
  id: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const roleLabel = (role: string): UserRole => {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN") return "ADMIN";
  return "USER";
};

import React from "react";
import type { EmployeeSexe } from "./types";

type SexeBadgeProps = {
  sexe: EmployeeSexe;
};

export default function SexeBadge({ sexe }: SexeBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800 ring-1 ring-zinc-200">
      {sexe}
    </span>
  );
}

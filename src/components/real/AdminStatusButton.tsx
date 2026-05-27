"use client";

import { useFormStatus } from "react-dom";
import { Check, Flag, X } from "lucide-react";

export function AdminStatusButton({
  label,
  icon,
  tone,
}: {
  label: string;
  icon: "check" | "x" | "flag";
  tone: "confirm" | "decline" | "neutral";
}) {
  const { pending } = useFormStatus();
  const Icon = icon === "check" ? Check : icon === "x" ? X : Flag;
  const classes = {
    confirm: "bg-emerald-600 text-white hover:bg-emerald-700",
    decline: "border border-red-100 bg-red-50 text-red-700 hover:bg-red-100",
    neutral: "w-full bg-slate-100 text-slate-700 hover:bg-slate-200",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex min-h-10 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-black transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 ${classes[tone]}`}
    >
      <Icon className="h-4 w-4" />
      {pending ? "Atualizando..." : label}
    </button>
  );
}

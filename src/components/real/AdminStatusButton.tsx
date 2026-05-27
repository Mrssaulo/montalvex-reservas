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
    confirm: "bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg",
    decline: "border border-red-100 bg-red-50 text-red-700 hover:bg-red-100 hover:shadow-md",
    neutral: "w-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-black transition duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 ${classes[tone]}`}
    >
      <Icon className="h-4 w-4" />
      {pending ? "Atualizando..." : label}
    </button>
  );
}

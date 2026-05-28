"use client";

import { useFormStatus } from "react-dom";
import { X } from "lucide-react";

export function ArchiveHistoryButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm("Ocultar esta reserva do histórico?")) {
          event.preventDefault();
        }
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
      aria-label="Ocultar do histórico"
      title="Ocultar do histórico"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

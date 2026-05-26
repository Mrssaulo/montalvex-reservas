"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Flag,
  MessageSquareText,
  Sparkles,
  Table2,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { bistroTheme } from "@/config/theme";
import { mockReservations } from "@/lib/mock-data";
import type { Reservation, ReservationStatus } from "@/lib/types";

const receivedNowReservation: Reservation = {
  id: "demo-recebida-agora",
  nome: "Mariana Costa",
  telefone: "(11) 95555-2026",
  pessoas: 4,
  data: "26/05",
  horario: "20:00",
  observacao: "Aniversário. Preferência por uma mesa mais reservada.",
  status: "pendente",
};

const statusStyles: Record<ReservationStatus, { bg: string; text: string; label: string }> = {
  pendente: { bg: "#FEF3C7", text: "#92400E", label: "Pendente" },
  confirmada: { bg: "#D1FAE5", text: "#065F46", label: "Confirmada" },
  recusada: { bg: "#FEE2E2", text: "#991B1B", label: "Recusada" },
  finalizada: { bg: "#E5E7EB", text: "#374151", label: "Finalizada" },
};

const feedbackCopy: Partial<Record<ReservationStatus, string>> = {
  confirmada: "Reserva confirmada. Mesa entrando na preparação.",
  recusada: "Reserva recusada. Painel atualizado.",
  finalizada: "Atendimento finalizado. Histórico limpo para o salão.",
};

const staffAiAnswers: Record<string, string> = {
  "Resumo do dia": "Resumo do jantar: 4 reservas e 16 pessoas previstas. Há reservas pendentes que ainda precisam de confirmação da equipe.",
  "Horário de pico": "Pico previsto: 20h às 21h. Vale deixar recepção e cozinha alinhadas antes desse intervalo.",
  "Observações importantes": "Atenção: há 1 aniversário e 1 grupo maior. Essas observações ajudam a preparar melhor a experiência.",
  "Sugestão para o salão": "Sugestão: preparar mesa reservada antes das 20h30 e confirmar os grupos pendentes com antecedência.",
};

export default function PanelClient() {
  const [reservations, setReservations] = useState<Reservation[]>([receivedNowReservation, ...mockReservations]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ id: string; status: ReservationStatus; text: string } | null>(null);
  const [staffPrompt, setStaffPrompt] = useState("Resumo do dia");

  const pendentes = useMemo(() => reservations.filter((reservation) => reservation.status === "pendente"), [reservations]);
  const confirmadas = useMemo(() => reservations.filter((reservation) => reservation.status === "confirmada"), [reservations]);
  const pessoasConfirmadas = useMemo(() => confirmadas.reduce((sum, reservation) => sum + reservation.pessoas, 0), [confirmadas]);
  const nextArrival = confirmadas[0];

  function updateStatus(id: string, newStatus: ReservationStatus) {
    const reduceMotion = prefersReducedMotion();
    const feedbackMs = reduceMotion ? 0 : 1200;
    const exitMs = reduceMotion ? 0 : 350;

    setFeedback({ id, status: newStatus, text: feedbackCopy[newStatus] ?? "Painel atualizado." });

    window.setTimeout(() => {
      setExitingIds((current) => new Set(current).add(id));

      window.setTimeout(() => {
        setReservations((current) => {
          if (newStatus === "recusada" || newStatus === "finalizada") {
            return current.filter((reservation) => reservation.id !== id);
          }

          return current.map((reservation) =>
            reservation.id === id ? { ...reservation, status: newStatus } : reservation,
          );
        });

        setExitingIds((current) => {
          const next = new Set(current);
          next.delete(id);
          return next;
        });
        setFeedback(null);
      }, exitMs);
    }, feedbackMs);
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-lg" style={{ background: bistroTheme.colors.primary }}>
              <span className="font-serif-bistro font-bold">{bistroTheme.initials}</span>
            </div>
            <div>
              <h1 className="font-black">{bistroTheme.name}</h1>
              <p className="text-xs font-semibold text-slate-500">Painel da equipe · Terça, 26 de maio · jantar</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 sm:flex">
            <span className="pulse-dot" />
            Sistema online
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <section className="reveal-up mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Chegou no painel</p>
                <h2 className="mt-1 text-2xl font-black">Nova solicitação recebida agora</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  O cliente solicitou pelo celular. A equipe controla horários, grupos e status para deixar a operação previsível no horário de pico.
                </p>
              </div>
              <Link href="/demo/reserva" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                Voltar para experiência do cliente
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Table2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Mesa preparada</p>
                <h2 className="mt-1 font-black text-emerald-950">
                  {nextArrival ? `${nextArrival.horario} · ${nextArrival.nome}` : "Aguardando confirmação"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  {nextArrival ? `${nextArrival.pessoas} pessoas. Equipe alinhada antes do grupo chegar.` : "Confirme uma reserva para preparar a próxima chegada."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal-up mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Calendar} label="Reservas hoje" value={reservations.length} helper="Agenda do jantar" />
          <Kpi icon={Users} label="Pessoas previstas" value={pessoasConfirmadas} helper="Somando confirmadas" />
          <Kpi icon={Clock} label="Pendentes" value={pendentes.length} helper="Aguardando ação" tone="amber" />
          <Kpi icon={Check} label="Confirmadas" value={confirmadas.length} helper="Mesas garantidas" tone="emerald" />
        </section>

        <StaffAiAssistant pendentes={pendentes.length} activePrompt={staffPrompt} onPromptChange={setStaffPrompt} />

        {feedback ? (
          <div className="toast-feedback fixed right-5 top-24 z-50 max-w-sm rounded-lg border border-slate-200 bg-white p-4 text-sm font-black text-slate-800 shadow-2xl" role="status" aria-live="polite">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            {feedback.text}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <ReservationColumn
            title="Aguardando confirmação"
            count={pendentes.length}
            reservations={pendentes}
            empty="Nenhuma reserva pendente. A recepção pode respirar."
            accent="border-l-amber-400"
            exitingIds={exitingIds}
            feedback={feedback}
            onUpdate={updateStatus}
          />
          <ReservationColumn
            title="Confirmadas para hoje"
            count={confirmadas.length}
            reservations={confirmadas}
            empty="Nenhuma reserva confirmada ainda."
            accent="border-l-emerald-400"
            exitingIds={exitingIds}
            feedback={feedback}
            onUpdate={updateStatus}
          />
        </div>

        <footer className="py-10 text-center text-xs font-semibold text-slate-400">
          Tecnologia por <span className="text-slate-600">Montalvex</span>
        </footer>
      </div>

      <Link href="/demo" className="fab-back focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <ArrowLeft className="h-4 w-4" />
        Hub comercial
      </Link>
    </main>
  );
}

function Kpi({ icon: Icon, label, value, helper, tone = "slate" }: { icon: LucideIcon; label: string; value: number; helper: string; tone?: "slate" | "amber" | "emerald" }) {
  const toneClasses = {
    slate: "border-slate-200 bg-white text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };

  return (
    <article className={`kpi-card rounded-lg border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${toneClasses[tone]}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-wide opacity-75">{label}</span>
        <Icon className="h-5 w-5 opacity-60" />
      </div>
      <p key={value} className="number-pop text-4xl font-black tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-semibold opacity-70">{helper}</p>
    </article>
  );
}

function StaffAiAssistant({
  pendentes,
  activePrompt,
  onPromptChange,
}: {
  pendentes: number;
  activePrompt: string;
  onPromptChange: (prompt: string) => void;
}) {
  return (
    <section className="reveal-up mb-7 overflow-hidden rounded-lg border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-emerald-50 p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-emerald-600 text-white shadow-lg">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-black">Assistente IA da equipe</h2>
                <span className="rounded-full bg-violet-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-violet-700">
                  IA demonstrativa
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Apoio inteligente para a equipe nos planos com IA. Respostas simuladas, sem automação ativa.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(staffAiAnswers).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onPromptChange(prompt)}
                className={`rounded-full border px-3 py-1.5 text-xs font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  activePrompt === prompt
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-200 bg-white text-violet-800 hover:bg-violet-50"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white bg-white/85 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-violet-700">
              <span className="pulse-dot" />
              resumo simulado
            </p>
            <p className="text-xs font-bold text-slate-500">{pendentes} pendentes</p>
          </div>
          <div className="space-y-2">
            <PanelBubble>Resumo do jantar: 4 reservas e 16 pessoas previstas.</PanelBubble>
            <PanelBubble>Pico previsto: 20h às 21h.</PanelBubble>
            <PanelBubble>Atenção: há 1 aniversário e 1 grupo maior.</PanelBubble>
            <PanelBubble>Sugestão: preparar mesa reservada antes das 20h30.</PanelBubble>
            <PanelBubble>Há {pendentes} reservas aguardando confirmação.</PanelBubble>
            <PanelBubble highlight>{staffAiAnswers[activePrompt]}</PanelBubble>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelBubble({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl px-3 py-2 text-xs leading-5 ${highlight ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700"}`}>
      {children}
    </div>
  );
}

function ReservationColumn({
  title,
  count,
  reservations,
  empty,
  accent,
  exitingIds,
  feedback,
  onUpdate,
}: {
  title: string;
  count: number;
  reservations: Reservation[];
  empty: string;
  accent: string;
  exitingIds: Set<string>;
  feedback: { id: string; status: ReservationStatus; text: string } | null;
  onUpdate: (id: string, status: ReservationStatus) => void;
}) {
  return (
    <section className="reveal-up">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <span className={title.includes("Aguardando") ? "h-2.5 w-2.5 rounded-full bg-amber-500" : "h-2.5 w-2.5 rounded-full bg-emerald-500"} />
          {title}
        </h2>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
          {count} {count === 1 ? "reserva" : "reservas"}
        </span>
      </div>

      <div className="space-y-3">
        {reservations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-400">
            {empty}
          </div>
        ) : (
          reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              accent={accent}
              exiting={exitingIds.has(reservation.id)}
              feedback={feedback?.id === reservation.id ? feedback : null}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </section>
  );
}

function ReservationCard({
  reservation,
  accent,
  exiting,
  feedback,
  onUpdate,
}: {
  reservation: Reservation;
  accent: string;
  exiting: boolean;
  feedback: { id: string; status: ReservationStatus; text: string } | null;
  onUpdate: (id: string, status: ReservationStatus) => void;
}) {
  const status = statusStyles[feedback?.status ?? reservation.status];
  const isPending = reservation.status === "pendente";
  const isNew = reservation.id === receivedNowReservation.id;

  return (
    <article className={`reservation-card rounded-lg border border-l-4 border-slate-200 bg-white p-5 card-shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl ${accent} ${isNew ? "ring-2 ring-amber-300/70" : ""} ${feedback ? "reservation-feedback" : ""} ${exiting ? "reservation-exit" : "animate-fade-in"}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black">{reservation.nome}</h3>
            {isNew ? (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-amber-800">
                Recebida agora
              </span>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-slate-500">{reservation.telefone}</p>
        </div>
        <span className="status-pill" style={{ background: status.bg, color: status.text }}>
          {status.label}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-slate-600">
        <span>{reservation.pessoas} pessoas</span>
        <span>{reservation.data}</span>
        <span>{reservation.horario}</span>
      </div>

      {reservation.observacao ? (
        <p className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm italic text-slate-700">
          “{reservation.observacao}”
        </p>
      ) : null}

      {feedback ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-black text-emerald-800" role="status">
          {feedback.text}
        </div>
      ) : null}

      {isPending ? (
        <div className="flex gap-2">
          <button type="button" onClick={() => onUpdate(reservation.id, "confirmada")} disabled={exiting || Boolean(feedback)} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            <Check className="h-4 w-4" />
            Confirmar
          </button>
          <button type="button" onClick={() => onUpdate(reservation.id, "recusada")} disabled={exiting || Boolean(feedback)} className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-black text-red-700 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
            <X className="h-4 w-4" />
            Recusar
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => onUpdate(reservation.id, "finalizada")} disabled={exiting || Boolean(feedback)} className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 text-sm font-black text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-200 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">
          <Flag className="h-4 w-4" />
          Marcar como finalizada
        </button>
      )}
    </article>
  );
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

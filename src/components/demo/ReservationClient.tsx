"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  Clock,
  Home,
  LayoutDashboard,
  MessageSquareText,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { bistroTheme } from "@/config/theme";
import { timeSlots } from "@/lib/mock-data";

type Step = "form" | "success";

const peopleOptions = ["2 pessoas", "3 pessoas", "4 pessoas", "5 pessoas", "6 pessoas", "7+ pessoas"];

const quickAnswers: Record<string, string> = {
  "Reserva para aniversário":
    "Perfeito. Informe no campo de observações que é aniversário para a equipe preparar uma mesa mais reservada.",
  "Grupo grande":
    "Para grupos maiores, a equipe poderá confirmar a disponibilidade pelo painel antes da chegada.",
  "Preferência de mesa":
    "Você pode escrever sua preferência no campo de observações. A equipe verá essa informação no painel.",
  "Horários disponíveis":
    "Escolha um dos horários exibidos na tela. A equipe confirma a reserva pelo painel.",
};

export default function ReservationClient() {
  const [step, setStep] = useState<Step>("form");
  const [selectedTime, setSelectedTime] = useState("19:30");
  const [protocol, setProtocol] = useState("MV-4827");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    pessoas: "2 pessoas",
    data: "",
    observacao: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setProtocol(`MV-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep("success");
      setAiOpen(false);
      setSelectedPrompt(null);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, prefersReducedMotion() ? 0 : 260);
  }

  function resetForm() {
    setStep("form");
    setSelectedTime("19:30");
    setAiOpen(false);
    setSelectedPrompt(null);
    setFormData({ nome: "", telefone: "", pessoas: "2 pessoas", data: "", observacao: "" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:py-8" style={{ background: `linear-gradient(135deg, ${bistroTheme.colors.primary} 0%, ${bistroTheme.colors.primaryLight} 100%)` }}>
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="reveal-up relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/20 shadow-2xl shadow-black/35" style={{ background: bistroTheme.colors.bg, color: bistroTheme.colors.text }}>
        <header className="relative overflow-hidden" style={{ background: bistroTheme.colors.primary, color: bistroTheme.colors.bg }}>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
          <div className="relative px-6 py-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-xl">
              <Home className="h-8 w-8" strokeWidth={1.6} />
            </div>
            <h1 className="font-serif-bistro text-3xl font-bold">{bistroTheme.name}</h1>
            <p className="mt-2 text-sm opacity-85">Reserva de mesa com confirmação da equipe</p>
          </div>
        </header>

        <div className="border-b px-5 py-4" style={{ borderColor: bistroTheme.colors.border }}>
          <StepIndicator current={step === "success" ? 3 : 2} />
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className={`space-y-4 p-5 transition duration-300 ${isSubmitting ? "scale-[0.985] opacity-80" : ""}`}>
            <div className="rounded-lg border p-4" style={{ borderColor: bistroTheme.colors.border, background: bistroTheme.colors.surfaceSoft }}>
              <div className="flex items-start gap-3">
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: bistroTheme.colors.primary }} />
                <p className="text-sm leading-6" style={{ color: bistroTheme.colors.muted }}>
                  Escolha o melhor horário. A equipe recebe sua solicitação no painel e poderá confirmar a mesa.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <Field label="Nome completo" icon={UserRound}>
                <input required type="text" value={formData.nome} onChange={(event) => setFormData({ ...formData, nome: event.target.value })} className="w-full bg-transparent py-1 text-base font-semibold outline-none" placeholder="Como podemos te chamar?" />
              </Field>

              <Field label="Telefone para contato" icon={Home}>
                <input required type="tel" value={formData.telefone} onChange={(event) => setFormData({ ...formData, telefone: event.target.value })} className="w-full bg-transparent py-1 text-base font-semibold outline-none" placeholder="(11) 99999-9999" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Pessoas">
                <select value={formData.pessoas} onChange={(event) => setFormData({ ...formData, pessoas: event.target.value })} className="w-full bg-transparent py-1 text-base font-semibold outline-none">
                  {peopleOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </Field>
              <Field label="Data">
                <input required type="date" value={formData.data} onChange={(event) => setFormData({ ...formData, data: event.target.value })} className="w-full bg-transparent py-1 text-base font-semibold outline-none" />
              </Field>
            </div>

            <Field label="Horário" icon={Clock}>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                    className={`time-slot min-h-12 rounded-lg border px-2 text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedTime === time ? "selected shadow-lg" : "bg-white hover:-translate-y-0.5 hover:bg-stone-50"}`}
                    style={{ borderColor: selectedTime === time ? bistroTheme.colors.primary : bistroTheme.colors.border }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs font-semibold" style={{ color: bistroTheme.colors.muted }}>
                Horário selecionado: <span style={{ color: bistroTheme.colors.primary }}>{selectedTime}</span>
              </p>
            </Field>

            <Field label="Observações">
              <textarea rows={3} value={formData.observacao} onChange={(event) => setFormData({ ...formData, observacao: event.target.value })} className="w-full resize-none bg-transparent py-1 text-sm outline-none" placeholder="Aniversário, restrições alimentares, preferência de mesa..." />
            </Field>

            <button type="submit" className="cta-glow min-h-13 w-full rounded-lg font-black text-white shadow-xl transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" disabled={isSubmitting} style={{ background: bistroTheme.colors.accent }}>
              {isSubmitting ? "Enviando solicitação..." : "Enviar solicitação de reserva"}
            </button>
          </form>
        ) : (
          <div className="animate-fade-in p-7 text-center">
            <div className="success-ring mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: bistroTheme.colors.primary }}>
              <Check className="h-10 w-10" style={{ color: bistroTheme.colors.bg }} strokeWidth={3} />
            </div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Chegou no painel da equipe
            </div>
            <h2 className="font-serif-bistro text-3xl font-bold" style={{ color: bistroTheme.colors.primary }}>Reserva recebida</h2>
            <p className="mt-2 text-sm leading-6" style={{ color: bistroTheme.colors.muted }}>
              A equipe recebeu sua solicitação no painel e poderá confirmar a mesa.
            </p>

            <div className="my-6 rounded-lg border bg-white p-5 text-left shadow-lg" style={{ borderColor: bistroTheme.colors.border }}>
              <div className="mb-4 flex items-center justify-between border-b pb-4" style={{ borderColor: bistroTheme.colors.border }}>
                <span className="text-xs font-black uppercase tracking-wide" style={{ color: bistroTheme.colors.muted }}>Protocolo</span>
                <span className="font-mono text-lg font-black" style={{ color: bistroTheme.colors.primary }}>#{protocol}</span>
              </div>
              <div className="space-y-3 text-sm">
                <Summary label="Pessoas" value={formData.pessoas} />
                <Summary label="Horário" value={selectedTime} />
                <div className="flex items-center justify-between">
                  <span style={{ color: bistroTheme.colors.muted }}>Status</span>
                  <span className="status-pill bg-amber-100 text-amber-800">Aguardando confirmação</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Link href="/demo/painel" className="cta-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ background: bistroTheme.colors.primary }}>
                <LayoutDashboard className="h-4 w-4" />
                Ver no painel da equipe
              </Link>

              <button type="button" onClick={resetForm} className="font-black underline underline-offset-4 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ color: bistroTheme.colors.accent }}>
                Fazer nova reserva
              </button>
            </div>
          </div>
        )}

        <footer className="border-t py-5 text-center" style={{ borderColor: bistroTheme.colors.border }}>
          <p className="text-xs" style={{ color: bistroTheme.colors.muted }}>Tecnologia por <span className="font-bold">Montalvex</span></p>
        </footer>
      </div>

      {step === "success" ? (
        <div className="fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-3 sm:right-6">
          {aiOpen ? (
            <ClientAiPreview selectedPrompt={selectedPrompt} onSelect={setSelectedPrompt} onClose={() => setAiOpen(false)} />
          ) : null}
          <button
            type="button"
            onClick={() => setAiOpen((current) => !current)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-slate-950 px-4 text-sm font-black text-white shadow-2xl transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-expanded={aiOpen}
          >
            <MessageSquareText className="h-4 w-4 text-violet-300" />
            IA do restaurante
          </button>
        </div>
      ) : null}

      <Link href="/demo" className="fab-back focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <ArrowLeft className="h-4 w-4" />
        Hub comercial
      </Link>
    </main>
  );
}

function ClientAiPreview({
  selectedPrompt,
  onSelect,
  onClose,
}: {
  selectedPrompt: string | null;
  onSelect: (prompt: string) => void;
  onClose: () => void;
}) {
  return (
    <aside className="animate-fade-in w-[min(340px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-slate-950 p-4 text-left text-white shadow-2xl" aria-label="Prévia da IA do restaurante">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-violet-400/12 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-violet-200">
            <Zap className="h-3.5 w-3.5" />
            IA demonstrativa
          </p>
          <h3 className="mt-2 text-sm font-black">Prévia da IA</h3>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Fechar prévia da IA">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <ChatBubble>Olá! Posso ajudar com dúvidas sobre reserva, grupos e observações importantes.</ChatBubble>
        <ChatBubble>A confirmação final da mesa continua sendo feita pela equipe do restaurante.</ChatBubble>
        <ChatBubble>Você pode informar aniversário, preferência de mesa ou restrição alimentar na observação.</ChatBubble>
        {selectedPrompt ? (
          <>
            <ChatBubble align="user">{selectedPrompt}</ChatBubble>
            <ChatBubble>{quickAnswers[selectedPrompt]}</ChatBubble>
          </>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(quickAnswers).map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-bold text-slate-100 transition hover:bg-white/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {prompt}
          </button>
        ))}
      </div>

      <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-slate-400">
        Nos planos com IA, a conversa acontece de forma natural e contextual, sem botões rápidos.
      </p>
    </aside>
  );
}

function ChatBubble({ children, align = "assistant" }: { children: React.ReactNode; align?: "assistant" | "user" }) {
  return (
    <div className={`rounded-2xl px-3 py-2 text-xs leading-5 ${align === "user" ? "ml-8 bg-emerald-400 text-slate-950" : "mr-8 bg-white/10 text-slate-100"}`}>
      {children}
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  const steps = ["Dados", "Horário", "Confirmação"];

  return (
    <ol className="grid grid-cols-3 gap-2 text-xs font-black">
      {steps.map((label, index) => {
        const number = index + 1;
        const active = number <= current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs" style={{ background: active ? bistroTheme.colors.primary : bistroTheme.colors.surfaceSoft, color: active ? bistroTheme.colors.bg : bistroTheme.colors.muted }}>
              {active && number === 3 ? <Check className="h-3.5 w-3.5" /> : number}
            </span>
            <span style={{ color: active ? bistroTheme.colors.primary : bistroTheme.colors.muted }}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon?: typeof Home; children: React.ReactNode }) {
  return (
    <label className="field-card block rounded-lg border bg-white p-4 card-shadow transition hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald-900/20" style={{ borderColor: bistroTheme.colors.border }}>
      <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide" style={{ color: bistroTheme.colors.muted }}>
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {label}
      </span>
      {children}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span style={{ color: bistroTheme.colors.muted }}>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

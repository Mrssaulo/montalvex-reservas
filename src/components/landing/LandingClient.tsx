"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  PhoneCall,
  Sparkles,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";
import type { PricingMode } from "@/lib/types";

const flow = [
  ["1", "Cliente acessa o link", "Instagram, Google, QR code ou cardapio levam para a reserva do restaurante."],
  ["2", "Escolhe data e horario", "Pessoas, observacoes e horario entram de forma organizada."],
  ["3", "Recebe protocolo", "O cliente guarda o codigo e acompanha o status com telefone."],
  ["4", "Equipe controla", "O painel mostra pendentes, confirmadas, finalizadas e historico."],
  ["5", "Status fica claro", "Confirmada, recusada ou finalizada: todo mundo enxerga a mesma verdade."],
];

const painPoints = [
  [PhoneCall, "Reserva perdida no WhatsApp", "A conversa some, o print fica para depois e a equipe descobre tarde demais."],
  [Clock, "Cliente esperando resposta", "Sem protocolo ou status, ele nao sabe se a mesa esta realmente encaminhada."],
  [Users, "Grupo chegando sem mesa", "Aniversario, restricao e quantidade de pessoas precisam aparecer antes do pico."],
  [History, "Sem historico confiavel", "Caderno e planilha nao mostram recusadas, finalizadas e pendencias antigas com clareza."],
] satisfies Array<[LucideIcon, string, string]>;

const aiItems = [
  "Resumo do jantar",
  "Horario de pico",
  "Aniversarios e observacoes",
  "Sugestoes para o salao",
];

export default function LandingClient() {
  const [mode, setMode] = useState<PricingMode>("prospeccao");
  const pricesHidden = mode === "prospeccao";

  return (
    <main className="min-h-screen overflow-hidden bg-[#10251d] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10251d]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDFBF7] text-[#1B4332] shadow-lg">
              <Calendar className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-black">
              Montalvex <span className="text-emerald-200">Reservas</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <PriceToggle mode={mode} onChange={setMode} compact />
            <Link href="/demo" className="cta-glow inline-flex min-h-10 items-center rounded-lg bg-[#C06C58] px-4 text-sm font-black text-white transition hover:-translate-y-0.5">
              Ver demo
            </Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.88fr_1.12fr] md:items-center md:py-20">
        <div className="reveal-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-100">
            <span className="pulse-dot" />
            Sistema de reservas para restaurantes
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            O cliente reserva pelo celular. A equipe confirma no painel.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/80">
            Um link proprio para o restaurante receber solicitacoes, gerar protocolo para o cliente e controlar cada status sem depender de caderno, print ou mensagem perdida.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="cta-glow inline-flex min-h-13 items-center justify-center rounded-lg bg-[#C06C58] px-7 font-black text-white shadow-xl transition hover:-translate-y-0.5">
              Ver fluxo comercial
            </Link>
            <a href="#planos" className="inline-flex min-h-13 items-center justify-center rounded-lg border border-white/20 bg-white/8 px-7 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/12">
              Conhecer planos
            </a>
          </div>
        </div>

        <ProductHero />
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C06C58]">Fluxo real</p>
            <h2 className="text-3xl font-black md:text-4xl">Da solicitacao ao salao, tudo fica visivel.</h2>
            <p className="mt-4 leading-7 text-[#6B7280]">
              O cliente faz a reserva pelo celular, recebe um protocolo e a equipe controla cada status pelo painel.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {flow.map(([number, title, text]) => (
              <article key={title} className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1B4332] text-sm font-black text-white">
                  {number}
                </span>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-[#1F2937]">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#1B4332]">Acompanhamento publico</p>
            <h2 className="text-3xl font-black md:text-4xl">O cliente nao fica perdido esperando resposta.</h2>
            <p className="mt-4 leading-7 text-[#6B7280]">
              Com protocolo e telefone, ele consulta se a reserva segue pendente, foi confirmada, recusada ou finalizada.
            </p>
          </div>
          <TrackingPreview />
        </div>
      </section>

      <section className="bg-[#F5F1E8] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#1B4332]">Painel da equipe</p>
              <h2 className="text-3xl font-black md:text-4xl">Veja quem esta chegando e o que ja foi resolvido.</h2>
            </div>
            <p className="leading-7 text-[#6B7280]">
              Confirme grupos antes do horario de pico, separe reservas finalizadas e recusadas no historico e evite reserva perdida no improviso.
            </p>
          </div>
          <PanelStory />
        </div>
      </section>

      <section className="bg-[#10251d] px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-200/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-violet-100">
              <Sparkles className="h-3.5 w-3.5" />
              IA demonstrativa
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">IA como apoio para cliente e equipe</h2>
            <p className="mt-4 leading-7 text-emerald-50/75">
              Disponivel nos planos com IA: apoio inteligente, respostas simuladas e resumos operacionais. A equipe continua no controle da confirmacao.
            </p>
          </div>
          <AiPreview />
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C06C58]">Dores da operacao</p>
              <h2 className="text-3xl font-black md:text-4xl">Menos caderno, menos print, mais previsibilidade.</h2>
            </div>
            <p className="leading-7 text-[#6B7280]">
              O sistema organiza o basico que mais atrapalha a noite cheia: pedido espalhado, cliente sem retorno, grupo sem mesa e equipe sem visao do pico.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {painPoints.map(([Icon, title, text]) => (
              <article key={title} className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-[#C06C58]" />
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="bg-[#10251d] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-200">Planos</p>
            <h2 className="text-3xl font-black md:text-4xl">Planos conectados ao jeito real de operar reservas</h2>
            <p className="mx-auto mt-3 max-w-2xl text-emerald-50/75">
              {pricesHidden
                ? "Solicite uma proposta. O valor varia conforme operacao, unidades, IA e nivel de suporte."
                : "Valores de referencia para implantacao e mensalidade, mantendo os planos atuais."}
            </p>
          </div>
          <div className="mb-8 flex justify-center">
            <PriceToggle mode={mode} onChange={setMode} />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.id} className={`rounded-lg border p-6 shadow-xl ${
                plan.highlighted
                  ? "border-emerald-200 bg-emerald-100 text-[#10251d] md:-mt-4"
                  : "border-white/12 bg-white/8 text-white"
              }`}>
                {plan.highlighted ? (
                  <span className="mb-4 inline-flex rounded-full bg-[#1B4332] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    Plano mais escolhido
                  </span>
                ) : null}
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className={plan.highlighted ? "mt-1 text-sm text-[#2D5A43]" : "mt-1 text-sm text-emerald-50/70"}>
                  {plan.tagline}
                </p>
                <div className={`my-6 rounded-lg border p-5 ${plan.highlighted ? "border-[#1B4332]/15 bg-white" : "border-white/10 bg-[#0B1F18]"}`}>
                  {pricesHidden ? (
                    <>
                      <p className="text-2xl font-black">Solicitar proposta</p>
                      <p className={plan.highlighted ? "mt-1 text-sm text-[#6B7280]" : "mt-1 text-sm text-emerald-50/60"}>
                        Varia conforme operacao, IA e suporte.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold opacity-70">Implantacao</p>
                      <p className="text-2xl font-black">R$ {plan.priceSetup.toLocaleString("pt-BR")}</p>
                      <p className="mt-4 text-sm font-bold opacity-70">Mensalidade</p>
                      <p className="text-3xl font-black">
                        R$ {plan.priceMonthly}<span className="text-base font-bold opacity-70">/mes</span>
                      </p>
                    </>
                  )}
                </div>
                <ul className="mb-6 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/demo" className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-4 text-sm font-black transition hover:-translate-y-0.5 ${
                  plan.highlighted ? "bg-[#C06C58] text-white" : "border border-white/20 bg-white/8 text-white"
                }`}>
                  {pricesHidden ? "Solicitar proposta" : "Ver na pratica"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-emerald-50/60 md:flex-row">
          <p className="font-black text-white">Montalvex Reservas</p>
          <p>Reserva pelo celular, painel para equipe e status claro para o cliente.</p>
        </div>
      </footer>
    </main>
  );
}

function ProductHero() {
  return (
    <div className="reveal-up relative z-10 min-h-[620px] md:min-h-[680px]">
      <div className="absolute right-0 top-8 hidden w-[78%] rounded-[28px] border border-white/15 bg-slate-900/95 p-4 shadow-2xl shadow-black/45 md:block float-slow">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">Painel da equipe</p>
            <h2 className="text-lg font-black text-white">Reservas de hoje</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-black text-emerald-300">
            <span className="pulse-dot" />
            online
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.86fr]">
          <TeamPanel compact />
          <div className="space-y-4">
            <TrackingPreview compact />
            <div className="rounded-lg border border-white/10 bg-white p-4 text-[#1F2937] shadow-xl">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-[#6B7280]">Historico</p>
              <HistoryRow name="Mesa finalizada" meta="Rafael Lima - 19:30" status="Finalizada" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-0 w-[245px] max-w-[58vw] float-soft md:w-[280px] md:max-w-none">
        <ReservationPhone />
      </div>

      <div className="floating-card absolute right-3 top-4 rounded-lg border border-emerald-300/25 bg-slate-950/90 p-4 text-white shadow-2xl backdrop-blur md:right-8">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Nova solicitacao</p>
        <p className="mt-1 text-sm font-black">Grupo de 6 - 21:00</p>
      </div>
      <div className="floating-card float-delay absolute bottom-10 left-10 rounded-lg border border-sky-300/25 bg-white p-4 text-slate-950 shadow-2xl md:left-20">
        <p className="text-xs font-black uppercase tracking-wide text-sky-700">Mesa preparada</p>
        <p className="mt-1 text-sm font-black">Aniversario - area reservada</p>
      </div>
    </div>
  );
}

function ReservationPhone() {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[30px] border border-white/18 bg-[#071A13] p-3 shadow-2xl shadow-black/40">
      <div className="rounded-[24px] bg-[#FDFBF7] p-4 text-[#1F2937]">
        <div className="rounded-2xl bg-[#1B4332] px-4 py-5 text-center text-[#FDFBF7]">
          <Utensils className="mx-auto mb-2 h-7 w-7" />
          <h2 className="font-serif-bistro text-2xl font-bold">Bistro Monte Verde</h2>
          <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
        </div>
        <div className="mt-4 space-y-3">
          <MiniField label="Data" value="26/05/2026" />
          <MiniField label="Pessoas" value="4 pessoas" />
          <div className="grid grid-cols-3 gap-2">
            {["19:30", "20:00", "20:30"].map((time, index) => (
              <span key={time} className={`rounded-lg border px-2 py-2 text-center text-xs font-black ${index === 1 ? "border-[#1B4332] bg-[#1B4332] text-white" : "border-[#E8E2D4] bg-white"}`}>
                {time}
              </span>
            ))}
          </div>
          <div className="rounded-lg bg-[#C06C58] py-3 text-center text-sm font-black text-white">
            Enviar solicitacao
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-white/14 bg-white p-4 text-[#1F2937] shadow-2xl shadow-black/25">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">Painel da equipe</p>
          <h3 className="font-black">Reservas de hoje</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <KpiMini value="4" label="reservas" />
        <KpiMini value="16" label="pessoas" />
        <KpiMini value="1" label="pendente" tone="amber" />
      </div>
      <div className="mt-4 space-y-2">
        <PanelRow name="Juliana Alves" meta="20:00 · 4 pessoas" status="Pendente" tone="pending" />
        <PanelRow name="Lucas Martins" meta="19:30 · 2 pessoas" status="Confirmada" tone="confirmed" />
        {!compact ? <PanelRow name="Historico" meta="Finalizadas e recusadas" status="Separado" tone="history" /> : null}
      </div>
    </div>
  );
}

function TrackingPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-[#E8E2D4] bg-[#FDFBF7] p-5 text-[#1F2937] shadow-xl ${compact ? "" : "mx-auto max-w-xl"}`}>
      <div className="mb-4 flex items-center justify-between border-b border-[#E8E2D4] pb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">Protocolo</p>
          <p className="font-mono text-lg font-black text-[#1B4332]">#MV-8F42A1</p>
        </div>
        <span className="status-pill bg-emerald-100 text-emerald-700">Confirmada</span>
      </div>
      <div className="grid gap-3 text-sm">
        <InfoLine label="Horario" value="20:30" />
        <InfoLine label="Pessoas" value="4 pessoas" />
        <InfoLine label="Status" value="Equipe preparada para receber voce" />
      </div>
    </div>
  );
}

function PanelStory() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <TeamPanel />
      <div className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm">
        <p className="mb-4 text-xs font-black uppercase tracking-wide text-[#6B7280]">Historico</p>
        <div className="space-y-3">
          <HistoryRow name="Mesa 12 finalizada" meta="Rafael Lima · 19:30" status="Finalizada" />
          <HistoryRow name="Grupo sem disponibilidade" meta="Camila Rocha · 21:00" status="Recusada" />
          <HistoryRow name="Pendencia antiga" meta="Ontem · 6 pessoas" status="Pendente" />
        </div>
      </div>
    </div>
  );
}

function AiPreview() {
  return (
    <div className="rounded-lg border border-violet-200/18 bg-white/8 p-5 shadow-2xl shadow-black/25">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-200/12 text-violet-100">
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-black">Apoio inteligente</h3>
          <p className="text-xs font-bold text-violet-100/70">Disponivel nos planos com IA</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {aiItems.map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
            <Sparkles className="mb-3 h-4 w-4 text-violet-100" />
            <p className="text-sm font-black">{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-violet-100/70">
        Respostas simuladas na proposta. A IA ajuda com contexto; a confirmacao da reserva continua com a equipe.
      </p>
    </div>
  );
}

function PriceToggle({ mode, onChange, compact = false }: { mode: PricingMode; onChange: (mode: PricingMode) => void; compact?: boolean }) {
  return (
    <div className={`mode-toggle ${compact ? "hidden sm:inline-flex" : ""}`} aria-label="Alternar exibicao de valores">
      <button type="button" className={mode === "prospeccao" ? "active" : ""} onClick={() => onChange("prospeccao")}>
        Ocultar valores
      </button>
      <button type="button" className={mode === "reuniao" ? "active" : ""} onClick={() => onChange("reuniao")}>
        Mostrar valores
      </button>
    </div>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#E8E2D4] bg-white p-3">
      <p className="text-[10px] font-black uppercase tracking-wide text-[#6B7280]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function KpiMini({ value, label, tone = "neutral" }: { value: string; label: string; tone?: "neutral" | "amber" }) {
  return (
    <div className={tone === "amber" ? "rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800" : "rounded-lg border border-slate-200 bg-slate-50 p-3"}>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-bold opacity-70">{label}</p>
    </div>
  );
}

function PanelRow({ name, meta, status, tone }: { name: string; meta: string; status: string; tone: "pending" | "confirmed" | "history" }) {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-700",
    history: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-black">{name}</p>
          <p className="text-xs font-bold text-[#6B7280]">{meta}</p>
        </div>
        <span className={`status-pill ${styles[tone]}`}>{status}</span>
      </div>
      {tone === "pending" ? (
        <div className="mt-3 flex gap-2">
          <span className="flex min-h-9 flex-1 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white">Confirmar</span>
          <span className="flex min-h-9 items-center justify-center rounded-lg bg-red-50 px-3 text-xs font-black text-red-700">Recusar</span>
        </div>
      ) : tone === "confirmed" ? (
        <div className="mt-3 flex min-h-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-700">
          Finalizar
        </div>
      ) : null}
    </div>
  );
}

function HistoryRow({ name, meta, status }: { name: string; meta: string; status: string }) {
  return (
    <div className="rounded-lg border border-[#E8E2D4] bg-[#FDFBF7] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black">{name}</p>
          <p className="mt-1 text-sm font-semibold text-[#6B7280]">{meta}</p>
        </div>
        <span className="status-pill bg-slate-100 text-slate-700">{status}</span>
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-semibold text-[#6B7280]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  MessageSquareText,
  PhoneCall,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";
import type { PricingMode } from "@/lib/types";

const operationTimeline = [
  ["20:14", "Cliente solicita mesa", "Reserva enviada pelo celular com horario, pessoas e observacao."],
  ["20:15", "Entra como pendente", "A equipe recebe a solicitacao no painel antes do pico."],
  ["20:16", "IA destaca observacao", "Aniversario informado e preferencia por mesa tranquila."],
  ["20:17", "Equipe confirma", "Status muda para confirmada e a mesa entra no preparo."],
  ["Cliente ve", "Reserva confirmada", "Protocolo e telefone mostram o status atualizado."],
  ["IA apoia", "Resumo do jantar", "Nos planos avancados, resumos e sugestoes ajudam a preparar o salao."],
];

const valueCards = [
  [PhoneCall, "Menos reserva perdida", "Pedidos deixam de ficar espalhados em mensagens, prints e caderno."],
  [MessageSquareText, "Cliente menos ansioso", "Ele acompanha pelo protocolo, sem precisar perguntar de novo no WhatsApp."],
  [Clock, "Equipe com visao do pico", "Pendentes, confirmadas e proxima chegada aparecem antes do salao encher."],
  [History, "Historico organizado", "Finalizadas, recusadas e antigas ficam separadas para consulta."],
  [Bot, "Base para IA", "Resumos e alertas demonstrativos mostram onde a operacao pode evoluir."],
] satisfies Array<[LucideIcon, string, string]>;

const aiInsights = [
  ["Pico previsto", "20h as 21h"],
  ["Atencao", "Aniversario informado"],
  ["Sugestao", "Reservar mesa mais tranquila"],
  ["Resumo", "3 pendentes, 5 confirmadas, 28 pessoas previstas"],
];

export default function LandingClient() {
  const [mode, setMode] = useState<PricingMode>("prospeccao");
  const pricesHidden = mode === "prospeccao";

  return (
    <main className="min-h-screen overflow-hidden bg-[#0f241d] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f241d]/90 backdrop-blur-xl">
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
            <Link href="/demo" className="cta-glow inline-flex min-h-10 shrink-0 items-center rounded-lg bg-[#C06C58] px-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 sm:px-4">
              <span className="sm:hidden">Demo</span>
              <span className="hidden sm:inline">Ver demo</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0f241d] to-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="reveal-up relative z-10 min-w-0">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase text-emerald-100">
                <span className="pulse-dot" />
                Operacao de reservas em tempo real
              </p>
              <h1 className="max-w-[20rem] break-words text-2xl font-black leading-tight [overflow-wrap:anywhere] sm:max-w-3xl sm:text-4xl md:text-5xl xl:text-6xl">
                Do celular do cliente ao painel da equipe, sem reserva perdida no caminho.
              </h1>
              <p className="mt-6 max-w-[21rem] text-base leading-8 text-emerald-50/80 sm:max-w-2xl sm:text-lg">
                Organize solicitacoes, confirmacoes, acompanhamento por protocolo e operacao do salao em uma experiencia feita para restaurante.
              </p>
              <div className="mt-6 grid gap-3 text-sm font-bold text-emerald-50/72 sm:grid-cols-2">
                <span className="rounded-lg border border-white/10 bg-white/8 px-4 py-3">Link proprio para reservar</span>
                <span className="rounded-lg border border-white/10 bg-white/8 px-4 py-3">Painel claro para a equipe</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo" className="cta-glow inline-flex min-h-13 items-center justify-center rounded-lg bg-[#C06C58] px-7 font-black text-white shadow-xl transition hover:-translate-y-0.5">
                  Ver demo guiada
                </Link>
                <a href="#planos" className="inline-flex min-h-13 items-center justify-center rounded-lg border border-white/20 bg-white/8 px-7 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/12">
                  Conhecer planos
                </a>
              </div>
            </div>

            <div className="relative min-w-0">
              <ProductHero />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase text-[#C2410C]">Fluxo em 10 segundos</p>
              <h2 className="text-3xl font-black md:text-4xl">Do pedido no celular ao salao preparado.</h2>
            </div>
            <p className="leading-7 text-[#6B7280]">
              Do pedido inicial ao status confirmado, cada etapa fica visivel para o restaurante e mais tranquila para o cliente.
            </p>
          </div>
          <OperationTimeline />
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-[#1F2937]">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-[#1B4332]">Acompanhamento por protocolo</p>
            <h2 className="text-3xl font-black md:text-4xl">O cliente nao precisa perguntar de novo no WhatsApp.</h2>
            <p className="mt-4 leading-7 text-[#6B7280]">
              Ele acompanha a reserva com protocolo e telefone. O status, horario e quantidade de pessoas ficam claros antes da chegada.
            </p>
          </div>
          <TrackingPreview />
        </div>
      </section>

      <section className="bg-[#F5F1E8] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase text-[#1B4332]">Painel da equipe</p>
              <h2 className="text-3xl font-black md:text-4xl">Pendentes, confirmadas e historico no mesmo lugar.</h2>
            </div>
            <p className="leading-7 text-[#6B7280]">
              O painel mostra reservas de hoje, pessoas previstas, proxima chegada e botoes claros para confirmar, recusar ou finalizar.
            </p>
          </div>
          <PanelStory />
        </div>
      </section>

      <section className="bg-[#0f241d] px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-200/10 px-3 py-1 text-xs font-black uppercase text-violet-100">
              <Sparkles className="h-3.5 w-3.5" />
              IA demonstrativa
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">Um assistente visual para vender o potencial da operacao com IA.</h2>
            <p className="mt-4 leading-7 text-emerald-50/75">
              Bloco demonstrativo, com respostas simuladas e disponivel nos planos com IA. A equipe continua no controle da confirmacao.
            </p>
          </div>
          <AiPreview />
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 text-[#1F2937]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase text-[#C06C58]">Valor percebido</p>
              <h2 className="text-3xl font-black md:text-4xl">Mais previsibilidade na noite cheia.</h2>
            </div>
            <p className="leading-7 text-[#6B7280]">
              A proposta fica mais facil de entender porque conecta dor real, fluxo operacional e acompanhamento do cliente.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {valueCards.map(([Icon, title, text]) => (
              <article key={title} className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Icon className="mb-4 h-6 w-6 text-[#C06C58]" />
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="bg-[#0f241d] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-black uppercase text-emerald-200">Planos</p>
            <h2 className="text-3xl font-black md:text-4xl">Planos conectados ao jeito real de operar reservas</h2>
            <p className="mx-auto mt-3 max-w-2xl text-emerald-50/75">
              {pricesHidden
                ? "Solicite uma proposta. O valor varia conforme operacao, unidades, IA e nivel de suporte."
                : "Valores atuais de implantacao e mensalidade, sem alteracao nos planos."}
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
                  <span className="mb-4 inline-flex rounded-full bg-[#1B4332] px-3 py-1 text-xs font-black uppercase text-white">
                    Plano mais escolhido
                  </span>
                ) : null}
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className={plan.highlighted ? "mt-1 text-sm text-[#2D5A43]" : "mt-1 text-sm text-emerald-50/70"}>
                  {plan.tagline}
                </p>
                <div className={`my-6 rounded-lg border p-5 ${plan.highlighted ? "border-[#1B4332]/15 bg-white" : "border-white/10 bg-[#071A13]"}`}>
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
    <div className="reveal-up relative z-20 mx-auto w-full min-w-0 max-w-[620px]">
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="mx-auto w-48">
          <ReservationPhone />
        </div>
        <div className="rounded-[22px] border border-white/15 bg-[#111827]/96 p-3 shadow-2xl shadow-black/35">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Painel da equipe</p>
              <h2 className="text-base font-black text-white">Reservas de hoje</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-black text-emerald-300">
              <span className="pulse-dot" />
              ao vivo
            </span>
          </div>
          <TeamPanel compact />
        </div>
        <div className="rounded-lg border border-emerald-200/20 bg-emerald-950/45 p-4 text-white">
          <p className="text-xs font-black uppercase text-emerald-200">Protocolo MV-8F42A1</p>
          <p className="mt-1 text-sm font-bold text-emerald-50/75">Status confirmado e consulta pelo telefone.</p>
        </div>
      </div>

      <div className="relative hidden h-[590px] w-full overflow-hidden sm:block lg:h-[620px]">
        <div className="absolute right-2 top-36 z-20 w-[82%] rounded-[22px] border border-white/15 bg-[#111827]/96 p-3 shadow-2xl shadow-black/40 md:p-4 lg:right-0 lg:top-12 lg:w-[80%] float-slow">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <p className="text-xs font-black uppercase text-slate-400">Painel da equipe</p>
              <h2 className="text-lg font-black text-white">Reservas de hoje</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-black text-emerald-300">
              <span className="pulse-dot" />
              ao vivo
            </span>
          </div>
          <div className="grid gap-3 md:gap-4 lg:grid-cols-[1fr_0.74fr]">
            <TeamPanel compact />
            <div className="hidden space-y-4 xl:block">
              <TrackingPreview compact />
            </div>
          </div>
        </div>

        <div className="absolute left-5 top-2 z-20 w-52 float-soft md:w-56 lg:left-0 lg:top-24 lg:w-60">
          <ReservationPhone />
        </div>

        <div className="floating-card absolute right-4 top-7 z-30 rounded-lg border border-emerald-300/25 bg-slate-950/92 p-3 text-white shadow-2xl backdrop-blur md:p-4 lg:right-8 lg:top-0">
          <p className="text-xs font-black uppercase text-emerald-300">Nova reserva</p>
          <p className="mt-1 text-sm font-black">20:30 - 4 pessoas</p>
        </div>
        <div className="floating-card float-delay absolute left-[46%] top-[145px] z-30 rounded-lg border border-sky-300/25 bg-white p-3 text-slate-950 shadow-2xl md:p-4 lg:left-48 lg:top-6">
          <p className="text-xs font-black uppercase text-sky-700">Protocolo</p>
          <p className="mt-1 font-mono text-sm font-black">MV-8F42A1</p>
        </div>
        <HeroAiCard />
      </div>
    </div>
  );
}

function HeroAiCard() {
  return (
    <div className="floating-card absolute bottom-8 right-6 z-30 hidden w-[230px] rounded-lg border border-violet-200/20 bg-[#071A13]/95 p-4 text-white shadow-2xl backdrop-blur md:block lg:bottom-28 lg:right-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-200/12 text-violet-100">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-black uppercase text-violet-100/70">IA demonstrativa</p>
          <p className="text-sm font-black">Apoio simulado</p>
        </div>
      </div>
      <p className="text-xs leading-5 text-violet-100/75">Pico previsto: 20h as 21h. Atencao: aniversario informado.</p>
    </div>
  );
}

function ReservationPhone() {
  return (
    <div className="mx-auto w-full max-w-[282px] rounded-[30px] border border-white/18 bg-[#071A13] p-3 shadow-2xl shadow-black/40">
      <div className="rounded-[24px] bg-[#FDFBF7] p-4 text-[#1F2937]">
        <div className="rounded-2xl bg-[#1B4332] px-4 py-5 text-center text-[#FDFBF7]">
          <Utensils className="mx-auto mb-2 h-7 w-7" />
          <h2 className="font-serif-bistro text-2xl font-bold">Bistro Monte Verde</h2>
          <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
        </div>
        <div className="mt-4 space-y-3">
          <MiniField label="Data" value="Hoje" />
          <MiniField label="Pessoas" value="4 pessoas" />
          <div className="grid grid-cols-3 gap-2">
            {["19:30", "20:00", "20:30"].map((time, index) => (
              <span key={time} className={`rounded-lg border px-2 py-2 text-center text-xs font-black ${index === 2 ? "border-[#1B4332] bg-[#1B4332] text-white" : "border-[#E8E2D4] bg-white"}`}>
                {time}
              </span>
            ))}
          </div>
          <div className="rounded-lg border border-[#E8E2D4] bg-white p-3">
            <p className="text-[10px] font-black uppercase text-[#6B7280]">Observacao</p>
            <p className="mt-1 text-xs font-bold">Aniversario, mesa tranquila</p>
          </div>
          <div className="rounded-lg bg-[#C06C58] py-3 text-center text-sm font-black text-white">
            Enviar solicitacao
          </div>
        </div>
      </div>
    </div>
  );
}

function OperationTimeline() {
  return (
    <div className="relative grid gap-3 lg:grid-cols-5">
      {operationTimeline.map(([time, title, text], index) => (
        <article key={time} className="relative rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#1B4332] px-3 py-1 text-xs font-black text-white">{time}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F1E8] text-xs font-black text-[#C06C58]">
              {index + 1}
            </span>
          </div>
          <h3 className="font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">{text}</p>
        </article>
      ))}
    </div>
  );
}

function TeamPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-white/14 bg-white p-4 text-[#1F2937] shadow-2xl shadow-black/25">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-[#6B7280]">Painel da equipe</p>
          <h3 className="font-black">Reservas de hoje</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <KpiMini value="8" label="hoje" />
        <KpiMini value="28" label="pessoas" />
        <KpiMini value="3" label="pend." tone="amber" />
        <KpiMini value="20:30" label="prox." tone="sky" />
      </div>
      <div className="mt-4 space-y-2">
        <PanelRow name="Mariana Costa" meta="20:30 - 4 pessoas" status="Pendente" tone="pending" />
        <PanelRow name="Lucas Martins" meta="20:00 - 2 pessoas" status="Confirmada" tone="confirmed" />
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
          <p className="text-xs font-black uppercase text-[#6B7280]">Protocolo</p>
          <p className="font-mono text-lg font-black text-[#1B4332]">MV-8F42A1</p>
        </div>
        <span className="status-pill bg-emerald-100 text-emerald-700">Confirmada</span>
      </div>
      <div className="grid gap-3 text-sm">
        <InfoLine label="Horario" value="20:30" />
        <InfoLine label="Pessoas" value="4 pessoas" />
        <InfoLine label="Telefone" value="final 2026" />
        <InfoLine label="Status" value="Equipe preparada" />
      </div>
    </div>
  );
}

function PanelStory() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
      <TeamPanel />
      <div className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-sm">
        <p className="mb-4 text-xs font-black uppercase text-[#6B7280]">Historico</p>
        <div className="space-y-3">
          <HistoryRow name="Mesa 12 finalizada" meta="Rafael Lima - 19:30" status="Finalizada" />
          <HistoryRow name="Grupo sem disponibilidade" meta="Camila Rocha - 21:00" status="Recusada" />
          <HistoryRow name="Pendencia antiga" meta="Ontem - 6 pessoas" status="Pendente" />
        </div>
      </div>
    </div>
  );
}

function AiPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-violet-200/18 bg-white/8 p-5 shadow-2xl shadow-black/25 ${compact ? "text-white" : ""}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-200/12 text-violet-100">
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-black">Assistente IA demonstrativo</h3>
          <p className="text-xs font-bold text-violet-100/70">Respostas simuladas nos planos com IA</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {aiInsights.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
            <Sparkles className="mb-3 h-4 w-4 text-violet-100" />
            <p className="text-xs font-bold uppercase text-violet-100/60">{label}</p>
            <p className="mt-1 text-sm font-black">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-violet-100/70">
        IA demonstrativa. A equipe continua no controle e confirma cada reserva.
      </p>
    </div>
  );
}

function PriceToggle({ mode, onChange, compact = false }: { mode: PricingMode; onChange: (mode: PricingMode) => void; compact?: boolean }) {
  const toggle = (
    <div className="mode-toggle" aria-label="Alternar exibicao de valores">
      <button type="button" className={mode === "prospeccao" ? "active" : ""} onClick={() => onChange("prospeccao")}>
        Ocultar valores
      </button>
      <button type="button" className={mode === "reuniao" ? "active" : ""} onClick={() => onChange("reuniao")}>
        Mostrar valores
      </button>
    </div>
  );

  if (compact) {
    return <div className="hidden sm:block">{toggle}</div>;
  }

  return toggle;
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#E8E2D4] bg-white p-3">
      <p className="text-[10px] font-black uppercase text-[#6B7280]">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function KpiMini({ value, label, tone = "neutral" }: { value: string; label: string; tone?: "neutral" | "amber" | "sky" }) {
  const classes = {
    neutral: "border-slate-200 bg-slate-50 text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    sky: "border-sky-200 bg-sky-50 text-sky-800",
  };

  return (
    <div className={`rounded-lg border p-3 ${classes[tone]}`}>
      <p className="text-xl font-black">{value}</p>
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

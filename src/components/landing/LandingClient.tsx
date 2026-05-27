"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  History,
  MessageSquareText,
  Sparkles,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";
import type { PricingMode } from "@/lib/types";

const heroBullets = [
  "Link próprio para reservas",
  "Protocolo para o cliente acompanhar",
  "Painel para confirmar, recusar e organizar",
];

const problemCards = [
  [MessageSquareText, "WhatsApp não é painel", "No horário de pico, conversa importante some entre dúvidas, prints e pedidos antigos."],
  [Clock, "Cliente quer resposta", "Quem pediu mesa precisa saber se foi recebido, confirmado ou recusado."],
  [Users, "Equipe precisa enxergar o salão", "Pendentes, confirmadas e histórico precisam estar em um lugar só."],
  [History, "Histórico evita retrabalho", "O que foi recusado, finalizado ou confirmado não deve desaparecer da operação."],
] satisfies Array<[LucideIcon, string, string]>;

const flowSteps = [
  ["1", "Cliente abre o link do restaurante", "A experiência começa no canal próprio da casa."],
  ["2", "Escolhe data, horário e pessoas", "As informações chegam padronizadas para a equipe."],
  ["3", "Recebe protocolo", "O cliente guarda o código para consultar o andamento."],
  ["4", "Equipe vê no painel", "A solicitação entra como pendente, com contexto para decidir."],
  ["5", "Equipe confirma ou recusa", "A operação segue no controle, sem automação exagerada."],
  ["6", "Cliente acompanha o status", "A informação fica clara sem nova mensagem no WhatsApp."],
];

const operationSignals = [
  ["8", "reservas hoje"],
  ["28", "pessoas previstas"],
  ["20:30", "próxima chegada"],
];

const beforeAfter = [
  ["Antes", "Reservas em conversas, prints, caderno e memória da equipe."],
  ["Depois", "Solicitação com protocolo, status claro e painel para decidir."],
];

const aiCards = [
  ["Resumo do jantar", "Visão rápida do que está pendente, confirmado e previsto."],
  ["Horários de pico", "Ajuda a preparar recepção e salão antes da chegada."],
  ["Observações importantes", "Aniversários e preferências ficam mais visíveis."],
  ["Sugestões para o salão", "Apoio para organizar mesas e prioridades."],
];

const faqs = [
  ["O cliente precisa baixar app?", "Não. Ele acessa pelo link do restaurante."],
  ["A reserva é confirmada automaticamente?", "Não nesta fase. A equipe continua no controle."],
  ["O cliente consegue acompanhar?", "Sim. Ele consulta com protocolo e telefone."],
  ["Serve para pizzaria e restaurante?", "Sim. A estrutura é white-label e pode adaptar nome, horários e identidade."],
  ["A IA substitui a equipe?", "Não. A IA entra como apoio nos planos avançados. A decisão continua com o restaurante."],
];

const planBullets: Record<string, string[]> = {
  "Reservas Online": [
    "Página própria de reservas",
    "Painel da equipe",
    "Status, histórico e protocolo",
    "Base publicada e acompanhada",
    "Ideal para tirar reservas do improviso",
  ],
  "IA Operacional": [
    "Tudo do Reservas Online",
    "Apoio com resumo do jantar",
    "Destaque de horários de pico",
    "Observações importantes",
    "Sugestões para preparar o salão",
  ],
  "IA Completa": [
    "Tudo dos planos anteriores",
    "Relatórios mensais",
    "Análise da operação",
    "Apoio avançado para gestão",
    "Consultoria para evolução comercial",
  ],
};

const whatsappMessage =
  "Olá! Tenho interesse no Montalvex Reservas para meu restaurante e gostaria de entender a proposta.\n\nPode me apresentar como funciona?";
const whatsappHref = `https://wa.me/556296377637?text=${encodeURIComponent(whatsappMessage)}`;

export default function LandingClient() {
  const [mode, setMode] = useState<PricingMode>("prospeccao");
  const pricesHidden = mode === "prospeccao";

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandMark />
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <PriceToggle mode={mode} onChange={setMode} compact />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow hidden min-h-10 items-center rounded-lg bg-[#C2410C] px-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Solicitar proposta
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0F172A] to-[#10251d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_82%_34%,rgba(194,65,12,0.13),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(254,243,199,0.8)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative z-10 min-w-0">
              <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase text-emerald-100 shadow-lg shadow-emerald-950/20">
                <span className="pulse-dot" />
                Tecnologia por Montalvex
              </p>
              <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
                <span className="block">Reservas organizadas</span>
                <span className="block">equipe no controle</span>
                <span className="block">cliente sem dúvida.</span>
              </h1>
              <p className="mt-6 max-w-[20rem] break-words text-base leading-8 text-slate-200 sm:max-w-2xl sm:text-lg">
                O Montalvex Reservas transforma pedidos espalhados em um fluxo claro: o cliente solicita pelo link, recebe protocolo e a equipe acompanha tudo pelo painel.
              </p>
              <div className="mt-6 grid max-w-[20rem] gap-3 sm:max-w-2xl">
                {heroBullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-slate-100 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-emerald-200/30 hover:bg-white/12">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow inline-flex min-h-13 items-center justify-center rounded-lg bg-[#C2410C] px-7 font-black text-white shadow-xl transition hover:-translate-y-0.5"
                >
                  Solicitar proposta
                </a>
                <a href="#como-funciona" className="inline-flex min-h-13 items-center justify-center rounded-lg border border-white/20 bg-white/8 px-7 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/12">
                  Ver como funciona
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">Produto Montalvex</span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">Operação consultiva</span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">Restaurante-first</span>
              </div>
            </div>

            <div className="relative z-20 min-w-0">
              <HeroVisual />
            </div>
          </div>
          <div className="relative z-10 mt-10 grid gap-3 sm:grid-cols-3">
            {operationSignals.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/8 p-4 shadow-lg shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/12">
                <p className="text-2xl font-black text-[#FEF3C7]">{value}</p>
                <p className="mt-1 text-xs font-black uppercase text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FEF3C7] px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Problema real"
            title="Reserva não se perde porque o cliente esqueceu. Ela se perde porque a operação está espalhada."
            text="Quando o salão enche, telefone, direct, caderno, planilha e mensagens antigas começam a competir pela atenção da equipe."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {beforeAfter.map(([label, text]) => (
              <article key={label} className="rounded-lg border border-amber-200/80 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-black uppercase text-[#FEF3C7]">{label}</span>
                <p className="mt-4 text-lg font-black leading-7">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problemCards.map(([Icon, title, text]) => (
              <InfoCard key={title} icon={Icon} title={title} text={text} />
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Como funciona"
            title="Como funciona na prática"
            text="Um fluxo simples para o cliente e previsível para a equipe."
          />
          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pointer-events-none absolute left-4 right-4 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent lg:block" />
            {flowSteps.map(([number, title, text]) => (
              <article key={title} className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                <span className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950 text-sm font-black text-white shadow-lg shadow-emerald-950/20">
                  {number}
                </span>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase text-emerald-800 shadow-sm">
                  operação
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-[#C2410C]">O que o cliente vê</p>
            <h2 className="text-3xl font-black md:text-4xl">O cliente não fica no escuro.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              O cliente solicita pelo link, recebe um protocolo e consegue acompanhar se a reserva está pendente, confirmada ou recusada.
            </p>
            <p className="mt-5 inline-flex rounded-full bg-[#FEF3C7] px-4 py-2 text-sm font-black text-[#C2410C] shadow-sm">
              Sem precisar perguntar de novo no WhatsApp.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <ReservationPhone />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <PanelPreview />
          <div>
            <p className="mb-2 text-sm font-black uppercase text-emerald-800">O que a equipe controla</p>
            <h2 className="text-3xl font-black md:text-4xl">A equipe também não trabalha no escuro.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Em vez de procurar conversas antigas, a equipe vê quem precisa de confirmação, quem está chegando e o que já saiu da operação ativa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-emerald-200">Acompanhamento</p>
            <h2 className="text-3xl font-black md:text-4xl">Protocolo transforma dúvida em acompanhamento.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Quando a reserva vira protocolo, o cliente consegue consultar o status e a equipe reduz mensagens repetidas perguntando se a mesa foi confirmada.
            </p>
          </div>
          <TrackingPreview />
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Planos com IA"
            title="IA para apoiar a operação, não substituir sua equipe."
            text="Nos planos com IA, o sistema pode apoiar a equipe com resumos e sugestões. As respostas são demonstrativas nesta apresentação, e a decisão continua com o restaurante."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <article className="rounded-lg border border-violet-100 bg-white p-5 shadow-xl shadow-slate-200/70">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black uppercase text-violet-800">Resumo simulado</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-700">Planos com IA</span>
              </div>
              <h3 className="text-xl font-black">Assistente operacional demonstrativo</h3>
              <div className="mt-5 space-y-3 text-sm">
                <InfoLine label="Pico previsto" value="20h às 21h" />
                <InfoLine label="Atenção" value="aniversário informado" />
                <InfoLine label="Sugestão" value="mesa mais tranquila" />
                <InfoLine label="Controle" value="equipe decide" />
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              {aiCards.map(([title, text]) => (
                <article key={title} className="rounded-lg border border-violet-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl">
                  <Sparkles className="mb-4 h-5 w-5 text-violet-700" />
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="mb-2 text-sm font-black uppercase text-emerald-200">Planos</p>
            <h2 className="text-3xl font-black md:text-4xl">Planos para organizar reservas e evoluir a operação</h2>
            <p className="mt-3 text-slate-300">
              {pricesHidden
                ? "Cada plano combina implantação, suporte e uma camada de clareza operacional para o restaurante parar de improvisar reservas."
                : "Valores atuais de implantação e mensalidade, sem alteração nos planos."}
            </p>
          </div>
          <div className="mb-8 flex justify-center">
            <PriceToggle mode={mode} onChange={setMode} />
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} pricesHidden={pricesHidden} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Perguntas rápidas"
            title="O essencial antes da conversa comercial"
            text="Respostas curtas para alinhar expectativa sem prometer automação que ainda não faz parte desta fase."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                <h3 className="font-black">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black text-emerald-100">
              <BrandMark compact />
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>Tecnologia por Montalvex</span>
            </div>
          </div>
          <h2 className="text-3xl font-black md:text-4xl">Quer organizar as reservas antes do próximo horário de pico?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Solicite uma proposta e veja como o Montalvex Reservas pode se adaptar à operação do seu restaurante.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-glow mt-7 inline-flex min-h-13 items-center justify-center rounded-lg bg-[#C2410C] px-7 font-black text-white shadow-xl transition hover:-translate-y-0.5"
          >
            Solicitar proposta no WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-400 md:flex-row">
          <div className="flex items-center gap-3">
            <BrandMark compact />
            <p>Produto de reservas comerciais para restaurantes.</p>
          </div>
          <p>Assinatura Montalvex: estratégia, tecnologia e operação com clareza.</p>
        </div>
      </footer>
    </main>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center">
      <span className={`${compact ? "h-9 w-36" : "h-11 w-44 sm:w-52"} flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white px-3 shadow-lg ring-1 ring-white/15`}>
        <Image
          src="/montalvex-logo-official.svg"
          alt="Montalvex"
          width={compact ? 144 : 208}
          height={compact ? 33 : 44}
          className="h-auto w-full object-contain"
        />
      </span>
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="premium-card relative mx-auto w-full max-w-full overflow-hidden rounded-[28px] border border-white/12 bg-white/8 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:max-w-xl">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent" />
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-xs font-black text-slate-100">
        <span className="flex items-center gap-2">
          <span className="pulse-dot" />
          Sistema online
        </span>
        <span className="hidden text-emerald-200 sm:inline">reserva recebida</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-[0.76fr_1fr] sm:items-center">
        <div className="mx-auto w-full max-w-[230px]">
          <ReservationPhone compact />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-200/30 bg-amber-100 px-3 py-2 text-xs font-black text-amber-900 shadow-lg">
            <span className="flex items-center gap-2">
              <span className="pulse-dot bg-amber-600" />
              Nova solicitação
            </span>
            <span>20:30</span>
          </div>
          <PanelPreview compact />
          <div className="rounded-lg border border-emerald-200/20 bg-emerald-950/70 p-4">
            <p className="text-xs font-black uppercase text-emerald-200">Protocolo MV-8F42A1</p>
            <p className="mt-1 text-sm font-black text-white">Status: Confirmada</p>
            <p className="mt-1 text-xs font-semibold text-emerald-50/70">20:30 - 4 pessoas - equipe preparada</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-sm font-black uppercase text-[#C2410C]">{eyebrow}</p>
      <h2 className="text-3xl font-black md:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="rounded-lg border border-amber-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#C2410C]/40 hover:shadow-xl">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#C2410C]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function ReservationPhone({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full rounded-[28px] border border-slate-900/10 bg-[#071A13] p-3 shadow-2xl shadow-black/20">
      <div className="rounded-[22px] bg-[#FEF3C7] p-4 text-slate-900">
        <div className="rounded-2xl bg-emerald-950 px-4 py-5 text-center text-[#FEF3C7]">
          <Utensils className="mx-auto mb-2 h-7 w-7" />
          <h3 className="font-serif-bistro text-xl font-bold">Bistro Monte Verde</h3>
          <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
        </div>
        <div className="mt-4 space-y-3">
          <MiniField label="Data" value="Hoje" />
          <MiniField label="Horário" value="20:30" />
          {!compact ? <MiniField label="Pessoas" value="4 pessoas" /> : null}
          {!compact ? <MiniField label="Protocolo" value="MV-8F42A1" /> : null}
          {!compact ? <MiniField label="Status" value="Confirmada" /> : null}
          <div className="rounded-lg bg-[#C2410C] py-3 text-center text-sm font-black text-white">
            Enviar reserva
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-950 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase text-slate-500">Painel da equipe</p>
          <p className="font-black">Reservas de hoje</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className={compact ? "grid grid-cols-3 gap-2" : "grid grid-cols-2 gap-2 sm:grid-cols-4"}>
        <MiniKpi value="8" label="hoje" />
        <MiniKpi value="3" label="pend." tone="amber" />
        {!compact ? <MiniKpi value="5" label="conf." tone="emerald" /> : null}
        {!compact ? <MiniKpi value="28" label="pessoas" tone="slate" /> : null}
        {compact ? <MiniKpi value="20:30" label="prox." tone="sky" /> : null}
      </div>
      <div className="mt-4 space-y-2">
        <PanelRow name="Mariana Costa" meta="20:30 - 4 pessoas" status="Pendente" tone="pending" />
        <PanelRow name="Lucas Martins" meta="20:00 - 2 pessoas" status="Confirmada" tone="confirmed" />
        {!compact ? <PanelRow name="Finalizadas" meta="Histórico organizado" status="Histórico" tone="history" /> : null}
        {!compact ? <PanelRow name="Recusadas" meta="Fora da operação ativa" status="Separado" tone="history" /> : null}
      </div>
    </div>
  );
}

function TrackingPreview() {
  return (
    <div className="rounded-lg border border-slate-700 bg-white p-5 text-slate-950 shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-black uppercase text-slate-500">Protocolo</p>
          <p className="font-mono text-lg font-black text-emerald-950">MV-8F42A1</p>
        </div>
        <span className="status-pill bg-emerald-100 text-emerald-700">Confirmada</span>
      </div>
      <div className="grid gap-3 text-sm">
        <InfoLine label="Horário" value="20:30" />
        <InfoLine label="Pessoas" value="4 pessoas" />
        <InfoLine label="Mensagem" value="Equipe preparada" />
        <InfoLine label="Telefone" value="final 2026" />
      </div>
    </div>
  );
}

function PlanCard({ plan, pricesHidden }: { plan: (typeof plans)[number]; pricesHidden: boolean }) {
  const bullets = planBullets[plan.name] ?? plan.features;

  return (
    <article className={`rounded-lg border p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
      plan.highlighted
        ? "border-emerald-200 bg-emerald-100 text-slate-950 lg:-mt-4"
        : "border-white/12 bg-white/8 text-white"
    }`}>
      {plan.highlighted ? (
        <span className="mb-4 inline-flex rounded-full bg-emerald-950 px-3 py-1 text-xs font-black uppercase text-white">
          Plano mais escolhido
        </span>
      ) : null}
      <h3 className="text-xl font-black">{plan.name}</h3>
      <p className={plan.highlighted ? "mt-1 text-sm text-emerald-950/70" : "mt-1 text-sm text-slate-300"}>
        {plan.tagline}
      </p>
      <div className={`my-6 rounded-lg border p-5 ${plan.highlighted ? "border-emerald-950/15 bg-white" : "border-white/10 bg-slate-950"}`}>
        {pricesHidden ? (
          <>
            <p className="text-2xl font-black">Solicitar proposta</p>
            <p className={plan.highlighted ? "mt-1 text-sm text-slate-500" : "mt-1 text-sm text-slate-400"}>
              Implantação e mensalidade conforme plano.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-bold opacity-70">Implantação</p>
            <p className="text-2xl font-black">R$ {plan.priceSetup.toLocaleString("pt-BR")}</p>
            <p className="mt-4 text-sm font-bold opacity-70">Mensalidade</p>
            <p className="text-3xl font-black">
              R$ {plan.priceMonthly}<span className="text-base font-bold opacity-70">/mês</span>
            </p>
          </>
        )}
      </div>
      <ul className="mb-6 space-y-3 text-sm">
        {bullets.map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`cta-glow inline-flex min-h-12 w-full items-center justify-center rounded-lg px-4 text-sm font-black transition hover:-translate-y-0.5 ${
        plan.highlighted ? "bg-[#C2410C] text-white" : "border border-white/20 bg-white/8 text-white"
      }`}
      >
        Solicitar proposta
      </a>
    </article>
  );
}

function PriceToggle({ mode, onChange, compact = false }: { mode: PricingMode; onChange: (mode: PricingMode) => void; compact?: boolean }) {
  const toggle = (
    <div className="mode-toggle" aria-label="Alternar exibição de valores">
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
    <div className="rounded-lg border border-amber-200 bg-white p-3">
      <p className="text-[10px] font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function MiniKpi({ value, label, tone = "neutral" }: { value: string; label: string; tone?: "neutral" | "amber" | "sky" | "emerald" | "slate" }) {
  const classes = {
    neutral: "border-slate-200 bg-slate-50 text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    sky: "border-sky-200 bg-sky-50 text-sky-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
    slate: "border-slate-200 bg-slate-100 text-slate-800",
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
          <p className="text-xs font-bold text-slate-500">{meta}</p>
        </div>
        <span className={`status-pill ${styles[tone]}`}>{status}</span>
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

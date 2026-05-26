"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Cloud,
  LayoutDashboard,
  MessageSquareOff,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Table2,
  Utensils,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";
import type { PricingMode } from "@/lib/types";

const painPoints = [
  {
    icon: PhoneCall,
    title: "Telefone tocando no meio do serviço",
    text: "A equipe está no salão, a cozinha está no pico e uma nova reserva depende de alguém parar tudo para atender.",
  },
  {
    icon: MessageSquareOff,
    title: "Reserva perdida em conversa",
    text: "Pedido chega em direct, ligação ou anotação solta. Quando o cliente chega, ninguém tem certeza do combinado.",
  },
  {
    icon: Users,
    title: "Equipe sem visão do horário de pico",
    text: "Grupos, aniversários e preferências aparecem tarde demais para preparar mesa, equipe e cozinha.",
  },
  {
    icon: Table2,
    title: "Grupo chegando sem mesa pronta",
    text: "A recepção improvisa, o cliente espera e uma noite boa vira uma experiência tensa logo na chegada.",
  },
];

const steps = [
  { title: "Cliente acessa", text: "Link próprio no Instagram, Google, QR code ou cardápio." },
  { title: "Reserva", text: "Horário, pessoas e observações ficam padronizados." },
  { title: "Equipe confirma", text: "Tudo entra no painel com status claro para o salão." },
  { title: "Mesa preparada", text: "A operação sabe quem chega e quando precisa agir." },
];

const included: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Cloud, title: "Hospedagem gerenciada", text: "Sistema publicado e acompanhado para a equipe usar sem fricção." },
  { icon: Wrench, title: "Manutenção", text: "Correções e melhorias contínuas para manter a demonstração evoluindo." },
  { icon: MessageSquareText, title: "Suporte comercial", text: "Canal para ajustes, dúvidas e acompanhamento da implantação." },
  { icon: ShieldCheck, title: "Segurança", text: "Base preparada para crescer com cuidado operacional." },
  { icon: Sparkles, title: "Atualizações", text: "Melhorias mensais de produto e refinamento da experiência." },
  { icon: ClipboardList, title: "Pequenos ajustes", text: "Textos, imagens e identidade do restaurante sem refazer tudo." },
  { icon: Zap, title: "IA nos avançados", text: "Espaço claro para automações quando o cliente estiver pronto." },
  { icon: Users, title: "Treinamento", text: "Equipe orientada para operar reservas no horário de pico." },
];

export default function LandingClient() {
  const [mode, setMode] = useState<PricingMode>("prospeccao");
  const arePricesHidden = mode === "prospeccao";

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--mx-bg)] text-[var(--mx-text)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition group-hover:scale-105">
              <Calendar className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="text-base font-black tracking-tight">
              Montalvex <span className="text-emerald-300">Reservas</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="mode-toggle hidden sm:inline-flex" aria-label="Alternar exibição de valores">
              <button type="button" className={mode === "prospeccao" ? "active" : ""} onClick={() => setMode("prospeccao")}>
                Ocultar valores
              </button>
              <button type="button" className={mode === "reuniao" ? "active" : ""} onClick={() => setMode("reuniao")}>
                Mostrar valores
              </button>
            </div>
            <Link href="/demo" className="cta-glow inline-flex min-h-10 items-center rounded-lg bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300">
              Demonstração comercial
            </Link>
          </div>
        </div>
        <div className="flex justify-center px-5 pb-3 sm:hidden">
          <div className="mode-toggle" aria-label="Alternar exibição de valores">
            <button type="button" className={mode === "prospeccao" ? "active" : ""} onClick={() => setMode("prospeccao")}>
              Ocultar valores
            </button>
            <button type="button" className={mode === "reuniao" ? "active" : ""} onClick={() => setMode("reuniao")}>
              Mostrar valores
            </button>
          </div>
        </div>
      </header>

      <section className="hero-glow relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[0.92fr_1.08fr] md:py-24">
        <div className="reveal-up relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/12 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-200 shadow-lg shadow-emerald-950/30">
            <span className="pulse-dot" />
            Sistema white-label para restaurantes
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
            Sexta à noite. Casa cheia.{" "}
            <span className="gradient-text">Cada mesa no seu lugar.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Organize solicitações, horários, quantidade de pessoas, status e equipe em uma experiência feita para dono de restaurante que precisa controlar o pico sem perder o ritmo do salão.
          </p>
          <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-200 sm:grid-cols-5">
            {["Solicitações", "Horários", "Pessoas", "Status", "Equipe"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-center font-bold">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="cta-glow inline-flex min-h-13 min-w-48 items-center justify-center whitespace-nowrap rounded-lg bg-emerald-400 px-7 font-black text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300">
              Ver demonstração
            </Link>
            <a href="#planos" className="inline-flex min-h-13 items-center justify-center rounded-lg border border-slate-600 bg-white/5 px-7 font-bold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white/10">
              Conhecer planos
            </a>
          </div>
        </div>

        <HeroMockup />
      </section>

      <section className="mx-section bg-slate-100 px-5 py-18 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-rose-600">Operação real</p>
            <h2 className="text-3xl font-black md:text-4xl">Por que reservas escapam mesmo com casa boa</h2>
            <p className="mt-4 leading-7 text-slate-600">
              O problema quase nunca é falta de cliente. É falta de uma rotina clara quando o salão está cheio.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, index) => (
              <article key={item.title} className="reveal-up premium-card rounded-lg border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${index * 70}ms` }}>
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-black">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-section px-5 py-18">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up mb-10 text-center">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-300">Antes e depois</p>
            <h2 className="text-3xl font-black md:text-4xl">Da improvisação para uma operação previsível</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <CompareBlock
              tone="before"
              label="Antes"
              title="Conversa perdida, caderno e equipe no escuro"
              items={["Reserva espalhada em canais diferentes", "Cliente aguardando confirmação", "Horário de pico sem previsão", "Grupo chegando sem mesa preparada"]}
            />
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl font-black text-emerald-300 md:flex">
              →
            </div>
            <CompareBlock
              tone="after"
              label="Depois"
              title="Link próprio, painel e status visível"
              items={["Reserva controlada desde o primeiro toque", "Equipe confirma no painel", "Grupos e horários organizados", "Mesa preparada antes do cliente chegar"]}
            />
          </div>
        </div>
      </section>

      <section className="mx-section bg-slate-950/60 px-5 py-18">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up mb-12 text-center">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-300">Como funciona</p>
            <h2 className="text-3xl font-black md:text-4xl">Cliente acessa → reserva → equipe confirma → mesa preparada</h2>
          </div>
          <div className="relative grid gap-4 md:grid-cols-4">
            <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-emerald-400/0 via-emerald-300/60 to-sky-300/0 md:block" />
            {steps.map((step, index) => (
              <article key={step.title} className="reveal-up premium-card relative rounded-lg border border-white/10 bg-white/6 p-5 transition hover:-translate-y-1 hover:bg-white/9" style={{ animationDelay: `${index * 80}ms` }}>
                <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-400 text-3xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                  {index + 1}
                </span>
                <h3 className="mb-2 text-lg font-black">{step.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-section bg-white px-5 py-18 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-700">Mensalidade</p>
              <h2 className="text-3xl font-black md:text-4xl">O que fica incluso para sua operação rodar com segurança</h2>
            </div>
            <p className="leading-7 text-slate-600">
              Uma estrutura simples para começar e evoluir conforme o movimento do restaurante, com suporte para operação, implantação e ajustes comerciais.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item, index) => (
              <article key={item.title} className="reveal-up rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg" style={{ animationDelay: `${index * 45}ms` }}>
                <item.icon className="mb-4 h-6 w-6 text-emerald-700" />
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="mx-section px-5 py-18">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-up mb-8 text-center">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-300">Planos para restaurantes</p>
            <h2 className="text-3xl font-black md:text-4xl">Planos para organizar as reservas do seu restaurante</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              {arePricesHidden
                ? "Escolha o melhor modelo para sua operação. Os planos variam conforme rotina do restaurante, uso de IA e nível de suporte."
                : "Valores de referência para implantação e mensalidade, apresentados com transparência para facilitar a conversa comercial."}
            </p>
          </div>
          <div className="reveal-up mb-8 flex justify-center">
            <div className="mode-toggle" aria-label="Alternar exibição dos valores">
              <button type="button" className={mode === "prospeccao" ? "active" : ""} onClick={() => setMode("prospeccao")}>Ocultar valores</button>
              <button type="button" className={mode === "reuniao" ? "active" : ""} onClick={() => setMode("reuniao")}>Mostrar valores</button>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.id} className={`reveal-up premium-card relative flex rounded-lg border p-6 transition duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-emerald-300 bg-gradient-to-b from-emerald-400/16 to-white/8 shadow-2xl shadow-emerald-950/30 md:-mt-4"
                  : "border-white/10 bg-white/6"
              }`}>
                <div className="flex w-full flex-col">
                  {plan.highlighted ? (
                    <span className="mb-4 w-fit rounded-full bg-emerald-400 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950 shadow-lg shadow-emerald-500/20">
                      Plano mais escolhido
                    </span>
                  ) : null}
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{plan.tagline}</p>
                  <div className="my-6 rounded-lg border border-white/10 bg-slate-950/35 p-5">
                    {arePricesHidden ? (
                      <>
                        <p className="text-2xl font-black text-emerald-300">Solicitar proposta</p>
                        <p className="mt-1 text-sm text-slate-400">Planos variam conforme operação, IA e suporte.</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-slate-400">Implantação</p>
                        <p className="text-2xl font-black">R$ {plan.priceSetup.toLocaleString("pt-BR")}</p>
                        <p className="mt-4 text-sm font-bold text-slate-400">Mensalidade</p>
                        <p className="text-3xl font-black text-emerald-300">
                          R$ {plan.priceMonthly}<span className="text-base font-bold text-slate-400">/mês</span>
                        </p>
                      </>
                    )}
                  </div>
                  <ul className="mb-6 flex-1 space-y-3 text-sm text-slate-200">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo" className={`inline-flex min-h-12 items-center justify-center rounded-lg px-4 text-sm font-black transition hover:-translate-y-0.5 ${
                    plan.highlighted
                      ? "cta-glow bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                      : "border border-slate-600 bg-white/5 text-white hover:border-slate-300 hover:bg-white/10"
                  }`}>
                    {arePricesHidden ? "Solicitar proposta" : "Ver na prática"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-section bg-slate-100 px-5 py-18 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            [LayoutDashboard, "Painel interno", "KPIs, pendências e reservas confirmadas para a equipe agir rápido."],
            [Utensils, "Operação de salão", "Pensado para restaurante com cliente chegando, grupo esperando e mesa sendo preparada."],
            [Sparkles, "White-label premium", "A marca do restaurante aparece na ponta; Montalvex sustenta a tecnologia."],
          ].map(([Icon, title, text], index) => (
            <article key={title as string} className="reveal-up rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: `${index * 70}ms` }}>
              <Icon className="mb-5 h-7 w-7 text-blue-600" />
              <h3 className="mb-2 font-black">{title as string}</h3>
              <p className="text-sm leading-6 text-slate-600">{text as string}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-slate-400 md:flex-row">
          <p className="font-black text-slate-100">Montalvex Reservas</p>
          <p>2026 Montalvex. Reservas controladas para restaurantes em noite cheia.</p>
        </div>
      </footer>
    </main>
  );
}

function HeroMockup() {
  return (
    <div className="reveal-up relative z-10 min-h-[560px] md:min-h-[620px]">
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
        <div className="grid grid-cols-3 gap-3">
          {["12 reservas", "38 pessoas", "2 pendentes"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/6 p-3">
              <p className="text-lg font-black text-white">{item.split(" ")[0]}</p>
              <p className="text-xs font-bold text-slate-400">{item.split(" ").slice(1).join(" ")}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {[
            ["19:30", "Lucas Martins", "2 pessoas", "confirmada"],
            ["20:00", "Juliana Alves", "4 pessoas", "pendente"],
            ["21:00", "Grupo Ferreira", "8 pessoas", "confirmada"],
          ].map(([time, name, people, status]) => (
            <div key={name} className="rounded-lg border border-white/10 bg-white p-3 text-slate-950 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-black">{name}</p>
                  <p className="text-xs font-bold text-slate-500">{time} · {people}</p>
                </div>
                <span className={status === "confirmada" ? "status-pill bg-emerald-100 text-emerald-700" : "status-pill bg-amber-100 text-amber-800"}>
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 w-[245px] rounded-[34px] border border-white/20 bg-slate-950 p-3 shadow-2xl shadow-black/50 float-soft">
        <div className="rounded-[26px] bg-[var(--bi-bg)] p-4 text-[var(--bi-text)]">
          <div className="rounded-2xl bg-[var(--bi-primary)] px-4 py-6 text-center text-[var(--bi-bg)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
              <Utensils className="h-6 w-6" />
            </div>
            <p className="font-serif-bistro text-xl font-bold">Bistrô Monte Verde</p>
            <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
          </div>
          <div className="mt-4 space-y-3">
            {["Nome completo", "Telefone", "4 pessoas"].map((item) => (
              <div key={item} className="rounded-lg border border-[var(--bi-border)] bg-white p-3">
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{item}</p>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2">
              {["19:30", "20:00", "20:30"].map((time, index) => (
                <span key={time} className={`rounded-lg border px-2 py-2 text-center text-xs font-black ${index === 1 ? "bg-[var(--bi-primary)] text-white" : "bg-white"}`}>
                  {time}
                </span>
              ))}
            </div>
            <div className="rounded-lg bg-[var(--bi-accent)] py-3 text-center text-sm font-black text-white shadow-lg">
              Confirmar reserva
            </div>
          </div>
        </div>
      </div>

      <div className="floating-card absolute right-3 top-4 rounded-lg border border-emerald-300/25 bg-slate-950/90 p-4 text-white shadow-2xl backdrop-blur md:right-8">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Nova solicitação</p>
        <p className="mt-1 text-sm font-black">Grupo de 6 · 21:00</p>
      </div>
      <div className="floating-card float-delay absolute bottom-10 left-10 rounded-lg border border-sky-300/25 bg-white p-4 text-slate-950 shadow-2xl md:left-20">
        <p className="text-xs font-black uppercase tracking-wide text-sky-700">Mesa preparada</p>
        <p className="mt-1 text-sm font-black">Aniversário · área reservada</p>
      </div>
    </div>
  );
}

function CompareBlock({ tone, label, title, items }: { tone: "before" | "after"; label: string; title: string; items: string[] }) {
  const isAfter = tone === "after";

  return (
    <article className={`reveal-up premium-card rounded-lg border p-6 ${isAfter ? "border-emerald-300/30 bg-emerald-400/10" : "border-rose-300/25 bg-rose-500/8"}`}>
      <p className={`mb-3 text-xs font-black uppercase tracking-wide ${isAfter ? "text-emerald-300" : "text-rose-300"}`}>{label}</p>
      <h3 className="mb-5 text-xl font-black">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
            <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${isAfter ? "bg-emerald-400 text-slate-950" : "bg-rose-400 text-white"}`}>
              {isAfter ? "✓" : "×"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

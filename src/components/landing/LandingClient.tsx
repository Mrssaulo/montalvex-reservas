import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  History,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";

const whatsappMessage =
  "Olá! Tenho interesse no Montalvex Reservas para meu restaurante e gostaria de entender a proposta.\n\nPode me apresentar como funciona?";
const whatsappHref = `https://wa.me/556296377637?text=${encodeURIComponent(whatsappMessage)}`;

const navItems = [
  ["Como funciona", "#como-funciona"],
  ["Para equipe", "#equipe"],
  ["Planos", "#planos"],
  ["FAQ", "#faq"],
];

const heroBullets = [
  "Link próprio para reservas",
  "Protocolo para o cliente acompanhar",
  "Painel com status, capacidade e histórico",
];

const problemCards = [
  [MessageSquareText, "WhatsApp não é painel", "No horário de pico, conversa importante some entre dúvidas, prints e pedidos antigos."],
  [Clock, "Cliente quer resposta", "Quem pediu mesa precisa saber se foi recebido, confirmado ou recusado."],
  [Users, "Equipe precisa enxergar o salão", "Pendentes, confirmadas e histórico precisam estar em um lugar só."],
  [History, "Histórico evita retrabalho", "O que foi recusado, finalizado ou confirmado não deve desaparecer da operação."],
] satisfies Array<[LucideIcon, string, string]>;

const beforeItems = [
  "Reservas em conversa solta",
  "Cliente perguntando de novo",
  "Equipe sem visão",
  "Histórico perdido",
  "Grupo chegando sem mesa preparada",
];

const afterItems = [
  "Link próprio de reserva",
  "Protocolo para acompanhar",
  "Painel da equipe",
  "Capacidade do salão visível",
  "Histórico organizado",
];

const flowSteps = [
  [PhoneCall, "1", "Cliente abre o link do restaurante", "A experiência começa em um canal próprio da casa."],
  [CalendarCheck, "2", "Escolhe data, horário e pessoas", "As informações chegam padronizadas para a equipe."],
  [ClipboardCheck, "3", "Recebe protocolo", "O cliente guarda o código para consultar o andamento."],
  [Table2, "4", "Equipe vê no painel", "A solicitação entra como pendente, com contexto para decidir."],
  [CheckCircle2, "5", "Equipe confirma ou recusa", "A operação segue no controle, sem automação exagerada."],
  [ShieldCheck, "6", "Cliente acompanha o status", "A informação fica clara sem nova mensagem no WhatsApp."],
] satisfies Array<[LucideIcon, string, string, string]>;

const aiCards = [
  ["Resumo do jantar", "Visão rápida do que está pendente, confirmado e previsto."],
  ["Horários de pico", "Ajuda a preparar recepção e salão antes da chegada."],
  ["Observações importantes", "Aniversários e preferências ficam mais visíveis."],
  ["Sugestões para preparar o salão", "Apoio inteligente para organizar mesas e prioridades."],
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

const faqs = [
  ["O cliente precisa baixar app?", "Não. Ele acessa pelo link do restaurante."],
  ["A reserva é confirmada automaticamente?", "Não nesta fase. A equipe continua no controle."],
  ["O cliente consegue acompanhar?", "Sim. Ele consulta com protocolo e telefone."],
  ["Serve para pizzaria e restaurante?", "Sim. A estrutura é white-label e pode adaptar nome, horários e identidade."],
  ["A IA substitui a equipe?", "Não. Ela entra como apoio nos planos avançados."],
];

export default function LandingClient() {
  return (
    <main className="min-h-screen max-w-[100vw] overflow-x-hidden bg-[#07110d] text-white [&_*]:min-w-0">
      <Header />

      <section className="relative max-w-[100vw] overflow-hidden border-b border-white/10 bg-[#07110d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(194,65,12,0.16),transparent_26%),linear-gradient(135deg,#07110d_0%,#0b1814_42%,#12100d_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="mobile-gutter relative grid gap-12 overflow-hidden pb-16 pt-12 sm:max-w-7xl sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="min-w-0">
            <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-100 shadow-lg shadow-emerald-950/20">
              <span className="pulse-dot" />
              Tecnologia por Montalvex
            </p>
            <h1 className="max-w-3xl text-3xl font-black leading-[1.05] text-white text-balance sm:text-5xl lg:text-7xl">
              Reservas organizadas, equipe no controle e cliente sem dúvida.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              O Montalvex Reservas transforma pedidos espalhados em um fluxo claro: o cliente solicita pelo link, recebe protocolo e a equipe acompanha tudo pelo painel.
            </p>

            <div className="mt-7 grid max-w-2xl gap-3">
              {heroBullets.map((item) => (
                <div key={item} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold text-slate-100 shadow-lg shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-200/30 hover:bg-white/[0.11]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300 transition group-hover:scale-110" />
                  <span className="min-w-0 break-words">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsappButton label="Solicitar proposta" className="min-h-13 px-7" />
              <a href="#como-funciona" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.08] px-7 font-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.13]">
                Ver como funciona
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-center sm:grid-cols-3">
              <HeroMetric value="8" label="reservas hoje" />
              <HeroMetric value="28" label="pessoas previstas" />
              <HeroMetric value="16" label="mesas totais" />
            </div>
          </div>

          <div className="relative min-w-0 lg:pt-4">
            <HeroVisual />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F0DF] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Dor real do restaurante"
            title="Reserva não se perde porque o cliente esqueceu. Ela se perde porque a operação está espalhada."
            text="WhatsApp, direct, telefone, caderno e planilha funcionam até o salão encher."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problemCards.map(([Icon, title, text]) => (
              <InfoCard key={title} icon={Icon} title={title} text={text} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101914] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <BeforeAfterCard title="Antes" items={beforeItems} tone="before" />
          <BeforeAfterCard title="Depois" items={afterItems} tone="after" />
        </div>
      </section>

      <section id="como-funciona" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Como funciona"
            title="Um fluxo simples para o cliente e previsível para a equipe."
            text="Cada etapa organiza a informação antes do horário de pico, sem tirar a decisão das mãos do restaurante."
          />
          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pointer-events-none absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent lg:block" />
            {flowSteps.map(([Icon, number, title, text]) => (
              <article key={title} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-sm font-black text-white shadow-lg shadow-emerald-950/20">
                    {number}
                  </span>
                  <Icon className="h-5 w-5 text-[#C2410C] transition duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C2410C]">O que o cliente vê</p>
            <h2 className="text-3xl font-black md:text-5xl">O cliente não fica no escuro.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              O cliente solicita pelo link, recebe um protocolo e consegue acompanhar se a reserva está pendente, confirmada ou recusada.
            </p>
            <p className="mt-6 inline-flex rounded-full bg-[#F7F0DF] px-4 py-2 text-sm font-black text-[#C2410C] shadow-sm">
              Sem precisar perguntar de novo no WhatsApp.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <ReservationPhone />
          </div>
        </div>
      </section>

      <section id="equipe" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <PanelPreview />
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-800">O que a equipe controla</p>
            <h2 className="text-3xl font-black md:text-5xl">A equipe também não trabalha no escuro.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Em vez de procurar conversas antigas, a equipe vê quem precisa de confirmação, quem está chegando e o que já saiu da operação ativa.
            </p>
            <p className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-900 shadow-sm">
              Além das reservas, a equipe enxerga mesas livres, lugares disponíveis, pessoas previstas e pressão do horário de pico.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1411] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-200">Diferencial operacional</p>
            <h2 className="text-3xl font-black md:text-5xl">Protocolo transforma dúvida em acompanhamento.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Quando a reserva vira protocolo, o cliente consegue consultar o status e a equipe reduz mensagens repetidas perguntando se a mesa foi confirmada.
            </p>
          </div>
          <TrackingPreview />
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="IA nos planos avançados"
            title="IA demonstrativa para apoiar a operação, não substituir sua equipe."
            text="Nos planos com IA, o sistema pode apoiar a equipe com resumos, alertas e sugestões para preparar melhor o salão. A IA Operacional fica mais útil porque analisa reservas, capacidade e pendências do salão."
          />
          <div className="mt-9 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black uppercase text-violet-800">Resumo simulado</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-700">Apoio inteligente</span>
              </div>
              <Bot className="mb-5 h-8 w-8 text-violet-700" />
              <h3 className="text-2xl font-black">Assistente operacional demonstrativo</h3>
              <div className="mt-6 space-y-3 text-sm">
                <InfoLine label="Pico previsto" value="20h às 21h" />
                <InfoLine label="Atenção" value="aniversário informado" />
                <InfoLine label="Sugestão" value="mesa mais tranquila" />
                <InfoLine label="Controle" value="equipe decide" />
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              {aiCards.map(([title, text]) => (
                <article key={title} className="group rounded-3xl border border-violet-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl">
                  <Sparkles className="mb-4 h-5 w-5 text-violet-700 transition group-hover:scale-110" />
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="bg-[#07110d] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-200">Planos</p>
            <h2 className="text-3xl font-black md:text-5xl">Planos para organizar reservas e evoluir a operação</h2>
            <p className="mt-4 text-slate-300">
              Implantação, suporte e clareza operacional para o restaurante parar de improvisar reservas.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="FAQ"
            title="O essencial antes da conversa comercial"
            text="Respostas curtas para alinhar expectativa sem prometer automação que não faz parte desta fase."
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl">
                <h3 className="font-black">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1411] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-black text-emerald-100">
              <BrandMark compact />
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>Tecnologia por Montalvex</span>
            </div>
          </div>
          <h2 className="text-3xl font-black md:text-5xl">Quer organizar as reservas antes do próximo horário de pico?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Solicite uma proposta e veja como o Montalvex Reservas pode se adaptar à operação do seu restaurante.
          </p>
          <WhatsappButton label="Solicitar proposta no WhatsApp" className="mt-8 min-h-13 px-7" />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#07110d] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
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

function Header() {
  return (
    <header className="sticky top-0 z-40 max-w-[100vw] overflow-hidden border-b border-white/10 bg-[#07110d]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[100vw] items-center justify-between gap-2 px-4 py-3 sm:max-w-7xl sm:gap-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <BrandMark />
          <span className="hidden min-w-0 text-sm font-black text-slate-100 sm:block sm:text-base">
            Reservas
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-glow hidden min-h-10 shrink-0 items-center justify-center rounded-2xl bg-[#C2410C] px-4 text-sm font-black text-white shadow-xl shadow-[#C2410C]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#D64A0F] sm:inline-flex"
        >
          Solicitar proposta
        </a>
      </div>
    </header>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  const frameClass = compact
    ? "h-8 w-32 px-2"
    : "h-10 w-32 px-2 sm:h-12 sm:w-56 sm:px-3";

  return (
    <span className="flex min-w-0 items-center" aria-label="Montalvex">
      <span className={`${frameClass} flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-white/15`}>
        <Image
          src="/montalvex-logo.png"
          alt="Montalvex"
          width={1071}
          height={279}
          priority={!compact}
          className="h-full w-auto max-w-full object-contain"
        />
      </span>
    </span>
  );
}

function WhatsappButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-glow inline-flex items-center justify-center rounded-2xl bg-[#C2410C] font-black text-white shadow-xl shadow-[#C2410C]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#D64A0F] ${className}`}
    >
      {label}
    </a>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-lg shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11]">
      <p className="text-2xl font-black text-[#F7F0DF]">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-300 sm:text-xs">{label}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="premium-card relative mx-auto w-full max-w-full overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:max-w-2xl sm:p-4">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent" />
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-xs font-black text-slate-100">
        <span className="flex items-center gap-2">
          <span className="pulse-dot" />
          Sistema online
        </span>
        <span className="hidden text-emerald-200 sm:inline">reserva recebida</span>
      </div>
      <div className="grid min-w-0 gap-4 md:grid-cols-[0.78fr_1fr] md:items-center">
        <div className="mx-auto w-full max-w-[250px]">
          <ReservationPhone compact />
        </div>
        <div className="min-w-0 space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200/40 bg-[#F7F0DF] px-4 py-3 text-xs font-black text-amber-950 shadow-lg">
            <span className="flex items-center gap-2">
              <span className="pulse-dot bg-amber-600" />
              Nova solicitação
            </span>
            <span>20:30</span>
          </div>
          <PanelPreview compact />
          <div className="rounded-2xl border border-emerald-200/20 bg-emerald-950/75 p-4 shadow-lg">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-200">Protocolo MV-8F42A1</p>
            <p className="mt-1 text-sm font-black text-white">Status: Confirmada</p>
            <p className="mt-1 text-xs font-semibold text-emerald-50/70">20:30 · 4 pessoas · equipe preparada</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C2410C]">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="group min-w-0 rounded-2xl border border-amber-200/70 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C2410C]/40 hover:shadow-xl">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F0DF] text-[#C2410C] transition group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="break-words font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function BeforeAfterCard({ title, items, tone }: { title: string; items: string[]; tone: "before" | "after" }) {
  const after = tone === "after";

  return (
    <article className={`min-w-0 rounded-2xl border p-6 shadow-2xl transition duration-300 hover:-translate-y-1 ${
      after
        ? "border-emerald-200/20 bg-emerald-200/10 shadow-emerald-950/20"
        : "border-white/10 bg-white/[0.06] shadow-black/20"
    }`}>
      <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
        after ? "bg-emerald-200 text-emerald-950" : "bg-[#C2410C] text-white"
      }`}>
        {title}
      </span>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold">
            <CheckCircle2 className={`h-4 w-4 shrink-0 ${after ? "text-emerald-300" : "text-[#F7F0DF]"}`} />
            <span className="min-w-0 break-words">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ReservationPhone({ compact = false }: { compact?: boolean }) {
  return (
    <div className="w-full rounded-[30px] border border-slate-900/10 bg-[#071A13] p-3 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1">
      <div className="rounded-[24px] bg-[#F7F0DF] p-4 text-slate-950">
        <div className="rounded-2xl bg-emerald-950 px-4 py-5 text-center text-[#F7F0DF]">
          <Utensils className="mx-auto mb-2 h-7 w-7" />
          <h3 className="font-serif-bistro text-xl font-bold">Bistrô Monte Verde</h3>
          <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
        </div>
        <div className="mt-4 space-y-3">
          <MiniField label="Data" value="Hoje" />
          <MiniField label="Horário" value="20:30" />
          {!compact ? <MiniField label="Pessoas" value="4 pessoas" /> : null}
          {!compact ? <MiniField label="Protocolo" value="MV-8F42A1" /> : null}
          {!compact ? <MiniField label="Status" value="Confirmada" /> : null}
          <div className="rounded-2xl bg-[#C2410C] py-3 text-center text-sm font-black text-white shadow-lg">
            Enviar reserva
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-slate-950 shadow-xl transition duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Painel operacional</p>
          <p className="font-black">Reservas e salão</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className={compact ? "grid grid-cols-3 gap-2 [grid-template-columns:repeat(3,minmax(0,1fr))]" : "grid grid-cols-2 gap-2 sm:grid-cols-4"}>
        <MiniKpi value="8" label="hoje" />
        <MiniKpi value="3" label="pend." tone="amber" />
        {!compact ? <MiniKpi value="5" label="conf." tone="emerald" /> : null}
        {!compact ? <MiniKpi value="28" label="pessoas" tone="slate" /> : null}
        {compact ? <MiniKpi value="6" label="livres" tone="sky" /> : null}
      </div>
      <div className="mt-4 space-y-2">
        <PanelRow name="Mariana Costa" meta="20:30 · 4 pessoas" status="Pendente" tone="pending" />
        <PanelRow name="Lucas Martins" meta="20:00 · 2 pessoas" status="Confirmada" tone="confirmed" />
        {!compact ? <PanelRow name="Capacidade" meta="10 mesas ocupadas · 6 livres" status="Salão" tone="confirmed" /> : null}
        {!compact ? <PanelRow name="Finalizadas" meta="Histórico organizado" status="Histórico" tone="history" /> : null}
        {!compact ? <PanelRow name="Recusadas" meta="Fora da operação ativa" status="Separado" tone="history" /> : null}
      </div>
    </div>
  );
}

function TrackingPreview() {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-700 bg-white p-5 text-slate-950 shadow-2xl transition duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Protocolo</p>
          <p className="font-mono text-2xl font-black text-emerald-950">MV-8F42A1</p>
        </div>
        <span className="status-pill shrink-0 bg-emerald-100 text-emerald-700">Confirmada</span>
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

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  const bullets = planBullets[plan.name] ?? plan.features;

  return (
    <article className={`min-w-0 rounded-2xl border p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
      plan.highlighted
        ? "border-emerald-200 bg-[#F7F0DF] text-slate-950 lg:-mt-4"
        : "border-white/12 bg-white/[0.07] text-white"
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
      <div className={`my-6 rounded-3xl border p-5 ${plan.highlighted ? "border-emerald-950/15 bg-white" : "border-white/10 bg-slate-950/70"}`}>
        <p className="text-sm font-bold opacity-70">Implantação</p>
        <p className="text-2xl font-black">R$ {plan.priceSetup.toLocaleString("pt-BR")}</p>
        <p className="mt-4 text-sm font-bold opacity-70">Mensalidade</p>
        <p className="text-3xl font-black">
          R$ {plan.priceMonthly}<span className="text-base font-bold opacity-70">/mês</span>
        </p>
      </div>
      <ul className="mb-6 space-y-3 text-sm">
        {bullets.map((feature) => (
          <li key={feature} className="flex min-w-0 gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0 break-words">{feature}</span>
          </li>
        ))}
      </ul>
      <WhatsappButton label="Solicitar proposta" className="min-h-12 w-full px-4 text-sm" />
    </article>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-3 shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</p>
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
    <div className={`min-w-0 rounded-2xl border p-2 sm:p-3 ${classes[tone]}`}>
      <p className="break-words text-lg font-black sm:text-xl">{value}</p>
      <p className="break-words text-xs font-bold opacity-70">{label}</p>
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
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words font-black">{name}</p>
          <p className="break-words text-xs font-bold text-slate-500">{meta}</p>
        </div>
        <span className={`status-pill shrink-0 ${styles[tone]}`}>{status}</span>
      </div>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
      <span className="min-w-0 font-semibold text-slate-500">{label}</span>
      <span className="min-w-0 break-words text-right font-black">{value}</span>
    </div>
  );
}

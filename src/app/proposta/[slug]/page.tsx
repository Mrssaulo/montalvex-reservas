import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  History,
  LayoutDashboard,
  PhoneCall,
  SearchCheck,
  Table2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { plans } from "@/lib/mock-data";
import { getProposalBySlug, proposals, type Proposal } from "@/lib/proposals";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const flowSteps = [
  [PhoneCall, "Cliente reserva", "O cliente abre o link do restaurante e envia data, horario, pessoas e observacoes."],
  [LayoutDashboard, "Equipe confirma", "A solicitacao chega no painel para a equipe confirmar, recusar ou finalizar depois do atendimento."],
  [SearchCheck, "Cliente acompanha", "O protocolo reduz perguntas repetidas e mostra o status da reserva com telefone."],
] satisfies Array<[LucideIcon, string, string]>;

export function generateStaticParams() {
  return proposals.map((proposal) => ({ slug: proposal.slug }));
}

export default async function ProposalPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = getProposalBySlug(slug);

  if (!proposal) {
    notFound();
  }

  const recommendedPlan = plans.find((plan) => plan.name === proposal.recommendedPlan);
  const priceVisible = proposal.showPrices && recommendedPlan;

  return (
    <main className="min-h-screen max-w-[100vw] overflow-x-hidden bg-[#07110d] text-white [&_*]:min-w-0">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07110d]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Montalvex Reservas">
            <span className="flex h-10 w-32 items-center justify-center overflow-hidden rounded-xl bg-white px-2 shadow-lg ring-1 ring-white/15 sm:h-12 sm:w-56 sm:px-3">
              <Image
                src="/montalvex-logo.png"
                alt="Montalvex"
                width={1071}
                height={279}
                priority
                className="h-full w-auto max-w-full object-contain"
              />
            </span>
          </Link>
          <Link
            href={proposal.demoReservationUrl}
            className="hidden min-h-10 items-center justify-center rounded-2xl bg-[#C2410C] px-4 text-sm font-black text-white shadow-xl shadow-[#C2410C]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#D64A0F] sm:inline-flex"
          >
            Abrir demo
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-95"
          style={{
            background: `radial-gradient(circle at 18% 20%, ${proposal.primaryColor}55, transparent 31%), radial-gradient(circle at 80% 16%, ${proposal.accentColor}44, transparent 28%), linear-gradient(135deg, #07110d 0%, #0b1814 44%, #12100d 100%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="mobile-gutter relative grid gap-10 pb-16 pt-12 sm:max-w-7xl sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-100 shadow-lg shadow-emerald-950/20">
              <span className="pulse-dot" />
              Proposta personalizada
            </p>
            <h1 className="max-w-4xl text-3xl font-black leading-[1.05] text-white text-balance sm:text-5xl lg:text-7xl">
              {proposal.restaurantName}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-8 text-[#F7F0DF] sm:text-2xl">
              {proposal.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {proposal.subheadline}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <HeroPill icon={Table2} label={proposal.segment} />
              <HeroPill icon={Users} label={proposal.city} />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={proposal.demoReservationUrl}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-7 font-black text-white shadow-xl transition duration-300 hover:-translate-y-1"
                style={{ background: proposal.accentColor }}
              >
                Ver reserva do cliente
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={proposal.demoAdminUrl}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.08] px-7 font-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.13]"
              >
                Ver painel da equipe
              </Link>
            </div>
          </div>

          <ProposalPreview proposal={proposal} />
        </div>
      </section>

      <section className="bg-[#F7F0DF] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C2410C]">
              Diagnostico
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Para {proposal.restaurantName}, o problema nao e falta de cliente.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              E organizar {proposal.mainPain} sem perder controle do salao.
            </p>
          </div>
          <div className="grid gap-4">
            <DiagnosticCard
              icon={ClipboardCheck}
              title="Dor principal"
              text={proposal.mainPain}
            />
            <DiagnosticCard
              icon={History}
              title="O que precisa ficar claro"
              text={proposal.secondaryPain}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Fluxo proposto"
            title="Mesmo produto base, com uma proposta que fala da operacao da casa."
            text="A experiencia continua simples: pedido padronizado, decisao da equipe e acompanhamento por protocolo."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {flowSteps.map(([Icon, title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: proposal.primaryColor }}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07110d] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-emerald-200">
              Plano recomendado
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              {proposal.recommendedPlan}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Recomendado para {proposal.restaurantName} porque resolve a organizacao das reservas primeiro e deixa espaco para evoluir a operacao comercial.
            </p>
          </div>

          <article className="rounded-2xl border border-white/12 bg-white/[0.07] p-6 shadow-xl">
            {recommendedPlan ? (
              <>
                <p className="text-sm font-bold text-slate-300">{recommendedPlan.tagline}</p>
                {priceVisible ? (
                  <div className="my-6 grid gap-3 sm:grid-cols-2">
                    <PriceBox label="Implantacao" value={`R$ ${recommendedPlan.priceSetup.toLocaleString("pt-BR")}`} />
                    <PriceBox label="Mensalidade" value={`R$ ${recommendedPlan.priceMonthly}/mes`} />
                  </div>
                ) : (
                  <p className="my-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-bold text-slate-300">
                    Valores podem ser apresentados na conversa comercial conforme escopo final.
                  </p>
                )}
                <ul className="grid gap-3 text-sm">
                  {proposal.proposalNotes.map((note) => (
                    <li key={note} className="flex gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span className="break-words">{note}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm font-bold text-slate-300">
                Plano recomendado configurado para esta proposta.
              </p>
            )}
          </article>
        </div>
      </section>

      <section className="bg-[#0B1411] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-black text-emerald-100">
              <span className="flex h-8 w-32 items-center justify-center overflow-hidden rounded-xl bg-white px-2">
                <Image
                  src="/montalvex-logo.png"
                  alt="Montalvex"
                  width={1071}
                  height={279}
                  className="h-full w-auto max-w-full object-contain"
                />
              </span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>Tecnologia por Montalvex</span>
            </div>
          </div>
          <h2 className="text-3xl font-black md:text-5xl">
            Vamos ver o Montalvex Reservas funcionando para {proposal.restaurantName}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            A proposta e personalizada, mas o produto base continua consistente: reserva pelo celular, painel da equipe e acompanhamento por protocolo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={proposal.demoReservationUrl}
              className="inline-flex min-h-13 items-center justify-center rounded-2xl px-7 font-black text-white shadow-xl transition duration-300 hover:-translate-y-1"
              style={{ background: proposal.accentColor }}
            >
              Testar reserva
            </Link>
            <Link
              href={proposal.demoAdminUrl}
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] px-7 font-black text-white transition duration-300 hover:-translate-y-1 hover:bg-white/[0.13]"
            >
              Abrir painel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold text-slate-100 shadow-lg shadow-black/10 backdrop-blur">
      <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
      <span className="break-words">{label}</span>
    </div>
  );
}

function ProposalPreview({ proposal }: { proposal: Proposal }) {
  return (
    <div className="premium-card relative mx-auto w-full max-w-2xl overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-xs font-black text-slate-100">
        <span className="flex items-center gap-2">
          <span className="pulse-dot" />
          Proposta ativa
        </span>
        <span className="hidden text-emerald-200 sm:inline">{proposal.recommendedPlan}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-[0.75fr_1fr] md:items-center">
        <div className="rounded-[30px] border border-slate-900/10 bg-[#071A13] p-3 shadow-2xl shadow-black/20">
          <div className="rounded-[24px] bg-[#F7F0DF] p-4 text-slate-950">
            <div className="rounded-2xl px-4 py-5 text-center text-[#F7F0DF]" style={{ background: proposal.primaryColor }}>
              <CalendarCheck className="mx-auto mb-2 h-7 w-7" />
              <h3 className="font-serif-bistro text-xl font-bold">{proposal.restaurantName}</h3>
              <p className="mt-1 text-xs opacity-80">Reserva de mesa</p>
            </div>
            <div className="mt-4 space-y-3">
              <MiniField label="Horario" value="20:30" />
              <MiniField label="Pessoas" value="4 pessoas" />
              <div className="rounded-2xl py-3 text-center text-sm font-black text-white shadow-lg" style={{ background: proposal.accentColor }}>
                Enviar reserva
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <PreviewRow label="Nova solicitacao" value="Pendente" tone="pending" />
          <PreviewRow label="Capacidade" value="Sera acompanhada no painel" tone="confirmed" />
          <PreviewRow label="Historico" value="Separado da operacao ativa" tone="history" />
          <div className="rounded-2xl border border-emerald-200/20 bg-emerald-950/75 p-4 shadow-lg">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
              Protocolo MV-8F42A1
            </p>
            <p className="mt-1 text-sm font-black text-white">Cliente acompanha sem nova mensagem.</p>
          </div>
        </div>
      </div>
    </div>
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

function PreviewRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "pending" | "confirmed" | "history";
}) {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-700",
    history: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-950">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-black">{label}</p>
          <p className="text-xs font-bold text-slate-500">{value}</p>
        </div>
        <span className={`status-pill shrink-0 ${styles[tone]}`}>{tone}</span>
      </div>
    </div>
  );
}

function DiagnosticCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-amber-200/70 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C2410C]/40 hover:shadow-xl">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F0DF] text-[#C2410C]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#C2410C]">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight md:text-5xl">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function PriceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-sm font-bold text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

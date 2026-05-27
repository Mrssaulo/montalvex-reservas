import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  History,
  LayoutDashboard,
  MessageSquareText,
  SearchCheck,
  Smartphone,
  Sparkles,
  Table2,
  Zap,
  type LucideIcon,
} from "lucide-react";

const flow = [
  ["Cliente acessa", "Link do restaurante no celular."],
  ["Solicita reserva", "Data, horario, pessoas e observacao."],
  ["Recebe protocolo", "Acompanha status com telefone."],
  ["Equipe confirma", "Painel mostra pendentes e confirmadas."],
];

const realRoutes = [
  [Smartphone, "Reserva real de teste", "/r/bistro-monte-verde/reserva"],
  [SearchCheck, "Acompanhamento real", "/r/bistro-monte-verde/acompanhar"],
  [LayoutDashboard, "Painel real admin", "/admin/bistro-monte-verde/reservas"],
] satisfies Array<[LucideIcon, string, string]>;

const aiExamples = [
  "Resumo do jantar",
  "Horario de pico",
  "Aniversarios e observacoes",
  "Sugestoes para o salao",
];

export default function DemoHubPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#10251d] px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-emerald-50/75 transition hover:-translate-x-0.5 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Pagina comercial
        </Link>

        <section className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-100">
              <span className="pulse-dot" />
              Demonstracao comercial
            </p>
            <h1 className="text-4xl font-black tracking-normal md:text-6xl">
              Veja o mesmo produto por tres angulos.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/75">
              Experiencia do cliente, painel da equipe e acompanhamento por protocolo. A proposta comercial agora conversa com o app real.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo/reserva" className="cta-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-[#C06C58] px-6 font-black text-white transition hover:-translate-y-0.5">
                Experiencia do cliente
              </Link>
              <Link href="/demo/painel" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/8 px-6 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/12">
                Painel da equipe
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/8 p-5 shadow-2xl shadow-black/25">
            <p className="mb-4 text-sm font-black uppercase tracking-wide text-emerald-100/70">Fluxo completo</p>
            <div className="grid gap-3 sm:grid-cols-4">
              {flow.map(([title, text], index) => (
                <article key={title} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDFBF7] text-sm font-black text-[#1B4332]">
                    {index + 1}
                  </span>
                  <h2 className="text-sm font-black">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-emerald-50/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-7 grid gap-5 md:grid-cols-2">
          <DemoCard
            href="/demo/reserva"
            icon={Smartphone}
            eyebrow="Cliente"
            title="Reserva pelo celular"
            text="Tela premium do Bistro Monte Verde com horario, pessoas, observacao e confirmacao simulada."
          >
            <PhonePreview />
          </DemoCard>

          <DemoCard
            href="/demo/painel"
            icon={LayoutDashboard}
            eyebrow="Equipe"
            title="Painel operacional"
            text="Pendentes, confirmadas, KPIs, acao de confirmar/recusar/finalizar e assistente demonstrativo."
          >
            <PanelPreview />
          </DemoCard>
        </section>

        <section className="mb-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-emerald-200/18 bg-white/8 p-5">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-200/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-100">
              <SearchCheck className="h-3.5 w-3.5" />
              Acompanhamento
            </p>
            <h2 className="text-2xl font-black">Protocolo e status para o cliente</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/70">
              O cliente consulta a reserva com codigo e telefone. Isso conecta a demo comercial ao fluxo real que estamos construindo.
            </p>
          </div>
          <TrackingMini />
        </section>

        <section className="mb-7 rounded-lg border border-violet-200/18 bg-violet-200/8 p-5">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-wide text-violet-100">
                <Sparkles className="h-3.5 w-3.5" />
                IA demonstrativa
              </p>
              <h2 className="text-2xl font-black">Apoio para cliente e equipe</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/70">
                Respostas simuladas para demonstrar potencial dos planos com IA. A equipe continua no controle.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {aiExamples.map((item, index) => (
                <div key={item} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
                  {index % 2 === 0 ? <Zap className="mb-3 h-4 w-4 text-violet-100" /> : <MessageSquareText className="mb-3 h-4 w-4 text-violet-100" />}
                  <p className="text-sm font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/12 bg-white/8 p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-100/60">Rotas reais de desenvolvimento</p>
              <h2 className="text-2xl font-black">Teste a base Supabase separada da demo</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-emerald-50/60">
              Links internos para validacao. Nao sao apresentados como produto final publico na landing principal.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {realRoutes.map(([Icon, title, href]) => (
              <Link key={href} href={href} className="group rounded-lg border border-white/10 bg-[#071A13] p-4 transition hover:-translate-y-1 hover:bg-white/10">
                <Icon className="mb-4 h-6 w-6 text-emerald-100" />
                <p className="font-black">{title}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C06C58] group-hover:translate-x-1">
                  Abrir rota
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function DemoCard({
  href,
  icon: Icon,
  eyebrow,
  title,
  text,
  children,
}: {
  href: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group premium-card relative overflow-hidden rounded-lg border border-white/10 bg-white/8 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-emerald-100">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-100/70">{eyebrow}</p>
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/70">{text}</p>
          <span className="mt-7 inline-flex items-center gap-2 font-black text-[#C06C58] transition group-hover:translate-x-1">
            Abrir
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        {children}
      </div>
    </Link>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto w-[220px] rounded-[28px] border border-white/15 bg-[#071A13] p-3 shadow-2xl shadow-black/30">
      <div className="rounded-[22px] bg-[#FDFBF7] p-4 text-slate-900">
        <div className="rounded-2xl bg-[#1B4332] p-5 text-center text-white">
          <CalendarCheck className="mx-auto mb-2 h-7 w-7" />
          <p className="font-serif-bistro text-xl font-bold">Bistro Monte Verde</p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <p className="text-xs font-black text-slate-400">Horario escolhido</p>
            <p className="font-black">20:00 · 4 pessoas</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
            <span className="rounded-lg border p-2">18:30</span>
            <span className="rounded-lg bg-[#1B4332] p-2 text-white">20:00</span>
            <span className="rounded-lg border p-2">22:30</span>
          </div>
          <div className="rounded-lg bg-[#C06C58] py-3 text-center text-xs font-black text-white">
            Enviar solicitacao
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Painel</p>
          <p className="font-black">Reservas de hoje</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MiniKpi value="4" label="reservas" />
        <MiniKpi value="16" label="pessoas" />
        <MiniKpi value="1" label="nova" />
      </div>
      <div className="mt-4 space-y-2">
        <PanelPill icon={Table2} text="Recebida agora · 20:00" tone="pending" />
        <PanelPill icon={CheckCircle2} text="Lucas Martins - 18:30 confirmada" tone="confirmed" />
        <PanelPill icon={History} text="Historico separado" tone="history" />
      </div>
    </div>
  );
}

function TrackingMini() {
  return (
    <div className="rounded-lg border border-[#E8E2D4] bg-[#FDFBF7] p-5 text-[#1F2937] shadow-xl">
      <div className="mb-4 flex items-center justify-between border-b border-[#E8E2D4] pb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">Protocolo</p>
          <p className="font-mono text-lg font-black text-[#1B4332]">#MV-8F42A1</p>
        </div>
        <span className="status-pill bg-emerald-100 text-emerald-700">Confirmada</span>
      </div>
      <p className="text-sm font-semibold text-[#6B7280]">20:30 · 4 pessoas</p>
      <p className="mt-2 text-sm font-bold text-[#1B4332]">A equipe ja esta preparada para receber voce.</p>
    </div>
  );
}

function MiniKpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

function PanelPill({ icon: Icon, text, tone }: { icon: LucideIcon; text: string; tone: "pending" | "confirmed" | "history" }) {
  const classes = {
    pending: "border-amber-200 bg-amber-50 text-amber-900",
    confirmed: "border-emerald-200 bg-emerald-50 text-emerald-800",
    history: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <div className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-black ${classes[tone]}`}>
      <Icon className="h-4 w-4" />
      {text}
    </div>
  );
}

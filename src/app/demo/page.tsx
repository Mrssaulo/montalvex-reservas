import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Clock,
  History,
  LayoutDashboard,
  MessageSquareText,
  SearchCheck,
  Smartphone,
  Sparkles,
  Table2,
  Users,
  type LucideIcon,
} from "lucide-react";

const guidedSteps = [
  ["01", "Abra a experiencia do cliente", "Mostre o link do restaurante e o formulario de reserva pelo celular."],
  ["02", "Faca uma solicitacao", "Escolha horario, pessoas e observacao para simular uma reserva real."],
  ["03", "Copie o protocolo", "Use o codigo gerado para explicar o acompanhamento do cliente."],
  ["04", "Veja no painel da equipe", "A reserva entra como pendente para confirmar ou recusar."],
  ["05", "Consulte o status", "O cliente acompanha com protocolo e telefone."],
  ["06", "Mostre a IA demonstrativa", "Resumo e sugestoes aparecem como potencial dos planos avancados."],
];

const realRoutes = [
  [Smartphone, "Reserva real de teste", "/r/bistro-monte-verde/reserva"],
  [SearchCheck, "Acompanhamento real", "/r/bistro-monte-verde/acompanhar"],
  [LayoutDashboard, "Painel real admin", "/admin/bistro-monte-verde/reservas"],
] satisfies Array<[LucideIcon, string, string]>;

const aiCards = [
  ["Pico previsto", "20h as 21h"],
  ["Atencao", "Aniversario informado"],
  ["Sugestao", "Mesa mais tranquila"],
  ["Resumo", "3 pendentes, 5 confirmadas, 28 pessoas previstas"],
];

export default function DemoHubPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0f241d] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-50/75 transition hover:-translate-x-0.5 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Pagina comercial
        </Link>

        <section className="mb-12 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase text-emerald-100">
              <span className="pulse-dot" />
              Demonstracao comercial guiada
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Uma demo para mostrar o produto funcionando do pedido ao painel.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/75">
              Apresente a jornada completa: cliente reserva, equipe recebe, protocolo acompanha e IA demonstrativa ajuda a vender a visao premium sem prometer automacao real.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo/reserva" className="cta-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-[#C06C58] px-6 font-black text-white shadow-xl transition hover:-translate-y-0.5">
                Experiencia do cliente
              </Link>
              <Link href="/demo/painel" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/8 px-6 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/12">
                Painel da equipe
              </Link>
            </div>
          </div>

          <HeroDemoStack />
        </section>

        <section className="mb-7 rounded-lg border border-white/12 bg-white/8 p-5 shadow-2xl shadow-black/20">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-emerald-100/60">Apresentacao guiada</p>
              <h2 className="text-2xl font-black">Veja o fluxo funcionando</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-emerald-50/60">
              Use esses blocos como roteiro comercial para mostrar o que muda na rotina do restaurante.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guidedSteps.map(([number, title, text]) => (
              <article key={number} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDFBF7] text-sm font-black text-[#1B4332]">
                  {number}
                </span>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/62">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-7 grid gap-5 md:grid-cols-2">
          <DemoCard
            href="/demo/reserva"
            icon={Smartphone}
            eyebrow="Cliente"
            title="Reserva pelo celular"
            text="Tela do Bistro Monte Verde com horario, pessoas, observacao e protocolo apos envio."
          >
            <PhonePreview />
          </DemoCard>

          <DemoCard
            href="/demo/painel"
            icon={LayoutDashboard}
            eyebrow="Equipe"
            title="Painel operacional"
            text="Pendentes, confirmadas, historico, KPIs, proxima chegada e botoes de acao."
          >
            <PanelPreview />
          </DemoCard>
        </section>

        <section className="mb-7 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-emerald-200/18 bg-white/8 p-5">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-200/10 px-3 py-1 text-xs font-black uppercase text-emerald-100">
              <SearchCheck className="h-3.5 w-3.5" />
              Acompanhamento
            </p>
            <h2 className="text-2xl font-black">Protocolo e status para o cliente</h2>
            <p className="mt-3 text-sm leading-6 text-emerald-50/70">
              O cliente nao precisa perguntar de novo no WhatsApp. Ele acompanha a reserva com protocolo e telefone.
            </p>
          </div>
          <TrackingMini />
        </section>

        <section className="mb-7 rounded-lg border border-violet-200/18 bg-violet-200/8 p-5">
          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-white/8 px-3 py-1 text-xs font-black uppercase text-violet-100">
                <Sparkles className="h-3.5 w-3.5" />
                IA demonstrativa
              </p>
              <h2 className="text-2xl font-black">Assistente IA demonstrativo</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/70">
                Respostas simuladas para demonstrar potencial dos planos com IA. Disponivel nos planos com IA; a equipe continua no controle.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {aiCards.map(([label, value], index) => (
                <div key={label} className="rounded-lg border border-white/10 bg-[#071A13] p-4">
                  {index % 2 === 0 ? <Bot className="mb-3 h-4 w-4 text-violet-100" /> : <MessageSquareText className="mb-3 h-4 w-4 text-violet-100" />}
                  <p className="text-xs font-bold uppercase text-violet-100/60">{label}</p>
                  <p className="mt-1 text-sm font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/12 bg-white/8 p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-emerald-100/60">Links reais funcionando</p>
              <h2 className="text-2xl font-black">Teste o produto real sem sair da apresentacao</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-emerald-50/60">
              Caminhos para validar a reserva do cliente, o acompanhamento por protocolo e o painel da equipe.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {realRoutes.map(([Icon, title, href]) => (
              <Link
                key={href}
                href={href}
                aria-label={`Abrir rota: ${title}`}
                className="group block h-full rounded-lg border border-white/10 bg-[#071A13] p-4 transition hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C06C58] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f241d]"
              >
                <Icon className="mb-4 h-6 w-6 text-emerald-100" />
                <p className="font-black">{title}</p>
                <p className="mt-2 font-mono text-xs text-emerald-50/50">{href}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C06C58] transition group-hover:translate-x-1">
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

function HeroDemoStack() {
  return (
    <div className="relative min-h-[520px]">
      <div className="absolute left-0 top-0 w-[230px] rounded-[28px] border border-white/15 bg-[#071A13] p-3 shadow-2xl shadow-black/35">
        <PhonePreview />
      </div>
      <div className="absolute right-0 top-16 w-[78%] rounded-2xl border border-white/12 bg-white p-4 text-slate-950 shadow-2xl shadow-black/35">
        <PanelPreview />
      </div>
      <div className="floating-card absolute bottom-6 left-6 rounded-lg border border-emerald-200/20 bg-[#071A13] p-4 shadow-2xl">
        <p className="text-xs font-black uppercase text-emerald-200">Nova reserva</p>
        <p className="mt-1 text-sm font-black">20:30 - 4 pessoas</p>
      </div>
      <div className="floating-card float-delay absolute bottom-24 right-4 rounded-lg border border-violet-200/20 bg-violet-950/80 p-4 shadow-2xl backdrop-blur">
        <p className="text-xs font-black uppercase text-violet-200">IA demonstrativa</p>
        <p className="mt-1 text-sm font-black">Aniversario informado</p>
      </div>
    </div>
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
          <p className="mb-2 text-xs font-black uppercase text-emerald-100/70">{eyebrow}</p>
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
            <p className="font-black">20:30 - 4 pessoas</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
            <span className="rounded-lg border p-2">19:30</span>
            <span className="rounded-lg border p-2">20:00</span>
            <span className="rounded-lg bg-[#1B4332] p-2 text-white">20:30</span>
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
          <p className="text-xs font-black uppercase text-slate-500">Painel</p>
          <p className="font-black">Reservas de hoje</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">online</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <MiniKpi value="8" label="hoje" />
        <MiniKpi value="28" label="pessoas" />
        <MiniKpi value="3" label="pend." />
        <MiniKpi value="20:30" label="prox." />
      </div>
      <div className="mt-4 space-y-2">
        <PanelPill icon={Clock} text="Mariana - 20:30 pendente" tone="pending" />
        <PanelPill icon={CheckCircle2} text="Lucas - 20:00 confirmada" tone="confirmed" />
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
          <p className="text-xs font-black uppercase text-[#6B7280]">Protocolo</p>
          <p className="font-mono text-lg font-black text-[#1B4332]">MV-8F42A1</p>
        </div>
        <span className="status-pill bg-emerald-100 text-emerald-700">Confirmada</span>
      </div>
      <div className="grid gap-3 text-sm">
        <InfoLine icon={Clock} label="Horario" value="20:30" />
        <InfoLine icon={Users} label="Pessoas" value="4 pessoas" />
        <InfoLine icon={Table2} label="Status" value="Mesa preparada" />
      </div>
    </div>
  );
}

function MiniKpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-lg font-black">{value}</p>
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

function InfoLine({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-[#E8E2D4] bg-white p-3">
      <span className="inline-flex items-center gap-2 font-semibold text-[#6B7280]">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

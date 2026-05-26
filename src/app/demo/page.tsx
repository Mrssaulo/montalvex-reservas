import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  LayoutDashboard,
  MessageSquareText,
  Smartphone,
  Sparkles,
  Table2,
  Zap,
} from "lucide-react";

const flow = [
  { title: "Cliente acessa o link", text: "No Instagram, Google, QR code ou cardápio." },
  { title: "Solicita a reserva", text: "Escolhe horário, pessoas e deixa observações." },
  { title: "Equipe recebe no painel", text: "A solicitação entra como pendente, pronta para ação." },
  { title: "Mesa fica preparada", text: "O salão sabe quem chega e quando agir." },
];

const aiExamples = [
  "Resumo das reservas do dia",
  "Horários de maior movimento",
  "Observações importantes",
  "Dúvidas frequentes de clientes",
  "Sugestões para preparar o salão",
];

export default function DemoHubPage() {
  return (
    <main className="hero-glow min-h-screen overflow-hidden bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="reveal-up mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:-translate-x-0.5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
          <ArrowLeft className="h-4 w-4" />
          Página comercial
        </Link>

        <section className="reveal-up mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-300">
              <span className="pulse-dot" />
              Demonstração comercial
            </p>
            <h1 className="text-4xl font-black tracking-normal md:text-6xl">
              Do celular do cliente ao painel da equipe, em uma noite de salão cheio.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Acompanhe o fluxo real: o cliente solicita a reserva, a equipe recebe no painel, confirma o horário e prepara a mesa antes da chegada.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo/reserva" className="cta-glow inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-400 px-6 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
                Abrir reserva
              </Link>
              <Link href="/demo/painel" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-600 bg-white/5 px-6 font-black text-white transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
                Abrir painel
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/25">
            <p className="mb-4 text-sm font-black uppercase tracking-wide text-slate-400">Fluxo completo</p>
            <div className="grid gap-3 sm:grid-cols-4">
              {flow.map((step, index) => (
                <article key={step.title} className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
                  <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  <h2 className="text-sm font-black">{step.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-7 grid gap-5 md:grid-cols-2">
          <DemoCard
            href="/demo/reserva"
            tone="emerald"
            icon={Smartphone}
            eyebrow="Visão do cliente"
            title="Solicitação de reserva pelo celular"
            text="O cliente informa dados, horário e observações em uma tela com a identidade do restaurante."
            cta="Ver experiência do cliente"
          >
            <PhonePreview />
          </DemoCard>

          <DemoCard
            href="/demo/painel"
            tone="sky"
            icon={LayoutDashboard}
            eyebrow="Visão da equipe"
            title="Painel para controlar o salão"
            text="A equipe acompanha pendências, confirma grupos e organiza as próximas chegadas no horário de pico."
            cta="Ver painel da equipe"
          >
            <PanelPreview />
          </DemoCard>
        </section>

        <section className="reveal-up mb-7 rounded-lg border border-violet-300/20 bg-violet-400/10 p-5">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-wide text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                IA demonstrativa
              </p>
              <h2 className="text-2xl font-black">Módulo de IA nos planos avançados</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Um apoio visual para mostrar como a IA pode ajudar cliente e equipe nos planos com IA, sem substituir a confirmação humana da reserva.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {aiExamples.map((item, index) => (
                <div key={item} className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-300/15 text-violet-200">
                    {index % 2 === 0 ? <Zap className="h-4 w-4" /> : <MessageSquareText className="h-4 w-4" />}
                  </div>
                  <p className="text-sm font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal-up rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-5">
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Reserva enviada</p>
              <p className="mt-2 text-lg font-black">Grupo de 4 · 20:00</p>
              <p className="mt-1 text-sm text-slate-300">Observação: aniversário, mesa mais reservada.</p>
            </div>
            <ArrowRight className="hidden h-6 w-6 text-emerald-300 md:block" />
            <div className="rounded-lg border border-white/10 bg-white p-4 text-slate-950">
              <p className="text-xs font-black uppercase tracking-wide text-sky-700">Chegou no painel</p>
              <p className="mt-2 text-lg font-black">Pendente de confirmação</p>
              <p className="mt-1 text-sm text-slate-600">A equipe confirma e prepara a mesa.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DemoCard({
  href,
  tone,
  icon: Icon,
  eyebrow,
  title,
  text,
  cta,
  children,
}: {
  href: string;
  tone: "emerald" | "sky";
  icon: typeof Smartphone;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  children: React.ReactNode;
}) {
  const color = tone === "emerald" ? "text-emerald-300 group-hover:border-emerald-300" : "text-sky-300 group-hover:border-sky-300";

  return (
    <Link href={href} className={`reveal-up group premium-card relative overflow-hidden rounded-lg border border-white/10 bg-white/6 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 ${color}`}>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-lg border border-white/10 bg-white/8">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mb-2 text-xs font-black uppercase tracking-wide">{eyebrow}</p>
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
          <span className="mt-7 inline-flex items-center gap-2 font-black transition group-hover:translate-x-1">
            {cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <div className="float-soft">{children}</div>
      </div>
    </Link>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto w-[220px] rounded-[28px] border border-white/15 bg-slate-950 p-3 shadow-2xl shadow-black/30">
      <div className="rounded-[22px] bg-[#FDFBF7] p-4 text-slate-900">
        <div className="rounded-2xl bg-[#1B4332] p-5 text-center text-white">
          <CalendarCheck className="mx-auto mb-2 h-7 w-7" />
          <p className="font-serif-bistro text-xl font-bold">Bistrô Monte Verde</p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <p className="text-xs font-black text-slate-400">Horário escolhido</p>
            <p className="font-black">20:00 · 4 pessoas</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
            <span className="rounded-lg border p-2">18:30</span>
            <span className="rounded-lg bg-[#1B4332] p-2 text-white">20:00</span>
            <span className="rounded-lg border p-2">22:30</span>
          </div>
          <div className="rounded-lg bg-[#C06C58] py-3 text-center text-xs font-black text-white">
            Enviar solicitação
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Painel</p>
          <p className="font-black">Reservas de hoje</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
          <span className="pulse-dot" />
          online
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <MiniKpi value="4" label="reservas" />
        <MiniKpi value="16" label="pessoas" />
        <MiniKpi value="1" label="nova" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-black text-amber-900">
          Recebida agora · 20:00
        </div>
        <div className="rounded-lg bg-white p-3 text-sm font-black text-slate-950">
          Lucas Martins · 18:30
        </div>
      </div>
    </div>
  );
}

function MiniKpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/6 p-3">
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs font-bold text-slate-400">{label}</p>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Check,
  Clock,
  MessageSquareText,
  Phone,
  Sparkles,
  Table2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { updateReservationStatus } from "@/app/actions/reservations";
import { AdminStatusButton } from "@/components/real/AdminStatusButton";
import {
  formatDateBr,
  getReservationsForRestaurant,
  getRestaurantContextBySlug,
  getTodayDate,
  reservationProtocol,
  STATUS_LABELS,
  STATUS_STYLES,
  toDisplayTime,
} from "@/lib/reservations";
import type { Reservation } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ erro?: string; ok?: string }>;
};

export default async function RealAdminReservationsPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    notFound();
  }

  const { restaurant } = context;
  const reservations = await getReservationsForRestaurant(restaurant.id);
  const today = getTodayDate();
  const todayReservations = reservations.filter(
    (reservation) => reservation.reservation_date === today,
  );
  const activeTodayReservations = todayReservations.filter(
    (reservation) => reservation.status === "pending" || reservation.status === "confirmed",
  );
  const pendingToday = activeTodayReservations.filter((reservation) => reservation.status === "pending");
  const confirmedToday = activeTodayReservations.filter(
    (reservation) => reservation.status === "confirmed",
  );
  const historyReservations = reservations.filter(
    (reservation) =>
      reservation.status === "declined" ||
      reservation.status === "finished" ||
      reservation.reservation_date < today,
  );
  const peopleToday = activeTodayReservations
    .reduce((total, reservation) => total + reservation.people, 0);
  const nextArrival = confirmedToday[0];
  const primary = restaurant.primary_color ?? "#1B4332";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-lg"
              style={{ background: primary }}
            >
              <span className="font-serif-bistro font-bold">
                {restaurant.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <h1 className="font-black">{restaurant.name}</h1>
              <p className="text-xs font-semibold text-slate-500">
                Painel de reservas do jantar
              </p>
            </div>
          </div>
          <Link
            href={`/r/${slug}/reserva`}
            className="hidden min-h-10 items-center justify-center rounded-lg border border-slate-200 px-3 text-xs font-black text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 sm:inline-flex"
          >
            Link de reserva
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <section className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Resumo da operacao
            </p>
            <h2 className="mt-1 text-2xl font-black">Tudo que a recepcao precisa ver antes do pico</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Pendentes, confirmadas, proxima chegada, observacoes importantes e historico organizado para a equipe agir rapido.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Table2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Proxima chegada
                </p>
                <h2 className="mt-1 font-black text-emerald-950">
                  {nextArrival
                    ? `${toDisplayTime(nextArrival.reservation_time)} · ${nextArrival.customer_name}`
                    : "Aguardando confirmacao"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  {nextArrival
                    ? `${nextArrival.people} pessoas em ${formatDateBr(nextArrival.reservation_date)}.`
                    : "Confirme uma reserva pendente para preparar a recepcao."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {query.erro || query.ok ? (
          <div
            className={`mb-6 rounded-lg border p-4 text-sm font-black ${
              query.erro
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {query.erro ?? query.ok}
          </div>
        ) : null}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Calendar} label="Reservas ativas hoje" value={activeTodayReservations.length} helper="Pendentes + confirmadas" />
          <Kpi icon={Users} label="Pessoas hoje" value={peopleToday} helper="Apenas reservas ativas" />
          <Kpi icon={Clock} label="Pendentes hoje" value={pendingToday.length} helper="Aguardando acao" tone="amber" />
          <Kpi icon={Check} label="Confirmadas hoje" value={confirmedToday.length} helper="Mesas garantidas" tone="emerald" />
        </section>

        <section className="mb-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Table2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Resumo da operacao</p>
                <h2 className="font-black">Hoje no salao</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniSummary label="Reservas hoje" value={String(activeTodayReservations.length)} />
              <MiniSummary label="Pessoas previstas" value={String(peopleToday)} />
              <MiniSummary label="Historico" value={String(historyReservations.length)} />
            </div>
            <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-600">
              Priorize as pendentes, confira observacoes de aniversario ou preferencia de mesa e finalize reservas ja atendidas para manter a visao limpa.
            </p>
          </div>

          <div className="rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-violet-700">IA nos planos avancados</p>
                <h2 className="font-black">Resumo demonstrativo</h2>
              </div>
            </div>
            <div className="space-y-2 text-sm font-semibold text-slate-700">
              <AiLine text="Horario de pico: 20h as 21h." />
              <AiLine text="Observacoes importantes aparecem antes da chegada." />
              <AiLine text="A IA ajuda com resumos e sugestoes. A equipe continua no controle." />
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <ReservationColumn
            title="Aguardando confirmacao"
            reservations={pendingToday}
            empty="Nenhuma reserva pendente."
            slug={slug}
          />
          <ReservationColumn
            title="Confirmadas para hoje"
            reservations={confirmedToday}
            empty="Nenhuma reserva confirmada."
            slug={slug}
          />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Reservas fora da visao ativa
              </p>
              <h2 className="text-lg font-black">Historico</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
              {historyReservations.length} {historyReservations.length === 1 ? "registro" : "registros"}
            </span>
          </div>
          {historyReservations.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-400">
              Nenhuma reserva no historico ainda.
            </div>
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {historyReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  slug={slug}
                  compact
                />
              ))}
            </div>
          )}
        </section>

        <footer className="py-10 text-center text-xs font-semibold text-slate-400">
          Tecnologia por <span className="text-slate-600">Montalvex</span>
        </footer>
      </div>
    </main>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  helper,
  tone = "slate",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  helper: string;
  tone?: "slate" | "amber" | "emerald";
}) {
  const toneClasses = {
    slate: "border-slate-200 bg-white text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };

  return (
    <article className={`rounded-lg border p-5 shadow-sm ${toneClasses[tone]}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-wide opacity-75">{label}</span>
        <Icon className="h-5 w-5 opacity-60" />
      </div>
      <p className="text-4xl font-black tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-semibold opacity-70">{helper}</p>
    </article>
  );
}

function MiniSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

function AiLine({ text }: { text: string }) {
  return (
    <p className="flex gap-2 rounded-lg border border-white bg-white/80 p-3">
      <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
      <span>{text}</span>
    </p>
  );
}

function ReservationColumn({
  title,
  reservations,
  empty,
  slug,
}: {
  title: string;
  reservations: Reservation[];
  empty: string;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <span
            className={
              title.includes("Aguardando")
                ? "h-2.5 w-2.5 rounded-full bg-amber-500"
                : "h-2.5 w-2.5 rounded-full bg-emerald-500"
            }
          />
          {title}
        </h2>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
          {reservations.length} {reservations.length === 1 ? "reserva" : "reservas"}
        </span>
      </div>

      <div className="space-y-3">
        {reservations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-400">
            {empty}
          </div>
        ) : (
          reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} slug={slug} />
          ))
        )}
      </div>
    </section>
  );
}

function ReservationCard({
  reservation,
  slug,
  compact = false,
}: {
  reservation: Reservation;
  slug: string;
  compact?: boolean;
}) {
  const style = STATUS_STYLES[reservation.status];

  return (
    <article
      className="rounded-lg border border-l-4 border-slate-200 bg-white p-5 card-shadow"
      style={{ borderLeftColor: style.border }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black">{reservation.customer_name}</h3>
            <span className="font-mono text-[11px] font-black text-slate-400">
              #{reservationProtocol(reservation)}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
            <Phone className="h-3.5 w-3.5" />
            {reservation.customer_phone}
          </p>
        </div>
        <span
          className="status-pill"
          style={{ background: style.bg, color: style.text }}
        >
          {STATUS_LABELS[reservation.status]}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-slate-600">
        <span>{reservation.people} pessoas</span>
        <span>{formatDateBr(reservation.reservation_date)}</span>
        <span>{toDisplayTime(reservation.reservation_time)}</span>
      </div>

      {reservation.notes ? (
        <p className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm italic text-slate-700">
          &quot;{reservation.notes}&quot;
        </p>
      ) : null}

      {compact ? null : <StatusActions reservation={reservation} slug={slug} />}
    </article>
  );
}

function StatusActions({
  reservation,
  slug,
}: {
  reservation: Reservation;
  slug: string;
}) {
  if (reservation.status === "pending") {
    return (
      <div className="flex gap-2">
        <StatusButton
          action={updateReservationStatus.bind(null, slug)}
          reservationId={reservation.id}
          nextStatus="confirmed"
          label="Confirmar"
          icon="check"
          tone="confirm"
        />
        <StatusButton
          action={updateReservationStatus.bind(null, slug)}
          reservationId={reservation.id}
          nextStatus="declined"
          label="Recusar"
          icon="x"
          tone="decline"
        />
      </div>
    );
  }

  if (reservation.status === "confirmed") {
    return (
      <StatusButton
        action={updateReservationStatus.bind(null, slug)}
        reservationId={reservation.id}
        nextStatus="finished"
        label="Marcar como finalizada"
        icon="flag"
        tone="neutral"
      />
    );
  }

  return null;
}

function StatusButton({
  action,
  reservationId,
  nextStatus,
  label,
  icon,
  tone,
}: {
  action: (formData: FormData) => Promise<void>;
  reservationId: string;
  nextStatus: Reservation["status"];
  label: string;
  icon: "check" | "x" | "flag";
  tone: "confirm" | "decline" | "neutral";
}) {
  return (
    <form action={action} className={tone === "decline" ? "" : "flex-1"}>
      <input type="hidden" name="reservation_id" value={reservationId} />
      <input type="hidden" name="next_status" value={nextStatus} />
      <AdminStatusButton label={label} icon={icon} tone={tone} />
    </form>
  );
}

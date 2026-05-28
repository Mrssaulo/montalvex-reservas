import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Check,
  Clock,
  ExternalLink,
  LogOut,
  MessageSquareText,
  Phone,
  Sparkles,
  Table2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { loginAdmin, logoutAdmin } from "@/app/actions/admin-auth";
import {
  archiveReservationFromHistory,
  updateReservationStatus,
  updateRestaurantCapacity,
} from "@/app/actions/reservations";
import { ArchiveHistoryButton } from "@/components/real/ArchiveHistoryButton";
import { AdminStatusButton } from "@/components/real/AdminStatusButton";
import { getAdminAccessState } from "@/lib/admin-auth";
import { calculateRestaurantCapacity } from "@/lib/capacity";
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
  const access = await getAdminAccessState();
  const primary = restaurant.primary_color ?? "#1B4332";

  if (!access.ok) {
    return (
      <AdminAccessGate
        slug={slug}
        restaurantName={restaurant.name}
        primary={primary}
        error={query.erro}
        missingConfig={access.reason === "missing_config"}
      />
    );
  }

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
      !reservation.archived_at &&
      (reservation.status === "declined" ||
        reservation.status === "finished" ||
        reservation.reservation_date < today),
  );
  const peopleToday = activeTodayReservations
    .reduce((total, reservation) => total + reservation.people, 0);
  const nextArrival = confirmedToday[0];
  const capacity = calculateRestaurantCapacity({
    reservations,
    totalTables: restaurant.total_tables,
    totalSeats: restaurant.total_seats,
    seatsPerTable: restaurant.seats_per_table,
    currentDate: today,
  });
  const capacityAction = updateRestaurantCapacity.bind(null, slug);
  const currentDateLabel = formatLongDate(today);
  const reservationLink = `/r/${slug}/reserva`;
  const trackingLink = `/r/${slug}/acompanhar`;

  return (
    <main className="min-h-screen max-w-[100vw] overflow-x-hidden bg-slate-100 text-slate-950 [&_*]:min-w-0">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
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
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-black">{restaurant.name}</h1>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-black uppercase text-amber-800">
                  MVP em desenvolvimento
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Sistema ativo · {currentDateLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <HeaderLink href={reservationLink} label="Reserva" />
            <HeaderLink href={trackingLink} label="Acompanhar" />
            <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-black text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Online
            </span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mobile-gutter max-w-7xl py-8 sm:px-5">
        <section className="mb-6 grid min-w-0 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Resumo da operação
            </p>
            <h2 className="mt-1 break-words text-2xl font-black">Tudo que a recepção precisa ver antes do pico</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Pendentes, confirmadas, próxima chegada, observações importantes e histórico organizado para a equipe agir rápido.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Table2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Próxima chegada
                </p>
                <h2 className="mt-1 break-words font-black text-emerald-950">
                  {nextArrival
                    ? `${toDisplayTime(nextArrival.reservation_time)} · ${nextArrival.customer_name}`
                    : "Aguardando confirmação"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  {nextArrival
                    ? `${nextArrival.people} pessoas em ${formatDateBr(nextArrival.reservation_date)}.`
                    : "Confirme uma reserva pendente para preparar a recepção."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-7 grid min-w-0 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <CapacityPanel capacity={capacity} />
          <CapacitySettingsForm
            action={capacityAction}
            totalTables={capacity.totalTables}
            totalSeats={capacity.totalSeats}
            seatsPerTable={capacity.seatsPerTable}
          />
        </section>

        {capacity.oldConfirmedCount > 0 ? (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
            Existe reserva confirmada antiga ainda não finalizada. Finalize para liberar capacidade.
          </div>
        ) : null}

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

        <section className="mb-7 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Kpi icon={Clock} label="Pendentes hoje" value={pendingToday.length} helper="Aguardando ação" tone="amber" />
          <Kpi icon={Check} label="Confirmadas hoje" value={confirmedToday.length} helper="Mesas garantidas" tone="emerald" />
          <Kpi icon={Users} label="Pessoas previstas" value={peopleToday} helper="Pendentes + confirmadas" />
          <Kpi icon={Calendar} label="Ocupação estimada" value={`${capacity.occupancyPercent}%`} helper="Mesas ou lugares" />
          <Kpi
            icon={Clock}
            label="Próxima chegada"
            value={nextArrival ? toDisplayTime(nextArrival.reservation_time) : "--"}
            helper={nextArrival ? nextArrival.customer_name : "Sem confirmadas"}
            tone="emerald"
          />
          <Kpi
            icon={Table2}
            label="Capacidade usada"
            value={`${capacity.activeTables}/${capacity.totalTables}`}
            helper="Mesas estimadas"
          />
        </section>

        <section className="mb-7 grid min-w-0 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Table2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Resumo da operação</p>
                <h2 className="font-black">Hoje no salão</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniSummary label="Reservas hoje" value={String(activeTodayReservations.length)} />
              <MiniSummary label="Pessoas previstas" value={String(peopleToday)} />
              <MiniSummary label="Histórico" value={String(historyReservations.length)} />
            </div>
            <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-600">
              Priorize as pendentes, confira observações de aniversário ou preferência de mesa e finalize reservas já atendidas para manter a visão limpa.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-emerald-50 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-violet-700">IA nos planos avançados</p>
                <h2 className="font-black">Resumo demonstrativo</h2>
              </div>
            </div>
            <div className="space-y-2 text-sm font-semibold text-slate-700">
              <AiLine text={`Mesas livres estimadas: ${capacity.availableTables}.`} />
              <AiLine text={`Lugares livres estimados: ${capacity.availableSeats}.`} />
              <AiLine text={`${capacity.pendingTables} mesas podem ser comprometidas por reservas pendentes.`} />
              <AiLine text={capacity.occupancyPercent >= 80 ? "Ocupação acima de 80%. Sugestão: confirmar pendentes antes do horário de pico." : "A IA Operacional fica mais útil porque analisa reservas, capacidade e pendências do salão."} />
              <AiLine text="Atenção: reservas confirmadas continuam ocupando capacidade até serem finalizadas." />
            </div>
          </div>
        </section>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[1fr_1fr]">
          <ReservationColumn
            title="Aguardando confirmação"
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

        <section className="mt-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Reservas fora da visão ativa
              </p>
              <h2 className="text-lg font-black">Histórico</h2>
            </div>
            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
              {historyReservations.length} {historyReservations.length === 1 ? "registro" : "registros"}
            </span>
          </div>
          {historyReservations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-400">
              Nenhuma reserva no histórico ainda.
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

function CapacityPanel({
  capacity,
}: {
  capacity: ReturnType<typeof calculateRestaurantCapacity>;
}) {
  const barTone =
    capacity.occupancyPercent > 85
      ? "bg-red-500"
      : capacity.occupancyPercent >= 60
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
            Capacidade do salão
          </p>
          <h2 className="mt-1 break-words text-2xl font-black">
            Mesas, lugares e pressão operacional
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
            As mesas livres são estimadas com base nas reservas pendentes e confirmadas.
          </p>
        </div>
        <div className="mx-auto w-full max-w-56 rounded-2xl bg-slate-950 px-4 py-3 text-center text-white sm:mx-0 sm:self-center">
          <p className="text-xs font-black uppercase text-slate-400">Ocupação estimada</p>
          <p className="text-3xl font-black tabular-nums">{capacity.occupancyPercent}%</p>
        </div>
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barTone}`}
          style={{ width: `${capacity.occupancyPercent}%` }}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Mesas</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <CapacityStat label="Total" value={capacity.totalTables} />
            <CapacityStat label="Livres estimadas" value={capacity.availableTables} tone="emerald" />
            <CapacityStat label="Confirmadas" value={capacity.confirmedTables} tone="slate" />
            <CapacityStat label="Em análise" value={capacity.pendingTables} tone="amber" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Lugares</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <CapacityStat label="Total" value={capacity.totalSeats} />
            <CapacityStat label="Livres estimados" value={capacity.availableSeats} tone="emerald" />
            <CapacityStat label="Confirmados" value={capacity.confirmedSeats} tone="slate" />
            <CapacityStat label="Em análise" value={capacity.pendingSeats} tone="amber" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <CapacityStat label="Pessoas previstas" value={capacity.totalPeople} wide />
        <CapacityStat label="Ocupação por mesas" value={`${capacity.occupancyPercentByTables}%`} wide />
        <CapacityStat label="Ocupação por lugares" value={`${capacity.occupancyPercentBySeats}%`} wide />
      </div>

      <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-900">
        Mesas e lugares confirmados continuam ocupando capacidade até a equipe finalizar o atendimento.
      </p>
    </section>
  );
}

function AdminAccessGate({
  slug,
  restaurantName,
  primary,
  error,
  missingConfig,
}: {
  slug: string;
  restaurantName: string;
  primary: string;
  error?: string;
  missingConfig: boolean;
}) {
  const action = loginAdmin.bind(null, slug);

  return (
    <main className="flex min-h-screen max-w-[100vw] items-center justify-center overflow-x-hidden bg-slate-100 px-4 py-10 text-slate-950 [&_*]:min-w-0">
      <section className="w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:max-w-md">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg text-white"
          style={{ background: primary }}
        >
          <Table2 className="h-6 w-6" />
        </div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          Acesso administrativo
        </p>
        <h1 className="mt-1 break-words text-2xl font-black">{restaurantName}</h1>
        <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-600">
          Digite o código interno para abrir o painel real de reservas.
        </p>

        {error ? (
          <div className="mt-4 break-all rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">
            {error}
          </div>
        ) : null}

        {missingConfig ? (
          <div className="mt-4 break-all rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-900">
            Configure ADMIN_ACCESS_TOKEN no ambiente antes de usar o painel.
          </div>
        ) : null}

        <form action={action} className="mt-5 space-y-4">
          <label className="block rounded-xl border border-slate-200 bg-slate-50 p-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-900/20">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">
              Código de acesso
            </span>
            <input
              required
              name="access_code"
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full bg-transparent text-lg font-black outline-none"
              placeholder="Digite o código"
            />
          </label>
          <button
            type="submit"
            className="min-h-11 w-full rounded-xl bg-slate-950 px-4 text-sm font-black text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
          >
            Entrar no painel
          </button>
        </form>

        <Link
          href={`/r/${slug}/reserva`}
          className="mt-4 block text-center text-sm font-black underline underline-offset-4 transition hover:opacity-75"
          style={{ color: primary }}
        >
          Voltar para reserva pública
        </Link>
      </section>
    </main>
  );
}

function HeaderLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

function CapacitySettingsForm({
  action,
  totalTables,
  totalSeats,
  seatsPerTable,
}: {
  action: (formData: FormData) => Promise<void>;
  totalTables: number;
  totalSeats: number;
  seatsPerTable: number;
}) {
  return (
    <form
      action={action}
      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        Configuração do salão
      </p>
      <h2 className="mt-1 break-words text-xl font-black">Capacidade operacional</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
        Ajuste mesas e lugares sem expor identificadores do restaurante no formulário.
      </p>

      <div className="mt-5 grid gap-3">
        <CapacityInput
          label="Total de mesas"
          name="total_tables"
          defaultValue={totalTables}
          min={1}
          max={300}
        />
        <CapacityInput
          label="Total de cadeiras/lugares"
          name="total_seats"
          defaultValue={totalSeats}
          min={1}
          max={2000}
        />
        <CapacityInput
          label="Pessoas médias por mesa"
          name="seats_per_table"
          defaultValue={seatsPerTable}
          min={1}
          max={20}
        />
      </div>

      <button
        type="submit"
        className="mt-5 min-h-11 w-full rounded-xl bg-slate-950 px-4 text-sm font-black text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
      >
        Salvar capacidade
      </button>
    </form>
  );
}

function CapacityInput({
  label,
  name,
  defaultValue,
  min,
  max,
}: {
  label: string;
  name: string;
  defaultValue: number;
  min: number;
  max: number;
}) {
  return (
    <label className="block rounded-xl border border-slate-200 bg-slate-50 p-3 transition duration-200 hover:bg-white hover:shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-900/20">
      <span className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</span>
      <input
        required
        name={name}
        type="number"
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="mt-1 w-full bg-transparent text-lg font-black outline-none"
      />
    </label>
  );
}

function CapacityStat({
  label,
  value,
  tone = "neutral",
  wide = false,
}: {
  label: string;
  value: number | string;
  tone?: "neutral" | "emerald" | "amber" | "slate";
  wide?: boolean;
}) {
  const classes = {
    neutral: "bg-white text-slate-950",
    emerald: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-800",
    slate: "bg-slate-100 text-slate-800",
  };

  return (
    <div className={`min-w-0 rounded-xl border border-slate-200 p-3 ${classes[tone]} ${wide ? "bg-slate-50" : ""}`}>
      <p className="break-words text-2xl font-black tabular-nums">{value}</p>
      <p className="mt-1 break-words text-[11px] font-black uppercase tracking-wide opacity-70">{label}</p>
    </div>
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
  value: number | string;
  helper: string;
  tone?: "slate" | "amber" | "emerald";
}) {
  const toneClasses = {
    slate: "border-slate-200 bg-white text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };

  return (
    <article className={`min-w-0 rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${toneClasses[tone]}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-wide opacity-75">{label}</span>
        <Icon className="h-5 w-5 opacity-60" />
      </div>
      <p className="break-words text-4xl font-black tabular-nums">{value}</p>
      <p className="mt-1 text-xs font-semibold opacity-70">{helper}</p>
    </article>
  );
}

function formatLongDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function MiniSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
    </div>
  );
}

function AiLine({ text }: { text: string }) {
  return (
    <p className="flex min-w-0 gap-2 rounded-xl border border-white bg-white/80 p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
      <span className="min-w-0 break-words">{text}</span>
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
        <h2 className="flex min-w-0 items-center gap-2 text-lg font-black">
          <span
            className={
              title.includes("Aguardando")
                ? "h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"
                : "h-2.5 w-2.5 rounded-full bg-emerald-500"
            }
          />
          {title}
        </h2>
        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
          {reservations.length} {reservations.length === 1 ? "reserva" : "reservas"}
        </span>
      </div>

      <div className="space-y-3">
        {reservations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-400">
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
  const whatsappHref = toWhatsappHref(reservation.customer_phone);

  return (
    <article
      className={`relative min-w-0 rounded-2xl border border-l-4 border-slate-200 bg-white p-5 card-shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl ${compact ? "pr-12" : ""}`}
      style={{ borderLeftColor: style.border }}
    >
      {compact ? (
        <form action={archiveReservationFromHistory.bind(null, slug)} className="absolute right-3 top-3">
          <input type="hidden" name="reservation_id" value={reservation.id} />
          <ArchiveHistoryButton />
        </form>
      ) : null}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="min-w-0 break-words font-black">{reservation.customer_name}</h3>
            <span className="break-all font-mono text-[11px] font-black text-slate-400">
              #{reservationProtocol(reservation)}
            </span>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex min-w-0 items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 break-all">{reservation.customer_phone}</span>
          </a>
        </div>
        <span
          className={`status-pill shrink-0 ${reservation.status === "pending" ? "animate-pulse" : ""}`}
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
        <p className="mb-4 break-words rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm italic text-slate-700">
          &quot;{reservation.notes}&quot;
        </p>
      ) : null}

      {compact ? null : <StatusActions reservation={reservation} slug={slug} />}
    </article>
  );
}

function toWhatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const number = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${number}`;
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
        label="Finalizar"
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

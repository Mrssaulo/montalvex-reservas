import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  MessageSquareText,
  Phone,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  formatDateBr,
  getReservationForTracking,
  getRestaurantContextBySlug,
  reservationProtocol,
  STATUS_LABELS,
  STATUS_MESSAGES,
  STATUS_STYLES,
  toDisplayTime,
} from "@/lib/reservations";
import type { Reservation } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ codigo?: string; telefone?: string }>;
};

export default async function TrackReservationPage({
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
  const primary = restaurant.primary_color ?? "#1B4332";
  const accent = restaurant.accent_color ?? "#C06C58";
  const background = restaurant.background_color ?? "#FDFBF7";
  const hasSearch = Boolean(query.codigo || query.telefone);
  const canSearch = Boolean(query.codigo && query.telefone);
  const reservation = canSearch
    ? await getReservationForTracking({
        restaurantId: restaurant.id,
        reservationCode: query.codigo ?? "",
        customerPhone: query.telefone ?? "",
      })
    : null;

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-6 sm:py-8"
      style={{
        background: `linear-gradient(135deg, ${primary} 0%, #2D5A43 100%)`,
      }}
    >
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <section
        className="reveal-up relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/20 shadow-2xl shadow-black/35"
        style={{ background, color: "#1F2937" }}
      >
        <header className="relative overflow-hidden" style={{ background: primary, color: background }}>
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative px-6 py-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-xl">
              <Home className="h-8 w-8" strokeWidth={1.6} />
            </div>
            <h1 className="font-serif-bistro text-3xl font-bold">{restaurant.name}</h1>
            <p className="mt-2 text-sm opacity-85">Acompanhe o status da sua reserva</p>
          </div>
        </header>

        <div className="space-y-5 p-5">
          <form action={`/r/${slug}/acompanhar`} className="space-y-4">
            <div className="rounded-lg border border-[#E8E2D4] bg-[#F5F1E8] p-4">
              <div className="flex items-start gap-3">
                <Search className="mt-0.5 h-5 w-5 shrink-0" style={{ color: primary }} />
                <p className="text-sm leading-6 text-[#6B7280]">
                  Informe o protocolo e o telefone usado na reserva para consultar o status.
                </p>
              </div>
            </div>

            <Field label="Protocolo" icon={CheckCircle2}>
              <input
                required
                name="codigo"
                type="text"
                defaultValue={query.codigo ?? ""}
                className="w-full bg-transparent py-1 font-mono text-base font-black uppercase outline-none"
                placeholder="MV-8F42A1"
              />
            </Field>

            <Field label="Telefone usado na reserva" icon={Phone}>
              <input
                required
                name="telefone"
                type="tel"
                defaultValue={query.telefone ?? ""}
                className="w-full bg-transparent py-1 text-base font-semibold outline-none"
                placeholder="(11) 99999-9999"
              />
            </Field>

            <button
              type="submit"
              className="cta-glow min-h-13 w-full rounded-lg font-black text-white shadow-xl transition hover:-translate-y-0.5"
              style={{ background: accent }}
            >
              Consultar reserva
            </button>
          </form>

          {hasSearch && !canSearch ? (
            <Notice tone="warn">
              Preencha protocolo e telefone para consultar sua reserva.
            </Notice>
          ) : null}

          {canSearch && !reservation ? (
            <Notice tone="error">
              Nao encontramos uma reserva com esse protocolo e telefone para este restaurante.
            </Notice>
          ) : null}

          {reservation ? <ReservationStatusCard reservation={reservation} primary={primary} /> : null}

          <Link
            href={`/r/${slug}/reserva`}
            className="block text-center text-sm font-black underline underline-offset-4 transition hover:opacity-75"
            style={{ color: primary }}
          >
            Fazer nova reserva
          </Link>
        </div>

        <footer className="border-t border-[#E8E2D4] py-5 text-center">
          <p className="text-xs text-[#6B7280]">
            Tecnologia por <span className="font-bold">Montalvex</span>
          </p>
        </footer>
      </section>
    </main>
  );
}

function ReservationStatusCard({
  reservation,
  primary,
}: {
  reservation: Reservation;
  primary: string;
}) {
  const style = STATUS_STYLES[reservation.status];

  return (
    <article className="rounded-lg border border-[#E8E2D4] bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-[#E8E2D4] pb-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#6B7280]">
            Protocolo
          </p>
          <p className="font-mono text-lg font-black" style={{ color: primary }}>
            #{reservationProtocol(reservation)}
          </p>
        </div>
        <span className="status-pill" style={{ background: style.bg, color: style.text }}>
          {STATUS_LABELS[reservation.status]}
        </span>
      </div>

      <p className="mb-4 rounded-lg p-3 text-sm font-bold" style={{ background: style.bg, color: style.text }}>
        {STATUS_MESSAGES[reservation.status]}
      </p>

      <div className="space-y-3 text-sm">
        <Detail label="Nome" value={reservation.customer_name} icon={CheckCircle2} />
        <Detail label="Data" value={formatDateBr(reservation.reservation_date)} icon={Calendar} />
        <Detail label="Horario" value={toDisplayTime(reservation.reservation_time)} icon={Clock} />
        <Detail label="Pessoas" value={`${reservation.people} pessoas`} icon={Users} />
        {reservation.notes ? (
          <Detail label="Observacao" value={reservation.notes} icon={MessageSquareText} />
        ) : null}
      </div>
    </article>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-lg border border-[#E8E2D4] bg-white p-4 card-shadow transition hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-emerald-900/20">
      <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#6B7280]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      {children}
    </label>
  );
}

function Detail({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="flex items-center gap-2 text-[#6B7280]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="max-w-[60%] text-right font-bold">{value}</span>
    </div>
  );
}

function Notice({
  tone,
  children,
}: {
  tone: "warn" | "error";
  children: React.ReactNode;
}) {
  const classes = {
    warn: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className={`rounded-lg border p-4 text-sm font-bold ${classes[tone]}`}>
      {children}
    </div>
  );
}

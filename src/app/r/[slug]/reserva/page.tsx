import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Home, Sparkles } from "lucide-react";
import { createReservation } from "@/app/actions/reservations";
import { RealReservationForm } from "@/components/real/RealReservationForm";
import {
  buildTimeSlots,
  getRestaurantContextBySlug,
  getTodayDate,
  toDisplayTime,
} from "@/lib/reservations";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ erro?: string; sucesso?: string }>;
};

export default async function RealReservationPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    notFound();
  }

  const { restaurant, settings } = context;
  const primary = restaurant.primary_color ?? "#1B4332";
  const accent = restaurant.accent_color ?? "#C06C58";
  const background = restaurant.background_color ?? "#FDFBF7";
  const slots = buildTimeSlots(
    restaurant.opening_time,
    restaurant.last_reservation_time,
    settings?.interval_minutes ?? 30,
  );
  const action = createReservation.bind(null, slug);

  return (
    <main
      className="relative min-h-screen overflow-hidden px-3 py-6 sm:px-4 sm:py-10"
      style={{
        background: `linear-gradient(135deg, ${primary} 0%, #2D5A43 100%)`,
      }}
    >
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 rounded-full bg-black/10 blur-3xl" />
      <section
        className="reveal-up relative mx-auto w-full max-w-xl overflow-hidden rounded-[30px] border border-white/20 shadow-2xl shadow-black/35"
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
              {restaurant.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={restaurant.logo_url} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <Home className="h-8 w-8" strokeWidth={1.6} />
              )}
            </div>
            <h1 className="font-serif-bistro text-3xl font-bold">{restaurant.name}</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 opacity-85">
              Escolha o melhor horário. A equipe confirma a mesa e você acompanha tudo pelo protocolo.
            </p>
          </div>
        </header>

        {query.sucesso ? (
          <SuccessView
            protocol={query.sucesso}
            slug={slug}
            primary={primary}
            accent={accent}
          />
        ) : (
          <>
            <div className="border-b border-[#E8E2D4] px-5 py-4">
              <ol className="grid grid-cols-3 gap-2 text-xs font-black">
                {["Dados", "Horário", "Confirmação"].map((label, index) => (
                  <li key={label} className="flex min-w-0 items-center gap-2">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition duration-200"
                      style={{
                        background: index < 2 ? primary : "#F5F1E8",
                        color: index < 2 ? background : "#6B7280",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 break-words" style={{ color: index < 2 ? primary : "#6B7280" }}>{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <RealReservationForm
              action={action}
              error={query.erro}
              slots={slots}
              today={getTodayDate()}
              primary={primary}
              accent={accent}
              openingTime={toDisplayTime(restaurant.opening_time)}
              closingTime={toDisplayTime(restaurant.closing_time)}
              lastReservationTime={toDisplayTime(restaurant.last_reservation_time)}
            />
          </>
        )}

        <footer className="border-t border-[#E8E2D4] py-5 text-center">
          <p className="text-xs text-[#6B7280]">
            Tecnologia por <span className="font-bold">Montalvex</span>
          </p>
        </footer>
      </section>
    </main>
  );
}

function SuccessView({
  protocol,
  slug,
  primary,
  accent,
}: {
  protocol: string;
  slug: string;
  primary: string;
  accent: string;
}) {
  return (
    <div className="animate-fade-in p-7 text-center">
      <div
        className="success-ring mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full shadow-xl"
        style={{ background: primary }}
      >
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </div>
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
        <Sparkles className="h-3.5 w-3.5" />
        Chegou no painel da equipe
      </div>
      <h2 className="font-serif-bistro text-3xl font-bold" style={{ color: primary }}>
        Reserva recebida
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#6B7280]">
        Sua solicitação foi registrada como pendente. Guarde este código: ele é a chave para acompanhar a confirmação.
      </p>

      <div className="my-6 rounded-2xl border border-[#E8E2D4] bg-white p-5 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#E8E2D4] pb-4">
          <span className="text-xs font-black uppercase tracking-wide text-[#6B7280]">
            Protocolo
          </span>
          <span className="break-all text-right font-mono text-lg font-black" style={{ color: primary }}>
            #{protocol}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[#6B7280]">Status</span>
          <span className="status-pill shrink-0 animate-pulse bg-amber-100 text-amber-800">
            Aguardando confirmação
          </span>
        </div>
        <p className="mt-4 rounded-lg bg-[#F5F1E8] p-3 text-xs font-bold leading-5 text-[#6B7280]">
          Se a equipe confirmar ou recusar, o status será atualizado na página de acompanhamento.
        </p>
      </div>

      <div className="grid gap-3">
        <Link
          href={`/r/${slug}/acompanhar?codigo=${encodeURIComponent(protocol)}`}
          className="inline-flex min-h-12 items-center justify-center rounded-xl px-4 font-black text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: accent }}
        >
          Acompanhar minha reserva
        </Link>
        <Link
          href={`/r/${slug}/reserva`}
          className="font-black underline underline-offset-4 transition hover:opacity-75"
          style={{ color: primary }}
        >
          Fazer nova reserva
        </Link>
      </div>
    </div>
  );
}

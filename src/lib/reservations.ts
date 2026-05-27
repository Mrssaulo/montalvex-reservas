import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Reservation,
  ReservationStatus,
  Restaurant,
  RestaurantSettings,
} from "@/lib/supabase/types";

export type RestaurantContext = {
  restaurant: Restaurant;
  settings: RestaurantSettings | null;
};

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  declined: "Recusada",
  finished: "Finalizada",
};

export const STATUS_STYLES: Record<
  ReservationStatus,
  { bg: string; text: string; border: string }
> = {
  pending: { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" },
  confirmed: { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
  declined: { bg: "#FEE2E2", text: "#991B1B", border: "#EF4444" },
  finished: { bg: "#E5E7EB", text: "#374151", border: "#94A3B8" },
};

export const STATUS_MESSAGES: Record<ReservationStatus, string> = {
  pending: "Sua reserva foi recebida e aguarda confirmacao da equipe.",
  confirmed: "Sua reserva foi confirmada. A equipe ja esta preparada para receber voce.",
  declined:
    "Sua reserva nao foi confirmada. Entre em contato com o restaurante para verificar disponibilidade.",
  finished: "Reserva finalizada.",
};

export function toDisplayTime(time: string) {
  return time.slice(0, 5);
}

export function getTodayDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function formatDateBr(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function buildTimeSlots(
  openingTime: string,
  lastReservationTime: string,
  intervalMinutes = 30,
) {
  const interval = Number.isFinite(intervalMinutes) && intervalMinutes > 0 ? intervalMinutes : 30;
  const start = timeToMinutes(openingTime);
  let end = timeToMinutes(lastReservationTime);

  if (end < start) {
    end += 24 * 60;
  }

  const slots: string[] = [];

  for (let current = start; current <= end; current += interval) {
    slots.push(minutesToTime(current));
  }

  return slots;
}

export async function getRestaurantContextBySlug(
  slug: string,
): Promise<RestaurantContext | null> {
  const supabase = getSupabaseServerClient();

  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (restaurantError) {
    throw new Error(restaurantError.message);
  }

  if (!restaurant) {
    return null;
  }

  const { data: settings, error: settingsError } = await supabase
    .from("restaurant_settings")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .maybeSingle();

  if (settingsError) {
    throw new Error(settingsError.message);
  }

  return { restaurant, settings };
}

export async function getReservationsForRestaurant(restaurantId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .order("reservation_date", { ascending: true })
    .order("reservation_time", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getReservationForTracking({
  restaurantId,
  reservationCode,
  customerPhone,
}: {
  restaurantId: string;
  reservationCode: string;
  customerPhone: string;
}) {
  const supabase = getSupabaseServerClient();
  const normalizedCode = normalizeReservationCode(reservationCode);

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("reservation_code", normalizedCode)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || normalizePhone(data.customer_phone) !== normalizePhone(customerPhone)) {
    return null;
  }

  return data;
}

export async function getPeopleAlreadyBooked(
  restaurantId: string,
  reservationDate: string,
  reservationTime: string,
) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("reservations")
    .select("people")
    .eq("restaurant_id", restaurantId)
    .eq("reservation_date", reservationDate)
    .eq("reservation_time", reservationTime)
    .in("status", ["pending", "confirmed"]);

  if (error) {
    throw new Error(error.message);
  }

  return data.reduce((total, reservation) => total + reservation.people, 0);
}

export function isAllowedStatusTransition(
  currentStatus: ReservationStatus,
  nextStatus: ReservationStatus,
) {
  return (
    (currentStatus === "pending" &&
      (nextStatus === "confirmed" || nextStatus === "declined")) ||
    (currentStatus === "confirmed" && nextStatus === "finished")
  );
}

export function reservationProtocol(
  reservation: Pick<Reservation, "id"> & Partial<Pick<Reservation, "reservation_code">>,
) {
  if (reservation.reservation_code) {
    return reservation.reservation_code;
  }

  return `MV-${reservation.id.slice(0, 8).toUpperCase()}`;
}

export function normalizeReservationCode(value: string) {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, "");
  return normalized.startsWith("MV-")
    ? normalized
    : `MV-${normalized.replace(/^MV/, "").replace(/^-/, "")}`;
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function getDateWeekday(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function timeToMinutes(time: string) {
  const [hours, minutes] = toDisplayTime(time).split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const normalized = totalMinutes % (24 * 60);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

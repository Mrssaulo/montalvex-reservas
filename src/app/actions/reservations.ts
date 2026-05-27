"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  buildTimeSlots,
  getDateWeekday,
  getPeopleAlreadyBooked,
  getRestaurantContextBySlug,
  isAllowedStatusTransition,
  normalizeReservationCode,
} from "@/lib/reservations";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { ReservationStatus } from "@/lib/supabase/types";

const allowedStatuses: ReservationStatus[] = [
  "pending",
  "confirmed",
  "declined",
  "finished",
];

export async function createReservation(slug: string, formData: FormData) {
  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    redirect(`/r/${slug}/reserva?erro=Restaurante%20nao%20encontrado`);
  }

  const { restaurant, settings } = context;
  const customerName = getText(formData, "customer_name");
  const customerPhone = getText(formData, "customer_phone");
  const reservationDate = getText(formData, "reservation_date");
  const reservationTime = getText(formData, "reservation_time");
  const notes = getOptionalText(formData, "notes");
  const people = Number(getText(formData, "people"));
  const slots = buildTimeSlots(
    restaurant.opening_time,
    restaurant.last_reservation_time,
    settings?.interval_minutes ?? 30,
  );

  if (!customerName || !customerPhone || !reservationDate || !reservationTime || !people) {
    redirect(`/r/${slug}/reserva?erro=Preencha%20os%20campos%20obrigatorios`);
  }

  if (!Number.isInteger(people) || people < 1 || people > 60) {
    redirect(`/r/${slug}/reserva?erro=Informe%20uma%20quantidade%20de%20pessoas%20valida`);
  }

  if (!isValidDate(reservationDate) || !isValidTime(reservationTime)) {
    redirect(`/r/${slug}/reserva?erro=Data%20ou%20horario%20invalido`);
  }

  if (!slots.includes(reservationTime)) {
    redirect(`/r/${slug}/reserva?erro=Escolha%20um%20horario%20disponivel`);
  }

  const availableDays = settings?.available_days ?? [1, 2, 3, 4, 5, 6, 0];

  if (!availableDays.includes(getDateWeekday(reservationDate))) {
    redirect(`/r/${slug}/reserva?erro=Restaurante%20fechado%20nesta%20data`);
  }

  if (
    settings?.allow_large_groups === false &&
    people > (settings.large_group_threshold ?? 8)
  ) {
    redirect(`/r/${slug}/reserva?erro=Grupo%20acima%20do%20limite%20configurado`);
  }

  if (settings?.max_people_per_slot) {
    const alreadyBooked = await getPeopleAlreadyBooked(
      restaurant.id,
      reservationDate,
      reservationTime,
    );

    if (alreadyBooked + people > settings.max_people_per_slot) {
      redirect(`/r/${slug}/reserva?erro=Horario%20sem%20capacidade%20para%20este%20grupo`);
    }
  }

  const data = await insertReservationWithCode({
    restaurantId: restaurant.id,
    customerName,
    customerPhone,
    people,
    reservationDate,
    reservationTime,
    notes,
  });

  if (!data) {
    redirect(`/r/${slug}/reserva?erro=Nao%20foi%20possivel%20criar%20a%20reserva`);
  }

  revalidatePath(`/admin/${slug}/reservas`);
  revalidatePath(`/r/${slug}/acompanhar`);
  redirect(`/r/${slug}/reserva?sucesso=${encodeURIComponent(data.reservation_code ?? data.id)}`);
}

export async function updateReservationStatus(
  slug: string,
  formData: FormData,
) {
  const reservationId = getText(formData, "reservation_id");
  const nextStatus = getText(formData, "next_status") as ReservationStatus;

  if (!allowedStatuses.includes(nextStatus)) {
    redirect(`/admin/${slug}/reservas?erro=Status%20invalido`);
  }

  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    redirect(`/admin/${slug}/reservas?erro=Restaurante%20nao%20encontrado`);
  }

  const supabase = getSupabaseServerClient();
  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .select("id,status")
    .eq("id", reservationId)
    .eq("restaurant_id", context.restaurant.id)
    .maybeSingle();

  if (reservationError || !reservation) {
    console.error("[reservations:update] failed to load scoped reservation", {
      slug,
      restaurantId: context.restaurant.id,
      reservationId,
      error: reservationError,
    });
    redirect(`/admin/${slug}/reservas?erro=Reserva%20nao%20encontrada`);
  }

  if (!isAllowedStatusTransition(reservation.status, nextStatus)) {
    redirect(`/admin/${slug}/reservas?erro=Transicao%20de%20status%20nao%20permitida`);
  }

  const { error } = await supabase
    .from("reservations")
    .update({ status: nextStatus })
    .eq("id", reservation.id)
    .eq("restaurant_id", context.restaurant.id);

  if (error) {
    console.error("[reservations:update] failed to update status", {
      slug,
      restaurantId: context.restaurant.id,
      reservationId: reservation.id,
      nextStatus,
      error,
    });
    redirect(`/admin/${slug}/reservas?erro=Nao%20foi%20possivel%20atualizar%20a%20reserva`);
  }

  revalidatePath(`/admin/${slug}/reservas`);
  revalidatePath(`/r/${slug}/acompanhar`);
  redirect(`/admin/${slug}/reservas?ok=${encodeURIComponent(getStatusFeedback(nextStatus))}`);
}

async function insertReservationWithCode({
  restaurantId,
  customerName,
  customerPhone,
  people,
  reservationDate,
  reservationTime,
  notes,
}: {
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  people: number;
  reservationDate: string;
  reservationTime: string;
  notes: string | null;
}) {
  const supabase = getSupabaseServerClient();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const reservationCode = generateReservationCode();
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        restaurant_id: restaurantId,
        customer_name: customerName,
        customer_phone: customerPhone,
        reservation_code: reservationCode,
        people,
        reservation_date: reservationDate,
        reservation_time: reservationTime,
        notes,
        status: "pending",
      })
      .select("id,reservation_code")
      .single();

    if (!error) {
      return data;
    }

    if (error.code !== "23505") {
      console.error("[reservations:create] failed to insert reservation", {
        restaurantId,
        reservationCode,
        error,
      });
      return null;
    }
  }

  return null;
}

function generateReservationCode() {
  return normalizeReservationCode(
    crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase(),
  );
}

function getStatusFeedback(status: ReservationStatus) {
  const messages: Record<ReservationStatus, string> = {
    pending: "Status atualizado",
    confirmed: "Reserva confirmada",
    declined: "Reserva recusada",
    finished: "Reserva finalizada",
  };

  return messages[status];
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalText(formData: FormData, key: string) {
  const value = getText(formData, key);
  return value.length > 0 ? value : null;
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}

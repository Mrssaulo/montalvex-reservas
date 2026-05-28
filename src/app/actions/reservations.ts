"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  buildTimeSlots,
  getDateWeekday,
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
    redirectToReservationError(slug, "Restaurante não encontrado");
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
    redirectToReservationError(slug, "Preencha os campos obrigatórios");
  }

  if (!Number.isInteger(people) || people < 1 || people > 60) {
    redirectToReservationError(slug, "Informe uma quantidade de pessoas válida");
  }

  if (!isValidDate(reservationDate) || !isValidTime(reservationTime)) {
    redirectToReservationError(slug, "Data ou horário inválido");
  }

  if (!slots.includes(reservationTime)) {
    redirectToReservationError(slug, "Escolha um horário disponível");
  }

  const availableDays = settings?.available_days ?? [1, 2, 3, 4, 5, 6, 0];

  if (!availableDays.includes(getDateWeekday(reservationDate))) {
    redirectToReservationError(slug, "Restaurante fechado nesta data");
  }

  if (
    settings?.allow_large_groups === false &&
    people > (settings.large_group_threshold ?? 8)
  ) {
    redirectToReservationError(slug, "Grupo acima do limite configurado");
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
    redirectToReservationError(slug, "Não foi possível criar a reserva");
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
    redirectToAdminError(slug, "Status inválido");
  }

  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    redirectToAdminError(slug, "Restaurante não encontrado");
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
    redirectToAdminError(slug, "Reserva não encontrada");
  }

  if (!isAllowedStatusTransition(reservation.status, nextStatus)) {
    redirectToAdminError(slug, "Transição de status não permitida");
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
    redirectToAdminError(slug, "Não foi possível atualizar a reserva");
  }

  revalidatePath(`/admin/${slug}/reservas`);
  revalidatePath(`/r/${slug}/acompanhar`);
  redirect(`/admin/${slug}/reservas?ok=${encodeURIComponent(getStatusFeedback(nextStatus))}`);
}

export async function updateRestaurantCapacity(
  slug: string,
  formData: FormData,
) {
  const context = await getRestaurantContextBySlug(slug);

  if (!context) {
    redirectToAdminError(slug, "Restaurante não encontrado");
  }

  const totalTables = getInteger(formData, "total_tables");
  const totalSeats = getInteger(formData, "total_seats");
  const seatsPerTable = getInteger(formData, "seats_per_table");

  if (!isInRange(totalTables, 1, 300)) {
    redirectToAdminError(slug, "Total de mesas inválido");
  }

  if (!isInRange(totalSeats, 1, 2000)) {
    redirectToAdminError(slug, "Total de lugares inválido");
  }

  if (!isInRange(seatsPerTable, 1, 20)) {
    redirectToAdminError(slug, "Pessoas por mesa inválido");
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("restaurants")
    .update({
      total_tables: totalTables,
      total_seats: totalSeats,
      seats_per_table: seatsPerTable,
    })
    .eq("id", context.restaurant.id)
    .eq("slug", slug);

  if (error) {
    console.error("[restaurants:capacity] failed to update capacity", {
      slug,
      restaurantId: context.restaurant.id,
      error,
    });
    redirectToAdminError(slug, "Não foi possível atualizar a capacidade");
  }

  revalidatePath(`/admin/${slug}/reservas`);
  redirect(`/admin/${slug}/reservas?ok=${encodeURIComponent("Capacidade do salão atualizada")}`);
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

function redirectToReservationError(slug: string, message: string): never {
  redirect(`/r/${slug}/reserva?erro=${encodeURIComponent(message)}`);
}

function redirectToAdminError(slug: string, message: string): never {
  redirect(`/admin/${slug}/reservas?erro=${encodeURIComponent(message)}`);
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getInteger(formData: FormData, key: string) {
  const value = Number(getText(formData, key));
  return Number.isInteger(value) ? value : 0;
}

function isInRange(value: number, min: number, max: number) {
  return Number.isInteger(value) && value >= min && value <= max;
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

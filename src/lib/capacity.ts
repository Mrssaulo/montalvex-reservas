import type { Reservation } from "@/lib/supabase/types";

export type RestaurantCapacityInput = {
  reservations: Reservation[];
  totalTables: number;
  totalSeats: number;
  seatsPerTable: number;
  currentDate: string;
};

export type RestaurantCapacity = {
  totalTables: number;
  totalSeats: number;
  seatsPerTable: number;
  confirmedTables: number;
  pendingTables: number;
  activeTables: number;
  availableTables: number;
  confirmedSeats: number;
  pendingSeats: number;
  activeSeats: number;
  availableSeats: number;
  confirmedPeople: number;
  pendingPeople: number;
  totalPeople: number;
  occupancyPercentByTables: number;
  occupancyPercentBySeats: number;
  occupancyPercent: number;
  oldConfirmedCount: number;
};

export function estimateTablesForPeople(people: number, seatsPerTable: number) {
  const safePeople = Number.isFinite(people) && people > 0 ? people : 1;
  const safeSeatsPerTable =
    Number.isFinite(seatsPerTable) && seatsPerTable >= 1 ? seatsPerTable : 1;

  return Math.max(1, Math.ceil(safePeople / safeSeatsPerTable));
}

export function calculateRestaurantCapacity({
  reservations,
  totalTables,
  totalSeats,
  seatsPerTable,
  currentDate,
}: RestaurantCapacityInput): RestaurantCapacity {
  const safeTotalTables = sanitizePositiveInteger(totalTables, 20);
  const safeTotalSeats = sanitizePositiveInteger(totalSeats, 80);
  const safeSeatsPerTable = sanitizePositiveInteger(seatsPerTable, 4);

  const activeReservations = reservations.filter((reservation) => {
    if (reservation.status === "pending") {
      return reservation.reservation_date === currentDate;
    }

    if (reservation.status === "confirmed") {
      return reservation.reservation_date <= currentDate;
    }

    return false;
  });

  const pendingReservations = activeReservations.filter(
    (reservation) => reservation.status === "pending",
  );
  const confirmedReservations = activeReservations.filter(
    (reservation) => reservation.status === "confirmed",
  );

  const pendingTables = sumEstimatedTables(pendingReservations, safeSeatsPerTable);
  const confirmedTables = sumEstimatedTables(confirmedReservations, safeSeatsPerTable);
  const pendingPeople = sumPeople(pendingReservations);
  const confirmedPeople = sumPeople(confirmedReservations);
  const activeTables = pendingTables + confirmedTables;
  const activeSeats = pendingPeople + confirmedPeople;
  const occupancyPercentByTables = percent(activeTables, safeTotalTables);
  const occupancyPercentBySeats = percent(activeSeats, safeTotalSeats);

  return {
    totalTables: safeTotalTables,
    totalSeats: safeTotalSeats,
    seatsPerTable: safeSeatsPerTable,
    confirmedTables,
    pendingTables,
    activeTables,
    availableTables: Math.max(0, safeTotalTables - activeTables),
    confirmedSeats: confirmedPeople,
    pendingSeats: pendingPeople,
    activeSeats,
    availableSeats: Math.max(0, safeTotalSeats - activeSeats),
    confirmedPeople,
    pendingPeople,
    totalPeople: activeSeats,
    occupancyPercentByTables,
    occupancyPercentBySeats,
    occupancyPercent: Math.max(occupancyPercentByTables, occupancyPercentBySeats),
    oldConfirmedCount: reservations.filter(
      (reservation) =>
        reservation.status === "confirmed" &&
        reservation.reservation_date < currentDate,
    ).length,
  };
}

function sumEstimatedTables(reservations: Reservation[], seatsPerTable: number) {
  return reservations.reduce(
    (total, reservation) =>
      total + estimateTablesForPeople(reservation.people, seatsPerTable),
    0,
  );
}

function sumPeople(reservations: Reservation[]) {
  return reservations.reduce((total, reservation) => total + reservation.people, 0);
}

function sanitizePositiveInteger(value: number, fallback: number) {
  return Number.isInteger(value) && value >= 1 ? value : fallback;
}

function percent(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((value / total) * 100));
}

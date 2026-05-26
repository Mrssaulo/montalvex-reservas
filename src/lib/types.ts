export type ReservationStatus =
  | "pendente"
  | "confirmada"
  | "recusada"
  | "finalizada";

export interface Reservation {
  id: string;
  nome: string;
  telefone: string;
  pessoas: number;
  data: string;
  horario: string;
  observacao?: string | null;
  status: ReservationStatus;
}

export type PricingMode = "reuniao" | "prospeccao";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceSetup: number;
  features: string[];
  highlighted?: boolean;
}

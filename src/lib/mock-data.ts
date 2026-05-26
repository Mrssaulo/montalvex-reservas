import type { Plan, Reservation } from "./types";

export const mockReservations: Reservation[] = [
  {
    id: "1",
    nome: "Lucas Martins",
    telefone: "(11) 98765-4321",
    pessoas: 2,
    data: "26/05",
    horario: "19:30",
    observacao: "Aniversário de casamento. Mesa mais reservada, se possível.",
    status: "confirmada",
  },
  {
    id: "2",
    nome: "Juliana Alves",
    telefone: "(11) 91234-5678",
    pessoas: 4,
    data: "26/05",
    horario: "20:00",
    observacao: "Uma das pessoas é celíaca.",
    status: "pendente",
  },
  {
    id: "3",
    nome: "Ricardo Santos",
    telefone: "(11) 99999-0000",
    pessoas: 6,
    data: "26/05",
    horario: "21:00",
    observacao: null,
    status: "pendente",
  },
];

export const plans: Plan[] = [
  {
    id: "reservas-online",
    name: "Reservas Online",
    tagline: "Para organizar a casa.",
    priceMonthly: 297,
    priceSetup: 3800,
    features: [
      "Site de reservas personalizado",
      "Painel interno da equipe",
      "Cardápio digital preparado para evoluir",
      "Controle de reservas e status",
      "Hospedagem e manutenção inclusas",
    ],
  },
  {
    id: "ia-operacional",
    name: "IA Operacional",
    tagline: "Automação inteligente.",
    priceMonthly: 497,
    priceSetup: 4900,
    highlighted: true,
    features: [
      "Tudo do Reservas Online",
      "IA para dúvidas frequentes de clientes",
      "Resumo diário para a equipe",
      "Suporte prioritário",
      "Limite mensal de IA incluso",
    ],
  },
  {
    id: "ia-completa",
    name: "IA Completa",
    tagline: "Gestão e análise.",
    priceMonthly: 697,
    priceSetup: 5800,
    features: [
      "Tudo dos planos anteriores",
      "Análise de horários de pico",
      "Sugestões operacionais por IA",
      "Relatórios mensais",
      "Consultoria de operação",
    ],
  },
];

export const timeSlots = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
];

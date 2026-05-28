export type Proposal = {
  slug: string;
  restaurantName: string;
  segment: string;
  city: string;
  mainPain: string;
  secondaryPain: string;
  recommendedPlan: string;
  headline: string;
  subheadline: string;
  primaryColor: string;
  accentColor: string;
  showPrices: boolean;
  proposalNotes: string[];
  demoReservationUrl: string;
  demoAdminUrl: string;
};

export const proposals: Proposal[] = [
  {
    slug: "bistro-monte-verde",
    restaurantName: "Bistro Monte Verde",
    segment: "bistro e restaurante de jantar",
    city: "Monte Verde",
    mainPain: "pedidos de reserva que chegam por conversa solta",
    secondaryPain: "confirmacoes manuais, preferencias de mesa e historico do atendimento",
    recommendedPlan: "IA Operacional",
    headline: "Uma proposta para transformar reservas em operacao visivel.",
    subheadline:
      "Para o Bistro Monte Verde, o foco e manter a experiencia acolhedora sem deixar a recepcao depender de mensagens espalhadas.",
    primaryColor: "#1B4332",
    accentColor: "#C06C58",
    showPrices: true,
    proposalNotes: [
      "Link proprio para o cliente solicitar mesa pelo celular.",
      "Painel para confirmar, recusar, finalizar e acompanhar capacidade.",
      "IA demonstrativa como apoio premium para resumir pico, observacoes e prioridades.",
    ],
    demoReservationUrl: "/r/bistro-monte-verde/reserva",
    demoAdminUrl: "/admin/bistro-monte-verde/reservas",
  },
  {
    slug: "nossa-casa",
    restaurantName: "Nossa Casa",
    segment: "restaurante familiar",
    city: "Goiania",
    mainPain: "reservas de grupos e datas especiais sem padrao de registro",
    secondaryPain: "telefone, WhatsApp e anotacoes internas disputando a atencao da equipe",
    recommendedPlan: "Reservas Online",
    headline: "Uma proposta para organizar reservas sem perder o jeito da casa.",
    subheadline:
      "Para o Nossa Casa, a tecnologia entra para padronizar o pedido e deixar a equipe no controle da confirmacao.",
    primaryColor: "#0F3D33",
    accentColor: "#B85C38",
    showPrices: false,
    proposalNotes: [
      "Fluxo simples para clientes que querem reservar pelo celular.",
      "Acompanhamento por protocolo para reduzir perguntas repetidas.",
      "Historico separado para a equipe consultar sem misturar com reservas ativas.",
    ],
    demoReservationUrl: "/demo/reserva",
    demoAdminUrl: "/demo/painel",
  },
];

export function getProposalBySlug(slug: string) {
  return proposals.find((proposal) => proposal.slug === slug) ?? null;
}

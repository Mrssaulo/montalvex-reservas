export type Proposal = {
  slug: string;
  restaurantName: string;
  segment: string;
  city: string;
  audienceType: string;
  mainPain: string;
  secondaryPain: string;
  operationContext: string;
  diagnosisTitle: string;
  diagnosisText: string;
  recommendedPlan: string;
  recommendedPlanReason: string;
  headline: string;
  subheadline: string;
  valuePromise: string;
  beforeList: string[];
  afterList: string[];
  highlightedFeatures: Array<{
    title: string;
    text: string;
  }>;
  aiUseCases: string[];
  primaryColor: string;
  accentColor: string;
  showPrices: boolean;
  proposalNotes: string[];
  tone: "premium" | "operational";
  demoReservationUrl: string;
  demoAdminUrl: string;
  ctaLabel: string;
  whatsappMessage: string;
};

export const proposals: Proposal[] = [
  {
    slug: "bistro-monte-verde",
    restaurantName: "Bistrô Monte Verde",
    segment: "bistrô e restaurante de jantar",
    city: "Monte Verde",
    audienceType: "casais, famílias, aniversários e clientes que valorizam experiência",
    mainPain: "reservas com observações especiais, preferências de mesa e confirmações espalhadas",
    secondaryPain: "a equipe precisa saber quem chega, o motivo da visita e quais detalhes tornam a mesa mais bem preparada",
    operationContext:
      "O Bistrô Monte Verde vende uma experiência tranquila. Quando aniversário, mesa reservada ou restrição alimentar ficam perdidos em conversa, a recepção trabalha no improviso.",
    diagnosisTitle: "A reserva faz parte da experiência, não apenas da agenda.",
    diagnosisText:
      "Para um bistrô mais acolhedor, a oportunidade está em transformar cada pedido em uma ficha clara: horário, quantidade de pessoas, observações especiais, status e histórico. Assim a equipe recebe melhor e o cliente acompanha sem precisar perguntar de novo.",
    recommendedPlan: "IA Operacional",
    recommendedPlanReason:
      "O plano organiza o fluxo base de reservas e adiciona apoio demonstrativo para destacar observações, aniversários, preferências e momentos de maior movimento.",
    headline: "Reservas com cara de cuidado, do pedido ao cliente chegando na mesa.",
    subheadline:
      "Para o Bistrô Monte Verde, a proposta prioriza experiência: pedido claro pelo celular, equipe preparada antes da chegada e acompanhamento por protocolo.",
    valuePromise:
      "Menos improviso na recepção e mais previsibilidade para entregar uma experiência premium desde a reserva.",
    beforeList: [
      "Observações de aniversário ou preferência de mesa perdidas no WhatsApp.",
      "Cliente perguntando se a reserva foi recebida ou confirmada.",
      "Equipe preparando o salão sem saber quais detalhes importam para cada mesa.",
      "Histórico de finalizadas e recusadas misturado com a operação ativa.",
    ],
    afterList: [
      "Cliente solicita a reserva em um link próprio do bistrô.",
      "Protocolo permite acompanhar se a reserva está pendente, confirmada ou recusada.",
      "Painel mostra observações especiais antes do horário de chegada.",
      "Histórico ajuda a entender movimento, recorrência e decisões da equipe.",
    ],
    highlightedFeatures: [
      {
        title: "Reserva pelo celular",
        text: "Uma experiência simples para o cliente pedir mesa sem baixar aplicativo.",
      },
      {
        title: "Observações especiais visíveis",
        text: "Aniversário, restrição alimentar e preferência de mesa aparecem junto da reserva.",
      },
      {
        title: "Acompanhamento por protocolo",
        text: "O cliente consulta o status sem depender de nova mensagem no WhatsApp.",
      },
      {
        title: "Histórico organizado",
        text: "Finalizadas e recusadas saem da visão ativa sem desaparecer da operação.",
      },
    ],
    aiUseCases: [
      "Resumo da noite com aniversários e observações importantes.",
      "Destaque de mesas com preferência por ambiente mais tranquilo.",
      "Apoio inteligente para lembrar a equipe dos horários de chegada.",
    ],
    primaryColor: "#1B4332",
    accentColor: "#C06C58",
    showPrices: true,
    proposalNotes: [
      "Link próprio para o cliente solicitar mesa pelo celular.",
      "Painel para confirmar, recusar, finalizar e acompanhar capacidade.",
      "IA demonstrativa como apoio premium para resumir pico, observações e prioridades.",
    ],
    tone: "premium",
    demoReservationUrl: "/r/bistro-monte-verde/reserva",
    demoAdminUrl: "/admin/bistro-monte-verde/reservas",
    ctaLabel: "Ver a experiência do cliente",
    whatsappMessage:
      "Olá! Quero entender a proposta do Montalvex Reservas para o Bistrô Monte Verde, com foco em experiência, observações especiais e acompanhamento por protocolo.",
  },
  {
    slug: "nossa-casa",
    restaurantName: "Nossa Casa",
    segment: "pizzaria, rodízio e restaurante de alto movimento",
    city: "Goiânia",
    audienceType: "grupos, famílias, rodízio, aniversários e fluxo intenso no pico",
    mainPain: "reservas de grupos, rodízio e salão cheio que chegam pelo WhatsApp sem visão do pico",
    secondaryPain: "mesa não preparada, equipe sem mapa rápido das pendências e cliente perguntando de novo pelo status",
    operationContext:
      "Na Nossa Casa, o problema aparece quando várias conversas chegam ao mesmo tempo: grupo grande, rodízio, horário cheio e equipe tentando lembrar o que foi combinado.",
    diagnosisTitle: "Em casa de alto movimento, reserva precisa virar fila operacional.",
    diagnosisText:
      "Para pizzaria e rodízio, a reserva não pode ficar escondida em conversa. Ela precisa entrar como solicitação visível, com status, pessoas, horário, observação e decisão da equipe antes do grupo chegar.",
    recommendedPlan: "IA Operacional",
    recommendedPlanReason:
      "O plano combina painel operacional com apoio demonstrativo para resumir movimento, pendências, grupos grandes e observações que impactam o preparo do salão.",
    headline: "Uma proposta para segurar o pico sem perder reserva no WhatsApp.",
    subheadline:
      "Para a Nossa Casa, a tecnologia entra para organizar grupos, rodízio e horários cheios em um painel em que a equipe consegue agir rápido.",
    valuePromise:
      "Mais controle no horário de pico: pendentes claras, confirmadas visíveis e cliente acompanhando por protocolo.",
    beforeList: [
      "Reservas espalhadas em conversas de WhatsApp.",
      "Grupo chegando sem mesa preparada no pico do rodízio.",
      "Equipe sem visão rápida de pendentes, confirmadas e recusadas.",
      "Cliente chamando de novo para saber se está tudo certo.",
    ],
    afterList: [
      "Link de reserva próprio para padronizar pedido de grupos.",
      "Painel com botões para confirmar, recusar e finalizar.",
      "Status por protocolo para reduzir retrabalho no atendimento.",
      "Resumo visual do movimento para preparar o salão antes do pico.",
    ],
    highlightedFeatures: [
      {
        title: "Gestão de grupos",
        text: "Quantidade de pessoas e horário ficam padronizados antes da equipe decidir.",
      },
      {
        title: "Painel operacional",
        text: "Pendentes, confirmadas, recusadas e finalizadas em uma visão feita para ação.",
      },
      {
        title: "Capacidade do salão",
        text: "Mesas e lugares ajudam a equipe a enxergar pressão antes do horário lotar.",
      },
      {
        title: "Protocolo para o cliente",
        text: "O cliente consulta o status sem ocupar a equipe com perguntas repetidas.",
      },
    ],
    aiUseCases: [
      "Resumo da operação com pendentes, confirmadas e pessoas previstas.",
      "Destaque de grupos grandes antes do horário de pico.",
      "Apoio inteligente para listar observações importantes do rodízio e aniversários.",
      "Sugestão demonstrativa de prioridades para preparar o salão.",
    ],
    primaryColor: "#0F3D33",
    accentColor: "#C2410C",
    showPrices: true,
    proposalNotes: [
      "Organização de reservas de grupos e rodízio sem depender de conversa solta.",
      "Painel operacional para confirmar, recusar e finalizar com rapidez.",
      "IA demonstrativa como apoio premium para resumir pico e observações importantes.",
    ],
    tone: "operational",
    demoReservationUrl: "/demo/reserva",
    demoAdminUrl: "/demo/painel",
    ctaLabel: "Quero entender para minha operação",
    whatsappMessage:
      "Olá! Quero entender a proposta do Montalvex Reservas para a Nossa Casa, com foco em pizzaria, rodízio, grupos e controle do horário de pico.",
  },
];

export function getProposalBySlug(slug: string) {
  return proposals.find((proposal) => proposal.slug === slug) ?? null;
}

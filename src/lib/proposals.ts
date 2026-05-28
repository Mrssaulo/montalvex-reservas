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
    restaurantName: "Bistro Monte Verde",
    segment: "bistro e restaurante de jantar",
    city: "Monte Verde",
    audienceType: "casais, familias, aniversarios e clientes que valorizam experiencia",
    mainPain: "reservas com observacoes especiais, preferencias de mesa e confirmacoes espalhadas",
    secondaryPain: "a equipe precisa saber quem chega, o motivo da visita e quais detalhes tornam a mesa mais bem preparada",
    operationContext:
      "O Bistro Monte Verde vende uma experiencia tranquila. Quando aniversario, mesa reservada ou restricao alimentar ficam perdidos em conversa, a recepcao trabalha no improviso.",
    diagnosisTitle: "A reserva faz parte da experiencia, nao apenas da agenda.",
    diagnosisText:
      "Para um bistro mais acolhedor, a oportunidade esta em transformar cada pedido em uma ficha clara: horario, quantidade de pessoas, observacoes especiais, status e historico. Assim a equipe recebe melhor e o cliente acompanha sem precisar perguntar de novo.",
    recommendedPlan: "IA Operacional",
    recommendedPlanReason:
      "O plano organiza o fluxo base de reservas e adiciona apoio demonstrativo para destacar observacoes, aniversarios, preferencias e momentos de maior movimento.",
    headline: "Reservas com cara de cuidado, do pedido ao cliente chegando na mesa.",
    subheadline:
      "Para o Bistro Monte Verde, a proposta prioriza experiencia: pedido claro pelo celular, equipe preparada antes da chegada e acompanhamento por protocolo.",
    valuePromise:
      "Menos improviso na recepcao e mais previsibilidade para entregar uma experiencia premium desde a reserva.",
    beforeList: [
      "Observacoes de aniversario ou preferencia de mesa perdidas no WhatsApp.",
      "Cliente perguntando se a reserva foi recebida ou confirmada.",
      "Equipe preparando o salao sem saber quais detalhes importam para cada mesa.",
      "Historico de finalizadas e recusadas misturado com a operacao ativa.",
    ],
    afterList: [
      "Cliente solicita a reserva em um link proprio do bistro.",
      "Protocolo permite acompanhar se a reserva esta pendente, confirmada ou recusada.",
      "Painel mostra observacoes especiais antes do horario de chegada.",
      "Historico ajuda a entender movimento, recorrencia e decisoes da equipe.",
    ],
    highlightedFeatures: [
      {
        title: "Reserva pelo celular",
        text: "Uma experiencia simples para o cliente pedir mesa sem baixar aplicativo.",
      },
      {
        title: "Observacoes especiais visiveis",
        text: "Aniversario, restricao alimentar e preferencia de mesa aparecem junto da reserva.",
      },
      {
        title: "Acompanhamento por protocolo",
        text: "O cliente consulta o status sem depender de nova mensagem no WhatsApp.",
      },
      {
        title: "Historico organizado",
        text: "Finalizadas e recusadas saem da visao ativa sem desaparecer da operacao.",
      },
    ],
    aiUseCases: [
      "Resumo da noite com aniversarios e observacoes importantes.",
      "Destaque de mesas com preferencia por ambiente mais tranquilo.",
      "Apoio inteligente para lembrar a equipe dos horarios de chegada.",
    ],
    primaryColor: "#1B4332",
    accentColor: "#C06C58",
    showPrices: true,
    proposalNotes: [
      "Link proprio para o cliente solicitar mesa pelo celular.",
      "Painel para confirmar, recusar, finalizar e acompanhar capacidade.",
      "IA demonstrativa como apoio premium para resumir pico, observacoes e prioridades.",
    ],
    tone: "premium",
    demoReservationUrl: "/r/bistro-monte-verde/reserva",
    demoAdminUrl: "/admin/bistro-monte-verde/reservas",
    ctaLabel: "Ver a experiencia do cliente",
    whatsappMessage:
      "Ola! Quero entender a proposta do Montalvex Reservas para o Bistro Monte Verde, com foco em experiencia, observacoes especiais e acompanhamento por protocolo.",
  },
  {
    slug: "nossa-casa",
    restaurantName: "Nossa Casa",
    segment: "pizzaria, rodizio e restaurante de alto movimento",
    city: "Goiania",
    audienceType: "grupos, familias, rodizio, aniversarios e fluxo intenso no pico",
    mainPain: "reservas de grupos, rodizio e salao cheio que chegam pelo WhatsApp sem visao do pico",
    secondaryPain: "mesa nao preparada, equipe sem mapa rapido das pendencias e cliente perguntando de novo pelo status",
    operationContext:
      "Na Nossa Casa, o problema aparece quando varias conversas chegam ao mesmo tempo: grupo grande, rodizio, horario cheio e equipe tentando lembrar o que foi combinado.",
    diagnosisTitle: "Em casa de alto movimento, reserva precisa virar fila operacional.",
    diagnosisText:
      "Para pizzaria e rodizio, a reserva nao pode ficar escondida em conversa. Ela precisa entrar como solicitacao visivel, com status, pessoas, horario, observacao e decisao da equipe antes do grupo chegar.",
    recommendedPlan: "IA Operacional",
    recommendedPlanReason:
      "O plano combina painel operacional com apoio demonstrativo para resumir movimento, pendencias, grupos grandes e observacoes que impactam o preparo do salao.",
    headline: "Uma proposta para segurar o pico sem perder reserva no WhatsApp.",
    subheadline:
      "Para a Nossa Casa, a tecnologia entra para organizar grupos, rodizio e horarios cheios em um painel que a equipe consegue agir rapido.",
    valuePromise:
      "Mais controle no horario de pico: pendentes claras, confirmadas visiveis e cliente acompanhando por protocolo.",
    beforeList: [
      "Reservas espalhadas em conversas de WhatsApp.",
      "Grupo chegando sem mesa preparada no pico do rodizio.",
      "Equipe sem visao rapida de pendentes, confirmadas e recusadas.",
      "Cliente chamando de novo para saber se esta tudo certo.",
    ],
    afterList: [
      "Link de reserva proprio para padronizar pedido de grupos.",
      "Painel com botoes para confirmar, recusar e finalizar.",
      "Status por protocolo para reduzir retrabalho no atendimento.",
      "Resumo visual do movimento para preparar o salao antes do pico.",
    ],
    highlightedFeatures: [
      {
        title: "Gestao de grupos",
        text: "Quantidade de pessoas e horario ficam padronizados antes da equipe decidir.",
      },
      {
        title: "Painel operacional",
        text: "Pendentes, confirmadas, recusadas e finalizadas em uma visao feita para acao.",
      },
      {
        title: "Capacidade do salao",
        text: "Mesas e lugares ajudam a equipe enxergar pressao antes do horario lotar.",
      },
      {
        title: "Protocolo para o cliente",
        text: "O cliente consulta o status sem ocupar a equipe com perguntas repetidas.",
      },
    ],
    aiUseCases: [
      "Resumo da operacao com pendentes, confirmadas e pessoas previstas.",
      "Destaque de grupos grandes antes do horario de pico.",
      "Apoio inteligente para listar observacoes importantes do rodizio e aniversarios.",
      "Sugestao demonstrativa de prioridades para preparar o salao.",
    ],
    primaryColor: "#0F3D33",
    accentColor: "#C2410C",
    showPrices: true,
    proposalNotes: [
      "Organizacao de reservas de grupos e rodizio sem depender de conversa solta.",
      "Painel operacional para confirmar, recusar e finalizar com rapidez.",
      "IA demonstrativa como apoio premium para resumir pico e observacoes importantes.",
    ],
    tone: "operational",
    demoReservationUrl: "/demo/reserva",
    demoAdminUrl: "/demo/painel",
    ctaLabel: "Quero entender para minha operacao",
    whatsappMessage:
      "Ola! Quero entender a proposta do Montalvex Reservas para a Nossa Casa, com foco em pizzaria, rodizio, grupos e controle do horario de pico.",
  },
];

export function getProposalBySlug(slug: string) {
  return proposals.find((proposal) => proposal.slug === slug) ?? null;
}

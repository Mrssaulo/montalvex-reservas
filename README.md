# Montalvex Reservas

MVP em Next.js para reservas white-label de restaurantes. A demo comercial continua intacta e a base real usa Supabase para restaurantes, configurações, reservas, acompanhamento por protocolo e controle de capacidade do salão.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- lucide-react

Sem Neon, sem Drizzle, sem OpenRouter, sem IA real e sem pagamento nesta fase.

## Variáveis De Ambiente

Crie um arquivo `.env.local` na raiz do projeto usando `.env.example` como base:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_ACCESS_TOKEN=
```

Não coloque chaves reais no repositório. `SUPABASE_SERVICE_ROLE_KEY` é usada apenas em código server-side. `ADMIN_ACCESS_TOKEN` é o código simples do painel administrativo neste MVP.

## Banco Supabase

1. Abra o SQL Editor no Supabase.
2. Rode o conteúdo de `supabase/schema.sql`.
3. Depois rode o conteúdo de `supabase/seed.sql`.

Para projetos que já rodaram o schema anterior, rode também:

```sql
-- conteúdo de supabase/add-reservation-tracking.sql
```

Essa migration adiciona `reservation_code` e `public_token` em `reservations` sem apagar dados existentes.

Para adicionar capacidade do salão em bancos existentes, rode:

```sql
-- conteúdo de supabase/add-restaurant-capacity.sql
```

Essa migration adiciona em `restaurants`:

- `total_tables`: quantidade total de mesas do restaurante.
- `total_seats`: quantidade total de cadeiras/lugares disponíveis.
- `seats_per_table`: média de pessoas por mesa usada para estimar mesas ocupadas por reserva.

No seed do Bistrô Monte Verde:

- `total_tables = 18`
- `total_seats = 72`
- `seats_per_table = 4`

Se o painel ou as rotas reais retornarem erro de permissão no Supabase durante o MVP sem login, rode também:

```sql
-- conteúdo de supabase/fix-reservation-status-policies.sql
```

Esse arquivo cria policies temporárias para desenvolvimento. Antes de produção real, substitua por autenticação e permissões por restaurante.

Para histórico com arquivamento visual, rode também:

```sql
-- conteúdo de supabase/add-reservation-history-archive.sql
```

Essa migration adiciona `archived_at` em `reservations`. O botão X do histórico preenche esse campo e não deleta a reserva do banco.

O schema cria:

- `restaurants`
- `reservations`
- `restaurant_settings`

As tabelas ficam com RLS habilitado e sem acesso público direto para `anon`/`authenticated`. Neste MVP, o app usa Server Actions com service role no servidor e sempre escopa as operações por restaurante.

## Capacidade Do Salão

O cálculo fica em `src/lib/capacity.ts`.

Mesas estimadas por reserva:

```ts
Math.ceil(people / seats_per_table)
```

Com `seats_per_table = 4`:

- 1 a 4 pessoas = 1 mesa
- 5 a 8 pessoas = 2 mesas
- 9 a 12 pessoas = 3 mesas

Status que contam na capacidade:

- `pending`: conta como em análise para reservas de hoje.
- `confirmed`: conta como comprometida/ocupada para reservas de hoje e também para reservas antigas ainda não finalizadas.

Status que não contam:

- `declined`
- `finished`

Regra crítica:

Mesas e lugares só são liberados quando a reserva é finalizada pela equipe. Uma reserva `confirmed` não libera capacidade automaticamente pelo horário, mesmo que seja antiga.

O painel `/admin/bistro-monte-verde/reservas` mostra:

- mesas totais;
- mesas livres estimadas;
- mesas confirmadas;
- mesas em análise;
- lugares totais;
- lugares livres estimados;
- lugares confirmados;
- lugares em análise;
- pessoas previstas;
- ocupação estimada.

Também existe uma área “Configuração do salão” para editar `total_tables`, `total_seats` e `seats_per_table` com Server Action segura por `slug`.

## Painel Admin MVP

O painel real em `/admin/[slug]/reservas` exige `ADMIN_ACCESS_TOKEN`.

Fluxo atual:

- o usuário abre `/admin/bistro-monte-verde/reservas`;
- informa o código configurado em `ADMIN_ACCESS_TOKEN`;
- o app grava o cookie httpOnly `montalvex_admin_session` por até 8 horas;
- o botão “Sair” limpa o cookie e redireciona para `/`;
- as Server Actions de confirmar, recusar, finalizar, arquivar e alterar capacidade validam a sessão antes de alterar dados.

Essa proteção é simples e temporária. Login completo por restaurante/equipe pode ser implementado depois com permissões reais e RLS mais restritiva.

## Como Testar Capacidade

1. Aplique `supabase/add-restaurant-capacity.sql` no Supabase.
2. Abra `/admin/bistro-monte-verde/reservas`.
3. Confira o bloco “Capacidade do salão”.
4. Crie uma reserva com 4 pessoas: deve estimar 1 mesa e 4 lugares.
5. Crie uma reserva com 5 pessoas: deve estimar 2 mesas e 5 lugares.
6. Confirme uma reserva pendente: ela sai de “em análise” e entra como confirmada/ocupada.
7. Recuse uma reserva pendente: ela deixa de contar na capacidade.
8. Finalize uma reserva confirmada: mesas e lugares são liberados.
9. Altere total de mesas/lugares no painel e confira o recálculo.
10. Consulte o acompanhamento do cliente para confirmar que o status continua funcionando.

## Rotas Demo

Estas rotas continuam sendo a demonstração comercial e não foram movidas:

- `/`
- `/demo`
- `/demo/reserva`
- `/demo/painel`

## Rotas Reais

Depois de rodar o seed:

- `/r/bistro-monte-verde/reserva` - formulário público real de reserva.
- `/r/bistro-monte-verde/acompanhar` - acompanhamento público por protocolo e telefone.
- `/admin/bistro-monte-verde/reservas` - painel real de reservas e capacidade do salão.

Regras multi-restaurante implementadas nesta base:

- busca restaurante por `slug`;
- cria reserva com `restaurant.id` resolvido no servidor;
- gera protocolo curto em `reservation_code`;
- consulta acompanhamento por `restaurant_id` + `reservation_code` + telefone;
- lista reservas sempre com filtro por `restaurant_id`;
- atualiza status apenas quando a reserva pertence ao restaurante correto;
- não confia em `restaurant_id` enviado pelo frontend.

## Rodar Localmente

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

## Configurar Na Vercel

No projeto da Vercel, configure as mesmas variáveis:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ACCESS_TOKEN`

Depois faça o deploy normalmente. Não exponha `SUPABASE_SERVICE_ROLE_KEY` como variável pública e não prefixe essa chave com `NEXT_PUBLIC_`.

## Validar Build

```bash
npm run build
```

## Avisos De Segurança

O painel admin usa token único por ambiente e cookie httpOnly. É suficiente para validar o MVP com cuidado, mas não substitui login completo, usuários por restaurante, auditoria e permissões por equipe.

O acompanhamento por protocolo + telefone é a solução temporária do MVP para o cliente ver se a reserva está pendente, confirmada, recusada ou finalizada.

OpenRouter/IA real ainda não foi integrado. A IA continua demonstrativa/visual para planos futuros.

## Próximas Fases

- Login real para restaurantes.
- RLS completa por usuário/organização.
- Permissões para equipe/admin.
- IA real para atendimento e operação.
- Pagamentos e planos.

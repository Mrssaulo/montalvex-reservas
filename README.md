# Montalvex Reservas

MVP em Next.js para reservas white-label de restaurantes. A demo comercial continua intacta e a base real agora usa Supabase para restaurantes, configuracoes e reservas.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- lucide-react

Sem Neon, sem Drizzle, sem OpenRouter, sem IA real e sem pagamento nesta fase.

## Variaveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto usando `.env.example` como base:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Nao coloque chaves reais no repositorio. `SUPABASE_SERVICE_ROLE_KEY` e usada apenas em codigo server-side.

## Banco Supabase

1. Abra o SQL Editor no Supabase.
2. Rode o conteudo de `supabase/schema.sql`.
3. Depois rode o conteudo de `supabase/seed.sql`.

Para projetos que ja rodaram o schema anterior, rode tambem:

```sql
-- conteudo de supabase/add-reservation-tracking.sql
```

Essa migration adiciona `reservation_code` e `public_token` em `reservations` sem apagar dados existentes.

Se o painel ou as rotas reais retornarem erro de permissao no Supabase durante o MVP sem login, rode tambem:

```sql
-- conteudo de supabase/fix-reservation-status-policies.sql
```

Esse arquivo cria policies temporarias para desenvolvimento. Antes de producao real, substitua por autenticacao e permissoes por restaurante.

O schema cria:

- `restaurants`
- `reservations`
- `restaurant_settings`

As tabelas ficam com RLS habilitado e sem acesso publico direto para `anon`/`authenticated`. Neste MVP, o app usa Server Actions com service role no servidor e sempre escopa as operacoes por restaurante.

## Rotas demo

Estas rotas continuam sendo a demonstracao comercial e nao foram movidas:

- `/`
- `/demo`
- `/demo/reserva`
- `/demo/painel`

## Rotas reais

Depois de rodar o seed:

- `/r/bistro-monte-verde/reserva` - formulario publico real de reserva.
- `/r/bistro-monte-verde/acompanhar` - acompanhamento publico por protocolo e telefone.
- `/admin/bistro-monte-verde/reservas` - painel real basico de reservas.

Regras multi-restaurante implementadas nesta base:

- busca restaurante por `slug`;
- cria reserva com `restaurant.id` resolvido no servidor;
- gera protocolo curto em `reservation_code`;
- consulta acompanhamento por `restaurant_id` + `reservation_code` + telefone;
- lista reservas sempre com filtro por `restaurant_id`;
- atualiza status apenas quando a reserva pertence ao restaurante correto;
- nao confia em `restaurant_id` enviado pelo frontend.

## Rodar localmente

```bash
npm run dev
```

Depois abra `http://localhost:3000`.

## Validar build

```bash
npm run build
```

## Avisos de seguranca

O painel admin ainda esta aberto para desenvolvimento. Nao use com cliente real em producao antes de adicionar autenticacao, permissoes e politicas completas.

O acompanhamento por protocolo + telefone e a solucao temporaria do MVP para o cliente ver se a reserva esta pendente, confirmada, recusada ou finalizada.

## Proximas fases

- Login real para restaurantes.
- RLS completa por usuario/organizacao.
- Permissoes para equipe/admin.
- IA real para atendimento e operacao.
- Pagamentos e planos.

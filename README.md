# Montalvex Reservas

Demonstração comercial em Next.js para apresentar um sistema white-label de reservas para restaurantes.

## Rotas

- `/` - landing comercial com opção de mostrar ou ocultar valores.
- `/demo` - hub da demonstração comercial.
- `/demo/reserva` - fluxo mobile de reserva do cliente.
- `/demo/painel` - painel interno da equipe com ações demonstrativas.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react

## Rodar localmente

```bash
npm run dev
```

Depois abra `http://localhost:3000`.

## Validar build

```bash
npm run build
```

A demonstração não possui backend, autenticação ou IA real. Os dados ficam isolados em `src/lib/mock-data.ts` para facilitar evolução futura com banco e API.

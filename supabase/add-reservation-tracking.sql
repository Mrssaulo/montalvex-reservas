create extension if not exists pgcrypto;

alter table public.reservations
  add column if not exists reservation_code text;

alter table public.reservations
  add column if not exists public_token uuid default gen_random_uuid();

update public.reservations
set public_token = gen_random_uuid()
where public_token is null;

update public.reservations
set reservation_code = 'MV-' || upper(substr(replace(id::text, '-', ''), 1, 8))
where reservation_code is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reservations_reservation_code_key'
      and conrelid = 'public.reservations'::regclass
  ) then
    alter table public.reservations
      add constraint reservations_reservation_code_key unique (reservation_code);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reservations_public_token_key'
      and conrelid = 'public.reservations'::regclass
  ) then
    alter table public.reservations
      add constraint reservations_public_token_key unique (public_token);
  end if;
end $$;

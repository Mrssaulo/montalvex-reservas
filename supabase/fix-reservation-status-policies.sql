-- Politicas temporarias para MVP sem login.
-- Antes de producao real, implementar autenticacao e permissoes por restaurante.
-- Nao apaga dados existentes.

alter table public.restaurants enable row level security;
alter table public.reservations enable row level security;
alter table public.restaurant_settings enable row level security;

grant select on public.restaurants to anon, authenticated;
grant select on public.restaurant_settings to anon, authenticated;
grant select, insert, update on public.reservations to anon, authenticated;

drop policy if exists "mvp_read_active_restaurants" on public.restaurants;
create policy "mvp_read_active_restaurants"
on public.restaurants
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "mvp_read_settings_for_active_restaurants" on public.restaurant_settings;
create policy "mvp_read_settings_for_active_restaurants"
on public.restaurant_settings
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = restaurant_settings.restaurant_id
      and restaurants.is_active = true
  )
);

drop policy if exists "mvp_read_reservations_for_active_restaurants" on public.reservations;
create policy "mvp_read_reservations_for_active_restaurants"
on public.reservations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = reservations.restaurant_id
      and restaurants.is_active = true
  )
);

drop policy if exists "mvp_create_pending_reservations_for_active_restaurants" on public.reservations;
create policy "mvp_create_pending_reservations_for_active_restaurants"
on public.reservations
for insert
to anon, authenticated
with check (
  status = 'pending'
  and exists (
    select 1
    from public.restaurants
    where restaurants.id = reservations.restaurant_id
      and restaurants.is_active = true
  )
);

drop policy if exists "mvp_update_reservation_status_for_active_restaurants" on public.reservations;
create policy "mvp_update_reservation_status_for_active_restaurants"
on public.reservations
for update
to anon, authenticated
using (
  exists (
    select 1
    from public.restaurants
    where restaurants.id = reservations.restaurant_id
      and restaurants.is_active = true
  )
)
with check (
  status in ('pending', 'confirmed', 'declined', 'finished')
  and exists (
    select 1
    from public.restaurants
    where restaurants.id = reservations.restaurant_id
      and restaurants.is_active = true
  )
);

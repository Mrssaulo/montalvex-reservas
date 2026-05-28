alter table public.reservations
  add column if not exists archived_at timestamptz;

create index if not exists reservations_restaurant_archived_idx
on public.reservations (restaurant_id, archived_at);

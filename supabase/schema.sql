create extension if not exists pgcrypto;

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  primary_color text,
  accent_color text,
  background_color text,
  phone text,
  address text,
  opening_time time not null default '18:00',
  closing_time time not null default '00:00',
  last_reservation_time time not null default '22:30',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  customer_name text not null,
  customer_phone text not null,
  reservation_code text unique,
  public_token uuid unique default gen_random_uuid(),
  people int not null check (people > 0),
  reservation_date date not null,
  reservation_time time not null,
  notes text,
  status text not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint reservations_status_check check (
    status in ('pending', 'confirmed', 'declined', 'finished')
  )
);

create table if not exists public.restaurant_settings (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  available_days int[] default array[1,2,3,4,5,6,0],
  interval_minutes int default 30,
  max_people_per_slot int,
  allow_large_groups boolean default true,
  large_group_threshold int default 8,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint restaurant_settings_restaurant_id_key unique (restaurant_id)
);

alter table public.restaurants enable row level security;
alter table public.reservations enable row level security;
alter table public.restaurant_settings enable row level security;

revoke all on public.restaurants from anon, authenticated;
revoke all on public.reservations from anon, authenticated;
revoke all on public.restaurant_settings from anon, authenticated;

grant all on public.restaurants to service_role;
grant all on public.reservations to service_role;
grant all on public.restaurant_settings to service_role;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists restaurants_set_updated_at on public.restaurants;
create trigger restaurants_set_updated_at
before update on public.restaurants
for each row execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

drop trigger if exists restaurant_settings_set_updated_at on public.restaurant_settings;
create trigger restaurant_settings_set_updated_at
before update on public.restaurant_settings
for each row execute function public.set_updated_at();

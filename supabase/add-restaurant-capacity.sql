alter table public.restaurants
  add column if not exists total_tables integer not null default 20,
  add column if not exists total_seats integer not null default 80,
  add column if not exists seats_per_table integer not null default 4;

update public.restaurants
set
  total_tables = greatest(coalesce(total_tables, 20), 1),
  total_seats = greatest(coalesce(total_seats, 80), 1),
  seats_per_table = greatest(coalesce(seats_per_table, 4), 1);

alter table public.restaurants
  alter column total_tables set default 20,
  alter column total_seats set default 80,
  alter column seats_per_table set default 4,
  alter column total_tables set not null,
  alter column total_seats set not null,
  alter column seats_per_table set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'restaurants_total_tables_min_check'
      and conrelid = 'public.restaurants'::regclass
  ) then
    alter table public.restaurants
      add constraint restaurants_total_tables_min_check check (total_tables >= 1);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'restaurants_total_seats_min_check'
      and conrelid = 'public.restaurants'::regclass
  ) then
    alter table public.restaurants
      add constraint restaurants_total_seats_min_check check (total_seats >= 1);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'restaurants_seats_per_table_min_check'
      and conrelid = 'public.restaurants'::regclass
  ) then
    alter table public.restaurants
      add constraint restaurants_seats_per_table_min_check check (seats_per_table >= 1);
  end if;
end $$;

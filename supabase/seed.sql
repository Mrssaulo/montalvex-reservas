with upserted_restaurant as (
  insert into public.restaurants (
    name,
    slug,
    primary_color,
    accent_color,
    background_color,
    phone,
    address,
    opening_time,
    closing_time,
    last_reservation_time,
    is_active
  )
  values (
    'Bistrô Monte Verde',
    'bistro-monte-verde',
    '#1B4332',
    '#C06C58',
    '#FDFBF7',
    '(11) 4002-2026',
    'Rua das Oliveiras, 128',
    '18:00',
    '00:00',
    '22:30',
    true
  )
  on conflict (slug) do update set
    name = excluded.name,
    primary_color = excluded.primary_color,
    accent_color = excluded.accent_color,
    background_color = excluded.background_color,
    phone = excluded.phone,
    address = excluded.address,
    opening_time = excluded.opening_time,
    closing_time = excluded.closing_time,
    last_reservation_time = excluded.last_reservation_time,
    is_active = excluded.is_active,
    updated_at = now()
  returning id
),
restaurant_row as (
  select id from upserted_restaurant
  union
  select id from public.restaurants where slug = 'bistro-monte-verde'
  limit 1
),
upserted_settings as (
  insert into public.restaurant_settings (
    restaurant_id,
    available_days,
    interval_minutes,
    max_people_per_slot,
    allow_large_groups,
    large_group_threshold
  )
  select
    id,
    array[1,2,3,4,5,6,0],
    30,
    18,
    true,
    8
  from restaurant_row
  on conflict (restaurant_id) do update set
    available_days = excluded.available_days,
    interval_minutes = excluded.interval_minutes,
    max_people_per_slot = excluded.max_people_per_slot,
    allow_large_groups = excluded.allow_large_groups,
    large_group_threshold = excluded.large_group_threshold,
    updated_at = now()
)
insert into public.reservations (
  id,
  restaurant_id,
  customer_name,
  customer_phone,
  reservation_code,
  people,
  reservation_date,
  reservation_time,
  notes,
  status
)
select
  seed.id,
  restaurant_row.id,
  seed.customer_name,
  seed.customer_phone,
  seed.reservation_code,
  seed.people,
  seed.reservation_date,
  seed.reservation_time,
  seed.notes,
  seed.status
from restaurant_row
cross join (
  values
    (
      '11111111-1111-4111-8111-111111111111'::uuid,
      'Mariana Costa',
      '(11) 95555-2026',
      'MV-SEED01',
      4,
      current_date,
      '20:00'::time,
      'Aniversario. Preferencia por uma mesa mais reservada.',
      'pending'
    ),
    (
      '22222222-2222-4222-8222-222222222222'::uuid,
      'Rafael Lima',
      '(11) 94444-1818',
      'MV-SEED02',
      2,
      current_date,
      '19:30'::time,
      'Sem restricoes alimentares.',
      'confirmed'
    ),
    (
      '33333333-3333-4333-8333-333333333333'::uuid,
      'Camila Rocha',
      '(11) 93333-2727',
      'MV-SEED03',
      6,
      current_date + interval '1 day',
      '21:00'::time,
      'Grupo de trabalho.',
      'pending'
    )
) as seed (
  id,
  customer_name,
  customer_phone,
  reservation_code,
  people,
  reservation_date,
  reservation_time,
  notes,
  status
)
on conflict (id) do update set
  restaurant_id = excluded.restaurant_id,
  customer_name = excluded.customer_name,
  customer_phone = excluded.customer_phone,
  reservation_code = excluded.reservation_code,
  people = excluded.people,
  reservation_date = excluded.reservation_date,
  reservation_time = excluded.reservation_time,
  notes = excluded.notes,
  status = excluded.status,
  updated_at = now();

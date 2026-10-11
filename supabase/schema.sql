-- Modèle de données cible pour HAT (Supabase / Postgres + PostGIS)
create extension if not exists postgis;

create type user_role as enum ('fan', 'artist');
create type donation_status as enum ('pending', 'succeeded', 'failed', 'refunded');

-- Un profil par compte Supabase Auth
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null default 'fan',
  display_name text not null,
  home_location geography(Point, 4326),
  search_radius_km int not null default 15,
  created_at timestamptz not null default now()
);

create table artists (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles on delete cascade,
  slug text unique not null,
  name text not null,
  genre text not null,
  city text not null,
  bio text,
  accent_color text not null default '#F34213',
  avatar_url text,
  banner_url text,
  accepts_donations boolean not null default false,
  stripe_account_id text,           -- compte Stripe Connect (Express)
  created_at timestamptz not null default now()
);

create table venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text not null,
  location geography(Point, 4326) not null
);
create index venues_location_idx on venues using gist (location);

create table events (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references artists on delete cascade,
  venue_id uuid not null references venues,
  starts_at timestamptz not null,
  kind text not null default 'Concert',
  ticket_url text,
  created_at timestamptz not null default now()
);
create index events_starts_at_idx on events (starts_at);

create table follows (
  fan_id uuid references profiles on delete cascade,
  artist_id uuid references artists on delete cascade,
  created_at timestamptz not null default now(),
  primary key (fan_id, artist_id)
);

-- Dates ajoutées à l'agenda / présence confirmée (déclenche la proposition de don)
create table attendances (
  fan_id uuid references profiles on delete cascade,
  event_id uuid references events on delete cascade,
  saved_at timestamptz not null default now(),
  attended boolean,                -- confirmé le lendemain ("Tu étais au concert ?")
  primary key (fan_id, event_id)
);

create table donations (
  id uuid primary key default gen_random_uuid(),
  fan_id uuid references profiles on delete set null,
  artist_id uuid not null references artists on delete cascade,
  event_id uuid references events on delete set null,
  amount_cents int not null check (amount_cents >= 100),
  platform_fee_cents int not null default 0,
  message text,
  stripe_payment_intent_id text unique,
  status donation_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Feed : prochaines dates autour d'un point
create or replace function events_near(lat double precision, lng double precision, radius_km int default 15)
returns table (event_id uuid, artist_id uuid, starts_at timestamptz, venue text, distance_m double precision)
language sql stable as $$
  select e.id, e.artist_id, e.starts_at, v.name,
         st_distance(v.location, st_makepoint(lng, lat)::geography) as distance_m
  from events e
  join venues v on v.id = e.venue_id
  where e.starts_at >= now()
    and st_dwithin(v.location, st_makepoint(lng, lat)::geography, radius_km * 1000)
  order by e.starts_at, distance_m;
$$;

-- À compléter : politiques RLS (lecture publique des artistes/dates,
-- écriture limitée au propriétaire, dons visibles par le fan et l'artiste).
alter table profiles enable row level security;
alter table artists enable row level security;
alter table events enable row level security;
alter table follows enable row level security;
alter table attendances enable row level security;
alter table donations enable row level security;

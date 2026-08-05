-- Horizon — schéma initial (véhicules, réservations, profils) + RLS
-- À exécuter dans l'éditeur SQL Supabase, ou via `supabase db push`.

create type vehicle_category as enum (
  'citadine', 'berline', 'suv', 'utilitaire', 'cabriolet', 'electrique'
);
create type transmission_type as enum ('manuelle', 'automatique');
create type fuel_type as enum ('essence', 'diesel', 'electrique', 'hybride');
create type booking_status as enum (
  'en_attente', 'confirmee', 'refusee', 'annulee'
);

-- ---------------------------------------------------------------------
-- vehicles
-- ---------------------------------------------------------------------
create table vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category vehicle_category not null,
  price_per_day numeric(8, 2) not null check (price_per_day > 0),
  images text[] not null default '{}',
  transmission transmission_type not null,
  fuel_type fuel_type not null,
  seats smallint not null check (seats > 0),
  mileage_included_km integer not null default 200,
  description text not null default '',
  location text not null default 'Paris',
  available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table vehicles enable row level security;

-- Catalogue public : consultable par tout le monde, y compris les
-- visiteurs non connectés (page d'accueil, catalogue, fiche véhicule).
create policy "vehicles_select_public"
  on vehicles for select
  using (true);

-- Aucun rôle client n'écrit dans le catalogue au stade MVP — la flotte
-- est alimentée via la clé service_role (qui contourne RLS). Ces
-- policies sont volontairement bloquantes et prêtes à être remplacées
-- par une condition `is_admin(auth.uid())` lors de l'ajout du back-office (V2).
create policy "vehicles_insert_admin_only"
  on vehicles for insert
  with check (false);

create policy "vehicles_update_admin_only"
  on vehicles for update
  using (false);

create policy "vehicles_delete_admin_only"
  on vehicles for delete
  using (false);

-- ---------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------
create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  preferred_brands text[] not null default '{}',
  avoided_brands text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (user_id)
);

alter table profiles enable row level security;

create policy "profiles_select_own"
  on profiles for select
  using (auth.uid() = user_id);

create policy "profiles_insert_own"
  on profiles for insert
  with check (auth.uid() = user_id);

create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "profiles_delete_own"
  on profiles for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- bookings
-- ---------------------------------------------------------------------
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  vehicle_id uuid not null references vehicles (id) on delete cascade,
  start_date date not null,
  end_date date not null check (end_date >= start_date),
  pickup_location text not null,
  status booking_status not null default 'en_attente',
  full_name text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

-- Un utilisateur ne voit que ses propres demandes de réservation.
create policy "bookings_select_own"
  on bookings for select
  using (auth.uid() = user_id);

-- Une nouvelle demande est toujours créée avec le statut "en_attente" :
-- le client ne peut pas s'auto-confirmer une réservation.
create policy "bookings_insert_own"
  on bookings for insert
  with check (auth.uid() = user_id and status = 'en_attente');

-- Le client ne peut modifier que ses réservations encore en attente,
-- et seulement pour les annuler — la confirmation/le refus reviendront
-- au back-office admin (V2, via service_role ou rôle admin dédié).
create policy "bookings_update_own_pending"
  on bookings for update
  using (auth.uid() = user_id and status = 'en_attente')
  with check (auth.uid() = user_id and status in ('en_attente', 'annulee'));

create policy "bookings_delete_own_pending"
  on bookings for delete
  using (auth.uid() = user_id and status = 'en_attente');

create index bookings_vehicle_id_idx on bookings (vehicle_id);
create index bookings_user_id_idx on bookings (user_id);
create index vehicles_category_idx on vehicles (category);

-- ---------------------------------------------------------------------
-- Disponibilité par dates
-- ---------------------------------------------------------------------
-- La RLS de `bookings` limite la lecture à ses propres réservations, ce
-- qui empêche de calculer la disponibilité globale d'un véhicule côté
-- client. Cette fonction `security definer` expose uniquement les ids
-- de véhicules indisponibles sur une période, sans exposer les
-- réservations elles-mêmes (aucune donnée personnelle).
create function get_unavailable_vehicle_ids(p_start date, p_end date)
returns setof uuid
language sql
security definer
set search_path = public
as $$
  select vehicle_id
  from bookings
  where status in ('en_attente', 'confirmee')
    and start_date <= p_end
    and end_date >= p_start;
$$;

grant execute on function get_unavailable_vehicle_ids(date, date) to anon, authenticated;

-- Plages de dates déjà réservées pour un véhicule donné (calendrier de
-- disponibilité de la fiche véhicule) — même principe : aucune donnée
-- personnelle exposée, uniquement les bornes de dates.
create function get_vehicle_booked_ranges(p_vehicle_id uuid)
returns table (start_date date, end_date date)
language sql
security definer
set search_path = public
as $$
  select start_date, end_date
  from bookings
  where vehicle_id = p_vehicle_id
    and status in ('en_attente', 'confirmee');
$$;

grant execute on function get_vehicle_booked_ranges(uuid) to anon, authenticated;

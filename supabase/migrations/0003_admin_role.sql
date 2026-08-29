-- Rôle admin + policies RLS pour le back-office (V2).
-- À exécuter dans l'éditeur SQL Supabase après les migrations précédentes.

alter table profiles
  add column role text not null default 'user' check (role in ('user', 'admin'));

-- Fonction security definer : contourne la RLS de `profiles` (qui ne
-- laisse chacun lire que sa propre ligne) pour permettre aux policies
-- des autres tables de vérifier le rôle de l'utilisateur courant sans
-- créer de dépendance circulaire.
create function is_admin(p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where user_id = p_user_id and role = 'admin'
  );
$$;

grant execute on function is_admin(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- vehicles : les policies bloquantes du MVP laissent place à l'admin.
-- ---------------------------------------------------------------------
drop policy "vehicles_insert_admin_only" on vehicles;
create policy "vehicles_insert_admin_only"
  on vehicles for insert
  with check (is_admin(auth.uid()));

drop policy "vehicles_update_admin_only" on vehicles;
create policy "vehicles_update_admin_only"
  on vehicles for update
  using (is_admin(auth.uid()));

drop policy "vehicles_delete_admin_only" on vehicles;
create policy "vehicles_delete_admin_only"
  on vehicles for delete
  using (is_admin(auth.uid()));

-- ---------------------------------------------------------------------
-- bookings : l'admin voit et met à jour toutes les demandes
-- (confirmer/refuser), en plus des policies existantes du client.
-- ---------------------------------------------------------------------
create policy "bookings_select_admin"
  on bookings for select
  using (is_admin(auth.uid()));

create policy "bookings_update_admin"
  on bookings for update
  using (is_admin(auth.uid()))
  with check (is_admin(auth.uid()));

-- ---------------------------------------------------------------------
-- profiles : l'admin peut lister les comptes (V2 phase Utilisateurs).
-- ---------------------------------------------------------------------
create policy "profiles_select_admin"
  on profiles for select
  using (is_admin(auth.uid()));

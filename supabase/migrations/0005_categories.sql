-- Catégories de véhicules éditables depuis l'admin — remplace l'enum
-- figé `vehicle_category` par une vraie table.

create table categories (
  value text primary key,
  label text not null,
  is_utility boolean not null default false,
  sort_order integer not null default 0
);

alter table categories enable row level security;

create policy "categories_select_public"
  on categories for select
  using (true);

create policy "categories_insert_admin"
  on categories for insert
  with check (is_admin(auth.uid()));

create policy "categories_update_admin"
  on categories for update
  using (is_admin(auth.uid()));

create policy "categories_delete_admin"
  on categories for delete
  using (is_admin(auth.uid()));

insert into categories (value, label, is_utility, sort_order) values
  ('citadine', 'Citadine', false, 1),
  ('berline', 'Berline', false, 2),
  ('suv', 'SUV', false, 3),
  ('cabriolet', 'Cabriolet', false, 4),
  ('electrique', 'Électrique', false, 5),
  ('utilitaire', 'Utilitaire', true, 6);

-- Détache vehicles.category de l'enum figé : devient une référence
-- texte vers categories(value). L'ancien type `vehicle_category` reste
-- en base (inutilisé) plutôt que d'être supprimé, pour éviter tout
-- risque si autre chose en dépendait sans qu'on le voie.
alter table vehicles alter column category type text using category::text;
alter table vehicles
  add constraint vehicles_category_fkey
  foreign key (category) references categories (value);

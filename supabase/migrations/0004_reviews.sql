-- Avis clients en base (gérables depuis l'admin) — remplace la liste
-- codée en dur de lib/reviews.ts. Reprend les 5 avis existants comme
-- données initiales.

create table reviews (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  rating smallint not null check (rating between 1 and 5),
  comment text not null,
  review_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table reviews enable row level security;

-- Public : consultable par tout le monde (accueil, fiche véhicule).
create policy "reviews_select_public"
  on reviews for select
  using (true);

create policy "reviews_insert_admin"
  on reviews for insert
  with check (is_admin(auth.uid()));

create policy "reviews_update_admin"
  on reviews for update
  using (is_admin(auth.uid()));

create policy "reviews_delete_admin"
  on reviews for delete
  using (is_admin(auth.uid()));

insert into reviews (author, rating, comment, review_date) values
  ('Camille D.', 5, 'Model 3 récupérée à CDG en 10 minutes chrono après un vol de nuit, direct sur le périph. Autonomie largement tenue jusqu''à Reims.', '2026-06-12'),
  ('Yassine B.', 4, 'Sportage nickel pour un déplacement pro à 5, juste 15 minutes d''attente au retrait porte de Vincennes un vendredi soir.', '2026-05-28'),
  ('Élodie M.', 5, 'Mini Cabriolet pour un weekend improvisé en Île-de-France, le kilométrage inclus était largement suffisant pour nos allers-retours.', '2026-04-03'),
  ('Thomas R.', 5, 'Loué le Trafic pour un déménagement sur Orly, volume parfait pour un F3 et pas de mauvaise surprise sur la caution annoncée.', '2026-03-19'),
  ('Sofia K.', 5, 'Première location de ma vie, j''appréhendais la paperasse mais tout s''est fait en dix minutes à la gare du Nord avec juste ma CB et mon permis.', '2026-02-08');

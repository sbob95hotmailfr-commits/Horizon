-- Options de réservation (GPS, siège enfant, conducteur supplémentaire),
-- inspirées des offres standards du secteur (ADA, ...). Stockées comme
-- un tableau de clés, le prix est recalculé côté application à partir
-- de lib/constants.ts (pas dupliqué en base).

alter table bookings
  add column extras text[] not null default '{}';

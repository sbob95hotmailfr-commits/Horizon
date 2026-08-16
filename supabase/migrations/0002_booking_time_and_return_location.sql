-- Ajoute l'heure de prise en charge/retour et un lieu de retour distinct
-- du lieu de retrait — fonctionnalités présentes chez les loueurs
-- standards (Sixt, ADA, Hertz) et absentes du MVP initial.

alter table bookings
  add column pickup_time text not null default '10:00',
  add column return_time text not null default '10:00',
  add column return_location text;

comment on column bookings.return_location is
  'Lieu de retour si différent du lieu de retrait (pickup_location). NULL = même lieu.';

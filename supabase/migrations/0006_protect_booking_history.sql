-- Empêche la suppression d'un véhicule d'effacer silencieusement son
-- historique de réservations. Jusqu'ici bookings.vehicle_id avait
-- "on delete cascade" : supprimer un véhicule depuis /admin/vehicules
-- effaçait aussi toutes ses réservations sans avertissement. On passe
-- en "on delete restrict" : la suppression est refusée tant que des
-- réservations existent, comme pour les catégories.

alter table bookings drop constraint bookings_vehicle_id_fkey;

alter table bookings
  add constraint bookings_vehicle_id_fkey
  foreign key (vehicle_id) references vehicles (id) on delete restrict;

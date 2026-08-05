-- Données de démonstration — flotte Horizon (Paris / Île-de-France)
insert into vehicles
  (name, brand, category, price_per_day, images, transmission, fuel_type, seats, mileage_included_km, description, location, available)
values
  ('208', 'Peugeot', 'citadine', 39, '{}', 'manuelle', 'essence', 5, 200, 'Citadine agile et économique, parfaite pour circuler dans Paris.', 'Paris — Gare de Lyon', true),
  ('Clio', 'Renault', 'citadine', 35, '{}', 'manuelle', 'essence', 5, 200, 'Compacte confortable pour vos trajets urbains quotidiens.', 'Paris — Gare du Nord', true),
  ('Model 3', 'Tesla', 'electrique', 89, '{}', 'automatique', 'electrique', 5, 300, 'Berline électrique premium, autonomie longue distance.', 'Aéroport Paris-Charles de Gaulle (CDG)', true),
  ('Tucson', 'Hyundai', 'suv', 69, '{}', 'automatique', 'hybride', 5, 250, 'SUV familial hybride, idéal pour les road trips.', 'Boulogne-Billancourt', true),
  ('Sportage', 'Kia', 'suv', 65, '{}', 'automatique', 'diesel', 5, 250, 'SUV spacieux et confortable pour toute la famille.', 'Paris — Porte de Vincennes', true),
  ('Trafic', 'Renault', 'utilitaire', 79, '{}', 'manuelle', 'diesel', 3, 200, 'Utilitaire volumineux pour déménagements et transport de matériel.', 'Aéroport Paris-Orly', true),
  ('Class A', 'Mercedes-Benz', 'berline', 75, '{}', 'automatique', 'essence', 5, 250, 'Berline premium, confort et prestance pour vos déplacements professionnels.', 'Paris — Gare de Lyon', true),
  ('Mini Cabriolet', 'Mini', 'cabriolet', 82, '{}', 'automatique', 'essence', 4, 200, 'Cabriolet élégant pour une escapade en Île-de-France.', 'Paris — Gare du Nord', true);

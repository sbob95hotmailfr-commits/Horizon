-- Deuxième passe : remplace les photos par des versions mieux composées
-- (Pexels) quand elles sont réellement meilleures (fond plus propre,
-- génération plus récente du modèle), sinon conserve les photos Unsplash
-- déjà vérifiées. Chaque candidat a été comparé visuellement à une photo
-- de référence officielle avant sélection.

-- Pexels : meilleure composition, fond épuré.
update vehicles set images = array[
  'https://images.pexels.com/photos/24551622/pexels-photo-24551622.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/18471354/pexels-photo-18471354.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/28928968/pexels-photo-28928968.jpeg?auto=compress&cs=tinysrgb&w=1080'
] where brand = 'Peugeot' and name = '208';

-- Pexels : quasi-studio, génération actuelle confirmée.
update vehicles set images = array[
  'https://images.pexels.com/photos/12554289/pexels-photo-12554289.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/35736787/pexels-photo-35736787.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/12554294/pexels-photo-12554294.jpeg?auto=compress&cs=tinysrgb&w=1080'
] where brand = 'Tesla' and name = 'Model 3';

-- Pexels : shooting quasi-studio, génération actuelle (calandre "jewel").
update vehicles set images = array[
  'https://images.pexels.com/photos/20082686/pexels-photo-20082686.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/31320983/pexels-photo-31320983.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.pexels.com/photos/19981247/pexels-photo-19981247.jpeg?auto=compress&cs=tinysrgb&w=1080'
] where brand = 'Hyundai' and name = 'Tucson';

-- Une deuxième photo trouvée sur Pexels (van actuel confirmé) en plus de
-- celle déjà validée sur Unsplash.
update vehicles set images = array[
  'https://images.pexels.com/photos/17976203/pexels-photo-17976203.jpeg?auto=compress&cs=tinysrgb&w=1080',
  'https://images.unsplash.com/photo-1776715765464-92254f0a092e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
] where brand = 'Renault' and name = 'Trafic';

-- Kia Sportage, Renault Clio, Mercedes Classe A, Mini Cabriolet : les
-- photos Pexels trouvées étaient toutes d'anciennes générations du
-- modèle (calandre différente de la référence actuelle) — on conserve
-- les photos Unsplash déjà en place (déjà à jour, pas de changement ici).

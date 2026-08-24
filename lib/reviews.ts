export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// Avis simulés pour la démo — aucun système de notation en base au stade MVP.
const SAMPLE_REVIEWS: Review[] = [
  {
    author: "Camille D.",
    rating: 5,
    comment:
      "Model 3 récupérée à CDG en 10 minutes chrono après un vol de nuit, direct sur le périph. Autonomie largement tenue jusqu'à Reims.",
    date: "2026-06-12",
  },
  {
    author: "Yassine B.",
    rating: 4,
    comment:
      "Sportage nickel pour un déplacement pro à 5, juste 15 minutes d'attente au retrait porte de Vincennes un vendredi soir.",
    date: "2026-05-28",
  },
  {
    author: "Élodie M.",
    rating: 5,
    comment:
      "Mini Cabriolet pour un weekend improvisé en Île-de-France, le kilométrage inclus était largement suffisant pour nos allers-retours.",
    date: "2026-04-03",
  },
  {
    author: "Thomas R.",
    rating: 5,
    comment:
      "Loué le Trafic pour un déménagement sur Orly, volume parfait pour un F3 et pas de mauvaise surprise sur la caution annoncée.",
    date: "2026-03-19",
  },
  {
    author: "Sofia K.",
    rating: 5,
    comment:
      "Première location de ma vie, j'appréhendais la paperasse mais tout s'est fait en dix minutes à la gare du Nord avec juste ma CB et mon permis.",
    date: "2026-02-08",
  },
];

export function getVehicleReviews(): Review[] {
  return SAMPLE_REVIEWS;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

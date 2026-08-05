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
    comment: "Voiture impeccable, prise en charge rapide à la gare de Lyon. Je recommande.",
    date: "2026-06-12",
  },
  {
    author: "Yassine B.",
    rating: 4,
    comment: "Très bon rapport qualité/prix, juste un léger retard au retrait.",
    date: "2026-05-28",
  },
  {
    author: "Élodie M.",
    rating: 5,
    comment: "Parfait pour notre week-end en famille, kilométrage largement suffisant.",
    date: "2026-04-03",
  },
];

export function getVehicleReviews(): Review[] {
  return SAMPLE_REVIEWS;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

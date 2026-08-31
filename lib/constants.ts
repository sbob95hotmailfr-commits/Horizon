import type { Transmission, FuelType } from "@/types/database.types";

export const CITY = "Paris";
export const REGION = "Île-de-France";

export const PICKUP_LOCATIONS = [
  "Paris — Gare de Lyon",
  "Paris — Gare du Nord",
  "Paris — Porte de Vincennes",
  "Aéroport Paris-Charles de Gaulle (CDG)",
  "Aéroport Paris-Orly",
  "Boulogne-Billancourt",
] as const;

// Les catégories de véhicules sont gérables depuis l'admin et vivent
// en base (table `categories`) — voir lib/categories.ts.

export const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
];

export const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "electrique", label: "Électrique" },
  { value: "hybride", label: "Hybride" },
];

export const BRAND_TAGLINE = "La liberté commence à l'horizon.";

// Options proposées à la réservation (inspirées des offres standards
// du secteur — GPS, siège enfant, conducteur supplémentaire). Le prix
// n'est pas stocké en base : recalculé à partir d'ici pour rester la
// source unique de vérité.
export const BOOKING_EXTRAS = [
  { key: "gps", label: "GPS", price: 5, unit: "jour" },
  { key: "siege_enfant", label: "Siège enfant", price: 4, unit: "jour" },
  { key: "conducteur_supp", label: "Conducteur supplémentaire", price: 8, unit: "forfait" },
] as const;

export type BookingExtraKey = (typeof BOOKING_EXTRAS)[number]["key"];

export function extrasTotal(extraKeys: string[], days: number): number {
  return extraKeys.reduce((sum, key) => {
    const extra = BOOKING_EXTRAS.find((e) => e.key === key);
    if (!extra) return sum;
    return sum + (extra.unit === "jour" ? extra.price * days : extra.price);
  }, 0);
}

// Créneaux d'ouverture des agences, par pas de 30 minutes (07h–21h30).
export const TIME_SLOTS: string[] = Array.from({ length: 30 }, (_, i) => {
  const totalMinutes = 7 * 60 + i * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});

export const DEFAULT_TIME = "10:00";

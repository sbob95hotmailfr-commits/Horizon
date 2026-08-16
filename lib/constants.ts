import type { VehicleCategory, Transmission, FuelType } from "@/types/database.types";

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

export const VEHICLE_CATEGORIES: { value: VehicleCategory; label: string }[] = [
  { value: "citadine", label: "Citadine" },
  { value: "berline", label: "Berline" },
  { value: "suv", label: "SUV" },
  { value: "utilitaire", label: "Utilitaire" },
  { value: "cabriolet", label: "Cabriolet" },
  { value: "electrique", label: "Électrique" },
];

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

// Créneaux d'ouverture des agences, par pas de 30 minutes (07h–21h30).
export const TIME_SLOTS: string[] = Array.from({ length: 30 }, (_, i) => {
  const totalMinutes = 7 * 60 + i * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});

export const DEFAULT_TIME = "10:00";

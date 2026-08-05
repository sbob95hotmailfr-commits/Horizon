import "server-only";
import { getVehiclePhotos } from "@/lib/unsplash";
import type { Vehicle } from "@/types/database.types";

/**
 * Retourne les photos d'un véhicule : celles enregistrées en base si
 * présentes, sinon des photos Unsplash correspondant à sa catégorie.
 */
export async function resolveVehicleImages(vehicle: Vehicle): Promise<string[]> {
  if (vehicle.images.length > 0) {
    return vehicle.images;
  }
  return getVehiclePhotos(vehicle.category);
}

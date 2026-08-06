import "server-only";
import { getVehiclePhotos } from "@/lib/unsplash";
import type { Vehicle } from "@/types/database.types";

function hashToIndex(id: string, length: number): number {
  if (length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

/**
 * Retourne les photos d'un véhicule : celles enregistrées en base si
 * présentes, sinon des photos Unsplash correspondant à sa catégorie.
 *
 * Plusieurs véhicules partagent souvent la même catégorie (donc le même
 * pool de photos Unsplash) — on fait tourner le pool par véhicule (hash
 * de son id) pour éviter que deux véhicules différents affichent
 * exactement la même photo en premier.
 */
export async function resolveVehicleImages(vehicle: Vehicle): Promise<string[]> {
  if (vehicle.images.length > 0) {
    return vehicle.images;
  }

  const pool = await getVehiclePhotos(vehicle.category);
  if (pool.length === 0) return pool;

  const offset = hashToIndex(vehicle.id, pool.length);
  return [...pool.slice(offset), ...pool.slice(0, offset)];
}

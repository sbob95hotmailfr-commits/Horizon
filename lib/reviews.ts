import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/types/database.types";

/**
 * Ne doit jamais faire planter l'accueil ou une fiche véhicule : si la
 * table n'est pas encore migrée ou momentanément injoignable, on affiche
 * simplement "0 avis" plutôt qu'une page en erreur.
 */
export async function getVehicleReviews(): Promise<Review[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("review_date", { ascending: false });

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

/** Réservé à l'admin : renvoie les avis dans l'ordre de création. */
export async function getAllReviewsAdmin(): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("review_date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getReviewById(id: string): Promise<Review | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

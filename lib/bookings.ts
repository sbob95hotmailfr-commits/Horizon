import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Vehicle } from "@/types/database.types";

export interface BookingWithVehicle extends Booking {
  vehicle: Pick<Vehicle, "id" | "name" | "brand" | "price_per_day" | "category"> | null;
}

export async function getUserBookings(): Promise<BookingWithVehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, vehicle:vehicles(id, name, brand, price_per_day, category)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as BookingWithVehicle[];
}

/**
 * Réservé à l'admin : la RLS "bookings_select_admin" fait qu'un compte
 * admin reçoit ici toutes les demandes (et pas seulement les siennes).
 * Pour un compte non-admin, cette requête ne renvoie que ses propres
 * réservations — la page appelante doit donc vérifier le rôle avant
 * d'utiliser ce résultat comme une vue globale.
 */
export async function getAllBookings(): Promise<BookingWithVehicle[]> {
  return getUserBookings();
}

/** Réservé à l'admin : nombre de demandes en attente, pour le badge de la nav. */
export async function getPendingBookingsCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("status", "en_attente");

  if (error) return 0;
  return count ?? 0;
}

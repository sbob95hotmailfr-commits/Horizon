import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Vehicle } from "@/types/database.types";

export interface BookingWithVehicle extends Booking {
  vehicle: Pick<Vehicle, "id" | "name" | "brand" | "price_per_day"> | null;
}

export async function getUserBookings(): Promise<BookingWithVehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, vehicle:vehicles(id, name, brand, price_per_day)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as BookingWithVehicle[];
}

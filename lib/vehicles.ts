import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle, VehicleCategory } from "@/types/database.types";

export interface VehicleFilters {
  category?: VehicleCategory;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}

export async function getVehicles(filters: VehicleFilters = {}): Promise<Vehicle[]> {
  const supabase = await createClient();
  let query = supabase.from("vehicles").select("*").eq("available", true);

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.maxPrice) {
    query = query.lte("price_per_day", filters.maxPrice);
  }

  const { data, error } = await query.order("price_per_day", { ascending: true });
  if (error) throw error;

  const vehicles = data ?? [];

  if (filters.startDate && filters.endDate) {
    const unavailableIds = await getVehicleIdsBookedBetween(
      filters.startDate,
      filters.endDate,
    );
    return vehicles.filter((v) => !unavailableIds.has(v.id));
  }

  return vehicles;
}

async function getVehicleIdsBookedBetween(
  startDate: string,
  endDate: string,
): Promise<Set<string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_unavailable_vehicle_ids", {
    p_start: startDate,
    p_end: endDate,
  });

  if (error) throw error;
  return new Set((data ?? []) as string[]);
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export interface BookedRange {
  startDate: string;
  endDate: string;
}

export async function getVehicleBookedRanges(vehicleId: string): Promise<BookedRange[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_vehicle_booked_ranges", {
    p_vehicle_id: vehicleId,
  });

  if (error) throw error;
  return (data ?? []).map((r) => ({ startDate: r.start_date, endDate: r.end_date }));
}

export async function getPopularVehicles(limit = 4): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("available", true)
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

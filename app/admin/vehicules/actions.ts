"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/lib/auth";
import type {
  VehicleCategory,
  Transmission,
  FuelType,
} from "@/types/database.types";

export interface VehicleFormState {
  error?: string;
}

function parseImages(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readVehicleFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim(),
    category: formData.get("category") as VehicleCategory,
    price_per_day: Number(formData.get("price_per_day")),
    transmission: formData.get("transmission") as Transmission,
    fuel_type: formData.get("fuel_type") as FuelType,
    seats: Number(formData.get("seats")),
    mileage_included_km: Number(formData.get("mileage_included_km")),
    description: String(formData.get("description") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    available: formData.get("available") === "on",
    images: parseImages(String(formData.get("images") ?? "")),
  };
}

export async function createVehicle(
  _prevState: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const fields = readVehicleFields(formData);
  const supabase = await createClient();
  const { data, error } = await supabase.from("vehicles").insert(fields).select("id").single();

  if (error || !data) {
    return { error: "Impossible de créer le véhicule. Vérifiez les champs." };
  }

  revalidatePath("/admin/vehicules");
  redirect("/admin/vehicules");
}

export async function updateVehicle(
  vehicleId: string,
  _prevState: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const fields = readVehicleFields(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").update(fields).eq("id", vehicleId);

  if (error) {
    return { error: "Impossible d'enregistrer les modifications." };
  }

  revalidatePath("/admin/vehicules");
  redirect("/admin/vehicules");
}

export async function deleteVehicle(vehicleId: string) {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);

  if (error) {
    return { success: false };
  }

  revalidatePath("/admin/vehicules");
  return { success: true };
}

export async function toggleVehicleAvailability(vehicleId: string, available: boolean) {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicles")
    .update({ available })
    .eq("id", vehicleId);

  if (error) {
    return { success: false };
  }

  revalidatePath("/admin/vehicules");
  return { success: true };
}

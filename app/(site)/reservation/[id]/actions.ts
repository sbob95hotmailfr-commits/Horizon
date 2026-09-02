"use server";

import { createClient } from "@/lib/supabase/server";
import { getVehicleBookedRanges } from "@/lib/vehicles";

export interface CreateBookingInput {
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  pickupTime: string;
  returnTime: string;
  returnLocation: string | null;
  fullName: string;
  phone: string;
  extras: string[];
}

export interface CreateBookingResult {
  success: boolean;
  error?: string;
}

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté pour réserver." };
  }

  if (!input.startDate || !input.endDate || !input.pickupLocation) {
    return { success: false, error: "Merci de renseigner les dates et le lieu de retrait." };
  }
  if (!input.fullName.trim() || !input.phone.trim()) {
    return { success: false, error: "Merci de renseigner vos coordonnées." };
  }

  const bookedRanges = await getVehicleBookedRanges(input.vehicleId);
  const overlaps = bookedRanges.some(
    (r) => input.startDate <= r.endDate && input.endDate >= r.startDate,
  );
  if (overlaps) {
    return {
      success: false,
      error: "Ce véhicule n'est plus disponible sur ces dates. Merci de choisir d'autres dates.",
    };
  }

  const { error } = await supabase.from("bookings").insert({
    user_id: user.id,
    vehicle_id: input.vehicleId,
    start_date: input.startDate,
    end_date: input.endDate,
    pickup_location: input.pickupLocation,
    pickup_time: input.pickupTime,
    return_time: input.returnTime,
    return_location: input.returnLocation,
    full_name: input.fullName.trim(),
    phone: input.phone.trim(),
    extras: input.extras,
    status: "en_attente",
  });

  if (error) {
    return { success: false, error: "Une erreur est survenue. Réessayez." };
  }

  return { success: true };
}

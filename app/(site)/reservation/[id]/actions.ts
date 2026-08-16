"use server";

import { createClient } from "@/lib/supabase/server";

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
    status: "en_attente",
  });

  if (error) {
    return { success: false, error: "Une erreur est survenue. Réessayez." };
  }

  return { success: true };
}

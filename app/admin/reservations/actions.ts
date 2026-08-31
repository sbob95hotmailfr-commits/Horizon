"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/lib/auth";

async function updateStatus(bookingId: string, status: "confirmee" | "refusee") {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);

  if (error) {
    return { success: false };
  }

  revalidatePath("/admin/reservations");
  return { success: true };
}

export async function confirmBooking(bookingId: string) {
  return updateStatus(bookingId, "confirmee");
}

export async function refuseBooking(bookingId: string) {
  return updateStatus(bookingId, "refusee");
}

export interface BookingEditFormState {
  error?: string;
}

export async function updateBookingDetails(
  bookingId: string,
  _prevState: BookingEditFormState,
  formData: FormData,
): Promise<BookingEditFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const startDate = String(formData.get("start_date") ?? "");
  const endDate = String(formData.get("end_date") ?? "");
  if (endDate < startDate) {
    return { error: "La date de retour doit être après la date de retrait." };
  }

  const returnLocation = String(formData.get("return_location") ?? "").trim();

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({
      full_name: String(formData.get("full_name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      pickup_location: String(formData.get("pickup_location") ?? "").trim(),
      return_location: returnLocation || null,
      start_date: startDate,
      end_date: endDate,
      pickup_time: String(formData.get("pickup_time") ?? ""),
      return_time: String(formData.get("return_time") ?? ""),
      extras: formData.getAll("extras").map(String),
    })
    .eq("id", bookingId);

  if (error) {
    return { error: "Impossible d'enregistrer les modifications." };
  }

  revalidatePath("/admin/reservations");
  redirect("/admin/reservations");
}

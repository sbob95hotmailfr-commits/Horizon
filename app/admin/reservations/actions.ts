"use server";

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

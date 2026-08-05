"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function cancelBooking(bookingId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status: "annulee" })
    .eq("id", bookingId);

  if (error) {
    return { success: false };
  }

  revalidatePath("/compte/reservations");
  return { success: true };
}

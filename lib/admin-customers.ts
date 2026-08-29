import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getAllBookings, type BookingWithVehicle } from "@/lib/bookings";
import type { ProfileRole } from "@/types/database.types";

export interface AdminCustomer {
  userId: string;
  fullName: string;
  phone: string;
  role: ProfileRole;
  bookings: BookingWithVehicle[];
}

/**
 * Regroupe les réservations par client. On ne s'appuie pas sur `auth.users`
 * (hors de portée sans clé service_role) : le nom/téléphone affichés sont
 * ceux renseignés sur la réservation la plus récente du client.
 */
export async function getCustomers(): Promise<AdminCustomer[]> {
  const [bookings, roles] = await Promise.all([getAllBookings(), getRolesByUserId()]);

  const byUser = new Map<string, AdminCustomer>();
  for (const booking of bookings) {
    const existing = byUser.get(booking.user_id);
    if (existing) {
      existing.bookings.push(booking);
      continue;
    }
    byUser.set(booking.user_id, {
      userId: booking.user_id,
      fullName: booking.full_name,
      phone: booking.phone,
      role: roles.get(booking.user_id) ?? "user",
      bookings: [booking],
    });
  }

  return [...byUser.values()].sort(
    (a, b) =>
      new Date(b.bookings[0].created_at).getTime() - new Date(a.bookings[0].created_at).getTime(),
  );
}

async function getRolesByUserId(): Promise<Map<string, ProfileRole>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("user_id, role");
  if (error) return new Map();
  return new Map(data.map((p) => [p.user_id, p.role]));
}

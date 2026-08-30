import "server-only";
import { getAllBookings } from "@/lib/bookings";
import { getAllVehiclesAdmin } from "@/lib/vehicles";
import { getCategories } from "@/lib/categories";
import type { BookingStatus } from "@/types/database.types";

export interface AdminStats {
  bookingsByStatus: Record<BookingStatus, number>;
  bookingsByCategory: { category: string; label: string; count: number }[];
  confirmedRevenue: number;
  vehiclesTotal: number;
  vehiclesAvailable: number;
}

function nightsBetween(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

export async function getAdminStats(): Promise<AdminStats> {
  const [bookings, vehicles, categories] = await Promise.all([
    getAllBookings(),
    getAllVehiclesAdmin(),
    getCategories(),
  ]);

  const bookingsByStatus: Record<BookingStatus, number> = {
    en_attente: 0,
    confirmee: 0,
    refusee: 0,
    annulee: 0,
  };
  const categoryCounts = new Map<string, number>();
  let confirmedRevenue = 0;

  for (const booking of bookings) {
    bookingsByStatus[booking.status]++;

    if (booking.vehicle) {
      categoryCounts.set(
        booking.vehicle.category,
        (categoryCounts.get(booking.vehicle.category) ?? 0) + 1,
      );
    }

    if (booking.status === "confirmee" && booking.vehicle) {
      confirmedRevenue +=
        booking.vehicle.price_per_day * nightsBetween(booking.start_date, booking.end_date);
    }
  }

  const bookingsByCategory = categories.map((c) => ({
    category: c.value,
    label: c.label,
    count: categoryCounts.get(c.value) ?? 0,
  })).filter((c) => c.count > 0);

  return {
    bookingsByStatus,
    bookingsByCategory,
    confirmedRevenue,
    vehiclesTotal: vehicles.length,
    vehiclesAvailable: vehicles.filter((v) => v.available).length,
  };
}

import { getAllBookings } from "@/lib/bookings";
import { AdminBookingsList } from "@/components/admin/AdminBookingsList";

export default async function AdminReservationsPage() {
  const bookings = await getAllBookings();
  const pendingCount = bookings.filter((b) => b.status === "en_attente").length;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Réservations</h1>
        <p className="text-sm text-black/65">
          {pendingCount} demande{pendingCount !== 1 ? "s" : ""} en attente ·{" "}
          {bookings.length} au total
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-black/65">Aucune réservation pour le moment.</p>
      ) : (
        <AdminBookingsList bookings={bookings} />
      )}
    </div>
  );
}

import { getAllBookings } from "@/lib/bookings";
import { AdminBookingRow } from "@/components/admin/AdminBookingRow";

export default async function AdminReservationsPage() {
  const bookings = await getAllBookings();
  const pending = bookings.filter((b) => b.status === "en_attente");
  const others = bookings.filter((b) => b.status !== "en_attente");

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Réservations</h1>
        <p className="text-sm text-black/65">
          {pending.length} demande{pending.length !== 1 ? "s" : ""} en attente ·{" "}
          {bookings.length} au total
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-black/65">Aucune réservation pour le moment.</p>
      ) : (
        <>
          {pending.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
                En attente
              </h2>
              <div className="space-y-3">
                {pending.map((booking) => (
                  <AdminBookingRow key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
                Historique
              </h2>
              <div className="space-y-3">
                {others.map((booking) => (
                  <AdminBookingRow key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

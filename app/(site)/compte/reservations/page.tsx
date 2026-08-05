import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BookingRow } from "@/components/account/BookingRow";
import { getUserBookings } from "@/lib/bookings";
import { createClient } from "@/lib/supabase/server";

export default async function MesReservationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?suivant=/compte/reservations");
  }

  const bookings = await getUserBookings();

  return (
    <div className="py-12">
      <Container className="max-w-3xl space-y-8">
        <h1 className="text-2xl font-semibold">Mes réservations</h1>

        {bookings.length === 0 ? (
          <div className="space-y-4 rounded-2xl border border-dashed border-black/15 py-16 text-center">
            <p className="text-black/60">Vous n&apos;avez aucune réservation pour le moment.</p>
            <ButtonLink href="/vehicules">Voir les véhicules</ButtonLink>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

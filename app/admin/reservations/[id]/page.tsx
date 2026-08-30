import { notFound } from "next/navigation";
import { BookingEditForm } from "@/components/admin/BookingEditForm";
import { updateBookingDetails } from "@/app/admin/reservations/actions";
import { getBookingById } from "@/lib/bookings";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditReservationPage({ params }: PageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Modifier la réservation de {booking.full_name}
      </h1>
      <BookingEditForm action={updateBookingDetails.bind(null, booking.id)} booking={booking} />
    </div>
  );
}

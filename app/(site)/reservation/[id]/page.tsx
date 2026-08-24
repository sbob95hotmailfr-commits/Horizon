import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getVehicleById } from "@/lib/vehicles";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservationPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <p className="text-sm text-black/65">Demande de réservation</p>
          <h1 className="text-2xl font-semibold">
            {vehicle.brand} {vehicle.name}
          </h1>
        </div>

        <BookingWizard vehicle={vehicle} isAuthenticated={Boolean(user)} />
      </Container>
    </div>
  );
}

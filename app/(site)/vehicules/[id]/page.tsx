import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/vehicles/Gallery";
import { Specs } from "@/components/vehicles/Specs";
import { PriceTransparency } from "@/components/vehicles/PriceTransparency";
import { Reviews } from "@/components/vehicles/Reviews";
import { AvailabilityCalendarLazy } from "@/components/vehicles/AvailabilityCalendarLazy";
import { getVehicleById, getVehicleBookedRanges } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";
import { getCategories } from "@/lib/categories";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return { title: "Véhicule introuvable" };
  }

  const title = `${vehicle.brand} ${vehicle.name} — location à ${vehicle.location}`;
  const description = `${vehicle.description} À partir de ${vehicle.price_per_day} €/jour, assurance et assistance incluses.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function VehiculeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const [images, bookedRanges, categories] = await Promise.all([
    resolveVehicleImages(vehicle),
    getVehicleBookedRanges(vehicle.id),
    getCategories(),
  ]);

  const categoryLabel = categories.find((c) => c.value === vehicle.category)?.label;

  return (
    <div className="py-12">
      <Container className="space-y-10">
        <div className="space-y-2">
          <Badge>{categoryLabel}</Badge>
          <h1 className="text-3xl font-semibold">
            {vehicle.brand} {vehicle.name}
          </h1>
          <p className="text-sm text-black/65">{vehicle.location}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <Gallery images={images} alt={`${vehicle.brand} ${vehicle.name}`} />
            <Specs vehicle={vehicle} />
            <p className="text-black/70">{vehicle.description}</p>
            <Reviews />
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <PriceTransparency vehicle={vehicle} />
            <ButtonLink href={`/reservation/${vehicle.id}`} className="w-full">
              Demander une réservation
            </ButtonLink>
            <AvailabilityCalendarLazy bookedRanges={bookedRanges} />
          </div>
        </div>
      </Container>
    </div>
  );
}

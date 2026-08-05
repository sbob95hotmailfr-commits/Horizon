import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { getVehicles } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";
import type { VehicleCategory } from "@/types/database.types";

interface PageProps {
  searchParams: Promise<{
    categorie?: string;
    prixMax?: string;
    debut?: string;
    fin?: string;
    lieu?: string;
  }>;
}

export default async function VehiculesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const vehicles = await getVehicles({
    category: params.categorie as VehicleCategory | undefined,
    maxPrice: params.prixMax ? Number(params.prixMax) : undefined,
    startDate: params.debut,
    endDate: params.fin,
  });

  const withImages = await Promise.all(
    vehicles.map(async (vehicle) => ({
      vehicle,
      imageUrl: (await resolveVehicleImages(vehicle))[0],
    })),
  );

  return (
    <div className="py-12">
      <Container className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Nos véhicules</h1>
          {params.lieu && (
            <p className="text-sm text-black/60">
              Retrait — {params.lieu}
              {params.debut && params.fin && ` · du ${params.debut} au ${params.fin}`}
            </p>
          )}
        </div>

        <Suspense>
          <VehicleFilters />
        </Suspense>

        {withImages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {withImages.map(({ vehicle, imageUrl }) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} imageUrl={imageUrl} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-black/15 py-24 text-center">
      <p className="text-lg font-medium">Aucun véhicule ne correspond à votre recherche</p>
      <p className="text-sm text-black/50">
        Essayez d&apos;élargir vos critères de catégorie, de prix ou de dates.
      </p>
    </div>
  );
}

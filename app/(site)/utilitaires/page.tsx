import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { getVehicles } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";
import { UTILITY_CATEGORIES } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{
    categorie?: string;
    prixMax?: string;
    debut?: string;
    fin?: string;
    lieu?: string;
    lieuRetour?: string;
    heureDebut?: string;
    heureFin?: string;
  }>;
}

export default async function UtilitairesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const vehicles = await getVehicles({
    categories: UTILITY_CATEGORIES.map((c) => c.value),
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
          <h1 className="text-3xl font-semibold">Nos utilitaires</h1>
          {params.lieu && (
            <p className="text-sm text-black/60">
              Retrait — {params.lieu}
              {params.heureDebut && ` à ${params.heureDebut}`}
              {params.debut && params.fin && ` · du ${params.debut} au ${params.fin}`}
              {params.heureFin && ` à ${params.heureFin}`}
              {params.lieuRetour && ` · Retour — ${params.lieuRetour}`}
            </p>
          )}
        </div>

        <Suspense>
          <VehicleFilters categories={UTILITY_CATEGORIES} basePath="/utilitaires" />
        </Suspense>

        {withImages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <h2 className="sr-only">Résultats</h2>
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
      <p className="text-lg font-medium">Aucun utilitaire ne correspond à votre recherche</p>
      <p className="text-sm text-black/65">
        Essayez d&apos;élargir vos critères de prix ou de dates.
      </p>
    </div>
  );
}

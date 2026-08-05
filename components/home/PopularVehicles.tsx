import { Container } from "@/components/ui/Container";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getPopularVehicles } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";

export async function PopularVehicles() {
  const vehicles = await getPopularVehicles(4);

  if (vehicles.length === 0) {
    return null;
  }

  const withImages = await Promise.all(
    vehicles.map(async (vehicle) => ({
      vehicle,
      imageUrl: (await resolveVehicleImages(vehicle))[0],
    })),
  );

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Véhicules populaires
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {withImages.map(({ vehicle, imageUrl }) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} imageUrl={imageUrl} />
          ))}
        </div>
      </Container>
    </section>
  );
}

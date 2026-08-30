import { Container } from "@/components/ui/Container";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { getPopularVehicles } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";
import { getCategories } from "@/lib/categories";

export async function PopularVehicles() {
  const [vehicles, categories] = await Promise.all([getPopularVehicles(4), getCategories()]);

  if (vehicles.length === 0) {
    return null;
  }

  const withImages = await Promise.all(
    vehicles.map(async (vehicle) => ({
      vehicle,
      imageUrl: (await resolveVehicleImages(vehicle))[0],
      categoryLabel: categories.find((c) => c.value === vehicle.category)?.label,
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
          {withImages.map(({ vehicle, imageUrl, categoryLabel }) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              imageUrl={imageUrl}
              categoryLabel={categoryLabel}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

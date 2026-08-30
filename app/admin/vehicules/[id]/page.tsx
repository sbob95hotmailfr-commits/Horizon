import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { updateVehicle } from "@/app/admin/vehicules/actions";
import { getVehicleById } from "@/lib/vehicles";
import { getCategories } from "@/lib/categories";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditVehiculePage({ params }: PageProps) {
  const { id } = await params;
  const [vehicle, categories] = await Promise.all([getVehicleById(id), getCategories()]);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Modifier {vehicle.brand} {vehicle.name}
      </h1>
      <VehicleForm
        action={updateVehicle.bind(null, vehicle.id)}
        vehicle={vehicle}
        categories={categories}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}

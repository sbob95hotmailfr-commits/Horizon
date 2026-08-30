import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicle } from "@/app/admin/vehicules/actions";
import { getCategories } from "@/lib/categories";

export default async function AdminNouveauVehiculePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Ajouter un véhicule</h1>
      <VehicleForm action={createVehicle} categories={categories} submitLabel="Créer le véhicule" />
    </div>
  );
}

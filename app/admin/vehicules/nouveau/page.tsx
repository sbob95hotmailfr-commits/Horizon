import { VehicleForm } from "@/components/admin/VehicleForm";
import { createVehicle } from "@/app/admin/vehicules/actions";

export default function AdminNouveauVehiculePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Ajouter un véhicule</h1>
      <VehicleForm action={createVehicle} submitLabel="Créer le véhicule" />
    </div>
  );
}

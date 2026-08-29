import Link from "next/link";
import { getAllVehiclesAdmin } from "@/lib/vehicles";
import { VehicleAdminRow } from "@/components/admin/VehicleAdminRow";

export default async function AdminVehiculesPage() {
  const vehicles = await getAllVehiclesAdmin();

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Véhicules</h1>
          <p className="text-sm text-black/65">{vehicles.length} véhicule(s) dans le catalogue</p>
        </div>
        <Link
          href="/admin/vehicules/nouveau"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90"
        >
          + Ajouter un véhicule
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <p className="text-black/65">Aucun véhicule pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <VehicleAdminRow key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}

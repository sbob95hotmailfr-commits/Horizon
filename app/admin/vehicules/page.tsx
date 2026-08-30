import Link from "next/link";
import { getAllVehiclesAdmin } from "@/lib/vehicles";
import { getCategories } from "@/lib/categories";
import { AdminVehiclesList } from "@/components/admin/AdminVehiclesList";

export default async function AdminVehiculesPage() {
  const [vehicles, categories] = await Promise.all([getAllVehiclesAdmin(), getCategories()]);
  const availableCount = vehicles.filter((v) => v.available).length;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Véhicules</h1>
          <p className="text-sm text-black/65">
            {availableCount} disponible{availableCount !== 1 ? "s" : ""} ·{" "}
            {vehicles.length - availableCount} indisponible
            {vehicles.length - availableCount !== 1 ? "s" : ""}
          </p>
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
        <AdminVehiclesList vehicles={vehicles} categories={categories} />
      )}
    </div>
  );
}

import Link from "next/link";
import { getAllVehiclesAdmin } from "@/lib/vehicles";
import { VehicleAdminRow } from "@/components/admin/VehicleAdminRow";

export default async function AdminVehiculesPage() {
  const vehicles = await getAllVehiclesAdmin();
  const available = vehicles.filter((v) => v.available);
  const unavailable = vehicles.filter((v) => !v.available);

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Véhicules</h1>
          <p className="text-sm text-black/65">
            {available.length} disponible{available.length !== 1 ? "s" : ""} ·{" "}
            {unavailable.length} indisponible{unavailable.length !== 1 ? "s" : ""}
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
        <>
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
              Disponibles
            </h2>
            {available.length === 0 ? (
              <p className="text-sm text-black/65">Aucun véhicule disponible.</p>
            ) : (
              <div className="space-y-3">
                {available.map((vehicle) => (
                  <VehicleAdminRow key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
              Indisponibles
            </h2>
            {unavailable.length === 0 ? (
              <p className="text-sm text-black/65">Aucun véhicule indisponible.</p>
            ) : (
              <div className="space-y-3">
                {unavailable.map((vehicle) => (
                  <VehicleAdminRow key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

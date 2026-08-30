"use client";

import { useMemo, useState } from "react";
import { VehicleAdminRow } from "@/components/admin/VehicleAdminRow";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import type { Vehicle } from "@/types/database.types";

export function AdminVehiclesList({ vehicles }: { vehicles: Vehicle[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return vehicles;
    return vehicles.filter((v) => {
      const categoryLabel = VEHICLE_CATEGORIES.find((c) => c.value === v.category)?.label ?? "";
      return `${v.brand} ${v.name} ${categoryLabel}`.toLowerCase().includes(query);
    });
  }, [vehicles, search]);

  const available = filtered.filter((v) => v.available);
  const unavailable = filtered.filter((v) => !v.available);

  return (
    <div className="space-y-6">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par marque, modèle ou catégorie…"
        className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm"
      />

      {filtered.length === 0 ? (
        <p className="text-black/65">Aucun véhicule ne correspond à cette recherche.</p>
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

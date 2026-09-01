"use client";

import { useMemo, useState } from "react";
import { VehicleAdminRow } from "@/components/admin/VehicleAdminRow";
import type { Vehicle, Category } from "@/types/database.types";

interface VehicleWithImage {
  vehicle: Vehicle;
  imageUrl?: string;
}

export function AdminVehiclesList({
  vehicles,
  categories,
}: {
  vehicles: VehicleWithImage[];
  categories: Category[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return vehicles;
    return vehicles.filter(({ vehicle: v }) => {
      const categoryLabel = categories.find((c) => c.value === v.category)?.label ?? "";
      return `${v.brand} ${v.name} ${categoryLabel}`.toLowerCase().includes(query);
    });
  }, [vehicles, categories, search]);

  const available = filtered.filter(({ vehicle }) => vehicle.available);
  const unavailable = filtered.filter(({ vehicle }) => !vehicle.available);

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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {available.map(({ vehicle, imageUrl }) => (
                  <VehicleAdminRow
                    key={vehicle.id}
                    vehicle={vehicle}
                    imageUrl={imageUrl}
                    categories={categories}
                  />
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unavailable.map(({ vehicle, imageUrl }) => (
                  <VehicleAdminRow
                    key={vehicle.id}
                    vehicle={vehicle}
                    imageUrl={imageUrl}
                    categories={categories}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteVehicle, toggleVehicleAvailability } from "@/app/admin/vehicules/actions";
import { formatPrice, cn } from "@/lib/utils";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import type { Vehicle } from "@/types/database.types";

export function VehicleAdminRow({ vehicle }: { vehicle: Vehicle }) {
  const [isPending, startTransition] = useTransition();
  const [available, setAvailable] = useState(vehicle.available);
  const [deleted, setDeleted] = useState(false);

  const categoryLabel = VEHICLE_CATEGORIES.find((c) => c.value === vehicle.category)?.label;

  if (deleted) return null;

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleVehicleAvailability(vehicle.id, !available);
      if (result.success) setAvailable((v) => !v);
    });
  }

  function handleDelete() {
    if (!confirm(`Supprimer ${vehicle.brand} ${vehicle.name} ? Cette action est définitive.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteVehicle(vehicle.id);
      if (result.success) setDeleted(true);
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">
          {vehicle.brand} {vehicle.name}
          <span className="ml-2 text-sm text-black/65">
            {categoryLabel} · {formatPrice(vehicle.price_per_day)}/jour
          </span>
        </p>
        <p className="text-sm text-black/65">{vehicle.location}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isPending}
          onClick={handleToggle}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50",
            available ? "bg-black text-ivory" : "border border-black/20 text-black/60",
          )}
        >
          {available ? "Disponible" : "Désactivé"}
        </button>
        <Link
          href={`/admin/vehicules/${vehicle.id}`}
          className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent"
        >
          Modifier
        </Link>
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent disabled:opacity-50"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

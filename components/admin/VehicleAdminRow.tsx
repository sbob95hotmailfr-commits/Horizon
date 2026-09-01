"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { deleteVehicle, toggleVehicleAvailability } from "@/app/admin/vehicules/actions";
import { Monogram } from "@/components/brand/Monogram";
import { formatPrice, cn } from "@/lib/utils";
import type { Vehicle, Category } from "@/types/database.types";

export function VehicleAdminRow({
  vehicle,
  imageUrl,
  categories,
}: {
  vehicle: Vehicle;
  imageUrl?: string;
  categories: Category[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [available, setAvailable] = useState(vehicle.available);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const categoryLabel = categories.find((c) => c.value === vehicle.category)?.label;

  if (deleted) return null;

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleVehicleAvailability(vehicle.id, !available);
      if (result.success) {
        setAvailable((v) => !v);
        router.refresh();
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Supprimer ${vehicle.brand} ${vehicle.name} ? Cette action est définitive.`)) {
      return;
    }
    setDeleteError(null);
    startTransition(async () => {
      const result = await deleteVehicle(vehicle.id);
      if (result.success) {
        setDeleted(true);
      } else {
        setDeleteError(result.error ?? "Suppression impossible.");
      }
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="relative aspect-[4/3] w-full bg-black/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Monogram className="h-10 w-10 text-black/20" />
          </div>
        )}
        <button
          type="button"
          disabled={isPending}
          onClick={handleToggle}
          className={cn(
            "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50",
            available ? "bg-black text-ivory" : "border border-black/20 bg-white text-black/60",
          )}
        >
          {available ? "Disponible" : "Indisponible"}
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="font-medium">
            {vehicle.brand} {vehicle.name}
          </p>
          <p className="text-sm text-black/65">
            {categoryLabel} · {formatPrice(vehicle.price_per_day)}/jour
          </p>
          <p className="text-sm text-black/65">{vehicle.location}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/vehicules/${vehicle.id}`}
            className="flex-1 rounded-full border border-black/15 px-3 py-1.5 text-center text-sm font-medium text-black/70 hover:border-accent hover:text-accent"
          >
            Modifier
          </Link>
          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="flex-1 rounded-full bg-black px-3 py-1.5 text-sm font-medium text-ivory hover:bg-black/85 disabled:opacity-50"
          >
            Supprimer
          </button>
        </div>
        {deleteError && <p className="text-sm font-medium text-black">{deleteError}</p>}
      </div>
    </div>
  );
}

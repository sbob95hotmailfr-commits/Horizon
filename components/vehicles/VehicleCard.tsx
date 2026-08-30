import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Monogram } from "@/components/brand/Monogram";
import { formatPrice } from "@/lib/utils";
import { FUEL_TYPES } from "@/lib/constants";
import type { Vehicle } from "@/types/database.types";

export function VehicleCard({
  vehicle,
  imageUrl,
  categoryLabel,
}: {
  vehicle: Vehicle;
  imageUrl?: string;
  categoryLabel?: string;
}) {
  const fuelLabel = FUEL_TYPES.find((f) => f.value === vehicle.fuel_type)?.label;

  return (
    <Link
      href={`/vehicules/${vehicle.id}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors hover:border-accent"
    >
      <div className="relative aspect-[4/3] w-full bg-black/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Monogram className="h-10 w-10 text-black/20" />
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-black px-3 py-1.5 text-sm font-semibold text-ivory">
          {formatPrice(vehicle.price_per_day)}
          <span className="text-ivory/60">/j</span>
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-black/65">
            {categoryLabel}
          </p>
          <h3 className="text-lg font-semibold">
            {vehicle.brand} {vehicle.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>{fuelLabel}</Badge>
          <Badge className="capitalize">{vehicle.transmission}</Badge>
          <Badge>{vehicle.seats} places</Badge>
        </div>
      </div>
    </Link>
  );
}

import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/types/database.types";

export function PriceTransparency({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="space-y-4 rounded-2xl border border-black/10 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-semibold">
          {formatPrice(vehicle.price_per_day)}
        </span>
        <span className="text-sm text-black/65">par jour</span>
      </div>

      <ul className="space-y-2 text-sm">
        <TransparencyItem included>
          Assurance responsabilité civile incluse
        </TransparencyItem>
        <TransparencyItem included>
          {vehicle.mileage_included_km} km inclus par jour
        </TransparencyItem>
        <TransparencyItem included>Assistance 24h/24 incluse</TransparencyItem>
        <TransparencyItem>Annulation gratuite jusqu&apos;à 48h avant le retrait</TransparencyItem>
        <TransparencyItem>Carburant à restituer au niveau du retrait</TransparencyItem>
      </ul>

      <p className="text-xs text-black/60">
        Sans frais cachés — le prix affiché est le prix payé.
      </p>
    </div>
  );
}

function TransparencyItem({
  included = false,
  children,
}: {
  included?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      <span className={included ? "text-accent" : "text-black/30"}>
        {included ? "✓" : "•"}
      </span>
      <span className="text-black/70">{children}</span>
    </li>
  );
}

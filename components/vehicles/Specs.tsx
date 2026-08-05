import { TRANSMISSIONS, FUEL_TYPES } from "@/lib/constants";
import type { Vehicle } from "@/types/database.types";

export function Specs({ vehicle }: { vehicle: Vehicle }) {
  const transmissionLabel = TRANSMISSIONS.find((t) => t.value === vehicle.transmission)?.label;
  const fuelLabel = FUEL_TYPES.find((f) => f.value === vehicle.fuel_type)?.label;

  const items = [
    { label: "Boîte", value: transmissionLabel },
    { label: "Carburant", value: fuelLabel },
    { label: "Places", value: `${vehicle.seats}` },
    { label: "Km inclus / jour", value: `${vehicle.mileage_included_km} km` },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-black/10 p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-black/40">
            {item.label}
          </dt>
          <dd className="mt-1 text-base font-semibold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

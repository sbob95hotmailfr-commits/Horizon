"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VEHICLE_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRICE_CAPS = [50, 80, 120] as const;

export function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("categorie") ?? "";
  const activeMaxPrice = searchParams.get("prixMax") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/vehicules?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterGroup label="Catégorie">
        <Chip active={activeCategory === ""} onClick={() => updateParam("categorie", "")}>
          Toutes
        </Chip>
        {VEHICLE_CATEGORIES.map((c) => (
          <Chip
            key={c.value}
            active={activeCategory === c.value}
            onClick={() => updateParam("categorie", c.value)}
          >
            {c.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label="Prix max / jour">
        <Chip active={activeMaxPrice === ""} onClick={() => updateParam("prixMax", "")}>
          Tous
        </Chip>
        {PRICE_CAPS.map((price) => (
          <Chip
            key={price}
            active={activeMaxPrice === String(price)}
            onClick={() => updateParam("prixMax", String(price))}
          >
            ≤ {price}€
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-black/40">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-black bg-black text-ivory"
          : "border-black/15 text-black/70 hover:border-black/40",
      )}
    >
      {children}
    </button>
  );
}

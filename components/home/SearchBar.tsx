"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PICKUP_LOCATIONS, VEHICLE_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState<string>(PICKUP_LOCATIONS[0]);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("lieu", location);
    if (category) params.set("categorie", category);
    if (startDate) params.set("debut", startDate);
    if (endDate) params.set("fin", endDate);
    router.push(`/vehicules?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-4xl grid-cols-1 gap-3 rounded-2xl border border-black/10 bg-ivory/95 p-4 backdrop-blur sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-2 lg:p-3"
    >
      <Field label="Lieu de retrait">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none"
        >
          {PICKUP_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Catégorie">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none"
        >
          <option value="">Toutes</option>
          {VEHICLE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Départ">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none"
        />
      </Field>

      <Field label="Retour">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none"
        />
      </Field>

      <Button type="submit" className="w-full lg:w-auto">
        Rechercher
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-xl px-3 py-2 lg:border-r lg:border-black/10 lg:last-of-type:border-r-0">
      <span className="text-[11px] font-medium uppercase tracking-wide text-black/45">
        {label}
      </span>
      {children}
    </label>
  );
}

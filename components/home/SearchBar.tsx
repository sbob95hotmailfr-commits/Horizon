"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PICKUP_LOCATIONS, CAR_CATEGORIES, TIME_SLOTS, DEFAULT_TIME } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState<string>(PICKUP_LOCATIONS[0]);
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(DEFAULT_TIME);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState(DEFAULT_TIME);
  const [differentReturn, setDifferentReturn] = useState(false);
  const [returnLocation, setReturnLocation] = useState<string>(PICKUP_LOCATIONS[1]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("lieu", location);
    if (differentReturn) params.set("lieuRetour", returnLocation);
    if (category) params.set("categorie", category);
    if (startDate) params.set("debut", startDate);
    if (endDate) params.set("fin", endDate);
    params.set("heureDebut", startTime);
    params.set("heureFin", endTime);
    router.push(`/vehicules?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl space-y-3 rounded-2xl border border-black/10 bg-ivory/95 p-4 backdrop-blur lg:p-3"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-2">
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
            {CAR_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Départ">
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm font-medium outline-none"
            />
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              aria-label="Heure de départ"
              className="shrink-0 bg-transparent text-sm text-black/60 outline-none"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field label="Retour">
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm font-medium outline-none"
            />
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              aria-label="Heure de retour"
              className="shrink-0 bg-transparent text-sm text-black/60 outline-none"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Button type="submit" className="w-full lg:w-auto">
          Rechercher
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-3">
        <label className="flex items-center gap-2 text-sm text-black/70">
          <input
            type="checkbox"
            checked={differentReturn}
            onChange={(e) => setDifferentReturn(e.target.checked)}
            className="accent-accent"
          />
          Restituer dans un lieu différent
        </label>

        {differentReturn && (
          <select
            value={returnLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
            aria-label="Lieu de retour"
            className="rounded-lg border border-black/15 bg-transparent px-2 py-1 text-sm font-medium outline-none"
          >
            {PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-xl px-3 py-2 lg:border-r lg:border-black/10 lg:last-of-type:border-r-0">
      <span className="text-[11px] font-medium uppercase tracking-wide text-black/60">
        {label}
      </span>
      {children}
    </label>
  );
}

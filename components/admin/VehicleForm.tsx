"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { TRANSMISSIONS, FUEL_TYPES, PICKUP_LOCATIONS } from "@/lib/constants";
import type { Vehicle, Category } from "@/types/database.types";
import type { VehicleFormState } from "@/app/admin/vehicules/actions";

type Action = (state: VehicleFormState, formData: FormData) => Promise<VehicleFormState>;

export function VehicleForm({
  action,
  vehicle,
  categories,
  submitLabel,
}: {
  action: Action;
  vehicle?: Vehicle;
  categories: Category[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<VehicleFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Marque">
          <input
            name="brand"
            required
            defaultValue={vehicle?.brand}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>
        <Field label="Modèle">
          <input
            name="name"
            required
            defaultValue={vehicle?.name}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>

        <Field label="Catégorie">
          <select
            name="category"
            required
            defaultValue={vehicle?.category}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prix / jour (€)">
          <input
            type="number"
            name="price_per_day"
            required
            min={1}
            step="0.01"
            defaultValue={vehicle?.price_per_day}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>

        <Field label="Boîte">
          <select
            name="transmission"
            required
            defaultValue={vehicle?.transmission}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {TRANSMISSIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Carburant">
          <select
            name="fuel_type"
            required
            defaultValue={vehicle?.fuel_type}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {FUEL_TYPES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Places">
          <input
            type="number"
            name="seats"
            required
            min={1}
            max={9}
            defaultValue={vehicle?.seats ?? 5}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>
        <Field label="Km inclus / jour">
          <input
            type="number"
            name="mileage_included_km"
            required
            min={0}
            defaultValue={vehicle?.mileage_included_km ?? 200}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>

        <Field label="Lieu de retrait" className="sm:col-span-2">
          <select
            name="location"
            required
            defaultValue={vehicle?.location}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Description" className="sm:col-span-2">
          <textarea
            name="description"
            rows={3}
            defaultValue={vehicle?.description}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>

        <Field
          label="Photos (une URL par ligne, facultatif — sinon photos automatiques par catégorie)"
          className="sm:col-span-2"
        >
          <textarea
            name="images"
            rows={3}
            defaultValue={vehicle?.images.join("\n")}
            placeholder="https://..."
            className="w-full rounded-lg border border-black/15 px-3 py-2 font-mono text-sm"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="available"
          defaultChecked={vehicle?.available ?? true}
          className="accent-accent"
        />
        Disponible à la location
      </label>

      {state.error && <p className="text-sm font-medium text-black">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1 text-sm ${className ?? ""}`}>
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

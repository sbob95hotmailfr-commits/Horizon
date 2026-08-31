"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { PICKUP_LOCATIONS, TIME_SLOTS, BOOKING_EXTRAS } from "@/lib/constants";
import type { BookingWithVehicle } from "@/lib/bookings";
import type { BookingEditFormState } from "@/app/admin/reservations/actions";

type Action = (
  state: BookingEditFormState,
  formData: FormData,
) => Promise<BookingEditFormState>;

export function BookingEditForm({
  action,
  booking,
}: {
  action: Action;
  booking: BookingWithVehicle;
}) {
  const [state, formAction, pending] = useActionState<BookingEditFormState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom complet">
          <input
            name="full_name"
            required
            defaultValue={booking.full_name}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>
        <Field label="Téléphone">
          <input
            name="phone"
            required
            defaultValue={booking.phone}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>

        <Field label="Date de retrait">
          <input
            type="date"
            name="start_date"
            required
            defaultValue={booking.start_date}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>
        <Field label="Heure de retrait">
          <select
            name="pickup_time"
            required
            defaultValue={booking.pickup_time}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date de retour">
          <input
            type="date"
            name="end_date"
            required
            defaultValue={booking.end_date}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </Field>
        <Field label="Heure de retour">
          <select
            name="return_time"
            required
            defaultValue={booking.return_time}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Lieu de retrait" className="sm:col-span-2">
          <select
            name="pickup_location"
            required
            defaultValue={booking.pickup_location}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            {PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Lieu de retour (si différent)"
          className="sm:col-span-2"
        >
          <select
            name="return_location"
            defaultValue={booking.return_location ?? ""}
            className="w-full rounded-lg border border-black/15 px-3 py-2"
          >
            <option value="">— Même lieu que le retrait —</option>
            {PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Options</legend>
        {BOOKING_EXTRAS.map((extra) => (
          <label key={extra.key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="extras"
              value={extra.key}
              defaultChecked={(booking.extras ?? []).includes(extra.key)}
              className="accent-accent"
            />
            {extra.label} (+{extra.price}€{extra.unit === "jour" ? "/jour" : " forfait"})
          </label>
        ))}
      </fieldset>

      {state.error && <p className="text-sm font-medium text-black">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer les modifications"}
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

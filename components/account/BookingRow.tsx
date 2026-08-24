"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { cancelBooking } from "@/app/(site)/compte/reservations/actions";
import { formatDate, formatPrice, cn } from "@/lib/utils";
import type { BookingWithVehicle } from "@/lib/bookings";

const STATUS_LABELS: Record<BookingWithVehicle["status"], string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
  annulee: "Annulée",
};

const STATUS_CLASSES: Record<BookingWithVehicle["status"], string> = {
  en_attente: "bg-black/10 text-black/70",
  confirmee: "bg-black text-ivory",
  refusee: "border border-black/20 text-black/60",
  annulee: "bg-black/5 text-black/60",
};

export function BookingRow({ booking }: { booking: BookingWithVehicle }) {
  const [isPending, startTransition] = useTransition();
  const [cancelled, setCancelled] = useState(false);

  const status = cancelled ? "annulee" : booking.status;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          href={`/vehicules/${booking.vehicle_id}`}
          className="font-medium hover:text-accent"
        >
          {booking.vehicle ? `${booking.vehicle.brand} ${booking.vehicle.name}` : "Véhicule"}
        </Link>
        <p className="text-sm text-black/65">
          {formatDate(booking.start_date)} {booking.pickup_time} → {formatDate(booking.end_date)}{" "}
          {booking.return_time} · {booking.pickup_location}
          {booking.return_location && ` (retour : ${booking.return_location})`}
        </p>
        {booking.vehicle && (
          <p className="text-sm text-black/65">
            {formatPrice(booking.vehicle.price_per_day)}/jour
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            STATUS_CLASSES[status],
          )}
        >
          {STATUS_LABELS[status]}
        </span>
        {status === "en_attente" && (
          <button
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const result = await cancelBooking(booking.id);
                if (result.success) setCancelled(true);
              })
            }
            className="text-sm text-black/60 underline decoration-black/20 hover:text-accent"
          >
            Annuler
          </button>
        )}
      </div>
    </div>
  );
}

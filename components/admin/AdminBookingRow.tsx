"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { confirmBooking, refuseBooking } from "@/app/admin/reservations/actions";
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

export function AdminBookingRow({ booking }: { booking: BookingWithVehicle }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(booking.status);

  function handle(action: (id: string) => Promise<{ success: boolean }>) {
    startTransition(async () => {
      const result = await action(booking.id);
      if (result.success) {
        setStatus(action === confirmBooking ? "confirmee" : "refusee");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="font-medium">
          {booking.vehicle ? `${booking.vehicle.brand} ${booking.vehicle.name}` : "Véhicule"}
          <span className="ml-2 text-sm text-black/65">
            {booking.vehicle && formatPrice(booking.vehicle.price_per_day)}/jour
          </span>
        </p>
        <p className="text-sm text-black/65">
          {formatDate(booking.start_date)} {booking.pickup_time} → {formatDate(booking.end_date)}{" "}
          {booking.return_time} · {booking.pickup_location}
          {booking.return_location && ` (retour : ${booking.return_location})`}
        </p>
        <p className="text-sm text-black/65">
          {booking.full_name} · {booking.phone}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-medium", STATUS_CLASSES[status])}>
          {STATUS_LABELS[status]}
        </span>
        <Link
          href={`/admin/reservations/${booking.id}`}
          className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent"
        >
          Modifier
        </Link>
        {status === "en_attente" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handle(confirmBooking)}
              className="rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-black hover:bg-accent/90 disabled:opacity-50"
            >
              Confirmer
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => handle(refuseBooking)}
              className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent disabled:opacity-50"
            >
              Refuser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

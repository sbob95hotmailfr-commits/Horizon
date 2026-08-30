"use client";

import { useMemo, useState } from "react";
import { AdminBookingRow } from "@/components/admin/AdminBookingRow";
import { formatDate } from "@/lib/utils";
import { toCsv, downloadCsv } from "@/lib/csv";
import type { BookingWithVehicle } from "@/lib/bookings";

const STATUS_LABELS: Record<BookingWithVehicle["status"], string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
  annulee: "Annulée",
};

function exportBookingsCsv(bookings: BookingWithVehicle[]) {
  const headers = [
    "Client",
    "Téléphone",
    "Véhicule",
    "Retrait",
    "Retour",
    "Lieu de retrait",
    "Lieu de retour",
    "Statut",
  ];
  const rows = bookings.map((b) => [
    b.full_name,
    b.phone,
    b.vehicle ? `${b.vehicle.brand} ${b.vehicle.name}` : "",
    `${formatDate(b.start_date)} ${b.pickup_time}`,
    `${formatDate(b.end_date)} ${b.return_time}`,
    b.pickup_location,
    b.return_location ?? "",
    STATUS_LABELS[b.status],
  ]);
  downloadCsv("reservations-horizon.csv", toCsv(headers, rows));
}

export function AdminBookingsList({ bookings }: { bookings: BookingWithVehicle[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return bookings;
    return bookings.filter((b) => {
      const vehicleLabel = b.vehicle ? `${b.vehicle.brand} ${b.vehicle.name}` : "";
      return `${b.full_name} ${b.phone} ${vehicleLabel}`.toLowerCase().includes(query);
    });
  }, [bookings, search]);

  const pending = filtered.filter((b) => b.status === "en_attente");
  const others = filtered.filter((b) => b.status !== "en_attente");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client ou véhicule…"
          className="min-w-0 flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => exportBookingsCsv(filtered)}
          className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black/70 hover:border-accent hover:text-accent"
        >
          Exporter CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-black/65">Aucune réservation ne correspond à cette recherche.</p>
      ) : (
        <>
          {pending.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
                En attente
              </h2>
              <div className="space-y-3">
                {pending.map((booking) => (
                  <AdminBookingRow key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
                Historique
              </h2>
              <div className="space-y-3">
                {others.map((booking) => (
                  <AdminBookingRow key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

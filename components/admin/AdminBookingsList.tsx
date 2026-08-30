"use client";

import { useMemo, useState } from "react";
import { AdminBookingRow } from "@/components/admin/AdminBookingRow";
import type { BookingWithVehicle } from "@/lib/bookings";

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
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par client ou véhicule…"
        className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm"
      />

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

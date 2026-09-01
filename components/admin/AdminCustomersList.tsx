"use client";

import { useMemo, useState } from "react";
import { formatDate, formatPrice, cn, initials, avatarShade } from "@/lib/utils";
import type { AdminCustomer } from "@/lib/admin-customers";

const STATUS_LABELS: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  refusee: "Refusée",
  annulee: "Annulée",
};

const STATUS_CLASSES: Record<string, string> = {
  en_attente: "bg-black/10 text-black/70",
  confirmee: "bg-black text-ivory",
  refusee: "border border-black/20 text-black/60",
  annulee: "bg-black/5 text-black/60",
};

export function AdminCustomersList({ customers }: { customers: AdminCustomer[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((c) =>
      `${c.fullName} ${c.phone}`.toLowerCase().includes(query),
    );
  }, [customers, search]);

  return (
    <div className="space-y-6">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par nom ou téléphone…"
        className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm"
      />

      {filtered.length === 0 ? (
        <p className="text-black/65">Aucun client ne correspond à cette recherche.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((customer) => {
            const shade =
              customer.role === "admin"
                ? { bg: "bg-accent", text: "text-black" }
                : avatarShade(customer.userId);

            return (
            <div key={customer.userId} className="rounded-xl border border-black/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      shade.bg,
                      shade.text,
                    )}
                  >
                    {initials(customer.fullName)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {customer.fullName}
                      {customer.role === "admin" && (
                        <span className="ml-2 rounded-full border border-black/20 px-2 py-0.5 text-xs font-medium text-black/65">
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-black/65">{customer.phone}</p>
                  </div>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
                  {customer.bookings.length} réservation{customer.bookings.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="mt-3 space-y-2 border-t border-black/10 pt-3">
                {customer.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-wrap items-center justify-between gap-2 text-sm"
                  >
                    <span>
                      {booking.vehicle ? `${booking.vehicle.brand} ${booking.vehicle.name}` : "Véhicule"}{" "}
                      <span className="text-black/65">
                        · {formatDate(booking.start_date)} → {formatDate(booking.end_date)}
                        {booking.vehicle && ` · ${formatPrice(booking.vehicle.price_per_day)}/jour`}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        STATUS_CLASSES[booking.status],
                      )}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

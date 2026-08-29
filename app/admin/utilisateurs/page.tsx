import { getCustomers } from "@/lib/admin-customers";
import { formatDate, formatPrice, cn } from "@/lib/utils";

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

export default async function AdminUtilisateursPage() {
  const customers = await getCustomers();

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Utilisateurs</h1>
        <p className="text-sm text-black/65">
          {customers.length} client{customers.length !== 1 ? "s" : ""} ayant effectué au moins
          une demande de réservation
        </p>
      </div>

      {customers.length === 0 ? (
        <p className="text-black/65">Aucun client pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.userId} className="rounded-xl border border-black/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {customer.fullName}
                    {customer.role === "admin" && (
                      <span className="ml-2 rounded-full bg-black px-2 py-0.5 text-xs font-medium text-ivory">
                        Admin
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-black/65">{customer.phone}</p>
                </div>
                <p className="text-sm text-black/65">
                  {customer.bookings.length} réservation{customer.bookings.length !== 1 ? "s" : ""}
                </p>
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
          ))}
        </div>
      )}
    </div>
  );
}

import { getAdminStats } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";

const STATUS_LABELS = {
  en_attente: "En attente",
  confirmee: "Confirmées",
  refusee: "Refusées",
  annulee: "Annulées",
} as const;

export default async function AdminStatistiquesPage() {
  const stats = await getAdminStats();
  const totalBookings = Object.values(stats.bookingsByStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-4xl space-y-10">
      <h1 className="text-2xl font-semibold">Statistiques</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Réservations" value={String(totalBookings)} />
        <StatCard
          label="Véhicules actifs"
          value={`${stats.vehiclesAvailable}/${stats.vehiclesTotal}`}
        />
        <StatCard label="Revenu confirmé" value={formatPrice(stats.confirmedRevenue)} />
        <StatCard
          label="En attente"
          value={String(stats.bookingsByStatus.en_attente)}
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
          Réservations par statut
        </h2>
        <div className="space-y-2">
          {(Object.keys(STATUS_LABELS) as (keyof typeof STATUS_LABELS)[]).map((status) => (
            <BarRow
              key={status}
              label={STATUS_LABELS[status]}
              count={stats.bookingsByStatus[status]}
              total={totalBookings}
            />
          ))}
        </div>
      </section>

      {stats.bookingsByCategory.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
            Réservations par catégorie
          </h2>
          <div className="space-y-2">
            {stats.bookingsByCategory.map((c) => (
              <BarRow
                key={c.category}
                label={c.label}
                count={c.count}
                total={totalBookings}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-black/60">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function BarRow({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-32 shrink-0 text-black/70">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 shrink-0 text-right font-medium">{count}</span>
    </div>
  );
}

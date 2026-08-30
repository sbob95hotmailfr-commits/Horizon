import { getAdminStats } from "@/lib/admin-stats";
import { formatPrice } from "@/lib/utils";
import { DonutChart } from "@/components/admin/DonutChart";

const STATUS_LABELS = {
  en_attente: "En attente",
  confirmee: "Confirmées",
  refusee: "Refusées",
  annulee: "Annulées",
} as const;

export default async function AdminStatistiquesPage() {
  const stats = await getAdminStats();
  const totalBookings = Object.values(stats.bookingsByStatus).reduce((a, b) => a + b, 0);

  const statusData = (Object.keys(STATUS_LABELS) as (keyof typeof STATUS_LABELS)[])
    .map((status) => ({
      label: STATUS_LABELS[status],
      count: stats.bookingsByStatus[status],
    }))
    .filter((d) => d.count > 0);

  const categoryData = stats.bookingsByCategory.map((c) => ({
    label: c.label,
    count: c.count,
  }));

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
        <StatCard label="En attente" value={String(stats.bookingsByStatus.en_attente)} />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
          Réservations par statut
        </h2>
        {statusData.length === 0 ? (
          <p className="text-sm text-black/65">Aucune réservation pour le moment.</p>
        ) : (
          <DonutChart data={statusData} />
        )}
      </section>

      {categoryData.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black/60">
            Réservations par catégorie
          </h2>
          <DonutChart data={categoryData} />
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

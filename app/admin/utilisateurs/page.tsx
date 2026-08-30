import { getCustomers } from "@/lib/admin-customers";
import { AdminCustomersList } from "@/components/admin/AdminCustomersList";

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
        <AdminCustomersList customers={customers} />
      )}
    </div>
  );
}

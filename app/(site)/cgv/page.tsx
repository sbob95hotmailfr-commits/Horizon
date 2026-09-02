import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CgvPage() {
  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Conditions générales de vente</h1>
          <p className="mt-2 text-sm text-black/65">
            Site de démonstration — ces conditions illustrent le fonctionnement du service et
            n&apos;ont pas de valeur contractuelle réelle.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1. Réservation</h2>
          <p className="text-black/70">
            Toute demande de réservation effectuée sur Horizon est soumise à confirmation par
            notre équipe. Elle n&apos;est définitive qu&apos;une fois le statut passé à «&nbsp;Confirmée&nbsp;»
            dans votre espace « Mes réservations ».
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">2. Conducteur et documents</h2>
          <p className="text-black/70">
            Le conducteur doit être âgé d&apos;au moins 18 ans et titulaire d&apos;un permis de conduire
            valable depuis au moins 2 ans. Une pièce d&apos;identité, le permis de conduire et une
            carte bancaire au nom du conducteur principal sont exigés au retrait du véhicule.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">3. Caution et assurance</h2>
          <p className="text-black/70">
            Une caution est bloquée sur la carte bancaire du conducteur au retrait, dont le
            montant dépend de la catégorie du véhicule. L&apos;assurance responsabilité civile et
            l&apos;assistance 24h/24 sont incluses dans le prix affiché.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4. Annulation</h2>
          <p className="text-black/70">
            Une réservation en attente peut être annulée gratuitement depuis « Mes réservations »
            jusqu&apos;à 48h avant la date de retrait.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">5. Restitution</h2>
          <p className="text-black/70">
            Le véhicule doit être restitué à la date, à l&apos;heure et au lieu convenus, avec le
            même niveau de carburant qu&apos;au départ. Un lieu de retour différent peut être
            demandé lors de la réservation.
          </p>
        </section>
      </Container>
    </div>
  );
}

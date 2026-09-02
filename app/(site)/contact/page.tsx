import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur une réservation ou un véhicule Horizon ? Contactez-nous.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="mt-2 text-black/70">
            Une question sur une réservation ou un véhicule ? Le plus rapide reste le{" "}
            <span className="font-medium">conseiller Horizon</span>, en bas à droite de l&apos;écran
            — il répond instantanément et peut vous orienter vers le bon véhicule.
          </p>
        </div>

        <section className="space-y-3 rounded-2xl border border-black/10 p-6">
          <h2 className="text-lg font-semibold">Autres coordonnées</h2>
          <p className="text-black/70">
            <span className="block font-medium text-black">Email</span>
            contact@horizon-location.fr
          </p>
          <p className="text-black/70">
            <span className="block font-medium text-black">Zone desservie</span>
            Paris et Île-de-France
          </p>
          <p className="text-xs text-black/65">
            Site de démonstration — cette adresse n&apos;est pas surveillée, utilisez le conseiller
            Horizon pour une réponse immédiate.
          </p>
        </section>
      </Container>
    </div>
  );
}

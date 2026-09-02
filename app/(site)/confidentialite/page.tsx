import { Container } from "@/components/ui/Container";

export default function ConfidentialitePage() {
  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Politique de confidentialité</h1>
          <p className="mt-2 text-sm text-black/65">
            Site de démonstration — voici les données réellement traitées par cette application.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Données collectées</h2>
          <p className="text-black/70">
            Lors de la création d&apos;un compte : votre adresse email et votre mot de passe (géré
            de façon sécurisée par notre prestataire d&apos;authentification). Lors d&apos;une
            réservation : nom, téléphone, dates et lieux de retrait/retour. Dans « Préférences de
            marques » : les marques que vous indiquez comme préférées ou à éviter.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Utilisation</h2>
          <p className="text-black/70">
            Ces données servent uniquement à traiter vos demandes de réservation et à faire
            fonctionner votre espace client. Elles ne sont ni vendues ni transmises à des tiers à
            des fins commerciales.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Conseiller Horizon (chatbot)</h2>
          <p className="text-black/70">
            Les messages envoyés au conseiller Horizon sont transmis à un service d&apos;intelligence
            artificielle tiers (Anthropic) pour générer une réponse. Évitez d&apos;y partager des
            informations sensibles.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Vos droits</h2>
          <p className="text-black/70">
            Vous pouvez supprimer vos réservations en attente et modifier vos préférences
            directement depuis votre espace « Mon compte ». Pour toute autre demande, consultez
            notre page{" "}
            <a href="/contact" className="font-medium text-accent hover:underline">
              Contact
            </a>
            .
          </p>
        </section>
      </Container>
    </div>
  );
}

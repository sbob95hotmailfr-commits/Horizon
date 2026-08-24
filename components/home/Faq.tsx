import { Container } from "@/components/ui/Container";

const QUESTIONS = [
  {
    question: "Quel est l'âge minimum pour louer un véhicule ?",
    answer:
      "18 ans révolus et un permis de conduire valable depuis au moins 2 ans, quelle que soit la catégorie — citadine comme utilitaire.",
  },
  {
    question: "Quels documents dois-je présenter au retrait ?",
    answer:
      "Une pièce d'identité en cours de validité, votre permis de conduire et la carte bancaire au nom du conducteur principal, utilisée pour le dépôt de garantie sur place.",
  },
  {
    question: "Une caution est-elle demandée ?",
    answer:
      "Oui, bloquée sur votre carte bancaire au retrait — de l'ordre de 300 € pour une citadine à 1 000 € pour le Renault Trafic. Le montant exact est indiqué avant la confirmation de votre demande.",
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer:
      "Oui, gratuitement depuis « Mes réservations » tant que la demande est en attente, jusqu'à 48h avant le retrait — comme précisé dans la transparence prix de chaque fiche véhicule.",
  },
  {
    question: "Puis-je restituer le véhicule dans un lieu différent ?",
    answer:
      "Oui, cochez « Restituer dans un lieu différent » lors de votre demande et choisissez parmi nos points de retrait en Île-de-France (Paris, CDG, Orly, Boulogne-Billancourt...).",
  },
  {
    question: "Le kilométrage est-il limité ?",
    answer:
      "Chaque véhicule inclut un kilométrage journalier — de 200 km pour une citadine à 300 km pour la Tesla Model 3 — indiqué sur sa fiche, dans l'encadré « Transparence prix ».",
  },
  {
    question: "Proposez-vous des utilitaires ?",
    answer:
      "Oui, le Renault Trafic (3 places, 200 km/jour inclus) est disponible pour vos déménagements et transports de matériel depuis Paris-Orly — retrouvez-le dans la rubrique « Utilitaires ».",
  },
  {
    question: "Le véhicule est-il fourni avec le plein ?",
    answer:
      "Oui, chaque véhicule vous est remis plein. Nous vous demandons simplement de le restituer au même niveau de carburant lors du retour.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-black/10 py-20">
      <Container className="max-w-3xl space-y-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Questions fréquentes</h2>

        <div className="divide-y divide-black/10 border-t border-black/10">
          {QUESTIONS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium hover:text-accent">
                {item.question}
                <span className="shrink-0 text-black/60 transition-transform group-open:rotate-45 group-hover:text-accent">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-black/60">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

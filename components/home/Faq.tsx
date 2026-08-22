import { Container } from "@/components/ui/Container";

const QUESTIONS = [
  {
    question: "Quel est l'âge minimum pour louer un véhicule ?",
    answer:
      "Vous devez avoir 18 ans révolus et être en possession d'un permis de conduire valable depuis au moins 2 ans.",
  },
  {
    question: "Quels documents dois-je présenter au retrait ?",
    answer:
      "Une pièce d'identité en cours de validité, un permis de conduire valide et la carte bancaire au nom du conducteur principal pour le dépôt de garantie.",
  },
  {
    question: "Une caution est-elle demandée ?",
    answer:
      "Oui, une caution est bloquée sur votre carte bancaire au moment du retrait. Son montant dépend de la catégorie du véhicule loué et vous est communiqué avant confirmation.",
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer:
      "Vous pouvez annuler gratuitement depuis votre espace « Mes réservations » tant que la demande est en attente, jusqu'à 48h avant le retrait.",
  },
  {
    question: "Puis-je restituer le véhicule dans un lieu différent ?",
    answer:
      "Oui, indiquez un lieu de retour différent lors de votre demande de réservation si vous ne repartez pas du même point.",
  },
  {
    question: "Le kilométrage est-il limité ?",
    answer:
      "Chaque véhicule inclut un kilométrage journalier indiqué sur sa fiche, dans l'encadré « Transparence prix ».",
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
                <span className="shrink-0 text-black/40 transition-transform group-open:rotate-45 group-hover:text-accent">
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

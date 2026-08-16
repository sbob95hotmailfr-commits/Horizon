import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    title: "Choisissez votre véhicule",
    description: "Parcourez le catalogue et filtrez par catégorie, prix ou dates.",
  },
  {
    title: "Réservez vos dates",
    description: "Renseignez vos dates, votre lieu de retrait et vos coordonnées.",
  },
  {
    title: "Récupérez les clés",
    description: "Une fois la demande confirmée, retirez le véhicule à l'heure choisie.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <Container className="space-y-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Comment ça marche</h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="space-y-3">
              <span className="text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-black/60">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

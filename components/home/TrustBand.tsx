import { Container } from "@/components/ui/Container";

const ITEMS = [
  {
    title: "Sans frais cachés",
    description: "Le prix affiché est le prix payé, assurance incluse.",
  },
  {
    title: "Assistance 24h/24",
    description: "Une équipe joignable à tout moment de votre location.",
  },
  {
    title: "Annulation flexible",
    description: "Gratuite jusqu'à 48h avant le retrait du véhicule.",
  },
];

export function TrustBand() {
  return (
    <section className="border-b border-black/10 py-14">
      <h2 className="sr-only">Pourquoi choisir Horizon</h2>
      <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {ITEMS.map((item) => (
          <div key={item.title} className="space-y-1.5">
            <p className="text-accent">✓</p>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-black/60">{item.description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

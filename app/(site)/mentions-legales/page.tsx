import { Container } from "@/components/ui/Container";

export default function MentionsLegalesPage() {
  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Mentions légales</h1>
          <p className="mt-2 text-sm text-black/65">
            Horizon est un projet de démonstration (portfolio) — les informations ci-dessous sont
            fournies à titre indicatif et ne correspondent pas à une société immatriculée.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Éditeur du site</h2>
          <p className="text-black/70">
            Horizon — projet personnel de démonstration.
            <br />
            Paris, Île-de-France.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Hébergement</h2>
          <p className="text-black/70">
            Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Propriété intellectuelle</h2>
          <p className="text-black/70">
            L&apos;ensemble des contenus de ce site (textes, mise en page, identité visuelle) est
            réalisé dans le cadre d&apos;un projet de démonstration et ne peut être réutilisé sans
            autorisation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Données personnelles</h2>
          <p className="text-black/70">
            Voir notre{" "}
            <a href="/confidentialite" className="font-medium text-accent hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </section>
      </Container>
    </div>
  );
}

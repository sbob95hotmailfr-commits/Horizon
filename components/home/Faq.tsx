import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQ_GROUPS } from "@/lib/faq";

export function Faq() {
  return (
    <section className="border-t border-black/10 py-20">
      <Container className="max-w-3xl space-y-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Questions fréquentes</h2>
          <Link href="/faq" className="text-sm font-medium text-accent hover:underline">
            Voir toutes les questions →
          </Link>
        </div>

        <FaqAccordion groups={[FAQ_GROUPS[0]]} />
      </Container>
    </section>
  );
}

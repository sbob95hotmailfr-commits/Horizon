import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQ_GROUPS } from "@/lib/faq";

export default function FaqPage() {
  return (
    <div className="py-12">
      <Container className="max-w-3xl space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Questions fréquentes</h1>
          <p className="text-black/65">
            Tout ce qu&apos;il faut savoir avant, pendant et après votre location.
          </p>
        </div>

        <FaqAccordion groups={FAQ_GROUPS} />
      </Container>
    </div>
  );
}

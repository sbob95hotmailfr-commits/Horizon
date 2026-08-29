import { ReviewForm } from "@/components/admin/ReviewForm";
import { createReview } from "@/app/admin/avis/actions";

export default function AdminNouvelAvisPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Ajouter un avis</h1>
      <ReviewForm action={createReview} submitLabel="Publier l'avis" />
    </div>
  );
}

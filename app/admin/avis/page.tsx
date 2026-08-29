import Link from "next/link";
import { getAllReviewsAdmin } from "@/lib/reviews";
import { ReviewAdminRow } from "@/components/admin/ReviewAdminRow";

export default async function AdminAvisPage() {
  const reviews = await getAllReviewsAdmin();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Avis clients</h1>
          <p className="text-sm text-black/65">{reviews.length} avis publié(s)</p>
        </div>
        <Link
          href="/admin/avis/nouveau"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90"
        >
          + Ajouter un avis
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className="text-black/65">Aucun avis pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <ReviewAdminRow key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

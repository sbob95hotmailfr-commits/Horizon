import { notFound } from "next/navigation";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { updateReview } from "@/app/admin/avis/actions";
import { getReviewById } from "@/lib/reviews";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditAvisPage({ params }: PageProps) {
  const { id } = await params;
  const review = await getReviewById(id);

  if (!review) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Modifier l&apos;avis de {review.author}</h1>
      <ReviewForm
        action={updateReview.bind(null, review.id)}
        review={review}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}

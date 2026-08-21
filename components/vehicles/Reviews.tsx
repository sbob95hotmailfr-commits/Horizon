import { getVehicleReviews, getAverageRating } from "@/lib/reviews";
import { formatDate } from "@/lib/utils";

export function Reviews() {
  const reviews = getVehicleReviews();
  const average = getAverageRating(reviews);

  return (
    <section className="space-y-5">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-semibold">Avis clients</h2>
        <span className="text-sm text-black/65">
          {average.toFixed(1)}/5 · {reviews.length} avis
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.author} className="rounded-xl border border-black/10 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{review.author}</span>
              <span className="text-accent" aria-label={`${review.rating} sur 5`}>
                {"★".repeat(review.rating)}
                <span className="text-black/15">{"★".repeat(5 - review.rating)}</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-black/70">{review.comment}</p>
            <p className="mt-2 text-xs text-black/60">{formatDate(review.date)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

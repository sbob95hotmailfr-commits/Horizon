import { Container } from "@/components/ui/Container";
import { getVehicleReviews, getAverageRating } from "@/lib/reviews";

export function Testimonials() {
  const reviews = getVehicleReviews();
  const average = getAverageRating(reviews);

  return (
    <section className="border-t border-black/10 py-20">
      <Container className="space-y-10">
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ce qu&apos;en disent nos clients</h2>
          <span className="text-sm text-black/50">
            {average.toFixed(1)}/5 · {reviews.length} avis
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.author} className="rounded-xl border border-black/10 p-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.author}</span>
                <span className="text-accent" aria-label={`${review.rating} sur 5`}>
                  {"★".repeat(review.rating)}
                  <span className="text-black/15">{"★".repeat(5 - review.rating)}</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-black/70">{review.comment}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

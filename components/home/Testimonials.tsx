import { Container } from "@/components/ui/Container";
import { getVehicleReviews, getAverageRating } from "@/lib/reviews";

export async function Testimonials() {
  const reviews = await getVehicleReviews();
  const average = getAverageRating(reviews);
  const featured = reviews.slice(0, 3);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/10 py-20">
      <Container className="space-y-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Ce qu&apos;en disent nos clients</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex items-center gap-4 rounded-2xl border border-black/10 p-6">
            <span className="text-4xl font-bold">{average.toFixed(1)}</span>
            <div>
              <div className="text-accent" aria-hidden="true">
                {"★".repeat(Math.round(average))}
                <span className="text-black/15">
                  {"★".repeat(5 - Math.round(average))}
                </span>
              </div>
              <p className="text-sm text-black/65">
                {reviews.length} avis client{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featured.map((review) => (
              <blockquote key={review.id} className="text-sm text-black/70">
                <p>&laquo;&nbsp;{review.comment}&nbsp;&raquo;</p>
                <footer className="mt-2 text-sm font-medium text-black">{review.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

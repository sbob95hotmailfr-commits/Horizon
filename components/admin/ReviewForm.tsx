"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import type { Review } from "@/types/database.types";
import type { ReviewFormState } from "@/app/admin/avis/actions";

type Action = (state: ReviewFormState, formData: FormData) => Promise<ReviewFormState>;

export function ReviewForm({
  action,
  review,
  submitLabel,
}: {
  action: Action;
  review?: Review;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ReviewFormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Auteur</span>
        <input
          name="author"
          required
          defaultValue={review?.author}
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Note</span>
        <select
          name="rating"
          required
          defaultValue={review?.rating ?? 5}
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Date</span>
        <input
          type="date"
          name="review_date"
          required
          defaultValue={review?.review_date}
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Commentaire</span>
        <textarea
          name="comment"
          required
          rows={4}
          defaultValue={review?.comment}
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      {state.error && <p className="text-sm font-medium text-black">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}

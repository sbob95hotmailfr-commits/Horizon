"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteReview } from "@/app/admin/avis/actions";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types/database.types";

export function ReviewAdminRow({ review }: { review: Review }) {
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  function handleDelete() {
    if (!confirm(`Supprimer l'avis de ${review.author} ?`)) return;
    startTransition(async () => {
      const result = await deleteReview(review.id);
      if (result.success) setDeleted(true);
    });
  }

  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium">
          {review.author}
          <span className="ml-2 text-sm text-black/65">
            {review.rating}/5 · {formatDate(review.review_date)}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/avis/${review.id}`}
            className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent"
          >
            Modifier
          </Link>
          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-full border border-black/15 px-3 py-1.5 text-sm font-medium text-black/70 hover:border-accent hover:text-accent disabled:opacity-50"
          >
            Supprimer
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-black/70">{review.comment}</p>
    </div>
  );
}

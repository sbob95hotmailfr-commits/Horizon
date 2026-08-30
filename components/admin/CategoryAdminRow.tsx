"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteCategory } from "@/app/admin/categories/actions";
import type { Category } from "@/types/database.types";

export function CategoryAdminRow({ category }: { category: Category }) {
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (deleted) return null;

  function handleDelete() {
    if (!confirm(`Supprimer la catégorie « ${category.label} » ?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteCategory(category.value);
      if (result.success) {
        setDeleted(true);
      } else {
        setError(result.error ?? "Suppression impossible.");
      }
    });
  }

  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-medium">
            {category.label}
            {category.is_utility && (
              <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs font-medium text-black/70">
                Utilitaire
              </span>
            )}
          </p>
          <p className="text-sm text-black/65">{category.value}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/categories/${category.value}`}
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
      {error && <p className="mt-2 text-sm font-medium text-black">{error}</p>}
    </div>
  );
}

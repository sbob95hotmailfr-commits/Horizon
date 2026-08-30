"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/types/database.types";
import type { CategoryFormState } from "@/app/admin/categories/actions";

type Action = (state: CategoryFormState, formData: FormData) => Promise<CategoryFormState>;

export function CategoryForm({
  action,
  category,
  submitLabel,
}: {
  action: Action;
  category?: Category;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<CategoryFormState, FormData>(action, {});
  const isEdit = Boolean(category);

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <label className="block space-y-1 text-sm">
        <span className="font-medium">Identifiant</span>
        <input
          name="value"
          required
          disabled={isEdit}
          defaultValue={category?.value}
          placeholder="familiale"
          className="w-full rounded-lg border border-black/15 px-3 py-2 disabled:bg-black/5 disabled:text-black/50"
        />
        <span className="block text-xs text-black/60">
          Minuscules, chiffres et tirets uniquement. Non modifiable après création.
        </span>
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Nom affiché</span>
        <input
          name="label"
          required
          defaultValue={category?.label}
          placeholder="Familiale"
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <label className="block space-y-1 text-sm">
        <span className="font-medium">Ordre d&apos;affichage</span>
        <input
          type="number"
          name="sort_order"
          defaultValue={category?.sort_order ?? 0}
          className="w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_utility"
          defaultChecked={category?.is_utility ?? false}
          className="accent-accent"
        />
        Catégorie utilitaire (apparaît dans « Utilitaires » plutôt que « Véhicules »)
      </label>

      {state.error && <p className="text-sm font-medium text-black">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : submitLabel}
      </Button>
    </form>
  );
}

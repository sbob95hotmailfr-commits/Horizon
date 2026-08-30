"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/lib/auth";

export interface CategoryFormState {
  error?: string;
}

function readCategoryFields(formData: FormData) {
  return {
    value: String(formData.get("value") ?? "")
      .trim()
      .toLowerCase(),
    label: String(formData.get("label") ?? "").trim(),
    is_utility: formData.get("is_utility") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createCategory(
  _prevState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const fields = readCategoryFields(formData);
  if (!/^[a-z0-9-]+$/.test(fields.value)) {
    return { error: "L'identifiant ne doit contenir que des lettres minuscules, chiffres et tirets." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("categories").insert(fields);

  if (error) {
    return {
      error: error.code === "23505" ? "Cet identifiant existe déjà." : "Impossible de créer la catégorie.",
    };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(
  value: string,
  _prevState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const label = String(formData.get("label") ?? "").trim();
  const is_utility = formData.get("is_utility") === "on";
  const sort_order = Number(formData.get("sort_order") ?? 0);

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({ label, is_utility, sort_order })
    .eq("value", value);

  if (error) {
    return { error: "Impossible d'enregistrer les modifications." };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(value: string) {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { success: false, error: "Accès refusé." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("value", value);

  if (error) {
    const inUse = error.code === "23503";
    return {
      success: false,
      error: inUse
        ? "Cette catégorie est utilisée par au moins un véhicule : impossible de la supprimer."
        : "Impossible de supprimer cette catégorie.",
    };
  }

  revalidatePath("/admin/categories");
  return { success: true };
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/lib/auth";

export interface ReviewFormState {
  error?: string;
}

function readReviewFields(formData: FormData) {
  return {
    author: String(formData.get("author") ?? "").trim(),
    rating: Number(formData.get("rating")),
    comment: String(formData.get("comment") ?? "").trim(),
    review_date: String(formData.get("review_date") ?? "").trim(),
  };
}

export async function createReview(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const fields = readReviewFields(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert(fields);

  if (error) {
    return { error: "Impossible de créer l'avis. Vérifiez les champs." };
  }

  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}

export async function updateReview(
  reviewId: string,
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { error: "Accès refusé." };
  }

  const fields = readReviewFields(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update(fields).eq("id", reviewId);

  if (error) {
    return { error: "Impossible d'enregistrer les modifications." };
  }

  revalidatePath("/admin/avis");
  redirect("/admin/avis");
}

export async function deleteReview(reviewId: string) {
  const session = await getCurrentUserWithRole();
  if (!session?.isAdmin) {
    return { success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

  if (error) {
    return { success: false };
  }

  revalidatePath("/admin/avis");
  return { success: true };
}

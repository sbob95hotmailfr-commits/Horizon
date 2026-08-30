import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/database.types";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getCarCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter((c) => !c.is_utility);
}

export async function getUtilityCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter((c) => c.is_utility);
}

export async function getCategoryByValue(value: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("value", value)
    .maybeSingle();

  if (error) throw error;
  return data;
}

"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveBrandPreferences(preferred: string[], avoided: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false };
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: user.id,
        preferred_brands: preferred,
        avoided_brands: avoided,
      },
      { onConflict: "user_id" },
    );

  return { success: !error };
}

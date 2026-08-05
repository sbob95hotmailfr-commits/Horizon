import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Utilisé dans le layout racine (Header) : ne doit jamais faire planter
 * le rendu de toutes les pages si Supabase est mal configuré ou
 * momentanément injoignable.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

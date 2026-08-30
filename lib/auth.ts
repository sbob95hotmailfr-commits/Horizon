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

/**
 * Utilisateur courant + son rôle. Utilisé à la fois pour protéger les
 * pages admin et dans le Header (via getCurrentUser côté layout) : ne
 * doit jamais faire planter le rendu si Supabase est injoignable.
 */
export async function getCurrentUserWithRole(): Promise<{ user: User; isAdmin: boolean } | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    return { user, isAdmin: profile?.role === "admin" };
  } catch {
    return null;
  }
}

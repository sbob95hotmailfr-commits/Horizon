"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent"
      >
        Mon compte
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/15 bg-white py-2">
          <Link
            href="/compte/reservations"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-black/5 hover:text-accent"
          >
            Mes réservations
          </Link>
          <Link
            href="/compte/preferences"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-black/5 hover:text-accent"
          >
            Préférences de marques
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-black/5 hover:text-accent"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // Si la session de récupération est déjà active au chargement
    // (le client l'a échangée avant que l'écouteur soit posé).
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/compte/reservations");
      router.refresh();
    }, 1500);
  }

  return (
    <Container className="max-w-md py-20">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Réinitialiser le mot de passe</h1>

        {done ? (
          <p className="text-black/70">Mot de passe mis à jour. Redirection…</p>
        ) : !ready ? (
          <p className="text-black/70">
            Ouvrez cette page depuis le lien reçu par email pour définir un nouveau mot de passe.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1 text-sm">
              <span className="font-medium">Nouveau mot de passe</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-medium">Confirmer le mot de passe</span>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2"
              />
            </label>

            {error && <p className="text-sm font-medium text-black">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "…" : "Enregistrer le nouveau mot de passe"}
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
}

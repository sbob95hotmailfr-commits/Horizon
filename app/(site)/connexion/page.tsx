"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

function translateSignUpError(message: string): string {
  if (message.includes("already registered")) {
    return "Un compte existe déjà avec cet email. Connectez-vous plutôt.";
  }
  if (message.includes("Password should be at least")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (message.includes("Unable to validate email address") || message.includes("invalid")) {
    return "Adresse email invalide.";
  }
  return "Une erreur est survenue. Réessayez.";
}

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("suivant") || "/compte/reservations";

  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const supabase = createClient();

    if (mode === "connexion") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        setError(translateSignUpError(error.message));
        return;
      }
      if (data.session) {
        // Confirmation email désactivée côté Supabase — le compte est
        // actif et connecté immédiatement, aucun email n'est envoyé.
        router.push(redirectTo);
        router.refresh();
        return;
      }
      setInfo("Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse.");
    }
  }

  return (
    <Container className="max-w-md py-20">
      <div className="space-y-8">
        <div className="flex gap-6 border-b border-black/10">
          <TabButton active={mode === "connexion"} onClick={() => setMode("connexion")}>
            Connexion
          </TabButton>
          <TabButton active={mode === "inscription"} onClick={() => setMode("inscription")}>
            Inscription
          </TabButton>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-3 py-2"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Mot de passe</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                aria-pressed={showPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-accent"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </label>

          {error && <p className="text-sm font-medium text-black">{error}</p>}
          {info && <p className="text-sm text-black/70">{info}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "…" : mode === "connexion" ? "Se connecter" : "Créer mon compte"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1 12s4-7 11-7c2.29 0 4.25.6 5.9 1.44M23 12s-4 7-11 7c-2.29 0-4.25-.6-5.9-1.44"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
        active
          ? "border-accent text-black"
          : "border-transparent text-black/40 hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  );
}

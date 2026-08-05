import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BrandPreferencesForm } from "@/components/account/BrandPreferencesForm";
import { createClient } from "@/lib/supabase/server";

export default async function PreferencesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?suivant=/compte/preferences");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("preferred_brands, avoided_brands")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="py-12">
      <Container className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Préférences de marques</h1>
          <p className="text-sm text-black/50">
            Facultatif — affine les recommandations du conseiller Horizon.
          </p>
        </div>

        <BrandPreferencesForm
          initialPreferred={profile?.preferred_brands ?? []}
          initialAvoided={profile?.avoided_brands ?? []}
        />
      </Container>
    </div>
  );
}

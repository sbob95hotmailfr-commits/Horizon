import { NextResponse } from "next/server";
import { anthropic, CHATBOT_MODEL, CHATBOT_SYSTEM_PROMPT } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: ChatMessage[] };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Le champ 'messages' est requis." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("name, brand, category, price_per_day, seats, transmission, fuel_type")
    .eq("available", true)
    .limit(30);

  const catalogueContext = vehicles?.length
    ? `Véhicules disponibles :\n${vehicles
        .map(
          (v) =>
            `- ${v.brand} ${v.name} (${v.category}, ${v.transmission}, ${v.fuel_type}, ${v.seats} places, ${v.price_per_day}€/jour)`,
        )
        .join("\n")}`
    : "Aucun véhicule disponible pour le moment dans le catalogue.";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let preferencesContext = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("preferred_brands, avoided_brands")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profile?.preferred_brands.length || profile?.avoided_brands.length) {
      preferencesContext = `\n\nPréférences du client — marques appréciées : ${
        profile.preferred_brands.join(", ") || "aucune"
      }. Marques à éviter : ${profile.avoided_brands.join(", ") || "aucune"}.`;
    }
  }

  const response = await anthropic.messages.create({
    model: CHATBOT_MODEL,
    max_tokens: 512,
    system: `${CHATBOT_SYSTEM_PROMPT}\n\n${catalogueContext}${preferencesContext}`,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const textBlock = response.content.find((block) => block.type === "text");

  return NextResponse.json({
    message: textBlock?.type === "text" ? textBlock.text : "",
  });
}

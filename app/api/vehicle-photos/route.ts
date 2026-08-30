import { NextResponse } from "next/server";
import { getVehiclePhotos } from "@/lib/unsplash";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Paramètre 'category' invalide ou manquant." },
      { status: 400 },
    );
  }

  const urls = await getVehiclePhotos(category);
  return NextResponse.json({ urls });
}

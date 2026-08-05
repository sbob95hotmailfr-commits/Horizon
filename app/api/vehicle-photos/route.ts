import { NextResponse } from "next/server";
import { getVehiclePhotos } from "@/lib/unsplash";
import type { VehicleCategory } from "@/types/database.types";

const VALID_CATEGORIES: VehicleCategory[] = [
  "citadine",
  "berline",
  "suv",
  "utilitaire",
  "cabriolet",
  "electrique",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as VehicleCategory | null;

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Paramètre 'category' invalide ou manquant." },
      { status: 400 },
    );
  }

  const urls = await getVehiclePhotos(category);
  return NextResponse.json({ urls });
}

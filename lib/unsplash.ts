import "server-only";
import type { VehicleCategory } from "@/types/database.types";

const CATEGORY_KEYWORDS: Record<VehicleCategory, string> = {
  citadine: "modern compact city car",
  berline: "modern sedan car",
  suv: "suv car white background",
  utilitaire: "cargo van vehicle",
  cabriolet: "convertible sports car",
  electrique: "electric car charging",
};

// Photo curée manuellement (recherche dynamique trop aléatoire pour
// garantir la composition voulue : véhicules récents visibles, Paris,
// avec l'Arc de Triomphe sur l'horizon). Photo : Louis / Pexels.
const HERO_PHOTO_URL =
  "https://images.pexels.com/photos/14311173/pexels-photo-14311173.jpeg?auto=compress&cs=tinysrgb&w=1920";

// Cache mémoire par instance de serveur — suffisant pour rester sous la
// limite gratuite Unsplash (50 req/h) sur un même déploiement.
const cache = new Map<string, { urls: string[]; expiresAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6h

async function searchPhotos(query: string, count: number): Promise<string[]> {
  const cached = cache.get(query);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.urls;
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return [];
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    {
      headers: { Authorization: `Client-ID ${accessKey}` },
      next: { revalidate: 60 * 60 * 6 },
    },
  );

  if (!res.ok) {
    return cached?.urls ?? [];
  }

  const data = (await res.json()) as {
    results: { urls: { regular: string } }[];
  };
  const urls = data.results.map((r) => r.urls.regular);

  cache.set(query, { urls, expiresAt: Date.now() + CACHE_TTL_MS });
  return urls;
}

export function getVehiclePhotos(category: VehicleCategory, count = 6): Promise<string[]> {
  return searchPhotos(CATEGORY_KEYWORDS[category], count);
}

export async function getHeroPhoto(): Promise<string> {
  return HERO_PHOTO_URL;
}

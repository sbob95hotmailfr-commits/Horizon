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

const HERO_QUERY = "Paris France street night";

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

export function getVehiclePhotos(category: VehicleCategory, count = 3): Promise<string[]> {
  return searchPhotos(CATEGORY_KEYWORDS[category], count);
}

export async function getHeroPhoto(): Promise<string | undefined> {
  const [url] = await searchPhotos(HERO_QUERY, 1);
  return url;
}

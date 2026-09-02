import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getVehicles } from "@/lib/vehicles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getVehicles();

  const staticRoutes = [
    "",
    "/vehicules",
    "/utilitaires",
    "/faq",
    "/contact",
    "/mentions-legales",
    "/cgv",
    "/confidentialite",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const vehicleRoutes = vehicles.map((vehicle) => ({
    url: `${SITE_URL}/vehicules/${vehicle.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...vehicleRoutes];
}

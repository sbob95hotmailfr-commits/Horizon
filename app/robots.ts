import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/compte", "/connexion", "/reservation", "/reinitialiser-mot-de-passe"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

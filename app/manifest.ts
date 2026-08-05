import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Horizon — Location de voitures",
    short_name: "Horizon",
    description:
      "Horizon, location de voitures à Paris et en Île-de-France. La liberté commence à l'horizon.",
    start_url: "/",
    display: "standalone",
    background_color: "#080B0D",
    theme_color: "#080B0D",
    lang: "fr",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

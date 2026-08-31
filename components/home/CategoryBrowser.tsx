import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/categories";
import { getVehicles } from "@/lib/vehicles";
import { resolveVehicleImages } from "@/lib/vehicle-images";

export async function CategoryBrowser() {
  const [categories, vehicles] = await Promise.all([getCategories(), getVehicles()]);

  if (categories.length === 0 || vehicles.length === 0) {
    return null;
  }

  const tiles = await Promise.all(
    categories.map(async (category) => {
      const vehiclesInCategory = vehicles.filter((v) => v.category === category.value);
      const representative = vehiclesInCategory[0];
      const imageUrl = representative
        ? (await resolveVehicleImages(representative))[0]
        : undefined;
      return { category, imageUrl, count: vehiclesInCategory.length };
    }),
  );

  const visibleTiles = tiles.filter((t) => t.count > 0);
  if (visibleTiles.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black/10 py-20">
      <Container className="space-y-10">
        <h2 className="text-2xl font-semibold sm:text-3xl">Parcourir par catégorie</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visibleTiles.map(({ category, imageUrl, count }) => (
            <Link
              key={category.value}
              href={category.is_utility ? "/utilitaires" : `/vehicules?categorie=${category.value}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-black/5"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={category.label}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-ivory">
                <p className="font-semibold">{category.label}</p>
                <p className="text-xs text-ivory/70">
                  {count} véhicule{count !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { getCategories } from "@/lib/categories";
import { CategoryAdminRow } from "@/components/admin/CategoryAdminRow";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Catégories</h1>
          <p className="text-sm text-black/65">{categories.length} catégorie(s)</p>
        </div>
        <Link
          href="/admin/categories/nouveau"
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90"
        >
          + Ajouter une catégorie
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="text-black/65">Aucune catégorie pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => (
            <CategoryAdminRow key={category.value} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

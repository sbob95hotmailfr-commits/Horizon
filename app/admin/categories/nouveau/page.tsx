import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "@/app/admin/categories/actions";

export default function AdminNouvelleCategoriePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Ajouter une catégorie</h1>
      <CategoryForm action={createCategory} submitLabel="Créer la catégorie" />
    </div>
  );
}

import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { updateCategory } from "@/app/admin/categories/actions";
import { getCategoryByValue } from "@/lib/categories";

interface PageProps {
  params: Promise<{ value: string }>;
}

export default async function AdminEditCategoriePage({ params }: PageProps) {
  const { value } = await params;
  const category = await getCategoryByValue(value);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Modifier {category.label}</h1>
      <CategoryForm
        action={updateCategory.bind(null, category.value)}
        category={category}
        submitLabel="Enregistrer les modifications"
      />
    </div>
  );
}

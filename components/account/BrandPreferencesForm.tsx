"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { saveBrandPreferences } from "@/app/(site)/compte/preferences/actions";

const KNOWN_BRANDS = [
  "Peugeot",
  "Renault",
  "Tesla",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "Mini",
  "Volkswagen",
  "BMW",
  "Audi",
];

export function BrandPreferencesForm({
  initialPreferred,
  initialAvoided,
}: {
  initialPreferred: string[];
  initialAvoided: string[];
}) {
  const [preferred, setPreferred] = useState<string[]>(initialPreferred);
  const [avoided, setAvoided] = useState<string[]>(initialAvoided);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, brand: string) {
    setSaved(false);
    setList(list.includes(brand) ? list.filter((b) => b !== brand) : [...list, brand]);
  }

  async function handleSave() {
    setSaving(true);
    const result = await saveBrandPreferences(preferred, avoided);
    setSaving(false);
    setSaved(result.success);
  }

  return (
    <div className="space-y-8">
      <BrandGroup
        title="Marques préférées"
        description="Le conseiller Horizon les privilégiera dans ses recommandations."
        brands={KNOWN_BRANDS}
        selected={preferred}
        onToggle={(b) => toggle(preferred, setPreferred, b)}
      />

      <BrandGroup
        title="Marques à éviter"
        description="Elles ne seront jamais recommandées par le conseiller Horizon."
        brands={KNOWN_BRANDS}
        selected={avoided}
        onToggle={(b) => toggle(avoided, setAvoided, b)}
      />

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
        {saved && <span className="text-sm text-accent">Préférences enregistrées.</span>}
      </div>
    </div>
  );
}

function BrandGroup({
  title,
  description,
  brands,
  selected,
  onToggle,
}: {
  title: string;
  description: string;
  brands: string[];
  selected: string[];
  onToggle: (brand: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-black/65">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => {
          const active = selected.includes(brand);
          return (
            <button key={brand} type="button" onClick={() => onToggle(brand)}>
              <Badge
                className={active ? "border-black bg-black text-ivory" : undefined}
              >
                {brand}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}

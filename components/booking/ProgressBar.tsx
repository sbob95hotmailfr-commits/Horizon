const STEPS = ["Dates & lieu", "Options", "Vos informations", "Récapitulatif"];

export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="space-y-2">
      <div className="flex h-1.5 gap-1.5 overflow-hidden rounded-full bg-black/10">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors"
            style={{ backgroundColor: i < step ? "var(--color-accent)" : "transparent" }}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-black/65">
        Étape {step}/{STEPS.length} — {STEPS[step - 1]}
      </p>
    </div>
  );
}

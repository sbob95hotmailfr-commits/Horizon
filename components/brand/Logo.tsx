import { Monogram } from "./Monogram";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  monogramOnly?: boolean;
}

/**
 * Logo Horizon : monogramme + logotype, tous deux vectorisés depuis les
 * fichiers de la planche de marque (public/brand/). Aucune baseline
 * accolée au logo.
 */
export function Logo({ className, variant = "dark", monogramOnly = false }: LogoProps) {
  const color = variant === "dark" ? "text-black" : "text-ivory";

  return (
    <span className={cn("inline-flex items-center gap-2.5", color, className)}>
      <Monogram className="h-7 w-7 shrink-0" />
      {!monogramOnly && <Wordmark className="h-6 w-auto" />}
    </span>
  );
}

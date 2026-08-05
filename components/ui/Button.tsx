import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-ivory hover:bg-accent/90",
  secondary: "bg-black text-ivory hover:bg-black/85",
  ghost: "border border-black/15 text-black hover:border-black/40",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = "primary", className, children }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

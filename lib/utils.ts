import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Nuances de noir (contraste vérifié AA) pour distinguer les avatars
// clients sans sortir de la charte noir/ivoire/orange.
const AVATAR_SHADES = [
  { bg: "bg-black", text: "text-ivory" },
  { bg: "bg-black/85", text: "text-ivory" },
  { bg: "bg-black/45", text: "text-black" },
  { bg: "bg-black/15", text: "text-black" },
];

export function avatarShade(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_SHADES[hash % AVATAR_SHADES.length];
}

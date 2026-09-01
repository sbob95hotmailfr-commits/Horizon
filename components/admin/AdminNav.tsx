"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/admin/statistiques", label: "Statistiques" },
  { href: "/admin/reservations", label: "Réservations" },
  { href: "/admin/vehicules", label: "Véhicules" },
  { href: "/admin/categories", label: "Catégories" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
  { href: "/admin/avis", label: "Avis" },
];

export function AdminNav({ pendingCount }: { pendingCount: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm font-medium">
      {NAV_LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2",
              active
                ? "border-l-2 border-accent bg-accent/10 pl-[10px] font-semibold text-black"
                : "text-black/65 hover:bg-black/5 hover:text-accent",
            )}
          >
            {link.label}
            {link.href === "/admin/reservations" && pendingCount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-black">
                {pendingCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

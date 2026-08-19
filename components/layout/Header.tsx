import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { UserMenu } from "@/components/layout/UserMenu";
import { getCurrentUser } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/vehicules", label: "Véhicules" },
];

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Horizon — Accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold tracking-tight md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <ButtonLink
              href="/connexion"
              variant="ghost"
              className="font-semibold tracking-tight"
            >
              Connexion
            </ButtonLink>
          )}
        </div>
      </div>
    </header>
  );
}

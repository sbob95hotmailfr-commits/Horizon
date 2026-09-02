import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BRAND_TAGLINE } from "@/lib/constants";

const LEGAL_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ivory/10 bg-black text-ivory">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
        <Logo variant="light" />
        <p className="text-sm text-ivory/60">{BRAND_TAGLINE}</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-ivory/70 hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-ivory/60">
          © {new Date().getFullYear()} Horizon — Paris, Île-de-France.
        </p>
      </div>
    </footer>
  );
}

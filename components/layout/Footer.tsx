import { Logo } from "@/components/brand/Logo";
import { BRAND_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ivory/10 bg-black text-ivory">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
        <Logo variant="light" />
        <p className="text-sm text-ivory/60">{BRAND_TAGLINE}</p>
        <p className="text-xs text-ivory/60">
          © {new Date().getFullYear()} Horizon — Paris, Île-de-France.
        </p>
      </div>
    </footer>
  );
}

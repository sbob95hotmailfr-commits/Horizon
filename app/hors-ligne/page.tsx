import { Logo } from "@/components/brand/Logo";

export default function OfflinePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-black px-6 py-24 text-center text-ivory">
      <Logo variant="light" />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Pas de connexion</h1>
        <p className="max-w-sm text-sm text-ivory/70">
          Cette page n&apos;est pas disponible hors ligne. Reconnectez-vous
          pour continuer à explorer la flotte Horizon.
        </p>
      </div>
    </div>
  );
}

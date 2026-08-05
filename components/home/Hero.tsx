import Image from "next/image";
import { SearchBar } from "@/components/home/SearchBar";

export function Hero({ imageUrl }: { imageUrl?: string }) {
  return (
    <section className="relative flex min-h-[92vh] w-full items-end overflow-hidden bg-black">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Véhicule Horizon"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-32">
        <div className="max-w-xl space-y-4 text-ivory">
          <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Louez la voiture qu&apos;il vous faut, à Paris.
          </h1>
          <p className="text-ivory/70">La liberté commence à l&apos;horizon.</p>
        </div>

        <SearchBar />
      </div>
    </section>
  );
}

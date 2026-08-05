"use client";

import Image from "next/image";
import { useState } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { cn } from "@/lib/utils";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-black/5">
        <Monogram className="h-14 w-14 text-black/20" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/5">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg",
                i === active ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

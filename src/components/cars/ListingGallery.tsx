"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ListingGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="animate-fade">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
        <Image
          src={images[active] ?? images[0]}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-[16/10] overflow-hidden border-2 transition-colors",
                index === active ? "border-accent" : "border-transparent",
              )}
              aria-label={`Show image ${index + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="160px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

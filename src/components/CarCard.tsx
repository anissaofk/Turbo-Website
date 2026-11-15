import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/data/types";
import { formatMileage, formatPrice } from "@/data/filter";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group animate-rise">
      <Link href={`/cars/${car.id}`} className="block">
        <div className="listing-media relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 pt-12">
            <p className="text-lg font-semibold text-white">
              {formatPrice(car.price)}
            </p>
          </div>
          {car.seller.type === "Dealer" && (
            <span className="absolute top-3 left-3 bg-ink/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
              Dealer
            </span>
          )}
        </div>
        <div className="pt-4">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            {car.make} {car.model}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {car.year} · {formatMileage(car.mileage)} · {car.fuel} ·{" "}
            {car.transmission}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{car.location}</p>
        </div>
      </Link>
    </article>
  );
}

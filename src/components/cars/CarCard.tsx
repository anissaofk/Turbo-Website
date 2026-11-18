"use client";

import Image from "next/image";
import Link from "next/link";
import { formatMileage, formatPrice } from "@/data/filter";
import { tFuel } from "@/i18n/format";
import { useT } from "@/i18n/LanguageProvider";
import type { Car } from "@/types";

export function CarCard({ car }: { car: Car }) {
  const t = useT();
  const categoryLabel =
    t.categories[car.category as keyof typeof t.categories] ?? car.category;
  const price =
    car.price > 0
      ? formatPrice(car.price)
      : car.dailyRate != null
        ? `${new Intl.NumberFormat("fr-CA").format(car.dailyRate)} ${t.listing.perDay}`
        : formatPrice(car.price);
  const isService = car.category === "inspection";

  return (
    <article className="group animate-rise">
      <Link href={`/cars/${car.id}`} className="block">
        <div className="listing-media relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-paper-deep shadow-sm">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3 rounded-full bg-blue-navy/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            {categoryLabel}
          </span>
          {car.offer && (
            <span className="absolute top-3 right-3 rounded-full bg-blue px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
              {t.common.offer}
            </span>
          )}
        </div>
        <div className="pt-3.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-display text-lg font-semibold tracking-tight text-blue-navy sm:text-xl">
              {car.make} {car.model}
            </h3>
            <p className="shrink-0 font-display text-lg font-bold tracking-tight text-blue-deep sm:text-xl">
              {price}
            </p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {isService
              ? car.seller.city
              : `${car.year} · ${formatMileage(car.mileage)} · ${tFuel(t, car.fuel)}`}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{car.location}</p>
        </div>
      </Link>
    </article>
  );
}

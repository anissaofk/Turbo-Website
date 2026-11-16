import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import { formatMileage, formatMonthly, formatPrice } from "@/data/filter";
import type { Car } from "@/types";

export function CarCard({ car }: { car: Car }) {
  const category = getCategory(car.category);
  const monthly = formatMonthly(car.monthlyPayment);
  const headline =
    monthly ??
    (car.dailyRate != null
      ? `${new Intl.NumberFormat("fr-CA").format(car.dailyRate)} $/jour`
      : formatPrice(car.price));
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
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-navy/80 to-transparent p-4 pt-12">
            <p className="text-lg font-semibold text-white">{headline}</p>
            {monthly && car.price > 0 && (
              <p className="text-xs text-white/75">
                ou {formatPrice(car.price)}
              </p>
            )}
            {car.dailyRate != null && !monthly && (
              <p className="text-xs text-white/75">Location à la journée</p>
            )}
          </div>
          <span className="absolute top-3 left-3 rounded-full bg-blue-navy/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            {category?.short ?? car.category}
          </span>
          {car.offer && (
            <span className="absolute top-3 right-3 rounded-full bg-blue px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
              Offre
            </span>
          )}
        </div>
        <div className="pt-4">
          <h3 className="font-display text-xl font-semibold tracking-tight text-blue-navy">
            {car.make} {car.model}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {isService
              ? car.seller.city
              : `${car.year} · ${formatMileage(car.mileage)} · ${car.fuel}`}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {car.location}
            {car.downPayment === 0 && car.monthlyPayment != null
              ? " · Sans mise de fonds"
              : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}

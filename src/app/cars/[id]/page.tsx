import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingGallery } from "@/components/ListingGallery";
import { cars, getCarById } from "@/data/cars";
import { formatMileage, formatPrice } from "@/data/filter";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) return { title: "Car not found" };
  return {
    title: `${car.make} ${car.model}`,
    description: `${car.year} · ${formatMileage(car.mileage)} · ${formatPrice(car.price)} in ${car.location}`,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  const specs = [
    { label: "Year", value: String(car.year) },
    { label: "Mileage", value: formatMileage(car.mileage) },
    { label: "Fuel", value: car.fuel },
    { label: "Transmission", value: car.transmission },
    { label: "Body", value: car.bodyType },
    { label: "Power", value: `${car.powerHp} hp` },
    { label: "Color", value: car.color },
    { label: "Doors / seats", value: `${car.doors} / ${car.seats}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/search"
        className="text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        ← Back to search
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <ListingGallery
            images={car.images}
            alt={`${car.make} ${car.model}`}
          />

          <div className="mt-10 animate-rise">
            <h2 className="font-display text-2xl font-semibold">Overview</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
              {car.description}
            </p>
          </div>

          <div className="mt-10 animate-rise delay-1">
            <h2 className="font-display text-2xl font-semibold">Specs</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <dt className="text-sm text-muted">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 animate-rise delay-2">
            <h2 className="font-display text-2xl font-semibold">Features</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li
                  key={feature}
                  className="border-l-2 border-accent pl-3 text-sm text-ink-soft"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="animate-slide lg:sticky lg:top-6 lg:self-start">
          <div className="border border-line bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              {car.location}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {car.make} {car.model}
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">
              {formatPrice(car.price)}
            </p>
            <p className="mt-2 text-sm text-muted">
              {car.year} · {formatMileage(car.mileage)} · {car.fuel}
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Seller
              </p>
              <p className="mt-2 text-lg font-semibold">{car.seller.name}</p>
              <p className="mt-1 text-sm text-muted">
                {car.seller.type} · {car.seller.city} · ★ {car.seller.rating.toFixed(1)}
              </p>
              <a
                href={`tel:${car.seller.phone.replace(/\s/g, "")}`}
                className="btn-primary mt-5 w-full"
              >
                Call {car.seller.phone}
              </a>
              <a
                href={`mailto:hello@turbo.cars?subject=${encodeURIComponent(
                  `Interest in ${car.make} ${car.model}`,
                )}`}
                className="mt-3 inline-flex w-full items-center justify-center border border-line px-4 py-3 text-sm font-semibold transition-colors hover:bg-paper-deep"
              >
                Email seller via Turbo
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

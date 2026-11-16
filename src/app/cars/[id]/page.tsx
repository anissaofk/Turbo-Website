import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingGallery } from "@/components/cars";
import { cars, getCarById } from "@/data/cars";
import { getCategory } from "@/data/categories";
import { formatMileage, formatMonthly, formatPrice } from "@/data/filter";

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
  if (!car) return { title: "Annonce introuvable" };
  return {
    title: `${car.make} ${car.model}`,
    description: car.description,
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

  const category = getCategory(car.category);
  const monthly = formatMonthly(car.monthlyPayment);
  const isService = car.category === "inspection";

  const specs = isService
    ? [
        { label: "Service", value: car.model },
        { label: "Prix", value: formatPrice(car.price) },
        { label: "Ville", value: car.location },
        { label: "Note", value: `★ ${car.seller.rating.toFixed(1)}` },
      ]
    : [
        { label: "Année", value: String(car.year) },
        { label: "Kilométrage", value: formatMileage(car.mileage) },
        { label: "Carburant", value: car.fuel },
        { label: "Transmission", value: car.transmission },
        { label: "Carrosserie", value: car.bodyType },
        { label: "Puissance", value: `${car.powerHp} ch` },
        { label: "Couleur", value: car.color },
        { label: "Fiabilité", value: `${car.reliability.toFixed(1)} / 5` },
        {
          label: "Mise de fonds",
          value:
            car.downPayment === 0
              ? "0 $ (aucune)"
              : formatPrice(car.downPayment ?? 0),
        },
      ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/search"
        className="text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        ← Retour aux annonces
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <ListingGallery
            images={car.images}
            alt={`${car.make} ${car.model}`}
          />

          <div className="mt-10 animate-rise">
            <h2 className="font-display text-2xl font-semibold">Description</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
              {car.description}
            </p>
          </div>

          <div className="mt-10 animate-rise delay-1">
            <h2 className="font-display text-2xl font-semibold">Détails</h2>
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
            <h2 className="font-display text-2xl font-semibold">Inclus</h2>
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
            {category && (
              <Link
                href={category.href}
                className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
              >
                {category.title}
              </Link>
            )}
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {car.make} {car.model}
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold text-ink">
              {monthly ?? formatPrice(car.price)}
            </p>
            {monthly && car.price > 0 && (
              <p className="mt-1 text-sm text-muted">
                ou achat {formatPrice(car.price)}
              </p>
            )}
            {!isService && (
              <p className="mt-2 text-sm text-muted">
                {car.year} · {formatMileage(car.mileage)} · {car.fuel} ·{" "}
                {car.location}
              </p>
            )}

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Contact
              </p>
              <p className="mt-2 text-lg font-semibold">{car.seller.name}</p>
              <p className="mt-1 text-sm text-muted">
                {car.seller.type} · {car.seller.city} · ★{" "}
                {car.seller.rating.toFixed(1)}
              </p>
              <a
                href={`tel:${car.seller.phone.replace(/\s/g, "")}`}
                className="btn-primary mt-5 w-full"
              >
                Appeler {car.seller.phone}
              </a>
              <a
                href={`mailto:hello@autiva.ca?subject=${encodeURIComponent(
                  `Intérêt — ${car.make} ${car.model}`,
                )}`}
                className="mt-3 inline-flex w-full items-center justify-center border border-line px-4 py-3 text-sm font-semibold transition-colors hover:bg-paper-deep"
              >
                Contacter via Autiva
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

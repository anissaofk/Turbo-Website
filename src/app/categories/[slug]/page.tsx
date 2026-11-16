import Link from "next/link";
import { notFound } from "next/navigation";
import { CarCard } from "@/components/cars";
import { getCarsByCategory } from "@/data/cars";
import { categories, getCategory } from "@/data/categories";
import type { ListingCategory } from "@/types";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug as ListingCategory);
  if (!category) return { title: "Catégorie" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug as ListingCategory);
  if (!category) notFound();

  const listings = getCarsByCategory(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        ← Accueil
      </Link>

      <div className="mt-6 animate-rise max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Case Autiva
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {category.title}
        </h1>
        <p className="mt-3 text-muted">{category.description}</p>
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{listings.length}</span>{" "}
          annonces
        </p>
        <Link
          href={`/search?category=${category.id}`}
          className="text-sm font-semibold text-accent hover:text-accent-deep"
        >
          Filtrer dans la recherche →
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="mt-10 text-muted">Aucune annonce dans cette case pour le moment.</p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

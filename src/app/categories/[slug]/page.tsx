import { notFound, redirect } from "next/navigation";
import { CategoryPageView } from "@/components/search/CategoryPageView";
import { getCarsByCategory } from "@/data/cars";
import { categories, getCategory } from "@/data/categories";
import type { ListingCategory, SiteCaseId } from "@/types";

const SEARCH_REDIRECTS: Record<string, string> = {
  buy: "/search?category=buy",
  neuf: "/search?category=buy",
  usage: "/search?category=buy",
  vendre: "/sell",
};

const LISTING_SLUGS = [
  "location",
  "lease-takeover",
  "location-particulier",
  "inspection",
] as const satisfies readonly ListingCategory[];

type ListingSlug = (typeof LISTING_SLUGS)[number];

function isListingSlug(slug: string): slug is ListingSlug {
  return (LISTING_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  const legacy = Object.keys(SEARCH_REDIRECTS).map((slug) => ({ slug }));
  const fromNav = categories.map((cat) => ({ slug: cat.id }));
  const seen = new Set<string>();
  return [...fromNav, ...legacy].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (SEARCH_REDIRECTS[slug]) {
    return { title: "Autiva" };
  }
  const category = getCategory(slug);
  if (!category) return { title: "Autiva" };
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

  const searchRedirect = SEARCH_REDIRECTS[slug];
  if (searchRedirect) {
    redirect(searchRedirect);
  }

  if (!isListingSlug(slug)) {
    notFound();
  }

  const category = getCategory(slug);
  if (!category) notFound();

  const listings = getCarsByCategory(slug);

  return (
    <CategoryPageView slug={slug as SiteCaseId} listings={listings} />
  );
}

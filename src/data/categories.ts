import type { CategoryMeta, ListingCategory, SiteCaseId } from "@/types";

/** Cases visibles dans la nav / grille / footer */
export const categories: CategoryMeta[] = [
  {
    id: "buy",
    title: "Achat",
    short: "Achat",
    description:
      "Véhicules neufs et d'occasion — comparez et achetez près de chez vous.",
    href: "/search?category=buy",
  },
  {
    id: "vendre",
    title: "Vente",
    short: "Vente",
    description:
      "Publiez votre annonce Autiva — vente, location ou reprise de bail.",
    href: "/sell",
  },
  {
    id: "location",
    title: "Offres de locations",
    short: "Locations",
    description:
      "Louez un véhicule à la journée, à la semaine ou au mois.",
    href: "/categories/location",
  },
  {
    id: "lease-takeover",
    title: "Reprise de bail",
    short: "Reprise",
    description:
      "Reprenez un bail en cours — paiements déjà fixés, souvent sans mise de fonds.",
    href: "/categories/lease-takeover",
  },
  {
    id: "location-particulier",
    title: "Location Privée",
    short: "Privée",
    description:
      "Louez la voiture d'un particulier près de chez vous.",
    href: "/categories/location-particulier",
  },
  {
    id: "inspection",
    title: "Inspection & Garage",
    short: "Garage",
    description:
      "Garages et centres d'inspection pour vérifier un véhicule.",
    href: "/categories/inspection",
  },
];

/** Types d'annonce pour le formulaire de publication */
export const listingCategories: {
  id: ListingCategory;
  title: string;
}[] = [
  { id: "neuf", title: "Neuf" },
  { id: "usage", title: "Occasion" },
  { id: "location", title: "Location" },
  { id: "lease-takeover", title: "Reprise de bail" },
  { id: "location-particulier", title: "Location privée" },
  { id: "inspection", title: "Inspection & Garage" },
];

/** Métadonnées d'affichage pour catégories d'annonce hors cases nav */
const LISTING_CATEGORY_META: Partial<
  Record<ListingCategory, Pick<CategoryMeta, "title" | "short" | "description" | "href">>
> = {
  neuf: {
    title: "Neuf",
    short: "Neuf",
    description: "Véhicules neufs près de chez vous.",
    href: "/search?category=buy",
  },
  usage: {
    title: "Occasion",
    short: "Occasion",
    description: "Véhicules d'occasion près de chez vous.",
    href: "/search?category=buy",
  },
};

/**
 * Résout une case site (`buy`, `location`, …) ou une catégorie d'annonce
 * (`neuf`, `usage`, …). Les IDs d'annonce legacy se rattachent à Achat.
 */
export function getCategory(
  id: SiteCaseId | ListingCategory | string,
): CategoryMeta | undefined {
  const site = categories.find((c) => c.id === id);
  if (site) return site;

  const listingMeta = LISTING_CATEGORY_META[id as ListingCategory];
  if (!listingMeta) return undefined;

  const buy = categories.find((c) => c.id === "buy");
  if (!buy) return undefined;

  return {
    ...buy,
    ...listingMeta,
  };
}

/** Cases filtrables dans la recherche (sans Vente) */
export function getSearchableCategories(): CategoryMeta[] {
  return categories.filter((c) => c.id !== "vendre");
}

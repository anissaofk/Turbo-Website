import type { CategoryMeta, ListingCategory } from "@/types";

export const categories: CategoryMeta[] = [
  {
    id: "neuf",
    title: "Neuves & Offres",
    short: "Neuves",
    description:
      "Véhicules neufs et promotions concessionnaires — garanties et financement.",
    href: "/categories/neuf",
  },
  {
    id: "usage",
    title: "Usager",
    short: "Usager",
    description:
      "Annonces d'occasion auprès de concessionnaires et particuliers.",
    href: "/categories/usage",
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

export function getCategory(id: ListingCategory): CategoryMeta | undefined {
  return categories.find((c) => c.id === id);
}

/** Types du marché automobile Autiva */

export type FuelType = "Essence" | "Diesel" | "Hybride" | "Électrique";
export type Transmission = "Manuelle" | "Automatique";
export type BodyType =
  | "Berline"
  | "VUS"
  | "Compacte"
  | "Coupé"
  | "Familiale"
  | "Cabriolet"
  | "Sportive";

export type Drivetrain =
  | "Traction avant"
  | "Propulsion"
  | "Intégral"
  | "4x4";

export type ColorFamily =
  | "Blanc"
  | "Noir"
  | "Rouge"
  | "Bleu"
  | "Gris"
  | "Vert"
  | "Autre";

export type SellerType = "Concessionnaire" | "Particulier" | "Garage";

/** Catégorie d'annonce (données véhicule) */
export type ListingCategory =
  | "neuf"
  | "usage"
  | "location"
  | "lease-takeover"
  | "inspection"
  | "location-particulier";

/** Cases de navigation du site */
export type SiteCaseId =
  | "buy"
  | "vendre"
  | "location"
  | "lease-takeover"
  | "inspection"
  | "location-particulier";

export interface Seller {
  name: string;
  type: SellerType;
  city: string;
  phone: string;
  rating: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  /** Prix d'achat (CAD) — 0 si location/lease uniquement */
  price: number;
  /** Paiement mensuel estimé (CAD) */
  monthlyPayment?: number;
  /** Tarif à la journée (CAD) — location particulier */
  dailyRate?: number;
  /** Mise de fonds requise (CAD) */
  downPayment?: number;
  mileage: number;
  fuel: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  powerHp: number;
  color: string;
  doors: number;
  seats: number;
  /** Rouage / entraînement */
  drivetrain: Drivetrain;
  description: string;
  features: string[];
  tags: string[];
  images: string[];
  location: string;
  /** Code postal canadien de l'annonce */
  postalCode: string;
  seller: Seller;
  category: ListingCategory;
  /** Score fiabilité 1–5 (utilisé par la recherche intelligente) */
  reliability: number;
  /** Offre spéciale (neuf / promotions) */
  offer?: boolean;
  /** Véhicule certifié concessionnaire */
  certified?: boolean;
  /** Annonce véhicule endommagé / salvage */
  damaged?: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CarFilters {
  /** Case / filtre : buy = neuf + usage */
  category?: ListingCategory | "buy";

  make?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  monthlyMax?: number;
  downPaymentMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  fuel?: FuelType;
  transmission?: Transmission;
  bodyType?: BodyType;
  drivetrain?: Drivetrain;
  color?: ColorFamily;
  sellerType?: SellerType;
  doors?: number;
  seats?: number;
  powerMin?: number;
  powerMax?: number;
  feature?: string;
  /** Exclure les véhicules endommagés (défaut AutoHebdo) */
  excludeDamaged?: boolean;
  certified?: boolean;
  /** Annonces publiées depuis N jours */
  listedWithinDays?: number;
  location?: string;
  postalCode?: string;
  /** Rayon de recherche en km autour du code postal */
  radiusKm?: number;
  offer?: boolean;
  reliable?: boolean;
  sporty?: boolean;
  q?: string;
  intent?: string;
  sort?:
    | "price-asc"
    | "price-desc"
    | "monthly-asc"
    | "mileage-asc"
    | "mileage-desc"
    | "year-desc"
    | "newest"
    | "oldest";
}

export interface CategoryMeta {
  id: SiteCaseId;
  title: string;
  short: string;
  description: string;
  href: string;
}

export interface SmartIntent {
  raw: string;
  monthlyMax?: number;
  downPaymentMax?: number;
  noDownPayment?: boolean;
  sporty?: boolean;
  reliable?: boolean;
  fuel?: FuelType;
  bodyType?: BodyType;
  category?: ListingCategory | "buy";
  priceMax?: number;
  make?: string;
}

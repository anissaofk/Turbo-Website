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

export type SellerType = "Concessionnaire" | "Particulier" | "Garage";

/** Cases principales du site */
export type ListingCategory =
  | "neuf"
  | "usage"
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
  description: string;
  features: string[];
  tags: string[];
  images: string[];
  location: string;
  seller: Seller;
  category: ListingCategory;
  /** Score fiabilité 1–5 (utilisé par la recherche intelligente) */
  reliability: number;
  /** Offre spéciale (neuf / promotions) */
  offer?: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CarFilters {
  category?: ListingCategory;
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
  location?: string;
  offer?: boolean;
  reliable?: boolean;
  sporty?: boolean;
  q?: string;
  intent?: string;
  sort?: "price-asc" | "price-desc" | "monthly-asc" | "mileage-asc" | "year-desc" | "newest";
}

export interface CategoryMeta {
  id: ListingCategory;
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
  category?: ListingCategory;
  priceMax?: number;
  make?: string;
}

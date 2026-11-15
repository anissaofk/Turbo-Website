export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Manual" | "Automatic";
export type BodyType =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "Coupe"
  | "Estate"
  | "Convertible";

export type SellerType = "Dealer" | "Private";

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
  price: number;
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
  images: string[];
  location: string;
  seller: Seller;
  featured?: boolean;
  createdAt: string;
}

export interface CarFilters {
  make?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMax?: number;
  fuel?: FuelType;
  transmission?: Transmission;
  bodyType?: BodyType;
  location?: string;
  q?: string;
  sort?: "price-asc" | "price-desc" | "mileage-asc" | "year-desc" | "newest";
}

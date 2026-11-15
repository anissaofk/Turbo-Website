import { cars } from "./cars";
import type { Car, CarFilters } from "./types";

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>,
): CarFilters {
  const priceMin = first(searchParams.priceMin);
  const priceMax = first(searchParams.priceMax);
  const yearMin = first(searchParams.yearMin);
  const yearMax = first(searchParams.yearMax);
  const mileageMax = first(searchParams.mileageMax);

  return {
    make: first(searchParams.make) || undefined,
    model: first(searchParams.model) || undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    yearMin: yearMin ? Number(yearMin) : undefined,
    yearMax: yearMax ? Number(yearMax) : undefined,
    mileageMax: mileageMax ? Number(mileageMax) : undefined,
    fuel: first(searchParams.fuel) as CarFilters["fuel"],
    transmission: first(searchParams.transmission) as CarFilters["transmission"],
    bodyType: first(searchParams.bodyType) as CarFilters["bodyType"],
    location: first(searchParams.location) || undefined,
    q: first(searchParams.q) || undefined,
    sort: (first(searchParams.sort) as CarFilters["sort"]) || "newest",
  };
}

export function filterCars(
  filters: CarFilters,
  source: Car[] = cars,
): Car[] {
  let results = source.filter((car) => {
    if (
      filters.make &&
      car.make.toLowerCase() !== filters.make.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.model &&
      !car.model.toLowerCase().includes(filters.model.toLowerCase())
    ) {
      return false;
    }
    if (filters.priceMin != null && car.price < filters.priceMin) return false;
    if (filters.priceMax != null && car.price > filters.priceMax) return false;
    if (filters.yearMin != null && car.year < filters.yearMin) return false;
    if (filters.yearMax != null && car.year > filters.yearMax) return false;
    if (filters.mileageMax != null && car.mileage > filters.mileageMax) {
      return false;
    }
    if (filters.fuel && car.fuel !== filters.fuel) return false;
    if (filters.transmission && car.transmission !== filters.transmission) {
      return false;
    }
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
    if (
      filters.location &&
      car.location.toLowerCase() !== filters.location.toLowerCase()
    ) {
      return false;
    }
    if (filters.q) {
      const haystack = `${car.make} ${car.model} ${car.location} ${car.fuel} ${car.bodyType}`.toLowerCase();
      if (!haystack.includes(filters.q.toLowerCase())) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case "mileage-asc":
      results = [...results].sort((a, b) => a.mileage - b.mileage);
      break;
    case "year-desc":
      results = [...results].sort((a, b) => b.year - a.year);
      break;
    case "newest":
    default:
      results = [...results].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  return results;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return `${new Intl.NumberFormat("de-DE").format(mileage)} km`;
}
